import type { HumanAiBoundary } from "@/content/case-studies/types";
import { CARD, CARD_PAD } from "./styles";

export function HumanAiBoundaryMap({ boundary }: { boundary: HumanAiBoundary }) {
  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-3">
      <div className={`${CARD} ${CARD_PAD} border-stone-200/70`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-600">
          Human responsibilities
        </p>
        <ul className="mt-3 space-y-2">
          {boundary.human.map((item) => (
            <li key={item} className="text-[12px] leading-[1.55] text-stone-600">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${CARD} ${CARD_PAD} border-[rgba(109,94,245,0.2)] bg-[rgba(109,94,245,0.03)]`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
          AI responsibilities
        </p>
        <ul className="mt-3 space-y-2">
          {boundary.ai.map((item) => (
            <li key={item} className="text-[12px] leading-[1.55] text-stone-600">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${CARD} ${CARD_PAD}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">
          Decision boundaries
        </p>
        <ul className="mt-3 space-y-2">
          {boundary.boundaries.map((item) => (
            <li key={item} className="text-[12px] leading-[1.55] text-stone-600">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
