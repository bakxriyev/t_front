"use client";

import { useEffect, useState } from "react";
import type { L3, Lang } from "./constants";
export { API } from "./endpoints";

/* --------------------------------------------------------------------------
   Backend entity types (mirrors backend/src/modules/*.model.ts)
   -------------------------------------------------------------------------- */
type Base = { id: number; createdAt?: string; updatedAt?: string };

export type Hero = Base & {
  title_uz: string; title_ru: string; title_en: string;
  subtitle_uz: string; subtitle_ru: string; subtitle_en: string;
  description_uz: string; description_ru: string; description_en: string;
  button_text_uz: string; button_text_ru: string; button_text_en: string;
  button_link: string; image: string | null; video_url: string | null;
  title_font_size?: string | null; text_align?: string | null;
  order: number; is_active: boolean;
};
export type Settings = Base & {
  site_name_uz?: string; site_name_ru?: string; site_name_en?: string;
  logo?: string | null; favicon?: string | null;
  email?: string | null; phone?: string | null;
  address_uz?: string; address_ru?: string; address_en?: string;
  working_hours_uz?: string; working_hours_ru?: string; working_hours_en?: string;
  latitude?: number | null; longitude?: number | null;
};
export type About = Base & {
  content_uz: string; content_ru: string; content_en: string;
  mission_uz: string; mission_ru: string; mission_en: string;
  vision_uz: string; vision_ru: string; vision_en: string;
  image?: string | null; images?: string[] | string | null; videos?: string[] | string | null;
};
export type AboutValue = Base & { key: string; title_uz: string; title_ru: string; title_en: string; description_uz: string; description_ru: string; description_en: string; order: number };
export type TimelineItem = Base & { year: string; title_uz: string; title_ru: string; title_en: string; description_uz: string; description_ru: string; description_en: string; order: number };
export type Statistic = Base & { value: number; suffix?: string | null; icon?: string | null; label_uz: string; label_ru: string; label_en: string; order?: number; is_active?: boolean };
export type Course = Base & {
  title_uz: string; title_ru: string; title_en: string;
  description_uz: string; description_ru: string; description_en: string;
  price: number | string | null; duration: string | null; level: string | null; image: string | null;
  order: number; is_active: boolean;
};
export type Teacher = Base & {
  first_name_uz: string; first_name_ru: string; first_name_en: string;
  last_name_uz: string; last_name_ru: string; last_name_en: string;
  patronymic_uz?: string; patronymic_ru?: string; patronymic_en?: string;
  position_uz: string; position_ru: string; position_en: string;
  bio_uz: string; bio_ru: string; bio_en: string;
  degree_uz?: string; degree_ru?: string; degree_en?: string;
  photo: string | null; email?: string | null; phone?: string | null; order: number; is_active: boolean;
};
export type TeamMember = Omit<Teacher, "degree_uz" | "degree_ru" | "degree_en" | "patronymic_uz" | "patronymic_ru" | "patronymic_en">;
export type Result = Base & {
  student_name_uz: string; student_name_ru: string; student_name_en: string;
  achievement_uz: string; achievement_ru: string; achievement_en: string;
  description_uz: string; description_ru: string; description_en: string;
  year: number | null; photo: string | null; photos?: string[]; is_active: boolean;
};
export type Testimonial = Base & {
  name_uz: string; name_ru: string; name_en: string;
  position_uz: string; position_ru: string; position_en: string;
  content_uz: string; content_ru: string; content_en: string;
  video_url?: string | null; image?: string | null; type?: string; order: number; is_active: boolean;
};
export type VideoReview = Base & { name_uz: string; name_ru: string; name_en: string; description_uz: string; description_ru: string; description_en: string; video: string; order: number; is_active: boolean };
export type News = Base & {
  title_uz: string; title_ru: string; title_en: string;
  content_uz: string; content_ru: string; content_en: string;
  excerpt_uz: string; excerpt_ru: string; excerpt_en: string;
  image: string | null; video_url?: string | null; type: string; status: string; views: number;
};
export type Faq = Base & { question_uz: string; question_ru: string; question_en: string; answer_uz: string; answer_ru: string; answer_en: string; order?: number };
export type Vacancy = Base & {
  title_uz: string; title_ru: string; title_en: string;
  description_uz: string; description_ru: string; description_en: string;
  requirements_uz: string; requirements_ru: string; requirements_en: string;
  salary: string | null; type: string; is_active: boolean;
};
export type SocialLink = Base & { platform: string; url: string; icon?: string | null; order: number; isActive: boolean };

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */
const API_ORIGIN = (process.env.NEXT_PUBLIC_API_URL || "https://b.tashkentlawschool.uz").replace(/\/$/, "");

