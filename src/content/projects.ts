import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "referral-radar",
    title: "Referral Radar",
    tagline: "AI-powered referral intelligence for healthcare case managers.",
    summary:
      "Helped transform fragmented claim information into explainable healthcare referral recommendations — 2nd place at WorkSafeBC InnoFest 2025.",
    tags: ["AI Product Management", "Innovation Leadership", "Healthcare AI", "Explainable AI"],
    year: "2025",
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
    title: "Healthcare Interoperability Platform",
    tagline: "Zero-to-one interoperability platform built from deep product discovery",
    summary:
      "Identified a structural constraint locking 200K+ physician reports inside a 24-year-old billing system — then validated a direct API model that established the foundation for a scalable provider ecosystem.",
    tags: ["Platform Strategy", "Healthcare Interoperability", "Zero-to-One", "Ecosystem Design"],
    year: "2025",
  },
  {
    slug: "provider-invoice-digitization",
    title: "Provider Invoice Submission",
    tagline: "Segment expansion for a B2B invoicing platform",
    summary:
      "Led product strategy to unlock 280K blocked paper line items by rebuilding the submission experience for high-volume providers — without disrupting the existing user base.",
    tags: ["Segment Expansion", "Growth", "Product Analytics", "Activation"],
    year: "2025",
  },
];

export type ProjectSlug = (typeof projects)[number]["slug"];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
