import { franc } from "franc-min";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { ProviderHealth } from "./provider-health";

export class TranslationService {
  private readonly gemini?: GoogleGenAI;

  constructor(private readonly openAi: OpenAI | undefined, private readonly model: string, geminiApiKey: string | undefined, private readonly geminiModel: string, private readonly providerHealth = new ProviderHealth()) {
    if (geminiApiKey) this.gemini = new GoogleGenAI({ apiKey: geminiApiKey });
  }

  static detectLanguage(text: string) {
    if (!text.trim()) return "en";
    return franc(text) === "und" ? "en" : franc(text);
  }

  async toEnglish(text: string, language: string) {
    return language === "en" ? text : this.translate(text, language, "English");
  }

  async fromEnglish(text: string, language: string) {
    return language === "en" ? text : this.translate(text, "English", language);
  }

  private async translate(text: string, source: string, target: string) {
    try {
      if (!this.providerHealth.isAvailable("openai")) throw new Error("OpenAI is temporarily unavailable");
      if (!this.openAi) throw new Error("OpenAI is not configured");
      const response = await this.openAi.chat.completions.create({ model: this.model, temperature: 0, messages: [{ role: "system", content: `Translate faithfully from ${source} to ${target}. Return only the translation; preserve URLs, emojis, and formatting.` }, { role: "user", content: text }] });
      this.providerHealth.markHealthy("openai");
      return response.choices[0]?.message.content ?? text;
    } catch {
      this.providerHealth.markFailed("openai");
      if (!this.gemini || !this.providerHealth.isAvailable("gemini")) return text;
      try {
        const response = await this.gemini.models.generateContent({ model: this.geminiModel, contents: `Translate faithfully from ${source} to ${target}. Return only the translation. Preserve URLs, emojis, and formatting.\n\n${text}` });
        this.providerHealth.markHealthy("gemini");
        return response.text ?? text;
      } catch {
        this.providerHealth.markFailed("gemini");
        return text;
      }
    }
  }
}