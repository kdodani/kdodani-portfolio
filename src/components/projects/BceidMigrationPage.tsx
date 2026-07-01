"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HomeHashLink } from "@/components/layout/HomeHashLink";
import { MigrationCoordinationDiagram } from "@/components/projects/MigrationCoordinationDiagram";
import { fadeUpInitial, motionDelay } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Design tokens ─────────────────────────────────────────────────── */

const SECTION = "mt-20 sm:mt-24 lg:mt-28";
const CARD = "rounded-2xl border border-stone-200/60 bg-white";
const CARD_PAD = "px-6 py-6 sm:px-7 sm:py-7";

/* ─── Static content ────────────────────────────────────────────────── */

const IMPACT_STATS = [
  {
    stat: "62K+",
    unit: "Annual referrals protected",
    detail:
      "The Telus Provider Portal processes 62,000+ referrals/year across 65 healthcare programs — all dependent on uninterrupted provider access.",
    delay: 0.06,
  },
  {
    stat: "5,600+",
    unit: "Provider accounts migrated",
    detail:
      "Every active healthcare provider account was transitioned to ForgeRock CIAM without loss of access.",
    delay: 0.10,
  },
  {
    stat: "500+",
    unit: "Organizations transitioned",
    detail:
      "Provider organizations across British Columbia — clinics, specialists, and allied health providers — successfully onboarded.",
    delay: 0.14,
  },
  {
    stat: "0",
    unit: "Service disruptions",
    detail:
      "Zero interruptions to referrals, claims processing, or billing workflows throughout the entire transition.",
    delay: 0.18,
  },
  {
    stat: "100%",
    unit: "Active accounts transitioned",
    detail:
      "All active BCeID accounts were transitioned by project close. No provider was left without access.",
    delay: 0.22,
  },
  {
    stat: "Mar 2025",
    unit: "On-time go-live",
    detail:
      "Delivered against the government's fixed decommission deadline. No extensions requested or required.",
    delay: 0.26,
  },
] as const;

const SITUATION_CARDS = [
  {
    num: "01",
    heading: "Government deadline",
    body: "BC Government announced the decommissioning of Personal BCeID — the authentication system used by the Telus Provider Portal — effective March 2025.",
  },
  {
    num: "02",
    heading: "Critical portal at risk",
    body: "The Telus Provider Portal processes 62,000+ referrals/year across 65 healthcare programs and had relied on BCeID authentication since 2011.",
  },
  {
    num: "03",
    heading: "Provider access on the line",
    body: "Without intervention, 5,600 providers would lose access to referrals, claims, billing, and payment status — disrupting care delivery across British Columbia.",
  },
] as const;

const CONSTRAINTS = [
  {
    label: "Hard government deadline",
    detail:
      "March 2025 was fixed and non-negotiable. The BC Government would not extend BCeID availability for any organization.",
  },
  {
    label: "Missing data required for migration",
    detail:
      "ForgeRock required email addresses to create accounts. BCeID did not require email — most of the 5,600 providers had no email on file.",
  },
  {
    label: "Scale",
    detail:
      "5,600 individual accounts across 500 provider organizations — each requiring a new credential before go-live.",
  },
  {
    label: "External dependency chain",
    detail:
      "BC Government · TELUS/CPR · PCIS · WorkSafeBC Architecture, Security, Privacy, and Operations all sat in the critical path.",
  },
  {
    label: "Healthcare service disruption risk",
    detail:
      "Any access failure had direct downstream consequences: delayed referrals, failed claims, and disrupted payment processing for injured worker care.",
  },
] as const;

const DECISIONS = [
  {
    decision: "Collect emails before migration — not after",
    tradeoff: "More upfront effort · Less post-launch disruption",
    impact:
      "Designing a 28-day behavioral campaign upfront reduced support burden and login failures at go-live. The cost of a difficult launch would have far outweighed the cost of proactive outreach.",
  },
  {
    decision: "Target org administrators, not individual users",
    tradeoff: "Less direct control · Much greater reach",
    impact:
      "With 5,600 individuals and no direct contact info, reaching 500 administrators with known contact details turned each organization into a communication multiplier. A direct-to-provider approach would have failed.",
  },
  {
    decision: "Build a straggler migration path",
    tradeoff: "Operational complexity · Lower launch risk",
    impact:
      "Providers who missed the email window needed a defined fallback. Daily delta batch jobs and manual helpdesk escalation prevented launch delays and ensured no provider was stranded.",
  },
  {
    decision: "Prepare support operations before go-live",
    tradeoff: "Additional preparation effort · Lower provider friction",
    impact:
      "FAQ documentation, a dedicated support email channel, and advance helpdesk briefing meant support staff were equipped before the first login attempt — not scrambling after.",
  },
] as const;

