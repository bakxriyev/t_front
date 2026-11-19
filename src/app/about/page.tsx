import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Biz haqimizda — huquqiy o‘quv markazi",
  description: "Tashkent Law School — Toshkentdagi huquqiy o‘quv markazi. Professional yuristlardan darslar, TDYU, HMQA va JIDU ga tayyorlov. Chilonzor, Yunusobod va Urganch filiallari.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutClient />;
}
