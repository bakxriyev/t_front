"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, type PanInfo } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApiData, useApiSingle } from "@/hooks/useApiData";
import { getImageUrl } from "@/lib/utils";
import { C } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldText from "@/components/ui/GoldText";
import Image from "next/image";

interface VideoReviewData {
  id: number;
  name_uz: string;
  name_ru: string;
  name_en: string;
  description_uz?: string;
  description_ru?: string;
  description_en?: string;
  video?: string;
  order: number;
  is_active: boolean;
}

const CARD_W = 180;

function MarqueeCard({ item, index, originalIndex, settings, handleOpen }: {
  item: { id: number; name: string; description: string; video: string };
  index: number;
  originalIndex: number;
  settings: { logo?: string } | null;
  handleOpen: (i: number) => void;
}) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer shrink-0"
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        aspectRatio: "9/16",
        width: CARD_W,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
      onClick={() => handleOpen(originalIndex)}
    >
      <video
        src={getImageUrl(item.video)}
        className="w-full h-full object-cover"
        preload="metadata"
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {settings?.logo && (
        <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-lg overflow-hidden shadow-lg ring-1 ring-white/10">
          <Image src={getImageUrl(settings.logo)} alt="" width={28} height={28} className="object-cover w-full h-full" />
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-transform duration-300 group-hover:scale-110" style={{ background: `${C.gold}cc`, boxShadow: `0 0 30px ${C.gold}30` }}>
          <Play className="w-5 h-5 ml-0.5" style={{ color: C.bg, fill: C.bg }} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="text-xs font-bold leading-tight text-center" style={{ fontFamily: "'Playfair Display', serif", color: C.white }}>
          {item.name}
        </p>
      </div>
    </div>
  );
}

