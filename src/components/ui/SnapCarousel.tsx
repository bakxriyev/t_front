"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Phones: a horizontal swipe carousel (snap per card, next card peeks in, dots below).
 * From `sm` up: an ordinary grid — pass the grid columns via `gridClassName`.
 */
export function SnapCarousel({
  children,
  gridClassName = "sm:grid-cols-2 lg:grid-cols-3",
  itemClassName = "w-[84%]",
}: {
  children: ReactNode;
  gridClassName?: string;
  /** width of one slide on phones */
  itemClassName?: string;
}) {
  const items = Children.toArray(children);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const first = el.firstElementChild as HTMLElement | null;
        if (!first) return;
        const step = first.offsetWidth + 12; // card + gap-3
        setActive(Math.min(items.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [items.length]);

  const goTo = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 16, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={track}
        className={`no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0 sm:gap-4 ${gridClassName}`}
      >
        {items.map((child, i) => (
          <div key={i} className={`shrink-0 snap-start sm:w-auto ${itemClassName}`}>
            {child}
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-center gap-1.5 sm:hidden" aria-hidden="true">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            tabIndex={-1}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-gold-400" : "w-1.5 bg-white/25"}`}
          />
        ))}
      </div>
    </div>
  );
}
