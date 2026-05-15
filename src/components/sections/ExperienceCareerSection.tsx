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

// ─────────────────────────────────────────────────────────────────────────────
// Technical Safety BC — component-local structured data
// ─────────────────────────────────────────────────────────────────────────────

const TSBC_FOCUS_CLUSTERS = [
  {
    label: "Analytics & Insights",
    tags: ["Retention analytics", "RFM modeling", "Churn analysis", "Behavioral cohorts", "Survey design"],
  },
  {
    label: "Product & Workflow Design",
    tags: ["Journey mapping", "Friction analysis", "Roadmapping", "Feature prioritization"],
  },
  {
    label: "AI & Automation",
    tags: ["NLP classification", "Knowledge retrieval", "Email automation", "Operational intelligence"],
  },
  {
    label: "Operations & Delivery",
    tags: ["Cross-functional delivery", "Change management", "Agile execution", "Stakeholder alignment"],
  },
  {
    label: "Regulated Systems",
    tags: ["Compliance-aware design", "Policy integration", "Trust-first product", "Audit processes"],
  },
];

const TSBC_EVOLUTION_STAGES = [
  {
    stage: "Analyst",
    description:
      "Built the measurement foundation — RFM models, retention dashboards, behavioral cohort analysis.",
  },
  {
    stage: "Workflow Thinker",
    description:
      "Mapped friction across regulated operational journeys to identify where product could create leverage.",
  },
  {
    stage: "Product Manager",
    description:
      "Owned roadmap, stakeholder alignment, and delivery across growth and retention surfaces.",
  },
  {
    stage: "AI-Native Product Thinking",
    description:
      "Identified NLP opportunities in operational workflows — classification, retrieval, and intelligence at scale.",
  },
];

type TsbcSubProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

type TsbcProject = {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  tags: string[];
  subProjects?: TsbcSubProject[];
};

const TSBC_PROJECTS: TsbcProject[] = [
  {
    id: "churn-dashboard",
    title: "Churn & Retention Dashboard",
    tagline: "Behavioral analytics for lifecycle intervention",
    summary:
      "Segmentation-driven retention dashboard surfacing at-risk accounts by behavioral signals, enabling targeted lifecycle interventions and measurable churn reduction.",
    tags: ["Retention", "Analytics", "Segmentation", "Behavioral Design"],
  },
  {
    id: "remote-assessment",
    title: "Remote Assessment Platform",
    tagline: "Operational workflow redesign for regulated inspections",
    summary:
      "Redesigned the remote assessment workflow for regulated technical inspections — reducing friction for both clients and assessors while maintaining compliance integrity.",
    tags: ["Workflow Design", "Regulated Systems", "Operational UX", "Change Management"],
  },
  {
    id: "ai-operational-systems",
    title: "AI-Powered Operational Systems",
    tagline: "NLP capabilities embedded in operational workflows",
    summary:
      "We invested in foundational NLP capabilities and continuously identified operational workflows where they could create leverage — including knowledge retrieval, email classification, and operational intelligence systems.",
    tags: ["NLP", "AI", "Operational Intelligence", "Workflow Automation"],
    subProjects: [
      {
        id: "internal-chatbot",
        title: "Internal AI Chatbot",
        description:
          "Knowledge retrieval system for operational staff — surfacing policy, process, and decision context from internal documentation.",
        tags: ["RAG", "Knowledge Retrieval", "NLP"],
      },
      {
        id: "email-classification",
        title: "Email Classification Engine",
        description:
          "NLP-powered triage system classifying inbound operational emails by intent and urgency, reducing manual routing overhead.",
        tags: ["Classification", "NLP", "Automation"],
      },
      {
        id: "client-impact-dashboard",
        title: "Client Impact Analysis Dashboard",
        description:
          "Operational intelligence layer aggregating client interaction signals to surface risk, satisfaction trends, and intervention opportunities.",
        tags: ["Analytics", "BI", "Operational Intelligence"],
      },
    ],
  },
];

