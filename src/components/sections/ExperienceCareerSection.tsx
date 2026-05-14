"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { ExperienceChapter } from "@/content/experience";
import { experienceChapters } from "@/content/experience";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

const ease = [0.22, 1, 0.36, 1] as const;

const DEFAULT_LAUNCH_INTRO =
  "Proof of execution from this chapter—work that depended on the capabilities above lining up under real constraints.";

function projectsBySlugs(slugs: string[]): Project[] {
  const order = new Map(slugs.map((s, i) => [s, i]));
  return projects
    .filter((p) => order.has(p.slug))
    .sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
}

function chapterKey(organization: string) {
  return organization
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ThinkingBody({
  text,
  mode = "default",
}: {
  text: string;
  mode?: "default" | "editorial";
}) {
  const parts = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  if (mode === "editorial") {
    return (
      <div className="mt-7 max-w-[min(100%,31rem)]">
        {parts.map((para, i) => (
          <p
            key={i}
            className="text-[15px] leading-[1.82] text-stone-600 sm:text-base sm:leading-[1.8] [&+&]:mt-6"
          >
            {para}
          </p>
        ))}
      </div>
    );
  }
  return (
    <div className="mt-4 max-w-[min(100%,38rem)] border-l border-stone-200 pl-4 sm:pl-5">
      {parts.map((para, i) => (
        <p
          key={i}
          className="text-[14px] leading-[1.78] text-stone-600 sm:text-[15px] sm:leading-[1.76] [&+&]:mt-4"
        >
          {para}
        </p>
      ))}
    </div>
  );
}

type LaunchCardProps = { project: Project; index: number };

function WorkSafeLaunchCard({ project, index }: LaunchCardProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.42,
        delay: reduceMotion ? 0 : index * 0.05,
        ease,
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col rounded-xl border border-stone-200/70 bg-white px-7 py-8 transition-[border-color,box-shadow,transform] duration-300 hover:border-stone-300/90 hover:shadow-[0_20px_48px_-36px_rgba(28,25,23,0.14)] motion-safe:hover:-translate-y-px sm:px-8 sm:py-9"
      >
        <h5 className="font-display text-[1.05rem] font-medium tracking-[-0.02em] text-stone-900 transition-colors group-hover:text-accent-strong sm:text-[1.125rem]">
          {project.title}
        </h5>
        <p className="mt-3 text-[13px] font-medium leading-snug text-stone-800 sm:text-sm">
          {project.tagline}
        </p>
        <p className="mt-4 flex-1 text-[13px] leading-relaxed text-stone-600 sm:text-[14px] sm:leading-[1.65]">
          {project.summary}
        </p>
        <ul className="mt-7 flex flex-wrap gap-x-2.5 gap-y-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm bg-stone-100/50 px-1.5 py-0.5 text-[10px] font-normal tracking-wide text-stone-500 sm:text-[11px]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </motion.article>
  );
}

type ChapterBlockProps = {
  chapter: ExperienceChapter;
  chapterProjects: Project[];
  keySlug: string;
  index: number;
  reduceMotion: boolean | null;
};

