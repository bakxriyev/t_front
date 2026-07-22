"use client";

import { motion } from "framer-motion";
import { Play, Scale, Shield, Users, Globe, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApiData } from "@/hooks/useApiData";
import { getImageUrl } from "@/lib/utils";
import { C } from "@/lib/constants";

interface AboutData {
  id: number;
  content_uz: string;
  content_ru: string;
  content_en: string;
  mission_uz: string;
  mission_ru: string;
  mission_en: string;
  vision_uz: string;
  vision_ru: string;
  vision_en: string;
  image: string;
}

interface AboutValue {
  id: number;
  key: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
}

interface TimelineItemData {
  id: number;
  year: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
}

function GoldText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        background: C.goldGrad,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        display: "inline",
      }}
    >
      {children}
    </motion.span>
  );
}

const VALUE_ICONS: Record<string, any> = {
  integrity: Scale,
  excellence: Shield,
  community: Users,
  innovation: Globe,
};

const VALUE_KEYS = ["integrity", "excellence", "community", "innovation"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

export function About() {
  const { lang, t } = useLanguage();
  const { data: aboutData, loading } = useApiData<AboutData>('/api/about');
  const { data: valuesData } = useApiData<AboutValue>('/api/about-values');
  const { data: timelineData } = useApiData<TimelineItemData>('/api/timeline');
  const about = !loading && aboutData.length > 0 ? aboutData[0] : null;

  const lng = lang.toLowerCase();
  const missionText = about ? (about as unknown as Record<string, string>)[`mission_${lng}`] || about.mission_en : t.about_mission_desc;
  const visionText = about ? (about as unknown as Record<string, string>)[`vision_${lng}`] || about.vision_en : t.about_vision_desc;
  const contentText = about ? (about as unknown as Record<string, string>)[`content_${lng}`] || about.content_en : null;
  const aboutImage = about ? getImageUrl(about.image) : '/images/about-campus.jpg';

  const values = Array.isArray(valuesData) ? valuesData : [];
  const timeline = Array.isArray(timelineData) ? timelineData : [];

  const getMultilang = (item: any, prefix: string) =>
    (item as unknown as Record<string, string>)[`${prefix}_${lng}`] || (item as unknown as Record<string, string>)[`${prefix}_en`] || "";

  return (
    <section
      id="about"
      className="relative py-10 md:py-16 overflow-hidden section-glass"
      style={{ background: "rgba(11,11,11,0.45)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-20"
        >
          {/* SectionLabel */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: C.gold }} />
            <span
              className="text-xs uppercase tracking-[0.25em] font-sans"
              style={{ color: C.gold }}
            >
              {t.about_label || "Our Story"}
            </span>
            <div className="w-8 h-px" style={{ background: C.gold }} />
          </div>

          <h2
            className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: C.white }}
          >
            <GoldText>{t.about_title || "Shaping the Legal Leaders of Tomorrow"}</GoldText>
          </h2>
          <div
            className="w-20 h-1 mx-auto"
            style={{ background: C.goldGrad }}
          />
        </motion.div>

        {/* Two-column content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-32">
          {/* LEFT — Image with play button + badge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ border: `1px solid ${C.border}` }}
            >
              <div className="aspect-[4/5] relative">
                <Image
                  src={aboutImage}
                  alt="Tashkent Law School Campus"
                  fill
                  className="object-cover"
                  style={{ filter: "brightness(0.65)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${C.bg}99 0%, transparent 60%)`,
                  }}
                />
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center justify-center cursor-pointer"
                >
                  {/* Pulse rings */}
                  <div
                    className="absolute w-24 h-24 rounded-full animate-ping opacity-20"
                    style={{ background: C.gold }}
                  />
                  <div
                    className="absolute w-28 h-28 rounded-full opacity-10"
                    style={{ border: `2px solid ${C.gold}` }}
                  />
                  {/* Play circle */}
                  <div
                    className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
                    style={{
                      background: C.goldGrad,
                      boxShadow: `0 0 40px ${C.gold}40`,
                    }}
                  >
                    <Play
                      className="w-8 h-8 ml-1"
                      style={{ color: C.bg, fill: C.bg }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl shadow-2xl"
              style={{
                background: C.burGrad,
                border: `1px solid ${C.burgundy}`,
              }}
            >
              <p
                className="font-serif text-3xl md:text-4xl font-bold leading-none mb-1"
                style={{ color: C.gold }}
              >
                12+
              </p>
              <p
                className="text-xs uppercase tracking-wider font-sans"
                style={{ color: C.white }}
              >
                {t.about_years}
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — Mission, Vision, Value cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            {/* Mission */}
            <div className="mb-8">
              <h3
                className="font-serif text-xl md:text-2xl font-semibold mb-3"
                style={{ color: C.gold }}
              >
                {t.about_mission}
              </h3>
              <p
                className="text-base leading-relaxed font-sans"
                style={{ color: C.secondary }}
              >
                {missionText}
              </p>
            </div>

            {/* Vision */}
            <div className="mb-10">
              <h3
                className="font-serif text-xl md:text-2xl font-semibold mb-3"
                style={{ color: C.gold }}
              >
                {t.about_vision}
              </h3>
              <p
                className="text-base leading-relaxed font-sans"
                style={{ color: C.secondary }}
              >
                {visionText}
              </p>
            </div>

            {/* Value cards 2x2 grid */}
            <div className="grid grid-cols-2 gap-4">
              {VALUE_KEYS.map((key) => {
                const apiVal = values.find((v) => v.key === key);
                const Icon = VALUE_ICONS[key] || Scale;
                const title = apiVal ? getMultilang(apiVal, "title") : (t as any)[`about_value_${key}`] || "";
                const desc = apiVal ? getMultilang(apiVal, "description") : (t as any)[`about_value_${key}_desc`] || "";
                return (
                  <motion.div
                    key={key}
                    whileHover={{ y: -4 }}
                    className="p-4 md:p-5 rounded-2xl transition-all duration-300 cursor-default"
                    style={{
                      background: C.card,
                      border: `1px solid ${C.border}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = C.gold;
                      e.currentTarget.style.boxShadow = `0 8px 30px ${C.gold}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = C.border;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <Icon
                      className="w-6 h-6 mb-3"
                      style={{ color: C.gold }}
                    />
                    <h4
                      className="font-serif text-base md:text-lg font-semibold mb-2"
                      style={{ color: C.white }}
                    >
                      {title}
                    </h4>
                    <p
                      className="text-xs md:text-sm leading-relaxed font-sans"
                      style={{ color: C.muted }}
                    >
                      {desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Content section from API */}
        {contentText && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-16 md:mb-32 text-center"
          >
            <p
              className="text-base md:text-lg leading-relaxed font-sans"
              style={{ color: C.secondary }}
            >
              {contentText}
            </p>
          </motion.div>
        )}

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-12">
            <h3
              className="font-serif text-2xl md:text-3xl font-bold"
              style={{ color: C.white }}
            >
              <GoldText>{t.about_journey}</GoldText>
            </h3>
          </div>

          <div className="relative">
            {/* Center gold line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-px hidden lg:block"
              style={{ background: `linear-gradient(to bottom, transparent, ${C.gold}40, ${C.gold}40, transparent)` }}
            />

            <div className="relative lg:space-y-0 hidden lg:block">
              {timeline.map((item, index) => {
                const isRight = index % 2 === 0;
                const title = getMultilang(item, "title") || (t as any)[`about_timeline_${index + 1}_title`] || "";
                const desc = getMultilang(item, "description") || (t as any)[`about_timeline_${index + 1}_desc`] || "";
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-center mb-8 lg:mb-12 last:mb-0 ${
                      isRight ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Center dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden lg:flex">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          background: C.goldGrad,
                          boxShadow: `0 0 16px ${C.gold}60`,
                        }}
                      />
                    </div>

                    {/* Card */}
                    <div
                      className={`w-full lg:w-[calc(50%-2rem)] ${
                        isRight ? "lg:pr-8 lg:text-right" : "lg:pl-8 lg:text-left"
                      }`}
                    >
                      <div
                        className="p-5 md:p-6 rounded-2xl transition-all duration-300"
                        style={{
                          background: C.card,
                          border: `1px solid ${C.border}`,
                        }}
                      >
                        <span
                          className="inline-block font-serif text-3xl md:text-4xl font-bold mb-2"
                          style={{
                            background: C.goldGrad,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {item.year}
                        </span>
                        <h4
                          className="font-serif text-lg md:text-xl font-semibold mb-2"
                          style={{ color: C.white }}
                        >
                          {title}
                        </h4>
                        <p
                          className="text-sm leading-relaxed font-sans"
                          style={{ color: C.secondary }}
                        >
                          {desc}
                        </p>
                      </div>
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile timeline — left-aligned with a left gold line */}
            <div className="relative lg:hidden mt-2">
              <div
                className="absolute left-4 top-0 bottom-0 w-px"
                style={{ background: `linear-gradient(to bottom, ${C.gold}40, ${C.gold}40, transparent)` }}
              />
              {timeline.map((item, index) => {
                const title = getMultilang(item, "title") || (t as any)[`about_timeline_${index + 1}_title`] || "";
                const desc = getMultilang(item, "description") || (t as any)[`about_timeline_${index + 1}_desc`] || "";
                return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-10 pb-8 last:pb-0"
                >
                  {/* Dot */}
                  <div
                    className="absolute left-[11px] top-1 w-2.5 h-2.5 rounded-full z-10"
                    style={{
                      background: C.goldGrad,
                      boxShadow: `0 0 10px ${C.gold}60`,
                    }}
                  />
                  <div
                    className="p-4 rounded-2xl"
                    style={{
                      background: C.card,
                      border: `1px solid ${C.border}`,
                    }}
                  >
                    <span
                      className="inline-block font-serif text-2xl font-bold mb-1"
                      style={{
                        background: C.goldGrad,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {item.year}
                    </span>
                    <h4
                      className="font-serif text-base font-semibold mb-1"
                      style={{ color: C.white }}
                    >
                      {title}
                    </h4>
                    <p
                      className="text-xs leading-relaxed font-sans"
                      style={{ color: C.secondary }}
                    >
                      {desc}
                    </p>
                  </div>
                </motion.div>
              )})}
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-10">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: C.btnGrad,
              color: C.white,
              boxShadow: C.btnShadow,
            }}
          >
            Batafsil
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
