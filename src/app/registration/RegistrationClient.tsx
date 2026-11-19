"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGS } from "@/lib/constants";
import { REG_SLIDES } from "@/lib/brochure";
import { LeadForm } from "@/components/ui/LeadForm";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Instagram link-in-bio landing: exactly one screen, no scrolling.
 * Header · one slider · name + phone form. The slider shrinks to whatever
 * height is left, always keeping its 16:9 shape (container query units).
 */
export default function RegistrationClient() {
  const { lang, setLang, t } = useLanguage();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setI((x) => (x + 1) % REG_SLIDES.length), 4000);
    return () => window.clearInterval(id);
  }, []);

  // No page scroll on this screen (restored when leaving the page).
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => { html.style.overflow = prev; };
  }, []);

  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-[480px] flex-col overflow-hidden px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))]">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-192.png" alt="Tashkent Law School" className="h-10 w-10 shrink-0 rounded-full ring-1 ring-gold-400/40" />
          <span className="leading-none">
            <span className="block whitespace-nowrap font-display text-[15px] font-black text-gold-300 sm:text-base">TASHKENT LAW</span>
            <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.36em] text-white/70">School</span>
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[.05] p-1.5" role="group" aria-label="Language">
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-label={l === "UZ" ? "O‘zbekcha" : l === "RU" ? "Русский" : "English"}
              aria-pressed={l === lang}
              className={`relative flex h-7 w-10 items-center justify-center overflow-hidden rounded-lg transition-all duration-300 ${
                l === lang ? "scale-105 ring-2 ring-gold-400 shadow-[0_6px_14px_-6px_rgba(240,192,82,.8)]" : "opacity-55 grayscale-[30%] hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/flags/${l.toLowerCase()}.png`} alt={l} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </header>

      {/* Slider + headline + form, centred together in the remaining height */}
      <div className="flex min-h-0 flex-1 flex-col justify-start gap-6 pt-4 sm:gap-7">
      {/* Slider — never taller than its natural 16:9 size, shrinks on short screens */}
      <div
        className="flex min-h-[110px] flex-1 items-start justify-center [container-type:size]"
        style={{ maxHeight: "min(calc((100vw - 2rem) * 0.5625), 252px)" }}
      >
        <div className="relative aspect-video w-[min(100cqw,177.78cqh)] overflow-hidden rounded-[22px] bg-wine-950 shadow-[0_24px_50px_-26px_rgba(178,40,44,.9)] ring-1 ring-gold-400/25">
          <AnimatePresence initial={false}>
            <motion.img
              key={REG_SLIDES[i]}
              src={REG_SLIDES[i]}
              alt="Tashkent Law School"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 flex gap-1.5 bg-gradient-to-t from-black/50 to-transparent px-3 pb-2.5 pt-6">
            {REG_SLIDES.map((s, k) => (
              <button key={s} type="button" aria-label={`${k + 1}`} onClick={() => setI(k)} className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                {k === i && (
                  <motion.span key={i} className="absolute inset-y-0 left-0 rounded-full bg-gold-300" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 4, ease: "linear" }} />
                )}
                {k < i && <span className="absolute inset-0 rounded-full bg-gold-300/70" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Headline + form */}
      <div className="shrink-0">
        <h1 className="font-display text-[2.1rem] font-black leading-[1.03] tracking-tight sm:text-[2.5rem]">
          <span className="text-gold-grad">{t.reg_title_a}</span> <span className="text-white">{t.reg_title_b}</span>
        </h1>
        <p className="mt-2.5 text-[15px] font-medium leading-snug text-white/75 sm:text-base">{t.reg_sub}</p>
        <div className="mt-4">
          <LeadForm minimal source="instagram-registration" />
        </div>
      </div>
      </div>
    </div>
  );
}
