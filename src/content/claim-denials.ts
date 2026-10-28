/**
 * Content for the Claim Denials agent build (Day 2).
 * Visual-first: short labels, tiles, chips and prompt excerpts.
 * All patient and claim data is synthetic.
 */

import type { FlowNode } from "./flow";

/* ─── 1. Problem ──────────────────────────────────────────────────────── */

export const deniedStat = {
  stat: "~1 in 7",
  label: "claims come back denied",
  footnote: "Course statistic, citing Premier Inc. (2024).",
};

export const problemTiles: { title: string; body: string }[] = [
  { title: "The money is already spent", body: "The care was delivered. Now it is recovery work." },
  { title: "There is a clock", body: "Retro-auth and appeal windows close." },
  { title: "Every payer, its own rules", body: "Same code, a different fix per payer." },
];

export const visitExample = {
  title: "One denial, traced",
  paidVisits: 12,
  deniedVisit: 13,
  lines: [
    { k: "Day 1", v: "Eligibility check: prior auth is needed after visit 12." },
    { k: "Visit 13", v: "Nobody got the auth. The claim came back denied (CO-197, $185)." },
    { k: "Day 2", v: "The denials agent reads it, routes it, and drafts the appeal." },
  ],
};

export type RcmAgent = "day1" | "day2";

export const rcmSteps: { n: string; title: string; sub: string; agent?: RcmAgent }[] = [
  { n: "01", title: "Eligibility check", sub: "Is the plan active?", agent: "day1" },
  { n: "02", title: "Prior auth", sub: "Payer approves the care first" },
  { n: "03", title: "Claim (837)", sub: "The bill for one visit" },
  { n: "04", title: "ERA (835)", sub: "What was paid, and why not", agent: "day2" },
  { n: "05", title: "EOB", sub: "The same decision, sent to the patient" },
  { n: "06", title: "Appeals", sub: "Correct, resubmit or appeal", agent: "day2" },
];

export const rcmAgentLabel: Record<RcmAgent, string> = {
  day1: "Day 1 · Intake",
  day2: "Day 2 · Denials",
};

/* ─── 2. Why an agent ─────────────────────────────────────────────────── */

export const compareRows: { criterion: string; day1: string; day2: string }[] = [
  {
    criterion: "High volume, high impact",
    day1: "Every patient, before every visit",
    day2: "~1 in 7 claims, care already delivered",
  },
  {
    criterion: "Clear success criteria",
    day1: "Coverage is active or it is not",
    day2: "Paid or not, and the ERA says why",
  },
  {
    criterion: "Low ambiguity (mostly)",
    day1: "Few judgment calls",
    day2: "Most fixes repeat, some need a clinician",
  },
];

export const differentChips = [
  "Money already spent",
  "There is a clock",
  "Every payer, its own rules",
  "More than one lookup",
  "It ends in an argument",
];

export const humanTimeNote =
  "Start where people spend the most time on repeatable work: reading every denial, checking history, and rewriting the same appeal.";

/* ─── 3. What the agent does, end to end ──────────────────────────────── */

export const triad: {
  id: "context" | "guardrails" | "goals";
  title: string;
  course: string;
  build: string[];
}[] = [
  {
    id: "context",
    title: "Context",
    course: "Your SOPs, payer rules and past examples.",
    build: ["claimhistory.csv", "denial-patterns.md", "denial-memory.md"],
  },
  {
    id: "guardrails",
    title: "Guardrails",
    course: "What it can do alone, and when to ask a person.",
    build: ["Never sends anything", "Never edits the rules", "No match: send to a person"],
  },
  {
    id: "goals",
    title: "Goals",
    course: "What done looks like, in a set format.",
    build: ["Denial as clean JSON", "Route, rule, deadline, next owner", "One weekly report"],
  },
];

export const triadNote = "The same things you would give a new hire.";

export const denialFlowNodes: FlowNode[] = [
  {
    id: "history",
    label: "Learn from history",
    detail: "Pulls the claim export, runs the counts as a script, spots patterns.",
    kind: "browser",
  },
  {
    id: "rules",
    label: "Rules the billing lead owns",
    detail: "Agent drafts, billing lead approves. The agent reads, never edits.",
    kind: "human",
  },
  {
    id: "read",
    label: "Read the denial",
    detail: "Remittance printout to clean JSON. Flags gaps instead of guessing.",
    kind: "llm",
  },
  {
    id: "route",
    label: "Route it",
    detail: "Matches an approved rule and the claim history. No match: a person.",
    kind: "llm",
  },
  {
    id: "draft",
    label: "Draft the appeal",
    detail: "One page from the session notes. Gaps marked for a clinician.",
    kind: "output",
  },
  {
    id: "send",
    label: "A person signs and sends",
    detail: "The agent never sends anything to a payer.",
    kind: "human",
  },
];

