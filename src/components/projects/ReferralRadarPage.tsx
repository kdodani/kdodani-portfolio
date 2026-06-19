"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HomeHashLink } from "@/components/layout/HomeHashLink";
import { fadeUpInitial, motionDelay } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Design tokens ─────────────────────────────────────────────────── */

/** Consistent section gap across the whole page */
const SECTION = "mt-20 sm:mt-24 lg:mt-28";
/** All primary cards share this surface treatment */
const CARD = "rounded-2xl border border-stone-200/60 bg-white";
/** Consistent inner card padding */
const CARD_PAD = "px-6 py-6 sm:px-7 sm:py-7";

/* ─── Static content ────────────────────────────────────────────────── */

const PROBLEM_STEPS = [
  {
    stat: "20–75",
    unit: "documents per claim",
    detail: "Intake notes, medical reports, counselling plans, and RTW docs — all separate, all manual.",
    delay: 0.06,
  },
  {
    stat: "90+",
    unit: "minutes of manual review",
    detail: "Case managers spend hours cross-referencing documents to surface a single referral opportunity.",
    delay: 0.12,
  },
  {
    stat: "Missed",
    unit: "early interventions",
    detail: "As claim complexity grows, critical recovery windows close before they're recognized.",
    delay: 0.18,
  },
] as const;

const CONTRIBUTIONS = [
  {
    label: "01",
    title: "Product Strategy",
    body: "Defined MVP scope and shaped product direction — working with SMEs, architects, and developers to align on what to build, why it mattered, and what to leave out.",
  },
  {
    label: "02",
    title: "Synthetic Data Creation",
    body: "Used ChatGPT to generate realistic claim scenarios, then ran them through an experienced case manager for validation — unblocking the data science team when production data wasn't available.",
  },
  {
    label: "03",
    title: "Experience Design",
    body: "Pushed the team beyond a recommendation list toward an interactive, visual exploration of the claim — making AI reasoning something users could actually navigate.",
  },
  {
    label: "04",
    title: "Stakeholder Alignment",
    body: "Bridged healthcare SMEs, data scientists, architects, and developers across a 2-week sprint with no formal authority — keeping momentum through ambiguity.",
  },
];

const FLOW_STEPS = [
  "ChatGPT",
  "Scenario Creation",
  "Case Manager Review",
  "Approved Examples",
  "Model Testing",
];

const GALLERY = [
  {
    type: "video" as const,
    src: "/videos/referral-radar/priority-cases.mp4",
    poster: "/images/referral-radar/poc-interface-1.png",
    alt: "Priority cases — referral recommendations in action",
    caption: "Referral recommendations ranked by priority",
  },
  {
    type: "video" as const,
    src: "/videos/referral-radar/evidence-tracing.mp4",
    poster: "/images/referral-radar/poc-interface-details.png",
    alt: "Evidence tracing and mind map",
    caption: "Evidence traceability + interactive mind map",
  },
  {
    type: "video" as const,
    src: "/videos/referral-radar/ai-program-recommendations.mp4",
    poster: "/images/referral-radar/mindmap-screen.png",
    alt: "AI-powered program recommendations",
    caption: "AI-powered program recommendations",
  },
  {
    type: "image" as const,
    src: "/images/referral-radar/context.gif",
    alt: "Multi-agent workflow animation",
    caption: "Multi-agent workflow processing claim context",
    unoptimized: true,
  },
];

const SKILLS = [
  "AI Product Management",
  "Product Discovery",
  "Innovation Leadership",
  "Prompt Engineering",
  "User Research",
  "UX Strategy",
  "Cross-functional Leadership",
  "Rapid Prototyping",
  "Stakeholder Management",
  "Explainable AI",
];

/* ─── Small reusable pieces ─────────────────────────────────────────── */

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400 sm:text-[11px]">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="font-display mt-2 text-[clamp(1.35rem,1.5vw+1rem,1.8rem)] font-medium tracking-[-0.025em] text-stone-900">
      {children}
    </h2>
  );
}

function GradientBar() {
  return (
    <span
      aria-hidden
      className="inline-block h-px w-4 rounded-full bg-gradient-to-r from-[#6D5EF5] to-[#4F8CFF]"
    />
  );
}

/* ─── Component ─────────────────────────────────────────────────────── */

