import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "referral-radar",
    title: "Referral Radar",
    tagline: "AI multi-agent healthcare recommendations",
    summary:
      "Orchestrated a multi-agent system to surface timely, compliant referral paths—balancing clinical nuance with operational constraints.",
    tags: ["AI agents", "Healthcare", "Product strategy"],
    year: "2024",
  },
  {
    slug: "bceid-migration",
    title: "BCeID migration platform",
    tagline: "Identity cutover without losing trust",
    summary:
      "Led a phased migration with clear rollback posture, stakeholder comms, and instrumentation so teams could see auth health in real time.",
    tags: ["Platform", "Identity", "Risk"],
    year: "2023",
  },
  {
    slug: "medical-api-integration",
    title: "Medical platform API integration",
    tagline: "Reliable pipes between clinical systems",
    summary:
      "Defined contracts, error budgets, and onboarding patterns so partner APIs shipped safely without slowing core product velocity.",
    tags: ["API design", "Integrations", "Compliance"],
    year: "2023",
  },
  {
    slug: "provider-invoice-digitization",
    title: "Provider invoice digitization",
    tagline: "From paper chaos to auditable flows",
    summary:
      "Shipped an end-to-end digitization loop with human-in-the-loop QA, reducing cycle time while tightening finance controls.",
    tags: ["Workflow", "Finance ops", "ML-assisted"],
    year: "2022",
  },
];

export type ProjectSlug = (typeof projects)[number]["slug"];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
