"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HomeHashLink } from "@/components/layout/HomeHashLink";
import { ParetoGrowthStrategy } from "@/components/projects/ParetoGrowthStrategy";
import { ProviderSegmentDiagram } from "@/components/projects/ProviderSegmentDiagram";
import { fadeUpInitial, motionDelay } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Design tokens ─────────────────────────────────────────────────── */

const SECTION = "mt-20 sm:mt-24 lg:mt-28";
const CARD = "rounded-2xl border border-stone-200/60 bg-white";
const CARD_PAD = "px-6 py-6 sm:px-7 sm:py-7";

/* ─── Static content ────────────────────────────────────────────────── */

const BASELINE_STATS = [
  {
    stat: "322K",
    unit: "digital lines / year",
    detail:
      "Small-volume providers already submitting online — the product had PMF for one segment.",
    delay: 0.06,
  },
  {
    stat: "3.7M",
    unit: "total line items",
    detail:
      "Across all channels — mail, fax, batch, and online — only a fraction captured digitally.",
    delay: 0.12,
  },
  {
    stat: "8.7%",
    unit: "digital share",
    detail:
      "Healthy for the segment it served, but the product had structurally run out of room to grow.",
    delay: 0.18,
  },
] as const;

const CEILING_LIMITS = [
  {
    icon: "1",
    label: "Claim per submission",
    detail:
      "Taxi and medical supply providers bill against dozens of claims simultaneously.",
  },
  {
    icon: "1",
    label: "Invoice reference number",
    detail:
      "No way to batch different invoice numbers into a single session.",
  },
  {
    icon: "11",
    label: "Screens per invoice",
    detail:
      "Multiply by 50 invoices — the experience became untenable before providers could even finish.",
  },
  {
    icon: "~32",
    label: "Line items max",
    detail:
      "High-volume providers in worker travel and hearing aid submit thousands of lines a month. The product capped out before they could start.",
  },
] as const;

const PLATFORM_PATHS = [
  {
    segment: "High-volume providers",
    channel: "Redesigned provider portal",
    needs:
      "Multi-claim and multi-invoice entries, line duplication, real-time validation — a portal built for throughput, not incremental UX polish.",
  },
  {
    segment: "Hearing aid providers",
    channel: "Blueprint EMR integration",
    needs:
      "Providers already run invoices through Blueprint. The unlock was a new Blueprint release supporting bulk uploads — demand mobilized bottom-up through provider organizations.",
  },
  {
    segment: "Physicians & GPs",
    channel: "Direct EMR integration",
    needs:
      "Workflows embedded at point of care. WorkSafeBC had to meet physicians inside their EMR — validated first through the OSCAR API integration.",
  },
] as const;

const PLATFORM_DELIVERABLES = [
  "$580K funding secured via business cases",
  "Provider portal redesigned for high-volume workflows",
  "Interoperability roadmap defined",
  "First API integration validated with OSCAR EMR",
  "Bottom-up demand built with provider orgs (Blueprint)",
] as const;

const DELIVERED_FEATURES = [
  "Multi-claim + multi-invoice per submission",
  "Real-time error validation",
  "Line duplication for repeat billing",
  "Bulk delete",
  "11 screens → 5 screens",
  "Targeted adoption strategy",
] as const;

const ROADMAP_SLICES = [
  {
    horizon: "Near-term",
    title: "Batch CSV Upload",
    body: "Providers in worker travel and medical supply already maintain invoice data in their own dispatch and billing systems. CSV upload removes manual re-entry entirely — meeting providers in the workflow they already have.",
  },
  {
    horizon: "Mid-term",
    title: "Vendor Integration — Bottom-Up Demand",
    body: "Hearing aid providers run invoices through Blueprint practice management software. The unlock wasn't a portal feature — it was Blueprint shipping bulk upload support in a new software release. Blueprint had little incentive to prioritize WorkSafeBC compatibility. Rather than negotiate directly, I mobilized internal Healthcare Operations staff and program managers — who hold daily provider relationships — to create grassroots feature requests from providers to Blueprint. Demand created bottom-up unlocks what top-down asks cannot.",
    callout: "Platform thinking: use distribution partners to create pull, not push.",
  },
  {
    horizon: "Long-term",
    title: "Direct EMR Integration",
    body: "The endgame: structured invoice data flowing directly from EMR to WorkSafeBC without any provider-side manual work. POC established through the Direct Connect Platform project — validating API-level data exchange across major BC EMRs. This closes the loop on the full digitization vision.",
    callout: "Zero-touch submission for providers already in a digital workflow.",
  },
] as const;