export function ReferralRadarPage() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: fadeUpInitial(reduceMotion, 16),
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.54, ease, delay: motionDelay(reduceMotion, delay) },
  });

  return (
    <article className="pb-20 lg:pb-28">

      {/* ── Back nav ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-frame px-page-x pt-8 sm:pt-10">
        <HomeHashLink
          sectionId="experience"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-stone-400 transition-colors duration-[250ms] hover:text-stone-600"
        >
          <svg aria-hidden className="h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to experience
        </HomeHashLink>
      </div>

      {/* ── Hero — split layout, video dominant ───────────────────────── */}
      <section className="mx-auto max-w-frame px-page-x">
        <div className="grid items-center gap-8 pt-8 sm:gap-10 sm:pt-10 lg:min-h-[88dvh] lg:grid-cols-[2fr_3fr] lg:gap-14 lg:pt-0">

          {/* Left: text */}
          <div>
            <motion.div {...fadeUp(0)}>
              <SectionLabel>Innovation Challenge · 2025</SectionLabel>
              <h1 className="gradient-hero-text font-display mt-3 text-[clamp(2.5rem,4vw+1.4rem,4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                Referral Radar
              </h1>
              <p className="mt-3 text-[15px] font-medium leading-snug text-accent/90 sm:text-base">
                AI-powered referral intelligence for healthcare case managers.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="mt-5 flex flex-wrap gap-2">
              <span className="chip-accent">🏆 2nd Place — WorkSafeBC Innovation Challenge</span>
              <span className="chip">👥 Cross-functional team</span>
              <span className="chip">⏱ 2-week sprint</span>
              <span className="chip">🤖 AI + Healthcare</span>
            </motion.div>

            <motion.p
              {...fadeUp(0.18)}
              className="mt-5 text-[15px] leading-[1.72] text-stone-600 sm:text-base sm:leading-[1.7]"
            >
              Helped transform fragmented claim information into explainable healthcare referral
              recommendations — in a 2-week sprint with no production data and a team I had no
              formal authority over.
            </motion.p>
          </div>

          {/* Right: hero video */}
          <motion.div
            {...fadeUp(0.12)}
            className="overflow-hidden rounded-2xl border border-stone-200/60 shadow-[0_16px_64px_-16px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.9)_inset]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto block"
              poster="/images/referral-radar/poc-interface-1.png"
            >
              <source src="/videos/referral-radar/hero.mp4" type="video/mp4" />
              <img
                src="/images/referral-radar/ui-flow.gif"
                alt="Referral Radar live UI — recommendations, evidence, and search"
                className="w-full h-auto"
              />
            </video>
          </motion.div>

        </div>
      </section>

      {/* ── Problem — horizontal progression ──────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>The problem</SectionLabel>
          <SectionHeading>Why referrals get missed</SectionHeading>
        </motion.div>

        {/* Desktop: 3-col with connector arrows */}
        <div className="mt-8 hidden sm:flex sm:items-stretch sm:gap-3">
          {PROBLEM_STEPS.map((item, i) => (
            <div key={i} className="flex flex-1 items-stretch gap-3">
              {i > 0 && (
                <div className="flex shrink-0 items-center">
                  <svg aria-hidden className="h-5 w-5 text-stone-200" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <motion.div
                {...fadeUp(item.delay)}
                className={`flex flex-1 flex-col ${CARD} px-5 py-6`}
              >
                <p className="gradient-hero-text font-display text-[clamp(1.6rem,2vw+1rem,2.2rem)] font-medium leading-none tracking-[-0.03em]">
                  {item.stat}
                </p>
                <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.07em] text-stone-500">
                  {item.unit}
                </p>
                <p className="mt-3 text-[13px] leading-[1.62] text-stone-400">{item.detail}</p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="mt-6 space-y-2 sm:hidden">
          {PROBLEM_STEPS.map((item, i) => (
            <motion.div key={i} {...fadeUp(item.delay)}>
              {i > 0 && (
                <div className="flex justify-center py-1">
                  <svg aria-hidden className="h-4 w-4 text-stone-300" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <div className={`${CARD} px-5 py-5`}>
                <p className="gradient-hero-text font-display text-[1.5rem] font-medium leading-none tracking-[-0.03em]">
                  {item.stat}
                </p>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.07em] text-stone-500">
                  {item.unit}
                </p>
                <p className="mt-2.5 text-[13px] leading-[1.62] text-stone-400">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── My Contributions — equal-height cards ─────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>My contributions</SectionLabel>
          <SectionHeading>How I shaped the product</SectionHeading>
        </motion.div>

        <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5">
          {CONTRIBUTIONS.map((c, i) => (
            <motion.div
              key={c.title}
              {...fadeUp(0.06 + i * 0.07)}
              className={`card-interactive flex flex-col ${CARD} ${CARD_PAD}`}
            >
              <div className="mb-5 flex items-center gap-2.5">
                <GradientBar />
                <span className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400">
                  {c.label}
                </span>
              </div>
              <h3 className="font-display text-[1.05rem] font-medium tracking-[-0.018em] text-stone-900">
                {c.title}
              </h3>
              <p className="mt-2.5 flex-1 text-[13px] leading-[1.68] text-stone-500">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Before / After — larger images ────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>How I influenced the product</SectionLabel>
          <SectionHeading>Beyond the obvious implementation</SectionHeading>
        </motion.div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {/* Before */}
          <motion.div {...fadeUp(0.08)}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200/60 bg-stone-50/80">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/referral-radar/poc-interface.png"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/videos/referral-radar/before-demo.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="mt-3.5 px-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent/55">
                Before
              </p>
              <p className="mt-1 text-[14px] font-medium leading-snug text-stone-700">
                Functional but familiar.
              </p>
              <p className="mt-1 text-[12px] leading-[1.6] text-stone-400">
                A basic list. Expected. Forgettable.
              </p>
            </div>
          </motion.div>

          {/* After */}
          <motion.div {...fadeUp(0.14)}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.22)] bg-[rgba(109,94,245,0.02)] shadow-[0_0_0_1px_rgba(109,94,245,0.06)]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/referral-radar/mindmap-screen.png"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/videos/referral-radar/hero.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="mt-3.5 px-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent/55">
                After
              </p>
              <p className="mt-1 text-[14px] font-medium leading-snug text-stone-900">
                Interactive, explainable, memorable.
              </p>
              <p className="mt-1 text-[12px] leading-[1.6] text-stone-400">
                Nodes, connections, and AI reasoning — all navigable.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.p {...fadeUp(0.2)} className="mt-4 text-[13px] leading-[1.7] text-stone-400 sm:text-[14px]">
          The strongest audience reactions came from the visualization experience, not the recommendation engine itself.
        </motion.p>
      </section>

      {/* ── Synthetic Data Story — process card ───────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Resourcefulness over constraints</SectionLabel>
          <SectionHeading>No data. Created the data.</SectionHeading>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          className={`mt-8 ${CARD} ${CARD_PAD}`}
        >
          <p className="mb-6 text-[13px] leading-[1.65] text-stone-500 sm:text-[14px]">
            Production claim data wasn&apos;t available. Instead of stalling, I built a lightweight
            validation workflow that kept the team moving — without compromising on realism or
            clinical accuracy.
          </p>
          {/* Flow steps */}
          <div className="flex flex-wrap items-center gap-y-2.5 gap-x-2">
            {FLOW_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-lg border border-stone-200/80 bg-stone-50 px-3.5 py-1.5 text-[13px] font-medium text-stone-700">
                  {step}
                </span>
                {i < FLOW_STEPS.length - 1 && (
                  <svg aria-hidden className="h-3 w-3 shrink-0 text-stone-300" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Product Screens Gallery — uniform aspect ratio ─────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Product screens</SectionLabel>
          <SectionHeading>What we built</SectionHeading>
        </motion.div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {GALLERY.map((item, i) => (
            <motion.div key={item.src} {...fadeUp(0.06 + i * 0.07)}>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-stone-200/60 bg-stone-50">
                {item.type === "video" ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={item.poster}
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover object-center"
                    unoptimized={item.unoptimized}
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                )}
              </div>
              <p className="mt-3 text-[12px] leading-[1.6] text-stone-400">{item.caption}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Audience Reaction ─────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Audience reaction</SectionLabel>
          <SectionHeading>Genuine stakeholder interest</SectionHeading>
        </motion.div>

        {/* Architect spotlight — mindmap impact leads */}
        <motion.div
          {...fadeUp(0.08)}
          className="mt-8 overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.16)] bg-gradient-to-br from-[rgba(109,94,245,0.04)] to-[rgba(79,140,255,0.02)]"
        >
          <div className="border-b border-[rgba(109,94,245,0.08)] px-6 py-3.5 sm:px-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent/45">
              Cross-functional impact · Data Architecture · WorkSafeBC
            </p>
          </div>
          <div className="px-6 py-7 sm:px-8 sm:py-8">
            <blockquote className="mb-6">
              <p className="font-display text-[clamp(1.05rem,0.9vw+0.88rem,1.25rem)] font-normal leading-[1.54] tracking-[-0.015em] text-stone-800 text-pretty">
                &ldquo;I was particularly impressed with the mind mapping tool.&rdquo;
              </p>
              <p className="mt-3.5 text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400">
                Data Architect · WorkSafeBC — direct message, day of the demo
              </p>
            </blockquote>
            <blockquote className="rounded-xl border border-stone-100 bg-white/70 px-5 py-4">
              <p className="font-display text-[0.9rem] font-normal leading-[1.62] tracking-[-0.01em] text-stone-600">
                &ldquo;As DAs, we use ERWin to create data models and publish ERDs. But this tool
                is old, and it supports a legacy workflow.&rdquo;
              </p>
              <p className="mt-2.5 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
                Context — what the mind map unlocked
              </p>
            </blockquote>
            <p className="mt-4 text-[13px] leading-[1.65] text-stone-400">
              The mind map prompted a data architect to independently prototype the same visualization
              library for ERD generation — and reach out to explore replacing legacy tooling. One
              design decision opened a cross-functional product conversation.
            </p>
          </div>
        </motion.div>

        {/* Two mindmap quotes */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {(
            [
              {
                quote: "Imagine working through this mind map on a big screen — seeing everything in one place, how it is all connected, and being able to zoom in and out.",
                attribution: "InnoFest 2025 attendee",
                delay: 0.14,
              },
              {
                quote: "Can this be used for other subject matters such as pain?",
                attribution: "Manager, RTW Compliance · WorkSafeBC",
                delay: 0.2,
              },
            ] as const
          ).map((q) => (
            <motion.blockquote
              key={q.attribution}
              {...fadeUp(q.delay)}
              className={`flex flex-col ${CARD} px-5 py-5`}
            >
              <GradientBar />
              <p className="mt-3 flex-1 font-display text-[0.92rem] font-normal leading-[1.62] tracking-[-0.01em] text-stone-700">
                &ldquo;{q.quote}&rdquo;
              </p>
              <p className="mt-3.5 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
                {q.attribution}
              </p>
            </motion.blockquote>
          ))}
        </div>

        {/* Program manager quote — bottom, same scale as above */}
        <motion.blockquote
          {...fadeUp(0.24)}
          className={`mt-4 flex flex-col ${CARD} px-5 py-5`}
        >
          <GradientBar />
          <p className="mt-3 font-display text-[0.92rem] font-normal leading-[1.62] tracking-[-0.01em] text-stone-700">
            &ldquo;We could not have asked for a better idea champion and PO. Our team loved working
            with you and you knocked it out of the park — well done, not only on your presentations,
            but on all the work leading up to this.&rdquo;
          </p>
          <p className="mt-3.5 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
            Program Manager, Advanced Technology Solutions · WorkSafeBC
          </p>
        </motion.blockquote>
      </section>

      {/* ── Recognition — milestone progression ───────────────────────── */}
      <section className={`mx-auto max-w-scene px-page-x ${SECTION}`}>
        <motion.div
          {...fadeUp(0)}
          className="overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.14)] bg-gradient-to-b from-[rgba(109,94,245,0.05)] to-[rgba(79,140,255,0.03)]"
        >
          <div className="px-8 py-10 sm:px-10 sm:py-12">
            <SectionLabel>Outcome</SectionLabel>
            <h2 className="font-display mt-2 text-[clamp(1.35rem,1.5vw+1rem,1.8rem)] font-medium tracking-[-0.025em] text-stone-900">
              Recognition
            </h2>

            {/* Milestone progression */}
            <div className="mt-8 flex flex-col gap-0 sm:flex-row sm:items-center sm:gap-0">
              {(
                [
                  { value: "36 ideas", label: "submitted org-wide" },
                  { value: "Finalist", label: "Process Transformation" },
                  { value: "2nd Place", label: "InnoFest 2025" },
                ] as const
              ).map((item, i) => (
                <div key={item.value} className="flex items-center gap-0">
                  {/* Mobile: vertical connector */}
                  {i > 0 && (
                    <div className="flex items-center sm:hidden">
                      <div className="ml-6 my-1 h-6 w-px bg-stone-200" />
                    </div>
                  )}
                  <div className="flex w-full items-center gap-4 sm:gap-0">
                    {/* Desktop: horizontal connector */}
                    {i > 0 && (
                      <div className="hidden shrink-0 items-center px-4 sm:flex">
                        <svg aria-hidden className="h-4 w-4 text-stone-300" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                    <div className="rounded-xl border border-white/80 bg-white px-5 py-3.5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]">
                      <p className="font-display text-[clamp(1.2rem,1.2vw+0.9rem,1.55rem)] font-medium tracking-[-0.025em] text-stone-900">
                        {item.value}
                      </p>
                      <p className="mt-0.5 text-[11px] text-stone-500">{item.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[13px] leading-[1.68] text-stone-500 sm:text-[14px]">
              The project generated strong engagement across healthcare, architecture, analytics, and
              operational stakeholders — and sparked follow-up conversations about applications beyond
              the original use case.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x mt-16 sm:mt-20`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Skills demonstrated</SectionLabel>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <li key={skill} className="chip">
                {skill}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ── Footer nav ────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-frame px-page-x mt-14">
        <motion.p {...fadeUp(0)} className="text-sm text-stone-400">
          <HomeHashLink
            sectionId="experience"
            className="font-medium text-accent underline-offset-4 hover:text-accent-strong hover:underline"
          >
            Back to experience
          </HomeHashLink>
        </motion.p>
      </div>

    </article>
  );
}
