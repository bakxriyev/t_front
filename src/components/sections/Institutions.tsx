"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { INSTITUTIONS, type Institution } from "@/lib/brochure";
import { tr } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Emblem({ u }: { u: Institution }) {
  const { lang } = useLanguage();
  return (
    <div className="group flex flex-col items-center text-center" title={tr(u.name, lang)}>
      <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
        <span className="absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(240,192,82,.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={u.img}
          alt={tr(u.name, lang)}
          loading="lazy"
          className="relative h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,.6)] transition-transform duration-500 ease-silk group-hover:-translate-y-1.5 group-hover:scale-110"
        />
      </div>
      <p className="mt-3 font-display text-base font-extrabold text-white">{u.short}</p>
      <p className="mt-0.5 max-w-[150px] text-[12px] leading-snug text-ink-muted">{tr(u.name, lang)}</p>
    </div>
  );
}

export function Institutions() {
  const { t } = useLanguage();
  const study = INSTITUTIONS.filter((u) => u.kind === "study");
  const work = INSTITUTIONS.filter((u) => u.kind === "work");

  const panels = [
    { title: t.inst_study, sub: t.inst_study_sub, Icon: GraduationCap, list: study, cols: "grid-cols-3", span: "lg:col-span-2" },
    { title: t.inst_work, sub: t.inst_work_sub, Icon: Briefcase, list: work, cols: "grid-cols-3 sm:grid-cols-5", span: "lg:col-span-3" },
  ];

  return (
    <section id="institutions" className="section">
      <div className="shell">
        <SectionHeading eyebrow={t.inst_eyebrow} title={<span className="text-headline">{t.inst_title}</span>} sub={t.inst_sub} />
        <div className="grid gap-4 lg:grid-cols-5">
          {panels.map(({ title, sub, Icon, list, cols, span }, i) => (
            <Reveal key={title} delay={i * 0.1} className={span}>
              <div className="card ring-grad h-full p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className={`${i ? "icon-tile" : "icon-tile-gold"} h-11 w-11 rounded-xl`}><Icon className="relative h-5 w-5" /></span>
                  <div>
                    <p className="font-display text-xl font-black text-white">{title}</p>
                    <p className="text-xs font-semibold text-ink-muted">{sub}</p>
                  </div>
                </div>
                <Stagger className={`mt-7 grid gap-x-2 gap-y-6 ${cols}`}>
                  {list.map((u) => (
                    <StaggerItem key={u.key}><Emblem u={u} /></StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
