import type { ProjectSlug } from "./projects";

export type ExperienceChapter = {
  period: string;
  organization: string;
  role: string;
  /** Concise scope: what surface area and complexity this role covered (2–3 lines) */
  scopeSummary: string;
  /** Always-visible capability / focus signals (zero-click scan) */
  focusPills: string[];
  /** Always-visible systems-thinking evolution (1–2 lines) */
  operatingLens: string;
  focusAreas: string[];
  /** Reflective narrative — surfaced in supporting detail accordion only */
  thinkingEvolved: string;
  /** Each string is one editorial row (middot-separated phrases) */
  capabilityRows: string[];
  launchSlugs: ProjectSlug[];
  /** Optional intro above launch cards (e.g. WorkSafeBC editorial block) */
  launchIntro?: string;
};

export const experienceChapters: ExperienceChapter[] = [
  {
    period: "Apr 2024 — Present",
    organization: "WorkSafeBC",
    role: "Product Manager — Provider Experience",
    scopeSummary:
      "Designing operational systems for healthcare provider workflows across identity, referrals, claims, invoicing, and regulatory infrastructure — balancing policy, automation, clinical nuance, and scalable decision-making.",
    focusPills: [
      "AI-assisted operations",
      "Operational orchestration",
      "Human-in-the-loop systems",
      "Platform modernization",
      "Decision-support workflows",
      "Regulated systems",
      "API ecosystems",
    ],
    operatingLens:
      "Shifted from feature-centric delivery toward designing operational systems — where workflows, policy constraints, automation, and human judgment must coordinate reliably at scale.",
    focusAreas: [
      "Operational friction across provider workflows",
      "Platform modernization & integrations",
      "AI-assisted decision support systems",
      "Workflow orchestration in regulated environments",
    ],
    thinkingEvolved:
      "I stopped treating products as isolated features and started thinking in systems — how signals, people, policies, and decisions move across operational environments.\n\nThe work evolved from improving workflows to designing coordination layers that support trust, explainability, and scalable decision-making.",
    capabilityRows: [
      "AI workflows · orchestration systems · platform PM",
      "operational UX · API ecosystems · trust systems",
      "human-in-the-loop AI · migration strategy",
    ],
    launchSlugs: [
      "referral-radar",
      "bceid-migration",
      "provider-invoice-digitization",
      "medical-api-integration",
    ],
    launchIntro:
      "Proof of execution across operational systems, intelligence layers, platform infrastructure, and provider workflows.",
  },
  {
    period: "Oct 2021 - Apr 2024",
    organization: "Technical Safety BC",
    role: "Product Manager → Former Business Analyst",
    scopeSummary:
      "Designed operational systems across regulated inspection, compliance, analytics, and workflow infrastructure — evolving from operational intelligence and retention strategy into AI-assisted workflow tooling.",
    focusPills: [
      "Operational intelligence",
      "AI-assisted workflows",
      "Regulated systems",
      "Workflow modernization",
      "Human-in-the-loop tooling",
      "Platform strategy",
      "Operational analytics",
    ],
    operatingLens:
      "Shifted from analytics-driven optimization toward designing operational systems — where workflows, automation, compliance, and human judgment must work together reliably in regulated environments.",
    focusAreas: [
      "Retention analytics tied to actionable lifecycle interventions",
      "Workflow friction analysis across regulated operational surfaces",
      "Product roadmap ownership in compliance-constrained environments",
      "AI/NLP operational tooling — knowledge retrieval and email classification",
    ],
    thinkingEvolved:
      "Started reading data as a diagnostic — where behavior broke, where value was invisible, and where friction was actually policy doing its job. Growth became less about funnels and more about aligning incentives with operational reality.\n\nMoved into product by earning the credibility to own the roadmap. Finished the chapter thinking about intelligence as infrastructure — not a feature, but a layer that makes operational workflows scalable and decisions more defensible.",
    capabilityRows: [
      "Product · AI & Data · Workflow Design · Execution · Business",
    ],
    launchSlugs: [],
  },
  {
    period: "SEP 2020 — OCT 2021",
    organization: "180 Degrees Consulting (UBC Chapter)",
    role: "Strategy Consultant (Intern)",
    scopeSummary:
      "Public-interest and sustainability initiatives spanning growth strategy, adoption systems, behavioral engagement, and data-informed outreach under real operational constraints.",
    focusPills: [
      "Systems thinking",
      "Growth strategy",
      "Behavioral adoption",
      "Audience analytics",
      "Funnel analysis",
      "Strategic synthesis",
      "Multi-channel acquisition",
    ],
    operatingLens:
      "Began treating growth, adoption, and engagement as interconnected systems shaped by incentives, channels, and behavioral patterns — not isolated campaigns.",
    focusAreas: [
      "Audience segmentation and outreach strategy",
      "Multi-channel acquisition systems",
      "Behavioral engagement and funnel analysis",
      "Data-informed decision making",
    ],
    thinkingEvolved:
      "I started viewing growth, adoption, and engagement as interconnected systems shaped by incentives, communication channels, and behavioral patterns.\n\nThe work introduced me to acquisition strategy, analytics-driven decision making, and structured problem-solving under operational and regulatory constraints.",
    capabilityRows: [
      "systems thinking · growth strategy · behavioral adoption",
      "audience analytics · funnel analysis · strategic synthesis",
    ],
    launchSlugs: [],
    launchIntro:
      "Client engagements where research and framing had to hold up for stakeholders navigating real constraints—not slide-deck abstraction.",
  },
  {
    period: "May 2018 — Jul 2019",
    organization: "Convertus",
    role: "SEO Consultant — Growth & Analytics",
    scopeSummary:
      "Data-driven growth across 75+ digital properties — building forecasting, performance analysis, and repeatable operational workflows that improved organic acquisition by ~150%.",
    focusPills: [
      "Growth analytics",
      "Forecasting systems",
      "Experimentation",
      "Organic acquisition",
      "Operational workflows",
      "Performance optimization",
    ],
    operatingLens:
      "Evolved from tactical SEO execution toward repeatable systems for forecasting, prioritization, and faster data-informed growth decisions.",
    focusAreas: [
      "Growth experimentation & performance optimization",
      "Organic acquisition analytics",
      "Forecasting & reporting systems",
      "Scalable operational workflows",
    ],
    thinkingEvolved:
      "Started with tactical SEO execution and evolved into building repeatable systems for forecasting, performance analysis, and strategic prioritization.\n\nThe work centered on identifying growth opportunities, measuring impact, and enabling faster decision-making through data.",
    capabilityRows: [
      "Growth analytics · forecasting systems · experimentation · cross-functional communication",
    ],
    launchSlugs: [],
  },
];
