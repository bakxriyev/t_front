import type { Metadata } from "next";
import RegistrationClient from "./RegistrationClient";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ro‘yxatdan o‘tish",
  description: "Tashkent Law School — huquq fanini professionallardan o‘rganing. Ismingiz va raqamingizni qoldiring, siz bilan bog‘lanamiz.",
  alternates: { canonical: "/registration" },
  openGraph: {
    title: "Tashkent Law School — Ro‘yxatdan o‘tish",
    description: "Huquq fanini professionallardan o‘rganing. TDYU, HMQA, JIDU ga tayyorlov.",
    images: [`${SITE_URL}/images/reg/banner-brand.webp`],
  },
};

export default function RegistrationPage() {
  return <RegistrationClient />;
}
