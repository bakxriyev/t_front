import type { Metadata } from "next";
import NewsDetailClient from "./NewsDetailClient";

export const metadata: Metadata = {
  title: "Yangilik — Tashkent Law School",
  description: "Yangilik batafsil sahifasi",
};

export default function NewsDetailPage() {
  return <NewsDetailClient />;
}
