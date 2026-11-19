/**
 * Server-side SEO helpers: site URL, search keywords (uz / ru / en),
 * backend fetches for metadata, and schema.org JSON-LD builders.
 */
import { BRANCHES, CONTACT } from "./constants";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.tashkentlawschool.uz").replace(/\/$/, "");
const API_ORIGIN = (process.env.NEXT_PUBLIC_API_URL || "https://b.tashkentlawschool.uz").replace(/\/$/, "");

export const SITE_NAME = "Tashkent Law School";

/* ------------------------------------------------------------------ keywords */
const COURSE_KEYWORDS = [
  // Law
  "huquq kursi", "huquq kurslari Toshkent", "huquqshunoslik kursi", "yurisprudensiya", "huquq fanidan tayyorlov",
  "курсы права Ташкент", "курсы по праву", "юридические курсы Ташкент", "подготовка по праву",
  "law courses Tashkent", "law school Tashkent", "law course Uzbekistan",
  // English
  "ingliz tili kursi", "ingliz tili kurslari Toshkent", "ingliz tili o‘quv markazi",
  "курсы английского языка Ташкент", "английский язык Ташкент",
  "English course Tashkent", "English courses in Tashkent", "learn English Tashkent",
  // Other subjects
  "tarix kursi", "O‘zbekiston tarixi kursi", "курсы истории Узбекистана", "history course Tashkent",
  "turk tili kursi", "курсы турецкого языка Ташкент", "Turkish language course Tashkent",
  "ona tili kursi", "ona tili va adabiyot", "родной язык курсы", "Uzbek language course",
  "matematika kursi", "курсы математики Ташкент", "math course Tashkent",
  "majburiy fanlar", "DTM ga tayyorlov", "abituriyentlar uchun kurslar", "milliy sertifikat", "BMBA test",
];

const UNIVERSITY_KEYWORDS = [
  // TSUL
  "TDYU", "TDYU ga tayyorlov", "Toshkent davlat yuridik universiteti", "Toshkent davlat yuridik universitetiga tayyorlov",
  "TDYU akademik litseyi", "yuridik litseyga tayyorlov",
  "ТГЮУ", "подготовка в ТГЮУ", "Ташкентский государственный юридический университет",
  "TSUL", "Tashkent State University of Law", "TSUL preparation",
  // Law Enforcement Academy
  "HMQA", "Huquqni muhofaza qilish akademiyasi", "HMQA ga tayyorlov",
  "Академия правоохранительных органов", "Law Enforcement Academy of Uzbekistan",
  // UWED
  "JIDU", "Jahon iqtisodiyoti va diplomatiya universiteti", "JIDU ga tayyorlov",
  "УМЭД", "Университет мировой экономики и дипломатии", "UWED", "University of World Economy and Diplomacy",
  "yuridik universitetga tayyorlov", "yuridik oliygohga tayyorlov", "подготовка в юридический вуз",
];

const PLACE_KEYWORDS = [
  "o‘quv markaz Toshkent", "o‘quv markazi Chilonzor", "o‘quv markazi Yunusobod", "o‘quv markaz Urganch", "Xorazm o‘quv markazi",
  "учебный центр Ташкент", "учебный центр Чиланзар", "учебный центр Юнусабад", "учебный центр Ургенч",
  "education center Tashkent", "learning center Tashkent",
];

export const KEYWORDS = [
  "Tashkent Law School", "Tashkent Law", "TashkentLaw", "Ташкент Лоу Скул", "Tashkent Law School Chilonzor", "Tashkent Law School Yunusobod",
  ...COURSE_KEYWORDS,
  ...UNIVERSITY_KEYWORDS,
  ...PLACE_KEYWORDS,
];

export const DEFAULT_TITLE = "Tashkent Law School — huquq, ingliz tili kurslari va TDYU, HMQA, JIDU ga tayyorlov";
export const DEFAULT_DESCRIPTION =
  "Tashkent Law School — Toshkentdagi huquqiy o‘quv markazi. Huquq, ingliz tili, tarix, ona tili, turk tili va matematika kurslari; " +
  "TDYU (Toshkent davlat yuridik universiteti), HMQA va JIDU ga tayyorlov, milliy sertifikat va DTM testlari. Chilonzor, Yunusobod va Urganch filiallari.";

/* ------------------------------------------------------------------ backend fetch */
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
    const o = json as { data?: unknown };
    if (o.data !== undefined && o.data !== null && typeof o.data === "object") return unwrapOne<T>(o.data);
    return json as T;
  }
  return null;
}

async function get(path: string): Promise<unknown> {
  try {
    const r = await fetch(`${API_ORIGIN}${path}`, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
    });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}

export type SeoCourse = {
  id: number; title_uz?: string; title_ru?: string; title_en?: string;
  description_uz?: string; description_ru?: string; description_en?: string;
  price?: number | string | null; duration?: string | null; image?: string | null; updatedAt?: string;
};
export type SeoNews = {
  id: number; title_uz?: string; title_ru?: string; title_en?: string;
  excerpt_uz?: string; content_uz?: string; image?: string | null; createdAt?: string; updatedAt?: string;
};
export type SeoFaq = { question_uz?: string; answer_uz?: string };

export const fetchCourses = async () => unwrapList<SeoCourse>(await get("/api/courses/offers?is_active=true&limit=100"));
export const fetchCourse = async (id: string) => unwrapOne<SeoCourse>(await get(`/api/courses/offers/${encodeURIComponent(id)}`));
export const fetchNewsList = async () => unwrapList<SeoNews>(await get("/api/news?status=published&limit=100"));
export const fetchNews = async (id: string) => unwrapOne<SeoNews>(await get(`/api/news/${encodeURIComponent(id)}`));
export const fetchFaq = async () => unwrapList<SeoFaq>(await get("/api/faq"));

