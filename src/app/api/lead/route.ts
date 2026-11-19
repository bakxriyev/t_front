import { NextResponse } from "next/server";

/**
 * POST /api/lead — sends a lead (course application or vacancy reply) to the
 * Telegram leads channel. Runs on the server, so the bot token is never shipped
 * to the browser. (App routes take precedence over the /api/* → backend rewrite.)
 */

export const dynamic = "force-dynamic";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "";
const LEADS_CHAT = process.env.TELEGRAM_CHANNEL_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_ID || "";
const VACANCY_CHAT =
  process.env.TELEGRAM_VACANCY_CHANNEL_ID || process.env.NEXT_PUBLIC_TELEGRAM_VACANCY_CHANNEL_ID || LEADS_CHAT;

type LeadBody = {
  kind?: "lead" | "vacancy";
  name?: string;
  phone?: string;
  course?: string;
  branch?: string;
  question?: string;
  position?: string;
  experience?: string;
  source?: string;
  lang?: string;
  website?: string; // honeypot — must stay empty
};

const esc = (s: unknown, max = 600) =>
  String(s ?? "")
    .slice(0, max)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();

function tashkentTime() {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Asia/Tashkent",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

const SOURCE_LABEL: Record<string, string> = {
  "instagram-registration": "Instagram (ro‘yxatdan o‘tish sahifasi)",
  "enroll-modal": "Sayt — «Ro‘yxatdan o‘tish» oynasi",
  "contact-section": "Sayt — aloqa formasi",
};

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true }); // bot trap: pretend success

  const name = esc(body.name, 120);
  const phoneDigits = String(body.phone ?? "").replace(/\D/g, "");
  if (name.length < 2 || phoneDigits.length < 9 || phoneDigits.length > 15) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  if (!TOKEN || !LEADS_CHAT) {
    return NextResponse.json({ ok: false, error: "telegram_not_configured" }, { status: 500 });
  }

  const phone = esc(body.phone, 30);
  const src = String(body.source ?? "website");
  const line = "━━━━━━━━━━━━━━━━━━━";
  let text: string;
  let chat = LEADS_CHAT;

  if (body.kind === "vacancy") {
    chat = VACANCY_CHAT;
    text =
      `<b>💼 Vakansiyaga ariza</b>\n${line}\n\n` +
      `📌 <b>Lavozim:</b> ${esc(body.position, 200) || "—"}\n` +
      `👤 <b>Ism:</b> ${name}\n` +
      `📞 <b>Telefon:</b> ${phone}\n` +
      `📝 <b>Tajriba:</b> ${esc(body.experience, 1500) || "—"}\n\n${line}\n📅 ${tashkentTime()}`;
  } else {
    const fromInstagram = src.startsWith("instagram");
    text =
      `<b>${fromInstagram ? "📲 Yangi lid — Instagram" : "🎓 Yangi ariza — Tashkent Law School"}</b>\n${line}\n\n` +
      `👤 <b>Ism:</b> ${name}\n` +
      `📞 <b>Telefon:</b> ${phone}\n` +
      (body.course ? `📚 <b>Kurs:</b> ${esc(body.course, 200)}\n` : "") +
      (body.branch ? `📍 <b>Filial:</b> ${esc(body.branch, 120)}\n` : "") +
      (body.question ? `💬 <b>Savol:</b> ${esc(body.question, 1500)}\n` : "") +
      `🌐 <b>Manba:</b> ${esc(SOURCE_LABEL[src] ?? src, 120)}${body.lang ? ` · ${esc(body.lang, 4)}` : ""}\n\n${line}\n📅 ${tashkentTime()}`;
  }

  try {
    const r = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: "HTML", disable_web_page_preview: true }),
      cache: "no-store",
    });
    const data = (await r.json()) as { ok: boolean; description?: string };
    if (!data.ok) return NextResponse.json({ ok: false, error: data.description || "telegram_error" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
