"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/ui/PageHeader";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function FAQClient() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader title={t.faq_title} sub={t.faq_more} crumbs={[{ label: t.nav_faq }]} />
      <FAQ />
      <Contact />
    </>
  );
}
