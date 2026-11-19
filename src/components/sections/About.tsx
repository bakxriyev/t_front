"use client";

import Link from "next/link";
import { ArrowUpRight, Compass, Landmark, Star, Target, Trophy, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API, byOrder, isActive, media, pick, toArray, tr, useList, useOne, type About as AboutT, type AboutValue, type Statistic, type TimelineItem } from "@/lib/content";
import { BRANCHES } from "@/lib/constants";
import { BROCHURE_STATS, GALLERY } from "@/lib/brochure";
import { CountUp } from "@/components/ui/CountUp";
import { NamedIcon } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Skeleton } from "@/components/ui/Skeleton";

const STAT_ICONS = [Users, Trophy, Landmark, Star];

/* ------------------------------------------------------------------ Stats */
export function Stats({ overlap = true }: { overlap?: boolean }) {
  const { lang } = useLanguage();
  const { data } = useList<Statistic>(API.stats);
  const api = data.filter(isActive).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const stats = api.length ? api : BROCHURE_STATS;

  return (
    <section className={`relative z-10 ${overlap ? "pt-10 sm:pt-14" : "py-10"}`}>
      <div className="shell">
        <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.slice(0, 4).map((s, i) => {
            const Icon = STAT_ICONS[i % STAT_ICONS.length];
            return (
              <StaggerItem key={s.id}>
                <div className="card card-hover spot flex h-full items-center gap-4 p-4 sm:p-5">
                  <span className="icon-tile relative z-[2] h-11 w-11">
                    {"icon" in s && s.icon ? <NamedIcon name={s.icon} className="relative h-5 w-5" /> : <Icon className="relative h-5 w-5" strokeWidth={1.8} />}
                  </span>
                  <div className="relative z-[2] min-w-0">
                    <p className="num text-2xl font-semibold text-white sm:text-[28px]">
                      <CountUp value={Number(s.value) || 0} suffix={s.suffix ?? ""} />
                    </p>
                    <p className="mt-1 text-[13px] font-medium leading-snug text-ink-muted">{pick(s, "label", lang)}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ About (home + about page) */
export function About({ full = false }: { full?: boolean }) {
  const { lang, t } = useLanguage();
  const { data: about, loading } = useOne<AboutT>(API.about);
  const { data: values } = useList<AboutValue>(API.aboutValues);

  const images = [...toArray(about?.images), ...toArray(about?.image)].filter((v, i, a) => a.indexOf(v) === i);
  const content = pick(about, "content", lang);
  const mission = pick(about, "mission", lang);
  const vision = pick(about, "vision", lang);
  const vals = [...values].sort(byOrder);
  const words = t.about_title.split(" ");

  return (
    <section id="about" className="section">
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-[440px]">
          <div className="ring-grad relative aspect-[5/6] overflow-hidden rounded-[32px] shadow-lift">
            {loading ? (
              <Skeleton className="h-full w-full rounded-none" />
            ) : images[0] ? (
              <SmartImage src={images[0]} alt="Tashkent Law School" className="h-full w-full" sizes="(max-width: 1024px) 90vw, 440px" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={GALLERY[0]} alt="Tashkent Law School" className="h-full w-full object-cover" loading="lazy" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
            <div className="glass absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl p-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-192.png" alt="" className="relative h-11 w-11 rounded-full ring-1 ring-gold-400/40" />
              <div className="relative min-w-0">
                <p className="font-display text-lg font-semibold leading-tight">Tashkent Law School</p>
                <p className="truncate text-xs text-white/65">{BRANCHES.map((b) => tr(b.short, lang)).join(" · ")}</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-3 -top-4 hidden w-36 overflow-hidden rounded-2xl ring-4 ring-night shadow-lift sm:block lg:-right-10">
            {images[1] ? (
              <SmartImage src={images[1]} alt="" className="aspect-square w-full" sizes="144px" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={GALLERY[3]} alt="" className="aspect-square w-full object-cover" loading="lazy" />
            )}
          </div>
          <div className="absolute -left-4 top-10 hidden rounded-2xl bg-grad-gold px-4 py-3 text-wine-950 shadow-gold sm:block lg:-left-10">
            <p className="num text-2xl leading-none">2023</p>
            <p className="mt-1 text-[11px] font-bold">{t.founded_label}</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow={t.about_eyebrow}
            title={<>{words.slice(0, -1).join(" ")} <span className="text-gold-grad">{words.slice(-1)}</span></>}
          />
          {loading ? (
            <div className="-mt-4 space-y-3"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-11/12" /><Skeleton className="h-4 w-2/3" /></div>
          ) : (
            content && (
              <Reveal>
                <p className={`prose-tls -mt-4 whitespace-pre-line ${full ? "" : "line-clamp-5"}`}>{content}</p>
              </Reveal>
            )
          )}

          {(mission || vision) && (
            <Stagger className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { title: t.about_mission, text: mission, Icon: Target },
                { title: t.about_vision, text: vision, Icon: Compass },
              ]
                .filter((x) => x.text)
                .map(({ title, text, Icon }) => (
                  <StaggerItem key={title}>
                    <div className="card card-hover spot h-full p-5">
                      <div className="relative z-[2] flex items-center gap-3">
                        <span className="icon-tile-gold h-10 w-10 rounded-xl"><Icon className="relative h-[18px] w-[18px]" strokeWidth={1.8} /></span>
                        <h3 className="font-display text-xl font-semibold">{title}</h3>
                      </div>
                      <p className={`relative z-[2] mt-3 whitespace-pre-line text-[15px] leading-relaxed text-ink-soft ${full ? "" : "line-clamp-3"}`}>{text}</p>
                    </div>
                  </StaggerItem>
                ))}
            </Stagger>
          )}

          {vals.length > 0 && !full && (
            <Reveal delay={0.08} className="mt-6 flex flex-wrap gap-2">
              {vals.map((v) => (
                <span key={v.id} className="rounded-full border border-white/10 bg-white/[.04] px-3.5 py-1.5 text-sm font-semibold text-gold-200">
                  {pick(v, "title", lang)}
                </span>
              ))}
            </Reveal>
          )}

          {!full && (
            <Reveal delay={0.12}>
              <Link href="/about" className="btn btn-wine group mt-8">
                {t.about_more}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          )}
        </div>
      </div>

      {full && images.length > 2 && (
        <div className="shell mt-14">
          <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {images.slice(2).map((src) => (
              <StaggerItem key={src}>
                <SmartImage src={src} alt="" className="aspect-square w-full rounded-2xl" sizes="(max-width: 768px) 50vw, 25vw" imgClassName="transition-transform duration-700 hover:scale-105" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      )}

      {full && toArray(about?.videos).length > 0 && (
        <div className="shell mt-8 grid gap-3 md:grid-cols-2">
          {toArray(about?.videos).map((v) => (
            <video key={v} src={media(v) || undefined} controls playsInline preload="metadata" className="aspect-video w-full rounded-2xl bg-black object-cover" />
          ))}
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ Values (about page) */
export function Values() {
  const { lang, t } = useLanguage();
  const { data } = useList<AboutValue>(API.aboutValues);
  const vals = [...data].sort(byOrder);
  if (!vals.length) return null;
  const icons = ["ShieldCheck", "Award", "Users", "Sparkles", "Scale", "Landmark"];
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading eyebrow={t.about_values} title={t.about_values} />
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {vals.map((v, i) => (
            <StaggerItem key={v.id}>
              <div className="card card-hover spot h-full p-5">
                <span className="icon-tile relative z-[2] h-11 w-11"><NamedIcon name={icons[i % icons.length]} className="relative h-5 w-5" strokeWidth={1.8} /></span>
                <h3 className="relative z-[2] mt-4 font-display text-xl font-semibold">{pick(v, "title", lang)}</h3>
                <p className="relative z-[2] mt-1.5 text-sm leading-relaxed text-ink-soft">{pick(v, "description", lang)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Timeline (about page) */
export function Timeline() {
  const { lang, t } = useLanguage();
  const { data } = useList<TimelineItem>(API.timeline);
  const items = [...data].sort((a, b) => String(a.year).localeCompare(String(b.year)) || byOrder(a, b));
  if (!items.length) return null;
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading eyebrow={t.about_journey} title={t.about_journey} />
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-gold-400/70 via-wine-500/50 to-transparent sm:left-1/2" />
          <ul className="space-y-8">
            {items.map((it, i) => (
              <Reveal as="li" key={it.id} className="relative grid gap-3 pl-14 sm:grid-cols-2 sm:gap-12 sm:pl-0">
                <span className="absolute left-2.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-grad-gold shadow-gold sm:left-1/2 sm:-translate-x-1/2">
                  <span className="h-2 w-2 rounded-full bg-wine-900" />
                </span>
                <div className={i % 2 ? "sm:order-2 sm:pl-10" : "sm:pr-10 sm:text-right"}>
                  <p className="num text-gold-grad text-3xl font-semibold">{it.year}</p>
                </div>
                <div className={`card rounded-2xl p-5 ${i % 2 ? "sm:order-1 sm:mr-10" : "sm:ml-10"}`}>
                  <h3 className="font-display text-xl font-semibold">{pick(it, "title", lang)}</h3>
                  {pick(it, "description", lang) && <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{pick(it, "description", lang)}</p>}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
