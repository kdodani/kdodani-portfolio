export type CaseStudySlug =
  | "oscar-emr-api-integration"
  | "referral-radar"
  | "treatment-extension-requests"
  | "provider-invoice-submission";

export type MetaItem = {
  label: string;
  value: string;
};

export type ProblemCard = {
  title: string;
  body: string;
};

export type DiscoveryItem = {
  method: string;
  detail: string;
  insight: string;
};

export type WorkflowStep = {
  label: string;
  bottleneck?: string;
};

export type ProductThinkingItem = {
  observation: string;
  insight: string;
  decision: string;
  tradeoff: string;
  expectedOutcome: string;
};

export type KeyDecision = {
  decision: string;
  alternative: string;
  why: string;
  tradeoff: string;
  outcome: string;
  category?: string;
};

export type ArchitectureNode = {
  label: string;
  detail: string;
};

export type ResponsibilityItem = {
  role: "product" | "engineering" | "shared";
  items: string[];
};

export type ExecutionItem = {
  label: string;
  items: string[];
};

export type ResultMetric = {
  stat: string;
  unit: string;
  category: "user" | "business" | "operational";
  detail?: string;
};

export type Lesson = {
  title: string;
  body: string;
};

export type QuestionAnswer = {
  question: string;
  answer: string;
};

export type ReflectionItem = {
  prompt: string;
  answer: string;
};

export type PMJudgmentCallout = {
  text: string;
  afterSection: string;
};

export type HumanAiBoundary = {
  human: string[];
  ai: string[];
  boundaries: string[];
};

export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseStudy = {
  slug: CaseStudySlug;
  title: string;
  oneLiner: string;
  meta: MetaItem[];
  problem: ProblemCard[];
  discovery: DiscoveryItem[];
  workflow: {
    title: string;
    steps: WorkflowStep[];
  };
  productThinking: ProductThinkingItem[];
  keyDecisions: KeyDecision[];
  architecture: {
    title: string;
    nodes: ArchitectureNode[];
    responsibilities: ResponsibilityItem[];
    tradeoffs: string[];
  };
  execution: {
    timeline: ExecutionItem;
    prioritization: ExecutionItem;
    mvp: ExecutionItem;
    risks: ExecutionItem;
    tradeoffs: ExecutionItem;
    partners: ExecutionItem;
  };
  results: ResultMetric[];
  lessons: Lesson[];
  whyThisMatters: string;
  judgmentCallouts: PMJudgmentCallout[];
  questions: QuestionAnswer[];
  reflection: ReflectionItem[];
  headOfProductView: {
    problem: string;
    judgment: string;
    hardestTradeoff: string;
    technicalChallenge: string;
    healthcareComplexity: string;
    businessOutcome: string;
    productLesson: string;
  };
  humanAiBoundary?: HumanAiBoundary;
  images?: CaseStudyImage[];
};
