"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { C } from "@/lib/constants";
import { useApiData } from "@/hooks/useApiData";
import { X, Send, Loader2, CheckCircle, Briefcase, MapPin, DollarSign, Clock, ChevronRight } from "lucide-react";
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

function VacancyDetailModal({
  v,
  lang,
  t,
  onClose,
}: {
  v: VacancyData;
  lang: string;
  t: Record<string, string>;
  onClose: () => void;
}) {
  const suffix = lang.toLowerCase();
  const fields = v as unknown as Record<string, string>;
  const title = fields[`title_${suffix}`] || fields.title_en;
  const desc = fields[`description_${suffix}`] || fields.description_en || "";
  const reqs = fields[`requirements_${suffix}`] || fields.requirements_en || "";

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-2xl rounded-3xl overflow-hidden animate-fade-in-up"
          style={{ background: C.card, border: "1px solid rgba(236,198,103,0.3)", maxHeight: "90vh", display: "flex", flexDirection: "column" }}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4" style={{ background: C.card }}>
            <h2 className="text-xl md:text-2xl font-bold pr-8" style={{ fontFamily: "'Playfair Display', serif", color: C.white }}>
              {title}
            </h2>
            <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full transition-colors duration-200 hover:opacity-70" style={{ color: C.muted }} aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto px-6 pb-6 space-y-5" style={{ flex: 1 }}>
            <div className="flex flex-wrap gap-3">
              {v.type && (
                <span className="text-[11px] px-3 py-1 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.06)", color: C.gold, fontFamily: "'Inter', sans-serif" }}>
                  {v.type.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </span>
              )}
              {v.salary && (
                <span className="text-[11px] px-3 py-1 rounded-full font-medium flex items-center gap-1.5" style={{ background: "rgba(255,255,255,0.06)", color: C.secondary, fontFamily: "'Inter', sans-serif" }}>
                  <DollarSign size={12} style={{ color: C.gold }} />{v.salary}
                </span>
              )}
            </div>

            {desc && (
              <div>
                <h4 className="text-sm font-semibold mb-2" style={{ fontFamily: "'Inter', sans-serif", color: C.white }}>
                  {lang === "UZ" ? "Tavsif" : lang === "RU" ? "Описание" : "Description"}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>{desc}</p>
              </div>
            )}

            {reqs && (
              <div>
                <h4 className="text-sm font-semibold mb-2" style={{ fontFamily: "'Inter', sans-serif", color: C.white }}>
                  {t.requirements_label || "Requirements"}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>{reqs}</p>
              </div>
            )}

            <div className="pt-4 border-t" style={{ borderColor: C.border }}>
              <ApplyForm vacancyTitle={title} t={t} onClose={onClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplyForm({
  vacancyTitle,
  t,
  onClose,
}: {
  vacancyTitle: string;
  t: Record<string, string>;
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
    <div>
      <h4 className="text-base font-semibold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif", color: C.white }}>
        {t.apply_position || "Apply for Position"}
      </h4>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: C.secondary, fontFamily: "'Inter', sans-serif" }}>{t.firstname || "First Name"}</label>
            <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John"
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-300"
              style={{ background: "#141414", border: `1px solid ${C.border}`, color: C.white, fontFamily: "'Inter', sans-serif" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(236,198,103,0.1)`; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: C.secondary, fontFamily: "'Inter', sans-serif" }}>{t.lastname || "Last Name"}</label>
            <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe"
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-300"
              style={{ background: "#141414", border: `1px solid ${C.border}`, color: C.white, fontFamily: "'Inter', sans-serif" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(236,198,103,0.1)`; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: C.secondary, fontFamily: "'Inter', sans-serif" }}>{t.phone || "Phone Number"}</label>
          <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998 XX XXX XX XX"
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-300"
            style={{ background: "#141414", border: `1px solid ${C.border}`, color: C.white, fontFamily: "'Inter', sans-serif" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(236,198,103,0.1)`; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: C.secondary, fontFamily: "'Inter', sans-serif" }}>{t.experience_label || "Experience / About You"}</label>
          <textarea value={experience} onChange={(e) => setExperience(e.target.value)}
            placeholder={t.experience_placeholder || "Tell us about your experience..."}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-300 resize-none"
            style={{ background: "#141414", border: `1px solid ${C.border}`, color: C.white, fontFamily: "'Inter', sans-serif" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(236,198,103,0.1)`; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>

        <button
          type="submit"
          disabled={sending || sent}
          className="w-full py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:hover:translate-y-0"
          style={{ background: sent ? "#22c55e" : C.btnGrad, color: C.bg, fontFamily: "'Inter', sans-serif", boxShadow: C.btnShadow }}
        >
          {sent ? (
            <><CheckCircle className="w-4 h-4" />{t.application_sent || "Application received!"}</>
          ) : sending ? (
            <><Loader2 className="w-4 h-4 animate-spin" />{t.sending_text || "Sending..."}</>
          ) : (
            <><Send className="w-4 h-4" />{t.submit_enroll || "Submit Application"}</>
          )}
        </button>
      </form>
    </div>
  );
}

export function Vacancies() {
  const { lang, t } = useLanguage();
  const suffix = lang.toLowerCase();
  const { data: vacancies } = useApiData<VacancyData>('/api/vacancies?is_active=true');
  const [selectedVacancy, setSelectedVacancy] = useState<VacancyData | null>(null);

  return (
    <section id="vacancies" className="relative overflow-hidden py-10 md:py-16 section-glass" style={{ background: "rgba(13,13,13,0.5)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <SectionLabel>{t.vacancies_label}</SectionLabel>
          <AnimatedText text={t.vacancies_title} as="h2" className="text-2xl md:text-5xl font-bold mb-4 font-serif" style={{ color: C.white }} type="words" />
          <p className="text-base max-w-lg mx-auto" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
            {t.vacancies_subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {(vacancies ?? []).map((v) => {
            const fields = v as unknown as Record<string, string>;
            const title = fields[`title_${suffix}`] || fields.title_en;
            const requirements = fields[`requirements_${suffix}`] || fields.requirements_en;
            const desc = fields[`description_${suffix}`] || fields.description_en || "";
            return (
              <div
                key={v.id}
                className="p-4 md:p-6 rounded-xl md:rounded-2xl transition-all hover:-translate-y-1 cursor-pointer group"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
                onClick={() => setSelectedVacancy(v)}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(236,198,103,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 pr-2">
                    <h3 className="font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: C.white, fontSize: "16px" }}>{title as string}</h3>
                    <div className="flex flex-wrap gap-2">
                      {v.type && (
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.05)", color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                          {v.type.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={18} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: C.gold }} />
                </div>

                {desc && (
                  <p className="text-sm mb-3 leading-relaxed line-clamp-2" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                    {desc}
                  </p>
                )}

                <p className="text-sm mb-2 leading-relaxed" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                  <span style={{ color: C.secondary, fontWeight: 600 }}>{t.requirements_label || "Requirements"}:</span> {requirements}
                </p>

                <div className="flex items-center gap-5 text-xs mb-5" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                  {v.salary && <span style={{ color: C.gold }}>💰 {v.salary}</span>}
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedVacancy(v); }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5 active:translate-y-0.5"
                  style={{ background: C.btnGrad, color: C.bg, fontFamily: "'Inter', sans-serif", boxShadow: C.btnShadow }}
                >
                  {t.view_details || "View Details"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {selectedVacancy && (
        <VacancyDetailModal v={selectedVacancy} lang={lang} t={t} onClose={() => setSelectedVacancy(null)} />
      )}
    </section>
  );
}
