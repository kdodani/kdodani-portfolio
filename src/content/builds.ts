export type BuildStatus = "Prototype" | "Ongoing" | "Live";

export type BuildEntry = {
  id: string;
  title: string;
  tagline: string;
  status: BuildStatus;
  /** Where / why it was built */
  context: string;
  /** What was being experimented with */
  experimented: string[];
  /** What was actually accomplished */
  accomplished: string[];
  /** Takeaways */
  learnings: string[];
  tags: string[];
  /** Optional outbound link when there is a demo or repo to share */
  href?: string;
  linkLabel?: string;
};

/**
 * Hands-on AI projects. The intake specialist has a bespoke layout
 * (see `intake-specialist.ts`); the others use the generic showcase.
 */
export const buildEntries: BuildEntry[] = [
  {
    id: "intake-specialist",
    title: "Healthcare Ops Intake Specialist agent",
    tagline: "An agent that reads a faxed referral, verifies insurance, and flags what it is unsure about.",
    status: "Prototype",
    context:
      "Built hands-on during the Out-of-Pocket and Champ AI course, AI Agents in Healthcare Ops 101, using a fictional behavioral health clinic and fictional patient data.",
    experimented: [],
    accomplished: [],
    learnings: [],
    tags: ["AI agents", "Healthcare ops", "Eligibility checks", "Browser agents", "Human-in-the-loop"],
    href: "https://www.outofpocket.health/courses/ai-agents-in-healthcare-ops-101",
    linkLabel: "About the course",
  },
  {
    id: "claim-denials-agent",
    title: "Claim Denials agent",
    tagline: "An agent that reads a denial, learns from past claims, routes it with rules the billing lead owns, and drafts an appeal a person sends.",
    status: "Prototype",
    context:
      "Built hands-on on Day 2 of the same course, in Claude Code, on a synthetic EHR for a fictional behavioral health clinic. It picks up Day 1's folder and the same patient.",
    experimented: [],
    accomplished: [],
    learnings: [],
    tags: ["AI agents", "Claims and denials", "Revenue cycle", "Claude Code", "Human-in-the-loop"],
  },
  {
    id: "ai-pm-portfolio",
    title: "AI-powered PM portfolio",
    tagline: "This site: designed, built and iterated with an AI-assisted workflow.",
    status: "Ongoing",
    context:
      "I wanted a portfolio that behaves like a product, not a PDF. I used it as a test bed for building and shipping with an AI pair programmer, end to end, as a product manager rather than a full-time engineer.",
    experimented: [
      "Using Cursor as a pair programmer for a real Next.js and Tailwind codebase, including planning changes before making them.",
      "Turning long-form case studies into structured content (typed data plus reusable components) instead of one-off pages.",
      "Motion and layout patterns that keep dense case studies readable: staged reveals, diagrams, and before/after comparisons.",
      "Generating print-ready PDF versions of each case study from the same source as the web pages.",
    ],
    accomplished: [
      "Shipped a multi-page portfolio with case studies for several healthcare product projects, each with its own diagrams, video, and metrics.",
      "Built a reusable case-study component system (hero, decision matrix, timeline, results, human-vs-AI boundary map) driven by typed content.",
      "Added a PDF export pipeline so the web case studies and the downloadable versions stay in sync.",
      "Kept the site responsive and accessible, with reduced-motion support throughout.",
    ],
    learnings: [
      "Clear intent and constraints in the prompt matter more than clever prompting: the better I described the outcome, the less rework.",
      "Treating content as data made later changes (new case study, new section) cheap and consistent.",
      "AI speeds up building, but product judgment (what to cut, what to emphasize) is still the bottleneck.",
    ],
    tags: ["Cursor", "Next.js", "Tailwind", "AI UX", "Design systems"],
  },
  {
    id: "pm-copilot-workflows",
    title: "PM copilot workflows",
    tagline: "Repeatable AI-assisted workflows for everyday product management work.",
    status: "Ongoing",
    context:
      "A set of workflows I keep refining to remove the blank-page and busywork parts of product management, while keeping the judgment calls with me.",
    experimented: [
      "Drafting PRDs from rough notes, then pressure-testing them with prompts that play engineering, design, and compliance.",
      "Synthesizing interview and feedback notes into themes with supporting quotes, and checking the themes against the raw notes.",
      "Interview prep: turning a job description and my own experience into structured stories and likely questions.",
      "AI-assisted product operations: status updates, meeting follow-ups, and decision logs.",
    ],
    accomplished: [
      "A reusable prompt and checklist set for PRDs, research synthesis, and interview prep that I apply across projects.",
      "A faster loop from raw notes to a first draft I can edit, instead of starting from nothing.",
      "A habit of verifying AI output against source material before it goes into any deliverable.",
    ],
    learnings: [
      "AI is strongest as a first drafter and critic, and weakest at knowing what matters to a specific team.",
      "Always keep the source material next to the output so claims can be checked quickly.",
      "Workflows beat one-off prompts: writing a process down once pays back every time it is reused.",
    ],
    tags: ["Prompting", "Research", "Synthesis", "AI workflows"],
  },
];
