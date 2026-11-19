"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGS, CONTACT, type Dict } from "@/lib/constants";
import { useEnroll } from "@/components/providers/EnrollProvider";
import { scrollToId, useLenis } from "@/components/providers/SmoothScroll";
import { API, phoneHref as toHref, prettyPhone, useOne, type Settings } from "@/lib/content";

type NavItem = { id: string; key: keyof Dict };
export const NAV: NavItem[] = [
  { id: "advantages", key: "nav_about" },
  { id: "courses", key: "nav_courses" },
  { id: "teachers", key: "nav_teachers" },
  { id: "results", key: "nav_results" },
  { id: "branches", key: "nav_branches" },
  { id: "news", key: "nav_news" },
  { id: "faq", key: "nav_faq" },
];

/** Navigates to a home-page section; smooth-scrolls in place when already on "/". */
export function useSectionNav() {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  return (id: string) => {
    if (pathname === "/") {
      if (scrollToId(id, lenis)) history.replaceState(null, "", `#${id}`);
    } else {
      router.push(`/#${id}`);
    }
  };
}

function LangSwitch() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex h-10 items-center gap-1.5 rounded-full px-3 text-[13px] font-bold tracking-wide transition-colors duration-300 text-white hover:bg-white/10`}
      >
        {lang}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="glass-nav absolute right-0 top-12 w-40 overflow-hidden rounded-2xl p-1.5"
          >
            {LANGS.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l === lang}
                  onClick={() => { setLang(l); setOpen(false); }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${l === lang ? "bg-grad-wine text-white" : "text-ink-soft hover:bg-white/[.06] hover:text-white"}`}
                >
                  {l === "UZ" ? "O‘zbekcha" : l === "RU" ? "Русский" : "English"}
                  <span className="text-[11px] opacity-60">{l}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const { open: openEnroll } = useEnroll();
  const go = useSectionNav();
  const { data: settings } = useOne<Settings>(API.settings);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [active, setActive] = useState<string>("");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 500 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    if (pathname !== "/") { setActive(""); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const t = window.setTimeout(() => NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); }), 600);
    return () => { window.clearTimeout(t); io.disconnect(); };
  }, [pathname]);

  useEffect(() => setMobile(false), [pathname]);

  const phone = prettyPhone(settings?.phone) || CONTACT.phone;
  const phoneHref = toHref(phone);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden && !mobile ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          className={`mx-auto flex h-[64px] max-w-[1320px] items-center justify-between gap-3 rounded-full pl-2.5 pr-2.5 transition-all duration-500 ease-silk sm:pl-3 ${
            scrolled ? "glass-nav" : "glass-blur"
          }`}
          aria-label="Main"
        >
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Tashkent Law School">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-192.png" alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-full shadow-md ring-1 ring-gold-400/40" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[19px] font-bold text-white">Tashkent Law</span>
              <span className="mt-1 font-accent text-[8px] font-medium uppercase tracking-[0.42em] text-gold-300">School</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV.map((n) => {
              const isActive = active === n.id;
              return (
                <li key={n.id}>
                  <a
                    href={`/#${n.id}`}
                    onClick={(e) => { e.preventDefault(); go(n.id); }}
                    className={`relative rounded-full px-3.5 py-2 text-[14px] font-semibold transition-colors duration-300 ${
                      "text-white/80 hover:text-white"
                    } ${isActive ? "!text-gold-200" : ""}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {t[n.key]}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${phoneHref}`}
              className="num hidden h-10 items-center gap-2 rounded-full px-3 text-[12px] font-medium text-white transition-colors hover:bg-white/10 hover:text-gold-200 lg:flex"
            >
              <Phone className="h-4 w-4" />
              {phone}
            </a>
            <LangSwitch />
            <button type="button" onClick={() => openEnroll()} className="btn btn-gold btn-sm hidden sm:inline-flex">
              {t.cta_enroll}
            </button>
            <button
              type="button"
              onClick={() => setMobile(true)}
              aria-label={t.menu}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-grad-wine text-white xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobile && (
          <motion.div
            className="fixed inset-0 z-[60] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-night/60 backdrop-blur-md" onClick={() => setMobile(false)} />
            <motion.aside
              data-lenis-prevent
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="bg-night-grad absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto p-6 text-white"
            >
              <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
              <div className="relative flex items-center justify-between">
                <span className="font-display text-xl font-semibold">Tashkent Law School</span>
                <button type="button" onClick={() => setMobile(false)} aria-label={t.close} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <motion.ul
                className="relative mt-10 space-y-1"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
              >
                {NAV.map((n) => (
                  <motion.li key={n.id} variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}>
                    <a
                      href={`/#${n.id}`}
                      onClick={(e) => { e.preventDefault(); setMobile(false); window.setTimeout(() => go(n.id), 350); }}
                      className="group flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl font-medium transition-colors hover:bg-white/5"
                    >
                      {t[n.key]}
                      <ArrowRight className="h-5 w-5 -translate-x-2 text-gold-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="relative mt-auto space-y-3 pt-10">
                <a href={`tel:${phoneHref}`} className="btn btn-glass w-full"><Phone className="h-4 w-4" />{phone}</a>
                <button type="button" onClick={() => { setMobile(false); openEnroll(); }} className="btn btn-gold w-full">
                  {t.cta_enroll}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
