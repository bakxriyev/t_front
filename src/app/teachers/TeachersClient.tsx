"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Teachers } from "@/components/sections/Teachers";

export default function TeachersClient() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "90px" }}>
        <Teachers />
      </div>
      <Footer />
    </div>
  );
}
