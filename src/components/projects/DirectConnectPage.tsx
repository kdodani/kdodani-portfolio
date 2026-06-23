"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HomeHashLink } from "@/components/layout/HomeHashLink";
import { fadeUpInitial, motionDelay } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Design tokens ─────────────────────────────────────────────────── */

const SECTION = "mt-20 sm:mt-24 lg:mt-28";
const CARD = "rounded-2xl border border-stone-200/60 bg-white";
const CARD_PAD = "px-6 py-6 sm:px-7 sm:py-7";

/* ─── Static content ────────────────────────────────────────────────── */

const SCALE_STATS = [
  {
    stat: "200K+",
    unit: "physician reports per year",
    detail:
      "Form 8/11 is the primary clinical data source for every workers' compensation claim in BC — driving adjudication, treatment authorization, and return-to-work planning.",
    delay: 0.06,
  },
  {
    stat: "~$250K",
    unit: "annual manual processing cost",
    detail:
      "52,000 faxes per year required manual keystroke re-entry by ELAN staff. 28 million keystrokes. A cost that scaled with every new claim.",
    delay: 0.12,
  },
  {
    stat: "2015",
    unit: "last form content update",
    detail:
      "The integration spec dated to 2001. A decade of clinical practice evolution — abilities-focused care, telehealth, physician shortages — was invisible to the form.",
    delay: 0.18,
  },
] as const;

const RESEARCH_PANELS = [
  {
    label: "Physicians",
    detail: "15 in-depth interviews · Aug 2022",
    finding:
      "Physicians were guessing ICD-9 codes, truncating clinical notes to fit character limits, and estimating RTW dates they openly admitted were guesswork — not from carelessness, but because the form gave them no space to do otherwise.",
  },
  {
    label: "Medical Advisors",
    detail: "Group interviews · Aug–Sep 2022",
    finding:
      "Incomplete forms and unreliable information were a key issue. Clinical information was critical yet often cut off due to space limitations imposed by the billing spec.",
  },
  {
    label: "Claims Staff",
    detail: "305-person survey (2017) + focus groups (2022)",
    finding:
      "Staff were relying on fields that physicians reported having difficulty filling in accurately. In many cases, physicians were guessing — and staff were making decisions based on those guesses.",
  },
  {
    label: "Behavioral Synthesis",
    detail: "Cross-group finding",
    finding:
      "GPs will not use any other software other than their EMR. No portal, no web form, no WorkSafeBC-hosted solution would be adopted. Any viable path had to be invisible — embedded inside existing clinical workflow at point of care.",
  },
] as const;

const OPTIONS = [
  {
    id: "hibc",
    status: "rejected" as const,
    title: "Update within HIBC constraints",
    benefit:
      "Lowest disruption. No new infrastructure. Familiar path for EMR vendors.",
    risk: "Character limits remain. No form branching logic possible. Form content changes still require multi-party spec coordination across WorkSafeBC, HIBC, and every EMR vendor. The structural coupling stays intact.",
  },
  {
    id: "defer",
    status: "rejected" as const,
    title: "Wait for provincial eForm strategy",
    benefit:
      "Potential alignment with a BC-wide healthcare forms infrastructure.",
    risk: "No timeline control. WorkSafeBC not guaranteed participation. Doctors of BC contract obligations remain unmet. Organizational momentum stalls with no clear ownership.",
  },
  {
    id: "api",
    status: "chosen" as const,
    title: "Build a direct API channel",
    benefit:
      "Decouples clinical reporting from billing. Enables independent form content velocity. Creates reusable infrastructure that any EMR can integrate. Physicians stay in their existing workflow.",
    risk: "Vendor adoption requires sustained ecosystem engagement. Technical risk is medium. Cost of full-scale rollout is significant — hence a POC-first approach.",
  },
] as const;

