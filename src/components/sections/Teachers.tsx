"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, GraduationCap, Mail, Phone, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API, byOrder, fullName, isActive, phoneHref, pick, prettyPhone, tr, useList, type Teacher, type TeamMember } from "@/lib/content";
import { BROCHURE_TEACHERS, SUBJECTS, type BrochureTeacher, type Subject } from "@/lib/brochure";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Modal } from "@/components/ui/Modal";
import { Tilt } from "@/components/ui/Tilt";
import { Marquee } from "@/components/ui/Marquee";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

type Person = Teacher | TeamMember;
type Item = { key: string; subject: Subject | "other"; brochure?: BrochureTeacher; api?: Person };

const norm = (s: string) => s.toLowerCase().replace(/[^a-zа-яё]/gi, "");

function guessSubject(text: string): Subject | "other" {
  if (/yevro|европ|euro/i.test(text)) return "eulaw";
  if (/huquq|прав|law/i.test(text)) return "law";
  if (/tarix|истор|histor/i.test(text)) return "history";
  if (/ingliz|англ|english/i.test(text)) return "english";
  if (/rus|рус/i.test(text)) return "russian";
  return "other";
}

/** HTML version of the brochure card for teachers added in the admin panel. */
function ApiTeacherCard({ p }: { p: Person }) {
  const { lang } = useLanguage();
  const name = fullName(p, lang);
  const position = pick(p, "position", lang);
  return (
    <div className="relative aspect-[420/752] overflow-hidden rounded-[18px] bg-[#120507] ring-1 ring-white/10">
      <div className="absolute left-1/2 top-[18%] h-[52%] w-[92%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#ff3b2f_0%,#c4121c_35%,rgba(120,8,14,.4)_62%,transparent_72%)]" />
      <SmartImage src={p.photo} alt={name} fallbackText={name} className="absolute inset-x-0 bottom-0 top-[10%]" sizes="220px" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-192.png" alt="" className="absolute left-1/2 top-3 h-8 w-8 -translate-x-1/2 rounded-full" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        {position && <span className="rounded-md bg-gold-400 px-1.5 py-0.5 text-[10px] font-bold text-wine-950">{position}</span>}
        <p className="mt-1.5 font-display text-[15px] font-black leading-[1.05] text-white">{name}</p>
      </div>
    </div>
  );
}

export function Teachers({ limit, showHeading = true }: { limit?: number; showHeading?: boolean }) {
  const { lang, t } = useLanguage();
  const { data } = useList<Teacher>(API.teachers);
  const [filter, setFilter] = useState<Subject | "all">("all");
  const [sel, setSel] = useState<Item | null>(null);

  const items = useMemo<Item[]>(() => {
    const known = new Set(BROCHURE_TEACHERS.flatMap((b) => [norm(b.name), norm(b.name.split(" ").reverse().join(" "))]));
    const api: Item[] = data
      .filter(isActive)
      .sort(byOrder)
      .filter((p) => !known.has(norm(`${p.last_name_uz} ${p.first_name_uz}`)) && !known.has(norm(`${p.first_name_uz} ${p.last_name_uz}`)))
      .map((p) => ({ key: `api-${p.id}`, subject: guessSubject(`${p.position_uz} ${p.position_ru} ${p.bio_uz}`), api: p }));
    const pdf: Item[] = BROCHURE_TEACHERS.map((b) => ({ key: b.img, subject: b.subject, brochure: b }));
    return [...pdf, ...api];
  }, [data]);

  const subjects = (Object.keys(SUBJECTS) as Subject[]).filter((s) => items.some((i) => i.subject === s));
  const filtered = items.filter((i) => filter === "all" || i.subject === filter);
  const shown = limit ? filtered.slice(0, limit) : filtered;
  // repeat short lists so the marquee row always overflows the screen
  const loop = shown.length ? Array.from({ length: Math.ceil(8 / shown.length) }, () => shown).flat() : [];

  return (
    <section id="teachers" className="section">
      <div className="shell">
        {showHeading && (
          <SectionHeading
            eyebrow={t.teachers_eyebrow}
            title={<span className="text-headline">{t.teachers_title}</span>}
            sub={t.teachers_sub}
            align="left"
            action={limit && filtered.length > limit ? <Link href="/teachers" className="btn btn-outline group">{t.cta_all}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link> : undefined}
          />
        )}

        {/* Subject filter */}
        <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {(["all", ...subjects] as const).map((s) => {
            const on = filter === s;
            const count = s === "all" ? items.length : items.filter((i) => i.subject === s).length;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(s)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${on ? "text-wine-950" : "text-ink-soft hover:text-white"}`}
              >
                {on && <motion.span layoutId="teacher-filter" className="absolute inset-0 rounded-full bg-grad-gold" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                {!on && <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[.04]" />}
                <span className="relative">{s === "all" ? t.filter_all : tr(SUBJECTS[s], lang)} <span className="opacity-60">{count}</span></span>
              </button>
            );
          })}
        </div>

      </div>

      {/* One-row auto-scrolling carousel; pauses on hover, click opens details */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <Marquee speed={Math.max(30, loop.length * 4.5)} gap="gap-4 pr-4" className="mask-fade-x py-4">
            {loop.map((it, idx) => (
              <button
                key={`${it.key}-${idx}`}
                type="button"
                onClick={() => setSel(it)}
                className="group w-[170px] shrink-0 text-left sm:w-[200px]"
                aria-label={it.brochure?.name ?? (it.api ? fullName(it.api, lang) : "")}
              >
                <div className="rounded-[18px] shadow-[0_20px_36px_-22px_rgba(0,0,0,.95)] transition-transform duration-500 ease-silk group-hover:-translate-y-2 group-hover:scale-[1.03]">
                  {it.brochure ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/images/pdf/teachers/${it.brochure.img}.webp`}
                      alt={it.brochure.name}
                      loading="lazy"
                      width={420}
                      height={752}
                      className="aspect-[420/752] w-full rounded-[18px] object-cover ring-1 ring-white/10 transition-[box-shadow] duration-500 group-hover:ring-gold-400/60"
                    />
                  ) : (
                    it.api && <ApiTeacherCard p={it.api} />
                  )}
                </div>
              </button>
            ))}
          </Marquee>
        </motion.div>
      </AnimatePresence>

      <TeacherModal item={sel} onClose={() => setSel(null)} />
    </section>
  );
}

