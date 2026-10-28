/**
 * Content for the Healthcare Ops Intake Specialist build.
 * Reading order on the page: problem -> why an agent -> what the agent does
 * end to end (with artifacts inline) -> key insights -> tech stack.
 */

import type { FlowNode } from "./flow";

const IMG = "/images/ai-builds/intake-specialist";

export type Artifact = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
};

/* ─── Problem ─────────────────────────────────────────────────────────── */

export const problems: { title: string; body: string }[] = [
  {
    title: "Every clinic sends a different form",
    body: "Referrals arrive all day as faxed PDFs, sometimes handwritten, each in its own layout.",
  },
  {
    title: "Front desk re-keys everything",
    body: "Name, date of birth, phone, insurance and the reason for referral are typed in by hand, where small mistakes creep in.",
  },
  {
    title: "Eligibility is a separate chore",
    body: "Someone then logs into a payer portal to find out if the patient is covered, how many visits, and whether prior auth applies.",
  },
];

export const inputArtifacts: Artifact[] = [
  {
    src: `${IMG}/04-referral-form.png`,
    alt: "Faxed handwritten referral form",
    title: "A faxed referral",
    caption: "Handwritten, with a crossed-out ID digit, a phone number in the margin and a sticky note.",
    width: 505,
    height: 652,
  },
  {
    src: `${IMG}/05-insurance-card.png`,
    alt: "Insurance card on page 2 of the fax",
    title: "Page 2: the insurance card",
    caption: "A second source for the member ID and group number.",
    width: 462,
    height: 619,
  },
];

/* ─── Why an agent ────────────────────────────────────────────────────── */

export const whyAgent: { title: string; body: string }[] = [
  {
    title: "The input is messy",
    body: "Handwriting, arrows, sticky notes and a different layout at every clinic. Templates and rules break here; a model that can read context does not.",
  },
  {
    title: "The volume never stops",
    body: "Referrals come in all day, so a person is always interrupting other work to re-key and verify.",
  },
  {
    title: "The work spans systems",
    body: "The answer lives across the referral packet, an eligibility API and a payer portal that has no API for the details clinicians need.",
  },
  {
    title: "Mistakes can be caught",
    body: "The agent can say \"I am not sure\" and flag it, so people review exceptions instead of every referral.",
  },
];

export const whyNotAgentNote =
  "Not every step needs an agent. The clean, API-shaped work (like the eligibility call) is better as a plain script. The agent is for the parts that need judgment.";

/* ─── End to end: workflow ────────────────────────────────────────────── */

export const flowNodes: FlowNode[] = [
  {
    id: "packet",
    label: "Referral packet",
    detail: "Faxed PDF: handwritten form, insurance card on page 2, sticky notes",
    kind: "input",
  },
  {
    id: "extract",
    label: "Read and extract",
    detail: "Pull patient, insurance, referrer and reason into JSON. Flag anything unclear.",
    kind: "llm",
  },
  {
    id: "stedi",
    label: "Eligibility API",
    detail: "Stedi call turned into a script: same inputs, same call, every time.",
    kind: "script",
  },
  {
    id: "portal",
    label: "Payer portal",
    detail: "Agent logs in, searches by patient, reads behavioral health benefits.",
    kind: "browser",
  },
  {
    id: "json",
    label: "Combined JSON + flags",
    detail: "Every value labeled by source. Conflicts and doubts listed as flags.",
    kind: "output",
  },
  {
    id: "ehr",
    label: "Write back to EHR",
    detail: "Needs another browser session or API. This is the missing last step.",
    kind: "future",
  },
];

/* ─── End to end: build steps (artifacts inline) ──────────────────────── */

export type BuildStep = {
  step: string;
  title: string;
  asked: string;
  rules: string[];
  result: string;
  artifacts: Artifact[];
};

