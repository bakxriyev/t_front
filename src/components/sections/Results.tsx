"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, ScrollText, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API, isActive, media, pick, toArray, useList, type Result } from "@/lib/content";
import { ADMISSIONS, BROCHURE_RESULTS } from "@/lib/brochure";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Modal } from "@/components/ui/Modal";
import { Marquee } from "@/components/ui/Marquee";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

function photosOf(r: Result): string[] {
  return (r.photos && r.photos.length ? r.photos : toArray(r.photo)).filter(Boolean);
}

/** Admin-uploaded result image, shown as-is in the same frame as the brochure cards. */
function ResultCard({ r }: { r: Result }) {
  const { lang } = useLanguage();
  const name = pick(r, "student_name", lang);
  return (
    <SmartImage
      src={photosOf(r)[0]}
      alt={name}
      fallbackText={name}
      sizes="230px"
      className="aspect-[400/499] w-full rounded-[18px] ring-1 ring-white/10"
    />
  );
}

type Sel = { kind: "pdf"; i: number } | { kind: "api"; r: Result };

export function Results() {
  const { lang, t } = useLanguage();
  const { data } = useList<Result>(API.results);
  const api = data.filter(isActive).sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || b.id - a.id);
  const [sel, setSel] = useState<Sel | null>(null);
  const [photoIdx, setPhotoIdx] = useState(0);
  const selPhotos = sel?.kind === "api" ? photosOf(sel.r) : [];

  return (
    <section id="results" className="section overflow-hidden">
      <div className="shell">
        <SectionHeading
          eyebrow={t.results_eyebrow}
          title={<>{t.results_title.split("—")[0]}{t.results_title.includes("—") && <span className="text-gold-grad">— {t.results_title.split("—")[1]}</span>}</>}
          sub={t.results_sub}
        />

        {/* Headline figures, styled like the brochure's gold plaques */}
        <div className="mx-auto mb-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          {[
            { v: 500, label: t.results_big1, Icon: GraduationCap },
            { v: 3000, label: t.results_big2, Icon: ScrollText },
          ].map(({ v, label, Icon }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-[26px] bg-gradient-to-b from-[#ffe9a3] to-[#f5c64e] px-7 py-6 text-wine-900 shadow-[0_24px_50px_-24px_rgba(240,192,82,.8)] ring-4 ring-[#ffe9a3]/25 transition-transform duration-500 hover:-translate-y-1">
                <Icon className="absolute -right-3 -top-3 h-24 w-24 rotate-12 text-wine-900/10 transition-transform duration-700 group-hover:rotate-0" />
                <p className="num text-5xl leading-none sm:text-6xl"><CountUp value={v} suffix="+" /></p>
                <p className="mt-2 text-base font-bold">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Auto-scrolling strip of real results (pauses on hover) */}
      <Reveal>
        <Marquee speed={70} gap="gap-4 pr-4" className="mask-fade-x py-3">
          {BROCHURE_RESULTS.map((r, i) => (
            <button
              key={r.img}
              type="button"
              onClick={() => setSel({ kind: "pdf", i })}
              className="group/card w-[200px] shrink-0 sm:w-[230px]"
              aria-label={`${r.name} — BMBA ${r.bmba}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/pdf/results/${r.img}.webp`}
                alt={`${r.name}: ${t.law_label} ${r.law}, ${t.bmba_label} ${r.bmba}`}
                loading="lazy"
                width={400}
                height={499}
                className="aspect-[400/499] w-full rounded-[18px] object-cover ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 ease-silk group-hover/card:-translate-y-2 group-hover/card:shadow-[0_24px_40px_-18px_rgba(240,192,82,.6)] group-hover/card:ring-gold-400/50"
              />
            </button>
          ))}
          {api.map((r) => (
            <button
              key={`api-${r.id}`}
              type="button"
              onClick={() => { setSel({ kind: "api", r }); setPhotoIdx(0); }}
              className="group/card w-[200px] shrink-0 text-left sm:w-[230px]"
              aria-label={pick(r, "student_name", lang)}
            >
              <div className="rounded-[18px] transition-[transform,box-shadow] duration-500 ease-silk group-hover/card:-translate-y-2 group-hover/card:shadow-[0_24px_40px_-18px_rgba(240,192,82,.6)]">
                <ResultCard r={r} />
              </div>
            </button>
          ))}
        </Marquee>
      </Reveal>

      {/* TDYU 2026 admission results: grant / contract (from the Instagram landing page) */}
      <Reveal className="mt-10">
        <div className="shell mb-4 flex items-center gap-3">
          <span className="eyebrow">{t.admission_title}</span>
        </div>
        <Marquee speed={60} reverse gap="gap-4 pr-4" className="mask-fade-x py-3">
          {ADMISSIONS.map((a) => (
            <a
              key={a.img}
              href={`/images/admission/${a.img}.webp`}
              target="_blank"
              rel="noopener noreferrer"
              className="group/card w-[160px] shrink-0 sm:w-[180px]"
              aria-label={`${a.name} — ${a.kind === "grant" ? t.grant : t.contract}, ${a.score}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/admission/${a.img}.webp`}
                alt={`${a.name} — TDYU, ${a.kind === "grant" ? t.grant : t.contract}, ${a.score}`}
                loading="lazy"
                width={720}
                height={1280}
                className="aspect-[9/16] w-full rounded-[18px] object-cover ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 ease-silk group-hover/card:-translate-y-2 group-hover/card:shadow-[0_24px_40px_-18px_rgba(240,192,82,.6)] group-hover/card:ring-gold-400/50"
              />
            </a>
          ))}
        </Marquee>
      </Reveal>

      <Modal open={!!sel} onClose={() => setSel(null)} size={sel?.kind === "pdf" ? "sm" : "xl"} label={t.results_title}>
        {sel?.kind === "pdf" && (
          <div className="p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/pdf/results/${BROCHURE_RESULTS[sel.i].img}.webp`} alt={BROCHURE_RESULTS[sel.i].name} className="w-full rounded-[20px]" />
            <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-4">
              <p className="font-display text-xl font-black">{BROCHURE_RESULTS[sel.i].name}</p>
              <p className="num text-gold-grad text-2xl">{BROCHURE_RESULTS[sel.i].bmba}</p>
            </div>
          </div>
        )}
        {sel?.kind === "api" && (
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative bg-black/40 lg:rounded-l-[30px]">
              <AnimatePresence mode="wait">
                <motion.div key={photoIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {selPhotos[photoIdx] && <img src={media(selPhotos[photoIdx]) || ""} alt="" className="max-h-[78vh] w-full object-contain lg:rounded-l-[30px]" />}
                </motion.div>
              </AnimatePresence>
              {selPhotos.length > 1 && (
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                  {selPhotos.map((_, i) => (
                    <button key={i} type="button" aria-label={`Photo ${i + 1}`} onClick={() => setPhotoIdx(i)} className={`h-2 rounded-full transition-all ${i === photoIdx ? "w-8 bg-gold-400" : "w-2 bg-white/40"}`} />
                  ))}
                </div>
              )}
            </div>
            <div className="p-7 sm:p-10">
              {sel.r.year ? <span className="num rounded-full bg-grad-gold px-3 py-1 text-xs text-wine-950">{sel.r.year}</span> : null}
              <h3 className="mt-4 font-display text-3xl font-black">{pick(sel.r, "student_name", lang)}</h3>
              {pick(sel.r, "achievement", lang) && <p className="mt-3 flex gap-2 text-lg text-gold-200"><Trophy className="mt-1 h-5 w-5 shrink-0 text-gold-400" />{pick(sel.r, "achievement", lang)}</p>}
              {pick(sel.r, "description", lang) && <p className="mt-6 whitespace-pre-line leading-relaxed text-white/70">{pick(sel.r, "description", lang)}</p>}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
