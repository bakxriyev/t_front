"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Modal } from "@/components/ui/Modal";
import { LeadForm } from "@/components/ui/LeadForm";
import { useLanguage } from "@/contexts/LanguageContext";

const EnrollContext = createContext<{ open: (courseId?: string | number | null) => void }>({ open: () => {} });
export const useEnroll = () => useContext(EnrollContext);

export function EnrollProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const [state, setState] = useState<{ open: boolean; courseId: string | number | null }>({ open: false, courseId: null });
  const open = useCallback((courseId?: string | number | null) => setState({ open: true, courseId: courseId ?? null }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  return (
    <EnrollContext.Provider value={{ open }}>
      {children}
      <Modal open={state.open} onClose={close} label={t.enroll_title}>
        <div className="relative overflow-hidden rounded-t-[30px] bg-gradient-to-br from-wine-700/70 via-wine-900/60 to-transparent px-6 pb-7 pt-8 text-white sm:px-8">
          <div className="relative flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-192.png" alt="" className="h-14 w-14 rounded-full ring-2 ring-gold-400/40" />
            <div>
              <h2 className="font-display text-3xl font-semibold leading-none">{t.enroll_title}</h2>
              <p className="mt-1 text-sm text-white/65">{t.enroll_sub}</p>
            </div>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <LeadForm initialCourseId={state.courseId} onDone={close} source="enroll-modal" />
        </div>
      </Modal>
    </EnrollContext.Provider>
  );
}
