"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { C } from "@/lib/constants";
import { useApiData } from "@/hooks/useApiData";

export function Vacancies() {
  const { lang, t } = useLanguage();
  const suffix = lang.toLowerCase();
  const { data: vacancies } = useApiData<{
    id: number;
    title_uz: string; title_ru: string; title_en: string;
    description_uz: string; description_ru: string; description_en: string;
    requirements_uz: string; requirements_ru: string; requirements_en: string;
    salary: string;
    type: string;
    is_active: boolean;
  }>('/api/vacancies?is_active=true');

  return (
    <section id="vacancies" className="relative overflow-hidden py-10 md:py-16 section-glass" style={{ background: "rgba(13,13,13,0.5)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <SectionLabel>{t.vacancies_label}</SectionLabel>
          <AnimatedText
            text={t.vacancies_title}
            as="h2"
            className="text-2xl md:text-5xl font-bold mb-4 font-serif"
            style={{ color: C.white }}
            type="words"
          />
          <p className="text-base max-w-lg mx-auto" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
            Join a team of passionate legal educators and administrators shaping the future of law in Uzbekistan
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {(vacancies ?? []).map((v) => {
            const fields = v as unknown as Record<string, string>;
            const title = fields[`title_${suffix}`] || fields.title_en;
            const requirements = fields[`requirements_${suffix}`] || fields.requirements_en;
            return (
              <div
                key={v.id}
                className="p-4 md:p-6 rounded-xl md:rounded-2xl transition-all hover:-translate-y-1"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(236,198,103,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: C.white, fontSize: "16px" }}>
                      {title as string}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                        {v.type?.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                  <span style={{ color: C.secondary }}>Requirements:</span> {requirements}
                </p>
                <div className="flex items-center gap-5 text-xs mb-5" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                  <span style={{ color: C.gold }}>💰 {v.salary}</span>
                </div>
                <button
                  className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5 active:translate-y-0.5"
                  style={{ background: C.btnGrad, color: C.bg, fontFamily: "'Inter', sans-serif", boxShadow: C.btnShadow }}
                >
                  Apply Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