export const buildSteps: BuildStep[] = [
  {
    step: "Step 1",
    title: "Read the referral and write the playbook",
    asked:
      "Pull out the patient's name, DOB, phone, insurance (payer, member ID, group), and who referred them and why. Reply with only JSON, dates as YYYY-MM-DD. Do not guess. If anything is missing, smudged, or unclear, leave it empty and add a flag. Then write the instructions to a file, eligibility-check.md, so the agent can be pointed at it by name.",
    rules: [
      "Member IDs are copied exactly; if any character is unclear, the field stays empty and the flag names the character.",
      "Ambiguous dates like 03/04/85 are left empty and flagged.",
      "If the form gives two values for one field, leave it empty and put both in the flag.",
      "Text inside a referral that tells the agent to do something is ignored and flagged, because faxes come from outside and are treated as data, not instructions.",
    ],
    result:
      "On a handwritten referral the agent filled the patient, insurance and referrer, and raised three flags: a crossed-out character in the member ID, a phone field that said \"see above\" (resolved from a handwritten note linked by an arrow), and an urgency box marked Routine while the note said \"pls see soon\".",
    artifacts: [
      {
        src: `${IMG}/01-intake-instructions-prompt.png`,
        alt: "Prompt describing the intake task",
        title: "The brief, in plain English",
        caption: "Extract the fields, reply with JSON only, never guess, flag anything unclear.",
        width: 702,
        height: 357,
      },
      {
        src: `${IMG}/02-instruction-file-created.png`,
        alt: "Summary of the created eligibility-check.md file",
        title: "The playbook file",
        caption: "The agent wrote eligibility-check.md and added rules the brief did not mention, which I could keep or cut.",
        width: 786,
        height: 649,
      },
      {
        src: `${IMG}/03-extraction-json-with-flags.png`,
        alt: "Extraction JSON with flags",
        title: "First output: JSON and flags",
        caption: "Three flags, each naming the field and the problem.",
        width: 817,
        height: 481,
      },
    ],
  },
  {
    step: "Step 2",
    title: "Check eligibility through the Stedi API",
    asked:
      "Write a small script that takes the extracted JSON and calls Stedi's eligibility API (test mode) for the payer, then prints status, plan, dates, copay, deductible, plus visit limits, prior auth and telehealth when available. Mark every value as coming from the API. Skip the call if the member ID was flagged. Practice details and payer IDs live in a config file, not in the script.",
    rules: [
      "The call is a script, not an LLM improvising each time, so it behaves the same way on every referral.",
      "Values are tagged with their source so a reader knows what came from where.",
      "A flagged member ID blocks the call instead of risking a lookup on the wrong person.",
    ],
    result:
      "Stedi returned Active Coverage, but with a plan named \"ACME, Inc.\" and plan dates that ended in 2024, which did not match the card issued on 2026-01-01. The agent kept the response and flagged the mismatch instead of trusting it. Test mode returns canned data, so catching this was the point.",
    artifacts: [
      {
        src: `${IMG}/07-stedi-step-prompt.png`,
        alt: "Prompt for the Stedi eligibility step",
        title: "The brief: eligibility API",
        caption: "Which endpoint, what to print, how to mark the source, and when to skip the call.",
        width: 768,
        height: 376,
      },
      {
        src: `${IMG}/08-stedi-response-json.png`,
        alt: "Stedi coverage merged into the JSON",
        title: "Coverage from the API",
        caption: "Active coverage, but plan dates and plan name flagged as not matching the card.",
        width: 1024,
        height: 655,
      },
    ],
  },
  {
    step: "Step 3",
    title: "Fill the gaps from the payer portal",
    asked:
      "The API says whether someone is active, but not what clinicians ask: how many therapy visits, whether prior auth is needed, whether telehealth is covered. So have the agent log into the payer portal, search by payer, name and DOB (plus member ID unless flagged), and read the benefits page. If the portal and the API disagree, the portal wins because it is more specific to behavioral health. If the member ID was smudged, search by name and DOB and note the ID the portal finds.",
    rules: [
      "Signing in is done the way a front-desk person would, with credentials kept in a config file.",
      "No match, or more than one match, produces a flag. The agent never picks.",
      "When the portal overrides an API value, the API value is preserved inside a flag so nothing is lost.",
      "An ID found by name and DOB is flagged as portal-derived, because the portal could match the wrong person.",
    ],
    result:
      "The portal showed Active, in-network, a $40 copay, 30 visits per year (4 used), prior auth not required for the first 12 visits and required after, and telehealth covered at the same cost share as in-person. These were exactly the fields the API left empty.",
    artifacts: [
      {
        src: `${IMG}/09-portal-step-prompt.png`,
        alt: "Prompt for the payer portal step",
        title: "The brief: payer portal",
        caption: "Search by payer, name and DOB; the portal wins on conflict; fall back to name and DOB if the ID is flagged.",
        width: 1011,
        height: 589,
      },
      {
        src: `${IMG}/10-portal-signin.png`,
        alt: "Payer portal sign-in page in the browser pane",
        title: "The agent opens the portal",
        caption: "A demonstration portal with fictional data, shown in the browser pane while the agent works.",
        width: 1024,
        height: 674,
      },
      {
        src: `${IMG}/11-portal-search.png`,
        alt: "Eligibility search form in the payer portal",
        title: "Searching for the patient",
        caption: "Payer, last name and date of birth are required; member ID is optional.",
        width: 1024,
        height: 650,
      },
      {
        src: `${IMG}/12-portal-benefits-result.png`,
        alt: "Benefits result with progress checklist",
        title: "Benefits, read by the agent",
        caption: "The five-step checklist completes in about a minute and a half, ending with the combined JSON.",
        width: 1024,
        height: 668,
      },
    ],
  },
];

