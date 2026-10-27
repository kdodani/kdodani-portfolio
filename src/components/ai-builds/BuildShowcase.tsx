"use client";

import { motion } from "framer-motion";
import type { BuildEntry } from "@/content/builds";
import {
  BuildEyebrow,
  BulletList,
  CARD,
  CARD_PAD,
  SECTION,
  StatusPill,
  useFadeUp,
} from "./ui";

/** Generic layout for builds without a bespoke page section. */
export function BuildShowcase({
  build,
  number,
  total,
}: {
  build: BuildEntry;
  number: string;
  total: number;
}) {
  const fadeUp = useFadeUp();

  const columns = [
    { label: "What I experimented with", items: build.experimented },
    { label: "What was accomplished", items: build.accomplished },
    { label: "What I learned", items: build.learnings },
  ];

  return (
    <section id={build.id} className={`scroll-mt-4 ${SECTION} border-t border-stone-200/80 pt-14 sm:pt-16`}>
      <motion.div {...fadeUp(0)}>
        <BuildEyebrow number={number} total={total} />
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 className="font-display text-[clamp(1.6rem,2vw+1rem,2.2rem)] font-medium tracking-[-0.03em] text-stone-900">
            {build.title}
          </h2>
          <StatusPill>{build.status}</StatusPill>
        </div>
        <p className="mt-2 text-[15px] font-medium leading-snug text-accent/90 sm:text-base">
          {build.tagline}
        </p>
        <p className="mt-4 max-w-[min(100%,42rem)] text-[14px] leading-[1.72] text-stone-600 sm:text-[15px]">
          {build.context}
        </p>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
        {columns.map((col, i) => (
          <motion.div key={col.label} {...fadeUp(0.05 + i * 0.07)} className={`${CARD} ${CARD_PAD}`}>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
              {col.label}
            </p>
            <BulletList items={col.items} />
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp(0.1)} className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">Tech stack</p>
        <ul className="mt-2.5 flex flex-wrap gap-2">
          {build.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
        {build.href ? (
          <p className="mt-4 text-[13px]">
            <a
              href={build.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-stone-600 underline-offset-4 transition-colors hover:text-[#6D5EF5] hover:underline"
            >
              {build.linkLabel ?? "View"}
            </a>
          </p>
        ) : null}
      </motion.div>
    </section>
  );
}
