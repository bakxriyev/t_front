import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Cookie siyosati", description: "Tashkent Law School saytida cookie fayllardan foydalanish.", alternates: { canonical: "/cookies" } };

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie siyosati"
      updated="Oxirgi yangilanish: 2026-yil noyabr"
      sections={[
        { h: "Cookie nima?", p: "Cookie — brauzeringizda saqlanadigan kichik matnli fayl. U saytni qulayroq qilish uchun ishlatiladi." },
        { h: "Biz nimalarni saqlaymiz", p: "Tanlangan til va tashriflar statistikasi (sahifa, manba). Bu ma’lumotlar saytni yaxshilash uchun ishlatiladi." },
        { h: "Boshqarish", p: "Brauzer sozlamalarida cookie fayllarni o‘chirib qo‘yishingiz mumkin; bunda sayt asosiy funksiyalari ishlashda davom etadi." },
      ]}
    />
  );
}
