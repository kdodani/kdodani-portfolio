export type BuildEntry = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  /** Optional outbound link when there is a demo or repo to share */
  href?: string;
  linkLabel?: string;
};

/** Side projects, AI experiments, and technical explorations outside core PM work */
export const buildEntries: BuildEntry[] = [
  {
    id: "agentic-lab",
    title: "Agentic workflow lab",
    tagline: "Orchestration sketches",
    description:
      "Prototyping multi-step LLM flows with explicit handoffs, tool boundaries, and human checkpoints—focused on repeatability over novelty.",
    tags: ["Agents", "Tool use", "Guardrails"],
  },
  {
    id: "rec-playground",
    title: "Recommendation playground",
    tagline: "Ranking & retrieval",
    description:
      "Lightweight harnesses for candidate generation, re-ranking, and offline evaluation—useful for thinking through productized rec systems.",
    tags: ["Embeddings", "Eval", "Python"],
  },
  {
    id: "copilot-sketches",
    title: "Copilot interaction sketches",
    tagline: "UX for AI-assisted work",
    description:
      "Exploring inline vs panel assistants, disclosure patterns, and undo paths for knowledge work—not shipped product, but interaction craft.",
    tags: ["UX", "Copilots", "Figma"],
  },
  {
    id: "automation-kit",
    title: "Automation & glue scripts",
    tagline: "Internal speed tools",
    description:
      "Small scripts and no-code bridges that remove recurring manual steps—where the best ROI is boring reliability.",
    tags: ["Automation", "APIs", "Ops"],
  },
];
