import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "Koʻp Beriladigan Savollar",
  description:
    "Tashkent Law School haqida ko'p beriladigan savollar: qabul shartlari, kurs narxlari, sertifikatlar, dars jadvali, onlayn ta'lim va stipendiyalar. Huquq kurslari va yuridik ta'lim bo'yicha barcha ma'lumotlar.",
  openGraph: {
    title: "Koʻp Beriladigan Savollar — Tashkent Law School",
    description: "Qabul, narxlar, sertifikatlar, jadval va boshqa savollarga javoblar.",
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
