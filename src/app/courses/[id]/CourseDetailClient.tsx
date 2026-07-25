"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { C } from "@/lib/constants";
import { getImageUrl } from "@/lib/utils";
import { Loader2, ArrowLeft, Clock, GraduationCap, ChevronRight, BookOpen, CheckCircle } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api-client";
import { EnrollModal } from "@/components/ui/EnrollModal";

interface CourseData {
  id: number;
  title_uz: string; title_ru: string; title_en: string;
  description_uz: string; description_ru: string; description_en: string;
  full_description_uz?: string; full_description_ru?: string; full_description_en?: string;
  price: string;
  duration: string;
  level: string;
  image: string;
  order: number;
  syllabus?: string[];
}

const LEVEL_COLORS: Record<string, string> = {
  Foundation: "#4CAF50",
  Intermediate: "#FF9800",
  Advanced: "#E53935",
  "All Levels": "#997157",
};

const LEVEL_LABELS: Record<string, Record<string, string>> = {
  EN: { Foundation: "Foundation", Intermediate: "Intermediate", Advanced: "Advanced", "All Levels": "All Levels" },
  RU: { Foundation: "Базовый", Intermediate: "Средний", Advanced: "Продвинутый", "All Levels": "Все уровни" },
  UZ: { Foundation: "Boshlang'ich", Intermediate: "O'rta", Advanced: "Yuqori", "All Levels": "Barcha darajalar" },
};

const PRICE_SUFFIX: Record<string, string> = {
  UZ: "so'm / oy",
  RU: "сум / мес",
  EN: "UZS/month",
};

export default function CourseDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [data, setData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEnroll, setShowEnroll] = useState(false);

  useEffect(() => {
    if (!params?.id) return;
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/api/courses/offers/${params.id}`);
        setData(res.data.data || res.data);
      } catch {
        try {
          const res = await api.get("/api/courses/offers?is_active=true");
          const courses: CourseData[] = res.data.data || res.data || [];
          const found = courses.find((c) => String(c.id) === String(params.id));
          setData(found || null);
        } catch {
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [params?.id]);

  const l = lang.toLowerCase() as "uz" | "ru" | "en";
  const title = data ? (data as any)[`title_${l}`] || data.title_en || data.title_uz : "";
  const description = data ? (data as any)[`description_${l}`] || data.description_en || data.description_uz : "";
  const fullDescription = data
    ? (data as any)[`full_description_${l}`] || (data as any)[`full_description_en`] || description
    : "";
  const levelLabel = data ? (LEVEL_LABELS[lang] || LEVEL_LABELS.EN)[data.level] || data.level : "";

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
            Kurs topilmadi
          </h1>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: C.gold }}
          >
            <ArrowLeft size={16} /> Kurslar ro'yxatiga qaytish
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
        <div className="relative overflow-hidden" style={{ background: C.bg, minHeight: "100vh" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 md:py-12">
            <div className="mb-6">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: C.gold }}
              >
                <ArrowLeft size={16} /> Kurslar ro'yxatiga qaytish
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                {data.image && (
                  <div className="rounded-2xl overflow-hidden mb-8">
                    <img
                      src={getImageUrl(data.image)}
                      alt={title}
                      className="w-full h-auto max-h-[400px] object-cover"
                      style={{ filter: "brightness(0.7)" }}
                    />
                  </div>
                )}

                <h1
                  className="text-2xl sm:text-4xl font-bold leading-tight mb-4"
                  style={{ fontFamily: "'Playfair Display', serif", color: C.white }}
                >
                  {title}
                </h1>

                <p className="text-base leading-relaxed mb-6" style={{ color: C.secondary }}>
                  {description}
                </p>

                {fullDescription && (
                  <div className="space-y-4 mb-8">
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Playfair Display', serif", color: C.white }}
                    >
                      {lang === "UZ" ? "To'liq ma'lumot" : lang === "RU" ? "Полная информация" : "Full Description"}
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: C.muted, lineHeight: "1.8" }}>
                      {fullDescription}
                    </p>
                  </div>
                )}

                {data.syllabus && data.syllabus.length > 0 && (
                  <div className="mb-8">
                    <h2
                      className="text-xl font-bold mb-4"
                      style={{ fontFamily: "'Playfair Display', serif", color: C.white }}
                    >
                      {lang === "UZ" ? "O'quv dasturi" : lang === "RU" ? "Учебная программа" : "Syllabus"}
                    </h2>
                    <div className="space-y-2">
                      {data.syllabus.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-xl text-sm"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                        >
                          <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: C.gold }} />
                          <span style={{ color: C.secondary }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-2">
                <div
                  className="rounded-2xl p-6 sticky top-[110px]"
                  style={{ background: C.card, border: "1px solid rgba(236,198,103,0.2)" }}
                >
                  <h3
                    className="text-lg font-bold mb-5"
                    style={{ fontFamily: "'Playfair Display', serif", color: C.white }}
                  >
                    {lang === "UZ" ? "Kurs haqida" : lang === "RU" ? "О курсе" : "About Course"}
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(212,175,55,0.1)" }}
                      >
                        <Clock size={18} style={{ color: C.gold }} />
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: C.muted }}>
                          {lang === "UZ" ? "Davomiylik" : lang === "RU" ? "Длительность" : "Duration"}
                        </p>
                        <p className="text-sm font-semibold" style={{ color: C.white }}>{data.duration}</p>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(212,175,55,0.1)" }}
                      >
                        <GraduationCap size={18} style={{ color: C.gold }} />
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: C.muted }}>
                          {lang === "UZ" ? "Daraja" : lang === "RU" ? "Уровень" : "Level"}
                        </p>
                        <p className="text-sm font-semibold" style={{ color: C.white }}>{levelLabel}</p>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(212,175,55,0.15)" }}
                      >
                        <BookOpen size={18} style={{ color: C.gold }} />
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: C.muted }}>
                          {lang === "UZ" ? "Narx" : lang === "RU" ? "Цена" : "Price"}
                        </p>
                        <p className="text-sm font-bold" style={{ color: C.gold }}>
                          {data.price} {PRICE_SUFFIX[lang]}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowEnroll(true)}
                    className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]"
                    style={{ background: C.btnGrad, color: C.bg, boxShadow: C.btnShadow }}
                  >
                    {t.enroll}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: C.border }}>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: C.btnGrad, color: C.white, boxShadow: C.btnShadow }}
              >
                Barcha kurslar <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {showEnroll && (
        <EnrollModal course={String(data.id)} onClose={() => setShowEnroll(false)} />
      )}
    </div>
  );
}
