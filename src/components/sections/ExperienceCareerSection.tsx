"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { ExperienceChapter } from "@/content/experience";
import { experienceChapters } from "@/content/experience";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { fadeUpInitial, motionDelay } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

function AccordionChevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      aria-hidden
      className={`h-3.5 w-3.5 shrink-0 text-stone-400 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FocusPills({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5 sm:mt-5">
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  );
}

function RoleSummary({ text, tight }: { text: string; tight?: boolean }) {
  return (
    <div className={tight ? "mt-5 sm:mt-6 lg:mt-7" : "mt-6 sm:mt-7 lg:mt-8"}>
      <p className="font-display text-[clamp(1.02rem,0.55vw+0.88rem,1.2rem)] font-normal leading-[1.58] tracking-[-0.014em] text-stone-700 text-pretty">
        {text}
      </p>
    </div>
  );
}

function OperatingLens({
  text,
  label = "Operating Lens",
  tight,
}: {
  text: string;
  label?: string;
  tight?: boolean;
}) {
  return (
    <div className={tight ? "mt-4 sm:mt-5" : "mt-5 sm:mt-6"}>
      <div className="flex items-center gap-2">
        <span
          className="h-px w-3 shrink-0 rounded-full bg-gradient-to-r from-[#6D5EF5] to-[#4F8CFF]"
          aria-hidden
        />
        <p className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400">
          {label}
        </p>
      </div>
      <p className="mt-2 text-[14px] leading-[1.65] text-stone-600 sm:text-[15px] sm:leading-[1.68]">
        {text}
      </p>
    </div>
  );
}

function ChapterHeader({ chapter }: { chapter: ExperienceChapter }) {
  return (
    <header>
      <p className="font-display text-[clamp(1.85rem,2.4vw+1.05rem,2.65rem)] font-medium tracking-[-0.035em] text-stone-900">
        {chapter.organization}
      </p>
      <h3 className="gradient-hero-text font-display mt-5 text-[clamp(1.2rem,1.1vw+0.95rem,1.55rem)] font-medium leading-[1.28] tracking-[-0.022em] sm:mt-6">
        {chapter.role}
      </h3>
      <p className="mt-3.5 text-[11px] font-normal uppercase tracking-[0.14em] text-stone-400 sm:mt-4 sm:text-xs sm:tracking-[0.13em]">
        {chapter.period}
      </p>
    </header>
  );
}

const chapterArticleClass =
  "overflow-hidden rounded-2xl border border-stone-200/75 bg-white shadow-[0_1px_0_rgba(255,255,255,0.95)_inset]";

/** Matches horizontal inset inside experience chapter cards */
const chapterContentInsetClass = "px-6 sm:px-10 lg:px-12";

const chapterBodyClass = `${chapterContentInsetClass} pb-5 pt-10 sm:pb-6 sm:pt-12 lg:pt-14`;

const launchesSectionClass =
  "-mx-6 mt-6 border-t border-stone-200/35 bg-[#faf9f6]/50 px-6 pb-1 pt-6 sm:-mx-10 sm:mt-7 sm:px-10 sm:pt-7 lg:-mx-12 lg:px-12";

const launchesGridClass = "mt-5 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-6 lg:gap-7";

function CapabilityPillGrid({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  );
}

function ChapterAccordionSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-t border-stone-200/35 first:border-t-0">
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((value) => !value)}
        className="group flex w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-[250ms] sm:py-5"
      >
        <span className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400 transition-colors duration-[250ms] group-hover:text-stone-600">
          {title}
        </span>
        <AccordionChevron expanded={open} />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease }}
            className="overflow-hidden"
          >
            <div className="pb-5 sm:pb-6">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function SupportingDetail({ children }: { children: ReactNode }) {
  return <div className="mt-6 border-t border-stone-200/35 sm:mt-7">{children}</div>;
}

function FocusAreasList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3.5 text-[15px] leading-[1.68] text-stone-700 sm:space-y-4 sm:leading-[1.7]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[0.68em] h-1 w-1 shrink-0 rounded-full bg-[rgba(109,94,245,0.35)]" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

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
  compact = false,
}: {
  text: string;
  mode?: "default" | "editorial";
  compact?: boolean;
}) {
  const parts = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  if (mode === "editorial") {
    return (
      <div className={compact ? "" : "mt-7"}>
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
    <div className="mt-4 border-l border-stone-200 pl-4 sm:pl-5">
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

const WORKSAFE_LAUNCH_DISPLAY: Record<
  string,
  Pick<Project, "tagline" | "summary" | "tags">
> = {
  "referral-radar": {
    tagline: "AI-assisted mental health referral workflows",
    summary:
      "Designed recommendation workflows that surface high-risk mental health referral opportunities from claims and operational signals.",
    tags: ["AI agents", "LLMs", "Operational intelligence", "Claims signals"],
  },
  "bceid-migration": {
    tagline: "Provider identity infrastructure modernization",
    summary:
      "Led migration of 5,600+ healthcare provider accounts to modern CIAM infrastructure without operational disruption.",
    tags: ["CIAM", "Platform migration", "Identity systems", "Operational continuity"],
  },
  "provider-invoice-digitization": {
    tagline: "Provider invoicing workflow modernization",
    summary:
      "Redesigned high-friction provider submission workflows to improve operational throughput and digital adoption.",
    tags: ["Operational UX", "Workflow redesign", "Behavior change", "Provider operations"],
  },
  "medical-api-integration": {
    tagline: "EMR-native interoperability platform strategy",
    summary:
      "Validated API integration models for structured healthcare data exchange across fragmented EMR ecosystems.",
    tags: ["APIs", "Interoperability", "FHIR", "Platform strategy"],
  },
};

function workSafeLaunchProject(project: Project): Project {
  const override = WORKSAFE_LAUNCH_DISPLAY[project.slug];
  return override ? { ...project, ...override } : project;
}

function WorkSafeLaunchCard({ project, index }: LaunchCardProps) {
  const display = workSafeLaunchProject(project);
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
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-stone-200/70 bg-white px-7 py-8 transition-[border-color,box-shadow,transform] duration-[250ms] hover:border-[rgba(109,94,245,0.22)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] motion-safe:hover:-translate-y-1 sm:px-8 sm:py-9"
      >
        <h5 className="font-display text-[1.05rem] font-medium tracking-[-0.02em] text-stone-900 transition-colors duration-[250ms] group-hover:text-[#6D5EF5] sm:text-[1.125rem]">
          {display.title}
        </h5>
        <p className="mt-3 text-[13px] font-medium leading-snug text-stone-700 sm:text-sm">
          {display.tagline}
        </p>
        <p className="mt-4 flex-1 text-[13px] leading-relaxed text-stone-600 sm:text-[14px] sm:leading-[1.65]">
          {display.summary}
        </p>
        <ul className="mt-7 flex flex-wrap gap-x-2 gap-y-1.5">
          {display.tags.map((tag) => (
            <li key={tag} className="chip">
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

type TsbcSubProject = {
  id: string;
  title: string;
  tagline: string;
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
    tagline: "Operational intelligence for retention intervention",
    summary:
      "Designed behavioral intelligence systems that surfaced at-risk accounts and informed targeted operational interventions.",
    tags: ["Operational analytics", "Behavioral signals", "Retention systems", "Intervention strategy"],
  },
  {
    id: "remote-assessment",
    title: "Remote Assessment Platform",
    tagline: "Operational workflow redesign for regulated inspections",
    summary:
      "Redesigned field assessment workflows across evidence capture, compliance validation, and approval coordination to reduce operational friction while maintaining regulatory integrity.",
    tags: ["Workflow redesign", "Field operations", "Compliance systems", "Operational UX"],
  },
  {
    id: "ai-operational-systems",
    title: "AI-Assisted Operational Tooling",
    tagline: "NLP capabilities embedded in operational workflows",
    summary:
      "Embedded NLP and operational intelligence capabilities into internal workflows to improve triage, retrieval, classification, and operational decision support.",
    tags: ["NLP", "AI", "Operational Intelligence", "Workflow Automation"],
    subProjects: [
      {
        id: "internal-chatbot",
        title: "Internal AI Chatbot",
        tagline: "Operational knowledge retrieval",
        description:
          "Designed retrieval workflows that surfaced operational procedures, documentation, and policy context for internal support teams.",
        tags: ["RAG", "Knowledge retrieval", "Internal tooling"],
      },
      {
        id: "email-classification",
        title: "Email Classification Engine",
        tagline: "Operational triage automation",
        description:
          "Built NLP-assisted classification workflows that prioritized inbound operational requests by intent and urgency.",
        tags: ["Classification", "NLP", "Workflow automation"],
      },
      {
        id: "client-impact-dashboard",
        title: "Client Impact Analysis Dashboard",
        tagline: "Operational risk intelligence",
        description:
          "Developed operational intelligence layers that surfaced risk, satisfaction, and intervention signals across client workflows.",
        tags: ["Analytics", "Operational intelligence", "Intervention systems"],
      },
    ],
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
      initial={fadeUpInitial(reduceMotion, 12)}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.42, delay: motionDelay(reduceMotion, index * 0.05), ease }}
      className="group flex h-full flex-col rounded-2xl border border-stone-200/70 bg-white px-7 py-8 transition-[border-color,box-shadow,transform] duration-[250ms] hover:border-[rgba(109,94,245,0.22)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] motion-safe:hover:-translate-y-1 sm:px-8 sm:py-9"
    >
      <h5 className="font-display text-[1.05rem] font-medium tracking-[-0.02em] text-stone-900 transition-colors duration-[250ms] group-hover:text-[#6D5EF5] sm:text-[1.125rem]">
        {project.title}
      </h5>
      <p className="mt-3 text-[13px] font-medium leading-snug text-stone-700 sm:text-sm">
        {project.tagline}
      </p>
      <p className="mt-3.5 flex-1 text-[13px] leading-relaxed text-stone-600 sm:mt-4 sm:text-[14px] sm:leading-[1.65]">
        {project.summary}
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-1.5">
        {project.tags.map((tag) => (
          <li key={tag} className="chip">
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
      initial={fadeUpInitial(reduceMotion, 12)}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.42, delay: motionDelay(reduceMotion, index * 0.05), ease }}
      className="group col-span-full flex flex-col rounded-2xl border border-stone-200/70 bg-white px-7 py-8 transition-[border-color,box-shadow,transform] duration-[250ms] hover:border-[rgba(109,94,245,0.22)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] motion-safe:hover:-translate-y-1 sm:px-8 sm:py-9"
    >
      <h5 className="font-display text-[1.05rem] font-medium tracking-[-0.02em] text-stone-900 transition-colors duration-[250ms] group-hover:text-[#6D5EF5] sm:text-[1.125rem]">
        {project.title}
      </h5>
      <p className="mt-3 text-[13px] font-medium leading-snug text-stone-700 sm:text-sm">
        {project.tagline}
      </p>
      <p className="mt-3.5 text-[13px] leading-relaxed text-stone-600 sm:mt-4 sm:text-[14px] sm:leading-[1.65]">
        {project.summary}
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5">
        {project.tags.map((tag) => (
          <li key={tag} className="chip">
            {tag}
          </li>
        ))}
      </ul>
      {project.subProjects && (
        <div className="mt-7 grid gap-4 border-t border-stone-200/50 pt-6 sm:grid-cols-3 sm:gap-5">
          {project.subProjects.map((sub) => (
            <div
              key={sub.id}
              className="rounded-xl border border-stone-200/60 bg-stone-50/40 px-5 py-5"
            >
              <p className="font-display text-[13px] font-medium tracking-[-0.012em] text-stone-800 sm:text-[14px]">
                {sub.title}
              </p>
              <p className="mt-1.5 text-[11px] font-medium leading-snug text-stone-600 sm:text-[12px]">
                {sub.tagline}
              </p>
              <p className="mt-2 text-[12px] leading-[1.72] text-stone-600 sm:text-[13px]">
                {sub.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-1.5 gap-y-1">
                {sub.tags.map((tag) => (
                  <li key={tag} className="chip text-[10px]">
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

const tsbcBodyClass = `${chapterContentInsetClass} pb-4 pt-10 sm:pb-5 sm:pt-12 lg:pt-14`;

const tsbcLaunchesSectionClass =
  "-mx-6 mt-5 border-t border-stone-200/35 bg-[#faf9f6]/50 px-6 pb-0 pt-5 sm:-mx-10 sm:mt-6 sm:px-10 sm:pt-6 lg:-mx-12 lg:px-12";

const tsbcLaunchesGridClass = "mt-4 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-5 lg:gap-6";

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
      initial={fadeUpInitial(reduceMotion, 16)}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.52, delay: motionDelay(reduceMotion, index * 0.06), ease }}
    >
      <article
        aria-label={`${chapter.role} at ${chapter.organization}`}
        className={chapterArticleClass}
      >
        <div className={tsbcBodyClass}>
          <ChapterHeader chapter={chapter} />
          <RoleSummary text={chapter.scopeSummary} tight />
          <FocusPills items={chapter.focusPills} />
          <OperatingLens
            label="How My Thinking Evolved"
            text={chapter.operatingLens}
            tight
          />

          <section
            className={tsbcLaunchesSectionClass}
            aria-labelledby={`chapter-${keySlug}-work`}
          >
            <div className="flex items-center gap-2">
              <span className="h-px w-3 shrink-0 rounded-full bg-gradient-to-r from-[#6D5EF5] to-[#4F8CFF]" aria-hidden />
              <h4
                id={`chapter-${keySlug}-work`}
                className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
              >
                Selected Work
              </h4>
            </div>
            <div className={`${tsbcLaunchesGridClass} [&>*:last-child:nth-child(odd)]:sm:col-span-2`}>
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
        </div>
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

const workSafeBodyClass = `${chapterContentInsetClass} pb-5 pt-9 sm:pb-5 sm:pt-11 lg:pt-12`;

const workSafeLaunchesSectionClass =
  "-mx-6 mt-5 border-t border-stone-200/35 bg-[#faf9f6]/50 px-6 pb-0 pt-5 sm:-mx-10 sm:mt-6 sm:px-10 sm:pt-6 lg:-mx-12 lg:px-12";

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
      initial={fadeUpInitial(reduceMotion, 16)}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{
        duration: 0.52,
        delay: motionDelay(reduceMotion, index * 0.06),
        ease,
      }}
    >
      <article
        aria-label={`${chapter.role} at ${chapter.organization}`}
        className={chapterArticleClass}
      >
        <div className={workSafeBodyClass}>
          <ChapterHeader chapter={chapter} />
          <RoleSummary text={chapter.scopeSummary} tight />
          <FocusPills items={chapter.focusPills} />
          <OperatingLens
            text={chapter.operatingLens}
            label="How My Thinking Evolved"
            tight
          />

          {chapterProjects.length > 0 ? (
            <section
              className={workSafeLaunchesSectionClass}
              aria-labelledby={`chapter-${keySlug}-launches`}
            >
              <div className="flex items-center gap-2">
                <span className="h-px w-3 shrink-0 rounded-full bg-gradient-to-r from-[#6D5EF5] to-[#4F8CFF]" aria-hidden />
                <h4
                  id={`chapter-${keySlug}-launches`}
                  className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
                >
                  Selected Work
                </h4>
              </div>
              {chapter.launchIntro ? (
                <p className="mt-1.5 text-[13px] leading-[1.62] text-stone-600 sm:text-sm sm:leading-[1.65]">
                  {chapter.launchIntro}
                </p>
              ) : null}
              <div className="mt-4 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-5 lg:gap-7">
                {chapterProjects.map((project, pIndex) => (
                  <WorkSafeLaunchCard key={project.slug} project={project} index={pIndex} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
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

const convertusBodyClass = `${chapterContentInsetClass} pb-5 pt-9 sm:pb-5 sm:pt-11 lg:pt-12`;

const convertusLaunchesSectionClass =
  "-mx-6 mt-5 border-t border-stone-200/35 bg-[#faf9f6]/50 px-6 pb-0 pt-5 sm:-mx-10 sm:mt-6 sm:px-10 sm:pt-6 lg:-mx-12 lg:px-12";

const convertusLaunchesGridClass =
  "mt-4 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-5 lg:gap-7";

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
      initial={fadeUpInitial(reduceMotion, 16)}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{
        duration: 0.52,
        delay: motionDelay(reduceMotion, index * 0.06),
        ease,
      }}
    >
      <article
        aria-label={`${chapter.role} at ${chapter.organization}`}
        className={chapterArticleClass}
      >
        <div className={convertusBodyClass}>
          <ChapterHeader chapter={chapter} />
          <RoleSummary text={chapter.scopeSummary} tight />
          <FocusPills items={chapter.focusPills} />
          <OperatingLens
            label="How My Thinking Evolved"
            text={chapter.operatingLens}
            tight
          />

          <section
            className={convertusLaunchesSectionClass}
            aria-labelledby={`chapter-${keySlug}-launches`}
          >
            <div className="flex items-center gap-2">
              <span className="h-px w-3 shrink-0 rounded-full bg-gradient-to-r from-[#6D5EF5] to-[#4F8CFF]" aria-hidden />
              <h4
                id={`chapter-${keySlug}-launches`}
                className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
              >
                Selected Work
              </h4>
            </div>
            <div className={convertusLaunchesGridClass}>
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
        </div>
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

const oneEightyBodyClass = `${chapterContentInsetClass} pb-5 pt-9 sm:pb-5 sm:pt-11 lg:pt-12`;

const oneEightyLaunchesSectionClass =
  "-mx-6 mt-5 border-t border-stone-200/35 bg-[#faf9f6]/50 px-6 pb-0 pt-5 sm:-mx-10 sm:mt-6 sm:px-10 sm:pt-6 lg:-mx-12 lg:px-12";

function OneEightyDegreesChapterBlock({
  chapter,
  keySlug,
  index,
  reduceMotion,
}: OneEightyDegreesChapterBlockProps) {
  return (
    <motion.div
      className="relative"
      initial={fadeUpInitial(reduceMotion, 16)}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{
        duration: 0.52,
        delay: motionDelay(reduceMotion, index * 0.06),
        ease,
      }}
    >
      <article
        aria-label={`${chapter.role} at ${chapter.organization}`}
        className={chapterArticleClass}
      >
        <div className={oneEightyBodyClass}>
          <ChapterHeader chapter={chapter} />
          <RoleSummary text={chapter.scopeSummary} tight />
          <FocusPills items={chapter.focusPills} />
          <OperatingLens
            label="How My Thinking Evolved"
            text={chapter.operatingLens}
            tight
          />

          <section
            className={oneEightyLaunchesSectionClass}
            aria-labelledby={`chapter-${keySlug}-engagements`}
          >
            <div className="flex items-center gap-2">
              <span className="h-px w-3 shrink-0 rounded-full bg-gradient-to-r from-[#6D5EF5] to-[#4F8CFF]" aria-hidden />
              <h4
                id={`chapter-${keySlug}-engagements`}
                className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
              >
                Selected Work
              </h4>
            </div>
            {chapter.launchIntro ? (
              <p className="mt-2 text-[13px] leading-[1.65] text-stone-600 sm:text-sm">
                {chapter.launchIntro}
              </p>
            ) : null}
            <div className={launchesGridClass}>
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
        </div>
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
  const allCapabilityPills = chapter.capabilityRows.flatMap((row) =>
    row.split(/\s*·\s*/).map((s) => s.trim()).filter(Boolean)
  );

  return (
    <motion.div
      className="relative"
      initial={fadeUpInitial(reduceMotion, 16)}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{
        duration: 0.52,
        delay: motionDelay(reduceMotion, index * 0.06),
        ease,
      }}
    >
      <article
        aria-label={`${chapter.role} at ${chapter.organization}`}
        className={chapterArticleClass}
      >
        <div className={chapterBodyClass}>
          <ChapterHeader chapter={chapter} />
          <RoleSummary text={chapter.scopeSummary} />
          <FocusPills items={chapter.focusPills} />
          <OperatingLens text={chapter.operatingLens} />

          {chapterProjects.length > 0 ? (
            <section
              className={launchesSectionClass}
              aria-labelledby={`chapter-${keySlug}-launches`}
            >
              <div className="flex items-center gap-2">
                <span className="h-px w-3 shrink-0 rounded-full bg-gradient-to-r from-[#6D5EF5] to-[#4F8CFF]" aria-hidden />
                <h4
                  id={`chapter-${keySlug}-launches`}
                  className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400"
                >
                  Selected Launches
                </h4>
              </div>
              {chapter.launchIntro ? (
                <p className="mt-2 text-[13px] leading-[1.65] text-stone-600 sm:text-sm">
                  {chapter.launchIntro}
                </p>
              ) : null}
              <div className={launchesGridClass}>
                {chapterProjects.map((project, pIndex) => (
                  <ProjectCard key={project.slug} project={project} index={pIndex} />
                ))}
              </div>
            </section>
          ) : null}

          <SupportingDetail>
            <ChapterAccordionSection id={`${keySlug}-focus-depth`} title="Focus Area Detail">
              <FocusAreasList items={chapter.focusAreas} />
            </ChapterAccordionSection>
            <ChapterAccordionSection id={`${keySlug}-capabilities-depth`} title="Capability Map">
              <CapabilityPillGrid items={allCapabilityPills} />
            </ChapterAccordionSection>
            <ChapterAccordionSection id={`${keySlug}-narrative`} title="Extended Narrative">
              <ThinkingBody text={chapter.thinkingEvolved} mode="editorial" compact />
            </ChapterAccordionSection>
          </SupportingDetail>
        </div>
      </article>
    </motion.div>
  );
}

export function ExperienceCareerSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionFrame id="experience" aria-labelledby="experience-heading">
      <motion.div
        className={`w-full min-w-0 ${chapterContentInsetClass}`}
        initial={fadeUpInitial(reduceMotion, 10)}
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

      <div className="mt-12 flex w-full flex-col gap-10 sm:mt-14 sm:gap-12 lg:mt-16 lg:gap-14">
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
    </SectionFrame>
  );
}
