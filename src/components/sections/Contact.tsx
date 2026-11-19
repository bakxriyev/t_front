"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API, phoneHref, pick, prettyPhone, useOne, type Settings } from "@/lib/content";
import { CONTACT } from "@/lib/constants";
import { LeadForm } from "@/components/ui/LeadForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/Icons";
import { useSocials } from "@/components/layout/Footer";

export function Contact() {
  const { lang, t } = useLanguage();
  const { data: s } = useOne<Settings>(API.settings);
  const socials = useSocials();
  const phone = prettyPhone(s?.phone) || CONTACT.phone;
  const address = pick(s, "address", lang);
  const hours = pick(s, "working_hours", lang);

  const rows = [
    { Icon: Phone, label: t.contact_phone, value: phone, href: `tel:${phoneHref(phone)}` },
    s?.email ? { Icon: Mail, label: t.contact_email, value: s.email, href: `mailto:${s.email}` } : null,
    address ? { Icon: MapPin, label: t.branch_address, value: address, href: undefined } : null,
    hours ? { Icon: Clock, label: t.contact_hours, value: hours, href: undefined } : null,
  ].filter(Boolean) as { Icon: typeof Phone; label: string; value: string; href?: string }[];

  return (
    <section id="contact" className="section overflow-hidden">

      <div className="shell relative grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading align="left" eyebrow={t.contact_eyebrow} title={<span className="text-headline">{t.welcome_title}</span>} sub={<><span className="font-bold text-white">{t.welcome_sub}.</span> {t.contact_sub}</>} />
          <Reveal delay={0.1} className="grid gap-3 sm:grid-cols-2">
            {rows.map(({ Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="icon-tile-gold relative z-[2] h-10 w-10 rounded-xl"><Icon className="relative h-[18px] w-[18px]" /></span>
                  <span className="relative z-[2] min-w-0">
                    <span className="block font-accent text-[9px] font-medium uppercase tracking-[0.18em] text-white/45">{label}</span>
                    <span className="mt-0.5 block truncate font-semibold">{value}</span>
                  </span>
                </>
              );
              const wide = value.length > 22 ? "sm:col-span-2" : "";
              return href ? (
                <a key={label} href={href} className={`card card-hover spot flex items-center gap-3.5 rounded-2xl p-3.5 ${wide}`}>{inner}</a>
              ) : (
                <div key={label} className={`card flex items-center gap-3.5 rounded-2xl p-3.5 ${wide}`}>{inner}</div>
              );
            })}
          </Reveal>
          {socials.length > 0 && (
            <Reveal delay={0.15} className="mt-8">
              <p className="font-accent text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">{t.contact_social}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map((so) => (
                  <a key={so.url} href={so.url} target="_blank" rel="noopener noreferrer" className="btn btn-glass btn-sm capitalize">
                    <SocialIcon platform={`${so.platform} ${so.url}`} className="h-4 w-4" />
                    {so.platform}
                  </a>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} className="relative">
          {/* 3D crest from the brochure */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/pdf/shield-3d.webp"
            alt=""
            loading="lazy"
            className="pointer-events-none absolute -right-24 -top-28 hidden w-[340px] opacity-90 [mask-image:radial-gradient(closest-side,#000_62%,transparent)] xl:block"
          />
          <div className="card ring-grad relative rounded-[28px] bg-[#140c0e]/90 p-5 sm:p-8">
            <div className="relative z-[2]">
              <LeadForm dark withQuestion source="contact-section" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
