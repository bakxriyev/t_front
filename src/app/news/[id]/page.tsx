import type { Metadata } from "next";
import NewsDetailClient from "./NewsDetailClient";
import { SITE_NAME, SITE_URL, breadcrumbJsonLd, fetchNews, jsonLdHtml, mediaUrl, plain } from "@/lib/seo";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = await fetchNews(params.id);
  const path = `/news/${params.id}`;
  if (!n) return { title: "Yangilik", description: `${SITE_NAME} yangiligi.`, alternates: { canonical: path } };
  const title = plain(n.title_uz || n.title_ru || n.title_en, 90);
  const desc = plain(n.excerpt_uz || n.content_uz, 160) || `${SITE_NAME} yangiligi.`;
  const image = mediaUrl(n.image) || `${SITE_URL}/images/hero-poster.jpg`;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: { type: "article", title, description: desc, url: path, images: [image], publishedTime: n.createdAt, modifiedTime: n.updatedAt },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const n = await fetchNews(params.id);
  const title = n ? plain(n.title_uz || n.title_ru || n.title_en, 110) : "";
  return (
    <>
      {n && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdHtml([
            {
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: title,
              description: plain(n.excerpt_uz || n.content_uz, 200),
              image: [mediaUrl(n.image) || `${SITE_URL}/images/hero-poster.jpg`],
              datePublished: n.createdAt,
              dateModified: n.updatedAt || n.createdAt,
              mainEntityOfPage: `${SITE_URL}/news/${params.id}`,
              author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
              publisher: { "@id": `${SITE_URL}/#organization` },
            },
            breadcrumbJsonLd([{ name: "Yangiliklar", path: "/news" }, { name: title, path: `/news/${params.id}` }]),
          ])}
        />
      )}
      <NewsDetailClient />
    </>
  );
}
