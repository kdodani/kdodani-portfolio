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
    period: "October 2021 – April 2024",
    organization: "Technical Safety BC",
    role: "Product Manager",
    scopeSummary:
      "Growth and retention for regulated services—balancing experimentation with adoption in environments where trust and clarity matter as much as conversion.",
    focusAreas: [
      "Churn and retention analytics tied to actionable lifecycle interventions",
      "Segmentation-informed engagement without treating people as abstract cohorts",
      "Experimentation and instrumentation that could justify the next investment—or the pause",
    ],
    thinkingEvolved:
      "Retention work taught me to read behavior as a symptom of system design: where expectations broke, where value was invisible, and where friction was actually policy doing its job. Growth became less about funnels in isolation and more about aligning incentives, narrative, and operational reality so adoption could compound.",
    capabilityRows: [
      "behavioral design · retention analytics · product-led growth",
      "experimentation frameworks · segmentation strategy · customer engagement systems",
    ],
    launchSlugs: [],
  },
  {
    period: "September 2020 – October 2021",
    organization: "University of British Columbia",
    role: "Strategy Consultant (180 Degrees Consulting)",
    scopeSummary:
      "Mission-driven clients needing structured answers under ambiguity—market entry, conversion, and policy questions where evidence and storytelling had to travel together.",
    focusAreas: [
      "Conversion and funnel diagnostics for organizations with lean measurement stacks",
      "Market expansion and positioning grounded in interviews and secondary research",
      "Policy and economic framing that leadership could reuse beyond the deck",
    ],
    thinkingEvolved:
      "Consulting sharpened how I collapse messy reality into a model someone else can act on. I learned to privilege clarity over cleverness: naming tradeoffs early, separating assumptions from findings, and writing recommendations that survived contact with stakeholders who were not in the room when the analysis started.",
    capabilityRows: [
      "market research · systems mapping · stakeholder communication",
      "analytical framing · narrative strategy",
    ],
    launchSlugs: [],
  },
  {
    period: "May 2018 – July 2019",
    organization: "Convertus",
    role: "SEO Consultant",
    scopeSummary:
      "Organic growth across a large portfolio of sites—standardizing what worked, forecasting where resources should go, and treating search as a system rather than a checklist.",
    focusAreas: [
      "Technical and content strategy at scale across 75+ properties",
      "Performance analytics and forecasting to prioritize experiments",
      "Funnel and acquisition loops where small changes had outsized leverage",
    ],
    thinkingEvolved:
      "This is where I started thinking in loops instead of pages. SEO forced a disciplined relationship with variance: ship, measure, explain, repeat. That habit—making bets explicit and letting data retire weak narratives—carried straight into product work where the stakes and constraints only grew.",
    capabilityRows: [
      "SEO systems · funnel optimization · forecasting",
      "experimentation · performance analytics · growth strategy",
    ],
    launchSlugs: [],
  },
];
