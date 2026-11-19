import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  /** kept for API compatibility — every section is dark now */
  dark?: boolean;
  action?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div className={`mb-10 flex flex-col gap-6 sm:mb-14 ${centered ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"}`}>
      <div className={centered ? "flex max-w-3xl flex-col items-center" : "max-w-2xl"}>
        {eyebrow && (
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
              {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h2 className="h2 mt-5 text-balance text-white">{title}</h2>
        </Reveal>
        {sub && (
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">{sub}</p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={0.12}>{action}</Reveal>}
    </div>
  );
}
