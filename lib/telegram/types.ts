export type ReplyMediaType = "sticker" | "photo" | "video" | "voice";

export type ReplyMediaIds = Record<ReplyMediaType, string[]>;

export type ContactNotification = {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: Date;
  ip?: string;
};

export function emptyReplyMediaIds(): ReplyMediaIds {
  return { sticker: [], photo: [], video: [], voice: [] };
}