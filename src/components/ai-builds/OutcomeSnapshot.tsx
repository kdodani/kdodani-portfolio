"use client";

import { motion } from "framer-motion";
import { outcomeSnapshot, sourcePrecedence } from "@/content/intake-specialist";
import { CARD, CARD_PAD, useFadeUp } from "./ui";

export function OutcomeSnapshot() {
  const fadeUp = useFadeUp();
  const o = outcomeSnapshot;

  return (
    <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,4fr)_auto_minmax(0,7fr)] lg:gap-5">
      <motion.div {...fadeUp(0)} className={`${CARD} ${CARD_PAD} flex flex-col justify-center`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">Before</p>
        <p className="font-display mt-2 text-[1.2rem] font-medium tracking-[-0.02em] text-stone-900">
          {o.inputLabel}
        </p>
        <p className="mt-1 text-[13px] leading-[1.6] text-stone-500">{o.inputSub}</p>
        <p className="mt-4 text-[12px] leading-[1.6] text-stone-400">
          Someone retypes the details, opens the payer portal, searches, and copies benefits by hand.
        </p>
      </motion.div>

      <div className="flex items-center justify-center" aria-hidden>
        <svg className="h-5 w-5 rotate-90 text-stone-300 lg:rotate-0" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <motion.div
        {...fadeUp(0.1)}
        className={`${CARD} ${CARD_PAD} border-[rgba(109,94,245,0.22)] shadow-[0_0_0_1px_rgba(109,94,245,0.05)]`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6D5EF5]/80">After</p>
        <dl className="mt-3 divide-y divide-stone-100">
          {o.outputRows.map((row) => (
            <div key={row.k} className="flex items-baseline justify-between gap-3 py-2 text-[13px]">
              <dt className="text-stone-500">{row.k}</dt>
              <dd className="flex items-baseline gap-2 text-right font-medium text-stone-800">
                {row.v}
                <span className="rounded-full bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em] text-stone-500">
                  {row.src}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 rounded-lg border border-amber-200/80 bg-amber-50/50 px-3.5 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-700">Flags for a human</p>
          <ul className="mt-1.5 space-y-1 text-[12px] leading-[1.55] text-stone-600">
            {o.flags.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        {...fadeUp(0.15)}
        className="lg:col-span-3"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">Where each answer comes from</p>
        <ol className="mt-3 grid gap-2 sm:grid-cols-3">
          {sourcePrecedence.map((s, i) => (
            <li key={s.source} className="flex items-start gap-3 rounded-xl border border-stone-200/60 bg-white px-4 py-3">
              <span className="font-display mt-0.5 text-[1.1rem] leading-none text-stone-300">{i + 1}</span>
              <div>
                <p className="text-[13px] font-semibold text-stone-800">{s.source}</p>
                <p className="mt-0.5 text-[12px] leading-[1.5] text-stone-500">{s.role}</p>
              </div>
            </li>
          ))}
        </ol>
      </motion.div>
    </div>
  );
}
