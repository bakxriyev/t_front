import type { Metadata } from "next";
import TeachersClient from "./TeachersClient";

export const metadata: Metadata = {
  title: "Oʻqituvchilar — Professional Yuridik Fakultet",
  description:
    "Tashkent Law School o'qituvchilari: tajribali professorlar, amaliyotchi advokatlar va sudyalar. 15+ yillik o'rtacha tajriba. Fuqarolik huquqi, jinoyat huquqi, xalqaro huquq, korporativ huquq va huquqiy ingliz tili bo'yicha ekspertlar.",
  openGraph: {
    title: "Oʻqituvchilar — Tashkent Law School",
    description: "Professional yuridik o'qituvchilar jamoasi: professorlar, advokatlar, sudyalar. 15+ yillik tajriba.",
  },
};

export default function TeachersPage() {
  return <TeachersClient />;
}
