"use client";

import { motion } from "framer-motion";
import { escalationCases } from "@/content/intake-specialist";
import { CARD, CARD_PAD, useFadeUp } from "./ui";

function DownArrow() {
  return (
    <div className="flex justify-center py-1.5" aria-hidden>
      <svg className="h-4 w-4 text-stone-300" viewBox="0 0 16 16" fill="none">
        <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Box({
  title,
  body,
  tone = "neutral",
}: {
  title: string;
  body: string;
  tone?: "neutral" | "good" | "warn" | "human";
}) {
  const tones = {
    neutral: "border-stone-200/70 bg-white",
    good: "border-emerald-200/80 bg-emerald-50/50",
    warn: "border-amber-200/80 bg-amber-50/50",
    human: "border-[rgba(109,94,245,0.28)] bg-[rgba(109,94,245,0.04)]",
  };
  return (
    <div className={`rounded-xl border px-4 py-3 ${tones[tone]}`}>
      <p className="text-[13px] font-semibold text-stone-800">{title}</p>
      <p className="mt-1 text-[12px] leading-[1.55] text-stone-500">{body}</p>
    </div>
  );
}

export function EscalationFlow() {
  const fadeUp = useFadeUp();

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-8">
      {/* Decision flow */}
      <motion.div {...fadeUp(0)} className={`${CARD} ${CARD_PAD}`}>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
          How the agent decides
        </p>
        <Box title="Read a field" body="From the form, the card, the API or the portal." />
        <DownArrow />
        <Box title="Is it clear and consistent?" body="One value, legible, and sources agree." />
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <Box tone="good" title="Yes: use it" body="Value is kept and labeled with its source." />
          <Box
            tone="warn"
            title="No: do not guess"
            body="Leave empty or keep both values, and add a flag naming the field."
          />
        </div>
        <DownArrow />
        <Box tone="human" title="A human reviews the flag" body="Decides which value is right, or what to do." />
        <DownArrow />
        <Box
          tone="human"
          title="Human updates the rule"
          body="The guardrail is written into the playbook, so the next run handles it without a flag."
        />
      </motion.div>

      {/* Cases */}
      <div className="space-y-4">
        {escalationCases.map((c, i) => (
          <motion.div key={c.field} {...fadeUp(0.06 + i * 0.07)} className={`${CARD} ${CARD_PAD}`}>
            <p className="inline-block rounded-md bg-stone-100 px-2 py-0.5 font-mono text-[11px] text-stone-600">
              {c.field}
            </p>
            <dl className="mt-3 space-y-2.5 text-[13px] leading-[1.6]">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">What happened</dt>
                <dd className="text-stone-600">{c.trigger}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">The agent</dt>
                <dd className="text-stone-600">{c.agentDid}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6D5EF5]/70">The human</dt>
                <dd className="text-stone-700">{c.humanCall}</dd>
              </div>
            </dl>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
