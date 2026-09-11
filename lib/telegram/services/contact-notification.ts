import type { ContactNotification } from "../types";

function escapeHtml(value: string) {
  return value.replace(/[&<>\"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&#039;" })[character] ?? character);
}

export async function sendContactNotification(notification: ContactNotification) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("Contact service is not configured");
  const text = ["<b>New portfolio message</b>", "", `👤 <b>Name:</b> ${escapeHtml(notification.name)}`, `✉️ <b>Email / Contact:</b> ${escapeHtml(notification.email)}`, `📌 <b>Subject:</b> ${escapeHtml(notification.subject)}`, `💬 <b>Message:</b>\n${escapeHtml(notification.message)}`, "", `🕒 <b>Timestamp:</b> ${notification.timestamp.toISOString()}`, notification.ip ? `<b>IP:</b> ${escapeHtml(notification.ip)}` : ""].filter(Boolean).join("\n");
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }), cache: "no-store" });
  if (!response.ok) throw new Error("Telegram notification failed");
}