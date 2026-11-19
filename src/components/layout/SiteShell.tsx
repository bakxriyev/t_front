"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PointerGlow } from "@/components/providers/PointerGlow";
import { EnrollProvider } from "@/components/providers/EnrollProvider";
import { VisitTracker } from "@/components/VisitTracker";
import { seedData } from "@/lib/content";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";

export function SiteShell({ children, initialData }: { children: ReactNode; initialData?: Record<string, unknown> }) {
  // Seed the client cache before any section renders, so server and client HTML match
  // and no section shows a loading state for data the server already fetched.
  useState(() => seedData(initialData));
  // Standalone landing pages (e.g. the Instagram link-in-bio form) render without the site chrome.
  const bare = usePathname()?.startsWith("/registration") ?? false;

  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <SmoothScroll>
          <EnrollProvider>
            <div className="site-bg" aria-hidden="true" />
            <PointerGlow />
            <VisitTracker />
            {!bare && <Navbar />}
            <main className="relative">{children}</main>
            {!bare && <Footer />}
            {!bare && <FloatingActions />}
          </EnrollProvider>
        </SmoothScroll>
      </LanguageProvider>
    </MotionConfig>
  );
}
