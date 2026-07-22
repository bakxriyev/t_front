"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";

export default function AboutClient() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "90px" }}>
        <About />
      </div>
      <Footer />
    </div>
  );
}
