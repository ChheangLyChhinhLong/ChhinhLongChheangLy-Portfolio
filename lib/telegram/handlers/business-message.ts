import type { Bot, Context } from "grammy";
import type { Message } from "grammy/types";
import type { AIService } from "../services/ai-service";
import { URLSafetyService } from "../services/antispam";
import { SessionManager } from "../services/session-manager";
import { TranslationService } from "../services/translation";
import type { ReplyMediaIds } from "../types";

const WELCOME = "សួស្តី! សូមស្វាគមន៍ ខ្ញុំជា Assistant/ជំនួយការវៃឆ្លាត។\nខ្ញុំនៅទីនេះដើម្បីជួយអ្នក។";
const TECHNICAL_ERROR = "សូមអភ័យទោស! ប្រព័ន្ធកំពុងជួបបញ្ហាបច្ចេកទេស។";
const AI_ERROR = "សូមអភ័យទោស! ប្រព័ន្ធ AI កំពុងមានបញ្ហា។";
type BusinessOptions = { business_connection_id?: string };

export type BusinessMessageDependencies = {
  ai: AIService;
  translation: TranslationService;
  antiSpam: URLSafetyService;
  sessions: SessionManager;
  adminId?: number;
  personalAccountName: string;
  replyMediaIds: ReplyMediaIds;
};

type IncomingMedia = { fileId: string; filename: string; contentType: string; kind: "voice" | "photo" | "video" | "sticker" | "document" } | undefined;

function incomingMedia(message: Message): IncomingMedia {
  if (message.voice) return { fileId: message.voice.file_id, filename: "voice.ogg", contentType: "audio/ogg", kind: "voice" };
  if (message.photo?.length) return { fileId: message.photo.at(-1)?.file_id ?? message.photo[0].file_id, filename: "photo.jpg", contentType: "image/jpeg", kind: "photo" };
  if (message.video) return { fileId: message.video.file_id, filename: "video.mp4", contentType: "video/mp4", kind: "video" };
  if (message.sticker) return { fileId: message.sticker.file_id, filename: "sticker.webp", contentType: "image/webp", kind: "sticker" };
  if (message.document) return { fileId: message.document.file_id, filename: message.document.file_name ?? "telegram-media.bin", contentType: message.document.mime_type ?? "application/octet-stream", kind: "document" };
  return undefined;
}

async function download(bot: Bot, token: string, fileId: string) {
  const file = await bot.api.getFile(fileId);
  if (!file.file_path) throw new Error("Telegram file path is missing");
  const response = await fetch(`https://api.telegram.org/file/bot${token}/${file.file_path}`);
  if (!response.ok) throw new Error("Telegram media download failed");
  return new Uint8Array(await response.arrayBuffer());
}

async function scanIncomingMedia(bot: Bot, token: string, message: Message, antiSpam: URLSafetyService): Promise<[boolean, Uint8Array | undefined, string]> {
  const media = incomingMedia(message);
  if (!media) return [true, undefined, ""];
  const content = await download(bot, token, media.fileId);
  const [safe, detail] = await antiSpam.checkFile(content, media.filename, media.contentType);
  return [safe, content, detail];
}

async function deleteSuspiciousMessage(ctx: Context) {
  if (!ctx.chat || !ctx.msg) return false;
  try {
    await ctx.api.deleteMessage(ctx.chat.id, ctx.msg.message_id);
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.toLowerCase().includes("message to delete not found")) return false;
    throw error;
  }
}

