import type { Metadata } from "next";
import CourseDetailClient from "./CourseDetailClient";

export const metadata: Metadata = {
  title: "Kurs Batafsil — Tashkent Law School",
  description: "Kurs haqida batafsil ma'lumot",
};

export default function CourseDetailPage() {
  return <CourseDetailClient />;
}
