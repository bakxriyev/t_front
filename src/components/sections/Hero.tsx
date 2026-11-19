"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, GraduationCap, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API, byOrder, isActive, isVideoFile, media, pick, tr, useList, type Hero as HeroT } from "@/lib/content";
import { DIRECTIONS } from "@/lib/constants";
import { INSTITUTIONS } from "@/lib/brochure";
import { useEnroll } from "@/components/providers/EnrollProvider";
import { useSectionNav } from "@/components/layout/Navbar";
import { Marquee } from "@/components/ui/Marquee";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Splits a title so the final word(s) can be rendered with the gold gradient. */
function splitTitle(title: string): [string, string] {
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length <= 2) return ["", title];
  const tail = words.length > 4 ? 2 : 1;
  return [words.slice(0, -tail).join(" "), words.slice(-tail).join(" ")];
}

export function Hero() {
  const { lang, t } = useLanguage();
  const { open } = useEnroll();
  const go = useSectionNav();
  const { data: slides } = useList<HeroT>(API.hero);
  const slide = slides.filter(isActive).sort(byOrder)[0] ?? null;

  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const apiVideo = slide?.video_url && isVideoFile(slide.video_url) ? media(slide.video_url) : null;

  // Pick the lighter file on small screens; the poster image shows instantly meanwhile.
  useEffect(() => {
    const small = window.matchMedia("(max-width: 767px)").matches;
    setSrc(apiVideo || (small ? "/videos/hero-mobile.mp4" : "/videos/hero.mp4"));
  }, [apiVideo]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [src]);

  const title = pick(slide, "title", lang);
  const subtitle = pick(slide, "subtitle", lang);
  const description = pick(slide, "description", lang);
  const btnText = pick(slide, "button_text", lang);
  const btnLink = slide?.button_link?.trim();
  const fullTitle = title || [t.hero_title_a, t.hero_title_b, t.hero_title_c].filter(Boolean).join(" ");
  const [head, tail] = splitTitle(fullTitle);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  const word = { hidden: { opacity: 0, y: "0.55em" }, show: { opacity: 1, y: 0 } };

  return (
    <section ref={ref} id="home" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white">
      {/* Background video */}
      <motion.div className="absolute inset-0 -z-10 bg-night will-change-transform" style={{ y: videoY }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-poster.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-105 object-cover" fetchPriority="high" />
        {src && (
          <video
            ref={videoRef}
            key={src}
            className={`absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
            onPlaying={() => setPlaying(true)}
            src={src}
            poster="/images/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}
      </motion.div>
      {/* Brand tint + legibility; the bottom fades into the site background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-wine-950/70 to-night/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/5 to-night/50" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_0%_45%,rgba(146,28,33,.45),transparent_70%)]" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="shell relative flex flex-1 flex-col justify-center pb-32 pt-36 sm:pt-40">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
            <span className="glass-blur inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-[13px] font-semibold text-white/90">
              <span className="icon-tile-gold h-7 w-7 rounded-full"><GraduationCap className="relative h-4 w-4" /></span>
              {description && description.length < 60 ? description : t.hero_badge}
            </span>
          </motion.div>

          <motion.h1
            className="display mt-7 text-balance"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.06, delayChildren: 0.25 }}
            style={title && slide?.title_font_size ? { fontSize: `clamp(2.75rem, 6.6vw, ${slide.title_font_size})` } : undefined}
          >
            {head.split(" ").filter(Boolean).map((w, i) => (
              <motion.span key={`h${i}`} variants={word} transition={{ duration: 0.8, ease: EASE }} className="mr-[0.22em] inline-block">
                {w}
              </motion.span>
            ))}
            {tail && (
              <motion.span variants={word} transition={{ duration: 0.8, ease: EASE }} className="text-gold-grad inline-block pb-1 pr-1">
                {tail}
              </motion.span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/75 sm:text-xl"
          >
            {subtitle || t.hero_sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <button type="button" onClick={() => open()} className="btn btn-gold btn-lg group">
              {t.cta_enroll}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            {btnText && btnLink ? (
              <a href={btnLink} className="btn glass-blur btn-lg text-white">{btnText}</a>
            ) : (
              <button type="button" onClick={() => go("courses")} className="btn glass-blur btn-lg text-white hover:text-gold-200">
                {t.nav_courses}
              </button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <span className="font-accent text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">{t.hero_universities}</span>
            <div className="flex flex-wrap gap-2">
              {INSTITUTIONS.filter((u) => u.kind === "study").map((u) => (
                <span key={u.key} title={tr(u.name, lang)} className="glass-blur inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u.img} alt="" className="h-8 w-8 object-contain drop-shadow" />
                  <span className="font-accent text-xs font-extrabold tracking-wide text-white">{u.short}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Glass stat card (desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          className="absolute bottom-36 right-8 hidden xl:block"
        >
          <div className="glass-blur w-72 rounded-[26px] p-5">
            <div className="relative flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logos/tsul-2025.png" alt="TDYU" className="h-12 w-12 rounded-full ring-1 ring-gold-400/40" />
              <div>
                <p className="num text-gold-grad text-2xl font-semibold leading-none">26%</p>
                <p className="mt-1.5 text-xs leading-snug text-white/75">
                  {lang === "RU" ? "первокурсников ТГЮУ 2026 — из TLS" : lang === "EN" ? "of TSUL 2026 freshmen are from TLS" : "2026-yil TDYU talabalari — TLS’dan"}
                </p>
              </div>
            </div>
            <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-grad-gold" initial={{ width: 0 }} animate={{ width: "26%" }} transition={{ duration: 1.4, delay: 1.4, ease: EASE }} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom bar: sound toggle + directions marquee */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="shell mb-4 flex justify-end">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Unmute" : "Mute"}
            className="glass-blur flex h-11 w-11 items-center justify-center rounded-full text-white/85 transition hover:text-white"
          >
            {muted ? <VolumeX className="h-[18px] w-[18px]" /> : <Volume2 className="h-[18px] w-[18px]" />}
          </button>
        </div>
        <div className="border-y border-white/10 bg-white/[.04] py-4">
          <Marquee speed={45} className="mask-fade-x">
            {DIRECTIONS.map((d) => (
              <span key={d.uz} className="flex items-center gap-10 whitespace-nowrap text-[15px] font-semibold text-white/85">
                {tr(d, lang)}
                <span className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
