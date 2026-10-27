import type { QuestionAnswer } from "@/content/case-studies/types";
import { CARD, CARD_PAD } from "./styles";

export function QuestionsAnswered({ items }: { items: QuestionAnswer[] }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.question} className={`${CARD} ${CARD_PAD}`}>
          <p className="text-[12px] font-semibold leading-snug text-stone-800">
            {item.question}
          </p>
          <p className="mt-2 text-[12px] leading-[1.6] text-stone-600">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
