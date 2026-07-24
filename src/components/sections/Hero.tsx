"use client";

import { ArrowRight, Play, Star, Shield, Award, Globe, Scale, BookOpen } from "lucide-react";
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
  title_font_size?: string;
  subtitle_font_size?: string;
  description_font_size?: string;
  title_font_weight?: string;
  subtitle_font_weight?: string;
  description_font_weight?: string;
  text_align?: string;
  max_width?: string;
}

function val(slide: HeroSlide | null, key: string, def: string): string {
  if (!slide) return def;
  const v = (slide as unknown as Record<string, string | undefined>)[key];
  return v && v.trim() ? v : def;
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

  const titleSize = val(slide, "title_font_size", "4.5rem");
  const titleWeight = val(slide, "title_font_weight", "700");
  const subSize = val(slide, "subtitle_font_size", "1.125rem");
  const subWeight = val(slide, "subtitle_font_weight", "400");
  const descSize = val(slide, "description_font_size", "1rem");
  const descWeight = val(slide, "description_font_weight", "400");
  const align = val(slide, "text_align", "center");
  const maxW = val(slide, "max_width", "100%");

  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden" style={{ paddingTop: "90px" }}>
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
        <div style={{ maxWidth: maxW, margin: "0 auto", textAlign: align as React.CSSProperties["textAlign"] }}>
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
            className="font-serif leading-[1.08] mb-4 md:mb-6"
            style={{ color: C.white, fontSize: titleSize, fontWeight: Number(titleWeight) || 700 }}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="italic mb-3 font-serif"
            style={{ color: C.gold, fontSize: subSize, fontWeight: Number(subWeight) || 400 }}
          >
            &mdash; {subtitle}
          </motion.p>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="leading-relaxed mb-6 md:mb-10 mx-auto font-sans"
              style={{ color: C.secondary, fontSize: descSize, fontWeight: Number(descWeight) || 400, maxWidth: "42rem" }}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-wrap justify-center gap-2 md:gap-5"
          >
            {[
              { icon: Shield, label: "Ministry Accredited" },
              { icon: Award, label: "#1 Law School in UZ" },
              { icon: Globe, label: "100+ Intl. Partners" },
              { icon: Star, label: "95% Employment Rate" },
            ].map((b) => (
              <div
                key={b.label}
                className="group flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[9px] md:text-[11px] font-medium transition-all duration-300 hover:scale-105"
                style={{ color: C.muted, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.06)"; e.currentTarget.style.borderColor = "rgba(212,175,55,0.2)"; e.currentTarget.style.color = C.gold; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = C.muted; }}
              >
                <b.icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" style={{ color: C.gold }} />
                {b.label}
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
