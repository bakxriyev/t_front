import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Foydalanish shartlari", description: "Tashkent Law School sayti foydalanish shartlari.", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage
      title="Foydalanish shartlari"
      updated="Oxirgi yangilanish: 2026-yil noyabr"
      sections={[
        { h: "Umumiy qoidalar", p: "Ushbu saytdan foydalanish orqali siz quyidagi shartlarga rozilik bildirasiz. Sayt Tashkent Law School o‘quv markazi xizmatlari haqida ma’lumot berish uchun mo‘ljallangan." },
        { h: "Kurslar va narxlar", p: "Saytdagi narxlar va jadval ma’lumot uchun berilgan. Aniq shartlar ro‘yxatdan o‘tishda administrator tomonidan tasdiqlanadi." },
        { h: "Intellektual mulk", p: "Saytdagi matnlar, logotip, fotosuratlar va videolar Tashkent Law School mulki hisoblanadi va ruxsatsiz nusxalanishi mumkin emas." },
        { h: "Bog‘lanish", p: "Savollar uchun: +998 55 055 23 23." },
      ]}
    />
  );
}
