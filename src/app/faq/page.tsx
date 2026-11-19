import type { Metadata } from "next";
import FAQClient from "./FAQClient";
import { DEFAULT_FAQ } from "@/lib/constants";
import { fetchFaq, jsonLdHtml, plain } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ko‘p beriladigan savollar",
  description: "Tashkent Law School haqida savol-javoblar: kurslar, narxlar, filiallar, TDYU ga tayyorlov va ro‘yxatdan o‘tish.",
  alternates: { canonical: "/faq" },
};

export default async function FAQPage() {
  const fromApi = await fetchFaq();
  const items = (fromApi.length ? fromApi : DEFAULT_FAQ)
    .map((f) => ({ q: plain(f.question_uz, 300), a: plain(f.answer_uz, 1000) }))
    .filter((f) => f.q && f.a);
  return (
    <>
      {items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdHtml({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          })}
        />
      )}
      <FAQClient />
    </>
  );
}
