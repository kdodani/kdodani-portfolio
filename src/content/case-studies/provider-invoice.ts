import type { CaseStudy } from "./types";

export const providerInvoiceCaseStudy: CaseStudy = {
  slug: "provider-invoice-submission",
  title: "Provider Invoice Submission",
  oneLiner:
    "Unlocking 280K blocked paper line items by rebuilding the submission experience for high-volume providers — without disrupting the existing user base.",
  meta: [
    { label: "Role", value: "Product Manager, Healthcare Operations" },
    { label: "Timeline", value: "Aug 2025 – Mar 2026" },
    {
      label: "Team",
      value:
        "Cross-functional: engineering (PIS.API), design, Healthcare Operations, program managers, executive sponsors. TODO: named roster",
    },
    {
      label: "Users",
      value:
        "3,795 healthcare providers; target segment: 25 high-volume orgs (200–1,900 lines/month)",
    },
    { label: "Stage", value: "V2 delivered · dark launch → soft launch → hard launch (Mar 2026)" },
    {
      label: "Impact",
      value:
        "$580K funding secured; paper channels 56% → 19%; MPS portal share 39% → 55%; ~$50K ELAN savings",
    },
  ],
  problem: [
    {
      title: "What was happening",
      body:
        "The MPS invoice portal had PMF for small-volume providers (322K digital lines/year, 8.7% digital share) — but 40% of total invoice volume from high-throughput providers was architecturally blocked. Product limits: 1 claim per submission, 1 invoice reference, 11 screens, ~32 line items max.",
    },
    {
      title: "Who was affected",
      body:
        "Worker travel (taxi) providers billing dozens of claims simultaneously; hearing aid providers with thousands of lines/month; high-volume physio and imaging clinics. Existing low-volume users were unaffected but growth had structurally stalled.",
    },
    {
      title: "Why it mattered",
      body:
        "25 high-volume providers (of 3,795 total) generated 50% of all remaining paper invoices. Without segment-specific product and GTM strategy, WorkSafeBC could not move mail/fax volume to digital — blocking operational savings and provider experience improvements.",
    },
  ],
  discovery: [
    {
      method: "Analytics",
      detail: "3.7M total line items across all channels",
      insight:
        "8.7% digital share was healthy for the segment served — but the product had structurally run out of room to grow without architectural changes.",
    },
    {
      method: "Research",
      detail: "Pareto analysis · provider segmentation",
      insight:
        "25 high-volume providers = 50% of all paper invoices. Targeted adoption on this cohort maximizes ROI vs. broad communications to 3,795 providers.",
    },
    {
      method: "User interviews",
      detail: "High-volume provider workflow mapping",
      insight:
        "Providers weren't avoiding the product because it was hard to learn — they couldn't use it at all. A taxi company with 1,900 lines/month hit a wall immediately.",
    },
    {
      method: "Workflow observations",
      detail: "V1 submission flow analysis",
      insight:
        "11 screens × 50 invoices = untenable workflow. Multi-claim and multi-invoice per session were structural requirements, not UX polish.",
    },
    {
      method: "Stakeholder interviews",
      detail: "Healthcare Operations, program managers, Blueprint vendors",
      insight:
        "A single portal couldn't serve every segment — hearing aid providers need Blueprint bulk upload; physicians need EMR integration at point of care.",
    },
  ],
  workflow: {
    title: "V1 workflow — structural ceiling blocked high-volume providers",
    steps: [
      { label: "Provider" },
      { label: "Portal login" },
      { label: "1 claim only", bottleneck: "Multi-claim blocked" },
      { label: "11 screens", bottleneck: "× 50 invoices = impossible" },
      { label: "~32 line cap", bottleneck: "Thousands of lines/month" },
      { label: "Paper/fax", bottleneck: "Fallback channel" },
    ],
  },
  productThinking: [
    {
      observation:
        "322K digital lines/year proved PMF for low-volume providers, but 40% of volume remained on paper.",
      insight:
        "This wasn't a UX problem — it was a capacity ceiling. The product was architected for physio clinics billing 3 claims/week.",
      decision:
        "Rebuild submission experience for high-volume segment: multi-claim, multi-invoice, 5 screens, no line ceiling.",
      tradeoff:
        "Segment-specific build vs. incremental improvements for existing users who were already active.",
      expectedOutcome:
        "Unlock 280K blocked paper line items; targeted GTM on 25 high-volume orgs representing 50% of paper volume.",
    },
    {
      observation:
        "25 providers generated 50% of paper invoices — Pareto distribution.",
      insight:
        "Broad rollout risks disrupting existing users; named-cohort launch to highest-value converters maximizes ROI.",
      decision:
        "Dark launch to 10 named providers (Jan 1–14, 2026); V1 preserved throughout.",
      tradeoff:
        "Slower broad activation vs. zero disruption to 322K-line existing user base.",
      expectedOutcome:
        "Validate v2 with high-volume cohort before soft/hard launch; PostHog instrumentation from day one.",
    },
    {
      observation:
        "Hearing aid providers run invoices through Blueprint — leaving EMR for portal solved little.",
      insight:
        "Different segments need different channels: portal redesign, vendor integration (Blueprint), or direct EMR (OSCAR).",
      decision:
        "Shift from single-product optimization to platform strategy with three distribution paths.",
      tradeoff:
        "Broader roadmap scope vs. honest acknowledgment that one portal can't unlock all paper volume.",
      expectedOutcome:
        "$580K funding for portal + interoperability roadmap + Blueprint bottom-up demand + OSCAR API validation.",
    },
    {
      observation:
        "First month post-launch saw almost no adoption despite better features (11 → 5 screens, multi-claim).",
      insight:
        "Shipping better features isn't enough — discoverability, onboarding, and post-launch behavior observation matter.",
      decision:
        "Segment-specific GTM messaging; observe real user behavior; fix duplicate-line icon discoverability.",
      tradeoff:
        "Additional change management investment vs. assuming feature quality drives adoption.",
      expectedOutcome:
        "Learning that launch is the beginning, not the finish line — informed hard launch strategy.",
    },
    {
      observation:
        "AI-assisted prototype validated 11→5 screen consolidation; legacy Kendo Grid couldn't support design cleanly.",
      insight:
        "Prototypes validate desirability, not feasibility — technical discovery must run alongside UX exploration.",
      decision:
        "Adapt design to Kendo Grid constraints while preserving core workflow reduction.",
      tradeoff:
        "Compromised ideal UX vs. shippable solution within legacy stack limitations.",
      expectedOutcome:
        "Delivered within Aug 2025 – Mar 2026 timeline despite legacy technology constraints.",
    },
  ],
  keyDecisions: [
    {
      decision: "Segment-specific rebuild over incremental UX polish",
      alternative: "Improve existing portal for all users equally",
      why: "40% of volume was architecturally blocked — incremental polish wouldn't unlock high-volume providers.",
      tradeoff: "Two product experiences (V1 + V2) during transition period",
      outcome: "V2 purpose-built for 200–1,900 lines/month; V1 preserved for existing users",
      category: "Configuration vs Product",
    },
    {
      decision: "Targeted adoption on 25 high-volume providers (50% of paper)",
      alternative: "Broad communications to all 3,795 providers",
      why: "Pareto analysis showed 25 orgs represent half of remaining paper — focused GTM maximizes ROI.",
      tradeoff: "Narrower initial activation vs. efficient use of change management resources",
      outcome: "Dark launch cohort: worker travel, hearing aid, physio & imaging",
      category: "Process vs Software",
    },
    {
      decision: "Named-cohort dark launch; V1 live throughout",
      alternative: "Big-bang migration for all users",
      why: "Existing 322K digital lines/year user base must not be disrupted during validation.",
      tradeoff: "Dual maintenance of V1 and V2 during transition",
      outcome: "Zero disruption to existing users; validated v2 before hard launch Mar 12–25, 2026",
      category: "Speed vs Safety",
    },
    {
      decision: "Platform strategy (portal + Blueprint + EMR) over single portal",
      alternative: "Build all features into one portal",
      why: "Hearing aid providers need Blueprint bulk upload; physicians need EMR integration — one product can't serve every workflow.",
      tradeoff: "Broader roadmap and ecosystem engagement vs. simpler single-product narrative",
      outcome: "$580K funding; interoperability roadmap; OSCAR API validated; Blueprint bottom-up demand",
      category: "Technical debt vs Scalability",
    },
    {
      decision: "PostHog instrumentation spec before launch",
      alternative: "Add analytics after launch based on assumptions",
      why: "Need to know within days of soft launch whether new segment is activating and existing users disrupted.",
      tradeoff: "Upfront instrumentation effort vs. flying blind post-launch",
      outcome: "v1 vs v2 comparisons from day one: line items, multi-claim usage, large-volume activation",
      category: "User experience vs Compliance",
    },
  ],
  architecture: {
    title: "Product-level architecture — segment expansion on legacy PIS platform",
    nodes: [
      {
        label: "Provider Portal (MPS V2)",
        detail: "Multi-claim + multi-invoice · 5 screens · real-time validation · line duplication · bulk delete",
      },
      {
        label: "PIS.API",
        detail: "Backend invoice submission · batch support · validation rules · legacy Kendo Grid frontend",
      },
      {
        label: "PostHog Analytics",
        detail: "v1 vs v2 events · funnel tracking · large-volume provider activation metrics",
      },
      {
        label: "Platform channels (roadmap)",
        detail: "CSV batch upload · Blueprint EMR integration · Direct OSCAR EMR API",
      },
    ],
    responsibilities: [
      {
        role: "product",
        items: [
          "Segment identification and Pareto-informed GTM strategy",
          "$580K business case and executive funding",
          "PostHog analytics spec before launch",
          "Platform strategy across three provider segments",
          "Named-cohort launch planning and change management",
        ],
      },
      {
        role: "engineering",
        items: [
          "PIS.API multi-claim and multi-invoice support",
          "V2 portal rebuild (11 → 5 screens)",
          "Real-time error validation and bulk delete",
          "Performance optimization for large sessions",
          "Legacy Kendo Grid adaptation",
        ],
      },
      {
        role: "shared",
        items: [
          "Dark launch cohort selection with Healthcare Operations",
          "Blueprint bottom-up demand mobilization",
          "V1/V2 parallel operation during transition",
          "Retry queue implementation (learned from WOR project)",
        ],
      },
    ],
    tradeoffs: [
      "Legacy Kendo Grid constrained ideal single-screen design — adapted within feasibility",
      "Capacity scaling without equal performance attention caused slowdowns at large session sizes",
      "V1/V2 dual maintenance during transition — necessary to protect existing user base",
      "Platform roadmap (Blueprint, EMR) deferred full paper elimination beyond portal segment",
    ],
  },
  execution: {
    timeline: {
      label: "Timeline",
      items: [
        "Aug 2025: Project kickoff · business cases · $580K funding secured",
        "Aug 2025 – Mar 16, 2026: V2 development and delivery",
        "Jan 1–14, 2026: Dark launch — 10 named high-volume providers",
        "Jan 14+: Soft launch — V2 default, V1 via banner",
        "Mar 12–25, 2026: Hard launch with batch upload live",
      ],
    },
    prioritization: {
      label: "Prioritization",
      items: [
        "Structural barriers first: multi-claim, multi-invoice, screen reduction",
        "PostHog instrumentation before Slice 1 launch",
        "Targeted GTM on 25 orgs (50% paper) over broad rollout",
        "Platform channels (CSV, Blueprint, EMR) on roadmap after portal V2",
      ],
    },
    mvp: {
      label: "MVP (V2 delivered)",
      items: [
        "Multi-claim + multi-invoice per submission",
        "11 screens → 5 screens",
        "Real-time error validation",
        "Line duplication and bulk delete",
        "Targeted adoption strategy with PostHog measurement",
      ],
    },
    risks: {
      label: "Risks",
      items: [
        "Near-zero adoption in first month despite better features",
        "Performance degradation at large session sizes",
        "Legacy Kendo Grid feasibility constraints",
        "Segment-specific messaging neglected (hearing aid still leaving EMR)",
        "TODO: hard launch batch upload risks",
      ],
    },
    tradeoffs: {
      label: "Tradeoffs accepted",
      items: [
        "V1/V2 dual operation during transition",
        "Segment-specific build over universal improvements",
        "Design compromises for legacy stack",
        "Phased GTM over big-bang migration",
      ],
    },
    partners: {
      label: "Cross-functional partners",
      items: [
        "Healthcare Operations (provider relationships)",
        "Program managers (Blueprint bottom-up demand)",
        "Executive sponsors ($580K approval)",
        "Engineering (PIS.API, Carebears/Pioneers pods)",
        "Direct Connect team (OSCAR EMR API validation)",
      ],
    },
  },
  results: [
    {
      stat: "56% → 19%",
      unit: "paper channels (mail + fax)",
      category: "operational",
      detail: "Combined paper share of all invoice line items — from majority to under a fifth (2023–2026)",
    },
    {
      stat: "39% → 55%",
      unit: "MPS portal share",
      category: "user",
      detail: "Core online portal share grew as new high-volume segments activated on V2",
    },
    {
      stat: "$580K",
      unit: "funding secured",
      category: "business",
      detail: "Business cases approved by executive sponsor before development began",
    },
    {
      stat: "~$50K",
      unit: "ELAN savings to date",
      category: "business",
      detail: "Early savings from paper volume reduction as first cohorts moved to MPS v2",
    },
    {
      stat: "11 → 5",
      unit: "screens per invoice",
      category: "user",
      detail: "Workflow reduction enabling viable high-volume submission sessions",
    },
    {
      stat: "44K",
      unit: "target digital lines/month",
      category: "operational",
      detail: "Hard launch target — up from 26K/month baseline. TODO: post-launch actuals",
    },
  ],
  lessons: [
    {
      title: "What surprised me",
      body:
        "First month after launch saw almost no adoption despite 11→5 screens and multi-claim. Users didn't recognize the duplicate-line icon and manually re-entered data — great features only create value if users discover them.",
    },
    {
      title: "What I would do differently",
      body:
        "Segment GTM messaging from day one — hearing aid providers needed Blueprint integration narrative, not portal features. We segmented the roadmap but not the launch communications.",
    },
    {
      title: "How this changed how I think as a PM",
      body:
        "One product can't serve every provider workflow. Pareto-informed targeting + platform thinking (portal, vendor, EMR) beats universal feature optimization — especially when 25 orgs represent 50% of the remaining problem.",
    },
  ],
  whyThisMatters:
    "Provider invoice submission sits at the intersection of B2B platform strategy, segment expansion, and healthcare operations. It required diagnosing a structural capacity ceiling (not a UX problem), securing executive funding with data-driven business cases, and building a measurement framework before launch — the same product leadership needed for healthcare workflow products where adoption, not functionality, is often the primary constraint.",
  judgmentCallouts: [
    {
      afterSection: "discovery",
      text: "We intentionally optimized for 25 high-volume providers instead of all 3,795 after Pareto analysis showed they generated 50% of remaining paper invoices.",
    },
    {
      afterSection: "workflow",
      text: "We diagnosed a capacity ceiling, not a UX problem — providers weren't avoiding the product because it was hard to learn; they couldn't use it at all.",
    },
    {
      afterSection: "product-thinking",
      text: "We chose a named-cohort dark launch over big-bang migration because the 322K-line existing user base must not be disrupted during validation.",
    },
    {
      afterSection: "key-decisions",
      text: "We shifted to platform strategy (portal + Blueprint + EMR) because one product couldn't unlock all paper volume — honest segmentation beats universal feature claims.",
    },
    {
      afterSection: "technical",
      text: "We wrote the PostHog spec before launch because we needed to know within days whether the new segment was activating — not months after guessing.",
    },
    {
      afterSection: "execution",
      text: "We invested in segment-specific change management after launch when adoption stayed near zero — shipping features wasn't enough without discoverability and onboarding.",
    },
    {
      afterSection: "results",
      text: "We measured channel shift (paper 56%→19%) not just feature usage — the business goal was moving providers off mail and fax, not shipping V2.",
    },
  ],
  questions: [
    {
      question: "Is this actually a software problem?",
      answer:
        "Yes — structural product limits (1 claim, 11 screens, 32-line cap) architecturally blocked an entire segment. But adoption also required GTM and change management, not just better software.",
    },
    {
      question: "Which user segment actually mattered most?",
      answer:
        "25 high-volume providers generating 50% of paper invoices — worker travel, hearing aid, high-volume physio/imaging. Optimizing for the average provider wouldn't unlock growth.",
    },
    {
      question: "What evidence changed our direction?",
      answer:
        "Pareto analysis (25 orgs = 50% paper); near-zero post-launch adoption despite better features; segment interviews showing Blueprint/hearing aid needed different channel than portal.",
    },
    {
      question: "What tradeoffs did we accept?",
      answer:
        "V1/V2 dual operation; segment-specific build over universal polish; design compromises for legacy Kendo Grid; phased GTM over big-bang.",
    },
    {
      question: "What would happen if we built nothing?",
      answer:
        "40% of invoice volume remains on paper; 280K line items blocked; operational costs from mail/fax processing continue; digital share stalls at 8.7%.",
    },
    {
      question: "Should this be solved with process, configuration, software, or AI?",
      answer:
        "Software for portal rebuild (structural limits); platform strategy for segments beyond portal reach; process/GTM for adoption; AI assisted prototyping but legacy stack determined implementation.",
    },
  ],
  reflection: [
    {
      prompt: "What would I change?",
      answer:
        "Segment launch messaging alongside segment product development — different provider groups need different value propositions from day one.",
    },
    {
      prompt: "What would I validate earlier?",
      answer:
        "Legacy Kendo Grid constraints alongside UX prototyping — technical feasibility discovery should run parallel to desirability validation.",
    },
    {
      prompt: "What assumptions were incorrect?",
      answer:
        "Assumed shipping better features (11→5 screens, multi-claim) would drive adoption. Discoverability and onboarding were the actual constraints post-launch.",
    },
    {
      prompt: "What would I intentionally NOT build?",
      answer:
        "Universal portal trying to serve hearing aid (Blueprint), high-volume (portal V2), and physicians (EMR) with one experience — platform honesty beats feature accumulation.",
    },
    {
      prompt: "How would AI change my approach today?",
      answer:
        "AI-assisted prototyping compressed concept validation, but wouldn't replace PostHog instrumentation or segment-specific GTM — adoption constraints remain human.",
    },
    {
      prompt: "How would I measure success differently?",
      answer:
        "Add performance metrics alongside capacity — large sessions became slower post-launch; scalability and responsiveness should be one problem.",
    },
    {
      prompt: "What would I prototype before implementation?",
      answer:
        "Post-launch onboarding flow with real providers — paper prototype of duplicate-line feature discoverability before assuming icon-based UX would work.",
    },
  ],
  images: [
    {
      src: "/images/pis/outcomes-chart.png",
      alt: "Provider invoicing channel shift 2023-2026",
      caption: "Paper channels dropped from 56% to 19%; MPS portal grew from 39% to 55%",
    },
    {
      src: "/images/pis/posthog/export-pis-submit-avg-line-items-v1-vs-v2-2026-06-19-210605.png",
      alt: "Average line items per submission v1 vs v2",
      caption: "Avg line items per submission — v1 vs v2 (PostHog)",
    },
    {
      src: "/images/pis/posthog/export-pis-did-our-changes-encourage-larger-volume-providers-to-use-pis-part-2-2026-06-19-210742.png",
      alt: "Large volume provider activation in v2",
      caption: "Did v2 activate larger-volume providers? (PostHog)",
    },
    {
      src: "/images/pis/posthog/export-pis-submit-monthly-v1-vs-v2-2026-06-19-210844.png",
      alt: "Monthly submission trend v1 vs v2",
      caption: "Monthly submission trend — v1 vs v2 (PostHog)",
    },
  ],
  headOfProductView: {
    problem:
      "40% of invoice volume architecturally blocked — 25 high-volume providers generating 50% of paper invoices on a product built for 3 claims/week.",
    judgment:
      "Diagnosed capacity ceiling, not UX problem. Pareto-informed targeting + platform strategy over universal portal optimization.",
    hardestTradeoff:
      "V1/V2 dual operation during phased launch — protecting 322K-line existing user base while validating segment rebuild.",
    technicalChallenge:
      "Legacy Kendo Grid constraints on ideal UX; performance degradation at scale; multi-claim architecture on existing PIS.API.",
    healthcareComplexity:
      "3,795 providers across worker travel, hearing aid, physio, imaging — each with different billing workflows and distribution channels.",
    businessOutcome:
      "Paper 56%→19%; MPS portal 39%→55%; $580K funded; ~$50K ELAN savings; platform roadmap with OSCAR API and Blueprint demand.",
    productLesson:
      "Launch is the beginning of learning — great features only create value if users can discover, understand, and confidently use them.",
  },
};
