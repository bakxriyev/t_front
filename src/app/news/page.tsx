import type { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "Yangiliklar",
  description: "Tashkent Law School yangiliklari, tadbirlar, natijalar va e’lonlar.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return <NewsClient />;
}
