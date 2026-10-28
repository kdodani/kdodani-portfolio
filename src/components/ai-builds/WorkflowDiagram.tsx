"use client";

import { motion } from "framer-motion";
import { flowKindLabel, type FlowKind, type FlowNode } from "@/content/flow";
import { useFadeUp } from "./ui";

const KIND_STYLE: Record<FlowKind, { chip: string; border: string }> = {
  input: { chip: "bg-stone-100 text-stone-600", border: "border-stone-200/70" },
  llm: { chip: "bg-violet-50 text-violet-700", border: "border-violet-200/70" },
  script: { chip: "bg-emerald-50 text-emerald-700", border: "border-emerald-200/70" },
  browser: { chip: "bg-sky-50 text-sky-700", border: "border-sky-200/70" },
  human: { chip: "bg-rose-50 text-rose-700", border: "border-rose-200/70" },
  output: { chip: "bg-amber-50 text-amber-700", border: "border-amber-200/70" },
  future: { chip: "bg-stone-50 text-stone-400", border: "border-dashed border-stone-300" },
};

function Arrow({ vertical }: { vertical?: boolean }) {
  return (
    <svg
      aria-hidden
      className={`h-4 w-4 shrink-0 text-stone-300 ${vertical ? "rotate-90" : ""}`}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Left-to-right (stacked on mobile) flow of typed nodes. */
export function WorkflowDiagram({ nodes }: { nodes: FlowNode[] }) {
  const fadeUp = useFadeUp();

  return (
    <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-stretch lg:gap-1.5">
      {nodes.map((node, i) => {
        const style = KIND_STYLE[node.kind];
        return (
          <li key={node.id} className="flex flex-1 flex-col items-stretch gap-2 lg:flex-row lg:items-stretch lg:gap-1.5">
            {i > 0 && (
              <div className="flex shrink-0 items-center justify-center">
                <span className="lg:hidden" aria-hidden>
                  <Arrow vertical />
                </span>
                <span className="hidden lg:block" aria-hidden>
                  <Arrow />
                </span>
              </div>
            )}
            <motion.div
              {...fadeUp(i * 0.06)}
              className={`flex flex-1 flex-col rounded-xl border bg-white px-3.5 py-3.5 ${style.border}`}
            >
              <span
                className={`self-start rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.08em] ${style.chip}`}
              >
                {flowKindLabel[node.kind]}
              </span>
              <p className="mt-2.5 text-[13px] font-semibold leading-snug text-stone-800">{node.label}</p>
              <p className="mt-1.5 text-[12px] leading-[1.55] text-stone-500">{node.detail}</p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
