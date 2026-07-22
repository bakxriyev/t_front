"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useApiData } from "@/hooks/useApiData";
import { C } from "@/lib/constants";
import { getImageUrl } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GoldText } from "@/components/ui/GoldText";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

type NewsItem = {
  id: number;
  title_uz: string; title_ru: string; title_en: string;
  excerpt_uz?: string; excerpt_ru?: string; excerpt_en?: string;
  content_uz: string; content_ru: string; content_en: string;
  image?: string;
  created_at: string;
};

function NewsCard({
  id,
  title,
  date,
  excerpt,
  img,
}: {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  img: string;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
      }}
    >
      <div className="overflow-hidden relative" style={{ height: 200 }}>
        <img
          src={img}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          style={{ filter: "brightness(0.65)" }}
        />
      </div>

      <div className="p-4 md:p-6">
        <div className="flex items-center gap-3 text-xs mb-4" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{date}</span>
          </div>
          <span style={{ color: C.border, fontFamily: "'Inter', sans-serif" }}>|</span>
          <span>TLS</span>
        </div>

        <h3
          className="text-[15px] font-semibold leading-snug mb-3"
          style={{ fontFamily: "'Playfair Display', serif", color: C.white }}
        >
          {title}
        </h3>

        <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif", color: C.muted }}>
          {excerpt}
        </p>

        <Link
          href={`/news/${id}`}
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 group"
          style={{ fontFamily: "'Inter', sans-serif", color: C.gold, background: "none", border: "none", cursor: "pointer" }}
        >
          Batafsil
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export function NewsSection({ showAll = false }: { showAll?: boolean }) {
  const { lang, t } = useLanguage();
  const { data: news, loading } = useApiData<NewsItem>("/api/news?status=published");

  const displayed = showAll ? news : news.slice(0, 3);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const locale = lang === "UZ" ? "uz-UZ" : lang === "RU" ? "ru-RU" : "en-US";
      return new Date(dateStr).toLocaleDateString(locale, {
        year: "numeric", month: "short", day: "numeric",
      });
    } catch { return dateStr; }
  };

  return (
    <section
      id="news"
      className="relative overflow-hidden py-10 md:py-16 section-glass"
      style={{ background: "rgba(13,13,13,0.5)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionLabel>{t.news_label || "Latest Updates"}</SectionLabel>
        <h2
          className="text-2xl sm:text-5xl font-bold mb-8 md:mb-12"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <GoldText>{t.news_title || "News & Events"}</GoldText>
        </h2>

        {loading ? (
          <div className="text-center py-12" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
            Loading...
          </div>
        ) : displayed.length === 0 ? (
          <p className="text-center py-12" style={{ fontFamily: "'Inter', sans-serif", color: C.muted }}>
            Yangiliklar mavjud emas
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {displayed.map((item) => (
              <NewsCard
                key={item.id}
                id={item.id}
                title={(item as any)[`title_${lang.toLowerCase()}`] || item.title_en || item.title_uz}
                date={formatDate(item.created_at)}
                excerpt={(item as any)[`excerpt_${lang.toLowerCase()}`] || (item as any)[`excerpt_en`] || ""}
                img={getImageUrl(item.image)}
              />
            ))}
          </div>
        )}

        {!showAll && news.length > 3 && (
          <div className="text-center mt-10">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: C.btnGrad,
                color: C.white,
                boxShadow: C.btnShadow,
              }}
            >
              Barcha yangiliklar
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
