import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Maxfiylik siyosati", description: "Tashkent Law School maxfiylik siyosati.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Maxfiylik siyosati"
      updated="Oxirgi yangilanish: 2026-yil noyabr"
      sections={[
        { h: "Qanday ma’lumotlar to‘planadi", p: "Kursga yozilish yoki savol yuborishda siz kiritgan ism, telefon raqami, tanlangan kurs va filial hamda savolingiz matni." },
        { h: "Ma’lumotlardan foydalanish", p: "Ma’lumotlar faqat siz bilan bog‘lanish, mos kurs va guruhni taklif qilish hamda xizmat sifatini yaxshilash uchun ishlatiladi. Uchinchi shaxslarga sotilmaydi." },
        { h: "Ma’lumotlarni himoya qilish", p: "Shaxsiy ma’lumotlaringizni ruxsatsiz kirish, o‘zgartirish yoki oshkor qilinishdan himoya qilish uchun zarur choralar ko‘riladi." },
        { h: "Bog‘lanish", p: "Maxfiylik bo‘yicha savollar uchun: +998 55 055 23 23 yoki Telegram: @tashkentlawadmin." },
      ]}
    />
  );
}
