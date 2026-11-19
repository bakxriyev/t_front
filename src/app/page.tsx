import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/About";
import { Institutions } from "@/components/sections/Institutions";
import { Advantages } from "@/components/sections/Advantages";
import { Courses } from "@/components/sections/Courses";
import { Books, CourseSystem, Gallery, Promotions } from "@/components/sections/Brochure";
import { Teachers, Team } from "@/components/sections/Teachers";
import { Results } from "@/components/sections/Results";
import { Reviews } from "@/components/sections/Reviews";
import { NewsSection } from "@/components/sections/News";
import { Branches } from "@/components/sections/Branches";
import { Vacancies } from "@/components/sections/Vacancies";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Institutions />
      <Advantages />
      <Courses />
      <CourseSystem />
      <Books />
      <Teachers />
      <Results />
      <Gallery />
      <Promotions />
      <Reviews />
      <NewsSection limit={6} />
      <Branches />
      <Team />
      <Vacancies />
      <FAQ />
      <Contact />
    </>
  );
}
