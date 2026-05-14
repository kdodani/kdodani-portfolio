"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { experienceEntries } from "@/content/experience";
import { projects } from "@/content/projects";

const ease = [0.22, 1, 0.36, 1] as const;

export function ExperienceCareerSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="scroll-mt-section border-t border-stone-200/80"
      aria-labelledby="experience-heading experience-launches-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-section-pad sm:px-8 lg:px-10">
        <div className="min-w-0 max-w-2xl lg:max-w-xl xl:max-w-2xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-56px" }}
            transition={{ duration: 0.5, ease }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
              Experience
            </p>
            <h2
              id="experience-heading"
              className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:mt-4 sm:text-[2rem] lg:text-4xl"
            >
              Experience &amp; Skills
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-600 sm:text-base">
              A single thread from growth experimentation to platform systems and
              AI-native product work—how breadth turned into depth, and how that shows up
              in launches below.
            </p>
          </motion.div>

          <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:mt-12 sm:text-xs">
            Career timeline
          </p>
          <ol className="mt-4 flex flex-col gap-4 sm:mt-5 sm:gap-5">
            {experienceEntries.map((entry, index) => (
              <motion.li
                key={`${entry.organization}-${entry.period}`}
                className="relative"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-48px" }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.05, ease }}
              >
                <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm shadow-stone-900/[0.035] ring-1 ring-stone-200/40 transition-[border-color,box-shadow,transform] duration-300 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md motion-safe:hover:shadow-stone-900/[0.06] hover:border-stone-200 hover:ring-stone-200/60 sm:p-6">
                  <p className="text-[13px] font-normal leading-relaxed text-stone-500 sm:text-sm">
                    <span className="text-stone-600">{entry.period}</span>
                    <span className="mx-2 text-stone-400" aria-hidden>
                      ·
                    </span>
                    <span className="text-stone-700">{entry.organization}</span>
                  </p>
                  <h3 className="font-display mt-3 text-xl font-medium leading-snug tracking-tight text-stone-900 sm:mt-3.5 sm:text-2xl sm:leading-tight">
                    {entry.role}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.72] text-stone-600 sm:text-base sm:leading-[1.7]">
                    {entry.summary}
                  </p>
                  <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500">
                    {entry.listLabel}:
                  </p>
                  <ul className="mt-3 space-y-2.5 pl-0.5 text-[15px] leading-relaxed text-stone-600 sm:text-[15px]">
                    {entry.bullets.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          className="mt-[0.55em] h-px w-3 shrink-0 bg-accent-mid/55"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-16 border-t border-stone-200/70 pt-14 sm:mt-20 sm:pt-16 lg:mt-20">
          <motion.div
            className="max-w-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-56px" }}
            transition={{ duration: 0.5, ease }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
              Selected launches
            </p>
            <h2
              id="experience-launches-heading"
              className="font-display mt-3 text-2xl font-medium tracking-tight text-stone-900 sm:mt-4 sm:text-[1.75rem] lg:text-3xl"
            >
              Systems that had to be right the first time.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-600 sm:text-base sm:text-lg">
              A few launches where scope, risk, and narrative had to line up—AI agents,
              identity migrations, clinical integrations, and finance-grade digitization.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