export type DenialStep = {
  n: number;
  title: string;
  outcome: string;
  prompts: { label: string; text: string }[];
  outputs: string[];
};

export const denialSteps: DenialStep[] = [
  {
    n: 1,
    title: "Learn from history, write the rules",
    outcome: "42 claims, 21 denied. The top code is CO-197 (no prior auth), and it clusters at visit 13 or 14.",
    prompts: [
      {
        label: "Teach access",
        text: "Open it in your browser and go to the Claims page. Tell me what's there: how many claims, which columns, and which filters are set.",
      },
      {
        label: "Export",
        text: "Clear the filters, wait for the claim count to settle, click Export CSV, and save the export here as claimhistory.csv. Check the row count matches what the page says.",
      },
      {
        label: "Count",
        text: "Write a small script that reads the claimhistory.csv you just saved. Don't export again. ... Don't eyeball the numbers, run them.",
      },
      {
        label: "Draft rules",
        text: "Draft denial-memory.md: one row per reason code ... Where the history doesn't show how a denial turned out, mark it \"no history yet\". ... Don't approve it yourself.",
      },
    ],
    outputs: ["claimhistory.csv", "denial-patterns.md", "denial-memory.md"],
  },
  {
    n: 2,
    title: "Read the denial",
    outcome: "A remittance printout becomes clean JSON. Missing or cut-off data stays empty and is flagged.",
    prompts: [
      {
        label: "Extract",
        text: "When a denial comes in, read it and pull out the patient, payer claim number, date of service, CPT, billed and paid, every adjustment and remark code, and the payer's notes word for word. Reply with just that data as JSON.",
      },
      {
        label: "Don't guess",
        text: "If something's missing, cut off, or unclear, leave it empty and add a flag saying what's wrong.",
      },
    ],
    outputs: ["denial-triage.md"],
  },
  {
    n: 3,
    title: "Decide what to do",
    outcome: "The route comes from the approved rule plus the claim history, with the rule quoted and the deadline counted.",
    prompts: [
      {
        label: "Use the rules",
        text: "Use the rules our billing lead just approved in denial-memory.md. It's hers now: read it, follow it, never edit it.",
      },
      {
        label: "Escalate",
        text: "If no rule matches, or two rules point different ways, the route is \"send to a person\". Don't pick one yourself.",
      },
    ],
    outputs: ["Route + rule + history rows + deadline"],
  },
  {
    n: 4,
    title: "Learn from a new case",
    outcome: "A denial with no rule goes to a person. The agent proposes a rule; the billing lead decides.",
    prompts: [
      {
        label: "Propose",
        text: "When a denial matches no rule, or a person changes your route, write a proposed rule in routing-suggestions.md ... Never touch denial-memory.md.",
      },
    ],
    outputs: ["routing-suggestions.md"],
  },
  {
    n: 5,
    title: "Draft the appeal",
    outcome: "A one-page letter quoting the session notes. Anything the notes don't support is marked, not written around.",
    prompts: [
      {
        label: "Draft",
        text: "If the notes don't support something an appeal would normally say ... don't write around it. Put [NEEDS CLINICIAN: what's missing] in its place.",
      },
      { label: "Guardrail", text: "Save it to drafts/. Never send anything." },
    ],
    outputs: ["drafts/"],
  },
  {
    n: 6,
    title: "Run it every Monday",
    outcome: "A fresh export, every new remit worked, one report, and a log so next week does not repeat the work.",
    prompts: [
      {
        label: "Routine",
        text: "Never send anything, and never edit denial-memory.md. If the EHR can't be reached, stop and say so; don't use an old export.",
      },
      { label: "Schedule", text: "Schedule weekly-run.md to run every Monday at 7:00 am in this folder." },
    ],
    outputs: ["weekly-run.md", "reports/", "worked-remits.csv"],
  },
  {
    n: 7,
    title: "Red team a week",
    outcome: "Edge cases surface. A missing page goes to a person, and one new rule turns a person step into real work.",
    prompts: [
      {
        label: "Stress test",
        text: "Follow denial-triage.md on every remit on the EHR's Remittances page. Don't draft letters. Return one table: patient, code, route, rule matched, one-line reason.",
      },
    ],
    outputs: ["Report table"],
  },
];

/* Visuals */

export const snapshotTiles: { value: string; label: string }[] = [
  { value: "42", label: "claims in the history" },
  { value: "21", label: "denied" },
  { value: "$3,570", label: "billed on the denials" },
  { value: "6", label: "denials with CO-197, all Cigna" },
];

export const payerSplit = { label: "Denials by payer", cigna: 14, other: 7 };

export type RouteKind = "appeal" | "fix" | "desk" | "close" | "person";

export const routeKindLabel: Record<RouteKind, string> = {
  appeal: "Appeal",
  fix: "Fix and resubmit",
  desk: "Front desk",
  close: "Close it",
  person: "A person",
};

