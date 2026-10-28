"use client";

import { motion } from "framer-motion";
import {
  accessLevelLabel,
  accessMap,
  accessNote,
  appealDraft,
  compareRows,
  decisionColumns,
  deniedStat,
  differentChips,
  folderMap,
  mondayNote,
  mondaySteps,
  payerSplit,
  problemTiles,
  rcmAgentLabel,
  rcmSteps,
  routeKindLabel,
  ruleChips,
  ruleLoop,
  snapshotTiles,
  triad,
  triadNote,
  visitExample,
  type AccessLevel,
  type RouteKind,
} from "@/content/claim-denials";
import { CARD, CARD_PAD, useFadeUp } from "./ui";

function SmallArrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={`h-4 w-4 shrink-0 text-stone-300 ${className}`} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Problem ─────────────────────────────────────────────────────────── */

export function ProblemTiles() {
  const fadeUp = useFadeUp();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <motion.div
        {...fadeUp(0)}
        className={`${CARD} ${CARD_PAD} flex flex-col justify-center border-[rgba(109,94,245,0.22)]`}
      >
        <p className="gradient-hero-text font-display text-[2.2rem] font-medium leading-none tracking-[-0.03em]">
          {deniedStat.stat}
        </p>
        <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.07em] text-stone-500">{deniedStat.label}</p>
        <p className="mt-3 text-[11px] leading-[1.5] text-stone-400">{deniedStat.footnote}</p>
      </motion.div>
      {problemTiles.map((p, i) => (
        <motion.div key={p.title} {...fadeUp(0.06 + i * 0.06)} className={`${CARD} ${CARD_PAD}`}>
          <p className="text-[14px] font-semibold leading-snug text-stone-800">{p.title}</p>
          <p className="mt-2 text-[13px] leading-[1.65] text-stone-500">{p.body}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function VisitExample() {
  const fadeUp = useFadeUp();
  const v = visitExample;
  const visits = Array.from({ length: v.deniedVisit }, (_, i) => i + 1);
  return (
    <motion.div {...fadeUp(0)} className={`${CARD} ${CARD_PAD}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">{v.title}</p>
      <div className="mt-4 flex flex-wrap items-center gap-1.5" role="img" aria-label="Visits 1 to 12 paid, visit 13 denied">
        {visits.map((n) => {
          const denied = n === v.deniedVisit;
          return (
            <span
              key={n}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold ${
                denied ? "bg-rose-500 text-white" : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {n}
            </span>
          );
        })}
        <span className="ml-2 text-[11px] text-stone-400">Visits 1 to 12 paid. Visit 13 denied.</span>
      </div>
      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        {v.lines.map((l) => (
          <div key={l.k} className="rounded-lg bg-stone-50 px-3.5 py-3">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6D5EF5]/80">{l.k}</dt>
            <dd className="mt-1 text-[12.5px] leading-[1.55] text-stone-600">{l.v}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}

export function RcmCycleMap() {
  const fadeUp = useFadeUp();
  const tone = {
    day1: "border-emerald-300/80 bg-emerald-50/50",
    day2: "border-violet-300/80 bg-violet-50/50",
  };
  const chip = {
    day1: "bg-emerald-100 text-emerald-700",
    day2: "bg-violet-100 text-violet-700",
  };
  return (
    <div>
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {rcmSteps.map((s, i) => (
          <motion.li
            key={s.n}
            {...fadeUp(i * 0.05)}
            className={`flex flex-col rounded-xl border px-3.5 py-3.5 ${s.agent ? tone[s.agent] : "border-stone-200/70 bg-white"}`}
          >
            <span className="text-[10px] font-semibold tracking-[0.18em] text-stone-400">{s.n}</span>
            <p className="mt-1.5 text-[13px] font-semibold leading-snug text-stone-800">{s.title}</p>
            <p className="mt-1 flex-1 text-[12px] leading-[1.5] text-stone-500">{s.sub}</p>
            {s.agent ? (
              <span
                className={`mt-3 self-start rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.08em] ${chip[s.agent]}`}
              >
                {rcmAgentLabel[s.agent]}
              </span>
            ) : null}
          </motion.li>
        ))}
      </ol>
      <p className="mt-3 text-[12px] text-stone-400">
        Each agent gets its own goal, mapped to the step of the revenue cycle it serves.
      </p>
    </div>
  );
}

/* ─── Why an agent ────────────────────────────────────────────────────── */

export function CompareRows() {
  const fadeUp = useFadeUp();
  return (
    <div className="space-y-3">
      {compareRows.map((r, i) => (
        <motion.div key={r.criterion} {...fadeUp(i * 0.06)} className={`${CARD} ${CARD_PAD}`}>
          <p className="text-[14px] font-semibold text-stone-800">{r.criterion}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-emerald-50/50 px-3.5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">Eligibility (Day 1)</p>
              <p className="mt-1 text-[13px] leading-[1.55] text-stone-600">{r.day1}</p>
            </div>
            <div className="rounded-lg bg-violet-50/50 px-3.5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-700">Denials (Day 2)</p>
              <p className="mt-1 text-[13px] leading-[1.55] text-stone-600">{r.day2}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function DifferentChips() {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">What makes denials different</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {differentChips.map((c) => (
          <li key={c} className="chip">
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── What an agent needs ─────────────────────────────────────────────── */

const TRIAD_TONE = {
  context: "border-rose-200/80 bg-rose-50/50",
  guardrails: "border-sky-200/80 bg-sky-50/50",
  goals: "border-amber-200/80 bg-amber-50/50",
};

export function TriadCards() {
  const fadeUp = useFadeUp();
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {triad.map((t, i) => (
          <motion.div key={t.id} {...fadeUp(i * 0.07)} className={`rounded-2xl border ${CARD_PAD} ${TRIAD_TONE[t.id]}`}>
            <p className="font-display text-[1.15rem] font-medium tracking-[-0.02em] text-stone-900">{t.title}</p>
            <p className="mt-1.5 text-[12.5px] leading-[1.55] text-stone-500">{t.course}</p>
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">In this build</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {t.build.map((b) => (
                <li key={b} className="rounded-md bg-white/80 px-2 py-1 font-mono text-[11px] text-stone-600">
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <p className="mt-3 inline-block rounded-md bg-amber-100/70 px-2.5 py-1 text-[12.5px] font-semibold text-stone-800">
        {triadNote}
      </p>
    </div>
  );
}

/* ─── Step visuals ────────────────────────────────────────────────────── */

export function SnapshotTiles() {
  const total = payerSplit.cigna + payerSplit.other;
  const pct = Math.round((payerSplit.cigna / total) * 100);
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {snapshotTiles.map((t) => (
          <div key={t.label} className="rounded-xl border border-stone-200/70 bg-white px-4 py-3.5">
            <p className="font-display text-[1.6rem] font-medium leading-none tracking-[-0.03em] text-stone-900">
              {t.value}
            </p>
            <p className="mt-1.5 text-[12px] leading-[1.45] text-stone-500">{t.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-stone-200/70 bg-white px-4 py-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">{payerSplit.label}</p>
        <div
          className="mt-2.5 flex h-3 overflow-hidden rounded-full bg-stone-100"
          role="img"
          aria-label={`Cigna ${payerSplit.cigna} of ${total} denials`}
        >
          <div className="bg-gradient-to-r from-[#6D5EF5] to-[#4F8CFF]" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-[12px] text-stone-500">
          <span>
            <span className="font-semibold text-stone-800">Cigna {payerSplit.cigna}</span>
          </span>
          <span>Other payers {payerSplit.other}</span>
        </div>
      </div>
    </div>
  );
}

const ROUTE_STYLE: Record<RouteKind, string> = {
  appeal: "bg-rose-100 text-rose-700",
  fix: "bg-sky-100 text-sky-700",
  desk: "bg-stone-100 text-stone-600",
  close: "bg-stone-100 text-stone-600",
  person: "bg-amber-100 text-amber-800",
};

export function RuleChips() {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
        Example rules the billing lead approves
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ruleChips.map((r) => {
          const dark = r.kind === "person";
          return (
            <div
              key={r.code}
              className={`flex flex-col rounded-xl border px-4 py-3.5 ${
                dark ? "border-stone-800 bg-stone-900 text-white" : "border-stone-200/70 bg-white"
              }`}
            >
              <p className={`font-display text-[1.05rem] font-medium ${dark ? "text-white" : "text-stone-900"}`}>
                {r.code}
              </p>
              <p className={`text-[11.5px] ${dark ? "text-stone-400" : "text-stone-400"}`}>{r.meaning}</p>
              <p className={`mt-2 flex-1 text-[12px] leading-[1.5] ${dark ? "text-stone-300" : "text-stone-500"}`}>
                {r.condition}
              </p>
              <span
                className={`mt-3 self-start rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  dark ? "bg-amber-200 text-stone-900" : ROUTE_STYLE[r.kind]
                }`}
                title={routeKindLabel[r.kind]}
              >
                {r.action}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function KeyValueCard({ title, rows }: { title: string; rows: { k: string; v: string }[] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-stone-900 text-stone-100">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-rose-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-300/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-[11px] text-stone-400">{title}</span>
      </div>
      <dl className="divide-y divide-white/5 px-4 py-1">
        {rows.map((r) => (
          <div key={r.k} className="flex gap-4 py-2 font-mono text-[11.5px] leading-[1.5]">
            <dt className="w-32 shrink-0 text-sky-300">{r.k}</dt>
            <dd className="min-w-0 break-words text-stone-200">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function AppealMock() {
  return (
    <div className="rounded-xl border border-stone-200/80 bg-white px-5 py-4 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.12)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">{appealDraft.title}</p>
      <div className="mt-3 space-y-2">
        {appealDraft.lines.map((l) =>
          l.kind === "gap" ? (
            <p
              key={l.text}
              className="rounded-md border border-dashed border-amber-300 bg-amber-50 px-2.5 py-1.5 font-mono text-[11.5px] text-amber-800"
            >
              {l.text}
            </p>
          ) : (
            <p
              key={l.text}
              className={`text-[12.5px] leading-[1.55] ${l.kind === "quote" ? "border-l-2 border-stone-200 pl-3 italic text-stone-500" : "text-stone-700"}`}
            >
              {l.text}
            </p>
          ),
        )}
      </div>
    </div>
  );
}

export function RuleLoop() {
  return (
    <div>
      <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-1.5">
        {ruleLoop.map((n, i) => (
          <li key={n.label} className="flex flex-1 flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-1.5">
            {i > 0 && (
              <div className="flex shrink-0 items-center justify-center" aria-hidden>
                <SmallArrow className="rotate-90 lg:hidden" />
                <SmallArrow className="hidden lg:block" />
              </div>
            )}
            <div
              className={`flex flex-1 flex-col rounded-xl border px-3.5 py-3 ${
                n.who === "person" ? "border-rose-200/80 bg-rose-50/50" : "border-violet-200/80 bg-violet-50/40"
              }`}
            >
              <span
                className={`self-start rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.08em] ${
                  n.who === "person" ? "bg-rose-100 text-rose-700" : "bg-violet-100 text-violet-700"
                }`}
              >
                {n.who === "person" ? "Person" : "Agent"}
              </span>
              <p className="mt-2 text-[12.5px] font-semibold leading-snug text-stone-800">{n.label}</p>
              {n.file ? <p className="mt-1.5 font-mono text-[10.5px] text-stone-500">{n.file}</p> : null}
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-2.5 text-[12px] text-stone-400">The loop repeats with every case no rule covers.</p>
    </div>
  );
}

export function MondayRoutine() {
  return (
    <div>
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {mondaySteps.map((s, i) => (
          <li key={s.title} className="rounded-xl border border-stone-200/70 bg-white px-3.5 py-3">
            <span className="text-[10px] font-semibold tracking-[0.18em] text-stone-400">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-1 text-[12.5px] font-semibold leading-snug text-stone-800">{s.title}</p>
            <p className="mt-0.5 text-[11.5px] text-stone-500">{s.sub}</p>
          </li>
        ))}
      </ol>
      <p className="mt-2.5 text-[12px] text-stone-400">{mondayNote}</p>
    </div>
  );
}

export function EdgeCases({ items }: { items: { title: string; result: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((e) => (
        <div key={e.title} className="rounded-xl border border-stone-200/70 bg-white px-4 py-3.5">
          <p className="text-[12.5px] leading-[1.55] text-stone-600">{e.title}</p>
          <p className="mt-2 inline-block rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
            {e.result}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ─── Who decides, access, folder ─────────────────────────────────────── */

const DECISION_TONE = {
  agent: { bar: "bg-violet-400", chip: "bg-violet-50 text-violet-700" },
  shared: { bar: "bg-amber-400", chip: "bg-amber-50 text-amber-700" },
  person: { bar: "bg-rose-400", chip: "bg-rose-50 text-rose-700" },
};

export function DecisionColumns() {
  const fadeUp = useFadeUp();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {decisionColumns.map((c, i) => (
        <motion.div key={c.title} {...fadeUp(i * 0.07)} className={`${CARD} overflow-hidden`}>
          <div className={`h-1 ${DECISION_TONE[c.tone].bar}`} />
          <div className={CARD_PAD}>
            <p className="text-[13px] font-semibold text-stone-800">{c.title}</p>
            <ul className="mt-3 space-y-2">
              {c.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-[12.5px] leading-[1.55] text-stone-600">
                  <span aria-hidden className={`mt-[0.55em] h-1 w-1 shrink-0 rounded-full ${DECISION_TONE[c.tone].bar}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const ACCESS_TONE: Record<AccessLevel, string> = {
  read: "bg-sky-50 text-sky-700",
  write: "bg-emerald-50 text-emerald-700",
  none: "bg-rose-50 text-rose-700",
};

export function AccessMap() {
  const fadeUp = useFadeUp();
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {accessMap.map((g, i) => (
          <motion.div key={g.level} {...fadeUp(i * 0.07)} className={`${CARD} ${CARD_PAD}`}>
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${ACCESS_TONE[g.level]}`}
            >
              {accessLevelLabel[g.level]}
            </span>
            <ul className="mt-4 space-y-3">
              {g.items.map((it) => (
                <li key={it.name}>
                  <p className="font-mono text-[11.5px] text-stone-800">{it.name}</p>
                  <p className="text-[12px] leading-[1.5] text-stone-500">{it.why}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <p className="mt-2.5 text-[12px] text-stone-400">{accessNote}</p>
    </div>
  );
}

export function FolderMap() {
  const fadeUp = useFadeUp();
  return (
    <motion.div {...fadeUp(0)} className={`${CARD} overflow-hidden`}>
      <div className="hidden grid-cols-[1fr_auto_1fr] gap-4 border-b border-stone-100 bg-stone-50/70 px-5 py-2.5 sm:grid">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">In the agent folder</p>
        <span aria-hidden className="w-4" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">Your billing team already has</p>
      </div>
      <ul className="divide-y divide-stone-100">
        {folderMap.map((r) => (
          <li key={r.file} className="grid grid-cols-1 items-center gap-1 px-5 py-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
            <p className="font-mono text-[12px] text-stone-800">{r.file}</p>
            <SmallArrow className="hidden sm:block" />
            <p className="text-[13px] text-stone-600">{r.teamHas}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