async function keepChatAction(ctx: Context, action: "typing" | "record_voice" | "upload_photo" | "upload_video", signal: AbortSignal) {
  if (!ctx.chat) return;
  try {
    while (!signal.aborted) {
      await ctx.api.sendChatAction(ctx.chat.id, action, { business_connection_id: ctx.businessConnectionId } as BusinessOptions);
      await new Promise<void>((resolve) => {
        const timeout = setTimeout(resolve, 4_000);
        signal.addEventListener("abort", () => { clearTimeout(timeout); resolve(); }, { once: true });
      });
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") return;
    throw error;
  }
}

async function isPersonalAccountMessage(bot: Bot, ctx: Context, ownerIds: Map<string, number>) {
  if (!ctx.businessConnectionId || !ctx.from) return false;
  try {
    let ownerId = ownerIds.get(ctx.businessConnectionId);
    if (ownerId === undefined) {
      const connection = await bot.api.getBusinessConnection(ctx.businessConnectionId);
      ownerId = connection.user.id;
      ownerIds.set(ctx.businessConnectionId, ownerId);
    }
    return ctx.from.id === ownerId;
  } catch {
    return false;
  }
}

async function sendReplyMedia(bot: Bot, ctx: Context, reply: string, mediaIds: ReplyMediaIds) {
  const marker = reply.match(/\[\[(sticker|photo|video|voice)\]\]/i);
  if (!marker || !ctx.chat) return reply;
  const type = marker[1].toLowerCase() as keyof ReplyMediaIds;
  const ids = mediaIds[type];
  const cleanReply = reply.replace(/\[\[(sticker|photo|video|voice)\]\]/gi, "").trim();
  if (!ids.length) return cleanReply;
  const fileId = ids[Math.floor(Math.random() * ids.length)];
  const options = { business_connection_id: ctx.businessConnectionId } as BusinessOptions;
  if (type === "sticker") await bot.api.sendSticker(ctx.chat.id, fileId, options);
  if (type === "photo") await bot.api.sendPhoto(ctx.chat.id, fileId, options);
  if (type === "video") await bot.api.sendVideo(ctx.chat.id, fileId, options);
  if (type === "voice") await bot.api.sendVoice(ctx.chat.id, fileId, options);
  return cleanReply;
}

export function createBusinessMessageHandler(bot: Bot, token: string, dependencies: BusinessMessageDependencies) {
  const ownerIds = new Map<string, number>();
  const pausedUsers = new Map<number, number>();

  return async (ctx: Context) => {
    const message = ctx.msg;
    if (!message || ctx.chat?.type !== "private" || !ctx.businessConnectionId) return;
    const userId = ctx.from?.id ?? ctx.chat.id;
    const pausedUntil = pausedUsers.get(userId);
    if (pausedUntil && Date.now() < pausedUntil) return;
    if (pausedUntil) pausedUsers.delete(userId);
    if (await isPersonalAccountMessage(bot, ctx, ownerIds)) return;
    const isNew = dependencies.sessions.isNewAndTouch(userId);
    const media = incomingMedia(message);
    const action = media?.kind === "voice" ? "record_voice" : media?.kind === "photo" ? "upload_photo" : media?.kind === "video" ? "upload_video" : "typing";
    const actionController = new AbortController();
    const actionTask = keepChatAction(ctx, action, actionController.signal);
    try {
      if (isNew) await ctx.api.sendMessage(ctx.chat.id, WELCOME, { business_connection_id: ctx.businessConnectionId } as BusinessOptions);
      let sourceText = message.text ?? message.caption ?? "";
      if (sourceText) {
        const [safe, checks] = await dependencies.antiSpam.checkMessage(sourceText);
        if (!safe) {
          if (dependencies.adminId) await bot.api.sendMessage(dependencies.adminId, `Blocked suspicious URL from user ${userId}: ${JSON.stringify(checks)}`);
          await deleteSuspiciousMessage(ctx);
          return;
        }
      }
      const [mediaSafe, downloaded, mediaDetail] = await scanIncomingMedia(bot, token, message, dependencies.antiSpam);
      if (!mediaSafe) {
        if (!mediaDetail.toLowerCase().includes("analysis did not complete")) {
          await deleteSuspiciousMessage(ctx);
          if (dependencies.adminId) await bot.api.sendMessage(dependencies.adminId, `Deleted suspicious media from user ${userId}: ${mediaDetail}`);
        }
        return;
      }
      let mediaContext = "";
      if (media?.kind === "voice") {
        mediaContext = await dependencies.ai.transcribeVoice(downloaded ?? new Uint8Array());
        sourceText ||= mediaContext;
      } else if (media?.kind === "photo") {
        mediaContext = await dependencies.ai.describeImage(downloaded ?? new Uint8Array());
      } else if (media?.kind === "video") {
        mediaContext = await dependencies.ai.describeImage(await dependencies.ai.extractVideoFrame(downloaded ?? new Uint8Array()));
      } else if (media?.kind === "sticker" && message.sticker) {
        if (!dependencies.replyMediaIds.sticker.includes(message.sticker.file_id)) dependencies.replyMediaIds.sticker.push(message.sticker.file_id);
        mediaContext = `Sticker emoji: ${message.sticker.emoji ?? "unknown"}; sticker set: ${message.sticker.set_name ?? "unknown"}`;
      }
      if (!sourceText && !mediaContext) {
        await ctx.api.sendMessage(ctx.chat.id, "Please send text, a voice message, a photo, a video, or a sticker.", { business_connection_id: ctx.businessConnectionId } as BusinessOptions);
        return;
      }
      const language = TranslationService.detectLanguage(sourceText);
      const englishInput = await dependencies.translation.toEnglish(sourceText, language);
      const englishReply = await dependencies.ai.generateReply(mediaContext, englishInput);
      const translatedReply = await dependencies.translation.fromEnglish(englishReply, language);
      const reply = await sendReplyMedia(bot, ctx, translatedReply, dependencies.replyMediaIds);
      if (reply) await ctx.api.sendMessage(ctx.chat.id, reply, { business_connection_id: ctx.businessConnectionId } as BusinessOptions);
    } catch (error) {
      const unavailable = error instanceof Error && error.message === "AI providers are unavailable";
      await ctx.api.sendMessage(ctx.chat.id, unavailable ? `${TECHNICAL_ERROR} សូមទុកសារនៅទីនេះ ${dependencies.personalAccountName} និងតបឆាប់។` : `${AI_ERROR} សូមទុកសារនៅទីនេះ ${dependencies.personalAccountName} និងតបឆាប់។`, { business_connection_id: ctx.businessConnectionId } as BusinessOptions);
      pausedUsers.set(userId, Date.now() + 15 * 60_000);
    } finally {
      actionController.abort();
      await actionTask.catch(() => undefined);
    }
  };
}