const GALLERY = [
  {
    src: "/videos/pis/multi-claim.mp4",
    caption: "Multi-claim submission — the core unlock for high-volume providers",
  },
  {
    src: "/videos/pis/bulk-delete.mp4",
    caption: "Bulk delete — managing large line-item sets without friction",
  },
  {
    src: "/videos/pis/line-duplication.mp4",
    caption: "Line duplication — repeat billing in a single click",
  },
  {
    src: "/videos/pis/draft-expansion.mp4",
    caption: "Draft management — visibility into in-progress work",
  },
] as const;

const ANALYTICS = [
  {
    src: "/images/pis/posthog/export-pis-submit-avg-line-items-v1-vs-v2-2026-06-19-210605.png",
    caption: "Avg line items per submission — v1 vs v2",
    label: "Throughput",
  },
  {
    src: "/images/pis/posthog/export-pis-did-our-changes-encourage-larger-volume-providers-to-use-pis-part-2-2026-06-19-210742.png",
    caption: "Did v2 activate larger-volume providers?",
    label: "Segment Activation",
  },
  {
    src: "/images/pis/posthog/export-pis-submit-monthly-v1-vs-v2-2026-06-19-210844.png",
    caption: "Monthly submission trend — v1 vs v2",
    label: "Adoption Curve",
  },
  {
    src: "/images/pis/posthog/export-pis-submit-with-multiple-claims-v2-2026-06-19-210946.png",
    caption: "Multi-claim feature usage in v2",
    label: "Feature Engagement",
  },
] as const;

const GTM_STEPS = [
  {
    phase: "Dark Launch",
    date: "Jan 1–14, 2026",
    detail:
      "Named high-value provider cohort — 10 providers, selected for paper volume and conversion potential. V1 runs in parallel; no disruption to existing users.",
  },
  {
    phase: "Soft Launch",
    date: "Jan 14+",
    detail:
      "V2 becomes default entry point. V1 accessible via banner link. Gather activation data from broader set.",
  },
  {
    phase: "Hard Launch",
    date: "Mar 12–25, 2026",
    detail:
      "Full segment rollout with batch upload live. Target: 44K digital line items/month — up from 26K.",
  },
] as const;

const SKILLS = [
  "Segment Expansion Strategy",
  "Growth Product Management",
  "Product Analytics (PostHog)",
  "Funnel Optimization",
  "Customer Segmentation",
  "Ecosystem & Platform Thinking",
  "Vendor Partnership Strategy",
  "Behavioral Economics",
  "Go-to-Market Execution",
  "User Research",
  "Business Case Development",
  "Cross-functional Leadership",
  "Activation Design",
] as const;

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

