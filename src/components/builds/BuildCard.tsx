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
          "group flex h-full flex-col rounded-2xl border border-stone-200/70 bg-white",
          "px-6 py-6 sm:px-7 sm:py-7",
          "transition-[border-color,box-shadow,transform] duration-[250ms]",
          "hover:border-[rgba(109,94,245,0.22)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)]",
          "motion-safe:hover:-translate-y-1",
        ].join(" ")}
      >
        <h3 className="font-display text-[1.05rem] font-medium tracking-[-0.02em] text-stone-900 transition-colors duration-[250ms] group-hover:text-[#6D5EF5] sm:text-[1.125rem]">
          {build.title}
        </h3>
        <p className="mt-3 flex-1 text-[13px] leading-relaxed text-stone-600 sm:text-[14px] sm:leading-[1.65]">
          {build.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-1.5 sm:mt-6">
          {build.tags.map((tag) => (
            <li key={tag} className="chip">
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
              className="text-[13px] font-medium text-stone-600 underline-offset-4 transition-colors duration-[250ms] hover:text-[#6D5EF5] hover:underline"
            >
              {build.linkLabel ?? "View"}
            </a>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
