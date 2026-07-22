'use client';

import { C } from "@/lib/constants";

export const SectionLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div
        style={{
          width: 32,
          height: 2,
          background: C.goldGrad,
          borderRadius: 1,
        }}
      />
      <span
        className="text-xs uppercase tracking-[0.2em] font-medium"
        style={{
          color: C.gold,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {children}
      </span>
    </div>
  );
};

export default SectionLabel;
