import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Biz Haqimizda — Huquqiy Taʼlim Markazi",
  description:
    "Tashkent Law School haqida: 2013-yilda tashkil etilgan, Oʻzbekistondagi yetakchi huquqiy taʼlim markazi. 12 yillik tajriba, 95% ish bilan taʼminlash, xalqaro akkreditatsiya. Yurisprudensiya, huquq kurslari va yuridik universitetga tayyorlov boʻyicha professional taʼlim.",
  openGraph: {
    title: "Biz Haqimizda — Tashkent Law School",
    description: "12 yillik tajriba, 95% ish bilan taʼminlash, xalqaro akkreditatsiya. Toshkentdagi yetakchi huquq maktabi.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