/** Absolute URL for a backend upload path (e.g. "/uploads/x.png"). Returns null for empty input. */
export function media(path?: string | null): string | null {
  if (!path || typeof path !== "string") return null;
  const p = path.trim();
  if (!p) return null;
  if (/^(https?:)?\/\//.test(p) || p.startsWith("data:") || p.startsWith("blob:")) return p;
  if (p.startsWith("/images/") || p.startsWith("/videos/")) return p;
  return `${API_ORIGIN}${p.startsWith("/") ? "" : "/"}${p}`;
}

/** Normalises admin-entered text: CRLF → LF, trims, collapses empty lines. */
export function clean(s?: string | null): string {
  if (!s) return "";
  return String(s).replace(/\r\n?/g, "\n").replace(/([a-zA-Z])`/g, "$1‘").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

const ORDER: Record<Lang, string[]> = { UZ: ["uz", "ru", "en"], RU: ["ru", "uz", "en"], EN: ["en", "uz", "ru"] };

/** Picks `${field}_${lang}` from a record with a sensible fallback to the other languages. */
export function pick(obj: unknown, field: string, lang: Lang): string {
  if (!obj || typeof obj !== "object") return "";
  const rec = obj as Record<string, unknown>;
  for (const l of ORDER[lang]) {
    const v = clean(rec[`${field}_${l}`] as string | undefined);
    if (v) return v;
  }
  return "";
}

export function tr(v: L3, lang: Lang): string {
  return lang === "RU" ? v.ru : lang === "EN" ? v.en : v.uz;
}

export function fullName(p: unknown, lang: Lang): string {
  return [pick(p, "first_name", lang), pick(p, "last_name", lang)].filter(Boolean).join(" ");
}

export function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
}

export function formatPrice(v: number | string | null | undefined, lang: Lang): string {
  if (v === null || v === undefined || v === "") return "";
  const n = typeof v === "number" ? v : Number(String(v).replace(/[^\d.]/g, ""));
  if (!Number.isFinite(n) || n <= 0) return String(v);
  const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${s} ${lang === "RU" ? "сум" : lang === "EN" ? "UZS" : "so‘m"}`;
}

const MONTHS: Record<Lang, string[]> = {
  UZ: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"],
  RU: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
  EN: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

export function formatDate(iso: string | undefined, lang: Lang): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const m = MONTHS[lang][d.getMonth()];
  if (lang === "EN") return `${m} ${d.getDate()}, ${d.getFullYear()}`;
  if (lang === "RU") return `${d.getDate()} ${m} ${d.getFullYear()}`;
  return `${d.getFullYear()}-yil ${d.getDate()}-${m}`;
}

export function toArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string" && !!x.trim());
  if (typeof v === "string" && v.trim()) {
    const s = v.trim();
    if (s.startsWith("[")) {
      try { return toArray(JSON.parse(s)); } catch { return []; }
    }
    return [s];
  }
  return [];
}

export function isActive(x: { is_active?: boolean; isActive?: boolean } | null | undefined): boolean {
  if (!x) return false;
  if (x.is_active === false) return false;
  if (x.isActive === false) return false;
  return true;
}

export function byOrder<T extends { order?: number | null; id: number }>(a: T, b: T): number {
  return (a.order ?? 0) - (b.order ?? 0) || a.id - b.id;
}

export function isVideoFile(url?: string | null): boolean {
  return !!url && /\.(mp4|mov|webm|m4v|ogg)(\?|$)/i.test(url);
}

/** Extracts a YouTube video id from common URL formats. */
export function youtubeId(url?: string | null): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return m ? m[1] : null;
}

/* --------------------------------------------------------------------------
   Data fetching — requests go to /api/* which next.config rewrites to the backend.
   A small in-memory cache dedupes requests shared by several components.
   -------------------------------------------------------------------------- */
