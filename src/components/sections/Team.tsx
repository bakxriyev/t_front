"use client";

import { Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { C } from "@/lib/constants";
import { useApiData } from "@/hooks/useApiData";
import { getImageUrl } from "@/lib/utils";

export function Team() {
  const { lang, t } = useLanguage();
  const suffix = lang.toLowerCase();
  const { data: team } = useApiData<{
    id: number;
    first_name_uz: string; first_name_ru: string; first_name_en: string;
    last_name_uz: string; last_name_ru: string; last_name_en: string;
    position_uz: string; position_ru: string; position_en: string;
    bio_uz: string; bio_ru: string; bio_en: string;
    photo: string;
    order: number;
  }>('/api/team?is_active=true');

  return (
    <section id="team" className="relative overflow-hidden py-10 md:py-16 section-glass" style={{ background: "rgba(13,13,13,0.5)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <SectionLabel>{t.team_label}</SectionLabel>
          <AnimatedText
            text={t.team_title}
            as="h2"
            className="text-2xl md:text-5xl font-bold font-serif"
            style={{ color: C.white }}
            type="words"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {(team ?? []).map((m) => {
            const fields = m as unknown as Record<string, string>;
            const firstName = fields[`first_name_${suffix}`] || fields.first_name_en;
            const lastName = fields[`last_name_${suffix}`] || fields.last_name_en;
            const role = fields[`position_${suffix}`] || fields.position_en;
            const bio = fields[`bio_${suffix}`] || fields.bio_en;
            return (
              <div
                key={m.id}
                className="rounded-xl md:rounded-2xl overflow-hidden group transition-all hover:-translate-y-1"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(236,198,103,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden" style={{ background: "#111" }}>
                  <img
                    src={getImageUrl(m.photo)}
                    alt={`${firstName} ${lastName}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(13,13,13,0.9) 100%)" }} />
                </div>
                <div className="p-4 md:p-5 text-center -mt-1 relative">
                  <h3
                    className="font-bold mb-0.5 leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif", color: C.white, fontSize: "15px" }}
                  >
                    {firstName as string} {lastName as string}
                  </h3>
                  <div className="text-xs font-medium mb-2" style={{ color: C.gold, fontFamily: "'Inter', sans-serif" }}>
                    {role as string}
                  </div>
                  {bio && (
                    <div
                      className="text-[11px] leading-relaxed px-2 py-1 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.04)", color: C.muted, fontFamily: "'Inter', sans-serif" }}
                    >
                      {bio as string}
                    </div>
                  )}
                  <div className="flex justify-center gap-2 mt-3">
                    {[Linkedin, Mail].map((Icon, i) => (
                      <button
                        key={i}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:bg-white/10"
                        style={{ background: "rgba(255,255,255,0.06)", color: C.muted }}
                      >
                        <Icon size={12} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