const TECH_CONCEPTS = [
  {
    term: "CIAM",
    desc: "Customer Identity and Access Management — the platform layer governing how providers authenticate and access portal services.",
  },
  {
    term: "Identity lifecycle",
    desc: "How provider accounts are created, migrated, updated, and deprovisioned across interconnected systems.",
  },
  {
    term: "SAML 2.0",
    desc: "The authentication standard used to pass provider credentials between ForgeRock and the TELUS Provider Portal.",
  },
  {
    term: "User provisioning",
    desc: "Creating ForgeRock accounts at scale using extracted data from BCeID and the Central Provider Registry.",
  },
  {
    term: "Account migration",
    desc: "Transitioning BCeID identities to ForgeRock while preserving existing provider GUIDs for downstream system continuity.",
  },
  {
    term: "Access continuity",
    desc: "Ensuring role-based access to referrals, reports, and claims was preserved throughout the credential transition.",
  },
] as const;

const TIMELINE = [
  {
    phase: "Discovery",
    date: "March 2024",
    detail:
      "Initiated cross-functional discovery with architects, security, and TELUS. Surfaced the GUID dependency risk and defined the short- and long-term migration strategy.",
  },
  {
    phase: "Email Collection Campaign",
    date: "Feb 1–28, 2025",
    detail:
      "Designed and executed a multi-channel outreach campaign — portal banners, administrator emails, and HC program manager channels — to collect email addresses from 5,600 providers within 28 days.",
  },
  {
    phase: "Account Provisioning",
    date: "March 1–21, 2025",
    detail:
      "ForgeRock accounts created from collected emails. Straggler batch jobs run daily. CPR extract delivered to TELUS. Helpdesk briefed and support documentation finalized before launch.",
  },
  {
    phase: "Go-Live",
    date: "March 22, 2025",
    detail:
      "BCeID authentication replaced with ForgeRock across the TELUS Provider Portal. Zero service disruptions. Provider access maintained throughout.",
  },
  {
    phase: "Post-Migration Cleanup",
    date: "April – June 2025",
    detail:
      "Ongoing access monitoring, straggler outreach via HC program administrators, updated onboarding documentation. Project formally closed June 30, 2025.",
  },
] as const;

const RESULTS = [
  {
    headline: "Uninterrupted provider access",
    detail:
      "All 5,600 providers maintained access to the Telus Provider Portal through go-live with no login failures or access gaps.",
  },
  {
    headline: "62,000+ annual referrals protected",
    detail:
      "No disruption to referral workflows across 65 healthcare programs — injured workers' care pathways remained intact.",
  },
  {
    headline: "Claims and billing unaffected",
    detail:
      "Invoice submission, payment status, and claims reporting continued without interruption throughout the transition.",
  },
  {
    headline: "All deliverables completed on time",
    detail:
      "100% of planned deliverables delivered as scoped. No deferrals, no extensions. Project closed June 30, 2025.",
  },
] as const;

const REFLECTIONS = [
  "Platform products succeed when adoption is designed, not assumed. Getting 5,600 providers to act within 28 days required behavioral design — not just a system change.",
  "Technical migrations are ultimately behavior-change problems. The hardest constraint wasn't ForgeRock configuration — it was getting providers to update a field they'd never been asked to fill in.",
  "Organizational alignment is often more challenging than technical implementation. Five organizations with competing priorities and timelines had to move together. That coordination was the product.",
] as const;

