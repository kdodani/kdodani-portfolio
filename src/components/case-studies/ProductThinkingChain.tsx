import type { ProductThinkingItem } from "@/content/case-studies/types";
import { CARD, CARD_PAD } from "./styles";

const CHAIN_STEPS = [
  "Observation",
  "Insight",
  "Decision",
  "Tradeoff",
  "Expected Outcome",
] as const;

const CHAIN_KEYS: (keyof ProductThinkingItem)[] = [
  "observation",
  "insight",
  "decision",
  "tradeoff",
  "expectedOutcome",
];

export function ProductThinkingChain({ items }: { items: ProductThinkingItem[] }) {
  return (
    <div className="mt-6 space-y-5">
      {items.map((item, idx) => (
        <div key={idx} className={`${CARD} ${CARD_PAD}`}>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
            Decision chain {idx + 1}
          </p>
          <div className="grid gap-3 sm:grid-cols-5">
            {CHAIN_STEPS.map((label, i) => (
              <div key={label} className="relative">
                {i < CHAIN_STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-1.5 top-4 hidden h-px w-3 bg-stone-200 sm:block"
                  />
                )}
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-accent/70">
                  {label}
                </p>
                <p className="mt-1.5 text-[12px] leading-[1.55] text-stone-600">
                  {item[CHAIN_KEYS[i]]}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
