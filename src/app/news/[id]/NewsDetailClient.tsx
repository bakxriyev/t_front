"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CalendarDays, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API, formatDate, isVideoFile, media, pick, useList, useOne, youtubeId, type News } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { FullImage, NewsCard } from "@/components/sections/News";

export default function NewsDetailClient() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const { data: n, loading, error } = useOne<News>(id ? API.newsOne(id) : null);
  const { data: all } = useList<News>(API.news);
  const more = all.filter((x) => String(x.id) !== String(id) && (!x.status || x.status === "published")).slice(0, 3);

  if (!loading && (error || !n)) {
    return (
      <>
        <PageHeader title={t.news_not_found} crumbs={[{ label: t.nav_news, href: "/news" }]} />
        <div className="shell py-20 text-center"><Link href="/news" className="btn btn-wine"><ArrowLeft className="h-4 w-4" />{t.cta_back}</Link></div>
      </>
    );
  }

  const title = n ? pick(n, "title", lang) : "";
  const content = n ? pick(n, "content", lang) : "";
  const yt = youtubeId(n?.video_url);
  const video = n?.video_url && isVideoFile(n.video_url) ? media(n.video_url) : null;

  return (
    <>
      <PageHeader title={loading ? <Skeleton className="h-14 w-2/3 opacity-20" /> : title} crumbs={[{ label: t.nav_news, href: "/news" }, { label: title || "…" }]}>
        {n && (
          <div className="flex flex-wrap gap-2 text-sm font-semibold">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2"><CalendarDays className="relative h-4 w-4 text-gold-300" /><span className="relative">{formatDate(n.createdAt, lang)}</span></span>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2"><Eye className="relative h-4 w-4 text-gold-300" /><span className="relative">{n.views} {t.news_views}</span></span>
          </div>
        )}
      </PageHeader>

      <article className="section">
        <div className="shell max-w-4xl">
          {loading ? <Skeleton className="aspect-[16/9] w-full rounded-[32px]" /> : n?.image ? (
            <Reveal><FullImage src={n.image} alt={title} sizes="(max-width: 1024px) 100vw, 900px" className="aspect-[16/9] w-full rounded-[26px] ring-1 ring-white/10" /></Reveal>
          ) : null}
          {loading ? (
            <div className="mt-10 space-y-3"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-11/12" /><Skeleton className="h-4 w-4/5" /></div>
          ) : (
            <Reveal><div className="prose-tls mt-10 whitespace-pre-line text-[18px]">{content}</div></Reveal>
          )}
          {(yt || video) && (
            <Reveal className="mt-10 overflow-hidden rounded-[28px] shadow-lift">
              {yt ? (
                <iframe className="aspect-video w-full" src={`https://www.youtube.com/embed/${yt}`} title={title} allow="encrypted-media; picture-in-picture" allowFullScreen />
              ) : (
                <video src={video || undefined} controls playsInline className="w-full bg-black" />
              )}
            </Reveal>
          )}
          <div className="mt-12 border-t border-white/10 pt-8">
            <Link href="/news" className="btn btn-outline"><ArrowLeft className="h-4 w-4" />{t.cta_back}</Link>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="section">
          <div className="shell">
            <h2 className="h2 mb-10">{t.news_more}</h2>
            <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {more.map((x) => <StaggerItem key={x.id}><NewsCard n={x} /></StaggerItem>)}
            </Stagger>
          </div>
        </section>
      )}
    </>
  );
}
