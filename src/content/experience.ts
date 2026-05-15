import type { ProjectSlug } from "./projects";

export type ExperienceChapter = {
  period: string;
  organization: string;
  role: string;
  /** Concise scope: what surface area and complexity this role covered */
  scopeSummary: string;
  focusAreas: string[];
  /** Reflective narrative: how judgment and framing shifted */
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
      "Healthcare provider journeys across referrals, identity, invoicing, and claims — where policy, clinical nuance, and operational systems intersect.",
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
      "Proof of execution across the systems, workflows, and intelligence layers described above.",
  },
  {
    period: "Oct 2021 - Apr 2024",
    organization: "Technical Safety BC",
    role: "Product Manager → Former Business Analyst",
    scopeSummary:
      "Regulated operational services — analytics and retention work first, then product ownership, then AI-native workflow tooling. Environments where compliance, trust, and operational clarity shape what's possible and what's worth building.",
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
      "Worked across public-interest and sustainability-focused initiatives involving growth strategy, adoption systems, behavioral engagement, and data-informed outreach.",
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
      "Built data-driven growth strategies across a portfolio of 75+ digital properties, improving organic acquisition performance by ~150%.",
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
