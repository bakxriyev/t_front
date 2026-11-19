import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Kurslar va narxlar — huquq, ingliz tili, tarix, matematika",
  description: "Tashkent Law School kurslari: huquq, ingliz tili, tarix, O‘zbekiston tarixi, ona tili, turk tili va matematika. TDYU, HMQA, JIDU ga tayyorlov, milliy sertifikat. O‘zbek va rus guruhlari, narxlar. Курсы права и английского языка в Ташкенте.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  return <CoursesClient />;
}
