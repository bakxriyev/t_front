"use client";

import React from "react";
import { Clock, GraduationCap, ArrowRight, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApiData } from "@/hooks/useApiData";
import { getImageUrl } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldText from "@/components/ui/GoldText";
import { C } from "@/lib/constants";
import Link from "next/link";

const COURSE_SUBTITLES: Record<string, string> = {
  EN: "Choose from our range of professional legal courses designed for future legal professionals.",
  RU: "Выберите из нашего ряда профессиональных юридических курсов, разработанных для будущих юристов.",
  UZ: "Kelajakdagi yuridik mutaxassislar uchun mo'ljallangan professional yuridik kurslarimizdan tanlang.",
};

const LEVEL_COLORS: Record<string, string> = {
  Foundation: "#4CAF50",
  Intermediate: "#FF9800",
  Advanced: "#E53935",
  "All Levels": "#997157",
};

const PRICE_SUFFIX: Record<string, string> = {
  UZ: "so'm / oy",
  RU: "сум / мес",
  EN: "UZS/month",
};

const LEVEL_LABELS: Record<string, Record<string, string>> = {
  EN: { Foundation: "Foundation", Intermediate: "Intermediate", Advanced: "Advanced", "All Levels": "All Levels" },
  RU: { Foundation: "Базовый", Intermediate: "Средний", Advanced: "Продвинутый", "All Levels": "Все уровни" },
  UZ: { Foundation: "Boshlang'ich", Intermediate: "O'rta", Advanced: "Yuqori", "All Levels": "Barcha darajalar" },
};

interface CoursesProps {
  onEnroll: (course: string) => void;
  limit?: number;
}

interface CourseData {
  id: number;
  title_uz: string;
  title_ru: string;
  title_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  price: string;
  duration: string;
  level: string;
  image: string;
  order: number;
}

export function Courses({ onEnroll, limit }: CoursesProps) {
  const { lang, t } = useLanguage();
  const { data: courses, loading } = useApiData<CourseData>("/api/courses/offers?is_active=true");
  const displayed = limit ? courses.slice(0, limit) : courses;

  return (
    <section id="courses" style={{ background: "rgba(13,13,13,0.5)" }} className="relative overflow-hidden py-10 md:py-16 section-glass">
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <div className="flex justify-center">
            <SectionLabel>{t.courses_label}</SectionLabel>
          </div>
          <GoldText
            as="h2"
            className="font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem, 3vw, 2.2rem)" }}
          >
            {t.courses_title}
          </GoldText>
          <p
            className="max-w-2xl mx-auto"
            style={{
              color: C.muted,
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.75rem, 1.3vw, 0.9rem)",
            }}
          >
            {COURSE_SUBTITLES[lang]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
          {displayed.map((course) => {
            const title = course[`title_${lang.toLowerCase() as 'uz' | 'ru' | 'en'}`] || course.title_en;
            const description = course[`description_${lang.toLowerCase() as 'uz' | 'ru' | 'en'}`] || course.description_en;
            return (
              <div
                key={course.id}
                className="rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-2"
                style={{
                  background: C.card,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: C.border,
                }}
              >
                <div
                  className="relative h-[200px]"
                  style={{
                    backgroundImage: `url(${getImageUrl(course.image)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
                    }}
                  />
                  <span
                    className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-medium"
                    style={{
                      color: C.white,
                      background: LEVEL_COLORS[course.level] || C.bronze,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {course.level}
                  </span>
                  <span
                    className="absolute bottom-4 right-4 text-xs px-4 py-1 rounded-full font-semibold"
                    style={{
                      background: C.goldGrad,
                      color: C.bg,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {course.price} {PRICE_SUFFIX[lang]}
                  </span>
                </div>

                <div className="p-4 md:p-6">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: C.white,
                    }}
                  >
                    {course[`title_${lang.toLowerCase() as 'uz' | 'ru' | 'en'}`]}
                  </h3>

                  <p
                    className="text-sm mb-5 leading-relaxed"
                    style={{
                      color: C.muted,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {course[`description_${lang.toLowerCase() as 'uz' | 'ru' | 'en'}`]}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <div
                      className="flex items-center gap-2.5 text-sm"
                      style={{
                        color: C.secondary,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      <Clock size={14} style={{ color: C.gold, flexShrink: 0 }} />
                      <span>{course.duration}</span>
                    </div>
                    <div
                      className="flex items-center gap-2.5 text-sm"
                      style={{
                        color: C.secondary,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      <GraduationCap size={14} style={{ color: C.gold, flexShrink: 0 }} />
                      <span>{(LEVEL_LABELS[lang] || LEVEL_LABELS.EN)[course.level] || course.level}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/courses/${course.id}`}
                      className="flex-1 py-3 px-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-1.5"
                      style={{
                        border: `1px solid rgba(212,175,55,0.3)`,
                        color: C.gold,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      <Info size={14} />
                      {t.view_details || "Batafsil"}
                    </Link>
                    <button
                      onClick={() => onEnroll(String(course.id))}
                      className="flex-1 py-3 px-3 rounded-xl text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]"
                      style={{
                          background: C.btnGrad,
                          color: C.bg,
                          boxShadow: C.btnShadow,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {t.enroll}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>

          {limit && courses.length > limit && (
          <div className="text-center mt-10">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: C.btnGrad,
                color: C.white,
                boxShadow: C.btnShadow,
              }}
            >
              {lang === "UZ" ? "Barcha kurslar" : lang === "RU" ? "Все курсы" : "View All Courses"}
              <ArrowRight size={16} />
            </Link>
          </div>
          )}
        </div>
    </section>
  );
}
