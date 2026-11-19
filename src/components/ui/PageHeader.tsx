"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PageHeader({ title, sub, crumbs = [], children }: { title: ReactNode; sub?: ReactNode; crumbs?: { label: string; href?: string }[]; children?: ReactNode }) {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden pb-12 pt-36 text-white sm:pb-16 sm:pt-44">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/hero-poster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-night via-wine-950/75 to-night/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/40" />
      <div className="shell relative">
        <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/55">
          <Link href="/" className="hover:text-gold-300">{t.page_home}</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5" />
              {c.href ? <Link href={c.href} className="hover:text-gold-300">{c.label}</Link> : <span className="text-white/85">{c.label}</span>}
            </span>
          ))}
        </motion.nav>
        <motion.h1 initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }} className="h2 mt-6 max-w-4xl text-balance !text-[clamp(2.4rem,5.5vw,4.5rem)]">
          {title}
        </motion.h1>
        {sub && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.2 }} className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            {sub}
          </motion.p>
        )}
        {children && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.3 }} className="mt-8">{children}</motion.div>}
      </div>
    </section>
  );
}
