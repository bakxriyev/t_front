import type { Metadata } from "next";
import TeachersClient from "./TeachersClient";

export const metadata: Metadata = {
  title: "Ustozlar — professional yuristlar va pedagoglar",
  description: "Tashkent Law School ustozlari — magistr va doktorant yuristlar, tajribali pedagoglar. Huquq, ingliz tili va boshqa fanlar bo‘yicha darslar.",
  alternates: { canonical: "/teachers" },
};

export default function TeachersPage() {
  return <TeachersClient />;
}
