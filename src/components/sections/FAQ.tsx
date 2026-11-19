"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API, byOrder, pick, useList, type Faq } from "@/lib/content";
import { CONTACT, DEFAULT_FAQ } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TelegramIcon } from "@/components/ui/Icons";

export function FAQ() {
  const { lang, t } = useLanguage();
  const { data, loading } = useList<Faq>(API.faq);
  const items = data.length ? [...data].sort(byOrder) : loading ? [] : DEFAULT_FAQ;
  const [open, setOpen] = useState<number | null>(null);
  const openId = open ?? items[0]?.id ?? null;

  return (
    <section id="faq" className="section">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading align="left" eyebrow={t.faq_eyebrow} title={t.faq_title} sub={t.faq_more} />
          <Reveal delay={0.1}>
            <div className="spot ring-grad relative overflow-hidden rounded-[26px] bg-grad-wine p-6 text-white shadow-wine">
              <span className="icon-tile-gold relative z-[2] h-12 w-12"><MessageCircle className="relative h-5 w-5" /></span>
              <p className="num relative z-[2] mt-4 text-xl font-semibold">{CONTACT.phone}</p>
              <div className="relative z-[2] mt-5 flex flex-wrap gap-2">
                <a href={`tel:${CONTACT.phoneHref}`} className="btn btn-gold btn-sm"><Phone className="h-4 w-4" />{t.cta_call}</a>
                <a href={CONTACT.telegramAdmin} target="_blank" rel="noopener noreferrer" className="btn btn-glass btn-sm"><TelegramIcon className="h-4 w-4" />Telegram</a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="space-y-2.5">
          {items.map((f, i) => {
            const on = openId === f.id;
            return (
              <Reveal key={f.id} delay={i * 0.04}>
                <div className={`overflow-hidden rounded-[20px] border transition-[border-color,background-color] duration-500 ease-silk ${on ? "border-gold-400/40 bg-white/[.07]" : "border-white/[.08] bg-white/[.03] hover:border-white/20 hover:bg-white/[.05]"}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(on ? -1 : f.id)}
                    aria-expanded={on}
                    className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="font-display text-xl font-semibold leading-snug text-white sm:text-[22px]">{pick(f, "question", lang)}</span>
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${on ? "rotate-45 bg-grad-gold text-wine-950" : "bg-white/[.07] text-gold-300"}`}>
                      <Plus className="h-5 w-5" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                        <p className="whitespace-pre-line px-5 pb-5 text-[15px] leading-relaxed text-ink-soft sm:px-6">{pick(f, "answer", lang)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
