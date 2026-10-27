import type { CaseStudy } from "@/content/case-studies/types";
import { CARD, CARD_PAD } from "./styles";

export function HeadOfProductView({
  view,
}: {
  view: CaseStudy["headOfProductView"];
}) {
  const items = [
    { label: "Problem", value: view.problem },
    { label: "Judgment", value: view.judgment },
    { label: "Hardest tradeoff", value: view.hardestTradeoff },
    { label: "Technical challenge", value: view.technicalChallenge },
    { label: "Healthcare complexity", value: view.healthcareComplexity },
    { label: "Business outcome", value: view.businessOutcome },
    { label: "Product lesson", value: view.productLesson },
  ];

  return (
    <div
      className={`mt-6 border-[rgba(109,94,245,0.25)] bg-gradient-to-br from-[rgba(109,94,245,0.06)] to-[rgba(79,140,255,0.03)] ${CARD} ${CARD_PAD} print:break-inside-avoid`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
        Head of Product view
      </p>
      <p className="mt-2 text-[12px] leading-[1.55] text-stone-500">
        If you only read one thing — why trust this PM with a healthcare workflow?
      </p>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
              {item.label}
            </dt>
            <dd className="mt-1 text-[12px] leading-[1.6] text-stone-700">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
