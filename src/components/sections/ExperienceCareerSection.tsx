"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { experienceChapters } from "@/content/experience";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

const ease = [0.22, 1, 0.36, 1] as const;

function projectsBySlugs(slugs: string[]): Project[] {
  const order = new Map(slugs.map((s, i) => [s, i]));
  return projects
    .filter((p) => order.has(p.slug))
    .sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
}

export function ExperienceCareerSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionFrame id="experience" aria-labelledby="experience-heading">
      <div className="mx-auto w-full max-w-scene">
        <motion.div
          className="min-w-0 max-w-editorial"
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
            className="font-display mt-3 text-[clamp(1.85rem,2.2vw+1.1rem,2.35rem)] font-medium tracking-tight text-stone-900 sm:mt-4 lg:text-[clamp(2rem,1.8vw+1.25rem,2.5rem)]"
          >
            Chapters in the work
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-600 sm:text-base">
            Each role is one composed thread—scope, focus, how my thinking shifted, what
            capabilities formed from that pressure, and the launches that show the
            output. Less résumé, more evolution of a systems-oriented product practice.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-col gap-10 sm:mt-14 sm:gap-12 lg:mt-16 lg:gap-14">
          {experienceChapters.map((chapter, index) => {
            const chapterProjects = projectsBySlugs(chapter.launchSlugs);
            const chapterKey = chapter.organization
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");

            return (
              <motion.div
                key={`${chapter.organization}-${chapter.period}`}
                className="relative"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-48px" }}
                transition={{
                  duration: 0.52,
                  delay: reduceMotion ? 0 : index * 0.06,
                  ease,
                }}
              >
                <article
                  aria-label={`${chapter.role} at ${chapter.organization}`}
                  className={[
                    "overflow-hidden rounded-2xl border border-stone-200/85",
                    "bg-gradient-to-b from-white to-stone-50/[0.45]",
                    "shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_18px_44px_-28px_rgba(28,25,23,0.22)]",
                    "ring-1 ring-stone-200/35",
                  ].join(" ")}
                >
                  <div className="border-b border-stone-200/60 px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
                    <p className="text-[12px] font-normal leading-relaxed text-stone-500 sm:text-[13px]">
                      <span className="font-medium text-stone-600">{chapter.period}</span>
                      <span className="mx-2 text-stone-300" aria-hidden>
                        ·
                      </span>
                      <span className="text-stone-700">{chapter.organization}</span>
                    </p>
                    <h3 className="font-display mt-3 max-w-editorial text-[clamp(1.25rem,1.1vw+1.05rem,1.5rem)] font-medium leading-snug tracking-tight text-stone-900 sm:mt-3.5">
                      {chapter.role}
                    </h3>
                    <p className="mt-4 max-w-editorial text-[15px] leading-[1.72] text-stone-600 sm:text-base sm:leading-[1.7]">
                      {chapter.scopeSummary}
                    </p>
                  </div>

                  <div className="space-y-0 px-5 sm:px-7 lg:px-8">
                    <section
                      className="border-b border-stone-200/55 py-6 sm:py-7"
                      aria-labelledby={`chapter-${chapterKey}-focus`}
                    >
                      <h4
                        id={`chapter-${chapterKey}-focus`}
                        className="text-[11px] font-medium uppercase tracking-[0.16em] text-stone-500"
                      >
                        Focus areas
                      </h4>
                      <ul className="mt-4 max-w-editorial space-y-2.5 text-[15px] leading-relaxed text-stone-700 sm:text-[15px]">
                        {chapter.focusAreas.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span
                              className="mt-[0.55em] h-px w-3 shrink-0 bg-stone-300/90"
                              aria-hidden
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section
                      className="border-b border-stone-200/55 py-6 sm:py-7"
                      aria-labelledby={`chapter-${chapterKey}-thinking`}
                    >
                      <h4
                        id={`chapter-${chapterKey}-thinking`}
                        className="text-[11px] font-medium uppercase tracking-[0.16em] text-stone-500"
                      >
                        How my thinking evolved
                      </h4>
                      <div className="mt-4 max-w-[min(100%,38rem)] border-l border-stone-200 pl-4 sm:pl-5">
                        <p className="text-[14px] leading-[1.78] text-stone-600 sm:text-[15px] sm:leading-[1.76]">
                          {chapter.thinkingEvolved}
                        </p>
                      </div>
                    </section>

                    <section
                      className="border-b border-stone-200/55 py-6 sm:py-7"
                      aria-labelledby={`chapter-${chapterKey}-capabilities`}
                    >
                      <h4
                        id={`chapter-${chapterKey}-capabilities`}
                        className="text-[11px] font-medium uppercase tracking-[0.16em] text-stone-500"
                      >
                        Capabilities developed
                      </h4>
                      <div className="mt-4 max-w-editorial space-y-3.5">
                        {chapter.capabilityRows.map((row) => (
                          <p
                            key={row}
                            className="border-b border-stone-200/45 pb-3.5 text-[13px] leading-[1.72] text-stone-600 last:border-b-0 last:pb-0 sm:text-[14px] sm:leading-[1.74]"
                          >
                            {row}
                          </p>
                        ))}
                      </div>
                    </section>
                  </div>

                  {chapterProjects.length > 0 ? (
                    <footer className="border-t border-stone-200/50 bg-stone-50/30 px-5 py-6 sm:px-7 sm:py-8 lg:px-8">
                      <h4 className="text-[11px] font-medium uppercase tracking-[0.16em] text-stone-500">
                        Selected launches
                      </h4>
                      <p className="mt-2 max-w-editorial text-[13px] leading-relaxed text-stone-500 sm:text-sm">
                        Proof of execution from this chapter—work that depended on the
                        capabilities above lining up under real constraints.
                      </p>
                      <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
                        {chapterProjects.map((project, pIndex) => (
                          <ProjectCard
                            key={project.slug}
                            project={project}
                            index={pIndex}
                          />
                        ))}
                      </div>
                    </footer>
                  ) : null}
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionFrame>
  );
}
