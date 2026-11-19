"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/ui/PageHeader";
import { Teachers, Team } from "@/components/sections/Teachers";
import { Contact } from "@/components/sections/Contact";

export default function TeachersClient() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader title={t.teachers_title} sub={t.teachers_sub} crumbs={[{ label: t.nav_teachers }]} />
      <Teachers showHeading={false} />
      <Team />
      <Contact />
    </>
  );
}
