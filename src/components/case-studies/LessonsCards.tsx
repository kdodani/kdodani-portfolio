import type { Lesson } from "@/content/case-studies/types";
import { CARD, CARD_PAD } from "./styles";

export function LessonsCards({ items }: { items: Lesson[] }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className={`${CARD} ${CARD_PAD}`}>
          <p className="text-[11px] font-semibold text-stone-800">{item.title}</p>
          <p className="mt-2 text-[12px] leading-[1.6] text-stone-600">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
