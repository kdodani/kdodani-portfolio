import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "referral-radar",
    title: "Referral Radar",
    tagline: "AI-powered healthcare referral orchestration",
    summary:
      "Built a multi-agent recommendation system that surfaces timely mental health referrals from complex claims data.",
    tags: ["AI Agents", "LLMs", "LangGraph", "Healthcare AI"],
    year: "2024",
  },
  {
    slug: "bceid-migration",
    title: "BCEID Migration",
    tagline: "Identity platform modernization for healthcare providers",
    summary:
      "Led migration of 5,600+ provider accounts to ForgeRock CIAM without disrupting operational workflows.",
    tags: ["CIAM", "ForgeRock", "Migration Strategy", "Platform PM"],
    year: "2024",
  },
  {
    slug: "medical-api-integration",
    title: "Direct Connect Platform",
    tagline: "EMR-native API integration strategy",
    summary:
      "Validated a zero-to-one API integration model for structured healthcare data exchange across EMRs.",
    tags: ["APIs", "EMR Integrations", "FHIR", "Platform Strategy"],
    year: "2023",
  },
  {
    slug: "provider-invoice-digitization",
    title: "Provider Information System",
    tagline: "Digital adoption across provider invoicing workflows",
    summary:
      "Redesigned high-volume invoice submission flows to reduce friction and accelerate digital adoption.",
    tags: ["Operational UX", "Growth", "Behavior Change", "Segmentation"],
    year: "2022",
  },
];

export type ProjectSlug = (typeof projects)[number]["slug"];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
