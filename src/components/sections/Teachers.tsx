"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApiData } from "@/hooks/useApiData";
import { getImageUrl } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldText from "@/components/ui/GoldText";
import { C } from "@/lib/constants";
import { Briefcase, Award } from "lucide-react";
import Link from "next/link";

interface TeacherData {
  id: number;
  first_name_uz: string;
  first_name_ru: string;
  first_name_en: string;
  last_name_uz: string;
  last_name_ru: string;
  last_name_en: string;
  position_uz: string;
  position_ru: string;
  position_en: string;
  degree_uz: string;
  degree_ru: string;
  degree_en: string;
  bio_uz?: string;
  bio_ru?: string;
  bio_en?: string;
  photo: string;
  order: number;
}

export function Teachers() {
  const { lang, t } = useLanguage();
  const { data: teachers, loading } = useApiData<TeacherData>("/api/teachers?is_active=true");

  return (
    <section id="teachers" style={{ background: "rgba(13,13,13,0.5)" }} className="relative overflow-hidden py-10 md:py-16">
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <div className="flex justify-center">
            <SectionLabel>Bizning o'qituvchilar</SectionLabel>
          </div>
          <GoldText
            as="h2"
            className="text-2xl md:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t.teachers_title}
          </GoldText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {teachers.map((teacher) => {
            const l = lang.toLowerCase() as 'uz' | 'ru' | 'en';
            const name = `${teacher[`first_name_${l}`]} ${teacher[`last_name_${l}`]}`;
            const position = teacher[`position_${l}`];
            const degree = teacher[`degree_${l}`];
            const bio = teacher[`bio_${l}`] || "";
            return (
              <div
                key={teacher.id}
                className="group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.2)`,
                }}
              >
                <div className="relative overflow-hidden" style={{ height: 280 }}>
                  <img
                    src={getImageUrl(teacher.photo)}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <h3
                      className="text-lg md:text-xl font-bold leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif", color: C.white }}
                    >
                      {name}
                    </h3>
                  </div>
                </div>
                <div className="p-4 md:p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Briefcase size={13} style={{ color: C.gold }} />
                    <span className="text-xs font-medium" style={{ color: C.gold, fontFamily: "'Inter', sans-serif" }}>
                      {position}
                    </span>
                  </div>
                  {degree && (
                    <div className="flex items-center gap-2">
                      <Award size={13} style={{ color: C.gold }} />
                      <span className="text-xs" style={{ color: C.secondary, fontFamily: "'Inter', sans-serif" }}>
                        {degree}
                      </span>
                    </div>
                  )}
                  {bio && (
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                      {bio}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/teachers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: C.btnGrad,
              color: C.white,
              boxShadow: C.btnShadow,
            }}
          >
            Barcha o'qituvchilar
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
