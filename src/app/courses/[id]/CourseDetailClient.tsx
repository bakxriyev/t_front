"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BarChart3, Check, Clock, Wallet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API, byOrder, formatPrice, isActive, pick, useList, useOne, type Course } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Skeleton } from "@/components/ui/Skeleton";
import { LeadForm } from "@/components/ui/LeadForm";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { CourseCard } from "@/components/sections/Courses";
import { Teachers } from "@/components/sections/Teachers";

export default function CourseDetailClient() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const { data: course, loading, error } = useOne<Course>(id ? API.course(id) : null);
  const { data: all } = useList<Course>(API.courses);
  const others = all.filter((c) => isActive(c) && String(c.id) !== String(id)).sort(byOrder).slice(0, 3);

  if (!loading && (error || !course)) {
    return (
      <>
        <PageHeader title={t.course_not_found} crumbs={[{ label: t.nav_courses, href: "/courses" }]} />
        <div className="shell py-20 text-center">
          <Link href="/courses" className="btn btn-wine"><ArrowLeft className="h-4 w-4" />{t.cta_back}</Link>
        </div>
      </>
    );
  }

  const title = course ? pick(course, "title", lang) : "";
  const desc = course ? pick(course, "description", lang) : "";
  const price = course ? formatPrice(course.price, lang) : "";
  const facts = course
    ? [
        { Icon: Clock, label: t.course_duration, value: course.duration?.trim() },
        { Icon: BarChart3, label: t.course_level, value: course.level?.trim() },
        { Icon: Wallet, label: t.course_price, value: price ? `${price} ${t.course_per_month}` : "" },
      ].filter((f) => f.value)
    : [];

  return (
    <>
      <PageHeader title={loading ? <Skeleton className="h-14 w-2/3 opacity-20" /> : title} crumbs={[{ label: t.nav_courses, href: "/courses" }, { label: title || "…" }]}>
        <div className="flex flex-wrap gap-2">
          {facts.map(({ Icon, label, value }) => (
            <span key={label} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
              <Icon className="relative h-4 w-4 text-gold-300" />
              <span className="relative text-white/60">{label}:</span>
              <span className="relative">{value}</span>
            </span>
          ))}
        </div>
      </PageHeader>

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <div>
            <Reveal>
              {loading ? <Skeleton className="aspect-[16/9] w-full rounded-[32px]" /> : (
                <SmartImage src={course?.image} alt={title} eager sizes="(max-width: 1024px) 100vw, 760px" className="aspect-[16/9] w-full rounded-[26px] shadow-lift ring-1 ring-white/10" />
              )}
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h3 mt-12">{t.course_about}</h2>
              {loading ? (
                <div className="mt-5 space-y-3"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /></div>
              ) : (
                <p className="prose-tls mt-5 whitespace-pre-line">{desc}</p>
              )}
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="h3 mt-12">{t.course_includes}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[t.course_inc_1, t.course_inc_2, t.course_inc_3, t.course_inc_4].map((x) => (
                  <li key={x} className="card flex items-center gap-3 p-4 text-[15px] font-semibold">
                    <span className="icon-tile h-9 w-9 shrink-0 rounded-xl"><Check className="relative h-4 w-4" strokeWidth={3} /></span>
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="card ring-grad overflow-hidden">
                <div className="relative bg-gradient-to-br from-wine-700/70 via-wine-900/50 to-transparent p-6 text-white">
                  <p className="relative font-accent text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">{t.course_price}</p>
                  <p className="num relative mt-1 text-3xl font-semibold text-gold-grad">{price || "—"}</p>
                  {price && <p className="relative mt-1 text-sm text-white/60">{t.course_per_month}</p>}
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="font-display text-xl font-semibold">{t.course_enroll}</h3>
                  <p className="mb-5 mt-1 text-sm text-ink-muted">{t.enroll_sub}</p>
                  {course && <LeadForm initialCourseId={course.id} source={`course-${course.id}`} />}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <Teachers limit={4} />

      {others.length > 0 && (
        <section className="section">
          <div className="shell">
            <h2 className="h2 mb-10">{t.course_other}</h2>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((c) => <StaggerItem key={c.id}><CourseCard c={c} /></StaggerItem>)}
            </Stagger>
          </div>
        </section>
      )}
    </>
  );
}
