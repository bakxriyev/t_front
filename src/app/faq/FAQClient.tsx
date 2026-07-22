"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FAQ } from "@/components/sections/FAQ";

export default function FAQClient() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "90px" }}>
        <FAQ />
      </div>
      <Footer />
    </div>
  );
}
