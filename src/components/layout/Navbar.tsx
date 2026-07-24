"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Send, ChevronDown, Scale, GraduationCap, Users, Newspaper, Phone, BookOpen } from "lucide-react";
import { C } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useApiSingle } from "@/hooks/useApiData";
import { getImageUrl } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#home", key: "home", icon: Scale },
  { href: "/#about", key: "about", icon: BookOpen },
  { href: "/#courses", key: "courses", icon: GraduationCap },
  { href: "/#teachers", key: "teachers", icon: Users },
  { href: "/#news", key: "news", icon: Newspaper },
  { href: "/#contact", key: "contact", icon: Phone },
] as const;

const MORE_LINKS = [
  { href: "/#learning-center", key: "learning" },
  { href: "/#results", key: "results" },
  { href: "/#testimonials", key: "testimonials" },
  { href: "/#team", key: "team" },
  { href: "/#vacancies", key: "vacancies" },
  { href: "/#faq", key: "faq" },
] as const;

const LANGS = ["EN", "RU", "UZ"] as const;

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { data: settings } = useApiSingle<{ logo?: string; phone?: string }>('/api/settings');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-2 md:pt-3">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div
          className="w-full flex items-center justify-between px-3 md:px-5 py-2 md:py-2.5 rounded-xl md:rounded-2xl transition-all duration-500"
          style={{
            background: scrolled
              ? "linear-gradient(135deg, rgba(8,8,8,0.96), rgba(18,12,12,0.97))"
              : "linear-gradient(135deg, rgba(8,8,8,0.92), rgba(18,12,12,0.94))",
            backdropFilter: "blur(28px) saturate(1.5)",
            WebkitBackdropFilter: "blur(28px) saturate(1.5)",
            border: `1px solid ${scrolled ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.05)"}`,
            boxShadow: scrolled
              ? "0 6px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.06) inset"
              : "0 2px 16px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.03) inset",
          }}
        >
          {/* Logo */}
          <Link href="/#home" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="relative w-7 h-7 md:w-9 md:h-9 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105" style={{ boxShadow: "0 3px 12px rgba(139,58,58,0.5)" }}>
              <Image
                src={getImageUrl(settings?.logo)}
                alt="Tashkent Law School"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div className="block">
              <div className="font-bold text-[11px] md:text-sm leading-tight font-serif" style={{ color: C.white }}>Tashkent</div>
              <div className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase leading-tight font-semibold" style={{ color: C.gold }}>Law School</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 hover:bg-white/[0.04]"
                  style={{ color: "#999" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.gold)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
                >
                  <Icon className="w-3 h-3" />
                  {t[link.key]}
                </Link>
              );
            })}
            {/* More dropdown */}
            <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
              <button
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-colors"
                style={{ color: moreOpen ? C.gold : "#999" }}
              >
                More <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    className="absolute top-full right-0 mt-1.5 p-1.5 rounded-xl min-w-[160px]"
                    style={{
                      background: "rgba(12,12,12,0.97)",
                      backdropFilter: "blur(24px)",
                      border: `1px solid rgba(212,175,55,0.12)`,
                      boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
                    }}
                  >
                    {MORE_LINKS.map((link) => (
                      <Link
                        key={link.key}
                        href={link.href}
                        className="block px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all hover:bg-white/[0.04]"
                        style={{ color: "#888" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = C.gold)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                      >
                        {t[link.key]}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-1.5 md:gap-2.5">
            <div className="hidden md:flex items-center gap-1">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full text-[9px] md:text-[10px] font-bold transition-all duration-200"
                  style={{
                    color: lang === l ? C.gold : "#555",
                    background: lang === l ? "rgba(212,175,55,0.12)" : "transparent",
                    border: `1px solid ${lang === l ? "rgba(212,175,55,0.3)" : "transparent"}`,
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            {settings?.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg text-[11px] font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ color: C.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.gold)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
              >
                <Phone className="w-2.5 h-2.5" />
                {settings.phone}
              </a>
            )}

            <a
              href="https://t.me/tashkentlawschool"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg text-[11px] font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #1E8AB8, #229ED9)", color: C.white, boxShadow: "0 3px 12px rgba(34,158,217,0.3)" }}
            >
              <Send className="w-2.5 h-2.5" />
            </a>

            <Link
              href="/#contact"
              className="flex items-center gap-1 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-[11px] font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: C.btnGrad, color: C.white, boxShadow: "0 3px 0 #781020, 0 4px 16px rgba(167,25,48,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset" }}
            >
              {t.apply}
            </Link>

            <button
                className="lg:hidden w-7 h-7 md:w-7 md:h-7 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.05)", color: "#999" }}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
              </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="lg:hidden fixed top-0 right-0 h-full z-50 w-[320px] overflow-y-auto"
            style={{ background: "rgba(10,10,10,0.98)", backdropFilter: "blur(24px)", borderLeft: `1px solid rgba(212,175,55,0.12)` }}
          >
            <div className="p-6 pt-14">
              <div className="flex items-center gap-4 mb-8 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="relative w-12 h-12 rounded-xl overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(139,58,58,0.5)" }}>
                  <Image src={getImageUrl(settings?.logo)} alt="Tashkent Law School" fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <div className="font-bold text-base font-serif" style={{ color: C.white }}>Tashkent</div>
                  <div className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: C.gold }}>Law School</div>
                </div>
              </div>

              <div className="space-y-0.5 mb-8">
                {[...NAV_LINKS, ...MORE_LINKS].map((link) => {
                  const Icon = "icon" in link ? link.icon : Scale;
                  return (
                    <Link
                      key={link.key}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-semibold transition-all"
                      style={{ color: "#999" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = C.gold; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#999"; }}
                    >
                      {"icon" in link && <Icon className="w-4 h-4" />}
                      {t[link.key]}
                    </Link>
                  );
                })}
              </div>

              <div className="flex gap-2 mb-6">
                {LANGS.map((l) => (
                  <button key={l} onClick={() => setLang(l)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all"
                    style={{ color: lang === l ? C.gold : "#888", background: lang === l ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${lang === l ? "rgba(212,175,55,0.3)" : "transparent"}` }}>
                    {l}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <a href="https://t.me/tashkentlawschool" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95"
                  style={{ background: "linear-gradient(135deg, #1E8AB8, #229ED9)", color: C.white, boxShadow: "0 4px 16px rgba(34,158,217,0.3)" }}>
                  <Send className="w-3.5 h-3.5" /> {t.telegram}
                </a>
                <Link href="/#contact" onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center py-3 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] active:scale-95"
                  style={{ background: C.btnGrad, color: C.white, boxShadow: C.btnShadow }}>
                  {t.apply}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
