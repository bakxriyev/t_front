"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/ui/PageHeader";
import { About, Stats, Timeline, Values } from "@/components/sections/About";
import { Advantages } from "@/components/sections/Advantages";
import { Books, CourseSystem, Gallery } from "@/components/sections/Brochure";
import { Team } from "@/components/sections/Teachers";
import { Branches } from "@/components/sections/Branches";
import { Contact } from "@/components/sections/Contact";

export default function AboutClient() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader title={t.about_title} sub={t.adv_sub} crumbs={[{ label: t.nav_about }]} />
      <Stats overlap={false} />
      <About full />
      <Values />
      <Timeline />
      <Advantages />
      <CourseSystem />
      <Books />
      <Gallery />
      <Team />
      <Branches />
      <Contact />
    </>
  );
}
