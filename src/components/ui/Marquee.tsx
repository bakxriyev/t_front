import type { ReactNode } from "react";

/** Pure-CSS infinite marquee. Children are rendered twice for a seamless loop. */
export function Marquee({ children, speed = 40, reverse = false, className = "", gap = "gap-10 pr-10" }: { children: ReactNode; speed?: number; reverse?: boolean; className?: string; gap?: string }) {
  return (
    <div className={`group/marquee flex overflow-hidden ${className}`}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={`flex shrink-0 items-center ${gap} [animation:marquee_var(--d)_linear_infinite] group-hover/marquee:[animation-play-state:paused]`}
          style={{ ["--d" as string]: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
