"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/ui/PageHeader";
import { NewsSection } from "@/components/sections/News";

export default function NewsClient() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader title={t.news_title} crumbs={[{ label: t.nav_news }]} />
      <NewsSection limit={0} showHeading={false} />
    </>
  );
}
