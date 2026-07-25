"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Scale, Shield, Users, Globe, ArrowRight, Award, BookOpen, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApiData, useApiSingle } from "@/hooks/useApiData";
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
  images?: string[];
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

interface StatItem {
  id: number;
  value: number;
  suffix?: string;
  label_uz: string;
  label_ru: string;
  label_en: string;
  order: number;
}

interface HeroData {
  id: number;
  title_uz?: string;
  title_ru?: string;
  title_en?: string;
  image?: string;
}

const ALL_VALUE_ICONS: Record<string, any> = {
  integrity: Scale, excellence: Shield, community: Users, innovation: Globe,
  leadership: Award, growth: GraduationCap, education: BookOpen,
  trust: Shield, quality: Award, global: Globe, support: Users,
};

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

const VALUE_ICONS: Record<string, any> = ALL_VALUE_ICONS;

function AboutGallery({ images }: { images: { url: string; title: string }[] }) {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (thumbnailsRef.current) {
      let scrollPosition = 0;
      for (let i = 0; i < index; i++) {
        scrollPosition += 35 + 2;
      }
      scrollPosition += 2;
      const containerWidth = thumbnailsRef.current.offsetWidth;
      const centerOffset = containerWidth / 2 - 120 / 2;
      scrollPosition -= centerOffset;
      thumbnailsRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, [index]);

  return (
    <div className="relative flex flex-col gap-3">
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{ border: `1px solid ${C.border}` }}
      >
        <div className="aspect-[4/5] relative bg-black/40" ref={containerRef}>
          <Image
            src={images[index]?.url || '/images/about-campus.jpg'}
            alt={images[index]?.title || ''}
            fill
            className="object-cover select-none pointer-events-none"
            draggable={false}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${C.bg}99 0%, transparent 60%)`,
            }}
          />

          {images.length > 1 && (
            <>
              {index > 0 && (
                <button
                  onClick={() => setIndex((i) => i - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 z-10"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
              )}
              {index < images.length - 1 && (
                <button
                  onClick={() => setIndex((i) => i + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 z-10"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              )}
              <div
                className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md z-10"
                style={{ background: "rgba(0,0,0,0.6)", color: C.white }}
              >
                {index + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div
          ref={thumbnailsRef}
          className="overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
          <div className="flex gap-0.5 h-20" style={{ width: 'fit-content' }}>
            {images.map((img, i) => (
              <motion.button
                key={i}
                onClick={() => setIndex(i)}
                initial={false}
                animate={i === index ? 'active' : 'inactive'}
                variants={{
                  active: { width: 120, marginLeft: 2, marginRight: 2 },
                  inactive: { width: 35, marginLeft: 0, marginRight: 0 },
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative shrink-0 h-full overflow-hidden rounded-lg"
                style={i === index ? { border: `2px solid ${C.gold}`, boxShadow: `0 0 12px ${C.gold}40` } : { border: '2px solid transparent' }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover pointer-events-none select-none"
                  draggable={false}
                />
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function About() {
  const { lang, t } = useLanguage();
  const { data: aboutData, loading } = useApiData<AboutData>('/api/about');
  const { data: valuesData } = useApiData<AboutValue>('/api/about-values');
  const { data: timelineData } = useApiData<TimelineItemData>('/api/timeline');
  const { data: statsData } = useApiData<StatItem>('/api/statistics/public');
  const { data: heroData } = useApiData<HeroData>('/api/hero');
  const about = !loading && aboutData.length > 0 ? aboutData[0] : null;

  const lng = lang.toLowerCase();
  const missionText = about ? (about as unknown as Record<string, string>)[`mission_${lng}`] || about.mission_en : t.about_mission_desc;
  const visionText = about ? (about as unknown as Record<string, string>)[`vision_${lng}`] || about.vision_en : t.about_vision_desc;
  const contentText = about ? (about as unknown as Record<string, string>)[`content_${lng}`] || about.content_en : null;
  const aboutImagesList = about?.images && Array.isArray(about.images) && about.images.length > 0
    ? about.images
    : (about?.image ? [about.image] : []);
  const aboutImage = aboutImagesList.length > 0 ? getImageUrl(aboutImagesList[0]) : '/images/about-campus.jpg';

  const carouselImages = useRef(() => {
    const imgs: { url: string; title: string }[] = [];
    aboutImagesList.forEach((img: string) => {
      imgs.push({ url: getImageUrl(img), title: "Tashkent Law School" });
    });
    if (Array.isArray(heroData)) {
      heroData.slice(0, 4).forEach((h) => {
        if (h.image) {
          const title = (h as any)[`title_${lng}`] || (h as any).title_en || "";
          imgs.push({ url: getImageUrl(h.image), title });
        }
      });
    }
    return imgs.length > 0 ? imgs : [{ url: '/images/about-campus.jpg', title: "Tashkent Law School" }];
  });

  const values = Array.isArray(valuesData) ? valuesData : [];
  const timeline = Array.isArray(timelineData) ? timelineData : [];

  const getMultilang = (item: any, prefix: string) =>
    (item as unknown as Record<string, string>)[`${prefix}_${lng}`] || (item as unknown as Record<string, string>)[`${prefix}_en`] || "";

  const images = carouselImages.current();

  return (
    <section
      id="about"
      className="relative py-10 md:py-16 overflow-hidden section-glass"
      style={{ background: "rgba(13,13,13,0.5)" }}
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
          {/* LEFT — Gallery Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <AboutGallery images={images} />

            {/* Floating badge */}
            {(() => {
              const statsArr = Array.isArray(statsData) ? statsData : [];
              const firstStat = statsArr.length > 0 ? statsArr[0] : null;
              const badgeVal = firstStat ? firstStat.value : 12;
              const badgeSuffix = firstStat ? (firstStat.suffix || "+") : "+";
              const badgeLabel = firstStat
                ? ((firstStat as unknown as Record<string, string>)[`label_${lng}`] || firstStat.label_en)
                : (lang === "UZ" ? "Yillik mukammallik" : lang === "RU" ? "Лет опыта" : "Years of Excellence");
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl shadow-2xl z-10"
                  style={{
                    background: C.burGrad,
                    border: `1px solid ${C.burgundy}`,
                  }}
                >
                  <p className="font-serif text-3xl md:text-4xl font-bold leading-none mb-1" style={{ color: C.gold }}>
                    {badgeVal}{badgeSuffix}
                  </p>
                  <p className="text-xs uppercase tracking-wider font-sans" style={{ color: C.white }}>
                    {badgeLabel}
                  </p>
                </motion.div>
              );
            })()}
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

            {/* Value cards */}
            <div className="grid grid-cols-2 gap-4">
              {(values.length > 0 ? values : [
                { id: 0, key: "integrity", title_uz: "Halollik", title_ru: "Честность", title_en: "Integrity", description_uz: "Yuridik ta'lim va amaliyotda eng yuqori axloqiy standartlarni qo'llab-quvvatlash.", description_ru: "", description_en: "", order: 0 } as AboutValue,
                { id: 1, key: "excellence", title_uz: "Mukammallik", title_ru: "Превосходство", title_en: "Excellence", description_uz: "Har bir dasturda akademik qat'iyat va professional mahoratga intilish.", description_ru: "", description_en: "", order: 1 } as AboutValue,
                { id: 2, key: "community", title_uz: "Hamjamiyat", title_ru: "Сообщество", title_en: "Community", description_uz: "Talabalar, bitiruvchilar va yuridik mutaxassislarning qo'llab-quvvatlovchi tarmog'ini qurish.", description_ru: "", description_en: "", order: 2 } as AboutValue,
                { id: 3, key: "innovation", title_uz: "Innovatsiya", title_ru: "Инновации", title_en: "Innovation", description_uz: "Zamonaviy o'qitish usullari va global huquqiy istiqbollarni qabul qilish.", description_ru: "", description_en: "", order: 3 } as AboutValue,
              ]).map((val) => {
                const apiVal = values.find((v) => v.key === val.key) || val;
                const Icon = VALUE_ICONS[val.key] || Scale;
                const title = getMultilang(apiVal, "title");
                const desc = getMultilang(apiVal, "description");
                return (
                  <motion.div
                    key={val.id}
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
                    <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden lg:flex">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          background: C.goldGrad,
                          boxShadow: `0 0 16px ${C.gold}60`,
                        }}
                      />
                    </div>

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

                    <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile timeline */}
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
