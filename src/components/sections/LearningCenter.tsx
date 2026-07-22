"use client";

import React from "react";
import { BookOpen, Scale, Monitor, Building, Users, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldText from "@/components/ui/GoldText";
import { C } from "@/lib/constants";

const LEARNING_SUBTITLE: Record<string, string> = {
  EN: "State-of-the-art facilities designed for academic and professional excellence.",
  RU: "Современные помещения, предназначенные для академического и профессионального совершенства.",
  UZ: "Akademik va professional mukammallik uchun mo'ljallangan zamonaviy inshootlar.",
};

const FACILITIES = [
  {
    icon: BookOpen,
    title: { EN: "Legal Library", RU: "Юридическая библиотека", UZ: "Yuridik kutubxona" },
    desc: {
      EN: "Extensive collection of legal texts, journals, and digital resources for comprehensive research.",
      RU: "Обширная коллекция юридических текстов, журналов и цифровых ресурсов для исследований.",
      UZ: "Har tomonlama tadqiqotlar uchun keng yuridik matnlar, jurnallar va raqamli resurslar to'plami.",
    },
    img: "photo-1507003211169-0a1dd7228f2d",
  },
  {
    icon: Scale,
    title: { EN: "Mock Courtroom", RU: "Учебный зал суда", UZ: "O'quv sud zali" },
    desc: {
      EN: "Fully equipped simulated courtroom for practical litigation and trial advocacy training.",
      RU: "Полностью оборудованный симулированный зал суда для практического обучения судебным процессам.",
      UZ: "Sud jarayonlari bo'yicha amaliy o'qitish uchun to'liq jihozlangan simulyatsiya qilingan sud zali.",
    },
    img: "photo-1531800116490-3fd02ccf50e7",
  },
  {
    icon: Monitor,
    title: { EN: "Online Platform", RU: "Онлайн-платформа", UZ: "Onlayn platforma" },
    desc: {
      EN: "Access lectures, materials, and assessments anytime with our advanced digital learning platform.",
      RU: "Получите доступ к лекциям, материалам и тестам в любое время с нашей цифровой платформой.",
      UZ: "Ilg'or raqamli o'quv platformamiz orqali ma'ruzalar, materiallar va testlarga xohlagan vaqtda kiring.",
    },
    img: "photo-1516321318423-f06f85e504b3",
  },
  {
    icon: Building,
    title: { EN: "Modern Classrooms", RU: "Современные классы", UZ: "Zamonaviy sinfxonalar" },
    desc: {
      EN: "Smart classrooms with interactive displays and modern seating for optimal learning experiences.",
      RU: "Умные аудитории с интерактивными дисплеями и современными местами для обучения.",
      UZ: "Eng yaxshi o'quv tajribasi uchun interaktiv displeylar va zamonaviy jihozlarga ega aqlli sinfxonalar.",
    },
    img: "photo-1541339907198-e08756dedf3f",
  },
  {
    icon: Users,
    title: { EN: "Practice Rooms", RU: "Практические залы", UZ: "Amaliy xonalar" },
    desc: {
      EN: "Collaborative spaces for group work, moot court practice, and peer-to-peer learning sessions.",
      RU: "Коллаборативные пространства для групповой работы, имитации судебных процессов и обучения.",
      UZ: "Guruhli ish, sud jarayonlari mashqi va o'zaro ta'lim sessiyalari uchun hamkorlik maydonlari.",
    },
    img: "photo-1523240795612-9a054b0db644",
  },
  {
    icon: FileText,
    title: { EN: "Legal Labs", RU: "Юридические лаборатории", UZ: "Yuridik laboratoriyalar" },
    desc: {
      EN: "Dedicated labs for legal drafting, document analysis, and applied legal research projects.",
      RU: "Специализированные лаборатории для юридического документооборота и прикладных исследований.",
      UZ: "Huquqiy hujjatlar tayyorlash, tahlil qilish va amaliy yuridik tadqiqot loyihalari uchun maxsus laboratoriyalar.",
    },
    img: "photo-1507679799987-c73779587ccf",
  },
];

export function LearningCenter() {
  const { lang, t } = useLanguage();

  return (
    <section id="learning-center" style={{ background: "rgba(13,13,13,0.5)" }} className="relative overflow-hidden py-10 md:py-16 section-glass">
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <div className="flex justify-center">
            <SectionLabel>{t.learning_label}</SectionLabel>
          </div>
          <GoldText
            as="h2"
            className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t.learning_title}
          </GoldText>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{
              color: C.muted,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {LEARNING_SUBTITLE[lang]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {FACILITIES.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <div
                key={index}
                className="relative h-[300px] rounded-2xl overflow-hidden group"
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/${facility.img}?w=600&h=450&fit=crop)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.35)",
                  }}
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.85) 100%)",
                  }}
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="mb-3">
                    <Icon size={28} style={{ color: C.gold }} />
                  </div>
                  <h3
                    className="text-lg font-bold mb-1.5"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: C.white,
                    }}
                  >
                    {facility.title[lang]}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: C.secondary,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {facility.desc[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