/* ------------------------------------------------------------------ text helpers */
const EMOJI = new RegExp("[\\u{1F300}-\\u{1FAFF}\\u{2600}-\\u{27BF}\\u{FE0F}]", "gu");
export function plain(s?: string | null, max = 160): string {
  const t = String(s ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(EMOJI, "")
    .replace(/\s+/g, " ")
    .trim();
  return t.length > max ? `${t.slice(0, max - 1).replace(/\s+\S*$/, "")}…` : t;
}

export function mediaUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith("/images/")) return `${SITE_URL}${path}`;
  return `${API_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}

export const courseTitle = (c: SeoCourse) => plain(c.title_uz || c.title_ru || c.title_en, 90).replace(/[;,.\s]+$/, "");

/** Search phrases (uz / ru / en) for a course, so every language finds it. */
export function courseAliases(title: string): string[] {
  const t = title.toLowerCase();
  if (/huquq/.test(t)) return ["Huquq kursi", "Курсы права", "Law course"];
  if (/ingliz/.test(t)) return ["Ingliz tili kursi", "Курсы английского языка", "English course"];
  if (/turk/.test(t)) return ["Turk tili kursi", "Курсы турецкого языка", "Turkish language course"];
  if (/ona tili/.test(t)) return ["Ona tili kursi", "Курсы родного языка", "Uzbek language course"];
  if (/tarix/.test(t)) return ["Tarix kursi", "Курсы истории", "History course"];
  if (/matem/.test(t)) return ["Matematika kursi", "Курсы математики", "Math course"];
  return [];
}

/* ------------------------------------------------------------------ JSON-LD */
const ORG_ID = `${SITE_URL}/#organization`;

export function organizationJsonLd(courses: SeoCourse[]) {
  const branches = BRANCHES.map((b) => ({
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${SITE_URL}/#branch-${b.id}`,
    name: `${SITE_NAME} — ${b.name.uz}`,
    alternateName: [`${SITE_NAME} ${b.short.uz}`, `${SITE_NAME} ${b.short.ru}`],
    parentOrganization: { "@id": ORG_ID },
    url: SITE_URL,
    image: `${SITE_URL}/images/hero-poster.jpg`,
    logo: `${SITE_URL}/images/logo-512.png`,
    telephone: b.phoneHref,
    priceRange: "700 000 – 1 200 000 UZS",
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address.uz,
      addressLocality: b.city.uz,
      addressCountry: "UZ",
    },
    geo: { "@type": "GeoCoordinates", latitude: b.coords[0], longitude: b.coords[1] },
    hasMap: b.mapLink,
    sameAs: [b.instagram, b.telegram].filter(Boolean),
  }));

  const courseNodes = courses.map((c) => {
    const name = courseTitle(c);
    const price = Number(String(c.price ?? "").replace(/\D/g, ""));
    return {
      "@type": "Course",
      "@id": `${SITE_URL}/courses/${c.id}#course`,
      name,
      alternateName: courseAliases(name),
      description: plain(c.description_uz || c.description_ru, 300) || `${name} — ${SITE_NAME}`,
      url: `${SITE_URL}/courses/${c.id}`,
      inLanguage: ["uz", "ru"],
      provider: { "@id": ORG_ID },
      ...(price
        ? { offers: { "@type": "Offer", price, priceCurrency: "UZS", category: "Paid", availability: "https://schema.org/InStock", url: `${SITE_URL}/courses/${c.id}` } }
        : {}),
      hasCourseInstance: { "@type": "CourseInstance", courseMode: "Onsite", location: BRANCHES.map((b) => b.name.uz).join(", ") },
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": ORG_ID,
        name: SITE_NAME,
        alternateName: ["Tashkent Law", "TashkentLaw", "Ташкент Лоу Скул", "TLS — Huquqiy o‘quv markazi"],
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo-512.png`,
        image: `${SITE_URL}/images/hero-poster.jpg`,
        description: DEFAULT_DESCRIPTION,
        telephone: CONTACT.phoneHref,
        foundingDate: "2023",
        areaServed: [{ "@type": "City", name: "Tashkent" }, { "@type": "AdministrativeArea", name: "Khorezm" }, { "@type": "Country", name: "Uzbekistan" }],
        knowsAbout: [
          "Huquq", "Law", "Право", "English language", "Ingliz tili", "History of Uzbekistan", "Turkish language", "Mathematics",
          "Tashkent State University of Law (TSUL / TDYU)", "Law Enforcement Academy of Uzbekistan (HMQA)",
          "University of World Economy and Diplomacy (UWED / JIDU)", "National certificate", "DTM entrance exams",
        ],
        sameAs: Array.from(new Set([CONTACT.instagram, CONTACT.telegramChannel, ...BRANCHES.map((b) => b.instagram)])),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: CONTACT.phoneHref,
          contactType: "admissions",
          availableLanguage: ["Uzbek", "Russian", "English"],
        },
        department: branches.map((b) => ({ "@id": b["@id"] })),
        ...(courseNodes.length
          ? {
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Kurslar · Курсы · Courses",
                itemListElement: courseNodes.map((c) => ({ "@type": "Offer", itemOffered: { "@id": c["@id"] } })),
              },
            }
          : {}),
      },
      ...branches,
      ...courseNodes,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: "Tashkent Law",
        url: SITE_URL,
        inLanguage: ["uz", "ru", "en"],
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Bosh sahifa", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

/** Renders a JSON-LD <script>; `<` is escaped so admin text can never close the tag. */
export function jsonLdHtml(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
