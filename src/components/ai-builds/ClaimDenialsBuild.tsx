"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { BuildEntry } from "@/content/builds";
import {
  decisionCard,
  denialCard,
  denialFlowNodes,
  denialInsights,
  denialSteps,
  denialTechStack,
  denialTriggers,
  edgeCases,
  humanTimeNote,
} from "@/content/claim-denials";
import {
  AccessMap,
  AppealMock,
  CompareRows,
  DecisionColumns,
  DifferentChips,
  EdgeCases,
  FolderMap,
  KeyValueCard,
  MondayRoutine,
  ProblemTiles,
  RcmCycleMap,
  RuleChips,
  RuleLoop,
  SnapshotTiles,
  TriadCards,
  VisitExample,
} from "./DenialVisuals";
import { WorkflowDiagram } from "./WorkflowDiagram";
import {
  BuildEyebrow,
  BulletList,
  CARD,
  CARD_PAD,
  SECTION,
  SectionHeading,
  SectionIntro,
  SectionLabel,
  StatusPill,
  useFadeUp,
} from "./ui";

/** Compact sub-heading used inside "3 · End to end". */
function SubBlock({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  const fadeUp = useFadeUp();
  return (
    <div className="mt-14">
      <motion.div {...fadeUp(0)}>
        <SectionLabel>{label}</SectionLabel>
        <h4 className="font-display mt-2 text-[1.2rem] font-medium tracking-[-0.02em] text-stone-900 sm:text-[1.35rem]">
          {title}
        </h4>
        {intro ? <SectionIntro>{intro}</SectionIntro> : null}
      </motion.div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

/** Visual shown inside a step card, keyed by step number. */
function stepVisual(n: number): ReactNode {
  switch (n) {
    case 1:
      return (
        <div className="space-y-5">
          <SnapshotTiles />
          <RuleChips />
        </div>
      );
    case 2:
      return <KeyValueCard title={denialCard.title} rows={denialCard.rows} />;
    case 3:
      return <KeyValueCard title={decisionCard.title} rows={decisionCard.rows} />;
    case 4:
      return <RuleLoop />;
    case 5:
      return <AppealMock />;
    case 6:
      return <MondayRoutine />;
    case 7:
      return <EdgeCases items={edgeCases} />;
    default:
      return null;
  }
}

export function ClaimDenialsBuild({
  build,
  number,
  total,
}: {
  build: BuildEntry;
  number: string;
  total: number;
}) {
  const fadeUp = useFadeUp();

  return (
    <section id={build.id} className={`scroll-mt-4 ${SECTION} border-t border-stone-200/80 pt-14 sm:pt-16`}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <motion.div {...fadeUp(0)}>
        <BuildEyebrow number={number} total={total} />
        <h2 className="font-display mt-2 text-[clamp(1.6rem,2vw+1rem,2.2rem)] font-medium tracking-[-0.03em] text-stone-900">
          {build.title}
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusPill>{build.status}</StatusPill>
          <span className="chip">Not productionized</span>
          <span className="chip">Synthetic data</span>
        </div>
        <p className="mt-4 text-[15px] font-medium leading-snug text-accent/90 sm:text-base">{build.tagline}</p>
        <p className="mt-3 max-w-[min(100%,42rem)] text-[14px] leading-[1.72] text-stone-600 sm:text-[15px]">
          {build.context}
        </p>
      </motion.div>

      {/* ── 1. Problem ─────────────────────────────────────────────────── */}
      <div className={SECTION}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>1 · The problem</SectionLabel>
          <SectionHeading>Denied claims are recovery work, on a clock</SectionHeading>
        </motion.div>
        <div className="mt-6 space-y-5">
          <ProblemTiles />
          <VisitExample />
        </div>
        <div className="mt-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
            Where each agent sits in the revenue cycle
          </p>
          <RcmCycleMap />
        </div>
      </div>

      {/* ── 2. Why an agent ────────────────────────────────────────────── */}
      <div className={SECTION}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>2 · Why build an agent for this</SectionLabel>
          <SectionHeading>Repeatable work with a clear answer, except where it is not</SectionHeading>
          <SectionIntro>
            Three questions decide whether a task fits an agent. Eligibility passed them cleanly.
            Denials passes most of them, which is why the human steps are designed in on purpose.
          </SectionIntro>
        </motion.div>
        <div className="mt-6">
          <CompareRows />
        </div>
        <div className="mt-6">
          <DifferentChips />
        </div>
        <motion.p
          {...fadeUp(0.1)}
          className="mt-5 rounded-xl border border-[rgba(109,94,245,0.22)] bg-[rgba(109,94,245,0.03)] px-5 py-4 text-[13px] leading-[1.7] text-stone-600"
        >
          <span className="font-semibold text-stone-800">Where human time goes. </span>
          {humanTimeNote}
        </motion.p>
      </div>

      {/* ── 3. End to end ──────────────────────────────────────────────── */}
      <div className={SECTION}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>3 · What the agent does, end to end</SectionLabel>
          <SectionHeading>From a denial to a drafted appeal a person sends</SectionHeading>
          <SectionIntro>
            The agent learns from past claims, reads each new denial, routes it with rules the billing
            lead owns, and drafts the appeal. Sending is always a person.
          </SectionIntro>
        </motion.div>

        <div className="mt-6">
          <TriadCards />
        </div>

        <div className="mt-10">
          <WorkflowDiagram nodes={denialFlowNodes} />
        </div>

        {/* Steps */}
        <div className="mt-10 space-y-6">
          {denialSteps.map((s) => (
            <motion.article key={s.n} {...fadeUp(0.04)} className={`${CARD} overflow-hidden`}>
              <div className={CARD_PAD}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6D5EF5]/80">
                  Step {String(s.n).padStart(2, "0")}
                </p>
                <h4 className="font-display mt-1.5 text-[1.15rem] font-medium tracking-[-0.02em] text-stone-900">
                  {s.title}
                </h4>
                <p className="mt-2 max-w-[min(100%,46rem)] text-[13px] leading-[1.65] text-stone-600">{s.outcome}</p>

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  Prompts used
                </p>
                <div
                  className={`mt-2.5 grid grid-cols-1 gap-3 ${s.prompts.length > 1 ? "md:grid-cols-2" : ""}`}
                >
                  {s.prompts.map((p) => (
                    <figure key={p.label} className="min-w-0 rounded-lg border-l-2 border-[#6D5EF5]/40 bg-stone-50 px-3.5 py-3">
                      <figcaption className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6D5EF5]/80">
                        {p.label}
                      </figcaption>
                      <blockquote className="mt-1 break-words text-[12.5px] leading-[1.6] text-stone-600">
                        “{p.text}”
                      </blockquote>
                    </figure>
                  ))}
                </div>

                <ul className="mt-4 flex flex-wrap items-center gap-1.5">
                  <li className="mr-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">Produces</li>
                  {s.outputs.map((o) => (
                    <li key={o} className="rounded-md bg-stone-100 px-2 py-1 font-mono text-[11px] text-stone-600">
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-stone-100 bg-stone-50/60 px-5 py-5 sm:px-6">{stepVisual(s.n)}</div>
            </motion.article>
          ))}
        </div>

        <SubBlock
          label="Who decides"
          title="What the agent does alone, and what stays with people"
          intro="Complete and correct are defined per step. Where either is unclear, the work goes to a person."
        >
          <DecisionColumns />
        </SubBlock>

        <SubBlock
          label="Access controls"
          title="The minimum necessary rule, applied to files"
          intro="The billing team owns the rules, so the agent can read them but never write to them."
        >
          <AccessMap />
        </SubBlock>

        <SubBlock
          label="Mapped to real work"
          title="Every file has a real-world twin"
          intro="Nothing here is exotic: each file is something a billing team already keeps."
        >
          <FolderMap />
        </SubBlock>

        <SubBlock
          label="How it gets started"
          title="Two ways to trigger the workflow"
          intro="On demand for one denial, or on a schedule for the whole week. Not productionized."
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {denialTriggers.map((t, i) => (
              <motion.div key={t.title} {...fadeUp(0.05 + i * 0.08)} className={`${CARD} ${CARD_PAD} min-w-0`}>
                <p className="text-[14px] font-semibold text-stone-800">{t.title}</p>
                <p className="mt-2 text-[13px] leading-[1.68] text-stone-500">{t.body}</p>
                <pre className="mt-4 whitespace-pre-wrap break-words rounded-lg bg-stone-900 px-4 py-3 font-mono text-[12px] leading-[1.6] text-stone-100">
                  <code>{t.code}</code>
                </pre>
              </motion.div>
            ))}
          </div>
        </SubBlock>
      </div>

      {/* ── 4. Key insights ────────────────────────────────────────────── */}
      <div className={SECTION}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>4 · Learnings</SectionLabel>
          <SectionHeading>Key insights</SectionHeading>
        </motion.div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {denialInsights.map((ins, i) => (
            <motion.div
              key={ins.title}
              {...fadeUp(0.04 + (i % 3) * 0.06)}
              className={`${CARD} ${CARD_PAD} flex flex-col`}
            >
              <span className="self-start rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-500">
                {ins.tag}
              </span>
              <p className="font-display mt-3 text-[1.02rem] font-medium leading-snug tracking-[-0.015em] text-stone-900">
                {ins.title}
              </p>
              <p className="mt-2 flex-1 text-[13px] leading-[1.68] text-stone-500">{ins.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 5. Tech stack ──────────────────────────────────────────────── */}
      <div className={SECTION}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>5 · Tech stack</SectionLabel>
          <SectionHeading>What it is built with</SectionHeading>
        </motion.div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {denialTechStack.map((g, i) => (
            <motion.div key={g.group} {...fadeUp(0.04 + i * 0.05)} className={`${CARD} ${CARD_PAD}`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">{g.group}</p>
              <div className="mt-3">
                <BulletList items={g.items} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
