"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/ui/PageHeader";
import { Courses } from "@/components/sections/Courses";
import { FAQ } from "@/components/sections/FAQ";
import { CourseSystem, Promotions } from "@/components/sections/Brochure";
import { Contact } from "@/components/sections/Contact";

export default function CoursesClient() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader title={t.courses_title} sub={t.courses_sub} crumbs={[{ label: t.nav_courses }]} />
      <Courses showHeading={false} />
      <CourseSystem />
      <Promotions />
      <FAQ />
      <Contact />
    </>
  );
}
