import type { MetadataRoute } from "next";
import { SITE_URL, fetchCourses, fetchNewsList } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [courses, news] = await Promise.all([fetchCourses(), fetchNewsList()]);

  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/registration`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/teachers`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const date = (s?: string) => (s && !Number.isNaN(Date.parse(s)) ? new Date(s) : now);
  return [
    ...pages,
    ...courses.map((c) => ({ url: `${SITE_URL}/courses/${c.id}`, lastModified: date(c.updatedAt), changeFrequency: "weekly" as const, priority: 0.85 })),
    ...news.map((n) => ({ url: `${SITE_URL}/news/${n.id}`, lastModified: date(n.updatedAt || n.createdAt), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
