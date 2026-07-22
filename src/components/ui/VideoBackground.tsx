"use client";

import { useState, useRef, useEffect } from "react";

export function VideoBackground() {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current || hasError) return;
    const video = videoRef.current;
    const onCanPlay = () => setLoaded(true);
    const onErr = () => { setHasError(true); setLoaded(true); };
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onErr);
    if (video.readyState >= 3) setLoaded(true);
    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onErr);
    };
  }, [hasError]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Poster image loads immediately */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          loaded && !hasError ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background: "linear-gradient(180deg, #0B0B0B 0%, #0D0D0D 50%, #050505 100%)",
          filter: "brightness(0.7) saturate(1.3) contrast(1.1)",
        }}
      />

      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          loaded && !hasError ? "opacity-60" : "opacity-0"
        }`}
        style={{ filter: "brightness(0.7) saturate(1.3) contrast(1.1)" }}
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradients */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(167,25,48,0.12) 0%, transparent 70%),
          radial-gradient(ellipse 60% 50% at 80% 30%, rgba(212,175,55,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 20% 50%, rgba(139,58,58,0.08) 0%, transparent 50%),
          linear-gradient(180deg, rgba(11,11,11,0.15) 0%, rgba(11,11,11,0.35) 50%, rgba(11,11,11,0.65) 100%)
        `,
      }} />

      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Gold vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 40% 30% at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
