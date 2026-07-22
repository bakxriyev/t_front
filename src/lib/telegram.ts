const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "8907076441:AAFZT4K2fzDB7QtXNXbt4xXfFJMsd_EzLLg";
const CHANNEL_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_ID || "-1003812873981";
const VACANCY_CHANNEL_ID = process.env.NEXT_PUBLIC_TELEGRAM_VACANCY_CHANNEL_ID || "-1004434989300";

export async function sendToTelegram(text: string, toVacancyChannel = false): Promise<{ success: boolean; error?: string }> {
  const chatId = toVacancyChannel ? VACANCY_CHANNEL_ID : CHANNEL_ID;
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    const data = await res.json();
    if (!data.ok) {
      return { success: false, error: data.description || "Telegram error" };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Network error" };
  }
}

export function formatDate(): string {
  const now = new Date();
  return now.toLocaleDateString("uz-UZ", { year: "numeric", month: "2-digit", day: "2-digit" }) +
    "  " +
    now.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" });
}
