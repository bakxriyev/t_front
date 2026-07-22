"use client";
import Link from "next/link";
import Image from "next/image";
import { Scale, MessageCircle, Instagram, Facebook, Youtube, Linkedin, Phone, Mail, MapPin, Send } from "lucide-react";
import { C } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApiData, useApiSingle } from "@/hooks/useApiData";
import { getImageUrl } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const QUICK_LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#courses", label: "Courses" },
  { href: "/#teachers", label: "Teachers" },
  { href: "/#news", label: "News" },
  { href: "/#results", label: "Results" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  telegram: MessageCircle,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
};

export function Footer() {
  const { lang } = useLanguage();
  const { data: settings } = useApiSingle<{ logo?: string; phone?: string; email?: string; address?: string }>('/api/settings');
  const { data: socialLinks } = useApiData<{ id: number; platform: string; url: string }>('/api/social-links');
  const { data: courseOffers } = useApiData<{ id: number; title_uz: string; title_ru: string; title_en: string }>('/api/courses/offers');

  const suffix = lang.toLowerCase();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* 4-COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(139,58,58,0.5)" }}>
                <Image src={getImageUrl(settings?.logo)} alt="Tashkent Law School" fill className="object-cover" sizes="40px" />
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className="text-lg font-bold tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif", color: C.white }}
                >
                  Tashkent
                </span>
                <span
                  className="text-[10px] tracking-[0.28em] uppercase font-sans"
                  style={{ color: C.gold }}
                >
                  Law School
                </span>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-6 font-sans"
              style={{ color: C.muted }}
            >
              A premier legal education institution dedicated to shaping the next generation of
              legal professionals through academic excellence, practical training, and
              ethical values.
            </p>
            <div className="flex items-center gap-2.5">
              {(socialLinks ?? []).map((social) => {
                const key = social.platform?.toLowerCase();
                const Icon = SOCIAL_ICONS[key] || MessageCircle;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: "rgba(236,198,103,0.06)",
                      border: `1px solid rgba(236,198,103,0.12)`,
                      color: C.muted,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = C.gold;
                      e.currentTarget.style.background = "rgba(236,198,103,0.15)";
                      e.currentTarget.style.borderColor = C.gold;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = C.muted;
                      e.currentTarget.style.background = "rgba(236,198,103,0.06)";
                      e.currentTarget.style.borderColor = "rgba(236,198,103,0.12)";
                    }}
                    aria-label={social.platform}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4
              className="text-base font-bold mb-5 font-sans"
              style={{ color: C.gold }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans transition-colors duration-200 hover:translate-x-1 inline-block"
                    style={{ color: C.muted }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = C.gold;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = C.muted;
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COURSES */}
          <div>
            <h4
              className="text-base font-bold mb-5 font-sans"
              style={{ color: C.gold }}
            >
              Our Courses
            </h4>
            <ul className="space-y-2.5">
              {(courseOffers ?? []).map((course) => {
                const title = course[`title_${suffix}` as keyof typeof course] || course.title_en;
                return (
                  <li key={course.id}>
                    <Link
                      href="/#courses"
                      className="text-sm font-sans transition-colors duration-200 hover:translate-x-1 inline-block"
                      style={{ color: C.muted }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = C.gold;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = C.muted;
                      }}
                    >
                      {title as string}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* STAY UPDATED */}
          <div>
            <h4
              className="text-base font-bold mb-5 font-sans"
              style={{ color: C.gold }}
            >
              Stay Updated
            </h4>
            <div className="flex gap-2 mb-5">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-sans outline-none transition-all duration-300"
                style={{
                  background: "#0F0F0F",
                  border: `1px solid ${C.border}`,
                  color: C.white,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = C.gold;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                }}
              />
              <button
                className="px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: C.btnGrad, color: C.bg, boxShadow: C.btnShadow }}
                onClick={() => {
                  const input = document.querySelector<HTMLInputElement>('input[type="email"]');
                  if (input?.value) {
                    window.open(
                      `https://t.me/tashkentlawschool?text=${encodeURIComponent("Newsletter subscription: " + input.value)}`,
                      "_blank"
                    );
                  }
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 shrink-0 mt-0.5" style={{ color: C.gold }} />
                <a
                  href={`tel:${settings?.phone || ''}`}
                  className="text-sm font-sans transition-colors duration-200"
                  style={{ color: C.muted }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = C.gold; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; }}
                >
                  {settings?.phone || '+998 (71) 234-56-78'}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 shrink-0 mt-0.5" style={{ color: C.gold }} />
                <a
                  href={`mailto:${settings?.email || ''}`}
                  className="text-sm font-sans transition-colors duration-200"
                  style={{ color: C.muted }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = C.gold; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; }}
                >
                  {settings?.email || 'info@tashkentlawschool.uz'}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: C.gold }} />
                <span className="text-sm font-sans" style={{ color: C.muted }}>
                  {settings?.address || 'Amir Temur Avenue 100, Tashkent, Uzbekistan'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="pt-7 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans"
          style={{ borderTop: `1px solid rgba(255,255,255,0.06)`, color: C.muted }}
        >
          <p>
            &copy; {new Date().getFullYear()} Tashkent Law School. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="transition-colors duration-200"
              onMouseEnter={(e) => { e.currentTarget.style.color = C.gold; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors duration-200"
              onMouseEnter={(e) => { e.currentTarget.style.color = C.gold; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; }}
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="transition-colors duration-200"
              onMouseEnter={(e) => { e.currentTarget.style.color = C.gold; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; }}
            >
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* CREATED BY */}
        <div className="pt-4 flex items-center justify-center gap-2 text-[10px] font-sans tracking-wide" style={{ color: C.muted }}>
          <span>Created by</span>
          <a
            href="https://t.me/bakxriyevvv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-all duration-300 hover:scale-105"
            style={{ color: C.gold }}
          >
            <div className="relative w-4 h-4 rounded-full overflow-hidden flex-shrink-0" style={{ boxShadow: `0 0 8px rgba(212,175,55,0.25)` }}>
              <Image src="/images/itzone.png" alt="ITZone" fill className="object-cover" sizes="16px" />
            </div>
            <span className="font-semibold tracking-wider">ITZONE</span>
          </a>
          <span style={{ color: 'rgba(155,155,155,0.4)' }}>•</span>
          <a
            href="https://t.me/bakxriyevvv"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:underline"
            style={{ color: 'rgba(155,155,155,0.7)' }}
          >
            @bakxriyevvv
          </a>
        </div>
      </div>
    </footer>
  );
}
