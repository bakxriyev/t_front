"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NewsSection } from "@/components/sections/News";

export default function NewsClient() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "90px" }}>
        <NewsSection showAll />
      </div>
      <Footer />
    </div>
  );
}
