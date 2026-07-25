"use client";

import { ArrowRight, Play, Scale, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApiData } from "@/hooks/useApiData";

import { C } from "@/lib/constants";
import { motion } from "framer-motion";

interface HeroSlide {
  id: number;
  title_uz: string;
  title_ru: string;
  title_en: string;
  subtitle_uz: string;
  subtitle_ru: string;
  subtitle_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  button_text_uz: string;
  button_text_ru: string;
  button_text_en: string;
  button_link: string;
  image: string;
  order: number;
  is_active: boolean;
}

export function Hero({ onApply }: { onApply: () => void }) {
  const { lang, t } = useLanguage();
  const { data: slides, loading } = useApiData<HeroSlide>('/api/hero?is_active=true');
  const slide = !loading && slides.length > 0 ? slides[0] : null;

  const lng = lang.toLowerCase();
  const title = slide ? (slide as unknown as Record<string, string>)[`title_${lng}`] || slide.title_en : t.hero_h1;
  const subtitle = slide ? (slide as unknown as Record<string, string>)[`subtitle_${lng}`] || slide.subtitle_en : t.hero_sub;
  const description = slide ? (slide as unknown as Record<string, string>)[`description_${lng}`] || (slide as unknown as Record<string, string>)[`description_en`] || "" : t.hero_body;
  const buttonText = slide ? (slide as unknown as Record<string, string>)[`button_text_${lng}`] || (slide as unknown as Record<string, string>)[`button_text_en`] || "" : t.enroll;
  const buttonLink = slide?.button_link || "#about";

  return (
    <section id="home" className="relative min-h-[60vh] md:min-h-screen flex items-center overflow-hidden md:pt-[90px]" style={{ paddingTop: "60px" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: C.heroGlow1 }} />
        <div className="absolute top-0 right-0 w-full h-full" style={{ background: C.heroGlow2 }} />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)` }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] right-[8%] opacity-[0.03] rotate-12 hidden lg:block">
          <Scale className="w-32 h-32" style={{ color: C.gold }} />
        </div>
        <div className="absolute bottom-[20%] left-[5%] opacity-[0.025] -rotate-6 hidden lg:block">
          <BookOpen className="w-28 h-28" style={{ color: C.gold }} />
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-px hidden lg:block" style={{ background: `linear-gradient(180deg, transparent 0%, ${C.gold}20 30%, ${C.gold}20 70%, transparent 100%)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-px hidden lg:block" style={{ background: `linear-gradient(180deg, transparent 0%, ${C.gold}20 30%, ${C.gold}20 70%, transparent 100%)` }} />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 w-full relative z-10">
        <div style={{ maxWidth: "100%", margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6 px-3 md:px-5 py-1.5 md:py-2 rounded-full" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}>
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full" style={{ background: C.goldGrad }} />
              <span className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase font-semibold font-sans" style={{ color: C.gold }}>Est. 2013 · Tashkent, Uzbekistan</span>
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full" style={{ background: C.goldGrad }} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif leading-[1.15] mb-3 md:mb-4"
            style={{ color: C.white, fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", fontWeight: 700 }}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="italic mb-2 font-serif"
            style={{ color: C.gold, fontSize: "clamp(0.8rem, 1.5vw, 1rem)", fontWeight: 400 }}
          >
            &mdash; {subtitle}
          </motion.p>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="leading-relaxed mb-4 md:mb-6 mx-auto font-sans"
              style={{ color: C.secondary, fontSize: "clamp(0.75rem, 1.3vw, 0.9rem)", fontWeight: 400, maxWidth: "42rem" }}
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-14"
          >
            <button
              onClick={onApply}
              className="group flex items-center gap-2 px-5 md:px-7 py-3 md:py-3.5 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all duration-300 hover:-translate-y-1 active:translate-y-0.5 font-sans"
              style={{ background: C.btnGrad, color: C.white, boxShadow: C.btnShadow }}
            >
              {buttonText || t.enroll} <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href={buttonLink}
              className="group flex items-center gap-2 px-5 md:px-7 py-3 md:py-3.5 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all duration-300 hover:-translate-y-1 active:translate-y-0.5 border-2 font-sans"
              style={{ borderColor: "rgba(212,175,55,0.35)", color: C.gold }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.background = "rgba(212,175,55,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)"; e.currentTarget.style.background = "transparent"; }}
            >
              <Play className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" /> {t.learn_more}
            </a>
          </motion.div>


        </div>

      </div>
    </section>
  );
}