function WorkSafeBcChapterBlock({
  chapter,
  chapterProjects,
  keySlug,
  index,
  reduceMotion,
}: ChapterBlockProps) {
  return (
    <motion.div
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
        className="overflow-hidden rounded-2xl border border-stone-200/75 bg-white shadow-[0_1px_0_rgba(255,255,255,0.95)_inset]"
      >
        <div className="px-6 pb-4 pt-14 sm:px-10 sm:pb-6 sm:pt-16 lg:px-12 lg:pt-[4.25rem]">
          {/* 1. Experience header */}
          <header>
            <p className="font-display text-[clamp(1.85rem,2.4vw+1.05rem,2.65rem)] font-medium tracking-[-0.035em] text-stone-900">
              {chapter.organization}
            </p>
            <h3 className="font-display mt-6 max-w-[min(100%,44rem)] text-[clamp(1.2rem,1.1vw+0.95rem,1.55rem)] font-medium leading-[1.28] tracking-[-0.022em] text-stone-900 sm:mt-7">
              {chapter.role}
            </h3>
            <p className="mt-4 text-[11px] font-normal uppercase tracking-[0.14em] text-stone-400 sm:text-xs sm:tracking-[0.13em]">
              {chapter.period}
            </p>
          </header>

          {/* 2. Narrative intro */}
          <div className="mt-14 sm:mt-16 lg:mt-[4.25rem]">
            <p className="max-w-[min(100%,38rem)] font-display text-[clamp(1.02rem,0.55vw+0.88rem,1.2rem)] font-normal leading-[1.58] tracking-[-0.014em] text-stone-700 text-pretty">
              {chapter.scopeSummary}
            </p>
          </div>

          {/* 3. Focus Areas */}
          <section
            className="mt-16 sm:mt-[4.5rem] lg:mt-20"
            aria-labelledby={`chapter-${keySlug}-focus`}
          >
            <h4
              id={`chapter-${keySlug}-focus`}
              className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
            >
              Focus Areas
            </h4>
            <ul className="mt-7 max-w-[min(100%,36rem)] space-y-4 text-[15px] leading-[1.68] text-stone-700 sm:text-[15px] sm:leading-[1.7]">
              {chapter.focusAreas.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <span
                    className="mt-[0.62em] h-px w-3 shrink-0 bg-stone-200/90"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. How My Thinking Evolved */}
          <section
            className="mt-16 sm:mt-[4.5rem] lg:mt-20"
            aria-labelledby={`chapter-${keySlug}-thinking`}
          >
            <h4
              id={`chapter-${keySlug}-thinking`}
              className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
            >
              How My Thinking Evolved
            </h4>
            <ThinkingBody text={chapter.thinkingEvolved} mode="editorial" />
          </section>

          {/* 5. Capabilities Developed */}
          <section
            className="mt-16 pb-2 sm:mt-[4.5rem] sm:pb-4 lg:mt-20"
            aria-labelledby={`chapter-${keySlug}-capabilities`}
          >
            <h4
              id={`chapter-${keySlug}-capabilities`}
              className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
            >
              Capabilities Developed
            </h4>
            <div className="mt-7 max-w-[min(100%,38rem)] space-y-5">
              {chapter.capabilityRows.map((row) => (
                <p
                  key={row}
                  className="font-display text-[14px] font-normal leading-[1.68] tracking-[-0.01em] text-stone-700 sm:text-[15px] sm:leading-[1.7]"
                >
                  {row}
                </p>
              ))}
            </div>
          </section>
        </div>

        {/* 6–7. Selected Launches — single major separator from body */}
        {chapterProjects.length > 0 ? (
          <footer className="border-t border-stone-200/35 bg-[#faf9f6]/50 px-6 pb-14 pt-16 sm:px-10 sm:pb-16 sm:pt-20 lg:px-12 lg:pb-[4.5rem] lg:pt-24">
            <h4 className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400">
              Selected Launches
            </h4>
            <p className="mt-5 max-w-[min(100%,36rem)] text-[13px] leading-[1.72] text-stone-600 sm:text-sm sm:leading-[1.75]">
              {chapter.launchIntro ?? DEFAULT_LAUNCH_INTRO}
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-12 lg:gap-8">
              {chapterProjects.map((project, pIndex) => (
                <WorkSafeLaunchCard key={project.slug} project={project} index={pIndex} />
              ))}
            </div>
          </footer>
        ) : null}
      </article>
    </motion.div>
  );
}

function DefaultChapterBlock({
  chapter,
  chapterProjects,
  keySlug,
  index,
  reduceMotion,
}: ChapterBlockProps) {
  return (
    <motion.div
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
            aria-labelledby={`chapter-${keySlug}-focus`}
          >
            <h4
              id={`chapter-${keySlug}-focus`}
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
            aria-labelledby={`chapter-${keySlug}-thinking`}
          >
            <h4
              id={`chapter-${keySlug}-thinking`}
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-stone-500"
            >
              How my thinking evolved
            </h4>
            <ThinkingBody text={chapter.thinkingEvolved} />
          </section>

          <section
            className="border-b border-stone-200/55 py-6 sm:py-7"
            aria-labelledby={`chapter-${keySlug}-capabilities`}
          >
            <h4
              id={`chapter-${keySlug}-capabilities`}
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
              {chapter.launchIntro ?? DEFAULT_LAUNCH_INTRO}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
              {chapterProjects.map((project, pIndex) => (
                <ProjectCard key={project.slug} project={project} index={pIndex} />
              ))}
            </div>
          </footer>
        ) : null}
      </article>
    </motion.div>
  );
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
            const slug = chapterKey(chapter.organization);
            const props: ChapterBlockProps = {
              chapter,
              chapterProjects,
              keySlug: slug,
              index,
              reduceMotion,
            };

            if (chapter.organization === "WorkSafeBC") {
              return <WorkSafeBcChapterBlock key={`${chapter.organization}-${chapter.period}`} {...props} />;
            }
            return <DefaultChapterBlock key={`${chapter.organization}-${chapter.period}`} {...props} />;
          })}
        </div>
      </div>
    </SectionFrame>
  );
}
