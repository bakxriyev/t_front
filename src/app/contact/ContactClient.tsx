"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/ui/PageHeader";
import { Branches } from "@/components/sections/Branches";
import { Contact } from "@/components/sections/Contact";

export default function ContactClient() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader title={t.contact_title} sub={t.contact_sub} crumbs={[{ label: t.nav_contact }]} />
      <Branches />
      <Contact />
    </>
  );
}
