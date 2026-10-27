import type { ReflectionItem } from "@/content/case-studies/types";
import { CARD, CARD_PAD } from "./styles";

export function ReflectionSection({ items }: { items: ReflectionItem[] }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.prompt} className={`${CARD} ${CARD_PAD}`}>
          <p className="text-[11px] font-semibold text-stone-800">{item.prompt}</p>
          <p className="mt-2 text-[12px] leading-[1.6] text-stone-600">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