const cache = new Map<string, Promise<unknown>>();
/** Responses already rendered on the server (seeded via <DataSeed/>), readable synchronously. */
const resolved = new Map<string, unknown>();

export function seedData(data: Record<string, unknown> | undefined) {
  if (!data) return;
  for (const [k, v] of Object.entries(data)) {
    if (v === null || v === undefined) continue;
    resolved.set(k, v);
    cache.set(k, Promise.resolve(v));
  }
}

async function getJSON(endpoint: string): Promise<unknown> {
  const hit = cache.get(endpoint);
  if (hit) return hit;
  const p = fetch(endpoint, { headers: { Accept: "application/json" } }).then(async (r) => {
    if (!r.ok) throw new Error(`${r.status} ${endpoint}`);
    return r.json();
  });
  cache.set(endpoint, p);
  p.then((v) => resolved.set(endpoint, v)).catch(() => cache.delete(endpoint));
  return p;
}

function unwrapList<T>(json: unknown): T[] {
  if (Array.isArray(json)) return json as T[];
  if (json && typeof json === "object") {
    const d = (json as { data?: unknown }).data;
    if (Array.isArray(d)) return d as T[];
    if (d && typeof d === "object" && Array.isArray((d as { data?: unknown }).data)) return (d as { data: T[] }).data;
  }
  return [];
}

function unwrapOne<T>(json: unknown): T | null {
  if (Array.isArray(json)) return (json[0] as T) ?? null;
  if (json && typeof json === "object") {
    const o = json as { data?: unknown; success?: boolean };
    if (o.data !== undefined) return unwrapOne<T>(o.data);
    return json as T;
  }
  return null;
}

export function useList<T>(endpoint: string | null) {
  const [state, setState] = useState<{ data: T[]; loading: boolean; error: boolean }>(() => {
    if (endpoint && resolved.has(endpoint)) return { data: unwrapList<T>(resolved.get(endpoint)), loading: false, error: false };
    return { data: [], loading: !!endpoint, error: false };
  });
  useEffect(() => {
    if (!endpoint) { setState({ data: [], loading: false, error: false }); return; }
    if (resolved.has(endpoint)) { setState({ data: unwrapList<T>(resolved.get(endpoint)), loading: false, error: false }); return; }
    let alive = true;
    setState((s) => ({ ...s, loading: true }));
    getJSON(endpoint)
      .then((j) => alive && setState({ data: unwrapList<T>(j), loading: false, error: false }))
      .catch(() => alive && setState({ data: [], loading: false, error: true }));
    return () => { alive = false; };
  }, [endpoint]);
  return state;
}

export function useOne<T>(endpoint: string | null) {
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: boolean }>(() => {
    if (endpoint && resolved.has(endpoint)) return { data: unwrapOne<T>(resolved.get(endpoint)), loading: false, error: false };
    return { data: null, loading: !!endpoint, error: false };
  });
  useEffect(() => {
    if (!endpoint) { setState({ data: null, loading: false, error: false }); return; }
    if (resolved.has(endpoint)) { setState({ data: unwrapOne<T>(resolved.get(endpoint)), loading: false, error: false }); return; }
    let alive = true;
    setState((s) => ({ ...s, loading: true }));
    getJSON(endpoint)
      .then((j) => alive && setState({ data: unwrapOne<T>(j), loading: false, error: false }))
      .catch(() => alive && setState({ data: null, loading: false, error: true }));
    return () => { alive = false; };
  }, [endpoint]);
  return state;
}

export async function postJSON(endpoint: string, body: unknown): Promise<boolean> {
  try {
    const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return r.ok;
  } catch {
    return false;
  }
}

/** "+998954546939" → "+998 95 454 69 39"; other formats are returned trimmed. */
export function prettyPhone(raw?: string | null): string {
  if (!raw) return "";
  const d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("998")) return `+998 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10, 12)}`;
  if (d.length === 9) return `+998 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 7)} ${d.slice(7, 9)}`;
  return raw.trim();
}

export function phoneHref(raw?: string | null): string {
  const d = (raw || "").replace(/\D/g, "");
  if (d.length === 9) return `+998${d}`;
  return d ? `+${d}` : "";
}

/** Flattens multi-line admin text into one paragraph (for clamped card previews). */
export function oneLine(s?: string | null): string {
  return clean(s).replace(/\s*\n+\s*/g, " ");
}