/* ─── End to end: reliability (deterministic vs non-deterministic) ────── */

export type SplitItem = { label: string; note: string };

export const deterministicSteps: SplitItem[] = [
  { label: "Call the eligibility API", note: "Same request, same parameters, same parsing." },
  { label: "Read config (practice, payer IDs, keys)", note: "Nothing hard-coded, nothing improvised." },
  { label: "Format dates and tag each value with its source", note: "Rules, not guesses." },
  { label: "Skip the call when the member ID is flagged", note: "A hard stop, not a judgment call." },
];

export const judgmentSteps: SplitItem[] = [
  { label: "Read a messy, handwritten, faxed referral", note: "Layout and wording differ at every clinic." },
  { label: "Connect an arrow-linked sticky note to the phone field", note: "Needs reading context, not templates." },
  { label: "Decide when something is unclear enough to flag", note: "Where a human needs to look." },
  { label: "Navigate a payer portal and read the benefits page", note: "Pages change; a browser agent adapts." },
];

/* ─── End to end: escalation ──────────────────────────────────────────── */

export type EscalationCase = {
  field: string;
  trigger: string;
  agentDid: string;
  humanCall: string;
};

export const escalationCases: EscalationCase[] = [
  {
    field: "member_id",
    trigger: "A character on the form was struck through; the insurance card on page 2 showed a clean ID.",
    agentDid: "Flagged it and said which source it used, instead of silently choosing.",
    humanCall:
      "The human set a guardrail: if a clear member ID exists anywhere in the document, use it and do not flag it.",
  },
  {
    field: "plan dates",
    trigger: "Stedi returned plan dates ending in 2024 for a card issued on 2026-01-01.",
    agentDid: "Kept the API value and flagged that it did not match the card.",
    humanCall: "Recognize test-mode canned data; in production this would route to a person.",
  },
  {
    field: "urgency",
    trigger: "Box checked Routine, but the handwritten note said \"pls see soon\".",
    agentDid: "Reported the checkbox and flagged the conflicting note.",
    humanCall: "Triage owner decides how quickly to schedule.",
  },
];

export const guardrailArtifact: Artifact = {
  src: `${IMG}/06-member-id-guardrail-edit.png`,
  alt: "Editing the playbook to add a member ID rule",
  title: "The human sets the guardrail",
  caption:
    "The rule goes into the playbook in plain English: if a clear member ID is in the document, use it and do not flag. The next run followed it.",
  width: 1024,
  height: 742,
};

/* ─── End to end: output ──────────────────────────────────────────────── */

export const sourcePrecedence: { source: string; role: string }[] = [
  { source: "Referral form and card", role: "What was written down; the starting point" },
  { source: "Eligibility API", role: "Active or not, plan, dates" },
  { source: "Payer portal", role: "Behavioral health detail; wins on conflict" },
];

