import type { MetaItem } from "@/content/case-studies/types";
import { CARD, CARD_PAD } from "./styles";
import { SectionLabel } from "./SectionChrome";

export function CaseStudyHero({
  title,
  oneLiner,
  meta,
}: {
  title: string;
  oneLiner: string;
  meta: MetaItem[];
}) {
  return (
    <header className="print:break-inside-avoid">
      <SectionLabel>Case study · interview deep-dive</SectionLabel>
      <h1 className="gradient-hero-text font-display mt-3 text-[clamp(1.85rem,2.5vw+1rem,2.75rem)] font-medium leading-[1.08] tracking-[-0.035em]">
        {title}
      </h1>
      <p className="mt-3 max-w-editorial text-[15px] font-medium leading-snug text-accent/90 sm:text-base">
        {oneLiner}
      </p>
      <dl className={`mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ${CARD} ${CARD_PAD}`}>
        {meta.map((item) => (
          <div key={item.label}>
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-400">
              {item.label}
            </dt>
            <dd className="mt-1 text-[13px] leading-[1.55] text-stone-700">{item.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
