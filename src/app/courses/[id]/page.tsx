import type { Metadata } from "next";
import CourseDetailClient from "./CourseDetailClient";
import { SITE_NAME, SITE_URL, breadcrumbJsonLd, courseAliases, courseTitle, fetchCourse, jsonLdHtml, mediaUrl, plain } from "@/lib/seo";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = await fetchCourse(params.id);
  const path = `/courses/${params.id}`;
  if (!course) {
    return { title: "Kurs haqida", description: `${SITE_NAME} kursi haqida batafsil: dastur, davomiyligi, narxi va ro‘yxatdan o‘tish.`, alternates: { canonical: path } };
  }
  const name = courseTitle(course);
  const aliases = courseAliases(name);
  const desc =
    plain(course.description_uz || course.description_ru, 120) ||
    `${name} — ${SITE_NAME}. Dastur, davomiyligi va narxi.`;
  const image = mediaUrl(course.image) || `${SITE_URL}/images/hero-poster.jpg`;
  return {
    title: aliases.length ? `${aliases[0]} Toshkentda · ${aliases[1]} · ${aliases[2]}` : `${name} — Toshkentda kurs`,
    description: `${desc}${aliases.length ? ` ${aliases.slice(1).join(" · ")} — Tashkent.` : ""}`,
    keywords: [name, ...aliases, `${name} Toshkent`, `${name} Chilonzor`, `${name} Yunusobod`, SITE_NAME],
    alternates: { canonical: path },
    openGraph: { title: `${name} | ${SITE_NAME}`, description: desc, url: path, images: [image] },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const course = await fetchCourse(params.id);
  return (
    <>
      {course && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdHtml(breadcrumbJsonLd([{ name: "Kurslar", path: "/courses" }, { name: courseTitle(course), path: `/courses/${params.id}` }]))}
        />
      )}
      <CourseDetailClient />
    </>
  );
}
