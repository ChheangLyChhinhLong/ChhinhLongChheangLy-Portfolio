import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { toFile } from "openai/uploads";
import { ProviderHealth } from "./provider-health";

const CHAT_SYSTEM = "You are a warm, professional Telegram assistant. Answer clearly and safely. Do not claim to have taken actions you did not take. When a media reply would help, append exactly one marker: [[sticker]], [[photo]], [[video]], or [[voice]]. Use emojis naturally in text when useful.";

export class AIService {
  private readonly gemini?: GoogleGenAI;

  constructor(
    private readonly openAi: OpenAI | undefined,
    private readonly textModel: string,
    private readonly visionModel: string,
    geminiApiKey: string | undefined,
    private readonly geminiModel: string,
    private readonly providerHealth = new ProviderHealth(),
  ) {
    if (geminiApiKey) this.gemini = new GoogleGenAI({ apiKey: geminiApiKey });
  }

  private async openAiReply(context: string, input: string) {
    if (!this.providerHealth.isAvailable("openai")) throw new Error("OpenAI is temporarily unavailable");
    if (!this.openAi) throw new Error("OpenAI is not configured");
    const response = await this.openAi.chat.completions.create({
      model: this.textModel,
      temperature: 0.4,
      messages: [{ role: "system", content: CHAT_SYSTEM }, { role: "user", content: `Media/context:\n${context || "(none)"}\n\nUser message:\n${input}` }],
    });
    return response.choices[0]?.message.content ?? "";
  }

  private async geminiReply(context: string, input: string) {
    if (!this.gemini) throw new Error("Gemini is not configured");
    const response = await this.gemini.models.generateContent({ model: this.geminiModel, contents: `${CHAT_SYSTEM}\n\nMedia/context:\n${context || "(none)"}\n\nUser message:\n${input}` });
    return response.text ?? "";
  }

  async transcribeVoice(audio: Uint8Array, filename = "voice.ogg") {
    if (!this.openAi) throw new Error("Voice transcription requires OpenAI");
    const result = await this.openAi.audio.transcriptions.create({ model: "whisper-1", file: await toFile(audio, filename, { type: "audio/ogg" }) });
    return result.text;
  }

  async describeImage(image: Uint8Array, mimeType = "image/jpeg") {
    if (!this.openAi) throw new Error("Image analysis requires OpenAI");
    const encoded = Buffer.from(image).toString("base64");
    const response = await this.openAi.chat.completions.create({
      model: this.visionModel,
      messages: [{ role: "system", content: "Describe the image for an assistant. Extract visible text (OCR), identify useful context, and be concise." }, { role: "user", content: [{ type: "text", text: "Analyze this image." }, { type: "image_url", image_url: { url: `data:${mimeType};base64,${encoded}` } }] }],
    });
    return response.choices[0]?.message.content ?? "";
  }

  async extractVideoFrame(video: Uint8Array) {
    const { spawn } = await import("node:child_process");
    return new Promise<Buffer>((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", ["-i", "pipe:0", "-frames:v", "1", "-f", "image2", "pipe:1"]);
      const chunks: Buffer[] = [];
      const errors: Buffer[] = [];
      ffmpeg.stdout.on("data", (chunk: Buffer) => chunks.push(chunk));
      ffmpeg.stderr.on("data", (chunk: Buffer) => errors.push(chunk));
      ffmpeg.on("error", reject);
      ffmpeg.on("close", (code) => code === 0 ? resolve(Buffer.concat(chunks)) : reject(new Error(Buffer.concat(errors).toString() || `ffmpeg exited with ${code}`)));
      ffmpeg.stdin.end(video);
    });
  }

  async generateReply(context: string, input: string) {
    try {
      const reply = await this.openAiReply(context, input);
      this.providerHealth.markHealthy("openai");
      return reply;
    } catch {
      this.providerHealth.markFailed("openai");
      try {
        if (!this.providerHealth.isAvailable("gemini")) throw new Error("Gemini is temporarily unavailable");
        const reply = await this.geminiReply(context, input);
        this.providerHealth.markHealthy("gemini");
        return reply;
      } catch {
        this.providerHealth.markFailed("gemini");
        throw new Error("AI providers are unavailable");
      }
    }
  }
}