export const ruleChips: { code: string; meaning: string; condition: string; action: string; kind: RouteKind }[] = [
  { code: "CO-197", meaning: "No prior auth", condition: "Under 30 days since the visit", action: "Appeal for retro auth", kind: "appeal" },
  { code: "CO-16", meaning: "Missing info", condition: "Remark code names the field", action: "Fix and resubmit", kind: "fix" },
  { code: "CO-4", meaning: "Missing modifier", condition: "Note says it was a video visit", action: "Add 95, resubmit", kind: "fix" },
  { code: "CO-27", meaning: "Coverage ended", condition: "Always", action: "Front desk", kind: "desk" },
  { code: "CO-29", meaning: "Filed too late", condition: "History shows it was filed on time", action: "Appeal with proof", kind: "appeal" },
  { code: "CO-50", meaning: "Not medically necessary", condition: "Always; a clinician reads first", action: "Appeal", kind: "appeal" },
  { code: "CO-18", meaning: "Duplicate claim", condition: "The original already paid", action: "Close it", kind: "close" },
  { code: "Anything else", meaning: "No rule matches", condition: "Don't guess", action: "A person", kind: "person" },
];

export const denialCard = {
  title: "Denial, read by the agent",
  rows: [
    { k: "patient_name", v: "JONES, JAMES" },
    { k: "dos", v: "2026-10-06" },
    { k: "cpt", v: "90837" },
    { k: "billed / paid", v: "185.00 / 0.00" },
    { k: "adjustment", v: "CO-197 · 185.00" },
    { k: "remark", v: "M62" },
    { k: "payer_notes", v: "...retro auth within 30 days of the date of service" },
    { k: "flags", v: "[ ]" },
  ],
};

export const decisionCard = {
  title: "Routing decision, added to the JSON",
  rows: [
    { k: "route", v: "Appeal for retro auth" },
    { k: "rule matched", v: "CO-197: under 30 days since the visit" },
    { k: "history relied on", v: "Past Cigna CO-197: retro auth at day 17 paid, at day 45 written off" },
    { k: "deadline", v: "30 days from the date of service" },
    { k: "next", v: "Billing acts" },
  ],
};

export const appealDraft = {
  title: "Appeal draft (saved, never sent)",
  lines: [
    { kind: "text" as const, text: "Re: payer claim CLM2610064471 · CPT 90837 · CO-197" },
    { kind: "text" as const, text: "We request retroactive authorization and reprocessing." },
    { kind: "quote" as const, text: "Why care was needed: quoted from the session notes" },
    { kind: "gap" as const, text: "[NEEDS CLINICIAN: no symptom score was taken at visit 13]" },
    { kind: "gap" as const, text: "[NEEDS CLINICIAN: the 90-day treatment plan review is not documented]" },
  ],
};

export const edgeCases: { title: string; result: string }[] = [
  { title: "Remit says \"see page 2\", and page 2 does not exist", result: "Don't guess: send to a person" },
  { title: "A copay code (PR-3) with no rule", result: "Send to a person; the billing lead adds the rule" },
];

export const ruleLoop: { label: string; who: "agent" | "person"; file?: string }[] = [
  { label: "No rule matches", who: "agent" },
  { label: "Sent to a person", who: "person" },
  { label: "Agent proposes a rule", who: "agent", file: "routing-suggestions.md" },
  { label: "Billing lead decides", who: "person", file: "denial-memory.md" },
  { label: "Next run follows it", who: "agent" },
];

export const mondaySteps: { title: string; sub: string }[] = [
  { title: "Fresh export", sub: "From the EHR" },
  { title: "Find new remits", sub: "Not in worked-remits.csv" },
  { title: "Triage each", sub: "Drafts appeals" },
  { title: "One report", sub: "Due soon first" },
  { title: "Log the work", sub: "Nothing repeats" },
];

export const mondayNote = "Run it again right away: it finds nothing new and says so. That is the log doing its job.";

export const decisionColumns: { title: string; tone: "agent" | "shared" | "person"; items: string[] }[] = [
  {
    title: "The agent does alone",
    tone: "agent",
    items: [
      "Read every denial",
      "Count and find patterns",
      "Match a denial to an approved rule",
      "Propose a new rule",
      "Log what was worked",
    ],
  },
  {
    title: "The agent drafts, a person approves",
    tone: "shared",
    items: [
      "The rules (billing lead approves)",
      "Appeal letters (a person signs and sends)",
      "Gaps marked [NEEDS CLINICIAN]",
    ],
  },
  {
    title: "A person only",
    tone: "person",
    items: [
      "Medical necessity (CO-50): a clinician reads first",
      "No matching rule, or mixed codes",
      "Name, DOB or member ID does not match history",
      "Sending anything to a payer",
      "Changing the rules",
    ],
  },
];

