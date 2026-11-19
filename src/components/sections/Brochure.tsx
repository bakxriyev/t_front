"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BOOKS, CAREERS, COURSE_SYSTEM, GALLERY, PROMOS } from "@/lib/brochure";
import { tr } from "@/lib/content";
import { NamedIcon } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt } from "@/components/ui/Tilt";
import { Modal } from "@/components/ui/Modal";
import { Marquee } from "@/components/ui/Marquee";
import { useEnroll } from "@/components/providers/EnrollProvider";

/* ---------------------------------------------------------------- Course system */
export function CourseSystem() {
  const { lang, t } = useLanguage();
  return (
    <section id="system" className="section overflow-hidden">
      {/* Themis illustration from the brochure, fading into the background */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[40%] [mask-image:linear-gradient(180deg,transparent,#000_15%,#000_75%,transparent)] lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/pdf/themis.webp" alt="" loading="lazy" className="ml-auto h-full w-auto max-w-none opacity-25 [mask-image:linear-gradient(90deg,transparent,#000_50%)]" />
      </div>
      <div className="shell relative">
        <SectionHeading eyebrow={t.sys_eyebrow} title={<span className="text-headline">{t.sys_title}</span>} sub={t.sys_sub} />

        <div className="relative">
          {/* progress rail */}
          <div className="absolute left-[12%] right-[12%] top-[58px] hidden h-[2px] bg-gradient-to-r from-gold-400/70 via-wine-400/70 to-gold-400/70 lg:block" />
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {COURSE_SYSTEM.map((s, i) => (
              <Reveal key={s.icon} delay={i * 0.1} className="h-full">
                <div className="group relative flex h-full flex-col items-center text-center">
                  <span className="relative z-[2] flex h-[78px] w-[78px] items-center justify-center rounded-[24px] bg-[linear-gradient(140deg,#fce9a8,#e3a92b_55%,#9e6512)] text-wine-900 shadow-[0_24px_44px_-16px_rgba(227,169,43,.75)] ring-[6px] ring-night transition-transform duration-500 ease-silk group-hover:-translate-y-2 group-hover:rotate-[-6deg] sm:h-[116px] sm:w-[116px] sm:rounded-[34px] sm:ring-8">
                    <span className="absolute inset-0 rounded-[24px] sm:rounded-[34px] bg-gradient-to-b from-white/40 to-transparent [mask-image:linear-gradient(180deg,#000,transparent_55%)]" />
                    <NamedIcon name={s.icon} className="relative h-9 w-9 sm:h-14 sm:w-14" strokeWidth={1.7} />
                    <span className="num absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-grad-wine text-xs text-white ring-[3px] ring-night sm:h-9 sm:w-9 sm:text-sm sm:ring-4">{i + 1}</span>
                  </span>
                  <div className="card card-hover spot -mt-9 flex w-full flex-1 flex-col items-center rounded-[22px] bg-gradient-to-b from-wine-700/45 to-wine-950/25 px-3 pb-5 pt-12 sm:-mt-12 sm:rounded-[28px] sm:px-6 sm:pb-8 sm:pt-16">
                    <p className="num relative z-[2] text-[17px] leading-tight text-white sm:text-[26px]">{tr(s.big, lang)}</p>
                    <p className="relative z-[2] mt-2 max-w-[260px] text-[12.5px] leading-snug text-ink-soft sm:mt-3 sm:text-[15px] sm:leading-relaxed">{tr(s.text, lang)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Books */
export function Books() {
  const { lang, t } = useLanguage();
  return (
    <section id="books" className="section overflow-hidden">
      <div className="shell">
        <SectionHeading eyebrow={t.books_eyebrow} title={<span className="text-headline">{t.books_title}</span>} sub={t.books_sub} />
        <Stagger className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {BOOKS.map((b, i) => (
            <StaggerItem key={b.img}>
              <div className="group flex flex-col items-center text-center">
                <Tilt max={14} scale={1.04} className="relative w-[78%] max-w-[210px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/pdf/books/${b.img}.webp`}
                    alt={b.title}
                    loading="lazy"
                    className={`w-full rounded-[6px] shadow-[0_30px_50px_-18px_rgba(0,0,0,.95)] ring-1 ring-white/10 ${i % 2 ? "lg:translate-y-6" : ""}`}
                  />
                  <span className="pointer-events-none absolute inset-0 rounded-[6px] bg-gradient-to-tr from-transparent via-white/0 to-white/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </Tilt>
                {/* glass plinth */}
                <div className={`-mt-3 h-6 w-[88%] max-w-[240px] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(240,192,82,.28),transparent_70%)] ${i % 2 ? "lg:translate-y-6" : ""}`} />
                <div className={i % 2 ? "lg:translate-y-6" : ""}>
                  <h3 className="mt-3 font-display text-lg font-extrabold leading-tight text-white">{b.title}</h3>
                  <p className="mx-auto mt-1 max-w-[240px] text-[13px] leading-relaxed text-ink-muted">{tr(b.text, lang)}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Gallery */
export function Gallery() {
  const { t } = useLanguage();
  const [idx, setIdx] = useState<number | null>(null);
  // Bento grid — phones: 3 columns, 4 short rows; desktop: 4 columns, 3 rows (7 photos)
  const layout = ["col-span-2 row-span-2", "", "", "", "", "md:col-span-2", "col-span-3 md:col-span-2"];
  const go = (d: number) => setIdx((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length));

  return (
    <section id="gallery" className="section">
      <div className="shell">
        <SectionHeading eyebrow={t.gallery_eyebrow} title={<span className="text-headline">{t.gallery_title}</span>} sub={t.gallery_sub} />
        <Stagger className="grid auto-rows-[104px] grid-cols-3 gap-2 sm:auto-rows-[150px] sm:gap-3 md:auto-rows-[190px] md:grid-cols-4">
          {GALLERY.map((src, i) => (
            <StaggerItem key={src} className={layout[i]}>
              <button type="button" onClick={() => setIdx(i)} className="group relative block h-full w-full overflow-hidden rounded-[14px] ring-1 ring-white/10 sm:rounded-[22px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Tashkent Law School" loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] ease-silk group-hover:scale-[1.07]" />
                <span className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
                <span className="chip-dark absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Modal open={idx !== null} onClose={() => setIdx(null)} size="xl" label={t.gallery_title}>
        {idx !== null && (
          <div className="relative bg-black">
            <AnimatePresence mode="wait">
              <motion.img
                key={idx}
                src={GALLERY[idx]}
                alt=""
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="max-h-[82vh] w-full object-contain"
              />
            </AnimatePresence>
            <button type="button" onClick={() => go(-1)} aria-label="Previous" className="chip-dark absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => go(1)} aria-label="Next" className="chip-dark absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full"><ChevronRight className="h-5 w-5" /></button>
            <span className="num chip-dark absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs">{idx + 1} / {GALLERY.length}</span>
          </div>
        )}
      </Modal>
    </section>
  );
}

/* ---------------------------------------------------------------- Careers carousel (emblems + icons) */
export function Professions() {
  const { lang, t } = useLanguage();
  return (
    <section id="careers" className="section overflow-hidden">
      <div className="shell">
        <SectionHeading eyebrow={t.prof_eyebrow} title={<span className="text-headline">{t.prof_title}</span>} sub={t.prof_sub} />
      </div>
      <Reveal>
        <Marquee speed={55} gap="gap-4 pr-4" className="mask-fade-x py-6">
          {CAREERS.map((c) => (
            <div key={c.title.uz} className="group w-[190px] shrink-0 sm:w-[210px]">
              <div className="relative flex aspect-[4/5] flex-col items-center justify-between overflow-hidden rounded-[26px] bg-gradient-to-b from-[#d3142f] via-[#a80f25] to-[#5f0814] p-5 text-center text-white shadow-[0_24px_40px_-22px_rgba(211,20,47,.9)] ring-1 ring-white/15 transition-transform duration-500 ease-silk group-hover:-translate-y-3">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent" />
                <span className="pointer-events-none absolute -bottom-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-gold-400/20 blur-2xl" />
                <div className="relative flex h-[108px] w-full items-center justify-center">
                  {c.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.logo} alt="" loading="lazy" className="h-full w-auto object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,.5)] transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/25 transition-transform duration-500 group-hover:scale-110">
                      <NamedIcon name={c.icon} className="h-12 w-12" strokeWidth={1.6} />
                    </span>
                  )}
                </div>
                <div className="relative">
                  <p className="font-display text-xl font-black leading-tight">{tr(c.title, lang)}</p>
                  <p className="mt-1 text-[11px] font-semibold leading-snug text-white/70">{tr(c.org, lang)}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </Reveal>
      <Reveal delay={0.2} className="mt-6 flex justify-center">
        <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-gradient-to-b from-[#d3142f] to-[#7a0b1c] text-center text-white shadow-[0_20px_40px_-14px_rgba(211,20,47,.8)] ring-4 ring-night">
          <span className="text-[12px] font-semibold leading-none">{t.prof_more.split("|")[0]}</span>
          <span className="num my-1 text-4xl leading-none">14+</span>
          <span className="text-[12px] font-semibold leading-none">{t.prof_more.split("|")[1]}</span>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------------------------------------- Promotions */
export function Promotions() {
  const { lang, t } = useLanguage();
  const { open } = useEnroll();
  return (
    <section id="offers" className="section">
      <div className="shell">
        <SectionHeading eyebrow={t.promo_eyebrow} title={<span className="text-headline">{t.promo_title}</span>} />
        <div className="mx-auto flex max-w-4xl flex-col gap-3">
          {PROMOS.map((p, i) => (
            <Reveal key={p.icon} delay={i * 0.08}>
              <div className="spot group relative flex flex-col items-start gap-4 overflow-hidden rounded-[28px] bg-gradient-to-r from-wine-800 via-wine-700 to-wine-600 p-5 ring-1 ring-white/10 transition-transform duration-500 ease-silk hover:-translate-y-1 sm:flex-row sm:items-center sm:rounded-full sm:py-4 sm:pl-5 sm:pr-8">
                <span className="relative z-[2] flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20">
                  <NamedIcon name={p.icon} className="h-7 w-7" strokeWidth={1.7} />
                </span>
                <p className="relative z-[2] flex-1 text-base font-semibold leading-snug text-white sm:text-lg">{tr(p.condition, lang)}</p>
                <p className="num relative z-[2] text-gold-grad text-2xl uppercase sm:text-3xl">{tr(p.reward, lang)}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.3} className="mt-4 flex justify-center">
            <button type="button" onClick={() => open()} className="btn btn-gold btn-lg group">
              {t.promo_cta}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