const SKILLS = [
  "Platform Strategy",
  "Enterprise Product Management",
  "Technical Product Management",
  "Identity & Access Management",
  "Stakeholder Leadership",
  "Change Management",
  "Risk Mitigation",
  "Cross-Functional Leadership",
  "Business Requirements",
  "Migration Strategy",
  "Communications Planning",
  "Ecosystem Thinking",
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

export function BceidMigrationPage() {
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
              <SectionLabel>WorkSafeBC · Healthcare Operations · March 2024 – June 2025</SectionLabel>
              <h1 className="gradient-hero-text font-display mt-3 text-[clamp(2.2rem,3.5vw+1.2rem,3.6rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                Identity Platform Modernization
              </h1>
              <p className="mt-3 text-[15px] font-medium leading-snug text-accent/90 sm:text-base">
                Migrated 5,600 healthcare providers to a modern CIAM platform without disrupting access to referral and claims services.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="mt-5 flex flex-wrap gap-2">
              <span className="chip-accent">Platform PM</span>
              <span className="chip">CIAM</span>
              <span className="chip">Identity &amp; Access Management</span>
              <span className="chip">Change Management</span>
              <span className="chip">Enterprise Ecosystem</span>
            </motion.div>

            <motion.p
              {...fadeUp(0.18)}
              className="mt-5 text-[15px] leading-[1.72] text-stone-600 sm:text-base sm:leading-[1.7]"
            >
              The BC Government decommissioned BCeID — the authentication system
              used by 5,600 healthcare providers — with a fixed March 2025 deadline.
              I owned discovery, business requirements, migration strategy, and
              the change management campaign that moved an entire provider ecosystem
              to a new identity platform without a single service disruption.
            </motion.p>
          </div>

          {/* Right: dependency flow card */}
          <motion.div
            {...fadeUp(0.12)}
            className="overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-[0_16px_64px_-16px_rgba(0,0,0,0.10),0_1px_0_rgba(255,255,255,0.9)_inset]"
          >
            <div className="px-6 py-6 sm:px-8 sm:py-7">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                  Platform dependency chain
                </p>
                <span className="rounded-full border border-red-100 bg-red-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-red-500">
                  March 2025 deadline
                </span>
              </div>

              {/* Flow */}
              <div className="flex flex-col items-center gap-0">
                {[
                  {
                    label: "BC Government",
                    sub: "Decommissions BCeID",
                    accent: false,
                    isSource: true,
                  },
                  {
                    label: "Telus Provider Portal",
                    sub: "BCeID-dependent since 2011",
                    accent: false,
                    isSource: false,
                  },
                  {
                    label: "500 Provider Organizations",
                    sub: "Clinics across British Columbia",
                    accent: false,
                    isSource: false,
                  },
                  {
                    label: "5,600 Healthcare Providers",
                    sub: "Active accounts at risk",
                    accent: false,
                    isSource: false,
                  },
                  {
                    label: "Referrals + Claims",
                    sub: "62,000+ annually",
                    accent: false,
                    isSource: false,
                  },
                ].map((node, i, arr) => (
                  <div key={node.label} className="flex w-full flex-col items-center">
                    <div
                      className={`w-full rounded-xl border px-4 py-3 text-center ${
                        node.isSource
                          ? "border-stone-200 bg-stone-50"
                          : "border-stone-200/70 bg-white"
                      }`}
                    >
                      <p className="text-[13px] font-semibold text-stone-800">{node.label}</p>
                      <p className="mt-0.5 text-[11px] text-stone-400">{node.sub}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="my-1 flex h-6 flex-col items-center justify-center gap-0.5">
                        <div className="h-3 w-px bg-gradient-to-b from-stone-300 to-stone-200" />
                        <svg aria-hidden className="h-3 w-3 text-stone-300" viewBox="0 0 12 12" fill="none">
                          <path d="M6 2v6M3 6l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Outcome badge */}
              <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-[rgba(109,94,245,0.16)] bg-gradient-to-r from-[rgba(109,94,245,0.06)] to-[rgba(79,140,255,0.04)] px-4 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#6D5EF5] to-[#4F8CFF]" />
                <p className="text-[12px] font-semibold text-accent/80">
                  0 service disruptions — all 5,600 accounts transitioned
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Impact snapshot ───────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Impact snapshot</SectionLabel>
          <SectionHeading>Business outcomes first</SectionHeading>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {IMPACT_STATS.map((item) => (
            <motion.div
              key={item.unit}
              {...fadeUp(item.delay)}
              className={`flex flex-col ${CARD} px-5 py-6`}
            >
              <p className="gradient-hero-text font-display text-[clamp(1.8rem,2.5vw+1rem,2.6rem)] font-medium leading-none tracking-[-0.03em]">
                {item.stat}
              </p>
              <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.07em] text-stone-500">
                {item.unit}
              </p>
              <p className="mt-3 text-[13px] leading-[1.62] text-stone-400">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── The situation ─────────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>The situation</SectionLabel>
          <SectionHeading>A fixed deadline. A critical platform. No fallback.</SectionHeading>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {SITUATION_CARDS.map((card, i) => (
            <motion.div
              key={card.num}
              {...fadeUp(0.06 + i * 0.07)}
              className={`flex flex-col ${CARD} ${CARD_PAD}`}
            >
              <p className="gradient-hero-text font-display text-[1.4rem] font-medium leading-none tracking-[-0.02em]">
                {card.num}
              </p>
              <p className="mt-3 text-[14px] font-semibold text-stone-900">{card.heading}</p>
              <p className="mt-2 text-[13px] leading-[1.65] text-stone-500">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── What made this hard ───────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Constraints</SectionLabel>
          <SectionHeading>What made this hard</SectionHeading>
        </motion.div>

        <motion.p
          {...fadeUp(0.08)}
          className="mt-4 max-w-[52rem] text-[15px] leading-[1.72] text-stone-500"
        >
          Platform migrations rarely fail because of bad code. They fail because the
          organizational and data constraints are underestimated. These were the ones
          that shaped every decision.
        </motion.p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {CONSTRAINTS.map((item, i) => (
            <motion.div
              key={item.label}
              {...fadeUp(0.06 + i * 0.07)}
              className={`flex flex-col gap-3 ${CARD} ${CARD_PAD}`}
            >
              <div className="flex items-center gap-2.5">
                <GradientBar />
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-700">
                  {item.label}
                </p>
              </div>
              <p className="text-[13px] leading-[1.65] text-stone-500">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Product challenge ─────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div
          {...fadeUp(0.06)}
          className="overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.2)] bg-gradient-to-br from-[rgba(109,94,245,0.06)] to-[rgba(79,140,255,0.03)]"
        >
          <div className="px-8 py-10 sm:px-10 sm:py-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/50">
              The product challenge
            </p>
            <p className="font-display mt-4 text-[clamp(1.15rem,1.4vw+0.8rem,1.55rem)] font-medium leading-[1.38] tracking-[-0.025em] text-stone-900">
              &ldquo;How do we transition thousands of healthcare providers to a new identity platform without creating login failures, support spikes, or service interruptions?&rdquo;
            </p>
            <p className="mt-5 max-w-[44rem] text-[14px] leading-[1.72] text-stone-500">
              The underlying complexity: the new platform required data the old platform had never
              collected. The migration couldn&apos;t begin until providers took action. Designing that
              behavioral transition — at scale, across five organizations, with a hard deadline —
              was the product problem.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── My role ───────────────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>My role</SectionLabel>
          <SectionHeading>What I owned — and what I partnered on</SectionHeading>
        </motion.div>

        <motion.div
          {...fadeUp(0.08)}
          className={`mt-8 grid gap-0 overflow-hidden ${CARD} sm:grid-cols-2`}
        >
          {/* Owned */}
          <div className="border-b border-stone-200/60 px-7 py-7 sm:border-b-0 sm:border-r">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
              Owned
            </p>
            <ul className="space-y-3">
              {[
                "Discovery & product definition",
                "Business requirements",
                "Risk identification & mitigation",
                "Migration strategy",
                "Change management plan",
                "Communications planning",
                "Stakeholder alignment",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#6D5EF5] to-[#4F8CFF]" />
                  <span className="text-[13px] font-medium text-stone-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Partnered */}
          <div className="px-7 py-7">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
              Partnered with
            </p>
            <ul className="space-y-3">
              {[
                { name: "Architecture", note: "ForgeRock design & GUID strategy" },
                { name: "Security", note: "Authentication & compliance requirements" },
                { name: "Privacy", note: "PII handling & data requirements" },
                { name: "TELUS", note: "CPR integration & provider portal" },
                { name: "Operations", note: "Helpdesk & HC program coordination" },
              ].map((item) => (
                <li key={item.name} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full border border-stone-300 bg-white" />
                  <div>
                    <span className="text-[13px] font-medium text-stone-700">{item.name}</span>
                    <span className="ml-1.5 text-[12px] text-stone-400">— {item.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* ── The hidden blocker ────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>The hidden blocker</SectionLabel>
          <SectionHeading>The migration couldn&apos;t start until providers took action</SectionHeading>
        </motion.div>

        <motion.p
          {...fadeUp(0.08)}
          className="mt-4 max-w-[52rem] text-[15px] leading-[1.72] text-stone-500"
        >
          The first challenge was a data gap discovered during discovery. ForgeRock required an
          email address to create an account. BCeID never required email — it was optional.
          The result: most of the 5,600 providers had no email address on file anywhere in the system.
        </motion.p>

        {/* Before / After state */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {/* Before */}
          <motion.div {...fadeUp(0.1)} className={`flex flex-col ${CARD} ${CARD_PAD}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
              Current state — BCeID
            </p>
            <ul className="mt-5 space-y-3">
              {[
                { field: "Login method", value: "Username + password", warn: false },
                { field: "Email address", value: "Optional — rarely provided", warn: true },
                { field: "Contact info", value: "No verified data on file", warn: true },
                { field: "Account creation", value: "In-person verification at BC Services", warn: false },
              ].map((row) => (
                <li key={row.field} className="flex items-start justify-between gap-4 border-b border-stone-100 pb-3 last:border-0 last:pb-0">
                  <span className="text-[12px] text-stone-400">{row.field}</span>
                  <span className={`text-right text-[12px] font-medium ${row.warn ? "text-amber-600" : "text-stone-700"}`}>
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            {...fadeUp(0.16)}
            className="flex flex-col overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.2)] bg-gradient-to-br from-[rgba(109,94,245,0.04)] to-transparent"
          >
            <div className={CARD_PAD}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent/55">
                Future state — ForgeRock
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  { field: "Login method", value: "Email + password", good: true },
                  { field: "Email address", value: "Required — must be verified", good: true },
                  { field: "Contact info", value: "Primary identifier for account", good: true },
                  { field: "Account creation", value: "Self-serve digital registration", good: true },
                ].map((row) => (
                  <li key={row.field} className="flex items-start justify-between gap-4 border-b border-[rgba(109,94,245,0.08)] pb-3 last:border-0 last:pb-0">
                    <span className="text-[12px] text-stone-400">{row.field}</span>
                    <span className="text-right text-[12px] font-medium text-stone-800">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* The implication */}
        <motion.div
          {...fadeUp(0.22)}
          className={`mt-5 ${CARD} ${CARD_PAD}`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
            The implication
          </p>
          <p className="mt-3 text-[14px] leading-[1.72] text-stone-600 sm:text-[15px]">
            The migration could not proceed until providers first updated their BCeID profiles with
            an email address. This was a prerequisite the system had no mechanism to force. It became
            the key product problem: <span className="font-semibold text-stone-900">design a behavioral change campaign targeting 500 org admins
            to cascade to 5,600 providers — within a 28-day window, before a fixed government deadline.</span>
          </p>
        </motion.div>
      </section>

      {/* ── Critical product decisions ────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Critical product decisions</SectionLabel>
          <SectionHeading>Four decisions that shaped the outcome</SectionHeading>
        </motion.div>

        <motion.p
          {...fadeUp(0.08)}
          className="mt-4 max-w-[52rem] text-[15px] leading-[1.72] text-stone-500"
        >
          The migration timeline was fixed. The decisions below determined whether it would succeed
          smoothly or generate support spikes, access failures, and provider frustration.
        </motion.p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {DECISIONS.map((d, i) => (
            <motion.div
              key={d.decision}
              {...fadeUp(0.08 + i * 0.07)}
              className={`card-interactive flex flex-col ${CARD} ${CARD_PAD}`}
            >
              <div className="mb-4 flex items-center gap-2.5">
                <GradientBar />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-400">
                  Decision {i + 1}
                </span>
              </div>
              <h3 className="font-display text-[1.05rem] font-medium leading-snug tracking-[-0.018em] text-stone-900">
                {d.decision}
              </h3>
              <div className="mt-4 rounded-lg border border-stone-100 bg-stone-50/80 px-3.5 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  Tradeoff
                </p>
                <p className="mt-1 text-[12px] leading-[1.6] text-stone-500">{d.tradeoff}</p>
              </div>
              <div className="mt-3 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  Why it mattered
                </p>
                <p className="mt-1.5 text-[13px] leading-[1.68] text-stone-600">{d.impact}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Ecosystem complexity ──────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Identity modernization</SectionLabel>
          <SectionHeading>Nine parties. One deadline.</SectionHeading>
        </motion.div>

        <motion.p
          {...fadeUp(0.08)}
          className="mt-4 max-w-[52rem] text-[15px] leading-[1.72] text-stone-500"
        >
          Government set the deadline. Vendors owned the portal. Engineering built ForgeRock.
          Providers had to act before migration could begin. The artifact below maps how those
          lanes coordinated across a fifteen-month program.
        </motion.p>

        <motion.div {...fadeUp(0.12)} className="mt-8">
          <MigrationCoordinationDiagram />
        </motion.div>
      </section>

      {/* ── Technical environment ─────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Technical environment</SectionLabel>
          <SectionHeading>Working in a highly technical environment</SectionHeading>
        </motion.div>

        <motion.p
          {...fadeUp(0.08)}
          className="mt-4 max-w-[52rem] text-[15px] leading-[1.72] text-stone-500"
        >
          This project required consistent collaboration with enterprise architects, security teams,
          and external vendors working on ForgeRock CIAM integration. My role was not to design
          the architecture — it was to ensure business requirements were represented in every
          technical decision, and that the provider experience remained the north star.
        </motion.p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {TECH_CONCEPTS.map((item, i) => (
            <motion.div
              key={item.term}
              {...fadeUp(0.06 + i * 0.06)}
              className={`${CARD} ${CARD_PAD}`}
            >
              <p className="text-[13px] font-semibold text-stone-800">{item.term}</p>
              <p className="mt-2 text-[12px] leading-[1.65] text-stone-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp(0.28)}
          className="mt-5 overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.14)] bg-gradient-to-br from-[rgba(109,94,245,0.04)] to-transparent"
        >
          <div className={CARD_PAD}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
              How product partnered with architecture
            </p>
            <p className="mt-3 text-[14px] leading-[1.72] text-stone-600 sm:text-[15px]">
              I participated in architecture design reviews, asking business and provider-impact
              questions — not authoring the technical design. For example: when the team was
              evaluating how to handle the GUID dependency (provider artifacts like referrals and
              invoices were tied to the BCeID GUID), I worked with architects to understand the
              business implications of different options, and ensured the requirement to preserve
              provider continuity was reflected in the chosen approach. The architecture decision was
              theirs. The business requirement it had to satisfy was mine to define.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Migration timeline ────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Migration timeline</SectionLabel>
          <SectionHeading>Five phases. Fifteen months.</SectionHeading>
        </motion.div>

        <div className="mt-8 flex flex-col gap-0">
          {TIMELINE.map((step, i) => (
            <motion.div
              key={step.phase}
              {...fadeUp(0.06 + i * 0.08)}
              className="relative flex gap-5"
            >
              {/* Spine */}
              <div className="flex flex-col items-center">
                <div
                  className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                    i === 0
                      ? "bg-gradient-to-br from-[#6D5EF5] to-[#4F8CFF]"
                      : "border border-stone-300 bg-white"
                  }`}
                />
                {i < TIMELINE.length - 1 && (
                  <div className="mt-1 w-px flex-1 bg-stone-100" style={{ minHeight: "3rem" }} />
                )}
              </div>

              {/* Content */}
              <div className={`pb-8 ${i === TIMELINE.length - 1 ? "pb-0" : ""}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                  {step.date}
                </p>
                <p className="mt-0.5 text-[14px] font-semibold text-stone-900">{step.phase}</p>
                <p className="mt-1.5 text-[13px] leading-[1.65] text-stone-500">{step.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Results ───────────────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Results</SectionLabel>
          <SectionHeading>Business outcomes — measured by what didn&apos;t break</SectionHeading>
        </motion.div>

        <motion.p
          {...fadeUp(0.08)}
          className="mt-4 max-w-[52rem] text-[15px] leading-[1.72] text-stone-500"
        >
          For a migration project, success is often defined negatively — by the disruptions that
          didn&apos;t happen and the workflows that kept running. Every outcome below was the result of
          decisions made months before go-live.
        </motion.p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {RESULTS.map((item, i) => (
            <motion.div
              key={item.headline}
              {...fadeUp(0.08 + i * 0.07)}
              className="overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.12)] bg-gradient-to-br from-[rgba(109,94,245,0.04)] to-transparent"
            >
              <div className={CARD_PAD}>
                <p className="text-[14px] font-semibold text-stone-900">{item.headline}</p>
                <p className="mt-2 text-[13px] leading-[1.65] text-stone-500">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Reflection ────────────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Reflection</SectionLabel>
          <SectionHeading>What this project taught me about platform PM</SectionHeading>
        </motion.div>

        <div className="mt-8 flex flex-col gap-3">
          {REFLECTIONS.map((text, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.08 + i * 0.08)}
              className={`${CARD} ${CARD_PAD} flex items-start gap-4`}
            >
              <span className="mt-0.5 shrink-0">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#6D5EF5] to-[#4F8CFF]" />
              </span>
              <p className="text-[14px] italic leading-[1.72] text-stone-600 sm:text-[15px]">
                {text}
              </p>
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
