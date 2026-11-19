"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API, byOrder, formatPrice, isActive, oneLine, pick, tr, useList, type Course } from "@/lib/content";
import { directionFor, type Direction } from "@/lib/brochure";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { NamedIcon } from "@/components/ui/Icons";
import { useEnroll } from "@/components/providers/EnrollProvider";

/** Picture shown in the card's corner: brochure book / flag / icon, or the admin-uploaded image. */
function CourseVisual({ dir, image, title }: { dir: Direction | null; image: string | null; title: string }) {
  const base = "pointer-events-none absolute transition-transform duration-700 ease-silk";
  const v = dir?.visual;
  if (v?.kind === "img" && v.shape === "book") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={v.src} alt="" loading="lazy" className={`${base} -bottom-6 right-3 w-[34%] max-w-[140px] rotate-[8deg] rounded-[6px] shadow-[0_24px_40px_-12px_rgba(0,0,0,.85)] group-hover:-translate-y-2 group-hover:rotate-[3deg]`} />
    );
  }
  if (v?.kind === "img" && v.shape === "flag") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={v.src} alt="" loading="lazy" className={`${base} -bottom-3 -right-4 w-[40%] max-w-[170px] rotate-[-10deg] rounded-xl shadow-[0_20px_40px_-14px_rgba(0,0,0,.9)] ring-1 ring-white/20 group-hover:-translate-y-2 group-hover:rotate-[-4deg]`} />
    );
  }
  if (v?.kind === "flag-ru") {
    return (
      <span className={`${base} -bottom-3 -right-4 flex aspect-[3/2] w-[40%] max-w-[170px] rotate-[-10deg] flex-col overflow-hidden rounded-xl shadow-[0_20px_40px_-14px_rgba(0,0,0,.9)] ring-1 ring-white/20 group-hover:-translate-y-2 group-hover:rotate-[-4deg]`}>
        <span className="flex-1 bg-white" /><span className="flex-1 bg-[#0039a6]" /><span className="flex-1 bg-[#d52b1e]" />
      </span>
    );
  }
  if (v?.kind === "icon") {
    return (
      <span className={`${base} -bottom-5 -right-5 flex h-32 w-32 rotate-[-8deg] items-center justify-center rounded-[28px] bg-grad-gold text-wine-900 shadow-gold group-hover:-translate-y-2 group-hover:rotate-0`}>
        <NamedIcon name={v.icon} className="h-14 w-14" strokeWidth={1.6} />
      </span>
    );
  }
  if (image) {
    return (
      <div className={`${base} -bottom-4 -right-4 h-[58%] w-[44%] rotate-[-6deg] overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-lift group-hover:-translate-y-2 group-hover:rotate-[-2deg]`}>
        <SmartImage src={image} alt={title} className="h-full w-full" sizes="200px" />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/logo-192.png" alt="" className={`${base} -bottom-4 -right-4 w-28 rotate-[-8deg] rounded-full opacity-90 group-hover:-translate-y-2`} />
  );
}