const TSBC_CAPABILITY_GROUPS = [
  {
    label: "Product",
    items: ["Roadmapping", "Prioritization", "Stakeholder alignment", "Discovery & delivery"],
  },
  {
    label: "AI & Data",
    items: ["NLP system design", "Analytics instrumentation", "RFM modeling", "Dashboard design"],
  },
  {
    label: "Workflow Design",
    items: ["Journey mapping", "Friction analysis", "Operational redesign", "Process optimization"],
  },
  {
    label: "Execution",
    items: ["Agile delivery", "Change management", "Cross-functional coordination"],
  },
  {
    label: "Business",
    items: ["Retention strategy", "Growth analytics", "Experimentation", "Lifecycle engagement"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TSBC project card sub-components
// ─────────────────────────────────────────────────────────────────────────────

type TsbcProjectCardProps = {
  project: TsbcProject;
  index: number;
  reduceMotion: boolean | null;
};

function TsbcProjectCard({ project, index, reduceMotion }: TsbcProjectCardProps) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.42, delay: reduceMotion ? 0 : index * 0.05, ease }}
      className="flex h-full flex-col rounded-xl border border-stone-200/70 bg-white px-7 py-8 sm:px-8 sm:py-9"
    >
      <h5 className="font-display text-[1.05rem] font-medium tracking-[-0.02em] text-stone-900 sm:text-[1.125rem]">
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
    </motion.article>
  );
}

