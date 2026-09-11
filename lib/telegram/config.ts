import type { ReplyMediaIds } from "./types";

const optional = (name: string) => process.env[name]?.trim() || undefined;
const required = (name: string) => {
  const value = optional(name);
  if (!value) throw new Error(`${name} is required`);
  return value;
};
const integer = (name: string, fallback: number) => {
  const value = Number(optional(name) ?? fallback);
  return Number.isInteger(value) ? value : fallback;
};
const fileIds = (name: string) => (optional(name) ?? "").split(",").map((item) => item.trim()).filter(Boolean);

export type TelegramConfig = {
  botToken: string;
  openAiApiKey?: string;
  geminiApiKey?: string;
  virusTotalApiKey?: string;
  adminTelegramId?: number;
  personalAccountName: string;
  port: number;
  sessionTimeoutSeconds: number;
  openAiModel: string;
  openAiVisionModel: string;
  geminiModel: string;
  replyMediaIds: ReplyMediaIds;
};

export function getTelegramConfig(): TelegramConfig {
  return {
    botToken: required("TELEGRAM_BOT_TOKEN"),
    openAiApiKey: optional("OPENAI_API_KEY"),
    geminiApiKey: optional("GEMINI_API_KEY"),
    virusTotalApiKey: optional("VIRUSTOTAL_API_KEY"),
    adminTelegramId: optional("ADMIN_TELEGRAM_ID") ? integer("ADMIN_TELEGRAM_ID", 0) : undefined,
    personalAccountName: optional("PERSONAL_ACCOUNT_NAME") ?? "Personal Account",
    port: integer("PORT", 8080),
    sessionTimeoutSeconds: integer("SESSION_TIMEOUT_SECONDS", 180),
    openAiModel: optional("OPENAI_MODEL") ?? "gpt-4o-mini",
    openAiVisionModel: optional("OPENAI_VISION_MODEL") ?? "gpt-4o",
    geminiModel: optional("GEMINI_MODEL") ?? "gemini-3.6-flash",
    replyMediaIds: {
      sticker: fileIds("REPLY_STICKER_FILE_ID"),
      photo: fileIds("REPLY_PHOTO_FILE_ID"),
      video: fileIds("REPLY_VIDEO_FILE_ID"),
      voice: fileIds("REPLY_VOICE_FILE_ID"),
    },
  };
}