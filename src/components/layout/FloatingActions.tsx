"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTACT } from "@/lib/constants";
import { TelegramIcon } from "@/components/ui/Icons";
import { useLenis } from "@/components/providers/SmoothScroll";

export function FloatingActions() {
  const { t } = useLanguage();
  const lenis = useLenis();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 700);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {show && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.8 }}
            onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
            aria-label={t.back_top}
            className="glass-nav flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-1"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <a
        href={CONTACT.telegramAdmin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-wine transition-transform duration-300 hover:scale-110"
        style={{ background: "linear-gradient(135deg,#2aabee,#229ed9)" }}
      >
        <span className="absolute inset-0 animate-pulsering rounded-full bg-[#2aabee]/50" />
        <TelegramIcon className="relative h-7 w-7" />
      </a>
    </div>
  );
}
