"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { BROCHURE_ADVANTAGES } from "@/lib/brochure";
import { tr } from "@/lib/content";
import { NamedIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SnapCarousel } from "@/components/ui/SnapCarousel";

/** Large corner artwork per advantage (icon names map to lucide icons). */
const ART: Record<string, string> = {
  ShieldCheck: "ShieldCheck",
  Users: "Users",
  TrendingUp: "TrendingUp",
  Briefcase: "GraduationCap",
  CalendarClock: "CalendarClock",
  Library: "book",
  Timer: "Timer",
  Landmark: "Gavel",
  MapPinned: "MapPinned",
};

function CornerArt({ icon, gold }: { icon: string; gold: boolean }) {
  const art = ART[icon] ?? icon;
  if (art === "book") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/pdf/books/huquq9.webp"
        alt=""
        loading="lazy"
        className="pointer-events-none absolute bottom-3 right-5 w-[34%] max-w-[136px] rotate-[8deg] rounded-[6px] shadow-[0_26px_44px_-12px_rgba(0,0,0,.95)] ring-1 ring-white/10 transition-transform duration-700 ease-silk group-hover:-translate-y-3 group-hover:rotate-[3deg] group-hover:scale-105"
      />
    );
  }
  return (
    <span
      className={`pointer-events-none absolute -bottom-5 -right-5 flex h-[120px] w-[120px] rotate-[-12deg] items-center justify-center rounded-[30px] transition-transform duration-700 ease-silk group-hover:-translate-y-2 group-hover:rotate-[-4deg] group-hover:scale-105 ${
        gold
          ? "bg-[linear-gradient(140deg,#fce9a8,#e3a92b_55%,#9e6512)] text-wine-900 shadow-[0_24px_40px_-14px_rgba(227,169,43,.7)]"
          : "bg-[linear-gradient(140deg,#d6403f,#8f1a1f_55%,#3a0a0e)] text-white shadow-[0_24px_40px_-14px_rgba(178,40,44,.85)]"
      }`}
    >
      <span className="absolute inset-0 rounded-[30px] bg-gradient-to-b from-white/30 to-transparent [mask-image:linear-gradient(180deg,#000,transparent_55%)]" />
      <NamedIcon name={art} className="relative h-14 w-14 drop-shadow" strokeWidth={1.6} />
    </span>
  );
}

export function Advantages() {
  const { lang, t } = useLanguage();

  return (
    <section id="advantages" className="section">
      <div className="shell">
        <SectionHeading eyebrow={t.adv_eyebrow} title={<span className="text-headline">{t.adv_title}</span>} sub={t.adv_sub} />

        {/* Phones: swipe carousel · tablets/desktop: 2–3 column grid */}
        <Reveal>
          <SnapCarousel gridClassName="sm:grid-cols-2 lg:grid-cols-3">
            {BROCHURE_ADVANTAGES.map((a, i) => (
              <div key={a.icon} className="card card-hover spot group relative h-full min-h-[210px] overflow-hidden p-5 sm:p-6">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(178,40,44,.22),transparent_70%)]" />
                <CornerArt icon={a.icon} gold={i % 2 === 1} />
                <div className="relative z-[2] max-w-[66%]">
                  <span className="num inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 px-2 text-xs text-gold-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-[21px] font-extrabold leading-tight tracking-tight text-white">{tr(a.title, lang)}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{tr(a.text, lang)}</p>
                </div>
              </div>
            ))}
          </SnapCarousel>
        </Reveal>
      </div>
    </section>
  );
}
