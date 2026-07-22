"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApiData } from "@/hooks/useApiData";
import { getImageUrl } from "@/lib/utils";
import { C } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GoldText } from "@/components/ui/GoldText";
import SimpleMarquee from "@/components/ui/SimpleMarquee";
import { Star, X, Quote, Play } from "lucide-react";

interface BackendTestimonial {
  id: number;
  name_uz: string;
  name_ru: string;
  name_en: string;
  position_uz: string;
  position_ru: string;
  position_en: string;
  content_uz: string;
  content_ru: string;
  content_en: string;
  image: string | null;
  video_url?: string;
  type: string;
  rating: number;
  order: number;
}

interface TextItem {
  kind: "text";
  name: string;
  position: string;
  review: string;
  rating: number;
  img: string;
}

interface VideoItem {
  kind: "video";
  name: string;
  position: string;
  video: string;
  img: string;
}

type Item = TextItem | VideoItem;

export function Testimonials() {
  const { lang, t } = useLanguage();
  const { data: apiData, loading } = useApiData<BackendTestimonial>(
    "/api/testimonials?is_active=true"
  );
  const [selected, setSelected] = useState<Item | null>(null);

  const l = lang.toLowerCase();

  const items = useMemo(() => {
    return apiData.map((item): Item => {
      const name = (item as any)[`name_${l}`] || "";
      const position = (item as any)[`position_${l}`] || "";
      const img = getImageUrl(item.image);
      if (item.type === "video") {
        return {
          kind: "video",
          name,
          position,
          video: getImageUrl(item.video_url),
          img,
        };
      }
      return {
        kind: "text" as const,
        name,
        position,
        review: (item as any)[`content_${l}`] || "",
        rating: item.rating || 5,
        img,
      };
    });
  }, [apiData, lang]);

  if (loading) {
    return (
      <section className="relative overflow-hidden py-6 md:py-10" style={{ background: "rgba(13,13,13,0.5)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-2">
            <SectionLabel>Biz haqimizda fikrlar</SectionLabel>
            <h2 className="text-xl sm:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              <GoldText>{t.testimonials_title || "Student Stories"}</GoldText>
            </h2>
          </div>
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${C.gold}40`, borderTopColor: C.gold }} />
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  const TestimonialCard = ({ item }: { item: Item }) => {
    const isVideo = item.kind === "video";
    return (
      <div
        className="relative group cursor-pointer overflow-hidden rounded-xl shrink-0"
        onClick={() => setSelected(item)}
        style={{ width: 200, height: 150, background: C.card, border: `1px solid ${C.border}` }}
      >
        {isVideo ? (
          <div className="relative w-full h-full">
            <img
              src={item.img || "/images/placeholder.svg"}
              alt={item.name}
              className="w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: C.goldGrad }}
              >
                <Play className="w-4 h-4 ml-0.5" style={{ color: C.bg, fill: C.bg }} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white text-xs font-bold font-serif leading-tight truncate">{item.name}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2.5 p-3 h-full">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-0.5" style={{ border: `2px solid ${C.gold}40` }}>
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-bold font-serif leading-tight truncate">{item.name}</p>
              <p className="text-[10px] mt-0.5 truncate" style={{ color: C.gold }}>{item.position}</p>
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={9} fill={C.gold} stroke={C.gold} />
                ))}
              </div>
              <p className="text-[11px] mt-1.5 leading-relaxed line-clamp-2" style={{ color: C.secondary }}>
                &ldquo;{item.review}&rdquo;
              </p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
          <span className="text-xs font-semibold text-white">Batafsil</span>
        </div>
      </div>
    );
  };

  return (
    <section
      className="relative overflow-hidden py-6 md:py-10"
      style={{ background: "rgba(13,13,13,0.5)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-4 md:mb-6">
        <div className="text-center">
          <SectionLabel>Biz haqimizda fikrlar</SectionLabel>
          <h2
            className="text-xl sm:text-3xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <GoldText>{t.testimonials_title || "Student Stories"}</GoldText>
          </h2>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <SimpleMarquee
          direction="left"
          baseVelocity={14}
          repeat={8}
          slowdownOnHover
          draggable
          grabCursor
          className="py-0"
        >
          <div className="flex gap-2.5 px-2">
            {items.map((item, i) => (
              <TestimonialCard key={i} item={item} />
            ))}
          </div>
        </SimpleMarquee>
      </div>

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
              className="relative max-w-lg w-full rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${C.border}` }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
                style={{ background: "rgba(0,0,0,0.6)", color: "white" }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {selected.kind === "video" ? (
                <div>
                  <div style={{ background: "#000" }}>
                    <video
                      src={selected.video}
                      controls
                      autoPlay
                      className="w-full max-h-[60vh] object-contain"
                      playsInline
                    />
                  </div>
                  <div className="p-4 md:p-6" style={{ background: C.card }}>
                    <p className="text-white text-base font-bold font-serif">{selected.name}</p>
                    <p className="text-xs mt-1" style={{ color: C.gold }}>{selected.position}</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 md:p-8 text-center" style={{ background: C.card }}>
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden" style={{ border: `3px solid ${C.gold}60` }}>
                    <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
                  </div>
                  <Quote className="mx-auto mb-3" size={24} style={{ color: C.gold }} />
                  <p className="text-sm md:text-base leading-relaxed italic mb-5" style={{ color: C.secondary, fontFamily: "'Playfair Display', serif" }}>
                    &ldquo;{selected.review}&rdquo;
                  </p>
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: selected.rating }).map((_, i) => (
                      <Star key={i} size={16} fill={C.gold} stroke={C.gold} />
                    ))}
                  </div>
                  <p className="text-white text-base font-bold font-serif">{selected.name}</p>
                  <p className="text-xs mt-1" style={{ color: C.gold }}>{selected.position}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
