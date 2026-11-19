"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Eye, Newspaper } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API, oneLine, pick, useList, type News as NewsT } from "@/lib/content";
import type { Lang } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { SmartImage } from "@/components/ui/SmartImage";

const MONTHS: Record<Lang, string[]> = {
  UZ: ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"],
  RU: ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
  EN: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

/** Calendar-style date badge: big day, short month, year. */
function DateBadge({ iso, lang, className = "" }: { iso?: string; lang: Lang; className?: string }) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return (
    <span suppressHydrationWarning className={`flex w-14 flex-col items-center overflow-hidden rounded-2xl bg-white text-center shadow-[0_12px_24px_-10px_rgba(0,0,0,.8)] ${className}`}>
      <span className="w-full bg-grad-wine py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{MONTHS[lang][d.getMonth()]}</span>
      <span className="num pt-1 text-xl leading-none text-wine-900">{d.getDate()}</span>
      <span className="pb-1 text-[10px] font-semibold text-wine-900/60">{d.getFullYear()}</span>
    </span>
  );
}

/** Shows the whole image (contain) on a dark plate, so nothing gets cropped. */
export function FullImage({ src, alt, className = "", sizes }: { src?: string | null; alt: string; className?: string; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden bg-black/40 ${className}`}>
      <SmartImage src={src} alt={alt} fit="contain" sizes={sizes} className="relative h-full w-full" imgClassName="transition-transform duration-700 ease-silk group-hover:scale-[1.04]" />
    </div>
  );
}

export function NewsCard({ n, featured = false }: { n: NewsT; featured?: boolean }) {
  const { lang } = useLanguage();
  const title = pick(n, "title", lang);
  const excerpt = oneLine(pick(n, "excerpt", lang) || pick(n, "content", lang));
  const readLabel = lang === "RU" ? "Читать" : lang === "EN" ? "Read more" : "Batafsil o‘qish";

  return (
    <Link
      href={`/news/${n.id}`}
      className={`card card-hover spot group flex h-full overflow-hidden ${featured ? "flex-col lg:grid lg:grid-cols-[1.15fr_1fr]" : "flex-col"}`}
    >
      <div className="relative">
        <FullImage src={n.image} alt={title} className={featured ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[340px]" : "aspect-[16/10]"} sizes={featured ? "(max-width: 1024px) 100vw, 640px" : "(max-width: 768px) 100vw, 33vw"} />
        <DateBadge iso={n.createdAt} lang={lang} className="absolute left-4 top-4" />
      </div>
      <div className={`relative z-[2] flex flex-1 flex-col ${featured ? "p-6 sm:p-9" : "p-5 sm:p-6"}`}>
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/15 px-2.5 py-1 uppercase tracking-wider text-gold-300">
            <Newspaper className="h-3.5 w-3.5" />
            {n.type === "event" ? (lang === "RU" ? "Событие" : lang === "EN" ? "Event" : "Tadbir") : lang === "RU" ? "Новость" : lang === "EN" ? "News" : "Yangilik"}
          </span>
          <span className="inline-flex items-center gap-1 text-ink-muted"><Eye className="h-3.5 w-3.5" />{n.views ?? 0}</span>
        </div>
        <h3 className={`mt-4 font-display font-black leading-[1.08] tracking-tight text-white transition-colors group-hover:text-gold-200 ${featured ? "text-3xl sm:text-4xl" : "line-clamp-2 text-[22px]"}`}>
          {title}
        </h3>
        {excerpt && <p className={`mt-3 leading-relaxed text-ink-soft ${featured ? "line-clamp-4 text-[16px]" : "line-clamp-2 text-sm"}`}>{excerpt}</p>}
        <span className="mt-auto inline-flex items-center gap-3 pt-6 text-sm font-bold text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-grad-gold text-wine-950 transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </span>
          {readLabel}
        </span>
      </div>
    </Link>
  );
}

/** One slide: the image melts into the text panel through a gradient. */
function NewsSlide({ n }: { n: NewsT }) {
  const { lang } = useLanguage();
  const title = pick(n, "title", lang);
  const excerpt = oneLine(pick(n, "excerpt", lang) || pick(n, "content", lang));
  const readLabel = lang === "RU" ? "Читать" : lang === "EN" ? "Read more" : "Batafsil o‘qish";
  return (
    <Link href={`/news/${n.id}`} className="group relative block h-[440px] overflow-hidden rounded-[28px] bg-[#140c0e] ring-1 ring-white/10 sm:h-[420px]">
      {/* image: top on mobile, left ~65% on desktop */}
      <div className="absolute inset-x-0 top-0 h-[58%] sm:inset-y-0 sm:left-0 sm:right-auto sm:h-full sm:w-[66%]">
        <SmartImage src={n.image} alt={title} className="h-full w-full" sizes="(max-width: 640px) 100vw, 860px" imgClassName="transition-transform duration-[1.4s] ease-silk group-hover:scale-105" />
      </div>
      {/* gradient bridges the photo and the text */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(20,12,14,.85)_52%,#140c0e_62%)] sm:bg-[linear-gradient(90deg,transparent_22%,rgba(20,12,14,.75)_48%,#140c0e_66%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_50%,rgba(146,28,33,.35),transparent_70%)]" />
      <DateBadge iso={n.createdAt} lang={lang} className="absolute left-5 top-5" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[46%] sm:justify-center sm:p-10">
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/15 px-2.5 py-1 uppercase tracking-wider text-gold-300">
            <Newspaper className="h-3.5 w-3.5" />
            {n.type === "event" ? (lang === "RU" ? "Событие" : lang === "EN" ? "Event" : "Tadbir") : lang === "RU" ? "Новость" : lang === "EN" ? "News" : "Yangilik"}
          </span>
          <span className="inline-flex items-center gap-1 text-ink-muted"><Eye className="h-3.5 w-3.5" />{n.views ?? 0}</span>
        </div>
        <h3 className="mt-3 line-clamp-3 font-display text-2xl font-black leading-[1.08] tracking-tight text-white transition-colors group-hover:text-gold-200 sm:mt-4 sm:text-4xl">{title}</h3>
        {excerpt && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft sm:line-clamp-3 sm:text-[15px]">{excerpt}</p>}
        <span className="mt-5 inline-flex items-center gap-3 text-sm font-bold text-white sm:mt-7">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-grad-gold text-wine-950 transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </span>
          {readLabel}
        </span>
      </div>
    </Link>
  );
}

/** Auto-playing news slider (pauses on hover); arrows and dots when there is more than one item. */
function NewsSlider({ items }: { items: NewsT[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;
  const go = (d: number) => setI((x) => (x + d + count) % count);

  useEffect(() => {
    if (count < 2 || paused) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % count), 5500);
    return () => window.clearInterval(id);
  }, [count, paused]);

  if (!count) return null;
  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={items[i].id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <NewsSlide n={items[i]} />
        </motion.div>
      </AnimatePresence>
      {count > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button type="button" onClick={() => go(-1)} aria-label="Previous" className="btn-glass flex h-10 w-10 items-center justify-center rounded-full"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex items-center gap-2">
            {items.map((n, k) => (
              <button key={n.id} type="button" onClick={() => setI(k)} aria-label={`${k + 1}`} className="relative h-2 overflow-hidden rounded-full bg-white/15 transition-all duration-500" style={{ width: k === i ? 40 : 8 }}>
                {k === i && (
                  <motion.span
                    key={`${i}-${paused}`}
                    className="absolute inset-y-0 left-0 bg-grad-gold"
                    initial={{ width: "0%" }}
                    animate={{ width: paused ? "100%" : "100%" }}
                    transition={{ duration: paused ? 0 : 5.5, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next" className="btn-glass flex h-10 w-10 items-center justify-center rounded-full"><ChevronRight className="h-5 w-5" /></button>
        </div>
      )}
    </div>
  );
}

export function NewsSection({ limit = 6, showHeading = true }: { limit?: number; showHeading?: boolean }) {
  const { t } = useLanguage();
  const { data, loading } = useList<NewsT>(API.news);
  const list = data.filter((n) => !n.status || n.status === "published");
  const slides = list.slice(0, limit || 6);

  if (!loading && !list.length && showHeading) return null;

  return (
    <section id="news" className="section">
      <div className="shell">
        {showHeading && (
          <SectionHeading
            eyebrow={t.news_eyebrow}
            title={<span className="text-headline">{t.news_title}</span>}
            align="left"
            action={<Link href="/news" className="btn btn-outline group">{t.cta_all}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>}
          />
        )}
        {loading ? (
          <Skeleton className="h-[420px] rounded-[28px]" />
        ) : !list.length ? (
          <EmptyState text={t.empty} />
        ) : (
          <Reveal><NewsSlider items={slides} /></Reveal>
        )}

        {/* Full archive under the slider on the /news page */}
        {!showHeading && list.length > 1 && (
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((n) => <StaggerItem key={n.id}><NewsCard n={n} /></StaggerItem>)}
          </Stagger>
        )}
      </div>
    </section>
  );
}
