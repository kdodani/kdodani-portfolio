"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUpInitial, motionDelay } from "@/lib/motion";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Consistent gap between major blocks on the page */
export const SECTION = "mt-16 sm:mt-20 lg:mt-24";
/** Shared card surface */
export const CARD = "rounded-2xl border border-stone-200/60 bg-white";
export const CARD_PAD = "px-5 py-5 sm:px-6 sm:py-6";

/** Spread onto a `motion.*` element for a consistent scroll reveal. */
export function useFadeUp() {
  const reduceMotion = useReducedMotion();
  return (delay = 0) => ({
    initial: fadeUpInitial(reduceMotion, 14),
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5, ease, delay: motionDelay(reduceMotion, delay) },
  });
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400 sm:text-[11px]">
      {children}
    </p>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display mt-2 text-[clamp(1.3rem,1.4vw+1rem,1.75rem)] font-medium tracking-[-0.025em] text-stone-900">
      {children}
    </h3>
  );
}

export function SectionIntro({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 max-w-[min(100%,40rem)] text-[14px] leading-[1.7] text-stone-500 sm:text-[15px]">
      {children}
    </p>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[13px] leading-[1.65] text-stone-600 sm:text-[14px]">
          <span
            aria-hidden
            className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-[#6D5EF5] to-[#4F8CFF]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Build number plus a link back up to the index of builds. */
export function BuildEyebrow({ number, total, featured }: { number: string; total: number; featured?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
      <SectionLabel>{`Build ${number} of ${String(total).padStart(2, "0")}${featured ? " · Featured" : ""}`}</SectionLabel>
      <a
        href="#builds-index"
        className="inline-flex items-center gap-1 text-[12px] font-medium text-stone-400 transition-colors hover:text-[#6D5EF5]"
      >
        <svg aria-hidden className="h-3 w-3" viewBox="0 0 12 12" fill="none">
          <path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All builds
      </a>
    </div>
  );
}

export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(109,94,245,0.08)] px-2.5 py-1 text-[11px] font-medium text-[#6D5EF5]">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#6D5EF5]" />
      {children}
    </span>
  );
}
