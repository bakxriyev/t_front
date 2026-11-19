"use client";

import { useRef, useState } from "react";
import { Play, Quote, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API, byOrder, isActive, isVideoFile, media, pick, youtubeId, useList, type Testimonial, type VideoReview } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Modal } from "@/components/ui/Modal";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

type Playable = { label: string; src: string | null; yt: string | null };

/** Clean vertical video tile — no captions, the video speaks for itself. Plays muted on hover. */
function VideoCard({ v, onPlay }: { v: Playable; onPlay: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={v.label}
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => { if (ref.current) { ref.current.pause(); ref.current.currentTime = 0.1; } }}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-black ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 ease-silk hover:-translate-y-2 hover:shadow-[0_30px_50px_-24px_rgba(178,40,44,.9)] hover:ring-gold-400/50"
    >
      {v.src ? (
        <video ref={ref} src={`${v.src}#t=0.1`} muted playsInline preload="metadata" loop className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      ) : v.yt ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`https://i.ytimg.com/vi/${v.yt}/hqdefault.jpg`} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 transition-opacity duration-500 group-hover:opacity-40" />
      <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-500 group-hover:scale-90 group-hover:opacity-0">
        <span className="absolute inset-0 animate-pulsering rounded-full bg-white/30" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-grad-gold text-wine-950 shadow-gold">
          <Play className="ml-0.5 h-5 w-5 fill-current" />
        </span>
      </span>
    </button>
  );
}

function TestimonialCard({ x }: { x: Testimonial }) {
  const { lang } = useLanguage();
  const name = pick(x, "name", lang);
  const position = pick(x, "position", lang);
  return (
    <figure className="card card-hover spot relative flex h-full flex-col overflow-hidden p-4 sm:p-5">
      <Quote className="pointer-events-none absolute -right-2 -top-2 h-20 w-20 rotate-180 text-gold-400/[.08]" strokeWidth={1} />
      <figcaption className="relative z-[2] flex items-center gap-3">
        <span className="shrink-0 rounded-full bg-grad-gold p-[2px]">
          <SmartImage src={x.image} alt={name} fallbackText={name} className="h-10 w-10 rounded-full" sizes="40px" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-[15px] font-extrabold text-white">{name}</p>
          {position && <p className="truncate text-xs text-gold-300">{position}</p>}
        </div>
      </figcaption>
      <div className="relative z-[2] mt-3 flex gap-0.5 text-gold-400">
        {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
      </div>
      <blockquote className="relative z-[2] mt-2 line-clamp-5 flex-1 whitespace-pre-line text-sm leading-relaxed text-ink-soft">
        “{pick(x, "content", lang)}”
      </blockquote>
    </figure>
  );
}

export function Reviews() {
  const { lang, t } = useLanguage();
  const { data: videos } = useList<VideoReview>(API.videoReviews);
  const { data: testimonials } = useList<Testimonial>(API.testimonials);
  const [playing, setPlaying] = useState<Playable | null>(null);

  const vids: Playable[] = [
    ...videos.filter(isActive).sort(byOrder).map((v) => ({ label: pick(v, "name", lang) || t.reviews_video, src: media(v.video), yt: youtubeId(v.video) })),
    ...testimonials
      .filter((x) => isActive(x) && x.video_url && (isVideoFile(x.video_url) || youtubeId(x.video_url)))
      .map((x) => ({ label: pick(x, "name", lang) || t.reviews_video, src: isVideoFile(x.video_url) ? media(x.video_url) : null, yt: youtubeId(x.video_url) })),
  ].filter((v) => v.src || v.yt);
  const texts = testimonials.filter((x) => isActive(x) && pick(x, "content", lang)).sort(byOrder);

  if (!vids.length && !texts.length) return null;

  return (
    <section id="reviews" className="section">
      <div className="shell">
        <SectionHeading eyebrow={t.reviews_eyebrow} title={<span className="text-headline">{t.reviews_title}</span>} />

        {vids.length > 0 && (
          <Stagger className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {vids.map((v, i) => (
              <StaggerItem key={`${v.src || v.yt}-${i}`} className="w-[calc(33.333%-0.5rem)] max-w-[160px] sm:w-[150px] lg:w-[160px]">
                <VideoCard v={v} onPlay={() => setPlaying(v)} />
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {texts.length > 0 && (
          <Stagger className={`flex flex-wrap justify-center gap-3 ${vids.length ? "mt-10" : ""}`}>
            {texts.map((x) => (
              <StaggerItem key={x.id} className="w-full sm:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.5625rem)]">
                <TestimonialCard x={x} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>

      <Modal open={!!playing} onClose={() => setPlaying(null)} size="sm" label={playing?.label || "Video"}>
        {playing && (
          <div className="bg-black p-2">
            {playing.src ? (
              <video src={playing.src} controls autoPlay playsInline className="max-h-[82vh] w-full rounded-[22px] bg-black" />
            ) : (
              <iframe
                className="aspect-[9/16] max-h-[82vh] w-full rounded-[22px]"
                src={`https://www.youtube.com/embed/${playing.yt}?autoplay=1`}
                title={playing.label}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
