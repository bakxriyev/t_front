"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Courses } from "@/components/sections/Courses";
import { Teachers } from "@/components/sections/Teachers";
import { Results } from "@/components/sections/Results";
import { Testimonials } from "@/components/sections/Testimonials";
import { VideoReviews } from "@/components/sections/VideoReviews";
import { NewsSection } from "@/components/sections/News";
import { Team } from "@/components/sections/Team";
import { Vacancies } from "@/components/sections/Vacancies";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { EnrollModal } from "@/components/ui/EnrollModal";
import { C } from "@/lib/constants";
import { Send, ArrowUp } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  const [enrollCourse, setEnrollCourse] = useState<string | null>(null);
  const [showEnroll, setShowEnroll] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const fn = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ color: C.white, fontFamily: "'Inter', sans-serif" }}>
      <VideoBackground />
      <Navbar />
      <Hero onApply={() => { setShowEnroll(true); setEnrollCourse(null); }} />
      <Stats />
      <About />
      <Courses onEnroll={(c) => { setShowEnroll(true); setEnrollCourse(c); }} limit={6} />
      <Teachers />
      <Results />
      <Testimonials />
      <VideoReviews />
      <NewsSection />
      <Team />
      <Vacancies />
      <FAQ />
      <Contact />
      <div className="sr-only" aria-hidden="true">
        <h2>Yurisprudensiya, Huquq kurslari va Yuridik o'quv markaz — Tashkent Law School</h2>
        <p>Tashkent Law School O'zbekistondagi yetakchi yuridik o'quv markazidir. Biz yurisprudensiya, huquq kurslari va yuridik universitetiga tayyorlov bo'yicha professional ta'lim beramiz. Huquqshunoslik, fuqarolik huquqi, jinoyat huquqi, xalqaro huquq va korporativ huquq yo'nalishlarida sifatli yuridik ta'lim taklif qilamiz. Toshkentdagi eng yaxshi huquq maktabi. Bo'lajak Yuristlar tanlovi, Yuridik Litsey va Universitetiga tayyorlov kurslari.</p>
      </div>
      <Footer />

      {showEnroll && (
        <EnrollModal course={enrollCourse} onClose={() => { setShowEnroll(false); setEnrollCourse(null); }} />
      )}

      <a
        href="https://t.me/tashkentlawschool"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-40 flex items-center justify-center transition-all hover:scale-110"
        style={{
          bottom: showBackToTop ? "90px" : "24px",
          right: "24px",
          width: "54px",
          height: "54px",
          borderRadius: "50%",
          background: "#229ED9",
          boxShadow: "0 8px 28px rgba(34,158,217,0.45)",
          transition: "bottom 0.3s ease, transform 0.2s ease",
        }}
        aria-label="Telegram"
      >
        <Send size={21} color="white" />
      </a>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed z-40 flex items-center justify-center transition-all hover:scale-110"
          style={{
            bottom: "24px",
            right: "24px",
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            background: C.goldGrad,
            boxShadow: "0 8px 28px rgba(236,198,103,0.45)",
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={20} color={C.bg} />
        </button>
      )}
    </div>
  );
}
