"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { C, FAQS } from "@/lib/constants";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { useApiData } from "@/hooks/useApiData";

interface FaqApiItem {
  id: number;
  question_uz: string;
  question_ru: string;
  question_en: string;
  answer_uz: string;
  answer_ru: string;
  answer_en: string;
  order: number;
}

export function FAQ() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  const { data: apiItems } = useApiData<FaqApiItem>("/api/faq");

  const l = lang.toLowerCase();

  const items = apiItems.length > 0
    ? apiItems.map((item) => ({
        q: item.question_en,
        q_uz: item.question_uz,
        q_ru: item.question_ru,
        a: item.answer_en,
        a_uz: item.answer_uz,
        a_ru: item.answer_ru,
      }))
    : FAQS;

  return (
    <section id="faq" className="relative overflow-hidden py-10 md:py-16 section-glass" style={{ background: "rgba(11,11,11,0.45)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-3xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <SectionLabel>{t.faq_label}</SectionLabel>
          <AnimatedText
            text={t.faq_title}
            as="h2"
            className="text-4xl md:text-5xl font-bold font-serif"
            style={{ color: C.white }}
            type="words"
          />
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                background: C.card,
                border: `1px solid ${open === i ? "rgba(236,198,103,0.4)" : C.border}`,
              }}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <h3 className="font-semibold text-sm" style={{ color: C.white, fontFamily: "'Inter', sans-serif" }}>
                  {l === "uz" && (item as any).q_uz ? (item as any).q_uz : l === "ru" && (item as any).q_ru ? (item as any).q_ru : item.q}
                </h3>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: open === i ? C.btnGrad : "rgba(255,255,255,0.06)",
                    color: open === i ? C.bg : C.muted,
                    boxShadow: open === i ? C.btnShadow : "none",
                  }}
                >
                  {open === i ? <Minus size={13} /> : <Plus size={13} />}
                </div>
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <div className="h-px mb-4" style={{ background: C.border }} />
                  <p className="text-sm leading-relaxed" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                    {l === "uz" && (item as any).a_uz ? (item as any).a_uz : l === "ru" && (item as any).a_ru ? (item as any).a_ru : item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