export function CourseCard({ c }: { c: Course }) {
  const { lang, t } = useLanguage();
  const { open } = useEnroll();
  const title = pick(c, "title", lang);
  const dir = directionFor(`${c.title_uz} ${c.title_ru} ${c.title_en}`);
  const desc = oneLine(pick(c, "description", lang));
  const price = formatPrice(c.price, lang);
  const pdfDuration = dir ? tr(dir.duration, lang) : "";
  const duration = c.duration?.trim() || (pdfDuration !== "—" ? pdfDuration : "");
  const level = c.level?.trim();

  return (
    <article className="card card-hover spot group relative flex h-full min-h-[250px] flex-col overflow-hidden p-5 sm:p-6">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(178,40,44,.35),transparent_70%)]" />
      <CourseVisual dir={dir} image={c.image} title={title} />

      <div className="relative z-[2] flex max-w-[64%] flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-1.5">
          {level && <span className="rounded-full bg-gold-400/15 px-2.5 py-0.5 text-[11px] font-bold text-gold-200">{level}</span>}
          {duration && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/[.07] px-2.5 py-0.5 text-[11px] font-semibold text-ink-soft">
              <Clock className="h-3 w-3 text-gold-400" />{duration}
            </span>
          )}
        </div>
        <Link href={`/courses/${c.id}`} className="mt-3">
          <h3 className="font-display text-[22px] font-extrabold leading-[1.1] tracking-tight text-white transition-colors group-hover:text-gold-200 sm:text-2xl">{title}</h3>
        </Link>
        {desc && <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-muted">{desc}</p>}

        <div className="mt-auto pt-5">
          {price && (
            <p className="num whitespace-nowrap text-lg text-gold-300">
              {price}
              <span className="ml-1 font-sans text-xs font-medium text-ink-muted">{t.course_per_month}</span>
            </p>
          )}
          <div className="mt-3 flex items-center gap-2">
            <button type="button" onClick={() => open(c.id)} className="btn btn-gold btn-sm !px-4">
              {t.cta_enroll}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link href={`/courses/${c.id}`} aria-label={t.cta_more} className="btn-glass flex h-10 w-10 items-center justify-center rounded-full">
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Number of grid columns for the current viewport (matches sm:2 / lg:3 below). */
function useColumns() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () => setCols(lg.matches ? 3 : sm.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => { lg.removeEventListener("change", update); sm.removeEventListener("change", update); };
  }, []);
  return cols;
}

export function Courses({ showHeading = true }: { limit?: number; showHeading?: boolean }) {
  const { t } = useLanguage();
  const { data, loading } = useList<Course>(API.courses);
  const courses = data.filter(isActive).sort(byOrder);
  const cols = useColumns();
  const perPage = cols * 2; // always two rows
  const pages = Math.max(1, Math.ceil(courses.length / perPage));
  const [page, setPage] = useState(0);
  const current = Math.min(page, pages - 1);
  const shown = courses.slice(current * perPage, current * perPage + perPage);
  const sectionRef = useRef<HTMLElement>(null);
  const gridBox = useRef<HTMLDivElement>(null);
  const [minH, setMinH] = useState(0);

  // Remember the height of a full (two-row) page so shorter last pages don't make the page jump.
  useEffect(() => {
    if (current === 0 && gridBox.current) setMinH(gridBox.current.offsetHeight);
  }, [current, perPage, shown.length]);

  const goTo = (p: number) => {
    setPage(p);
    const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
    if (top < -40) sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="courses" ref={sectionRef} className="section">
      <div className="shell">
        {showHeading && <SectionHeading eyebrow={t.courses_eyebrow} title={<span className="text-headline">{t.courses_title}</span>} sub={t.courses_sub} align="left" />}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-[250px] rounded-[24px]" />)}</div>
        ) : courses.length === 0 ? (
          <EmptyState text={t.empty} />
        ) : (
          <>
            <div ref={gridBox} style={{ minHeight: current === 0 ? undefined : minH }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${current}-${perPage}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {shown.map((c) => <CourseCard key={c.id} c={c} />)}
              </motion.div>
            </AnimatePresence>
            </div>

            {pages > 1 && (
              <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
                <button type="button" onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous" className="btn-glass flex h-11 w-11 items-center justify-center rounded-full disabled:opacity-30">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: pages }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === current ? "page" : undefined}
                    className={`num h-11 min-w-[2.75rem] rounded-full px-3 text-sm transition-all duration-300 ${i === current ? "bg-grad-gold text-wine-950 shadow-gold" : "border border-white/10 bg-white/[.04] text-ink-soft hover:text-white"}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button type="button" onClick={() => goTo(current + 1)} disabled={current === pages - 1} aria-label="Next" className="btn-glass flex h-11 w-11 items-center justify-center rounded-full disabled:opacity-30">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
