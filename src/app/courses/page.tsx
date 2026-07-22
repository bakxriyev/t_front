import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Huquq Kurslari — Yuridik Taʼlim",
  description:
    "Tashkent Law School huquq kurslari: fuqarolik huquqi, jinoyat huquqi, xalqaro huquq, korporativ huquq va huquqiy ingliz tili. Yuridik universitetga tayyorlov kurslari. Toshkent, Oʻzbekistondagi eng yirik huquqiy oʻquv markazi. Huquqshunoslik, yurisprudensiya va yuridik taʼlim boʻyicha professional kurslar.",
  keywords: [
    "Huquq kurslari",
    "Yuridik kurslar",
    "Yurisprudensiya",
    "Huquqshunoslik",
    "Yuridik universitetga tayyorlov",
    "Fuqarolik huquqi",
    "Jinoyat huquqi",
    "Xalqaro huquq",
    "Korporativ huquq",
    "Toshkent huquq markazi",
    "Yuridik taʼlim",
    "Huquqiy oʻquv markaz",
  ],
  openGraph: {
    title: "Huquq Kurslari — Yuridik Taʼlim | Tashkent Law School",
    description:
      "Professional huquqiy kurslar: fuqarolik, jinoyat, xalqaro va korporativ huquq. Yuridik universitetga tayyorlov. Toshkentdagi eng yirik huquq markazi.",
  },
};

export default function CoursesPage() {
  return <CoursesClient />;
}
