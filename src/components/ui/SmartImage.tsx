"use client";

import Image from "next/image";
import { useState } from "react";
import { media, initials } from "@/lib/content";

/**
 * Backend image rendered through next/image (resized + WebP/AVIF, lazy) with a soft fade-in
 * and a branded fallback (initials monogram or crest) when the file is missing.
 * The parent must be positioned and sized (the image fills it).
 */
export function SmartImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  fallbackText,
  eager = false,
  fit = "cover",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  src?: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackText?: string;
  eager?: boolean;
  fit?: "cover" | "contain";
  sizes?: string;
}) {
  const url = media(src);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {url && !failed ? (
        <>
          {!loaded && <div className="absolute inset-0 animate-pulse bg-white/[.05]" />}
          <Image
            src={url}
            alt={alt}
            fill
            sizes={sizes}
            priority={eager}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`transition-[opacity,transform] duration-700 ease-silk ${fit === "cover" ? "object-cover" : "object-contain"} ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
          />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-grad-wine">
          <div className="grid-lines absolute inset-0 opacity-60" />
          {fallbackText ? (
            <span className="relative font-display text-4xl font-semibold text-gold-300">{initials(fallbackText)}</span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/images/logo-192.png" alt="" className="relative h-16 w-16 rounded-full opacity-90" />
          )}
        </div>
      )}
    </div>
  );
}
