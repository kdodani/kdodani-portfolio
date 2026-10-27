import type { ResultMetric } from "@/content/case-studies/types";
import { CARD, CARD_PAD } from "./styles";

const CATEGORY_LABEL: Record<ResultMetric["category"], string> = {
  user: "User outcomes",
  business: "Business outcomes",
  operational: "Operational outcomes",
};

export function ResultsMetrics({ items }: { items: ResultMetric[] }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={`${item.stat}-${item.unit}`} className={`${CARD} ${CARD_PAD}`}>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
            {CATEGORY_LABEL[item.category]}
          </p>
          <p className="gradient-hero-text font-display mt-2 text-[clamp(1.5rem,1.5vw+1rem,2rem)] font-medium leading-none tracking-[-0.03em]">
            {item.stat}
          </p>
          <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-stone-500">
            {item.unit}
          </p>
          {item.detail && (
            <p className="mt-3 text-[12px] leading-[1.6] text-stone-400">{item.detail}</p>
          )}
        </div>
      ))}
    </div>
  );
}
