"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApiData } from "@/hooks/useApiData";
import { getImageUrl } from "@/lib/utils";
import { C } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GoldText } from "@/components/ui/GoldText";
import SimpleMarquee from "@/components/ui/SimpleMarquee";
import { X, Award } from "lucide-react";

interface ResultData {
  id: number;
  student_name_uz: string;
  student_name_ru: string;
  student_name_en: string;
  achievement_uz: string;
  achievement_ru: string;
  achievement_en: string;
  description_uz?: string;
  description_ru?: string;
  description_en?: string;
  year: string;
  photo?: string;
  photos?: string[];
}

export function Results() {
  const { lang, t } = useLanguage();
  const { data: results, loading } = useApiData<ResultData>("/api/results?is_active=true");
  const [selected, setSelected] = useState<ResultData | null>(null);

  const l = lang.toLowerCase() as "uz" | "ru" | "en";
  const getName = (item: ResultData) =>
    item[`student_name_${l}`] || item.student_name_en;
  const getAchievement = (item: ResultData) =>
    item[`achievement_${l}`] || item.achievement_en;
  const getPhoto = (item: ResultData) => item.photos?.[0] || item.photo;
  const getDescription = (item: ResultData) =>
    item[`description_${l}`] || item.description_en || "";

  const photos = results.filter((r) => r.photos?.length || r.photo);

  if (loading) {
    return (
      <section className="relative overflow-hidden py-10 md:py-16" style={{ background: "rgba(13,13,13,0.5)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>{t.results_label || "Track Record"}</SectionLabel>
          <h2 className="text-2xl sm:text-5xl font-bold mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
            <GoldText>{t.results_title || "Our Achievements"}</GoldText>
          </h2>
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${C.gold}40`, borderTopColor: C.gold }} />
          </div>
        </div>
      </section>
    );
  }

  if (results.length === 0) return null;

  const ImageCard = ({ item, className = "" }: { item: ResultData; className?: string }) => (
    <div
      className={`relative group cursor-pointer overflow-hidden rounded-xl shrink-0 ${className}`}
      onClick={() => setSelected(item)}
      style={{ width: 180 }}
    >
      <img
        src={getImageUrl(getPhoto(item))}
        alt={getName(item)}
        className="w-full aspect-[9/16] object-cover transition-all duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-bold font-serif leading-tight">{getName(item)}</p>
          <p className="text-xs mt-1 leading-tight" style={{ color: C.gold }}>{getAchievement(item)}</p>
        </div>
      </div>
    </div>
  );

  const marqueeRows = [
    { direction: "left" as const, baseVelocity: 10 },
    { direction: "right" as const, baseVelocity: 12 },
  ];

  return (
    <section
      className="relative overflow-hidden py-10 md:py-16"
      style={{ background: "rgba(13,13,13,0.5)" }}
      id="results"
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 md:mb-12">
        <SectionLabel>{t.results_label || "Track Record"}</SectionLabel>
        <h2
          className="text-2xl sm:text-5xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <GoldText>{t.results_title || "Our Achievements"}</GoldText>
        </h2>
      </div>

      {photos.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {results.map((item, i) => {
              const Icon = [Award, Award, Award, Award, Award, Award][i % 6];
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-5 p-7 rounded-2xl"
                  style={{ background: C.card, border: `1px solid ${C.border}` }}
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0 rounded-xl"
                    style={{ width: 56, height: 56, background: C.burGrad, color: C.gold }}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="text-3xl font-bold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        background: C.goldGrad,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {item.year}
                    </span>
                    <span className="text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif", color: C.secondary }}>
                      {getAchievement(item)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2 md:space-y-3"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          }}
        >
            {marqueeRows.map((row, rowIndex) => (
              <SimpleMarquee
                key={rowIndex}
                direction={row.direction}
                baseVelocity={row.baseVelocity}
                repeat={10}
                slowdownOnHover
                draggable
                grabCursor
                className="py-1"
              >
                  <div className="flex gap-4 md:gap-5 px-2">
                  {photos.map((item) => (
                    <ImageCard key={item.id} item={item} />
                  ))}
                </div>
              </SimpleMarquee>
            ))}
          </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
            style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(16px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${C.border}` }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
                style={{ background: "rgba(0,0,0,0.6)", color: "white" }}
              >
                <X className="w-4 h-4" />
              </button>
              <div className="bg-black flex items-center justify-center">
                <img
                  src={getImageUrl(getPhoto(selected))}
                  alt={getName(selected)}
                  className="max-w-full max-h-[70vh] object-contain mx-auto"
                />
              </div>
              <div className="p-5 md:p-7" style={{ background: C.card }}>
                <p className="text-white text-lg md:text-2xl font-bold font-serif">{getName(selected)}</p>
                <p className="text-sm md:text-base mt-1" style={{ color: C.gold }}>
                  {getAchievement(selected)}
                </p>
                {getDescription(selected) && (
                  <p className="text-xs md:text-sm mt-3 leading-relaxed" style={{ color: C.secondary }}>
                    {getDescription(selected)}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-3">
                  <span
                    className="inline-block font-serif text-lg font-bold"
                    style={{
                      background: C.goldGrad,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {selected.year}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
