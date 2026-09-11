import { startTelegramBot } from "../lib/telegram/bot";

startTelegramBot().catch((error: unknown) => {
  console.error("Telegram bot failed to start", error);
  process.exitCode = 1;
});