export function VideoReviews() {
  const { lang, t } = useLanguage();
  const { data: apiData, loading } = useApiData<VideoReviewData>("/api/video-reviews?is_active=true");
  const { data: settings } = useApiSingle<{ logo?: string }>('/api/settings');

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControl, setShowControl] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const l = lang.toLowerCase();

  const items = useMemo(() => {
    return apiData.map((item) => ({
      id: item.id,
      name: (item as any)[`name_${l}`] || "",
      description: (item as any)[`description_${l}`] || "",
      video: item.video || "",
    }));
  }, [apiData, lang]);

  const selected = selectedIndex !== null ? items[selectedIndex] : null;

  const singleSetWidth = (CARD_W + 12) * items.length;
  const x = useMotionValue(0);

  useEffect(() => {
    if (singleSetWidth > 0) {
      x.set(-singleSetWidth);
    }
  }, [singleSetWidth]);

  const allItems = useMemo(() => {
    if (items.length === 0) return [];
    return [...items, ...items, ...items];
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (allItems.length === 0) return;
    const speed = 35;
    const current = x.get();
    const singleSetWidth = (CARD_W + 12) * items.length;
    let newX = current - speed * (delta / 1000);
    if (newX <= -singleSetWidth * 2) {
      newX += singleSetWidth;
    }
    x.set(newX);
  });

  const showControlsTemporarily = useCallback(() => {
    setShowControl(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControl(false), 2500);
  }, []);

  const handleOpen = (globalIndex: number) => {
    setSelectedIndex(globalIndex);
    setPlaying(true);
    setProgress(0);
    setShowControl(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControl(false), 2500);
  };

  const handleClose = () => {
    setSelectedIndex(null);
    setPlaying(false);
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const handleNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < items.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setPlaying(true);
      setProgress(0);
      showControlsTemporarily();
    }
  }, [selectedIndex, items.length, showControlsTemporarily]);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setPlaying(true);
      setProgress(0);
      showControlsTemporarily();
    }
  }, [selectedIndex, showControlsTemporarily]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isNaN(pct) ? 0 : pct);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      videoRef.current.currentTime = pct * videoRef.current.duration;
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
      showControlsTemporarily();
    }
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -60) handleNext();
    else if (info.offset.x > 60) handlePrev();
    else showControlsTemporarily();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); handleNext(); }
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); handlePrev(); }
      else if (e.key === "Escape") { e.preventDefault(); handleClose(); }
      else if (e.key === " ") { e.preventDefault(); handleVideoClick(); }
      else if (e.key === "m") { setMuted((m) => !m); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  useEffect(() => {
    if (selected && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [selected]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, []);

  if (loading) {
    return (
      <section id="video-reviews" className="relative overflow-hidden py-10 md:py-16" style={{ background: "rgba(13,13,13,0.5)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <SectionLabel>{t.videos_label}</SectionLabel>
            <h2 className="text-2xl sm:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              <GoldText>{t.videos_title}</GoldText>
            </h2>
          </div>
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${C.gold}40`, borderTopColor: C.gold }} />
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section
      id="video-reviews"
      className="relative overflow-hidden py-10 md:py-16"
      style={{ background: "rgba(13,13,13,0.5)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <SectionLabel>{t.videos_label}</SectionLabel>
          <h2 className="text-2xl sm:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            <GoldText>{t.videos_title}</GoldText>
          </h2>
        </div>

        <div
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <motion.div
            className="flex gap-3 md:gap-4"
            style={{ x }}
          >
            {allItems.map((item, i) => (
              <MarqueeCard
                key={`${item.id}-${i}`}
                item={item}
                index={i}
                originalIndex={i % items.length}
                settings={settings}
                handleOpen={handleOpen}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.93)" }}
            onClick={handleClose}
          >
            <motion.div
              key={selected.id}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="relative w-full max-w-[400px] h-[85vh] rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}
              onClick={(e) => e.stopPropagation()}
              onMouseMove={showControlsTemporarily}
            >
              <div className={`absolute top-0 left-0 right-0 z-30 transition-opacity duration-300 ${showControl ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-gradient-to-b from-black/70 to-transparent pt-4 pb-8 px-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {settings?.logo && (
                        <div className="w-8 h-8 rounded-lg overflow-hidden shadow-lg ring-1 ring-white/10 bg-black/40">
                          <Image src={getImageUrl(settings.logo)} alt="" width={32} height={32} className="object-cover w-full h-full" />
                        </div>
                      )}
                      <span className="text-sm font-bold tracking-wider" style={{ color: C.gold }}>TLS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
                        className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110"
                        style={{ background: "rgba(0,0,0,0.5)" }}
                      >
                        {muted ? <VolumeX className="w-3.5 h-3.5 text-white" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleClose(); }}
                        className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110"
                        style={{ background: "rgba(0,0,0,0.5)" }}
                      >
                        <X className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-between px-2 transition-opacity duration-300 ${showControl ? 'opacity-100' : 'opacity-0'}`}>
                {selectedIndex! > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20"
                    style={{ background: "rgba(0,0,0,0.5)" }}
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                )}
                {selectedIndex! < items.length - 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20 ml-auto"
                    style={{ background: "rgba(0,0,0,0.5)" }}
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>

              <div className="relative w-full h-full" style={{ background: "#000" }}>
                <video
                  ref={videoRef}
                  src={getImageUrl(selected.video)}
                  className="w-full h-full object-contain"
                  autoPlay
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleNext}
                  onClick={handleVideoClick}
                />

                <div
                  className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${playing ? 'opacity-0' : 'opacity-100'}`}
                  onClick={handleVideoClick}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <Play className="w-6 h-6 ml-0.5 text-white" />
                  </div>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 z-30 transition-opacity duration-300 ${showControl ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="bg-gradient-to-t from-black/80 via-black/30 to-transparent pt-12 pb-6 px-4">
                    <p className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", color: C.white }}>
                      {selected.name}
                    </p>
                    {selected.description && (
                      <p className="text-sm mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif" }}>
                        {selected.description}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  ref={progressRef}
                  className="absolute bottom-0 left-0 right-0 z-40 h-1 bg-white/15 cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); handleProgressClick(e); }}
                >
                  <div className="relative h-full" style={{ width: `${progress}%`, background: C.goldGrad }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md" style={{ boxShadow: `0 0 8px ${C.gold}` }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