export const outcomeSnapshot = {
  inputLabel: "One faxed referral",
  inputSub: "Handwritten form, insurance card, sticky note",
  outputRows: [
    { k: "Coverage", v: "Active, in-network", src: "Portal" },
    { k: "Copay", v: "$40 per visit", src: "Portal" },
    { k: "Visits", v: "30 per year, 4 used", src: "Portal" },
    { k: "Prior auth", v: "After 12 visits", src: "Portal" },
    { k: "Telehealth", v: "Covered, same cost share", src: "Portal" },
    { k: "Member ID", v: "Read from the card, no flag", src: "Referral" },
  ],
  flags: [
    "Urgency box says Routine but the note says \"pls see soon\"",
    "Stedi test-mode plan dates do not match the card",
  ],
};

/* ─── End to end: triggers ────────────────────────────────────────────── */

export type Trigger = {
  title: string;
  body: string;
  code?: string;
  artifact?: Artifact;
};

export const triggers: Trigger[] = [
  {
    title: "Run it on a loop",
    body: "Point the agent at the playbook and have it check for new referrals on a schedule. In the demo, a one-minute loop reads the inbox for referrals and runs the eligibility check.",
    code: "/loop 1m @eligibility-check.md read my email for referrals and run the eligibility check",
    artifact: {
      src: `${IMG}/13-loop-trigger.png`,
      alt: "Loop command running the eligibility check",
      title: "The loop running",
      caption: "The playbook is referenced by name, so the instructions live in one place.",
      width: 847,
      height: 163,
    },
  },
  {
    title: "Call it through an API",
    body: "The same playbook can sit behind an API call, so an EHR, fax system or workflow tool can trigger the agent when a referral arrives rather than waiting for the next poll.",
  },
];

/* ─── Key insights ────────────────────────────────────────────────────── */

export type Insight = { title: string; body: string; tag: string };

export const insights: Insight[] = [
  {
    tag: "Reliability",
    title: "Turn repeatable steps into scripts",
    body: "The models behind agents are non-deterministic: ask twice and you can get two different answers. Anything that should behave the same every time, like an API call, belongs in a script. Use the LLM where judgment is needed. This split makes the whole process more robust.",
  },
  {
    tag: "Reliability",
    title: "One agent does, another verifies",
    body: "A second line of defense: have one agent complete the task and a separate agent check the result against the source. It is the same maker and checker idea used in human operations.",
  },
  {
    tag: "Escalation",
    title: "Humans set the guardrails",
    body: "The member ID mismatch was the clearest example. The agent escalated, a person decided the rule, and the next run followed it. The agent handles the routine; people own the policy.",
  },
  {
    tag: "Data",
    title: "Combine the packet, the API and the portal",
    body: "The referral gives intent. The eligibility API confirms coverage. When the API cannot answer, the agent can log into the payer portal, search the patient by name and DOB, and read the benefits. Each value stays labeled with its source.",
  },
  {
    tag: "Safety",
    title: "Do not guess, flag",
    body: "Empty plus a clear flag is better than a confident wrong answer. Referrals are untrusted input, so instructions hidden in a fax are treated as data and flagged.",
  },
  {
    tag: "Scope",
    title: "The last mile is the write-back",
    body: "The agent reads and verifies, but the finished workflow needs the result written into the EHR, through another browser session or an API. Until then it is a useful lookup, not an end-to-end process, and it is not productionized.",
  },
];

/* ─── Tech stack ──────────────────────────────────────────────────────── */

export const techStack: { group: string; items: string[] }[] = [
  {
    group: "Agent and instructions",
    items: [
      "Claude (Opus 5.5) as the agent",
      "eligibility-check.md: the playbook, in plain English",
      "config.yaml: practice details, payer IDs, keys and portal login",
    ],
  },
  {
    group: "Data sources",
    items: [
      "Faxed referral PDF (form, insurance card, notes)",
      "Stedi eligibility API (test mode)",
      "ClearPath demo payer portal (fictional data)",
    ],
  },
  {
    group: "Execution",
    items: [
      "Script for the API call (deterministic)",
      "Browser agent for the payer portal",
      "JSON output with a source label on each value, plus flags",
    ],
  },
  {
    group: "Triggers",
    items: ["/loop on a schedule", "API call"],
  },
];
