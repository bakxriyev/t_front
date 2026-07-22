"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Lang, i18n } from "@/lib/constants";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "UZ",
  setLang: () => {},
  t: i18n.UZ,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("UZ");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && ["EN", "RU", "UZ"].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang: mounted ? lang : "UZ", setLang, t: i18n[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}
