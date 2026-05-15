"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { BuildEntry } from "@/content/builds";
import { fadeUpInitial, motionDelay } from "@/lib/motion";

type Props = {
  build: BuildEntry;
  index: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function BuildCard({ build, index }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={fadeUpInitial(reduceMotion, 12)}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.42,
        delay: motionDelay(reduceMotion, index * 0.05),
        ease,
      }}
      className="h-full"
    >
      <div
        className={[
          "flex h-full flex-col rounded-xl border border-stone-200/70 bg-white",
          "px-6 py-6 sm:px-7 sm:py-7",
          "transition-[border-color,box-shadow,transform] duration-300",
          "hover:border-stone-300/90 hover:shadow-[0_20px_48px_-36px_rgba(28,25,23,0.14)]",
          "motion-safe:hover:-translate-y-px",
        ].join(" ")}
      >
        <h3 className="font-display text-[1.05rem] font-medium tracking-[-0.02em] text-stone-900 sm:text-[1.125rem]">
          {build.title}
        </h3>
        <p className="mt-3 flex-1 text-[13px] leading-relaxed text-stone-600 sm:text-[14px] sm:leading-[1.65]">
          {build.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-2.5 gap-y-1.5 sm:mt-6">
          {build.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm bg-stone-100/50 px-1.5 py-0.5 text-[10px] font-normal tracking-wide text-stone-500 sm:text-[11px]"
            >
              {tag}
            </li>
          ))}
        </ul>
        {build.href ? (
          <div className="mt-5 border-t border-stone-200/50 pt-4 sm:mt-6">
            <a
              href={build.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-stone-700 underline-offset-4 transition-colors hover:text-stone-900 hover:underline"
            >
              {build.linkLabel ?? "View"}
            </a>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
