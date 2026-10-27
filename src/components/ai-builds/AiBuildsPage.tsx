"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buildEntries } from "@/content/builds";
import { BuildShowcase } from "./BuildShowcase";
import { IntakeSpecialistBuild } from "./IntakeSpecialistBuild";
import { SectionLabel, useFadeUp } from "./ui";

export function AiBuildsPage() {
  const fadeUp = useFadeUp();
  const featured = buildEntries.find((b) => b.id === "intake-specialist");
  const others = buildEntries.filter((b) => b.id !== "intake-specialist");
  const ordered = featured ? [featured, ...others] : others;
  const total = ordered.length;

  return (
    <article className="pb-20 lg:pb-28">
      <div className="mx-auto max-w-frame px-page-x pt-8 sm:pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-stone-400 transition-colors duration-[250ms] hover:text-stone-600"
        >
          <svg aria-hidden className="h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to home
        </Link>

        <motion.header {...fadeUp(0)} className="mt-8 sm:mt-10">
          <SectionLabel>Practice</SectionLabel>
          <h1 className="gradient-hero-text font-display mt-3 text-[clamp(2.4rem,3.6vw+1.3rem,3.8rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            AI Builds
          </h1>
          <p className="mt-4 max-w-[min(100%,40rem)] text-[15px] leading-[1.72] text-stone-600 sm:text-base">
            Hands-on AI projects exploring workflows, automation, and agents. For each one: what I
            was experimenting with, what I accomplished, and what I learned.
          </p>
        </motion.header>

        {/* Index of builds: each card jumps to its build below */}
        <motion.nav
          {...fadeUp(0.08)}
          id="builds-index"
          aria-label="Builds on this page"
          className="mt-10 scroll-mt-4"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
            {total} builds on this page
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
            {ordered.map((b, i) => (
              <li key={b.id} className="flex">
                <a
                  href={`#${b.id}`}
                  className="group flex w-full flex-col rounded-2xl border border-stone-200/70 bg-white px-5 py-5 transition-[border-color,box-shadow,transform] duration-[250ms] hover:border-[rgba(109,94,245,0.3)] hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)] motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D5EF5]/40"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-[1.1rem] leading-none text-stone-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="font-display mt-4 text-[1.05rem] font-medium leading-snug tracking-[-0.015em] text-stone-900 transition-colors duration-[250ms] group-hover:text-[#6D5EF5]">
                    {b.title}
                  </p>
                  <p className="mt-2 flex-1 text-[13px] leading-[1.6] text-stone-500">{b.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#6D5EF5]">
                    View build
                    <svg
                      aria-hidden
                      className="h-3 w-3 transition-transform duration-[250ms] motion-safe:group-hover:translate-y-0.5"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>

        <div className="mt-16 border-t border-stone-200/80 pt-14 sm:mt-20 sm:pt-16">
          {ordered.map((b, i) => {
            const number = String(i + 1).padStart(2, "0");
            return b.id === "intake-specialist" ? (
              <IntakeSpecialistBuild key={b.id} build={b} number={number} total={total} />
            ) : (
              <BuildShowcase key={b.id} build={b} number={number} total={total} />
            );
          })}
        </div>
      </div>
    </article>
  );
}
