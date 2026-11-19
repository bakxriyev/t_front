"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

const NAV_OFFSET = -88;

/** Scrolls to an element id with Lenis when available, native smooth scroll otherwise. */
export function scrollToId(id: string, lenis: Lenis | null, immediate = false) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.4, immediate, force: true });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET, behavior: immediate ? "auto" : "smooth" });
  return true;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Lerp-based smoothing: cheap per frame and never "lags behind" the wheel.
    // Touch devices keep native momentum scrolling (smoother and lighter on phones).
    const l = new Lenis({ lerp: 0.11, smoothWheel: true, wheelMultiplier: 1 });
    const loop = (time: number) => {
      l.raf(time);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    setLenis(l);
    if (process.env.NODE_ENV !== "production") (window as unknown as { __lenis?: Lenis }).__lenis = l;
    return () => {
      cancelAnimationFrame(rafRef.current);
      l.destroy();
      setLenis(null);
    };
  }, []);

  // Route change: jump to top, or to the #hash once content has rendered.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      const top = () => (lenis ? lenis.scrollTo(0, { immediate: true, force: true }) : window.scrollTo(0, 0));
      top();
      const raf = requestAnimationFrame(top);
      const t = window.setTimeout(top, 80);
      return () => { cancelAnimationFrame(raf); window.clearTimeout(t); };
    }
    // Wait briefly for API content to render (it changes section offsets), then glide there
    // and correct once more after late-loading images/data settle.
    let tries = 0;
    let fix = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      const el = document.getElementById(hash);
      if ((el && tries >= 5) || tries > 30) {
        window.clearInterval(timer);
        if (!el) return;
        scrollToId(hash, lenis);
        fix = window.setTimeout(() => {
          if (Math.abs(el.getBoundingClientRect().top + NAV_OFFSET) > 16) scrollToId(hash, lenis, true);
        }, 1700);
      }
    }, 120);
    return () => { window.clearInterval(timer); window.clearTimeout(fix); };
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
