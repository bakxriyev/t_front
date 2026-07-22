"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { C } from "@/lib/constants";
import { getImageUrl } from "@/lib/utils";
import { Loader2, ArrowLeft, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api-client";

type NewsItem = {
  id: number;
  title_uz: string; title_ru: string; title_en: string;
  excerpt_uz?: string; excerpt_ru?: string; excerpt_en?: string;
  content_uz: string; content_ru: string; content_en: string;
  image?: string;
  status: string;
  created_at: string;
};

export default function NewsDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { lang } = useLanguage();
  const [data, setData] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;
    const fetchNews = async () => {
      try {
        const res = await api.get(`/api/news/${params.id}`);
        setData(res.data.data || res.data);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [params?.id]);

  const l = lang.toLowerCase() as "uz" | "ru" | "en";
  const title = data ? (data as any)[`title_${l}`] || data.title_en || data.title_uz : "";
  const content = data ? (data as any)[`content_${l}`] || data.content_en || data.content_uz : "";
  const excerpt = data ? (data as any)[`excerpt_${l}`] || (data as any)[`excerpt_en`] || "" : "";

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const locale = lang === "UZ" ? "uz-UZ" : lang === "RU" ? "ru-RU" : "en-US";
      return new Date(dateStr).toLocaleDateString(locale, {
        year: "numeric", month: "long", day: "numeric",
      });
    } catch { return dateStr; }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]" style={{ paddingTop: "90px" }}>
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: C.gold }} />
        </div>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh]" style={{ paddingTop: "90px" }}>
          <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: C.white }}>
            Yangilik topilmadi
          </h1>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: C.gold }}
          >
            <ArrowLeft size={16} /> Yangiliklar ro'yxatiga qaytish
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ color: C.white, fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div style={{ paddingTop: "90px" }}>
        <div
          className="relative overflow-hidden"
          style={{ background: C.bg, minHeight: "100vh" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 md:py-12">
            <div className="mb-6">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: C.gold }}
              >
                <ArrowLeft size={16} /> Yangiliklar ro'yxatiga qaytish
              </Link>
            </div>

            {data.image && (
              <div className="rounded-2xl overflow-hidden mb-8">
                <img
                  src={getImageUrl(data.image)}
                  alt={title}
                  className="w-full h-auto max-h-[500px] object-cover"
                  style={{ filter: "brightness(0.7)" }}
                />
              </div>
            )}

            <div className="flex items-center gap-4 text-sm mb-6" style={{ color: C.muted }}>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{formatDate(data.created_at)}</span>
              </div>
              <span style={{ color: C.border }}>|</span>
              <span>TLS</span>
            </div>

            <h1
              className="text-2xl sm:text-4xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: C.white }}
            >
              {title}
            </h1>

            {excerpt && (
              <p
                className="text-base sm:text-lg leading-relaxed mb-8"
                style={{ color: C.secondary, fontStyle: "italic" }}
              >
                {excerpt}
              </p>
            )}

            <div
              className="text-base leading-relaxed space-y-4"
              style={{ color: C.secondary, lineHeight: "1.8" }}
            >
              {content.split("\n").map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t" style={{ borderColor: C.border }}>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: C.btnGrad,
                  color: C.white,
                  boxShadow: C.btnShadow,
                }}
              >
                Barcha yangiliklar <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
