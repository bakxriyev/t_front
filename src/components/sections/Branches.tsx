"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, MapPin, Navigation, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BRANCHES } from "@/lib/constants";
import { tr } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TelegramIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { YandexMap } from "@/components/ui/YandexMap";

export function Branches() {
  const { lang, t } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="branches" className="section">
      <div className="shell">
        <SectionHeading eyebrow={t.branches_eyebrow} title={t.branches_title} sub={t.branches_sub} />

        <div className="grid gap-4 lg:grid-cols-[400px_1fr]">
          <div className="flex flex-col gap-3">
            {BRANCHES.map((b, i) => {
              const on = b.id === activeId;
              return (
                <Reveal key={b.id} delay={i * 0.06}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveId(b.id)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveId(b.id)}
                    className={`card spot cursor-pointer p-4 sm:p-5 ${on ? "!border-gold-400/50 bg-gradient-to-br from-wine-700/50 to-wine-950/40" : "card-hover"}`}
                  >
                    <div className="relative z-[2] flex items-start gap-3.5">
                      <span className={`${on ? "icon-tile-gold" : "icon-tile"} h-11 w-11 rounded-xl`}><MapPin className="relative h-5 w-5" strokeWidth={1.8} /></span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-[22px] font-semibold leading-tight text-white">{tr(b.name, lang)}</h3>
                          <span className="rounded-full bg-white/[.07] px-2 py-0.5 font-accent text-[9px] font-medium uppercase tracking-[0.16em] text-gold-200">{tr(b.city, lang)}</span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{tr(b.address, lang)}</p>
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                              {b.landmark && (
                                <p className="pt-2 text-[13px] leading-relaxed text-ink-muted">
                                  <span className="font-semibold text-ink-soft">{t.branch_landmark}:</span> {tr(b.landmark, lang)}
                                </p>
                              )}
                              <div className="flex flex-wrap gap-2 pt-3.5">
                                <a href={`tel:${b.phoneHref}`} onClick={(e) => e.stopPropagation()} className="btn btn-gold btn-sm !px-3.5"><Phone className="h-4 w-4" /><span className="num text-[12px]">{b.phone}</span></a>
                                <a href={b.instagram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label="Instagram" className="btn btn-glass btn-sm !px-3"><Instagram className="h-4 w-4" /></a>
                                <a href={b.telegram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label="Telegram" className="btn btn-glass btn-sm !px-3"><TelegramIcon className="h-4 w-4" /></a>
                                <a href={b.mapLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label={t.cta_route} className="btn btn-glass btn-sm !px-3"><Navigation className="h-4 w-4" /></a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.08} className="ring-grad relative h-[420px] overflow-hidden rounded-[26px] bg-[#141012] lg:h-auto lg:min-h-[480px]">
            <YandexMap branches={BRANCHES} activeId={activeId} onSelect={setActiveId} lang={lang} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
