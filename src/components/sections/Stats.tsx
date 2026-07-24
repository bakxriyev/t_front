"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, Award, BookOpen, GraduationCap, Scale, Globe, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApiData } from "@/hooks/useApiData";
import { C } from "@/lib/constants";

interface StatItem {
  id: number;
  label_uz: string;
  label_ru: string;
  label_en: string;
  value: number;
  order: number;
  suffix?: string;
}

const iconList: LucideIcon[] = [Users, Award, BookOpen, GraduationCap, Scale, Globe];

function Counter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = Math.max(1, Math.ceil(end / (duration / 16)));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

export function Stats() {
  const { lang, t } = useLanguage();
  const { data: statsData, loading } = useApiData<StatItem>('/api/statistics/public');

  const stats = !loading && statsData.length > 0
    ? statsData.map((item, index) => ({
        icon: iconList[index % iconList.length],
        value: item.value,
        suffix: item.suffix || "+",
        labelKey: (item as unknown as Record<string, string>)[`label_${lang.toLowerCase()}`] || item.label_en,
        id: item.id,
      }))
    : !loading ? [
        { icon: Users, value: 1500, suffix: "+", labelKey: lang === "UZ" ? "Talabalar" : lang === "RU" ? "Студентов" : "Students", id: 0 },
        { icon: Award, value: 12, suffix: "+", labelKey: lang === "UZ" ? "Yillik tajriba" : lang === "RU" ? "Лет опыта" : "Years Experience", id: 1 },
        { icon: GraduationCap, value: 3200, suffix: "+", labelKey: lang === "UZ" ? "Bitiruvchilar" : lang === "RU" ? "Выпускников" : "Graduates", id: 2 },
        { icon: Scale, value: 95, suffix: "%", labelKey: lang === "UZ" ? "Ish bilan ta'minlash" : lang === "RU" ? "Трудоустройство" : "Employment Rate", id: 3 },
        { icon: Globe, value: 100, suffix: "+", labelKey: lang === "UZ" ? "Xalqaro hamkorlar" : lang === "RU" ? "Межд. партнёров" : "Intl. Partners", id: 4 },
        { icon: BookOpen, value: 6, suffix: "", labelKey: lang === "UZ" ? "Kurslar" : lang === "RU" ? "Курсов" : "Courses", id: 5 },
      ]
    : [];

  if (stats.length === 0) return null;

  return (
    <section
      className="relative py-8 md:py-16 overflow-hidden"
      style={{
        background: "rgba(14,14,14,0.5)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-6"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="p-3 md:p-6 rounded-xl md:rounded-2xl text-center transition-all duration-300 cursor-default"
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
                <div className="flex justify-center mb-3">
                  <Icon className="w-5 h-5 md:w-8 md:h-8" style={{ color: C.gold }} />
                </div>
                <p
                  className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-1 leading-none"
                  style={{
                    background: C.goldGrad,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <Counter end={stat.value} suffix={stat.suffix} />
                </p>
                <p
                  className="text-[9px] md:text-sm font-sans uppercase tracking-wider"
                  style={{ color: C.secondary }}
                >
                  {stat.labelKey}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
