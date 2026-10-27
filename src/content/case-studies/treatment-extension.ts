import type { CaseStudy } from "./types";

export const treatmentExtensionCaseStudy: CaseStudy = {
  slug: "treatment-extension-requests",
  title: "Treatment Extension Requests",
  oneLiner:
    "Enabling treatment continuity for injured workers by digitizing physio extension requests — connecting clinicians, case managers, and care decisions.",
  meta: [
    { label: "Role", value: "Product Owner, Provider Expansion (PXT / PRQ)" },
    { label: "Timeline", value: "2023–2025 · PXT deployment March 5 (select features) · TODO: full PRQ launch date" },
    {
      label: "Team",
      value:
        "Pioneers and Carebears dev pods, CMS team (Mimi), architects (Michael, Chitanya, Rajat), Healthcare Programs (Gabi). Cross-functional PO coordination.",
    },
    {
      label: "Users",
      value:
        "Physiotherapists and office admins requesting 60-day extensions; case managers reviewing treatment authorization",
    },
    { label: "Stage", value: "PRQ enhancements deployed in phases · CMS decision rationale pending" },
    {
      label: "Impact",
      value:
        "Digital extension requests replacing fax/phone; provider request tracking; error validation. TODO: post-launch adoption metrics",
    },
  ],
  problem: [
    {
      title: "What was happening",
      body:
        "Physio is WorkSafeBC's largest healthcare spend ($80M of $500M total). Extension requests — authorizing continued treatment beyond initial approval — arrived via fax, phone, and mail. 139,380 historical requests processed, with 79% always approved and 27% resolved same-day, raising concerns that case managers weren't reviewing details.",
    },
    {
      title: "Who was affected",
      body:
        "Injured workers waiting for treatment authorization continuity; physiotherapists and office admins re-submitting via fax; case managers skimming requests they should be adjudicating; Healthcare Programs managing $80M physio spend.",
    },
    {
      title: "Why it mattered",
      body:
        "Extensions directly enable patient care — without timely approval, treatment stops. But rubber-stamp approvals on $80M in spend suggested the workflow wasn't supporting clinical review. The product had to digitize requests while strengthening — not bypassing — case manager judgment.",
    },
  ],
  discovery: [
    {
      method: "User interviews",
      detail: "Physiotherapist focus groups and provider feedback",
      insight:
        "Physios don't want to fill out functional abilities on web forms — they want to describe treatment progress in text. Body map (Form 6) adds no value for providers who already know injury anatomy.",
    },
    {
      method: "Workflow observations",
      detail: "PXT app usage analysis",
      insight:
        "PXT app is used by office admins, not physiotherapists — but surveys were filled out by physios, creating bias in satisfaction scores (contract terms vs. tool quality).",
    },
    {
      method: "Stakeholder interviews",
      detail: "Healthcare Programs (Gabi), case managers, CMS team",
      insight:
        "Physio extensions are 16% of annual spending concern. Case managers need to be more involved in accept/decline — auto-approve would defeat the business purpose.",
    },
    {
      method: "Analytics",
      detail: "139,380 historical request analysis",
      insight:
        "79% always approved (109,693/139,380) sparked auto-approve debate. Aging data showed most requests resolve within 3 days — ping feature deprioritized. 27% same-day resolution raised review quality concerns.",
    },
    {
      method: "Research",
      detail: "Multi-channel request mapping (portal, fax, mail)",
      insight:
        "Physio extensions don't only come from the portal — fax/mail channels require holistic CMS architecture, not portal-only design.",
    },
  ],
  workflow: {
    title: "Legacy extension workflow — treatment continuity blocked by manual channels",
    steps: [
      { label: "Physio", bottleneck: "Treatment nearing 60-day limit" },
      { label: "Fax/phone", bottleneck: "Manual submission · duplicate entry" },
      { label: "CMS intake", bottleneck: "Multi-channel · no linked ID" },
      { label: "Case manager", bottleneck: "Skimming · 27% same-day approve" },
      { label: "Decision", bottleneck: "No rationale surfaced to provider" },
      { label: "Treatment", bottleneck: "Care gap if delayed or denied" },
    ],
  },
  productThinking: [
    {
      observation:
        "Senior PMs and architects pushed to auto-approve extensions since 79% are always approved.",
      insight:
        "Auto-approve defeats the business purpose — case managers need to be more involved because physios want to keep treating and WSBC pays significant insurance on extensions.",
      decision: "Reject auto-approve; design for case manager review with better information capture.",
      tradeoff:
        "Slower processing vs. stronger clinical oversight on $80M spend category.",
      expectedOutcome:
        "Case managers receive structured digital requests with treatment rationale — enabling informed review, not rubber-stamping.",
    },
    {
      observation:
        "Stakeholders wanted body map (Form 6) for provider extension requests.",
      insight:
        "Providers know injury anatomy — body map adds scope without value. Text box suffices for phase 1 treatment progress description.",
      decision: "Deprioritize body map; simple text field for extension rationale.",
      tradeoff: "Less visual data for case managers vs. faster launch and lower provider friction.",
      expectedOutcome:
        "Reduced scope and provider completion time; avoided translation complexity for CMS display.",
    },
    {
      observation:
        "Existing physio extension flow lacked end-to-end provider experience — no decision rationale surfaced.",
      insight:
        "Providers made phone calls because they couldn't see case manager decisions or reasoning — increasing support burden.",
      decision:
        "Prioritize PRQ enhancements: request tracking, decision rationale from CMS, notification emails, error validation.",
      tradeoff:
        "Delayed new request types to fix existing physio extension experience first.",
      expectedOutcome:
        "Funding secured for CMS optimization narrative: fix current workflows before adding new request types.",
    },
    {
      observation:
        "Injured worker information was re-entered for each request type in the portal.",
      insight:
        "Providers submit multiple request types per patient — redundant data entry increases errors and abandonment.",
      decision: "Redesign flow: injured worker info entered once, then select request type.",
      tradeoff:
        "Cross-product workflow change requiring coordination with other POs and security team.",
      expectedOutcome:
        "Developers connect one injured worker form to service type page instead of six separate connections.",
    },
    {
      observation:
        "Payee number manually entered caused production incident (wrong payee# submission).",
      insight:
        "Pre-populating payee# requires authentication — scope cut deferred this but incident validated the need.",
      decision: "Document in backlog; scope cut for phase 1 with manual entry and error validation.",
      tradeoff:
        "Data entry error risk vs. authentication dependency and BCeID migration timeline.",
      expectedOutcome:
        "Error validation features shipped; payee pre-population noted for future authenticated release.",
    },
  ],
  keyDecisions: [
    {
      decision: "Reject auto-approve for extensions",
      alternative: "Auto-approve up to a spending threshold",
      why: "79% approval rate doesn't mean review is unnecessary — case manager involvement is the business purpose on $80M physio spend.",
      tradeoff: "Slower processing vs. clinical oversight and spend control",
      outcome: "Product designed to strengthen review quality, not bypass it",
      category: "Human vs AI",
    },
    {
      decision: "Prioritize decision rationale over new request types",
      alternative: "Add new request types before fixing physio extension experience",
      why: "Existing flow incomplete without CMS decision rationale — providers phone in because they can't see decisions.",
      tradeoff: "Delayed feature expansion vs. end-to-end functional experience",
      outcome: "PRQ funding secured with reprioritization narrative",
      category: "Process vs Software",
    },
    {
      decision: "Deploy PRQ enhancements early (before CMS decision rationale)",
      alternative: "Wait until April for full CMS + portal launch together",
      why: "View Details page and error validation are value-add now; early feedback and incident buffer before decision rationale launch.",
      tradeoff: "Phased launch complexity vs. earlier provider value and risk mitigation",
      outcome: "Select features deployed March 5; decision rationale targeted for CMS launch",
      category: "Speed vs Safety",
    },
    {
      decision: "Text box over body map for extension rationale",
      alternative: "Implement Form 6 body map for providers",
      why: "Providers know injury anatomy; body map adds CMS translation scope without provider value.",
      tradeoff: "Less visual injury data vs. faster launch and lower friction",
      outcome: "Phase 1 shipped with text-based treatment progress description",
      category: "User experience vs Compliance",
    },
    {
      decision: "Deprioritize ping feature; prioritize callback request",
      alternative: "Build both ping (stuck request alert) and callback features",
      why: "Aging data showed most requests resolve within 3 days — ping adds little value; callback streamlines physio communication.",
      tradeoff: "Fewer provider communication tools in v1",
      outcome: "Development capacity redirected to higher-impact callback workflow",
      category: "Configuration vs Product",
    },
  ],
  architecture: {
    title: "Product-level architecture — multi-channel provider requests",
    nodes: [
      {
        label: "My Provider Services (PXT)",
        detail: "Provider portal · extension request submission · request tracking · error validation",
      },
      {
        label: "DocUploader / ICCDataSweeper",
        detail: "Document submission to CMS · PDF + metadata · unique request identifier",
      },
      {
        label: "CMS (Claims Management)",
        detail: "Case manager review · approve/deny/revise · decision rationale · hydro + physio items",
      },
      {
        label: "Provider notification",
        detail: "Decision email · view details page · request status tracking",
      },
    ],
    responsibilities: [
      {
        role: "product",
        items: [
          "PRQ feature prioritization and funding narrative",
          "Cross-PO coordination (PXT + CMS teams)",
          "Provider workflow redesign (injured worker info once)",
          "Data-driven feature cuts (ping vs. callback, body map vs. text)",
          "Phased launch strategy (early deploy vs. full CMS launch)",
        ],
      },
      {
        role: "engineering",
        items: [
          "PXT portal extension request forms",
          "DocUploader integration for CMS submission",
          "Request ID linking between online and CMS sides",
          "Error validation and status display logic",
          "CMS decision rationale and notification email pipeline",
        ],
      },
      {
        role: "shared",
        items: [
          "Multi-channel architecture (portal + fax + mail) with CMS team",
          "Status testing matrix (all combinations of physio/hydro decisions)",
          "Pod transfer knowledge transfer (Pioneers → Carebears)",
          "Security review and authentication roadmap",
        ],
      },
    ],
    tradeoffs: [
      "DocUploader pattern for physio vs. new flexible pattern for future request types (Michael/Chitanya architectural decision)",
      "Online passes unique identifier to CMS for linking — fax/mail channels need holistic design",
      "Authentication deferred for payee# pre-population — manual entry with error validation for phase 1",
      "CMS surfaces decision data only (not full submission) for future request types",
    ],
  },
  execution: {
    timeline: {
      label: "Timeline",
      items: [
        "2023–2024: PXT physio extension request digital submission",
        "2024: $300K approved for provider expansion; CMS team $60–80K",
        "Mar 5: PXT deployment with select PRQ features",
        "TODO: full PRQ launch with CMS decision rationale (targeted early April)",
        "Security review delayed final launch by ~1 week",
      ],
    },
    prioritization: {
      label: "Prioritization",
      items: [
        "Fix existing physio extension experience before new request types",
        "Decision rationale + request tracking over PDF auto-extraction",
        "Callback request over ping feature (data-driven)",
        "Text box over body map for phase 1",
        "Injured worker info-once workflow redesign",
      ],
    },
    mvp: {
      label: "MVP (PRQ phased)",
      items: [
        "Digital 60-day physio extension request submission",
        "Request tracking on provider portal",
        "Error validation for submission fields",
        "View Details page for providers",
        "Decision rationale + notification email (CMS-dependent phase)",
      ],
    },
    risks: {
      label: "Risks",
      items: [
        "CMS team discovery scope creep (1.5 months vs. capped budget)",
        "Pod transfer friction (Pioneers → Carebears)",
        "Multi-channel architecture complexity (portal + fax + mail)",
        "Payee# data entry errors without authentication",
        "Security vulnerabilities impacting PRQ story points",
      ],
    },
    tradeoffs: {
      label: "Tradeoffs accepted",
      items: [
        "Phased launch over big-bang CMS + portal release",
        "Manual payee# entry over authentication dependency",
        "Text rationale over body map visualization",
        "CMS optimization before new request type expansion",
      ],
    },
    partners: {
      label: "Cross-functional partners",
      items: [
        "CMS team (Mimi) — decision rationale, case manager workflow",
        "Architects (Michael, Chitanya, Rajat) — multi-channel linking",
        "Pioneers → Carebears dev pods (Tony, Madhu, Zak)",
        "Healthcare Programs (Gabi) — spend and clinical oversight",
        "Security team — authentication and vulnerability review",
      ],
    },
  },
  results: [
    {
      stat: "$80M",
      unit: "physio spend addressed",
      category: "business",
      detail: "Largest healthcare spend category; extensions are major cost driver",
    },
    {
      stat: "139K+",
      unit: "historical requests analyzed",
      category: "operational",
      detail: "133,390 completed; data informed auto-approve debate and feature prioritization",
    },
    {
      stat: "Mar 5",
      unit: "PXT deployment",
      category: "user",
      detail: "Select PRQ features deployed; digital extension requests live on provider portal",
    },
    {
      stat: "PRQ",
      unit: "funding secured",
      category: "business",
      detail: "Reprioritization narrative: optimize current workflows before new request types",
    },
    {
      stat: "TODO",
      unit: "digital vs fax adoption",
      category: "operational",
      detail: "Post-launch channel shift metrics not yet documented",
    },
    {
      stat: "TODO",
      unit: "CM review quality improvement",
      category: "user",
      detail: "Structured digital requests intended to enable informed review vs. skimming",
    },
  ],
  lessons: [
    {
      title: "What surprised me",
      body:
        "79% approval rate was used to argue for auto-approve — but high approval rate can mean the review workflow is broken (skimming), not that review is unnecessary.",
    },
    {
      title: "What I would do differently",
      body:
        "Cap CMS team discovery scope earlier with explicit budget constraints — open-ended discovery on a $300K budget created timeline risk for Carebears dev capacity.",
    },
    {
      title: "How this changed how I think as a PM",
      body:
        "Care delivery products require distinguishing between 'automate the approval' and 'enable better judgment.' On $80M in treatment spend, the product's job is to make case manager review more informed — not to remove it.",
    },
  ],
  whyThisMatters:
    "Treatment extensions sit at the intersection of care delivery and operational workflow — they directly determine whether injured workers continue receiving physiotherapy. This project required balancing clinician usability, case manager clinical oversight, multi-channel architecture, and spend control — the same product leadership needed for healthcare workflow products where patient outcomes depend on operational systems working correctly.",
  judgmentCallouts: [
    {
      afterSection: "discovery",
      text: "We segmented providers by workflow (office admin submits, physio treats) instead of organization type — behavior predicted adoption and survey bias better than demographics.",
    },
    {
      afterSection: "workflow",
      text: "We rejected auto-approve despite 79% approval rate because high approval can indicate broken review (skimming), not unnecessary review — on $80M spend, judgment must be enabled, not bypassed.",
    },
    {
      afterSection: "product-thinking",
      text: "We deprioritized the body map for providers because they already know injury anatomy — text box sufficed for phase 1 without adding CMS translation scope.",
    },
    {
      afterSection: "key-decisions",
      text: "We prioritized decision rationale over new request types because providers were calling in due to lack of end-to-end experience — fix the care continuity loop before expanding.",
    },
    {
      afterSection: "technical",
      text: "We designed for multi-channel reality (portal + fax + mail) instead of portal-only — physio extensions don't only come from the portal.",
    },
    {
      afterSection: "execution",
      text: "We deployed PRQ enhancements early for provider feedback and incident buffer rather than waiting for full CMS launch — phased value delivery over big-bang release.",
    },
    {
      afterSection: "results",
      text: "We used aging data to deprioritize the ping feature — most requests resolve within 3 days, so alerting on stuck requests added little value vs. callback communication.",
    },
  ],
  questions: [
    {
      question: "Is this actually a software problem?",
      answer:
        "Partially. The approval behavior is a process problem (skimming), but digitizing requests and surfacing decision rationale is a software problem that enables better clinical review.",
    },
    {
      question: "Should this be solved with process, configuration, software, or AI?",
      answer:
        "Software for request submission, tracking, and decision transparency. Process change (CM review quality) follows from better information capture — not from removing review.",
    },
    {
      question: "Who actually owns this workflow?",
      answer:
        "Split: providers submit (PXT), case managers adjudicate (CMS), architecture spans both. Required cross-PO alignment between PXT and CMS teams.",
    },
    {
      question: "What evidence changed our direction?",
      answer:
        "139K request analysis (79% approve, 27% same-day), aging data (deprioritize ping), provider feedback (text over body map), production incident (payee# errors).",
    },
    {
      question: "Where should humans remain in control?",
      answer:
        "Case managers must approve/deny/revise every extension — including separate decisions for physio and hydro items. Auto-approve was explicitly rejected.",
    },
    {
      question: "What would happen if we built nothing?",
      answer:
        "Providers continue faxing; case managers continue skimming; injured workers face treatment gaps; $80M physio spend lacks structured review support.",
    },
  ],
  reflection: [
    {
      prompt: "What would I change?",
      answer:
        "Involve CMS team in portal design from day one with joint architecture sessions — multi-channel reality should shape portal UX, not be discovered during integration.",
    },
    {
      prompt: "What would I validate earlier?",
      answer:
        "Survey respondent role (admin vs. physio) — discovering bias late meant prior satisfaction data was unreliable for product decisions.",
    },
    {
      prompt: "What assumptions were incorrect?",
      answer:
        "Assumed high approval rate meant automation was safe. Healthcare Programs clarified that approval rate indicated review quality failure, not automation opportunity.",
    },
    {
      prompt: "What would I intentionally NOT build?",
      answer:
        "Auto-approve for extensions — and PDF auto-extraction for phase 1 (introducing new service digitally mattered more than UX optimization of data entry).",
    },
    {
      prompt: "How would AI change my approach today?",
      answer:
        "AI could assist case managers with treatment progress summarization from structured requests — but would not replace approve/deny judgment. Prescriptive models considered but required forms with clinical context.",
    },
    {
      prompt: "How would I measure success differently?",
      answer:
        "Track CM review time per request and decision reversal rate — not just digital adoption. Success is better judgment, not faster rubber-stamping.",
    },
    {
      prompt: "What would I prototype before implementation?",
      answer:
        "Case manager review interface with decision rationale — validate that structured digital requests actually change review behavior before building provider-side features.",
    },
  ],
  images: [
    {
      src: "/case-studies/treatment-extension/track-requests.png",
      alt: "Provider request tracking interface",
      caption: "PRQ Feature 3: Track requests — provider visibility into submission status",
    },
    {
      src: "/case-studies/treatment-extension/cms-rationale.png",
      alt: "CMS decision rationale for providers",
      caption: "PRQ Feature 4: Decision rationale surfaced to providers via CMS",
    },
    {
      src: "/case-studies/treatment-extension/error-validation.png",
      alt: "Error validation on extension submission",
      caption: "PRQ Feature 5: Error validation to reduce submission defects",
    },
  ],
  headOfProductView: {
    problem:
      "$80M physio spend with extensions submitted via fax; case managers skimming approvals on treatment decisions that directly affect injured worker care.",
    judgment:
      "Rejected auto-approve despite 79% approval rate. Prioritized decision transparency and CM review quality over automation or feature expansion.",
    hardestTradeoff:
      "Phased PRQ launch (provider features before CMS decision rationale) vs. big-bang release — chose early provider value and incident buffer.",
    technicalChallenge:
      "Multi-channel architecture (portal + fax + mail) requiring unique request ID linking between PXT and CMS — not a portal-only problem.",
    healthcareComplexity:
      "Treatment continuity for injured workers; separate physio/hydro decisions; clinical oversight on largest spend category; provider-admin workflow split.",
    businessOutcome:
      "PRQ funding secured; PXT deployed March 5; digital extension requests live. TODO: adoption and review quality metrics.",
    productLesson:
      "In care delivery workflows, optimize for better judgment — not faster approval. High approval rates can signal broken review, not unnecessary review.",
  },
};
