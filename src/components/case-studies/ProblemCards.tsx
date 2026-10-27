import type { ProblemCard } from "@/content/case-studies/types";
import { CARD, CARD_PAD } from "./styles";
import { GradientBar } from "./SectionChrome";

export function ProblemCards({ items }: { items: ProblemCard[] }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className={`${CARD} ${CARD_PAD}`}>
          <div className="mb-3 flex items-center gap-2">
            <GradientBar />
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
              {item.title}
            </h3>
          </div>
          <p className="text-[13px] leading-[1.65] text-stone-600">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
