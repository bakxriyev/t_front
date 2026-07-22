import type { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "Yangiliklar — Tadbirlar va Eʼlonlar",
  description:
    "Tashkent Law School yangiliklari: tadbirlar, e'lonlar, ta'lim yangiliklari va talabalar yutuqlari. Huquq kurslari, yuridik ta'lim va yurisprudensiya bo'yicha eng so'nggi ma'lumotlar.",
  openGraph: {
    title: "Yangiliklar — Tashkent Law School",
    description: "Eng so'nggi yangiliklar va tadbirlar. Huquqiy ta'lim va yuridik kurslar haqida barcha ma'lumotlar.",
  },
};

export default function NewsPage() {
  return <NewsClient />;
}
