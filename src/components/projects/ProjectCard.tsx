"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/content/types";
import { fadeUpInitial, motionDelay } from "@/lib/motion";

type Props = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={fadeUpInitial(reduceMotion, 16)}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: motionDelay(reduceMotion, index * 0.06),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white/90 p-px shadow-sm transition-[border-color,box-shadow,transform] duration-[250ms] hover:border-[rgba(109,94,245,0.22)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] motion-safe:hover:-translate-y-1"
      >
        <div className="flex h-full flex-col rounded-[15px] bg-gradient-to-b from-white to-stone-50/80 p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500">
                {project.year}
              </p>
              <h3 className="font-display mt-2 text-xl font-medium tracking-tight text-stone-900 transition-colors duration-[250ms] group-hover:text-[#6D5EF5] sm:text-[1.35rem]">
                {project.title}
              </h3>
            </div>
            <span
              className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200/90 bg-white text-stone-500 transition-all duration-[250ms] group-hover:border-[rgba(109,94,245,0.25)] group-hover:bg-[rgba(109,94,245,0.06)] group-hover:text-[#6D5EF5]"
              aria-hidden
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M5 3h8v8M13 3L4 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          <p className="mt-1 text-sm font-medium text-[#6D5EF5]/80">{project.tagline}</p>

          <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-600">{project.summary}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.article>
  );
}
