import type { CaseStudy } from "@/content/case-studies/types";
import "./print.css";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { CaseStudyGallery } from "./CaseStudyGallery";
import { CaseStudyHero } from "./CaseStudyHero";
import { DecisionMatrix } from "./DecisionMatrix";
import { DiscoveryTimeline } from "./DiscoveryTimeline";
import { ExecutionBoard } from "./ExecutionBoard";
import { HeadOfProductView } from "./HeadOfProductView";
import { HumanAiBoundaryMap } from "./HumanAiBoundaryMap";
import { LessonsCards } from "./LessonsCards";
import { PMJudgmentCallout } from "./PMJudgmentCallout";
import { ProblemCards } from "./ProblemCards";
import { ProductThinkingChain } from "./ProductThinkingChain";
import { QuestionsAnswered } from "./QuestionsAnswered";
import { ReflectionSection } from "./ReflectionSection";
import { ResultsMetrics } from "./ResultsMetrics";
import { SectionBlock } from "./SectionChrome";
import { SECTION } from "./styles";
import { WorkflowDiagram } from "./WorkflowDiagram";

function JudgmentForSection(
  callouts: CaseStudy["judgmentCallouts"],
  sectionId: string,
) {
  return callouts
    .filter((c) => c.afterSection === sectionId)
    .map((c) => <PMJudgmentCallout key={c.text} text={c.text} />);
}

export function CaseStudyDocument({ study }: { study: CaseStudy }) {
  return (
    <article className="case-study-document mx-auto max-w-frame px-page-x py-10 print:max-w-none print:px-8 print:py-6">
      <CaseStudyHero title={study.title} oneLiner={study.oneLiner} meta={study.meta} />

      <div className={SECTION}>
        <SectionBlock id="problem" label="Problem" heading="What was happening — and why it mattered">
          <ProblemCards items={study.problem} />
          {JudgmentForSection(study.judgmentCallouts, "problem")}
        </SectionBlock>
      </div>

      <div className={SECTION}>
        <SectionBlock id="discovery" label="Discovery" heading="How I approached discovery">
          <DiscoveryTimeline items={study.discovery} />
          {JudgmentForSection(study.judgmentCallouts, "discovery")}
        </SectionBlock>
      </div>

      <div className={SECTION}>
        <SectionBlock id="workflow" label="Current workflow" heading="Before — and where it broke">
          <WorkflowDiagram title={study.workflow.title} steps={study.workflow.steps} />
          {JudgmentForSection(study.judgmentCallouts, "workflow")}
        </SectionBlock>
      </div>

      <div className={SECTION}>
        <SectionBlock id="product-thinking" label="Product thinking" heading="Observation → insight → decision">
          <ProductThinkingChain items={study.productThinking} />
          {JudgmentForSection(study.judgmentCallouts, "product-thinking")}
        </SectionBlock>
      </div>

      <div className={SECTION}>
        <SectionBlock id="key-decisions" label="Key product decisions" heading="Decision matrix">
          <DecisionMatrix items={study.keyDecisions} />
          {JudgmentForSection(study.judgmentCallouts, "key-decisions")}
        </SectionBlock>
      </div>

      <div className={SECTION}>
        <SectionBlock
          id="technical"
          label="Technical collaboration"
          heading="Architecture at product level"
        >
          <ArchitectureDiagram
            title={study.architecture.title}
            nodes={study.architecture.nodes}
            responsibilities={study.architecture.responsibilities}
            tradeoffs={study.architecture.tradeoffs}
          />
          {study.humanAiBoundary && <HumanAiBoundaryMap boundary={study.humanAiBoundary} />}
          {JudgmentForSection(study.judgmentCallouts, "technical")}
        </SectionBlock>
      </div>

      <div className={SECTION}>
        <SectionBlock id="execution" label="Execution" heading="How we shipped">
          <ExecutionBoard {...study.execution} />
          {JudgmentForSection(study.judgmentCallouts, "execution")}
        </SectionBlock>
      </div>

      <div className={SECTION}>
        <SectionBlock id="results" label="Results" heading="Outcomes">
          <ResultsMetrics items={study.results} />
          {study.images && study.images.length > 0 && (
            <CaseStudyGallery images={study.images} />
          )}
          {JudgmentForSection(study.judgmentCallouts, "results")}
        </SectionBlock>
      </div>

      <div className={SECTION}>
        <SectionBlock id="lessons" label="Lessons learned" heading="What changed how I think">
          <LessonsCards items={study.lessons} />
          {JudgmentForSection(study.judgmentCallouts, "lessons")}
        </SectionBlock>
      </div>

      <div className={SECTION}>
        <SectionBlock id="why-matters" label="Why this matters" heading="Relevance to healthcare product leadership">
          <p className="mt-4 max-w-editorial text-[14px] leading-[1.72] text-stone-600">
            {study.whyThisMatters}
          </p>
        </SectionBlock>
      </div>

      <div className={SECTION}>
        <SectionBlock
          id="questions"
          label="Questions this project forced me to answer"
          heading="Head of Product questions — and how I answered them"
        >
          <QuestionsAnswered items={study.questions} />
          {JudgmentForSection(study.judgmentCallouts, "questions")}
        </SectionBlock>
      </div>

      <div className={SECTION}>
        <SectionBlock
          id="reflection"
          label="If I did this project again"
          heading="Knowing what I know today"
        >
          <ReflectionSection items={study.reflection} />
          {JudgmentForSection(study.judgmentCallouts, "reflection")}
        </SectionBlock>
      </div>

      <div className={SECTION}>
        <HeadOfProductView view={study.headOfProductView} />
      </div>
    </article>
  );
}
