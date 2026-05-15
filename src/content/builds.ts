export type BuildEntry = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  /** Optional outbound link when there is a demo or repo to share */
  href?: string;
  linkLabel?: string;
};

/** Hands-on AI projects exploring workflows, automation, and modern product tooling */
export const buildEntries: BuildEntry[] = [
  {
    id: "ai-pm-portfolio",
    title: "AI-powered PM portfolio",
    description:
      "Built and iterated this portfolio using Cursor, Next.js, AI-assisted workflows, and modern product UX patterns.",
    tags: ["Cursor", "Next.js", "AI UX", "Design Systems"],
  },
  {
    id: "multi-agent-workflows",
    title: "Multi-agent workflow system",
    description:
      "Exploring orchestration patterns, agent handoffs, memory, and human-in-the-loop workflows using n8n.",
    tags: ["n8n", "Agents", "Automation", "LLMs"],
  },
  {
    id: "pm-copilot-workflows",
    title: "PM copilot workflows",
    description:
      "Prototyping workflows for PRDs, synthesis, interview prep, and AI-assisted product operations.",
    tags: ["Prompting", "Research", "Synthesis", "AI Workflows"],
  },
];
