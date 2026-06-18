"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HomeHashLink } from "@/components/layout/HomeHashLink";
import { fadeUpInitial, motionDelay } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Static content ────────────────────────────────────────────────── */

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
    src: "/images/referral-radar/poc-interface-1.png",
    alt: "Referral Radar recommendation engine",
    caption: "Referral recommendations ranked by priority",
    unoptimized: false,
  },
  {
    src: "/images/referral-radar/poc-interface-details.png",
    alt: "Evidence traceability panel",
    caption: "Evidence traceability — source snippets from claim documents",
    unoptimized: false,
  },
  {
    src: "/images/referral-radar/mindmap-screen.png",
    alt: "Interactive mind map visualization",
    caption: "Mind map — explore connections across symptoms, events, and programs",
    unoptimized: false,
  },
  {
    src: "/images/referral-radar/context.gif",
    alt: "Referral Radar context agent animation",
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

/* ─── Component ─────────────────────────────────────────────────────── */

export function ReferralRadarPage() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: fadeUpInitial(reduceMotion, 14),
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, margin: "-50px" },
    transition: {
      duration: 0.54,
      ease,
      delay: motionDelay(reduceMotion, delay),
    },
  });

  return (
    <article className="pb-16 lg:pb-24">

      {/* ── Back nav ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-scene px-page-x pt-8 sm:pt-10">
        <HomeHashLink
          sectionId="experience"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-stone-400 transition-colors duration-[250ms] hover:text-stone-600"
        >
          <svg
            aria-hidden
            className="h-3 w-3 shrink-0"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M8 2L4 6l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to experience
        </HomeHashLink>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-scene px-page-x pt-7 sm:pt-9">
        <motion.div {...fadeUp(0)}>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
            Innovation Challenge · 2025
          </p>
          <h1 className="gradient-hero-text font-display mt-3 text-[clamp(2.4rem,4.5vw+1.2rem,3.75rem)] font-medium leading-[1.06] tracking-[-0.04em]">
            Referral Radar
          </h1>
          <p className="mt-3 text-[15px] font-medium leading-snug text-accent/90 sm:text-base">
            AI-powered referral intelligence for healthcare case managers.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.08)} className="mt-4 flex flex-wrap gap-2">
          <span className="chip-accent">🏆 2nd Place — WorkSafeBC Innovation Challenge</span>
          <span className="chip">👥 Cross-functional team</span>
          <span className="chip">⏱ 2-week sprint</span>
          <span className="chip">🤖 AI + Healthcare + Product Innovation</span>
        </motion.div>

        <motion.p
          {...fadeUp(0.14)}
          className="mt-5 max-w-editorial text-[15px] leading-[1.72] text-stone-600 sm:text-base sm:leading-[1.7]"
        >
          Helped transform fragmented claim information into explainable healthcare referral
          recommendations — in a 2-week sprint with no production data and a team I had no formal
          authority over.
        </motion.p>

        {/* Video card — looping product demo */}
        <motion.div
          {...fadeUp(0.2)}
          className="mt-8 overflow-hidden rounded-2xl border border-stone-200/70 bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.95)_inset]"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-auto"
            poster="/images/referral-radar/poc-interface-1.png"
          >
            <source src="/videos/referral-radar/hero.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support the video */}
            <img
              src="/images/referral-radar/ui-flow.gif"
              alt="Referral Radar live UI — recommendations, evidence, and search"
              className="w-full h-auto"
            />
          </video>
        </motion.div>
      </section>

      {/* ── Problem ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-scene px-page-x mt-16 sm:mt-20">
        <motion.div {...fadeUp(0)}>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
            The problem
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.3rem,1.4vw+0.95rem,1.7rem)] font-medium tracking-[-0.025em] text-stone-900">
            Why referrals get missed
          </h2>
        </motion.div>

        <div className="mt-6 space-y-2">
          {(
            [
              {
                stat: "20–75 documents",
                label: "per claim to review",
                detail:
                  "Intake notes, medical reports, counselling plans, RTW docs — all separate, all manual.",
                delay: 0.06,
              },
              {
                stat: "90+ minutes",
                label: "of manual investigation per complex claim",
                detail:
                  "Case managers spend hours cross-referencing documents to surface a single referral opportunity.",
                delay: 0.12,
              },
              {
                stat: "Delayed referrals",
                label: "and missed early interventions",
                detail:
                  "As claim complexity grows, critical recovery windows close before they're recognized.",
                delay: 0.18,
              },
            ] as const
          ).map((item, i) => (
            <motion.div key={i} {...fadeUp(item.delay)}>
              {i > 0 && (
                <div className="flex justify-center py-0.5">
                  <svg
                    aria-hidden
                    className="h-4 w-4 text-stone-300"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8 3v10M4 9l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              <div className="rounded-2xl border border-stone-200/70 bg-white px-5 py-5 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset] sm:px-6">
                <p className="font-display text-[clamp(1.1rem,1vw+0.9rem,1.35rem)] font-medium tracking-[-0.02em] text-stone-900">
                  {item.stat}
                </p>
                <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-accent/75">
                  {item.label}
                </p>
                <p className="mt-2 text-[13px] leading-[1.62] text-stone-500">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── My Contributions ─────────────────────────────────────── */}
      <section className="mx-auto max-w-frame px-page-x mt-16 sm:mt-20">
        <motion.div {...fadeUp(0)}>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
            My contributions
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.3rem,1.4vw+0.95rem,1.7rem)] font-medium tracking-[-0.025em] text-stone-900">
            How I shaped the product
          </h2>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {CONTRIBUTIONS.map((c, i) => (
            <motion.div
              key={c.title}
              {...fadeUp(0.06 + i * 0.07)}
              className="card-interactive rounded-2xl border border-stone-200/70 bg-white px-6 py-6 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset]"
            >
              <div className="mb-4 flex items-center gap-2.5">
                <span
                  className="h-px w-4 shrink-0 rounded-full bg-gradient-to-r from-[#6D5EF5] to-[#4F8CFF]"
                  aria-hidden
                />
                <span className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400">
                  {c.label}
                </span>
              </div>
              <h3 className="font-display text-[1.05rem] font-medium tracking-[-0.018em] text-stone-900">
                {c.title}
              </h3>
              <p className="mt-2 text-[13px] leading-[1.65] text-stone-600">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Before / After ───────────────────────────────────────── */}
      <section className="mx-auto max-w-frame px-page-x mt-16 sm:mt-20">
        <motion.div {...fadeUp(0)}>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
            How I influenced the product
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.3rem,1.4vw+0.95rem,1.7rem)] font-medium tracking-[-0.025em] text-stone-900">
            Beyond the obvious implementation
          </h2>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {/* Before */}
          <motion.div {...fadeUp(0.08)} className="group">
            <div className="overflow-hidden rounded-2xl border border-stone-200/70 bg-stone-50">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/referral-radar/poc-interface.png"
                  alt="Early recommendation prototype — basic table interface"
                  fill
                  className="object-contain object-center"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
            </div>
            <div className="mt-3 px-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-400">
                Before
              </p>
              <p className="mt-1 text-[14px] font-medium text-stone-600">
                Functional but familiar.
              </p>
              <p className="mt-1 text-[12px] leading-[1.6] text-stone-400">
                A basic list. Expected. Forgettable.
              </p>
            </div>
          </motion.div>

          {/* After */}
          <motion.div {...fadeUp(0.14)} className="group">
            <div className="overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.2)] bg-[rgba(109,94,245,0.03)] shadow-[0_0_0_1px_rgba(109,94,245,0.08)]">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/referral-radar/mindmap-screen.png"
                  alt="Interactive mind map — visualize claim connections"
                  fill
                  className="object-contain object-center"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
            </div>
            <div className="mt-3 px-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent/60">
                After
              </p>
              <p className="mt-1 text-[14px] font-medium text-stone-800">
                Interactive, explainable, memorable.
              </p>
              <p className="mt-1 text-[12px] leading-[1.6] text-stone-400">
                Nodes, connections, and AI reasoning — all navigable.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.p
          {...fadeUp(0.2)}
          className="mt-5 text-[13px] leading-[1.68] text-stone-500 sm:text-[14px]"
        >
          The strongest audience reactions came from the visualization experience, not the
          recommendation engine itself.
        </motion.p>
      </section>

      {/* ── Synthetic Data Story ──────────────────────────────────── */}
      <section className="mx-auto max-w-scene px-page-x mt-16 sm:mt-20">
        <motion.div {...fadeUp(0)}>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
            Resourcefulness over constraints
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.3rem,1.4vw+0.95rem,1.7rem)] font-medium tracking-[-0.025em] text-stone-900">
            No data. Created the data.
          </h2>
          <p className="mt-3 text-[13px] leading-[1.65] text-stone-500 sm:text-[14px]">
            Production claim data wasn&apos;t available. Instead of stalling, I built a lightweight
            validation workflow.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            {FLOW_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-xl border border-stone-200/70 bg-white px-3.5 py-2 text-[13px] font-medium text-stone-700 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset]">
                  {step}
                </span>
                {i < FLOW_STEPS.length - 1 && (
                  <svg
                    aria-hidden
                    className="h-3.5 w-3.5 shrink-0 text-stone-300"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] leading-[1.65] text-stone-500">
            Created a lightweight validation workflow that kept the team moving despite data
            constraints — without compromising on realism or clinical accuracy.
          </p>
        </motion.div>
      </section>

      {/* ── Product Screens Gallery ───────────────────────────────── */}
      <section className="mx-auto max-w-frame px-page-x mt-16 sm:mt-20">
        <motion.div {...fadeUp(0)}>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
            Product screens
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.3rem,1.4vw+0.95rem,1.7rem)] font-medium tracking-[-0.025em] text-stone-900">
            What we built
          </h2>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {GALLERY.map((item, i) => (
            <motion.div key={item.src} {...fadeUp(0.06 + i * 0.07)}>
              <div className="overflow-hidden rounded-2xl border border-stone-200/70 bg-stone-50 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={450}
                  className="w-full h-auto"
                  unoptimized={item.unoptimized}
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
              <p className="mt-2.5 px-1 text-[12px] leading-[1.6] text-stone-500">
                {item.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Audience Reaction ─────────────────────────────────────── */}
      <section className="mx-auto max-w-frame px-page-x mt-16 sm:mt-20">
        <motion.div {...fadeUp(0)}>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
            Audience reaction
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.3rem,1.4vw+0.95rem,1.7rem)] font-medium tracking-[-0.025em] text-stone-900">
            Genuine stakeholder interest
          </h2>
        </motion.div>

        {/* Hero quote — program manager, directly addressed to Khushboo */}
        <motion.blockquote
          {...fadeUp(0.08)}
          className="mt-6 rounded-2xl border border-[rgba(109,94,245,0.18)] bg-gradient-to-br from-[rgba(109,94,245,0.05)] to-[rgba(79,140,255,0.02)] px-6 py-7 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset] sm:px-8 sm:py-8"
        >
          <p className="font-display text-[clamp(1rem,0.9vw+0.82rem,1.2rem)] font-normal leading-[1.56] tracking-[-0.015em] text-stone-800 text-pretty">
            &ldquo;We could not have asked for a better idea champion and PO. Our team loved
            working with you and you knocked it out of the park — well done, not only on your
            presentations, but on all the work leading up to this.&rdquo;
          </p>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.16em] text-stone-400">
            Program Manager, Advanced Technology Solutions · WorkSafeBC
          </p>
        </motion.blockquote>

        {/* Three showcase quotes */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3 sm:gap-4">
          {(
            [
              {
                quote:
                  "Imagine working through this mind map on a big screen — seeing everything in one place, how it is all connected, and being able to zoom in and out.",
                attribution: "InnoFest 2025 attendee",
                delay: 0.1,
              },
              {
                quote: "Can this be used for other subject matters such as pain?",
                attribution: "Manager, RTW Compliance · WorkSafeBC",
                delay: 0.16,
              },
              {
                quote:
                  "Learned a lot from you about how you run as a product champion — and how you inspired the team to run ahead with the mind map.",
                attribution: "Data Scientist · WorkSafeBC",
                delay: 0.22,
              },
            ] as const
          ).map((q) => (
            <motion.blockquote
              key={q.attribution}
              {...fadeUp(q.delay)}
              className="rounded-2xl border border-stone-200/70 bg-white px-5 py-5 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset]"
            >
              <div className="mb-3">
                <span
                  className="inline-block h-px w-3 rounded-full bg-gradient-to-r from-[#6D5EF5] to-[#4F8CFF]"
                  aria-hidden
                />
              </div>
              <p className="font-display text-[0.92rem] font-normal leading-[1.6] tracking-[-0.01em] text-stone-700">
                &ldquo;{q.quote}&rdquo;
              </p>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
                {q.attribution}
              </p>
            </motion.blockquote>
          ))}
        </div>

        {/* Architect spotlight — cross-functional downstream impact */}
        <motion.div
          {...fadeUp(0.24)}
          className="mt-4 rounded-2xl border border-stone-200/70 bg-white shadow-[0_1px_0_rgba(255,255,255,0.95)_inset]"
        >
          <div className="border-b border-stone-200/50 px-6 py-4 sm:px-7">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">
              Cross-functional impact · Data Architecture · WorkSafeBC
            </p>
          </div>
          <div className="px-6 py-6 sm:px-7">
            {/* Two quotes from the same architect — unsolicited DM, then follow-up */}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <blockquote className="rounded-xl border border-stone-100 bg-stone-50/60 px-5 py-4">
                <p className="font-display text-[0.92rem] font-normal leading-[1.6] tracking-[-0.01em] text-stone-700">
                  &ldquo;I was particularly impressed with the mind mapping tool.&rdquo;
                </p>
                <p className="mt-2.5 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
                  Direct message to Khushboo, day of the demo
                </p>
              </blockquote>
              <blockquote className="rounded-xl border border-stone-100 bg-stone-50/60 px-5 py-4">
                <p className="font-display text-[0.92rem] font-normal leading-[1.6] tracking-[-0.01em] text-stone-700">
                  &ldquo;It was a static image — not a drag-and-drop beautiful thing as you guys
                  built.&rdquo;
                </p>
                <p className="mt-2.5 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
                  Follow-up after independently exploring alternatives
                </p>
              </blockquote>
            </div>
            <p className="mt-4 text-[13px] leading-[1.65] text-stone-500">
              The demo inspired a data architect to independently explore the visualization library
              for a different domain, build a working prototype, and start a discovery conversation
              about how it could modernize their ERD tooling — a direct product conversation that
              emerged from one design decision.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Recognition ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-scene px-page-x mt-16 sm:mt-20">
        <motion.div
          {...fadeUp(0)}
          className="overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.15)] bg-gradient-to-br from-[rgba(109,94,245,0.06)] to-[rgba(79,140,255,0.04)] px-6 py-8 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset] sm:px-8 sm:py-10"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent/60 sm:text-xs">
            Outcome
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.3rem,1.4vw+0.95rem,1.7rem)] font-medium tracking-[-0.025em] text-stone-900">
            Recognition
          </h2>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {(
              [
                { value: "36 ideas", label: "submitted org-wide" },
                { value: "Finalist", label: "Process Transformation" },
                { value: "2nd Place", label: "InnoFest 2025" },
              ] as const
            ).map((item, i) => (
              <div key={item.value} className="flex items-center gap-3">
                <div className="rounded-xl border border-[rgba(109,94,245,0.15)] bg-white px-4 py-3 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]">
                  <p className="font-display text-[1.2rem] font-medium tracking-[-0.02em] text-stone-900">
                    {item.value}
                  </p>
                  <p className="mt-0.5 text-[11px] text-stone-500">{item.label}</p>
                </div>
                {i < 2 && (
                  <svg
                    aria-hidden
                    className="h-3.5 w-3.5 shrink-0 text-stone-300"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <p className="mt-6 text-[13px] leading-[1.65] text-stone-600 sm:text-[14px]">
            The project generated strong engagement across healthcare, architecture, analytics, and
            operational stakeholders — and sparked follow-up conversations about applications beyond
            the original use case.
          </p>
        </motion.div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-scene px-page-x mt-12 sm:mt-16">
        <motion.div {...fadeUp(0)}>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
            Skills demonstrated
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <li key={skill} className="chip">
                {skill}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ── Footer nav ────────────────────────────────────────────── */}
      <div className="mx-auto max-w-scene px-page-x mt-12">
        <motion.p {...fadeUp(0)} className="text-sm text-stone-500">
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
