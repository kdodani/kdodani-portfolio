"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/content/types";

type Props = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: reduceMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white/90 p-px shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:border-accent/30 hover:shadow-md motion-safe:hover:-translate-y-0.5"
      >
        <div className="flex h-full flex-col rounded-[15px] bg-gradient-to-b from-white to-stone-50/80 p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-stone-500">
                {project.year}
              </p>
              <h3 className="font-display mt-2 text-xl font-medium tracking-tight text-stone-900 transition-colors group-hover:text-accent-strong sm:text-[1.35rem]">
                {project.title}
              </h3>
            </div>
            <span
              className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200/90 bg-white text-stone-500 transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/8 group-hover:text-accent"
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

          <p className="mt-1 text-sm font-medium text-accent/90">{project.tagline}</p>

          <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-600">{project.summary}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-stone-200/80 bg-stone-50/90 px-2.5 py-1 text-[11px] font-medium text-stone-600"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.article>
  );
}
