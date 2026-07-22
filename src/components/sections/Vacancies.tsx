"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { C } from "@/lib/constants";
import { useApiData } from "@/hooks/useApiData";
import { X, Send, Loader2, CheckCircle, Briefcase } from "lucide-react";
import { sendToTelegram, formatDate } from "@/lib/telegram";

interface VacancyData {
  id: number;
  title_uz: string; title_ru: string; title_en: string;
  description_uz: string; description_ru: string; description_en: string;
  requirements_uz: string; requirements_ru: string; requirements_en: string;
  salary: string;
  type: string;
  is_active: boolean;
}

function VacancyModal({
  vacancyTitle,
  onClose,
}: {
  vacancyTitle: string;
  onClose: () => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) return;

    setSending(true);
    const dateStr = formatDate();
    const text = `<b>💼 Yangi ariza — Vakansiyaga murojaat</b>\n━━━━━━━━━━━━━━━━━━━\n\n👤 <b>Ism:</b>  ${firstName.trim()}\n👤 <b>Familiya:</b>  ${lastName.trim()}\n📞 <b>Telefon:</b>  ${phone.trim()}\n💼 <b>Vakansiya:</b>  ${vacancyTitle}\n📋 <b>Tajriba:</b>  ${experience.trim() || "—"}\n\n━━━━━━━━━━━━━━━━━━━\n📅 ${dateStr}`;
    const result = await sendToTelegram(text, true);
    if (result.success) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 1500);
    }
    setSending(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-lg rounded-3xl p-8 animate-fade-in-up"
        style={{ background: C.card, border: "1px solid rgba(236,198,103,0.3)" }}
      >
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full transition-colors duration-200 hover:opacity-70" style={{ color: C.muted }} aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: C.burGrad }}>
            <Briefcase className="w-7 h-7" style={{ color: C.gold }} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: C.white }}>
            Apply for Position
          </h2>
          <p style={{ color: C.muted, fontSize: "0.875rem" }}>{vacancyTitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5 font-sans" style={{ color: C.secondary }}>First Name</label>
              <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 font-sans"
                style={{ background: "#141414", border: `1px solid ${C.border}`, color: C.white }}
                onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(236,198,103,0.1)`; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 font-sans" style={{ color: C.secondary }}>Last Name</label>
              <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 font-sans"
                style={{ background: "#141414", border: `1px solid ${C.border}`, color: C.white }}
                onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(236,198,103,0.1)`; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5 font-sans" style={{ color: C.secondary }}>Phone Number</label>
            <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998 XX XXX XX XX"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 font-sans"
              style={{ background: "#141414", border: `1px solid ${C.border}`, color: C.white }}
              onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(236,198,103,0.1)`; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5 font-sans" style={{ color: C.secondary }}>Experience / About You</label>
            <textarea value={experience} onChange={(e) => setExperience(e.target.value)}
              placeholder="Tell us about your experience, skills, and why you are interested in this position..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 font-sans resize-none"
              style={{ background: "#141414", border: `1px solid ${C.border}`, color: C.white }}
              onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(236,198,103,0.1)`; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>

          <button
            type="submit"
            disabled={sending || sent}
            className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm font-sans transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:hover:translate-y-0"
            style={{ background: sent ? "#22c55e" : C.btnGrad, color: C.bg, boxShadow: C.btnShadow }}
          >
            {sent ? (
              <><CheckCircle className="w-4 h-4" />Ariza qabul qilindi!</>
            ) : sending ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Jo'natilmoqda...</>
            ) : (
              <><Send className="w-4 h-4" />Submit Application</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export function Vacancies() {
  const { lang, t } = useLanguage();
  const suffix = lang.toLowerCase();
  const { data: vacancies } = useApiData<VacancyData>('/api/vacancies?is_active=true');
  const [selectedVacancy, setSelectedVacancy] = useState<{ title: string } | null>(null);

  return (
    <section id="vacancies" className="relative overflow-hidden py-10 md:py-16 section-glass" style={{ background: "rgba(13,13,13,0.5)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <SectionLabel>{t.vacancies_label}</SectionLabel>
          <AnimatedText text={t.vacancies_title} as="h2" className="text-2xl md:text-5xl font-bold mb-4 font-serif" style={{ color: C.white }} type="words" />
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
                    <h3 className="font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: C.white, fontSize: "16px" }}>{title as string}</h3>
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
                  onClick={() => setSelectedVacancy({ title: title as string })}
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

      {selectedVacancy && (
        <VacancyModal vacancyTitle={selectedVacancy.title} onClose={() => setSelectedVacancy(null)} />
      )}
    </section>
  );
}
