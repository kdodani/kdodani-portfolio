import type { CaseStudy } from "./types";

export const oscarEmrCaseStudy: CaseStudy = {
  slug: "oscar-emr-api-integration",
  title: "OSCAR EMR API Integration",
  oneLiner:
    "Modernizing clinician workflows by integrating WorkSafeBC directly with OSCAR EMRs.",
  meta: [
    { label: "Role", value: "Idea Champion → Product Manager, Claims" },
    { label: "Timeline", value: "2022–2025 · POC validated March 27, 2025" },
    {
      label: "Team",
      value:
        "Cross-functional: solution architects, EMR developers, claims SMEs, Innovation Council sponsors. TODO: named roster",
    },
    {
      label: "Users",
      value: "BC physicians (~1,200 on OSCAR beachhead); claims staff processing 200K+ reports/year",
    },
    { label: "Stage", value: "POC complete · ecosystem expansion in progress" },
    {
      label: "Impact",
      value:
        "$80K Innovation Council funding secured; direct API model validated; foundation for ~70% provider ecosystem coverage",
    },
  ],
  problem: [
    {
      title: "What was happening",
      body:
        "Form 8/11 — the primary clinical data source for every workers' compensation claim in BC — was locked inside a 2001 HIBC/Teleplan billing spec. 52,000 faxes/year required 28 million manual keystrokes. Form content hadn't been updated since 2015.",
    },
    {
      title: "Who was affected",
      body:
        "Physicians guessing ICD-9 codes and truncating clinical notes; medical advisors receiving incomplete data; claims staff making decisions on unreliable information; ELAN staff re-keying faxed forms at ~$250K/year.",
    },
    {
      title: "Why it mattered",
      body:
        "Every form field change required coordinated updates across WorkSafeBC, HIBC, and every EMR vendor. Clinical practice had evolved — abilities-focused care, telehealth, physician shortages — but the delivery infrastructure had frozen the form.",
    },
  ],
  discovery: [
    {
      method: "User interviews",
      detail: "15 physician interviews · Aug 2022",
      insight:
        "Physicians were guessing codes and estimating RTW dates — not from carelessness, but because the form gave them no space for clinical judgment.",
    },
    {
      method: "Stakeholder interviews",
      detail: "Medical advisors · group interviews Aug–Sep 2022",
      insight:
        "Incomplete forms and unreliable information were a key issue. Clinical information was critical yet often cut off due to billing spec character limits.",
    },
    {
      method: "Analytics",
      detail: "305-person claims survey (2017) + focus groups (2022)",
      insight:
        "Staff relied on fields physicians reported difficulty filling accurately — decisions were being made on guesses.",
    },
    {
      method: "Workflow observations",
      detail: "Cross-group behavioral synthesis",
      insight:
        "GPs will not use any software other than their EMR. No portal, web form, or WorkSafeBC-hosted solution would be adopted. The path had to be invisible — embedded at point of care.",
    },
    {
      method: "Research",
      detail: "infoX pitch · InnoFest Sep 2024",
      insight:
        "Socialized 'Death to PDFs' across the org. Didn't win InnoFest, but built enough executive momentum to secure $80K Innovation Council funding for a POC.",
    },
  ],
  workflow: {
    title: "Legacy workflow — structural bottlenecks at every handoff",
    steps: [
      { label: "Provider" },
      { label: "EMR", bottleneck: "Form constrained by 2001 billing spec" },
      { label: "Manual copy", bottleneck: "28M keystrokes · fax/print" },
      { label: "HIBC/Teleplan", bottleneck: "Character limits · no branching logic" },
      { label: "Operations", bottleneck: "~$250K/year re-keying" },
      { label: "Claim", bottleneck: "Decisions on incomplete clinical data" },
    ],
  },
  productThinking: [
    {
      observation:
        "Physicians spend half the form on demographic/coding data with no clinical relevance.",
      insight:
        "The data quality problem was structural — the form was asking clinical work through an administrative billing channel.",
      decision: "Build a direct API channel decoupled from HIBC/Teleplan.",
      tradeoff:
        "Higher implementation effort and vendor adoption risk vs. updating within existing constraints.",
      expectedOutcome:
        "Independent form content velocity; physicians stay in EMR workflow; reusable infrastructure for any EMR partner.",
    },
    {
      observation:
        "Paid EMR vendors have long sales cycles and integration negotiation overhead.",
      insight:
        "OSCAR is open-source (McMaster), community-maintained, with ~1,200 BC physicians — lower integration risk to prove the model.",
      decision: "Validate with OSCAR as beachhead before paid EMR partnerships.",
      tradeoff:
        "Smaller initial market vs. faster POC validation and open-source developer access.",
      expectedOutcome:
        "POC complete March 2025; positive signals from QHR, Plexia, Medinet, Intrahealth.",
    },
    {
      observation:
        "HL7 FHIR is the long-term healthcare interoperability standard.",
      insight:
        "FHIR adds significant integration complexity that would delay validation by months.",
      decision: "JSON payload for POC; FHIR as upgrade path once pattern is proven.",
      tradeoff: "Non-standard short-term format vs. weeks-not-months validation timeline.",
      expectedOutcome:
        "Validated integration model in POC; structured JSON schema for Form 8 documented in Postman collection.",
    },
    {
      observation:
        "Full-scale rollout cost is significant; executive buy-in requires evidence.",
      insight:
        "A POC-first approach de-risks funding decisions and creates a reusable APIM facade for every future partner.",
      decision: "POC before production rollout; Azure APIM Document Router as reusable gateway.",
      tradeoff: "Delayed full adoption vs. evidence-based executive funding and scalable architecture.",
      expectedOutcome:
        "$80K secured; roadmap covering approximately 70% of provider ecosystem via top 5 EMRs.",
    },
  ],
  keyDecisions: [
    {
      decision: "Direct API integration instead of portal or web forms",
      alternative: "WorkSafeBC-hosted web forms or provider portal submission",
      why: "Discovery showed GPs will not leave their EMR — any solution outside point-of-care workflow would fail adoption.",
      tradeoff: "Higher engineering complexity and vendor ecosystem engagement required",
      outcome: "Validated invisible workflow embedded in OSCAR eForm",
      category: "Process vs Software",
    },
    {
      decision: "JSON over HL7 FHIR for POC",
      alternative: "Build to FHIR standard from day one",
      why: "FHIR complexity would delay validation; JSON let the team prove the integration model in weeks.",
      tradeoff: "Non-standard format requiring future migration path",
      outcome: "POC validated March 27, 2025; FHIR documented as upgrade path",
      category: "Speed vs Scalability",
    },
    {
      decision: "OSCAR beachhead before paid EMR vendors",
      alternative: "Negotiate with top commercial EMR vendors first",
      why: "Open-source OSCAR offered lower integration risk and faster developer access to prove the model.",
      tradeoff: "Smaller initial physician base (~1,200 vs. top 5 = ~80% market)",
      outcome: "POC complete; positive vendor signals from QHR, Plexia, Medinet, Intrahealth",
      category: "Configuration vs Product",
    },
    {
      decision: "Decouple clinical reporting from billing (Form/invoice split)",
      alternative: "Continue routing clinical data through HIBC/Teleplan",
      why: "Billing spec was the root constraint freezing form content since 2015.",
      tradeoff: "Dual-path architecture (clinical → WorkSafeBC; billing → Teleplan)",
      outcome: "WorkSafeBC can update form content without multi-party billing spec coordination",
      category: "Technical debt vs Scalability",
    },
  ],
  architecture: {
    title: "Product-level architecture — OSCAR to WorkSafeBC direct channel",
    nodes: [
      {
        label: "OSCAR EMR",
        detail: "eForm with submit button · ~1,200 BC physicians · beachhead validated",
      },
      {
        label: "WorkSafeBC API Gateway",
        detail: "Azure APIM facade · OAuth2.0/mTLS · reusable for any future EMR partner",
      },
      {
        label: "WorkSafeBC CMS",
        detail: "Structured JSON · Azure Blob Storage · bypasses HIBC/Teleplan",
      },
    ],
    responsibilities: [
      {
        role: "product",
        items: [
          "Discovery synthesis and strategic option analysis",
          "Executive funding narrative and business case",
          "EMR vendor ecosystem outreach (50 vendors)",
          "Form content requirements and physician workflow mapping",
          "POC scope definition and success criteria",
        ],
      },
      {
        role: "engineering",
        items: [
          "Azure APIM Document Router implementation",
          "OAuth2.0/mTLS authentication handshake",
          "JSON payload schema and validation",
          "OSCAR eForm integration and version detection",
          "CMS ingestion pipeline and Blob Storage",
        ],
      },
      {
        role: "shared",
        items: [
          "Form version detection in eForm (auto-prompt outdated versions)",
          "Vendor onboarding playbook and API documentation",
          "Confirmation logs and feedback loop design (roadmap)",
        ],
      },
    ],
    tradeoffs: [
      "JSON over FHIR for POC speed — FHIR is the documented upgrade path",
      "Azure APIM as reusable facade vs. point-to-point integrations per vendor",
      "Clinical/billing decoupling creates dual-path complexity but removes root constraint",
      "Form version detection inside product vs. external multi-party spec coordination",
    ],
  },
  execution: {
    timeline: {
      label: "Timeline",
      items: [
        "Aug 2022: 15 physician interviews + medical advisor groups",
        "2022–2024: Strategic option analysis and infoX socialization",
        "Sep 2024: InnoFest pitch ('Death to PDFs')",
        "2025: $80K Innovation Council funding secured",
        "Mar 27, 2025: OSCAR POC validated",
      ],
    },
    prioritization: {
      label: "Prioritization",
      items: [
        "Form 8/11 injury report submission first (highest volume clinical data)",
        "Confirmation logs and bidirectional exchange on roadmap",
        "50 EMR vendors in outreach; top 5 = ~80% BC physician market",
      ],
    },
    mvp: {
      label: "MVP",
      items: [
        "Direct JSON payload from OSCAR eForm to WorkSafeBC CMS",
        "OAuth2.0/mTLS through Azure APIM",
        "Form version detection in eForm",
        "Bypass HIBC/Teleplan for clinical data path",
      ],
    },
    risks: {
      label: "Risks",
      items: [
        "Vendor adoption requires sustained ecosystem engagement",
        "Full-scale rollout cost significant without POC evidence",
        "Provincial eForm strategy timeline uncertainty",
        "TODO: post-POC production rollout risks",
      ],
    },
    tradeoffs: {
      label: "Tradeoffs accepted",
      items: [
        "POC scope over full production rollout",
        "JSON over FHIR for speed",
        "OSCAR beachhead over immediate commercial EMR deals",
        "Dual clinical/billing paths over single HIBC channel",
      ],
    },
    partners: {
      label: "Cross-functional partners",
      items: [
        "Innovation Council / executive sponsors",
        "Solution architects and EMR developers",
        "Claims SMEs and medical advisors",
        "HIBC/Teleplan stakeholders (informed, not blocking)",
        "OSCAR community maintainers (McMaster)",
      ],
    },
  },
  results: [
    {
      stat: "$80K",
      unit: "Innovation Council funding",
      category: "business",
      detail: "Secured after InnoFest socialization despite not winning the competition",
    },
    {
      stat: "Mar 27",
      unit: "2025 POC validated",
      category: "operational",
      detail: "Direct JSON from OSCAR eForm to WorkSafeBC CMS — no HIBC required",
    },
    {
      stat: "~70%",
      unit: "provider ecosystem in roadmap",
      category: "business",
      detail: "Top 5 EMRs cover ~80% of BC physicians; 50 vendors in outreach",
    },
    {
      stat: "200K+",
      unit: "physician reports/year addressed",
      category: "user",
      detail: "Primary clinical data source for every workers' comp claim in BC",
    },
    {
      stat: "TODO",
      unit: "post-POC adoption metrics",
      category: "operational",
      detail: "Production rollout metrics not yet documented",
    },
    {
      stat: "4",
      unit: "EMR vendors with positive signals",
      category: "business",
      detail: "QHR Technologies, Plexia, Medinet, Intrahealth willing to integrate",
    },
  ],
  lessons: [
    {
      title: "What surprised me",
      body:
        "InnoFest loss still generated enough executive momentum for $80K funding. Socializing the idea across groups mattered more than winning the competition.",
    },
    {
      title: "What I would do differently",
      body:
        "Start vendor ecosystem conversations earlier in parallel with discovery — adoption risk is as important as technical validation.",
    },
    {
      title: "How this changed how I think as a PM",
      body:
        "Structural constraints masquerade as behavioral problems. Physicians weren't 'bad at forms' — the delivery infrastructure made good clinical documentation impossible.",
    },
  ],
  whyThisMatters:
    "This project required diagnosing a decades-old structural constraint, not building another form. It combined clinical workflow understanding, executive funding strategy, and technical architecture decisions — the same muscles needed to build healthcare interoperability products where care delivery, operational excellence, and ecosystem design must align.",
  judgmentCallouts: [
    {
      afterSection: "discovery",
      text: "We chose API integration over portals or web forms because discovery showed GPs will not leave their EMR — the solution had to be invisible at point of care.",
    },
    {
      afterSection: "workflow",
      text: "We diagnosed a structural constraint, not a behavioral problem. Physicians weren't careless — the 2001 billing spec made good clinical documentation impossible.",
    },
    {
      afterSection: "product-thinking",
      text: "We chose JSON over FHIR for the POC because proving the integration model in weeks was more valuable than standards compliance that would delay validation by months.",
    },
    {
      afterSection: "key-decisions",
      text: "We validated with OSCAR before paid EMR vendors because open-source offered lower integration risk to prove the model — beachhead strategy over market coverage.",
    },
    {
      afterSection: "technical",
      text: "We decoupled clinical reporting from billing because the HIBC spec was the root constraint — not the form content itself.",
    },
    {
      afterSection: "execution",
      text: "We pursued POC-first over full rollout because executive funding required evidence, and the APIM facade needed to prove reusability before scaling.",
    },
    {
      afterSection: "results",
      text: "We invested in ecosystem socialization (50 vendors, InnoFest pitch) instead of building in isolation — adoption risk is as critical as technical validation.",
    },
  ],
  questions: [
    {
      question: "Is this actually a software problem?",
      answer:
        "Partially. The root constraint was infrastructural (billing spec coupling), but the solution required software (API channel) embedded in existing clinical workflow.",
    },
    {
      question: "Should this be solved with process, configuration, software, or AI?",
      answer:
        "Software — specifically API integration at point of care. Process changes (fax elimination) follow from the technical channel, not the reverse.",
    },
    {
      question: "What evidence changed our direction?",
      answer:
        "15 physician interviews confirming GPs won't leave EMR; cross-group synthesis showing structural (not behavioral) data quality failure; InnoFest feedback shaping executive narrative.",
    },
    {
      question: "What tradeoffs did we accept?",
      answer:
        "JSON over FHIR for speed; OSCAR beachhead over immediate commercial deals; POC scope over full rollout; dual clinical/billing paths over single HIBC channel.",
    },
    {
      question: "What would happen if we built nothing?",
      answer:
        "52K faxes/year, 28M keystrokes, ~$250K annual processing cost, and form content frozen since 2015 — with clinical practice continuing to diverge from what the system captures.",
    },
    {
      question: "Which user segment actually mattered most?",
      answer:
        "Physicians at point of care — if they won't adopt, no downstream improvement matters. Claims staff and medical advisors were secondary validation of data quality impact.",
    },
  ],
  reflection: [
    {
      prompt: "What would I change?",
      answer:
        "Parallelize vendor ecosystem outreach with discovery instead of sequencing after technical validation.",
    },
    {
      prompt: "What would I validate earlier?",
      answer:
        "Executive funding triggers and Innovation Council decision criteria — understanding the funding path earlier would have shaped the InnoFest narrative sooner.",
    },
    {
      prompt: "What assumptions were incorrect?",
      answer:
        "Initially assumed a web form modernization would suffice. Physician interviews disproved this within the first discovery cycle.",
    },
    {
      prompt: "What would I intentionally NOT build?",
      answer:
        "A WorkSafeBC-hosted portal for physician submission — discovery proved it would fail adoption regardless of UX quality.",
    },
    {
      prompt: "How would AI change my approach today?",
      answer:
        "AI could accelerate form content iteration and clinical data extraction from legacy faxes — but wouldn't replace the API channel needed for point-of-care workflow.",
    },
    {
      prompt: "How would I measure success differently?",
      answer:
        "Add vendor pipeline velocity metrics (time from outreach to integration commitment) alongside technical POC completion.",
    },
    {
      prompt: "What would I prototype before implementation?",
      answer:
        "Physician eForm interaction prototype inside OSCAR earlier — even a clickable mock would have strengthened the executive pitch before funding.",
    },
  ],
  headOfProductView: {
    problem:
      "200K+ clinical reports/year locked in a 2001 billing spec — physicians couldn't document care, claims staff decided on guesses.",
    judgment:
      "Diagnosed structural constraint, not behavioral failure. Chose invisible EMR integration over portals that discovery proved would fail.",
    hardestTradeoff:
      "JSON over FHIR for POC speed — accepting non-standard format to prove the model before investing in standards compliance.",
    technicalChallenge:
      "Decoupling clinical data from HIBC/Teleplan billing while building reusable APIM infrastructure for 50+ future EMR partners.",
    healthcareComplexity:
      "Multi-stakeholder coordination (physicians, medical advisors, claims, HIBC, EMR vendors) with regulatory clinical documentation requirements.",
    businessOutcome:
      "$80K Innovation Council funding; POC validated March 2025; roadmap for ~70% provider ecosystem coverage.",
    productLesson:
      "When adoption depends on invisible workflow embedding, optimize for the user's existing tool — not your platform.",
  },
};