function TeacherModal({ item, onClose }: { item: Item | null; onClose: () => void }) {
  const { lang, t } = useLanguage();
  const b = item?.brochure;
  const p = item?.api;
  const name = b ? b.name : p ? fullName(p, lang) : "";
  const subject = item && item.subject !== "other" ? tr(SUBJECTS[item.subject], lang) : p ? pick(p, "position", lang) : "";
  const bio = p ? pick(p, "bio", lang) : "";
  const degree = b?.degree ? tr(b.degree, lang) : p ? pick(p, "degree", lang) : "";

  return (
    <Modal open={!!item} onClose={onClose} size="lg" label={name || "Teacher"}>
      {item && (
        <div className="grid md:grid-cols-[0.8fr_1.2fr]">
          <div className="bg-black/30 p-5 md:rounded-l-[30px]">
            {b ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/images/pdf/teachers/${b.img}.webp`} alt={name} className="mx-auto w-full max-w-[280px] rounded-[18px]" />
            ) : (
              p && <div className="mx-auto max-w-[280px]"><ApiTeacherCard p={p} /></div>
            )}
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-9">
            {subject && <span className="eyebrow self-start">{subject}</span>}
            <h3 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight">{name}</h3>
            {degree && (
              <p className="mt-3 inline-flex items-center gap-2 self-start rounded-xl bg-white/[.06] px-3 py-1.5 text-sm font-semibold">
                <GraduationCap className="h-4 w-4 text-gold-400" />{degree}
              </p>
            )}
            {b && (
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="card rounded-2xl p-4">
                  <p className="num text-gold-grad text-3xl">{b.years}</p>
                  <p className="mt-1 text-xs font-semibold text-ink-muted">{t.years_exp}</p>
                </div>
                <div className="card rounded-2xl p-4">
                  <p className="num text-gold-grad text-3xl">{b.students}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-ink-muted"><Users className="h-3 w-3" />{b.studentsKind === "students" ? t.students_word : t.pupils}</p>
                </div>
              </div>
            )}
            {bio && <p className="prose-tls mt-5 whitespace-pre-line text-[15px]">{bio}</p>}
            {p && (p.phone || p.email) && (
              <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                {p.phone && <a href={`tel:${phoneHref(p.phone)}`} className="btn btn-outline btn-sm"><Phone className="h-4 w-4" />{prettyPhone(p.phone)}</a>}
                {p.email && <a href={`mailto:${p.email}`} className="btn btn-outline btn-sm"><Mail className="h-4 w-4" />{p.email}</a>}
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

/* ---------------------------------------------------------------- Team (admin "team" members) */
export function Team() {
  const { lang, t } = useLanguage();
  const { data } = useList<TeamMember>(API.team);
  const [sel, setSel] = useState<Item | null>(null);
  const list = data.filter(isActive).sort(byOrder);
  if (!list.length) return null;
  return (
    <section id="team" className="section">
      <div className="shell">
        <SectionHeading eyebrow={t.team_eyebrow} title={t.team_title} />
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {list.map((p) => (
            <StaggerItem key={p.id}>
              <button type="button" onClick={() => setSel({ key: `team-${p.id}`, subject: "other", api: p })} className="block w-full text-left" aria-label={fullName(p, lang)}>
                <Tilt max={10}><ApiTeacherCard p={p} /></Tilt>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      <TeacherModal item={sel} onClose={() => setSel(null)} />
    </section>
  );
}
