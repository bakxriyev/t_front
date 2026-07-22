"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";

export default function ContactClient() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "90px" }}>
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