function TsbcAiSystemsCard({ project, index, reduceMotion }: TsbcProjectCardProps) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.42, delay: reduceMotion ? 0 : index * 0.05, ease }}
      className="col-span-full flex flex-col rounded-xl border border-stone-200/70 bg-white px-7 py-8 sm:px-8 sm:py-9"
    >
      <h5 className="font-display text-[1.05rem] font-medium tracking-[-0.02em] text-stone-900 sm:text-[1.125rem]">
        {project.title}
      </h5>
      <p className="mt-3 text-[13px] font-medium leading-snug text-stone-800 sm:text-sm">
        {project.tagline}
      </p>
      <p className="mt-4 text-[13px] leading-relaxed text-stone-600 sm:text-[14px] sm:leading-[1.65]">
        {project.summary}
      </p>
      <ul className="mt-5 flex flex-wrap gap-x-2.5 gap-y-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-sm bg-stone-100/50 px-1.5 py-0.5 text-[10px] font-normal tracking-wide text-stone-500 sm:text-[11px]"
          >
            {tag}
          </li>
        ))}
      </ul>
      {project.subProjects && (
        <div className="mt-8 grid gap-4 border-t border-stone-200/50 pt-7 sm:grid-cols-3 sm:gap-5">
          {project.subProjects.map((sub) => (
            <div
              key={sub.id}
              className="rounded-lg border border-stone-200/60 bg-stone-50/40 px-5 py-5"
            >
              <p className="font-display text-[13px] font-medium tracking-[-0.012em] text-stone-800 sm:text-[14px]">
                {sub.title}
              </p>
              <p className="mt-2 text-[12px] leading-[1.72] text-stone-600 sm:text-[13px]">
                {sub.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-1.5 gap-y-1">
                {sub.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-sm bg-stone-100/70 px-1.5 py-0.5 text-[10px] font-normal tracking-wide text-stone-500"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Technical Safety BC — main chapter block
// ─────────────────────────────────────────────────────────────────────────────

type TsbcChapterBlockProps = {
  chapter: ExperienceChapter;
  keySlug: string;
  index: number;
  reduceMotion: boolean | null;
};

function TechnicalSafetyBcChapterBlock({
  chapter,
  keySlug,
  index,
  reduceMotion,
}: TsbcChapterBlockProps) {
  return (
    <motion.div
      className="relative"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.52, delay: reduceMotion ? 0 : index * 0.06, ease }}
    >
      <article
        aria-label={`${chapter.role} at ${chapter.organization}`}
        className="overflow-hidden rounded-2xl border border-stone-200/75 bg-white shadow-[0_1px_0_rgba(255,255,255,0.95)_inset]"
      >
        {/* ── Main body ── */}
        <div className="px-6 pb-4 pt-14 sm:px-10 sm:pb-6 sm:pt-16 lg:px-12 lg:pt-[4.25rem]">

          {/* 1. Header */}
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

          {/* 2. Intro */}
          <div className="mt-14 sm:mt-16 lg:mt-[4.25rem]">
            <p className="max-w-[min(100%,38rem)] font-display text-[clamp(1.02rem,0.55vw+0.88rem,1.2rem)] font-normal leading-[1.58] tracking-[-0.014em] text-stone-700 text-pretty">
              {chapter.scopeSummary}
            </p>
          </div>

          {/* 3. Focus Areas — grouped capability clusters */}
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
            <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              {TSBC_FOCUS_CLUSTERS.map((cluster) => (
                <div key={cluster.label}>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500">
                    {cluster.label}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cluster.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-stone-100/70 px-2 py-0.5 text-[11px] font-normal leading-relaxed text-stone-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Thinking Evolution — vertical timeline */}
          <section
            className="mt-16 pb-2 sm:mt-[4.5rem] sm:pb-4 lg:mt-20"
            aria-labelledby={`chapter-${keySlug}-evolution`}
          >
            <h4
              id={`chapter-${keySlug}-evolution`}
              className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
            >
              Thinking Evolution
            </h4>
            <div className="mt-7 max-w-[min(100%,34rem)]">
              {TSBC_EVOLUTION_STAGES.map((item, i) => (
                <div key={item.stage} className="flex gap-5">
                  <div className="flex flex-col items-center" aria-hidden>
                    <div className="mt-[0.35em] h-2 w-2 shrink-0 rounded-full bg-stone-300" />
                    {i < TSBC_EVOLUTION_STAGES.length - 1 && (
                      <div className="my-1 w-px flex-1 bg-stone-200" />
                    )}
                  </div>
                  <div className={i < TSBC_EVOLUTION_STAGES.length - 1 ? "pb-7" : ""}>
                    <p className="font-display text-[14px] font-medium leading-snug tracking-[-0.012em] text-stone-800 sm:text-[15px]">
                      {item.stage}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-[1.68] text-stone-500 sm:text-[14px] sm:leading-[1.7]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Footer: Select Work + Capabilities Developed ── */}
        <footer className="border-t border-stone-200/35 bg-[#faf9f6]/50 px-6 pb-14 pt-16 sm:px-10 sm:pb-16 sm:pt-20 lg:px-12 lg:pb-[4.5rem] lg:pt-24">

          {/* 5. Select Work */}
          <section aria-labelledby={`chapter-${keySlug}-work`}>
            <h4
              id={`chapter-${keySlug}-work`}
              className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
            >
              Select Work
            </h4>
            <p className="mt-5 max-w-[min(100%,36rem)] text-[13px] leading-[1.72] text-stone-600 sm:text-sm sm:leading-[1.75]">
              Proof of execution across analytics, workflow redesign, and AI-native operational tooling.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-12 lg:gap-8">
              {TSBC_PROJECTS.map((project, pIndex) =>
                project.subProjects ? (
                  <TsbcAiSystemsCard
                    key={project.id}
                    project={project}
                    index={pIndex}
                    reduceMotion={reduceMotion}
                  />
                ) : (
                  <TsbcProjectCard
                    key={project.id}
                    project={project}
                    index={pIndex}
                    reduceMotion={reduceMotion}
                  />
                )
              )}
            </div>
          </section>

          {/* 6. Capabilities Developed */}
          <section
            className="mt-14 border-t border-stone-200/30 pt-14 sm:mt-16 sm:pt-16"
            aria-labelledby={`chapter-${keySlug}-capabilities`}
          >
            <h4
              id={`chapter-${keySlug}-capabilities`}
              className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
            >
              Capabilities Developed
            </h4>
            <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {TSBC_CAPABILITY_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500">
                    {group.label}
                  </p>
                  <p className="mt-2.5 font-display text-[13px] font-normal leading-[1.72] tracking-[-0.008em] text-stone-600 sm:text-[14px]">
                    {group.items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </footer>
      </article>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// Convertus — compact chapter (no project routes)
// ─────────────────────────────────────────────────────────────────────────────

const CONVERTUS_LAUNCH_CARDS: TsbcProject[] = [
  {
    id: "performance-forecasting",
    title: "Performance Forecasting Tool",
    tagline: "Analytics Tooling · Forecasting · Experimentation",
    summary:
      "Built a Sheets + Supermetrics forecasting model to predict organic search performance with ~85% accuracy and support strategic SEO planning.",
    tags: ["Analytics Tooling", "Forecasting", "Experimentation"],
  },
  {
    id: "portfolio-growth",
    title: "Portfolio Growth Optimization",
    tagline: "Growth Strategy · SEO Analytics · Operations",
    summary:
      "Developed scalable organic growth strategies across 75+ websites, improving acquisition performance and standardizing reporting workflows.",
    tags: ["Growth Strategy", "SEO Analytics", "Operations"],
  },
];

type ConvertusChapterBlockProps = {
  chapter: ExperienceChapter;
  keySlug: string;
  index: number;
  reduceMotion: boolean | null;
};

function ConvertusChapterBlock({
  chapter,
  keySlug,
  index,
  reduceMotion,
}: ConvertusChapterBlockProps) {
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
        <div className="px-6 pb-3 pt-12 sm:px-10 sm:pb-4 sm:pt-14 lg:px-12 lg:pt-16">
          <header>
            <p className="font-display text-[clamp(1.85rem,2.4vw+1.05rem,2.65rem)] font-medium tracking-[-0.035em] text-stone-900">
              {chapter.organization}
            </p>
            <h3 className="font-display mt-5 max-w-[min(100%,44rem)] text-[clamp(1.2rem,1.1vw+0.95rem,1.55rem)] font-medium leading-[1.28] tracking-[-0.022em] text-stone-900 sm:mt-6">
              {chapter.role}
            </h3>
            <p className="mt-3.5 text-[11px] font-normal uppercase tracking-[0.14em] text-stone-400 sm:mt-4 sm:text-xs sm:tracking-[0.13em]">
              {chapter.period}
            </p>
          </header>

          <div className="mt-10 sm:mt-12 lg:mt-14">
            <p className="max-w-[min(100%,38rem)] font-display text-[clamp(1.02rem,0.55vw+0.88rem,1.2rem)] font-normal leading-[1.58] tracking-[-0.014em] text-stone-700 text-pretty">
              {chapter.scopeSummary}
            </p>
          </div>

          <section
            className="mt-12 sm:mt-14 lg:mt-16"
            aria-labelledby={`chapter-${keySlug}-focus`}
          >
            <h4
              id={`chapter-${keySlug}-focus`}
              className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
            >
              Focus Areas
            </h4>
            <ul className="mt-6 max-w-[min(100%,36rem)] space-y-3.5 text-[15px] leading-[1.68] text-stone-700 sm:space-y-4 sm:leading-[1.7]">
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

          <section
            className="mt-12 sm:mt-14 lg:mt-16"
            aria-labelledby={`chapter-${keySlug}-thinking`}
          >
            <h4
              id={`chapter-${keySlug}-thinking`}
              className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
            >
              How The Work Evolved
            </h4>
            <ThinkingBody text={chapter.thinkingEvolved} mode="editorial" />
          </section>

          <section
            className="mt-12 pb-1 sm:mt-14 sm:pb-2 lg:mt-16"
            aria-labelledby={`chapter-${keySlug}-capabilities`}
          >
            <h4
              id={`chapter-${keySlug}-capabilities`}
              className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
            >
              Capabilities Developed
            </h4>
            <div className="mt-6 max-w-[min(100%,38rem)]">
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

        <footer className="border-t border-stone-200/35 bg-[#faf9f6]/50 px-6 pb-12 pt-12 sm:px-10 sm:pb-14 sm:pt-14 lg:px-12 lg:pb-16 lg:pt-16">
          <section aria-labelledby={`chapter-${keySlug}-launches`}>
            <h4
              id={`chapter-${keySlug}-launches`}
              className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
            >
              Selected Launches
            </h4>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-10 lg:gap-8">
              {CONVERTUS_LAUNCH_CARDS.map((project, pIndex) => (
                <TsbcProjectCard
                  key={project.id}
                  project={project}
                  index={pIndex}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </section>
        </footer>
      </article>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 180 Degrees Consulting (UBC Chapter) — structured engagements (no project routes)
// ─────────────────────────────────────────────────────────────────────────────

const ONE_EIGHTY_ENGAGEMENTS: TsbcProject[] = [
  {
    id: "ftc-solar",
    title: "FTC Solar",
    tagline: "Policy Analysis · Energy Systems",
    summary:
      "Co-authored a whitepaper analyzing photovoltaic adoption strategies across industrialized and emerging economies. Identified policy barriers, adoption constraints, and strategic opportunities for scalable solar growth.",
    tags: ["Policy Research", "Systems Thinking", "Market Analysis"],
  },
  {
    id: "open-primaries",
    title: "Open Primaries",
    tagline: "Growth Strategy · Audience Analytics",
    summary:
      "Developed a multi-channel outreach strategy to help reach target demographics after political advertising restrictions reduced access to traditional acquisition channels. Created state-specific engagement recommendations, explored alternative marketing channels, and identified opportunities to improve analytics, retention, and funnel performance.",
    tags: ["Growth Strategy", "Audience Segmentation", "Funnel Analysis"],
  },
];

type OneEightyDegreesChapterBlockProps = {
  chapter: ExperienceChapter;
  keySlug: string;
  index: number;
  reduceMotion: boolean | null;
};

function OneEightyDegreesChapterBlock({
  chapter,
  keySlug,
  index,
  reduceMotion,
}: OneEightyDegreesChapterBlockProps) {
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

          <div className="mt-14 sm:mt-16 lg:mt-[4.25rem]">
            <p className="max-w-[min(100%,38rem)] font-display text-[clamp(1.02rem,0.55vw+0.88rem,1.2rem)] font-normal leading-[1.58] tracking-[-0.014em] text-stone-700 text-pretty">
              {chapter.scopeSummary}
            </p>
          </div>

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

        <footer className="border-t border-stone-200/35 bg-[#faf9f6]/50 px-6 pb-14 pt-16 sm:px-10 sm:pb-16 sm:pt-20 lg:px-12 lg:pb-[4.5rem] lg:pt-24">
          <section aria-labelledby={`chapter-${keySlug}-engagements`}>
            <h4
              id={`chapter-${keySlug}-engagements`}
              className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
            >
              Selected Engagements
            </h4>
            <p className="mt-5 max-w-[min(100%,36rem)] text-[13px] leading-[1.72] text-stone-600 sm:text-sm sm:leading-[1.75]">
              {chapter.launchIntro ?? DEFAULT_LAUNCH_INTRO}
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-12 lg:gap-8">
              {ONE_EIGHTY_ENGAGEMENTS.map((project, pIndex) => (
                <TsbcProjectCard
                  key={project.id}
                  project={project}
                  index={pIndex}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </section>
        </footer>
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
            if (chapter.organization === "180 Degrees Consulting (UBC Chapter)") {
              return (
                <OneEightyDegreesChapterBlock
                  key={`${chapter.organization}-${chapter.period}`}
                  chapter={chapter}
                  keySlug={slug}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              );
            }
            if (chapter.organization === "Technical Safety BC") {
              return (
                <TechnicalSafetyBcChapterBlock
                  key={`${chapter.organization}-${chapter.period}`}
                  chapter={chapter}
                  keySlug={slug}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              );
            }
            if (chapter.organization === "Convertus") {
              return (
                <ConvertusChapterBlock
                  key={`${chapter.organization}-${chapter.period}`}
                  chapter={chapter}
                  keySlug={slug}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              );
            }
            return <DefaultChapterBlock key={`${chapter.organization}-${chapter.period}`} {...props} />;
          })}
        </div>
      </div>
    </SectionFrame>
  );
}
