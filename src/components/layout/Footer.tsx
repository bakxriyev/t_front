"use client";

import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BRANCHES, CONTACT } from "@/lib/constants";
import { API, byOrder, isActive, phoneHref, pick, prettyPhone, tr, useList, useOne, type Course, type Settings, type SocialLink } from "@/lib/content";
import { SocialIcon } from "@/components/ui/Icons";
import { NAV, useSectionNav } from "./Navbar";
import { Marquee } from "@/components/ui/Marquee";

/** Socials from the admin panel, merged with the official branch accounts (deduplicated by URL). */
export function useSocials() {
  const { data } = useList<SocialLink>(API.social);
  const fromApi = data.filter(isActive).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((s) => ({ platform: s.platform, url: s.url }));
  const defaults = [
    { platform: "Instagram", url: CONTACT.instagram },
    { platform: "Telegram", url: CONTACT.telegramChannel },
  ];
  const norm = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "").toLowerCase();
  const seen = new Set<string>();
  return [...fromApi, ...defaults].filter((s) => {
    const k = norm(s.url);
    if (!s.url || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function Footer() {
  const { lang, t } = useLanguage();
  const go = useSectionNav();
  const { data: settings } = useOne<Settings>(API.settings);
  const socials = useSocials();
  const { data: courseList } = useList<Course>(API.courses);
  const courses = courseList.filter(isActive).sort(byOrder);
  const phone = prettyPhone(settings?.phone) || CONTACT.phone;
  const email = settings?.email?.trim();
  const hours = pick(settings, "working_hours", lang);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[.08] text-white">

      <div className="relative border-b border-white/10 py-4 sm:py-6">
        <Marquee speed={55}>
          {["Tashkent Law School", "Huquq · Право · Law", "TDYU · HMQA · JIDU", "Chilonzor · Yunusobod · Xorazm"].map((s) => (
            <span key={s} className="flex items-center gap-10 font-display text-2xl font-black uppercase tracking-tight text-white/[.08] sm:text-6xl">
              {s}
              <span className="h-2.5 w-2.5 rotate-45 bg-gold-500/60" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="shell relative grid grid-cols-2 gap-x-5 gap-y-9 py-10 sm:gap-x-8 sm:gap-y-12 sm:py-14 lg:grid-cols-12 lg:py-20">
        <div className="col-span-2 lg:col-span-4">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-192.png" alt="Tashkent Law School" className="h-12 w-12 rounded-full ring-1 ring-gold-400/40 sm:h-14 sm:w-14" />
            <span className="leading-none">
              <span className="block font-display text-2xl font-bold">Tashkent Law</span>
              <span className="mt-1 block font-accent text-[9px] font-medium uppercase tracking-[0.42em] text-gold-300">School</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-white/60 sm:mt-6 sm:text-[15px]">{t.footer_tagline}</p>
          <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-7">
            {socials.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.platform}
                className="btn-glass flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-1"
              >
                <SocialIcon platform={`${s.platform} ${s.url}`} className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <h3 className="font-accent text-[10px] font-medium uppercase tracking-[0.24em] text-gold-300">{t.footer_nav}</h3>
          <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`/#${n.id}`} onClick={(e) => { e.preventDefault(); go(n.id); }} className="text-[14px] text-white/65 transition-colors hover:text-white sm:text-[15px]">
                  {t[n.key]}
                </a>
              </li>
            ))}
            <li><Link href="/contact" className="text-[14px] sm:text-[15px] text-white/65 transition-colors hover:text-white">{t.nav_contact}</Link></li>
          </ul>
        </div>

        <div className="order-last col-span-2 lg:order-none lg:col-span-3">
          <h3 className="font-accent text-[10px] font-medium uppercase tracking-[0.24em] text-gold-300">{t.footer_branches}</h3>
          <ul className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-1">
            {BRANCHES.map((b) => (
              <li key={b.id}>
                <a href={b.mapLink} target="_blank" rel="noopener noreferrer" className="group flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  <span>
                    <span className="flex items-center gap-1 text-[14px] font-semibold text-white group-hover:text-gold-300 sm:text-[15px]">
                      {tr(b.name, lang)}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-white/50 sm:text-sm">{tr(b.address, lang)}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 lg:col-span-3">
          <h3 className="font-accent text-[10px] font-medium uppercase tracking-[0.24em] text-gold-300">{t.footer_contacts}</h3>
          <ul className="mt-4 space-y-3 text-[13.5px] sm:mt-5 sm:space-y-4 sm:text-[15px]">
            <li>
              <a href={`tel:${phoneHref(phone)}`} className="flex items-center gap-2.5 whitespace-nowrap font-semibold text-white hover:text-gold-300 sm:gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold-400" />{phone}
              </a>
            </li>
            {phone.replace(/\D/g, "") !== CONTACT.phoneHref.replace(/\D/g, "") && (
              <li>
                <a href={`tel:${CONTACT.phoneHref}`} className="flex items-center gap-2.5 whitespace-nowrap font-semibold text-white hover:text-gold-300 sm:gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-gold-400" />{CONTACT.phone}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`} className="flex items-center gap-2.5 break-all text-white/70 hover:text-white sm:gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-gold-400" />{email}
                </a>
              </li>
            )}
            {hours && (
              <li className="flex items-start gap-2.5 text-white/70 sm:items-center sm:gap-3">
                <Clock className="h-4 w-4 shrink-0 text-gold-400" />{hours}
              </li>
            )}
          </ul>
          <a href={CONTACT.telegramAdmin} target="_blank" rel="noopener noreferrer" className="btn btn-glass btn-sm mt-5 w-full max-w-full justify-center whitespace-nowrap !px-3 text-[13px] sm:mt-6 sm:w-auto sm:!px-5 sm:text-sm">
            <SocialIcon platform="telegram" className="h-4 w-4 shrink-0" />
            {t.cta_write}
          </a>
        </div>
      </div>

      {/* Courses + short description — real, visible text for search engines */}
      <div className="relative border-t border-white/10">
        <div className="shell py-6 sm:py-7">
          {courses.length > 0 && (
            <nav aria-label={t.nav_courses} className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-accent text-[10px] font-medium uppercase tracking-[0.24em] text-gold-300">{t.nav_courses}</span>
              {courses.map((c) => (
                <Link
                  key={c.id}
                  href={`/courses/${c.id}`}
                  className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-[12.5px] text-white/70 transition-colors hover:border-gold-400/40 hover:text-white"
                >
                  {pick(c, "title", lang).replace(/[;,.\s]+$/, "")}
                </Link>
              ))}
            </nav>
          )}
          <p className="mt-4 max-w-5xl text-[12px] leading-relaxed text-white/40">{t.footer_seo}</p>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-[13px] text-white/45 sm:text-sm md:flex-row">
          <p className="text-center md:text-left">© {year} Tashkent Law School. {t.footer_rights}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
            <Link href="/privacy" className="hover:text-white">{t.footer_privacy}</Link>
            <Link href="/terms" className="hover:text-white">{t.footer_terms}</Link>
            <Link href="/cookies" className="hover:text-white">{t.footer_cookies}</Link>
          </div>
        </div>
        <div className="shell pb-5 text-center">
          <a
            href="https://t.me/bakxriyevvv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] text-white/35 transition-colors hover:text-white/70"
          >
            Created by
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/itzone-logo.png" alt="ITZONE" className="h-4 w-auto opacity-80" />
            <span className="font-semibold uppercase tracking-wider text-[#e38e06]/80">IT Company</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
