"use client";

import { motion } from "framer-motion";
import type { BuildEntry } from "@/content/builds";
import {
  buildSteps,
  deterministicSteps,
  guardrailArtifact,
  inputArtifacts,
  insights,
  judgmentSteps,
  problems,
  techStack,
  triggers,
  whyAgent,
  whyNotAgentNote,
} from "@/content/intake-specialist";
import { EscalationFlow } from "./EscalationFlow";
import { IntakeWorkflowDiagram } from "./IntakeWorkflowDiagram";
import { OutcomeSnapshot } from "./OutcomeSnapshot";
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
import { ZoomFigure } from "./ZoomFigure";

const ARTIFACT_COLS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function IntakeSpecialistBuild({
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
    <section id={build.id} className="scroll-mt-4">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <motion.div {...fadeUp(0)}>
        <BuildEyebrow number={number} total={total} featured />
        <h2 className="font-display mt-2 text-[clamp(1.6rem,2vw+1rem,2.2rem)] font-medium tracking-[-0.03em] text-stone-900">
          {build.title}
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusPill>{build.status}</StatusPill>
          <span className="chip">Not productionized</span>
          <span className="chip">Fictional data</span>
        </div>
        <p className="mt-4 text-[15px] font-medium leading-snug text-accent/90 sm:text-base">{build.tagline}</p>
        <p className="mt-3 max-w-[min(100%,42rem)] text-[14px] leading-[1.72] text-stone-600 sm:text-[15px]">
          {build.context} I wanted to learn what it takes to build an agent from the operations side:
          what to automate, what to leave to a human, and how to make the result trustworthy.
        </p>
      </motion.div>

      {/* ── 1. The problem (inputs shown alongside) ────────────────────── */}
      <div className={SECTION}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>1 · The problem</SectionLabel>
          <SectionHeading>Referral intake is manual, slow and error-prone</SectionHeading>
        </motion.div>
        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-6">
          <div className="space-y-4">
            {problems.map((p, i) => (
              <motion.div key={p.title} {...fadeUp(0.05 + i * 0.07)} className={`${CARD} ${CARD_PAD}`}>
                <p className="text-[14px] font-semibold leading-snug text-stone-800">{p.title}</p>
                <p className="mt-2 text-[13px] leading-[1.65] text-stone-500">{p.body}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.1)} className={`${CARD} ${CARD_PAD} min-w-0`}>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
              What actually arrives
            </p>
            <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
              {inputArtifacts.map((a) => (
                <ZoomFigure key={a.src} artifact={a} sizes="(min-width: 1024px) 20rem, (min-width: 640px) 40vw, 100vw" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 2. Why an agent ────────────────────────────────────────────── */}
      <div className={SECTION}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>2 · Why build an agent for this</SectionLabel>
          <SectionHeading>Messy input, constant volume, several systems</SectionHeading>
          <SectionIntro>
            Simple API automation can handle the clean, structured parts. The parts that scale with
            headcount are the ones that need judgment: reading a handwritten fax and working through
            a payer portal.
          </SectionIntro>
        </motion.div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {whyAgent.map((w, i) => (
            <motion.div key={w.title} {...fadeUp(0.04 + (i % 2) * 0.07)} className={`${CARD} ${CARD_PAD}`}>
              <p className="text-[14px] font-semibold leading-snug text-stone-800">{w.title}</p>
              <p className="mt-2 text-[13px] leading-[1.65] text-stone-500">{w.body}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          {...fadeUp(0.1)}
          className="mt-4 rounded-xl border border-[rgba(109,94,245,0.22)] bg-[rgba(109,94,245,0.03)] px-5 py-4 text-[13px] leading-[1.7] text-stone-600"
        >
          {whyNotAgentNote}
        </motion.p>
      </div>

      {/* ── 3. What the agent does, end to end ─────────────────────────── */}
      <div className={SECTION}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>3 · What the agent does, end to end</SectionLabel>
          <SectionHeading>From faxed referral to verified coverage</SectionHeading>
          <SectionIntro>
            The agent reads a referral, checks eligibility two ways, and returns one JSON record in
            which every value shows where it came from. Writing the result back to the EHR is the one
            step not built yet.
          </SectionIntro>
        </motion.div>
        <div className="mt-6">
          <IntakeWorkflowDiagram />
        </div>

        {/* Steps with their artifacts inline */}
        <div className="mt-10 space-y-6">
          {buildSteps.map((s) => (
            <motion.article key={s.step} {...fadeUp(0.04)} className={`${CARD} overflow-hidden`}>
              <div className={`${CARD_PAD} grid gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-8`}>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6D5EF5]/80">{s.step}</p>
                  <h4 className="font-display mt-1.5 text-[1.15rem] font-medium tracking-[-0.02em] text-stone-900">
                    {s.title}
                  </h4>
                  <p className="mt-3 text-[13px] leading-[1.7] text-stone-600">
                    <span className="font-semibold text-stone-800">The ask. </span>
                    {s.asked}
                  </p>
                  <p className="mt-4 rounded-lg bg-stone-50 px-3.5 py-3 text-[13px] leading-[1.65] text-stone-600">
                    <span className="font-semibold text-stone-800">What happened. </span>
                    {s.result}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                    Rules that mattered
                  </p>
                  <div className="mt-3">
                    <BulletList items={s.rules} />
                  </div>
                </div>
              </div>
              <div className="border-t border-stone-100 bg-stone-50/60 px-5 py-5 sm:px-6">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  Artifacts from this step
                </p>
                <div className={`grid grid-cols-1 items-start gap-4 ${ARTIFACT_COLS[s.artifacts.length] ?? "sm:grid-cols-2"}`}>
                  {s.artifacts.map((a) => (
                    <ZoomFigure key={a.src} artifact={a} sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 100vw" />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Reliability */}
        <div className="mt-14">
          <motion.div {...fadeUp(0)}>
            <SectionLabel>How it stays reliable</SectionLabel>
            <h4 className="font-display mt-2 text-[1.2rem] font-medium tracking-[-0.02em] text-stone-900 sm:text-[1.35rem]">
              Scripts where it must be identical, an LLM where it needs judgment
            </h4>
            <SectionIntro>
              The models that power agents are non-deterministic, so the same input can produce a
              different output. Turning the repeatable steps into scripts removes that variance from
              the parts of the process that should never vary.
            </SectionIntro>
          </motion.div>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <motion.div {...fadeUp(0.05)} className={`${CARD} ${CARD_PAD} border-emerald-200/70`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                Deterministic: script it
              </p>
              <ul className="mt-4 space-y-3">
                {deterministicSteps.map((s) => (
                  <li key={s.label}>
                    <p className="text-[13px] font-medium text-stone-800">{s.label}</p>
                    <p className="text-[12px] leading-[1.55] text-stone-500">{s.note}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.12)} className={`${CARD} ${CARD_PAD} border-violet-200/70`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700">
                Needs judgment: let the agent work
              </p>
              <ul className="mt-4 space-y-3">
                {judgmentSteps.map((s) => (
                  <li key={s.label}>
                    <p className="text-[13px] font-medium text-stone-800">{s.label}</p>
                    <p className="text-[12px] leading-[1.55] text-stone-500">{s.note}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <motion.div
            {...fadeUp(0.18)}
            className="mt-4 rounded-xl border border-[rgba(109,94,245,0.22)] bg-[rgba(109,94,245,0.03)] px-5 py-4"
          >
            <p className="text-[13px] leading-[1.7] text-stone-600">
              <span className="font-semibold text-stone-800">A second safeguard: maker and checker. </span>
              Have one agent do the task and a separate agent verify the result against the source,
              the same way a human team would double-check important work.
            </p>
          </motion.div>
        </div>

        {/* Escalation */}
        <div className="mt-14">
          <motion.div {...fadeUp(0)}>
            <SectionLabel>How it escalates</SectionLabel>
            <h4 className="font-display mt-2 text-[1.2rem] font-medium tracking-[-0.02em] text-stone-900 sm:text-[1.35rem]">
              Humans set the guardrails, the agent flags the exceptions
            </h4>
            <SectionIntro>
              The member ID mismatch showed the pattern. The agent did not guess, it flagged the
              struck-through character. A person then decided the rule, and the agent applied it on
              the next run.
            </SectionIntro>
          </motion.div>
          <div className="mt-5">
            <EscalationFlow />
          </div>
          <motion.div
            {...fadeUp(0.08)}
            className={`${CARD} ${CARD_PAD} mt-5 grid items-center gap-5 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-7`}
          >
            <ZoomFigure artifact={guardrailArtifact} sizes="(min-width: 768px) 32rem, 100vw" bare className="min-w-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6D5EF5]/80">In practice</p>
              <p className="mt-1.5 text-[14px] font-semibold text-stone-800">{guardrailArtifact.title}</p>
              <p className="mt-2 text-[13px] leading-[1.68] text-stone-500">{guardrailArtifact.caption}</p>
            </div>
          </motion.div>
        </div>

        {/* Output */}
        <div className="mt-14">
          <motion.div {...fadeUp(0)}>
            <SectionLabel>What comes out</SectionLabel>
            <h4 className="font-display mt-2 text-[1.2rem] font-medium tracking-[-0.02em] text-stone-900 sm:text-[1.35rem]">
              One referral in, one verified record out
            </h4>
            <SectionIntro>
              The full run (read the referral, call the API, search the portal, return the JSON) took
              about a minute and a half in the demo.
            </SectionIntro>
          </motion.div>
          <div className="mt-5">
            <OutcomeSnapshot />
          </div>
        </div>

        {/* Triggers */}
        <div className="mt-14">
          <motion.div {...fadeUp(0)}>
            <SectionLabel>How it gets started</SectionLabel>
            <h4 className="font-display mt-2 text-[1.2rem] font-medium tracking-[-0.02em] text-stone-900 sm:text-[1.35rem]">
              Two ways to trigger the workflow
            </h4>
            <SectionIntro>
              An agent that only runs when someone types a prompt is a demo. Triggers are what let it
              run on its own. This build shows the idea but is not productionized.
            </SectionIntro>
          </motion.div>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {triggers.map((t, i) => (
              <motion.div key={t.title} {...fadeUp(0.05 + i * 0.08)} className={`${CARD} ${CARD_PAD} min-w-0`}>
                <p className="text-[14px] font-semibold text-stone-800">{t.title}</p>
                <p className="mt-2 text-[13px] leading-[1.68] text-stone-500">{t.body}</p>
                {t.code ? (
                  <pre className="mt-4 whitespace-pre-wrap break-words rounded-lg bg-stone-900 px-4 py-3 font-mono text-[12px] leading-[1.6] text-stone-100">
                    <code>{t.code}</code>
                  </pre>
                ) : null}
                {t.artifact ? <ZoomFigure artifact={t.artifact} bare className="mt-4" sizes="(min-width: 768px) 28rem, 100vw" /> : null}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Key insights ────────────────────────────────────────────── */}
      <div className={SECTION}>
        <motion.div {...fadeUp(0)}>
          <SectionLabel>4 · Learnings</SectionLabel>
          <SectionHeading>Key insights</SectionHeading>
        </motion.div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((ins, i) => (
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
          {techStack.map((g, i) => (
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
