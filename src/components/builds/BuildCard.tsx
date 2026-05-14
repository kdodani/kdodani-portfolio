"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { BuildEntry } from "@/content/builds";

type Props = {
  build: BuildEntry;
  index: number;
};

export function BuildCard({ build, index }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-36px" }}
      transition={{
        duration: 0.42,
        delay: reduceMotion ? 0 : index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <div className="flex h-full flex-col rounded-xl border border-dashed border-accent/20 bg-gradient-to-b from-accent/[0.06] via-white to-white p-5 shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:border-accent/35 hover:shadow-md motion-safe:hover:-translate-y-0.5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-medium tracking-tight text-stone-900 sm:text-xl">
              {build.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-accent-mid/95">{build.tagline}</p>
          </div>
          <span
            className="shrink-0 rounded-md border border-accent/15 bg-accent/[0.08] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-accent-strong/90"
            aria-hidden
          >
            Lab
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:mt-4">{build.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5 sm:mt-5">
          {build.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-stone-200/80 bg-stone-50/90 px-2.5 py-1 text-[11px] font-medium text-stone-600"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4">
          {build.href ? (
            <a
              href={build.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-accent underline-offset-4 hover:text-accent-strong hover:underline"
            >
              {build.linkLabel ?? "Open"}
            </a>
          ) : (
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-400">Notes soon</p>
          )}
        </div>
      </div>
    </motion.article>
  );
}
