import type { ExecutionItem } from "@/content/case-studies/types";
import { CARD, CARD_PAD } from "./styles";

type ExecutionBoardProps = {
  timeline: ExecutionItem;
  prioritization: ExecutionItem;
  mvp: ExecutionItem;
  risks: ExecutionItem;
  tradeoffs: ExecutionItem;
  partners: ExecutionItem;
};

export function ExecutionBoard(props: ExecutionBoardProps) {
  const blocks = [
    props.timeline,
    props.prioritization,
    props.mvp,
    props.risks,
    props.tradeoffs,
    props.partners,
  ];

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {blocks.map((block) => (
        <div key={block.label} className={`${CARD} ${CARD_PAD}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
            {block.label}
          </p>
          <ul className="mt-3 space-y-2">
            {block.items.map((item) => (
              <li key={item} className="text-[12px] leading-[1.55] text-stone-600">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