const ROADMAP_ITEMS = [
  {
    num: "01",
    title: "Injury report submission",
    sub: "Form 8/11",
    done: true,
    detail: "Validated with OSCAR. Direct JSON payload from EMR to WorkSafeBC — no HIBC required.",
  },
  {
    num: "02",
    title: "Confirmation logs",
    sub: "Real-time feedback",
    done: false,
    detail: "Automated submission acknowledgements back to physicians and employers — closing the feedback loop.",
  },
  {
    num: "03",
    title: "Medical report sharing",
    sub: "Bidirectional exchange",
    done: false,
    detail: "Clinical data flowing both directions — WorkSafeBC shares treatment updates, physicians share new reports.",
  },
  {
    num: "04",
    title: "Claim event notifications",
    sub: "Live claim status",
    done: false,
    detail: "Real-time claim updates to all stakeholders, reducing the phone calls and information asymmetry physicians described.",
  },
  {
    num: "05",
    title: "Wage information sharing",
    sub: "ERP / payroll integration",
    done: false,
    detail: "Secure API integration with employer payroll systems — automating wage calculations for compensation decisions.",
  },
] as const;

const TECH_DECISIONS = [
  {
    label: "JSON over HL7 FHIR",
    rationale:
      "HL7 FHIR is the healthcare interoperability standard — and the long-term path. But it adds significant integration complexity. Choosing JSON for the POC let the team validate the integration model in weeks, not months. HL7 FHIR is the upgrade path once the pattern is proven.",
  },
  {
    label: "APIM facade layer",
    rationale:
      "The Azure APIM Document Router is reusable infrastructure. Every future EMR partner onboards through the same gateway — same routing pattern, same authentication handshake, same data contract. This is the architecture that makes the platform scalable, not the OSCAR integration itself.",
  },
  {
    label: "Form / invoice decoupled",
    rationale:
      "Clinical data now flows directly to WorkSafeBC. Billing still routes through Teleplan. Each path can now evolve independently — WorkSafeBC can update form content without coordinating a billing spec change.",
  },
  {
    label: "Form version detection",
    rationale:
      "The eForm auto-detects if a physician is running an outdated version and prompts an import of the latest. This solves the rollout brittleness that made the old HIBC spec so hard to update — version management is now inside the product, not outside it.",
  },
] as const;

const VENDOR_TIERS = [
  {
    status: "Validated",
    color: "accent" as const,
    vendors: ["OSCAR McMaster · ~1,200 BC physicians · POC complete March 2025"],
  },
  {
    status: "Positive signal",
    color: "neutral" as const,
    vendors: [
      "Medinet — willing to integrate",
      "Intrahealth — willing to integrate",
      "QHR Technologies — willing to integrate",
      "Plexia Electronic Medical — willing to integrate",
    ],
  },
  {
    status: "In outreach",
    color: "neutral" as const,
    vendors: [
      "Systematic outreach across 50 EMR and billing vendors in BC",
      "Top 5 EMRs = ~80% of BC physician market",
    ],
  },
] as const;

