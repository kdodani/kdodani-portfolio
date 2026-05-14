"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/content/projects";

const ease = [0.22, 1, 0.36, 1] as const;

export function FeaturedProjects() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-stone-200/80">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
        <div id="builds" className="scroll-mt-24">
          <motion.div
            className="max-w-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
              Builds
            </p>
            <h2 className="font-display mt-5 text-3xl font-medium tracking-tight text-stone-900 sm:mt-6 sm:text-[2rem] lg:text-4xl">
              Systems that had to be right the first time.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone-600 sm:mt-7 sm:text-lg">
              A few launches where scope, risk, and narrative had to line up—AI agents,
              identity migrations, clinical integrations, and finance-grade digitization.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