export type AccessLevel = "read" | "write" | "none";

export const accessLevelLabel: Record<AccessLevel, string> = {
  read: "Read only",
  write: "Can write",
  none: "No access",
};

export const accessMap: { level: AccessLevel; items: { name: string; why: string }[] }[] = [
  {
    level: "read",
    items: [
      { name: "denial-memory.md", why: "Owned by the billing lead" },
      { name: "Claims and remittances in the EHR", why: "To learn and to read denials" },
      { name: "Session notes", why: "Only when drafting an appeal" },
    ],
  },
  {
    level: "write",
    items: [
      { name: "claimhistory.csv", why: "Its own working copy" },
      { name: "denial-patterns.md, reports/", why: "Its own analysis" },
      { name: "routing-suggestions.md", why: "Where it proposes rules" },
      { name: "drafts/, worked-remits.csv", why: "Its own outputs" },
    ],
  },
  {
    level: "none",
    items: [
      { name: "Sending an appeal", why: "A person sends" },
      { name: "Writing to the EHR", why: "Not needed for this job" },
    ],
  },
];

export const accessNote =
  "As designed in this build: a summary of the walkthrough's rules, not a claim about a production system.";

export const folderMap: { file: string; teamHas: string }[] = [
  { file: "denial-triage.md", teamHas: "A denial cheat sheet or SOP" },
  { file: "denial-patterns.md", teamHas: "The monthly denials report" },
  { file: "denial-memory.md", teamHas: "The rules in the senior biller's head" },
  { file: "claimhistory.csv", teamHas: "The billing system's claim export" },
  { file: "routing-suggestions.md", teamHas: "\"Can we add a rule for this?\"" },
  { file: "weekly-run.md, reports/, worked-remits.csv", teamHas: "The Monday denials checklist" },
  { file: "drafts/", teamHas: "Appeal templates waiting for a signature" },
];

export const denialTriggers: { title: string; body: string; code: string }[] = [
  {
    title: "On demand",
    body: "Point the agent at the skill and name the denial. One line is enough.",
    code: "Follow denial-triage.md. New denial came in for James Jones, payer claim CLM2610064471. It's in the EHR.",
  },
  {
    title: "Every Monday",
    body: "A scheduled task runs the weekly routine on its own. It runs on this computer, so the app has to be open.",
    code: "Schedule weekly-run.md to run every Monday at 7:00 am in this folder.",
  },
];

/* ─── 4. Key insights ─────────────────────────────────────────────────── */

export const denialInsights: { tag: string; title: string; body: string }[] = [
  {
    tag: "Build",
    title: "Context, guardrails, goals",
    body: "An agent needs what a new hire needs: your SOPs, payer rules and past examples; what it can do alone and when to ask a person; and what done looks like in a set format.",
  },
  {
    tag: "Access",
    title: "The minimum necessary rule",
    body: "Give an agent only the data the task needs. Session notes were used only to draft an appeal, never for routing. Less access means less exposure and an easier audit.",
  },
  {
    tag: "Design",
    title: "One goal per agent, mapped to an RCM step",
    body: "Eligibility verifies coverage. Denials recovers money. Different goals, data and risks, so build separate agents and tie each to the step it serves.",
  },
  {
    tag: "Testing",
    title: "Test where an agent fits",
    body: "Can you define complete? Can you define correct? Where is most human time spent? High-volume, repeatable work with a clear answer fits. Medical necessity and unmatched cases stay with people.",
  },
  {
    tag: "Production",
    title: "Access controls come first",
    body: "Think about who owns each file. The billing team owns the rules, so the agent reads them and never writes to them. It proposes changes in a separate file instead.",
  },
  {
    tag: "Ownership",
    title: "People own the rules, the agent proposes",
    body: "The agent spots patterns people miss and proposes a rule. A person approves it, and the next run follows it. The loop improves without the agent rewriting policy.",
  },
];

/* ─── 5. Tech stack ───────────────────────────────────────────────────── */

export const denialTechStack: { group: string; items: string[] }[] = [
  {
    group: "Agent and instructions",
    items: [
      "Claude Code Desktop (Opus 5.5)",
      "Skills as markdown files",
      "denial-memory.md: approved rules, owned by the billing lead",
    ],
  },
  {
    group: "Data sources",
    items: [
      "Synthetic EHR: claims, remittances, session notes",
      "claimhistory.csv: a 42-claim export",
      "ERA (835) remittance printouts",
    ],
  },
  {
    group: "Execution",
    items: [
      "Built-in browser to work the EHR",
      "A small script for the counts",
      "Appeal drafts saved, never sent",
    ],
  },
  {
    group: "Triggers",
    items: ["On demand: Follow denial-triage.md", "Scheduled task: Mondays at 7:00 am"],
  },
];