const SKILLS = [
  "Platform Strategy",
  "Ecosystem Design",
  "Healthcare Interoperability",
  "Product Discovery",
  "Zero-to-One Product",
  "Technical Product Management",
  "API Ecosystems",
  "Hypothesis-Driven PM",
  "B2B Partnerships",
  "Stakeholder Influence",
  "Multi-Stakeholder Research",
  "User Research",
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

export function DirectConnectPage() {
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

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-frame px-page-x">
        <div className="grid items-center gap-8 pt-8 sm:gap-10 sm:pt-10 lg:min-h-[88dvh] lg:grid-cols-[2fr_3fr] lg:gap-14 lg:pt-0">

          {/* Left: text */}
          <div>
            <motion.div {...fadeUp(0)}>
              <SectionLabel>Healthcare Interoperability · 2022–2025</SectionLabel>
              <h1 className="gradient-hero-text font-display mt-3 text-[clamp(2.2rem,3.5vw+1.2rem,3.6rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                Healthcare Interoperability Platform
              </h1>
              <p className="mt-3 text-[15px] font-medium leading-snug text-accent/90 sm:text-base">
                Zero-to-one interoperability platform built from deep product discovery.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="mt-5 flex flex-wrap gap-2">
              <span className="chip-accent">Idea Champion</span>
              <span className="chip">Product Manager, Claims</span>
              <span className="chip">POC validated Mar 2025</span>
              <span className="chip">$80K Innovation Council</span>
            </motion.div>

            <motion.p
              {...fadeUp(0.18)}
              className="mt-5 text-[15px] leading-[1.72] text-stone-600 sm:text-base sm:leading-[1.7]"
            >
              A decades-old dependency was preventing healthcare interoperability across British
              Columbia. This project uncovered the structural constraint, validated a new integration
              model, and established the foundation for a scalable provider ecosystem.
            </motion.p>
          </div>

          {/* Right: platform architecture card */}
          <motion.div
            {...fadeUp(0.12)}
            className="overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-[0_16px_64px_-16px_rgba(0,0,0,0.10),0_1px_0_rgba(255,255,255,0.9)_inset]"
          >
            {/* Header */}
            <div className="border-b border-stone-100 px-7 py-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">
                Integration architecture · POC validated
              </p>
            </div>

            {/* Flow */}
            <div className="px-7 py-8 space-y-5">
              {/* OSCAR */}
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[rgba(109,94,245,0.2)] bg-[rgba(109,94,245,0.06)]">
                  <span className="text-[10px] font-bold text-accent">1</span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-stone-800">OSCAR EMR</p>
                  <p className="mt-0.5 text-[12px] leading-[1.5] text-stone-400">
                    eForm with submit button · ~1,200 BC physicians · beachhead validated
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="ml-3.5 flex items-center gap-2">
                <div className="h-5 w-px bg-stone-200" />
                <svg aria-hidden className="h-3 w-3 text-stone-300" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v8M2 7l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* APIM */}
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[rgba(109,94,245,0.2)] bg-[rgba(109,94,245,0.06)]">
                  <span className="text-[10px] font-bold text-accent">2</span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-stone-800">WorkSafeBC API Gateway</p>
                  <p className="mt-0.5 text-[12px] leading-[1.5] text-stone-400">
                    Azure APIM facade · OAuth2.0/mTLS · reusable for any future EMR partner
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="ml-3.5 flex items-center gap-2">
                <div className="h-5 w-px bg-stone-200" />
                <svg aria-hidden className="h-3 w-3 text-stone-300" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v8M2 7l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* WorkSafeBC */}
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-stone-50">
                  <span className="text-[10px] font-bold text-stone-500">3</span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-stone-800">WorkSafeBC CMS</p>
                  <p className="mt-0.5 text-[12px] leading-[1.5] text-stone-400">
                    Structured JSON · Azure Blob Storage · bypasses HIBC/Teleplan
                  </p>
                </div>
              </div>
            </div>

            {/* Footer — next partners */}
            <div className="border-t border-stone-100 bg-stone-50/60 px-7 py-4">
              <p className="text-[11px] text-stone-400">
                <span className="font-medium text-stone-600">Next:</span>{" "}
                QHR Technologies · Plexia · Medinet · Intrahealth
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Scale of the problem ───────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Why this mattered</SectionLabel>
          <SectionHeading>The form that drives workers&apos; compensation in BC</SectionHeading>
        </motion.div>

        {/* Stat cards — desktop: horizontal with arrows, mobile: stack */}
        <div className="mt-8 hidden sm:flex sm:items-stretch sm:gap-3">
          {SCALE_STATS.map((item, i) => (
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

        {/* Mobile stack */}
        <div className="mt-6 space-y-3 sm:hidden">
          {SCALE_STATS.map((item, i) => (
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

        {/* Structural constraint callout */}
        <motion.div
          {...fadeUp(0.22)}
          className="mt-5 rounded-xl border border-stone-200/60 bg-stone-50/70 px-6 py-5"
        >
          <p className="text-[13px] leading-[1.7] text-stone-600 sm:text-[14px]">
            <span className="font-semibold text-stone-800">The core constraint:</span>{" "}
            Form 8/11 data was transmitted as billing invoice line items through HIBC/Teleplan — a spec written in 2001. Every form field change required coordinated updates across WorkSafeBC, HIBC, and every EMR vendor. The form had been frozen by its own delivery infrastructure.
          </p>
        </motion.div>
      </section>

      {/* ── What research revealed ─────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Multi-stakeholder discovery · 2022</SectionLabel>
          <SectionHeading>The data quality problem was structural, not behavioral</SectionHeading>
        </motion.div>

        <motion.p {...fadeUp(0.08)} className="mt-3 text-[14px] leading-[1.7] text-stone-500 sm:text-[15px]">
          Research with physicians, medical advisors, and claims staff across four groups revealed a consistent finding: the form was asking physicians to do administrative work outside their clinical expertise while giving them inadequate space for the clinical judgment only they could provide.
        </motion.p>

        {/* 4 research panels */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {RESEARCH_PANELS.map((panel, i) => (
            <motion.div
              key={panel.label}
              {...fadeUp(0.06 + i * 0.07)}
              className={`flex flex-col ${CARD} ${CARD_PAD}`}
            >
              <div className="mb-4 flex items-center gap-2.5">
                <GradientBar />
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  {panel.label}
                </span>
              </div>
              <p className="mb-2 text-[11px] font-medium text-stone-400">{panel.detail}</p>
              <p className="flex-1 text-[13px] leading-[1.68] text-stone-600">{panel.finding}</p>
            </motion.div>
          ))}
        </div>

        {/* Physician verbatim quote */}
        <motion.blockquote
          {...fadeUp(0.24)}
          className="mt-5 overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.14)] bg-gradient-to-br from-[rgba(109,94,245,0.04)] to-[rgba(79,140,255,0.02)]"
        >
          <div className="border-b border-[rgba(109,94,245,0.08)] px-7 py-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent/45">
              Physician verbatim · qualitative research · Aug 2022
            </p>
          </div>
          <div className="px-7 py-6">
            <p className="font-display text-[clamp(1rem,0.9vw+0.85rem,1.18rem)] font-normal leading-[1.58] tracking-[-0.015em] text-stone-800 text-pretty">
              &ldquo;If you look at the Form, half of it is taken up by demographic information and
              coding, which is almost completely irrelevant… So, it is a bunch of data that essentially
              has no clinical relevance… it&apos;s only the bottom half of the Form where there&apos;s
              clinical relevance.&rdquo;
            </p>
            <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400">
              Family Physician with ER Shifts
            </p>
          </div>
        </motion.blockquote>
      </section>

      {/* ── Option analysis — most prominent section ───────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Strategic option analysis</SectionLabel>
          <SectionHeading>Three paths. One clear winner.</SectionHeading>
        </motion.div>

        <motion.p {...fadeUp(0.08)} className="mt-3 text-[14px] leading-[1.7] text-stone-500 sm:text-[15px]">
          After discovery confirmed the structural constraint, three paths were evaluated. Each addressed the mandate to modernize Form 8/11 — but only one removed the root constraint.
        </motion.p>

        {/* Option cards — desktop: 3-col, mobile: stack */}
        <div className="mt-8 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {OPTIONS.map((opt, i) => (
            <motion.div
              key={opt.id}
              {...fadeUp(0.06 + i * 0.08)}
              className={[
                "flex flex-col rounded-2xl border",
                opt.status === "chosen"
                  ? "border-[rgba(109,94,245,0.25)] bg-gradient-to-br from-[rgba(109,94,245,0.05)] to-[rgba(79,140,255,0.02)] shadow-[0_0_0_1px_rgba(109,94,245,0.06)]"
                  : "border-stone-200/60 bg-white",
                CARD_PAD,
              ].join(" ")}
            >
              {/* Status badge */}
              <div className="mb-4 flex items-center justify-between gap-3">
                <GradientBar />
                <span
                  className={[
                    "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
                    opt.status === "chosen"
                      ? "bg-[rgba(109,94,245,0.12)] text-accent"
                      : "bg-stone-100 text-stone-400",
                  ].join(" ")}
                >
                  {opt.status === "chosen" ? "✓ Chosen" : "✗ Rejected"}
                </span>
              </div>

              <h3 className="font-display text-[1rem] font-medium tracking-[-0.018em] text-stone-900 sm:text-[1.05rem]">
                {opt.title}
              </h3>

              <div className="mt-4 flex-1 space-y-3">
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-400">
                    Benefit
                  </p>
                  <p className="text-[13px] leading-[1.65] text-stone-600">{opt.benefit}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-400">
                    Risk
                  </p>
                  <p className="text-[13px] leading-[1.65] text-stone-500">{opt.risk}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decision callout */}
        <motion.div
          {...fadeUp(0.28)}
          className="mt-5 rounded-xl border border-[rgba(109,94,245,0.16)] bg-[rgba(109,94,245,0.04)] px-6 py-5"
        >
          <p className="text-[13px] leading-[1.7] text-stone-700 sm:text-[14px]">
            <span className="font-semibold text-stone-900">The strategic unlock:</span>{" "}
            Decoupling clinical reporting from the billing system wasn&apos;t just a technical decision — it was the move that made every future form update, every future EMR partner, and every future API use case possible. The constraint wasn&apos;t the fax machine. It was the coupling.
          </p>
        </motion.div>
      </section>

      {/* ── Platform vision ────────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Platform strategy</SectionLabel>
          <SectionHeading>One integration model. Any provider. Any workflow.</SectionHeading>
        </motion.div>

        <motion.p {...fadeUp(0.08)} className="mt-3 text-[14px] leading-[1.7] text-stone-500 sm:text-[15px]">
          OSCAR was the beachhead. The platform was the goal. WorkSafeBC publishes the API once; any EMR integrates using the same endpoint pattern. Each new partner expands physician reach without rebuilding the platform.
        </motion.p>

        <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-[1fr_1fr] lg:grid-cols-[3fr_2fr]">

          {/* 5-API roadmap */}
          <motion.div {...fadeUp(0.1)} className={`${CARD} ${CARD_PAD}`}>
            <div className="mb-5 flex items-center gap-2.5">
              <GradientBar />
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400">
                5-API platform roadmap
              </span>
            </div>
            <div className="space-y-4">
              {ROADMAP_ITEMS.map((item) => (
                <div key={item.num} className="flex gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={[
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                        item.done
                          ? "bg-[rgba(109,94,245,0.12)] text-accent"
                          : "border border-stone-200 bg-stone-50 text-stone-400",
                      ].join(" ")}
                    >
                      {item.done ? "✓" : item.num.replace("0", "")}
                    </div>
                  </div>
                  <div className="pb-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <p className={`text-[13px] font-semibold ${item.done ? "text-stone-900" : "text-stone-500"}`}>
                        {item.title}
                      </p>
                      <span className="text-[11px] text-stone-400">{item.sub}</span>
                    </div>
                    <p className="mt-0.5 text-[12px] leading-[1.58] text-stone-400">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Platform logic */}
          <motion.div {...fadeUp(0.16)} className="flex flex-col gap-4">
            {/* Reusable model card */}
            <div className={`flex-1 ${CARD} px-5 py-5`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent/70 mb-2">
                The platform asset
              </p>
              <p className="font-display text-[1rem] font-medium leading-[1.38] tracking-[-0.018em] text-stone-900">
                The integration model, not the OSCAR build
              </p>
              <p className="mt-2.5 text-[13px] leading-[1.65] text-stone-500">
                Each new EMR partner onboards through the same gateway — same routing pattern, same authentication handshake, same data contract. OSCAR proved it works.
              </p>
            </div>

            {/* Network effect */}
            <div className={`${CARD} px-5 py-5`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400 mb-2">
                Network logic
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-stone-500">
                <span className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 font-medium text-stone-700">More EMR partners</span>
                <svg aria-hidden className="h-3 w-3 text-stone-300" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 font-medium text-stone-700">More physician reach</span>
                <svg aria-hidden className="h-3 w-3 text-stone-300" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 font-medium text-stone-700">Better clinical data</span>
                <svg aria-hidden className="h-3 w-3 text-stone-300" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="rounded-md border border-[rgba(109,94,245,0.2)] bg-[rgba(109,94,245,0.06)] px-2.5 py-1 font-medium text-accent">Better worker outcomes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── The experiment ─────────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Hypothesis · proof of concept · March 2025</SectionLabel>
          <SectionHeading>Validated, not assumed</SectionHeading>
        </motion.div>

        {/* Hypothesis */}
        <motion.blockquote
          {...fadeUp(0.1)}
          className="mt-8 overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.14)] bg-gradient-to-br from-[rgba(109,94,245,0.04)] to-[rgba(79,140,255,0.02)]"
        >
          <div className="border-b border-[rgba(109,94,245,0.08)] px-7 py-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent/45">
              Hypothesis
            </p>
          </div>
          <div className="px-7 py-6">
            <p className="font-display text-[clamp(1rem,0.9vw+0.85rem,1.2rem)] font-normal leading-[1.58] tracking-[-0.015em] text-stone-800 text-pretty">
              &ldquo;We believe that we can enhance the flow of Form 8 and Form 11 data from electronic
              medical record systems (EMRs) so that physicians can continue to stay in their primary
              software system, and it will improve our data collection.&rdquo;
            </p>
          </div>
        </motion.blockquote>

        {/* Beachhead rationale + technical decisions */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5">

          {/* Why OSCAR */}
          <motion.div {...fadeUp(0.14)} className={`${CARD} ${CARD_PAD}`}>
            <div className="mb-4 flex items-center gap-2.5">
              <GradientBar />
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400">
                Beachhead selection
              </span>
            </div>
            <h3 className="font-display text-[1.02rem] font-medium tracking-[-0.018em] text-stone-900">
              Why OSCAR first
            </h3>
            <ul className="mt-3 space-y-2">
              {[
                "Open-source (McMaster University) — freely modifiable, no licensing cost",
                "~1,200 BC physicians — meaningful validation scale",
                "Community-maintained — lower integration risk than proprietary EMRs",
                "Proved the model before negotiating paid EMR partnerships",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[13px] leading-[1.6] text-stone-500">
                  <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-stone-300" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Technical decisions grid */}
          <div className="space-y-4">
            {TECH_DECISIONS.map((decision, i) => (
              <motion.div
                key={decision.label}
                {...fadeUp(0.14 + i * 0.06)}
                className={`${CARD} px-5 py-4`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-md border border-[rgba(109,94,245,0.2)] bg-[rgba(109,94,245,0.06)] px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                    {decision.label}
                  </span>
                </div>
                <p className="text-[12px] leading-[1.65] text-stone-500">{decision.rationale}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Result callout */}
        <motion.div
          {...fadeUp(0.34)}
          className="mt-5 flex items-center gap-4 rounded-xl border border-stone-200/60 bg-stone-50/70 px-6 py-4"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(109,94,245,0.1)]">
            <svg aria-hidden className="h-4 w-4 text-accent" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[13px] leading-[1.6] text-stone-700 sm:text-[14px]">
            <span className="font-semibold text-stone-900">POC complete: March 27, 2025.</span>{" "}
            Hypothesis validated — structured Form 8/11 data flows from OSCAR directly to WorkSafeBC without HIBC. Physician submits from inside the EMR. No context switch.
          </p>
        </motion.div>
      </section>

      {/* ── Ecosystem strategy ─────────────────────────────────────────── */}
      <section className={`mx-auto max-w-frame px-page-x ${SECTION}`}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Ecosystem expansion</SectionLabel>
          <SectionHeading>50 vendors. One repeatable model.</SectionHeading>
        </motion.div>

        <motion.p {...fadeUp(0.08)} className="mt-3 text-[14px] leading-[1.7] text-stone-500 sm:text-[15px]">
          Top 5 EMRs reach approximately 80% of BC physicians. Systematic outreach covered 50 EMR and billing vendors — tiered by market coverage priority. The integration model is the asset; each new partner onboards through the same endpoint.
        </motion.p>

        <div className="mt-8 space-y-4">
          {VENDOR_TIERS.map((tier, i) => (
            <motion.div
              key={tier.status}
              {...fadeUp(0.06 + i * 0.08)}
              className={`${CARD} ${CARD_PAD}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={[
                    "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
                    tier.color === "accent"
                      ? "bg-[rgba(109,94,245,0.12)] text-accent"
                      : "bg-stone-100 text-stone-500",
                  ].join(" ")}
                >
                  {tier.status}
                </span>
              </div>
              <ul className="space-y-1.5">
                {tier.vendors.map((vendor) => (
                  <li key={vendor} className="flex items-start gap-2.5 text-[13px] leading-[1.6] text-stone-600">
                    <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-stone-300" />
                    {vendor}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── What comes next ────────────────────────────────────────────── */}
      <section className={`mx-auto max-w-scene px-page-x ${SECTION}`}>
        <motion.div
          {...fadeUp(0)}
          className="overflow-hidden rounded-2xl border border-[rgba(109,94,245,0.14)] bg-gradient-to-b from-[rgba(109,94,245,0.05)] to-[rgba(79,140,255,0.03)]"
        >
          <div className="px-8 py-10 sm:px-10 sm:py-12">
            <SectionLabel>Platform ownership</SectionLabel>
            <h2 className="font-display mt-2 text-[clamp(1.35rem,1.5vw+1rem,1.8rem)] font-medium tracking-[-0.025em] text-stone-900">
              Product thinking secured the funding. Product leadership ran the POC.
            </h2>

            <p className="mt-4 text-[14px] leading-[1.72] text-stone-600 sm:text-[15px]">
              The Innovation team needed product thinking to translate a complex, multi-stakeholder problem into a fundable hypothesis. I led the in-depth analysis and built the funding proposal that secured $80K from the Innovation Council — making the case for a structured POC over a full-scale build. Once the POC validated the integration model, I transitioned the project into the product roadmap as Product Manager, Claims, to own the ecosystem scaling phase.
            </p>

            {/* Upcoming phase items */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
              {(
                [
                  {
                    num: "1",
                    title: "Onboard next EMR partners",
                    body: "QHR, Plexia, Medinet — each through the same integration model validated with OSCAR.",
                  },
                  {
                    num: "2",
                    title: "Apply what discovery taught us to form content",
                    body: "Physician research showed most friction came from fields with little clinical relevance — the new channel is an opportunity to rethink what the form asks for, with stakeholders who have been asking for this change for years.",
                  },
                  {
                    num: "3",
                    title: "Expand the platform roadmap",
                    body: "Confirmation logs, medical report sharing, and claim event notifications — the next API use cases scoped in the 5-phase roadmap.",
                  },
                ] as const
              ).map((item) => (
                <div
                  key={item.num}
                  className="rounded-xl border border-white/80 bg-white px-5 py-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]"
                >
                  <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(109,94,245,0.1)]">
                    <span className="text-[10px] font-bold text-accent">{item.num}</span>
                  </div>
                  <p className="font-display text-[0.95rem] font-medium tracking-[-0.016em] text-stone-900">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-[1.6] text-stone-500">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
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