export function ProviderInvoicePage() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: fadeUpInitial(reduceMotion, 16),
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, margin: "-40px" },
    transition: {
      duration: 0.54,
      ease,
      delay: motionDelay(reduceMotion, delay),
    },
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

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-frame px-page-x">
        <div className="grid items-center gap-8 pt-8 sm:gap-10 sm:pt-10 lg:min-h-[88dvh] lg:grid-cols-[2fr_3fr] lg:gap-14 lg:pt-0">

          {/* Left: text */}
          <div>
            <motion.div {...fadeUp(0)}>
              <SectionLabel>WorkSafeBC · Healthcare Operations · Aug 2025 – Mar 2026</SectionLabel>
              <h1 className="gradient-hero-text font-display mt-3 text-[clamp(2.2rem,3.5vw+1.2rem,3.6rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                Provider Invoice Submission
              </h1>
              <p className="mt-3 text-[15px] font-medium leading-snug text-accent/90 sm:text-base">
                Segment expansion for a B2B invoicing platform — unlocking 280K blocked line items.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="mt-5 flex flex-wrap gap-2">
              <span className="chip-accent">$580K funding</span>
              <span className="chip">Product Manager</span>
              <span className="chip">Aug 2025 – Mar 2026</span>
              <span className="chip">PostHog instrumentation</span>
            </motion.div>

            <motion.p
              {...fadeUp(0.18)}
              className="mt-5 text-[15px] leading-[1.72] text-stone-600 sm:text-base sm:leading-[1.7]"
            >
              The MPS invoice portal had a working user base. But 40% of total invoice volume —
              from high-throughput providers submitting 200–1,900 lines/month — was architecturally
              blocked from ever activating. I led the product strategy to identify that segment,
              build for their workflow, and measure the expansion from day one.
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
            >
              <source src="/videos/pis/hero.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* ── The Baseline — what was already working ────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Starting point</SectionLabel>
          <SectionHeading>The product had traction — in one segment</SectionHeading>
        </motion.div>

        <div className="mt-8 hidden sm:flex sm:items-stretch sm:gap-3">
          {BASELINE_STATS.map((item, i) => (
            <div key={i} className="flex flex-1 items-stretch gap-3">
              {i > 0 && (
                <div className="flex shrink-0 items-center">
                  <svg aria-hidden className="h-5 w-5 text-stone-200" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10h12M12 5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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

        {/* Mobile */}
        <div className="mt-6 space-y-2 sm:hidden">
          {BASELINE_STATS.map((item, i) => (
            <motion.div key={i} {...fadeUp(item.delay)} className={`${CARD} px-5 py-5`}>
              <p className="gradient-hero-text font-display text-[1.5rem] font-medium leading-none tracking-[-0.03em]">
                {item.stat}
              </p>
              <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.07em] text-stone-500">
                {item.unit}
              </p>
              <p className="mt-2.5 text-[13px] leading-[1.62] text-stone-400">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── The Ceiling — structural product limits ────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>The diagnosis</SectionLabel>
          <SectionHeading>Not a UX problem. A capacity ceiling.</SectionHeading>
        </motion.div>

        <motion.p
          {...fadeUp(0.08)}
          className="mt-4 max-w-[52rem] text-[15px] leading-[1.72] text-stone-500"
        >
          High-volume providers weren&apos;t avoiding the product because it was hard to learn.
          They couldn&apos;t use it at all. The product was architected for low-volume, single-claim
          workflows — and every structural constraint compounded the problem at scale.
        </motion.p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {CEILING_LIMITS.map((item, i) => (
            <motion.div
              key={item.label}
              {...fadeUp(0.06 + i * 0.07)}
              className={`flex flex-col ${CARD} px-5 py-5`}
            >
              <p className="gradient-hero-text font-display text-[2rem] font-medium leading-none tracking-[-0.03em]">
                {item.icon}
              </p>
              <p className="mt-2 text-[13px] font-semibold text-stone-800">{item.label}</p>
              <p className="mt-2 text-[12px] leading-[1.6] text-stone-400">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Growth strategy — Pareto-informed GTM ───────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>The opportunity</SectionLabel>
          <SectionHeading>Data revealed where growth was actually blocked</SectionHeading>
        </motion.div>

        <motion.div {...fadeUp(0.08)} className="mt-8">
          <ParetoGrowthStrategy />
        </motion.div>
      </section>

      {/* ── Platform insight — one product → platform strategy ─────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>The insight</SectionLabel>
          <SectionHeading>One product couldn&apos;t serve every provider</SectionHeading>
        </motion.div>

        <motion.p
          {...fadeUp(0.08)}
          className="mt-4 max-w-[52rem] text-[15px] leading-[1.72] text-stone-500"
        >
          A single portal couldn&apos;t unlock the remaining paper volume. High-volume providers
          needed a redesigned experience. Hearing aid providers working through Blueprint needed
          their EMR to support bulk uploads in a new software release. Physicians needed
          WorkSafeBC embedded directly inside their EMRs at point of care. That insight shifted
          the roadmap from optimizing one product to building a long-term platform strategy.
        </motion.p>

        <motion.div {...fadeUp(0.12)} className="mt-8">
          <ProviderSegmentDiagram highlight="portal" />
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {PLATFORM_PATHS.map((path, i) => (
            <motion.div
              key={path.segment}
              {...fadeUp(0.14 + i * 0.06)}
              className={`flex flex-col ${CARD} ${CARD_PAD}`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
                {path.segment}
              </p>
              <p className="mt-2 font-display text-[1rem] font-medium tracking-[-0.018em] text-stone-900">
                {path.channel}
              </p>
              <p className="mt-2.5 flex-1 text-[13px] leading-[1.65] text-stone-500">{path.needs}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp(0.28)}
          className="mt-6 rounded-xl border border-[rgba(109,94,245,0.16)] bg-[rgba(109,94,245,0.04)] px-6 py-5"
        >
          <p className="text-[13px] leading-[1.7] text-stone-700 sm:text-[14px]">
            Built the business cases securing $580K in funding, redesigned the provider portal for
            high-volume workflows, defined an interoperability roadmap, validated the first API
            integration with OSCAR EMR, and partnered with provider organizations to build
            bottom-up demand for future integrations — starting with Blueprint.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {PLATFORM_DELIVERABLES.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-[rgba(109,94,245,0.14)] bg-white/70 px-3 py-1.5 text-[11px] font-medium text-stone-600"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ── Before / After ────────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Before and after</SectionLabel>
          <SectionHeading>The workflow that blocked an entire segment</SectionHeading>
        </motion.div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {/* Before */}
          <motion.div {...fadeUp(0.08)}>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-stone-200/60 bg-stone-50/80">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/videos/pis/old-tool.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="mt-3.5 px-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                V1 · Before
              </p>
              <p className="mt-1 text-[14px] font-medium leading-snug text-stone-700">
                11 screens. 1 claim. 1 invoice.
              </p>
              <p className="mt-1 text-[12px] leading-[1.6] text-stone-400">
                Designed for a physio clinic billing 3 claims/week. A taxi company with 1,900 lines/month hit a wall immediately.
              </p>
            </div>
          </motion.div>

          {/* After */}
          <motion.div {...fadeUp(0.14)}>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.22)] bg-[rgba(109,94,245,0.02)]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/videos/pis/hero.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="mt-3.5 px-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent/55">
                V2 · After
              </p>
              <p className="mt-1 text-[14px] font-medium leading-snug text-stone-900">
                5 screens. Multi-claim. 200+ lines. No ceiling.
              </p>
              <p className="mt-1 text-[12px] leading-[1.6] text-stone-400">
                A single session now handles what previously required dozens of separate submissions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Step reduction callout */}
        <motion.div
          {...fadeUp(0.2)}
          className={`mt-6 flex items-center gap-6 ${CARD} px-6 py-5 sm:flex-row`}
        >
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex flex-col items-center rounded-xl border border-stone-200/80 bg-stone-50 px-4 py-3">
              <span className="font-display text-[1.6rem] font-medium tracking-tight text-stone-400 line-through">
                11
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-300">
                screens
              </span>
            </div>
            <svg aria-hidden className="h-4 w-4 shrink-0 text-stone-300" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex flex-col items-center rounded-xl border border-[rgba(109,94,245,0.2)] bg-[rgba(109,94,245,0.04)] px-4 py-3">
              <span className="gradient-hero-text font-display text-[1.6rem] font-medium tracking-tight">
                5
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-400">
                screens
              </span>
            </div>
          </div>
          <p className="text-[13px] leading-[1.65] text-stone-500">
            Collapsing 11 screens to 5 wasn&apos;t cosmetic. For providers submitting 50+ invoices,
            it was the difference between a viable workflow and an impossible one.
          </p>
        </motion.div>
      </section>

      {/* ── What We Built + Roadmap ────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Product strategy</SectionLabel>
          <SectionHeading>Shipped — then a roadmap toward zero-touch submission</SectionHeading>
        </motion.div>

        {/* Slice 1 — full-width delivered card */}
        <motion.div
          {...fadeUp(0.08)}
          className="mt-8 overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.2)] bg-gradient-to-br from-[rgba(109,94,245,0.05)] to-[rgba(79,140,255,0.02)]"
        >
          <div className="border-b border-[rgba(109,94,245,0.08)] px-6 py-3 sm:px-8">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent/45">
                Aug 2025 – Mar 16, 2026
              </span>
              <span className="rounded-full bg-[rgba(109,94,245,0.1)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/60">
                Delivered
              </span>
            </div>
          </div>
          <div className="px-6 py-6 sm:px-8 sm:py-7">
            <h3 className="font-display text-[1.15rem] font-medium tracking-[-0.02em] text-stone-900">
              Rebuilt the submission experience for high-volume providers
            </h3>
            <p className="mt-2.5 text-[13px] leading-[1.68] text-stone-500 sm:text-[14px]">
              Every shipped feature was chosen to remove a specific structural barrier blocking the
              target segment — not to improve the experience for providers who were already active.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {DELIVERED_FEATURES.map((f) => (
                <li
                  key={f}
                  className="rounded-lg border border-[rgba(109,94,245,0.14)] bg-white/70 px-3 py-1.5 text-[12px] font-medium text-stone-700"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Roadmap — 3 forward-looking cards */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {ROADMAP_SLICES.map((slice, i) => (
            <motion.div
              key={slice.title}
              {...fadeUp(0.12 + i * 0.07)}
              className={`card-interactive flex flex-col ${CARD} ${CARD_PAD}`}
            >
              <div className="mb-4 flex items-center gap-2.5">
                <GradientBar />
                <span className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400">
                  {slice.horizon}
                </span>
              </div>
              <h3 className="font-display text-[1rem] font-medium tracking-[-0.018em] text-stone-900">
                {slice.title}
              </h3>
              <p className="mt-2.5 flex-1 text-[13px] leading-[1.68] text-stone-500">{slice.body}</p>
              {"callout" in slice && slice.callout && (
                <p className="mt-4 rounded-lg border border-stone-100 bg-stone-50 px-3.5 py-2.5 text-[11px] leading-[1.6] text-stone-500 italic">
                  {slice.callout}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Feature Demo Gallery ───────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Product screens</SectionLabel>
          <SectionHeading>Features purpose-built for the new segment</SectionHeading>
        </motion.div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {GALLERY.map((item, i) => (
            <motion.div key={item.src} {...fadeUp(0.06 + i * 0.07)}>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-stone-200/60 bg-stone-50">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              </div>
              <p className="mt-3 text-[12px] leading-[1.6] text-stone-400">{item.caption}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Instrumentation & Analytics ────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Instrumentation</SectionLabel>
          <SectionHeading>PostHog spec written before launch. Measured from day one.</SectionHeading>
        </motion.div>

        <motion.div {...fadeUp(0.08)} className={`mt-6 ${CARD} ${CARD_PAD}`}>
          <p className="mb-5 text-[13px] leading-[1.68] text-stone-500 sm:text-[14px]">
            Before Slice 1 launched, I wrote the full PostHog analytics spec — defining exactly which
            events, properties, and funnels would distinguish v1 activity from v2 activity. The
            goal: know within days of soft launch whether the new segment was actually activating,
            and whether existing users were disrupted.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "v1 vs v2 daily submissions",
              "avg line items per submission",
              "multi-claim usage rate",
              "large-volume provider activation (50+, 200+ lines)",
              "session duration",
              "funnel: dashboard → confirmation",
              "optional field adoption",
              "error rate by type",
            ].map((metric) => (
              <span key={metric} className="chip text-[11px]">
                {metric}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {ANALYTICS.map((item, i) => (
            <motion.div key={item.src} {...fadeUp(0.06 + i * 0.07)}>
              <div className="relative overflow-hidden rounded-2xl border border-stone-200/60 bg-stone-50">
                <div className="border-b border-stone-100 px-4 py-2.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                    {item.label}
                  </span>
                </div>
                <div className="relative aspect-[16/9]">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    className="object-contain object-center p-2"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </div>
              <p className="mt-2.5 text-[12px] leading-[1.6] text-stone-400">{item.caption}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Go-to-Market ──────────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Go-to-market</SectionLabel>
          <SectionHeading>Named-cohort dark launch. V1 preserved throughout.</SectionHeading>
        </motion.div>

        <motion.p
          {...fadeUp(0.08)}
          className="mt-4 max-w-[52rem] text-[15px] leading-[1.72] text-stone-500"
        >
          A broad rollout would have risked disrupting the existing user base. Instead, we launched
          to a named cohort of 10 high-volume providers — selected for paper volume and conversion
          potential — while V1 remained live for everyone else.
        </motion.p>

        <div className="mt-8 flex flex-col gap-0">
          {GTM_STEPS.map((step, i) => (
            <motion.div
              key={step.phase}
              {...fadeUp(0.06 + i * 0.08)}
              className="relative flex gap-5"
            >
              {/* Timeline spine */}
              <div className="flex flex-col items-center">
                <div
                  className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                    i === 0
                      ? "bg-gradient-to-br from-[#6D5EF5] to-[#4F8CFF]"
                      : "border border-stone-300 bg-white"
                  }`}
                />
                {i < GTM_STEPS.length - 1 && (
                  <div className="mt-1 w-px flex-1 bg-stone-100" style={{ minHeight: "3rem" }} />
                )}
              </div>

              {/* Content */}
              <div className={`pb-8 ${i === GTM_STEPS.length - 1 ? "pb-0" : ""}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                  {step.date}
                </p>
                <p className="mt-0.5 text-[14px] font-semibold text-stone-900">{step.phase}</p>
                <p className="mt-1.5 text-[13px] leading-[1.65] text-stone-500">{step.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dark launch provider names */}
        <motion.div {...fadeUp(0.28)} className={`mt-6 ${CARD} ${CARD_PAD}`}>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
            Dark launch cohort — Jan 1–14, 2026
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { type: "Worker Travel", desc: "Taxi providers submitting multi-claim, high-volume runs" },
              { type: "Hearing Aid", desc: "Providers billing hearing aid devices across many patients" },
              { type: "Physiotherapy & Imaging", desc: "Clinics billing repeat fee codes across service dates" },
            ].map((item) => (
              <div key={item.type} className="rounded-xl border border-stone-100 bg-stone-50/60 px-4 py-3">
                <p className="text-[12px] font-semibold text-stone-700">{item.type}</p>
                <p className="mt-1 text-[11px] leading-[1.55] text-stone-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Outcomes ──────────────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Outcomes</SectionLabel>
          <SectionHeading>Paper channels halved. Online submission majority reached.</SectionHeading>
        </motion.div>

        <motion.p
          {...fadeUp(0.06)}
          className="mt-4 max-w-[52rem] text-[15px] leading-[1.72] text-stone-500"
        >
          The business goal was simple: move providers off mail and fax and onto digital channels.
          The chart below shows the full channel shift from 2023 to 2026 — spanning pre-project
          baseline through post-launch adoption.
        </motion.p>

        {/* Outcomes chart — full width */}
        <motion.div
          {...fadeUp(0.1)}
          className="mt-8 overflow-hidden rounded-2xl border border-stone-200/60 bg-stone-50"
        >
          <div className="border-b border-stone-100 px-5 py-3 sm:px-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
              Provider invoicing line items by submission method · 2023–2026
            </p>
          </div>
          <div className="relative w-full">
            <Image
              src="/images/pis/outcomes-chart.png"
              alt="Provider invoicing channel shift 2023–2026: MPS (online) grew from 39% to 55%, paper channels dropped from 56% to 19%"
              width={1200}
              height={500}
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>

        {/* Channel shift stat pills */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {(
            [
              {
                before: "56%",
                after: "19%",
                label: "Paper channels (mail + fax)",
                detail: "Combined mail and fax share of all invoice line items — down from majority to under a fifth.",
                direction: "down",
                delay: 0.12,
              },
              {
                before: "44%",
                after: "81%",
                label: "Online channels (MPS + upload)",
                detail: "Combined digital share — grew from less than half to the clear majority of all submissions.",
                direction: "up",
                delay: 0.18,
              },
              {
                before: "39%",
                after: "55%",
                label: "MPS portal share",
                detail: "The core online portal share — consistent growth as new segments activated on the product.",
                direction: "up",
                delay: 0.24,
              },
            ] as const
          ).map((item) => (
            <motion.div
              key={item.label}
              {...fadeUp(item.delay)}
              className={`${CARD} ${CARD_PAD}`}
            >
              <div className="flex items-end gap-2.5">
                <span className="font-display text-[1.05rem] font-medium tracking-tight text-stone-300 line-through">
                  {item.before}
                </span>
                <svg aria-hidden className="mb-0.5 h-3.5 w-3.5 shrink-0 text-stone-300" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span
                  className={`font-display text-[1.6rem] font-medium leading-none tracking-[-0.03em] ${
                    item.direction === "up" ? "gradient-hero-text" : "text-stone-800"
                  }`}
                >
                  {item.after}
                </span>
              </div>
              <p className="mt-2 text-[12px] font-semibold text-stone-700">{item.label}</p>
              <p className="mt-1.5 text-[12px] leading-[1.6] text-stone-400">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Context cards */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {(
            [
              {
                label: "Budget",
                value: "$580K",
                detail: "Aug 2025 – Mar 2026. Business cases approved by executive sponsor before a dollar was spent.",
                delay: 0.14,
              },
              {
                label: "ELAN savings to date",
                value: "~$50K",
                detail: "Early savings from paper volume reduction as the first provider cohorts moved to MPS v2.",
                delay: 0.2,
              },
              {
                label: "Existing users",
                value: "Unaffected",
                detail: "V1 remained fully live throughout. No disruption to the user base that was already working.",
                delay: 0.26,
              },
            ] as const
          ).map((item) => (
            <motion.div
              key={item.label}
              {...fadeUp(item.delay)}
              className="overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.12)] bg-gradient-to-br from-[rgba(109,94,245,0.04)] to-transparent"
            >
              <div className="px-5 py-5 sm:px-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
                  {item.label}
                </p>
                <p className="font-display mt-1.5 text-[1.4rem] font-medium tracking-[-0.02em] text-stone-900">
                  {item.value}
                </p>
                <p className="mt-2 text-[12px] leading-[1.6] text-stone-500">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-frame px-page-x mt-16 sm:mt-20">
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
