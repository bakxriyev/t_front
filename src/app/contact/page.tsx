import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Aloqa va filiallar — Chilonzor, Yunusobod, Urganch",
  description: "Tashkent Law School filiallari manzillari: Chilonzor va Yunusobod (Toshkent), Urganch (Xorazm). Telefon: +998 55 055 23 23. Филиалы в Ташкенте и Ургенче.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
