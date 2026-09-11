import { Bot } from "grammy";
import OpenAI from "openai";
import { getTelegramConfig } from "./config";
import { createBusinessMessageHandler } from "./handlers/business-message";
import { AIService } from "./services/ai-service";
import { URLSafetyService } from "./services/antispam";
import { ProviderHealth } from "./services/provider-health";
import { SessionManager } from "./services/session-manager";
import { TranslationService } from "./services/translation";

export function createTelegramBot() {
  const config = getTelegramConfig();
  if (!config.openAiApiKey && !config.geminiApiKey) throw new Error("Configure OPENAI_API_KEY or GEMINI_API_KEY");
  const openAi = config.openAiApiKey ? new OpenAI({ apiKey: config.openAiApiKey, maxRetries: 0 }) : undefined;
  const providerHealth = new ProviderHealth();
  const ai = new AIService(openAi, config.openAiModel, config.openAiVisionModel, config.geminiApiKey, config.geminiModel, providerHealth);
  const translation = new TranslationService(openAi, config.openAiModel, config.geminiApiKey, config.geminiModel, providerHealth);
  const bot = new Bot(config.botToken);
  bot.on("business_message", createBusinessMessageHandler(bot, config.botToken, { ai, translation, antiSpam: new URLSafetyService(config.virusTotalApiKey), sessions: new SessionManager(config.sessionTimeoutSeconds), adminId: config.adminTelegramId, personalAccountName: config.personalAccountName, replyMediaIds: config.replyMediaIds }));
  return bot;
}

export async function startTelegramBot() {
  const bot = createTelegramBot();
  await bot.start({ allowed_updates: ["business_message"] });
}