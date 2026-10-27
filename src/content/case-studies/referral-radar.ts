import type { CaseStudy } from "./types";

export const referralRadarCaseStudy: CaseStudy = {
  slug: "referral-radar",
  title: "Referral Radar",
  oneLiner:
    "AI-assisted clinical decision support that surfaces referral opportunities buried across claim documents — with humans retaining final judgment.",
  meta: [
    { label: "Role", value: "Product strategy, synthetic data, experience design, stakeholder alignment" },
    { label: "Timeline", value: "2-week InnoFest 2025 sprint · TODO: exact dates" },
    {
      label: "Team",
      value:
        "Cross-functional: PMs, data scientists, architects, developers, healthcare SMEs, case managers. TODO: named roster",
    },
    {
      label: "Users",
      value: "Healthcare Programs case managers reviewing 20–75 documents per claim",
    },
    { label: "Stage", value: "InnoFest prototype · 2nd place Process Transformation" },
    {
      label: "Impact",
      value:
        "2nd place among 36 org-wide ideas; strong stakeholder engagement; validated explainable AI approach",
    },
  ],
  problem: [
    {
      title: "What was happening",
      body:
        "Case managers review 20–75 documents per claim — intake notes, medical reports, counselling plans, RTW docs — spending 90+ minutes of manual cross-referencing to surface a single referral opportunity.",
    },
    {
      title: "Who was affected",
      body:
        "Case managers in Healthcare Programs (~70 contracted services across BC); injured workers whose recovery windows close before referrals are recognized; program managers measuring intervention timing.",
    },
    {
      title: "Why it mattered",
      body:
        "As claim complexity grows, critical recovery windows close before referral opportunities are recognized. Relevant information is buried across disconnected documents with no systematic way to connect symptoms, barriers, and program eligibility.",
    },
  ],
  discovery: [
    {
      method: "User interviews",
      detail: "Healthcare Programs SMEs and case managers",
      insight:
        "Case managers need to understand why a recommendation was generated — not just what to do. Trust requires evidence traceability.",
    },
    {
      method: "Workflow observations",
      detail: "Claim review process mapping",
      insight:
        "Manual document cross-referencing is the bottleneck — not decision-making itself. The cognitive load is in finding, not judging.",
    },
    {
      method: "Stakeholder interviews",
      detail: "Data scientists, architects, program managers",
      insight:
        "Production claim data unavailable during sprint — synthetic data strategy needed before any model work could begin.",
    },
    {
      method: "Research",
      detail: "InnoFest 2025 challenge framing",
      insight:
        "36 ideas submitted org-wide. Challenge: 'How can we utilize AI to automate tasks, enhance provider collaboration, and improve program measurement?'",
    },
    {
      method: "Analytics",
      detail: "TODO: production claim complexity metrics",
      insight:
        "Document volume per claim (20–75) and review time (90+ min) sourced from SME input. TODO: validate with operational data.",
    },
  ],
  workflow: {
    title: "Current case manager workflow — cognitive load at every step",
    steps: [
      { label: "Claim intake" },
      { label: "Document review", bottleneck: "20–75 docs · 90+ min" },
      { label: "Cross-reference", bottleneck: "Manual · no system support" },
      { label: "Pattern recognition", bottleneck: "Missed early interventions" },
      { label: "Referral decision" },
      { label: "Program action" },
    ],
  },
  productThinking: [
    {
      observation:
        "Initial concepts focused on recommendation lists — traditional AI output format.",
      insight:
        "Case managers need to explore connections between symptoms, barriers, programs, and claim events — not scan a ranked list.",
      decision: "Push beyond recommendation list toward interactive visual mind map.",
      tradeoff:
        "Higher design and engineering complexity vs. faster MVP with simple list UI.",
      expectedOutcome:
        "Mind map became the most memorable part of the demonstration; data architect independently reached out about the visualization approach.",
    },
    {
      observation:
        "Production claim data could not be used during the innovation challenge.",
      insight:
        "Healthcare SME had limited availability — blocking the data science team's ability to train and test models.",
      decision:
        "Use ChatGPT to generate realistic claim scenarios; validate with experienced case manager before providing to data science.",
      tradeoff:
        "Synthetic data may not capture all edge cases vs. complete blocker without any training data.",
      expectedOutcome:
        "Unblocked model development and testing while respecting privacy and security requirements.",
    },
    {
      observation:
        "AI could surface referral recommendations with supporting evidence.",
      insight:
        "Clinical judgment must remain with case managers — AI recommending is different from AI deciding.",
      decision:
        "AI surfaces recommendations and evidence; humans make final referral decisions.",
      tradeoff:
        "Slightly lower automation potential vs. higher clinician trust and safer workflow.",
      expectedOutcome:
        "RTW Compliance Manager asked: 'Can this be used for other subject matters such as pain?' — signaling trust in the approach.",
    },
    {
      observation:
        "2-week sprint with no formal authority over cross-functional team.",
      insight:
        "MVP scope clarity and aligned success criteria matter more than feature count in constrained sprints.",
      decision:
        "Define MVP around explainability (evidence trace + mind map) rather than recommendation accuracy alone.",
      tradeoff: "Narrower feature set vs. coherent demo that stakeholders could evaluate.",
      expectedOutcome:
        "2nd place Process Transformation; strong engagement during final showcase.",
    },
  ],
  keyDecisions: [
    {
      decision: "AI surfaces recommendations; humans decide",
      alternative: "Fully automated referral routing",
      why: "Clinical judgment needed to remain with case managers; trust and safety require human-in-the-loop.",
      tradeoff: "Slightly lower automation vs. higher trust and safer workflow",
      outcome: "Stakeholders asked about extending to other clinical domains (pain management)",
      category: "Human vs AI",
    },
    {
      decision: "Interactive mind map over recommendation list",
      alternative: "Traditional ranked recommendation UI",
      why: "Discovery showed case managers need to explore connections, not scan lists — explainability is the product.",
      tradeoff: "Higher design/engineering complexity in 2-week sprint",
      outcome: "Most memorable demo element; data architect praised visualization approach",
      category: "User experience vs Compliance",
    },
    {
      decision: "Synthetic data via ChatGPT + case manager validation",
      alternative: "Wait for production data access or anonymized extracts",
      why: "Production data unavailable; SME time limited — synthetic data unblocked the entire data science workstream.",
      tradeoff: "Edge case coverage risk vs. complete blocker without data",
      outcome: "Team shipped working prototype within sprint constraints",
      category: "Speed vs Safety",
    },
    {
      decision: "Evidence traceability as core feature",
      alternative: "Black-box recommendations with confidence scores only",
      why: "Case managers won't act on recommendations they can't verify against source documents.",
      tradeoff: "Additional engineering for document linking and snippet extraction",
      outcome: "Transparency became a differentiator in stakeholder feedback",
      category: "Human vs AI",
    },
  ],
  architecture: {
    title: "Product-level architecture — AI-assisted claim intelligence",
    nodes: [
      {
        label: "Claim documents",
        detail: "Intake notes, medical reports, counselling plans, RTW docs, case manager notes",
      },
      {
        label: "AI processing layer",
        detail: "LLMs · RAG · multi-agent workflows · document analysis · claim summarization",
      },
      {
        label: "Referral Radar interface",
        detail: "Recommendations · evidence trace · claim timeline · mind map · natural-language search",
      },
      {
        label: "Case manager",
        detail: "Reviews evidence · explores connections · makes final referral decision",
      },
    ],
    responsibilities: [
      {
        role: "product",
        items: [
          "MVP scope and product vision",
          "Synthetic data strategy and case manager validation",
          "Experience design (mind map, evidence trace)",
          "Stakeholder alignment across 2-week sprint",
          "Human-in-the-loop boundary definition",
        ],
      },
      {
        role: "engineering",
        items: [
          "LLM integration and RAG pipeline",
          "Multi-agent workflow orchestration",
          "Document analysis and claim summarization",
          "Mind map visualization and search interface",
          "Agent trace view implementation",
        ],
      },
      {
        role: "shared",
        items: [
          "Synthetic data quality criteria with healthcare SME",
          "Evidence linking accuracy validation",
          "Demo scenario selection and showcase preparation",
        ],
      },
    ],
    tradeoffs: [
      "Synthetic data enabled speed but TODO: production validation needed for edge cases",
      "Multi-agent complexity vs. single-model simplicity — chose agents for explainability",
      "Mind map UX investment vs. faster list-based MVP",
      "TODO: specific confidence thresholds for recommendation surfacing not documented",
    ],
  },
  humanAiBoundary: {
    human: [
      "Final referral decisions and program authorization",
      "Clinical judgment on injured worker readiness",
      "Validation of synthetic training scenarios",
      "Prioritization among competing referral opportunities",
      "Override or dismissal of AI recommendations",
    ],
    ai: [
      "Surface referral recommendations ranked by priority",
      "Extract and link supporting evidence from claim documents",
      "Generate claim timeline summaries",
      "Map relationships between symptoms, barriers, and programs",
      "Natural-language search across claim context",
    ],
    boundaries: [
      "AI never auto-approves or routes referrals without human review",
      "Every recommendation includes traceable evidence snippets",
      "Agent trace view shows how AI arrived at suggestions — not just outputs",
      "TODO: specific confidence thresholds for surfacing vs. suppressing recommendations",
      "Case manager can explore mind map without accepting any recommendation",
    ],
  },
  execution: {
    timeline: {
      label: "Timeline",
      items: [
        "InnoFest 2025: 36 ideas submitted org-wide",
        "Shortlisted: Process Transformation finalist",
        "2-week rapid innovation sprint",
        "Final showcase and judging",
        "TODO: exact sprint dates",
      ],
    },
    prioritization: {
      label: "Prioritization",
      items: [
        "Explainability (evidence trace + mind map) over recommendation accuracy",
        "Synthetic data creation to unblock data science",
        "Demo-ready experience over production infrastructure",
        "Human-in-the-loop boundaries defined before model work",
      ],
    },
    mvp: {
      label: "MVP",
      items: [
        "Referral recommendations ranked by priority",
        "Evidence traceability with source document snippets",
        "Claim timeline summarization",
        "Interactive mind map visualization",
        "Natural-language search across claim context",
      ],
    },
    risks: {
      label: "Risks",
      items: [
        "Production data unavailable — synthetic data edge case coverage",
        "2-week sprint with no formal authority",
        "Healthcare SME limited availability",
        "TODO: production roadmap and scaling risks",
      ],
    },
    tradeoffs: {
      label: "Tradeoffs accepted",
      items: [
        "Prototype over production-ready system",
        "Synthetic over production training data",
        "Mind map complexity over simple list UI",
        "Human-in-the-loop over full automation",
      ],
    },
    partners: {
      label: "Cross-functional partners",
      items: [
        "Healthcare Programs SMEs and case managers",
        "Data scientists and ML engineers",
        "Solution architects",
        "Full-stack developers",
        "Program Manager, Advanced Technology Solutions",
      ],
    },
  },
  results: [
    {
      stat: "2nd",
      unit: "place · Process Transformation",
      category: "business",
      detail: "Among InnoFest 2025 finalists; 36 ideas submitted org-wide",
    },
    {
      stat: "2 weeks",
      unit: "sprint to working prototype",
      category: "operational",
      detail: "Zero-to-one with cross-functional team and no production data",
    },
    {
      stat: "90+ min",
      unit: "manual review addressed",
      category: "user",
      detail: "Prototype demonstrated faster referral opportunity identification with evidence",
    },
    {
      stat: "Strong",
      unit: "stakeholder engagement",
      category: "user",
      detail:
        "Data architect praised mind map; RTW Compliance Manager asked about extending to pain management",
    },
    {
      stat: "TODO",
      unit: "production cost impact",
      category: "business",
      detail:
        "Resume mentions ~$20M potential cost reduction — needs validation before including in materials",
    },
    {
      stat: "36",
      unit: "ideas in competition",
      category: "operational",
      detail: "Referral Radar shortlisted and placed 2nd in Process Transformation category",
    },
  ],
  lessons: [
    {
      title: "What surprised me",
      body:
        "The mind map — not the recommendation engine — generated the strongest stakeholder response. Explainability was the product, not the AI.",
    },
    {
      title: "What I would do differently",
      body:
        "Define confidence thresholds and human override patterns earlier — even in a prototype, decision boundaries need explicit design.",
    },
    {
      title: "How this changed how I think as a PM",
      body:
        "In healthcare AI, the constraint isn't model accuracy — it's trust. Product judgment means knowing where humans must remain in control, and designing the interface to make that boundary visible.",
    },
  ],
  whyThisMatters:
    "Referral Radar demonstrates how to build AI-assisted clinical workflows where trust, explainability, and human judgment are designed in — not bolted on. The same product leadership applies to any healthcare AI product where care delivery decisions require evidence, transparency, and clear human-AI boundaries.",
  judgmentCallouts: [
    {
      afterSection: "discovery",
      text: "We intentionally kept clinicians responsible for final referral decisions. AI surfaced recommendations, but never replaced clinical judgment.",
    },
    {
      afterSection: "workflow",
      text: "We mapped cognitive load to the document review step — the bottleneck was finding information, not making decisions. AI should reduce search, not replace judgment.",
    },
    {
      afterSection: "product-thinking",
      text: "We pushed beyond a recommendation list because discovery showed case managers need to explore connections — explainability is the product, not the model.",
    },
    {
      afterSection: "key-decisions",
      text: "We used synthetic data via ChatGPT + case manager validation because waiting for production data would have killed the sprint — unblock the team, validate realism with SMEs.",
    },
    {
      afterSection: "technical",
      text: "We invested in evidence traceability over black-box confidence scores because case managers won't act on recommendations they can't verify.",
    },
    {
      afterSection: "execution",
      text: "We scoped MVP around explainability (mind map + evidence trace) rather than model accuracy — in a 2-week sprint, a coherent demo beats a accurate black box.",
    },
    {
      afterSection: "lessons",
      text: "We learned that in healthcare AI, trust is the constraint — not model performance. Product judgment means designing human-AI boundaries before writing prompts.",
    },
  ],
  questions: [
    {
      question: "Where should humans remain in control?",
      answer:
        "Final referral decisions, program authorization, and clinical judgment on worker readiness. AI surfaces and explains — humans decide.",
    },
    {
      question: "Is this actually a software problem?",
      answer:
        "Yes — but the software problem is information retrieval and connection, not decision automation. The workflow bottleneck is cognitive load in document review.",
    },
    {
      question: "What evidence changed our direction?",
      answer:
        "SME input on review time (90+ min) and case manager need for evidence traceability shifted MVP from recommendation list to interactive mind map.",
    },
    {
      question: "What tradeoffs did we accept?",
      answer:
        "Synthetic over production data; mind map complexity over simple UI; human-in-the-loop over automation; prototype over production infrastructure.",
    },
    {
      question: "What would happen if we built nothing?",
      answer:
        "Case managers continue spending 90+ minutes per claim on manual cross-referencing; early intervention windows close as claim complexity grows.",
    },
    {
      question: "How would AI change this approach today?",
      answer:
        "Better synthetic data generation, faster prototyping tools (Lovable, Copilot), and more mature RAG patterns — but human-in-the-loop boundaries would remain the same.",
    },
  ],
  reflection: [
    {
      prompt: "What would I change?",
      answer:
        "Define explicit confidence thresholds and suppression rules for recommendations — even in prototype, decision boundaries need design.",
    },
    {
      prompt: "What would I validate earlier?",
      answer:
        "Production data access path and anonymization feasibility — understanding data constraints on day one shapes entire architecture.",
    },
    {
      prompt: "What assumptions were incorrect?",
      answer:
        "Assumed recommendation accuracy would be the demo highlight. Stakeholders cared more about explainability and visual exploration.",
    },
    {
      prompt: "What would I intentionally NOT build?",
      answer:
        "Automated referral routing — even with high confidence, clinical workflows require human authorization.",
    },
    {
      prompt: "How would AI change my approach today?",
      answer:
        "AI-enabled prototyping (Lovable, Copilot) could compress concept-to-validation further — resume cites ~40% faster timelines. TODO: validate.",
    },
    {
      prompt: "What would I prototype before implementation?",
      answer:
        "Mind map interaction with case managers using paper prototypes — validate exploration pattern before engineering investment.",
    },
  ],
  images: [
    {
      src: "/images/referral-radar/poc-interface-1.png",
      alt: "Referral recommendations ranked by priority",
      caption: "Referral recommendations ranked by priority",
    },
    {
      src: "/images/referral-radar/mindmap-screen.png",
      alt: "Interactive mind map visualization",
      caption: "Interactive mind map — exploring claim connections",
    },
    {
      src: "/images/referral-radar/poc-interface-details.png",
      alt: "Evidence traceability interface",
      caption: "Evidence traceability with source document snippets",
    },
  ],
  headOfProductView: {
    problem:
      "Case managers spend 90+ minutes cross-referencing 20–75 documents per claim; early referral windows close unnoticed.",
    judgment:
      "Designed AI as decision support, not decision maker. Invested in explainability (mind map + evidence trace) over recommendation accuracy.",
    hardestTradeoff:
      "Mind map complexity in a 2-week sprint vs. simple list UI — chose explainability because trust is the constraint in clinical AI.",
    technicalChallenge:
      "No production data available — built synthetic data pipeline with ChatGPT + case manager validation to unblock entire data science workstream.",
    healthcareComplexity:
      "Clinical judgment, privacy constraints, multi-document claim context, and stakeholder trust across regulated healthcare programs.",
    businessOutcome:
      "2nd place InnoFest 2025 Process Transformation; strong cross-functional engagement; validated explainable AI approach.",
    productLesson:
      "In healthcare AI, design human-AI boundaries before writing prompts — trust is the product.",
  },
};
