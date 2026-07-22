import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Aloqa — Bogʻlanish",
  description:
    "Tashkent Law School bilan bogʻlanish: manzil, telefon, email, Telegram. Chilonzor tumani, Toshkent, Oʻzbekiston. Huquq kurslari va yuridik taʼlim boʻyicha barcha savollaringizga javob beramiz.",
  openGraph: {
    title: "Aloqa — Tashkent Law School",
    description: "Biz bilan bogʻlaning: +998 71 234-56-78, info@tashkentlawschool.uz. Toshkent, Chilonzor.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
