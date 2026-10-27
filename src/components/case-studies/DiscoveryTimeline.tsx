import type { DiscoveryItem } from "@/content/case-studies/types";
import { CARD, CARD_PAD } from "./styles";
import { GradientBar } from "./SectionChrome";

export function DiscoveryTimeline({ items }: { items: DiscoveryItem[] }) {
  return (
    <div className="mt-6">
      <div className="hidden sm:grid sm:grid-cols-5 sm:gap-3">
        {items.map((item, i) => (
          <div key={item.method} className="relative">
            {i < items.length - 1 && (
              <span
                aria-hidden
                className="absolute right-0 top-5 h-px w-3 translate-x-full bg-stone-200"
              />
            )}
            <div className={`h-full ${CARD} ${CARD_PAD}`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                {item.method}
              </p>
              <p className="mt-2 text-[11px] font-medium text-stone-400">{item.detail}</p>
              <p className="mt-3 text-[12px] leading-[1.6] text-stone-600">{item.insight}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-3 sm:hidden">
        {items.map((item) => (
          <div key={item.method} className={`${CARD} ${CARD_PAD}`}>
            <div className="mb-2 flex items-center gap-2">
              <GradientBar />
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                {item.method}
              </p>
            </div>
            <p className="text-[11px] font-medium text-stone-400">{item.detail}</p>
            <p className="mt-2 text-[12px] leading-[1.6] text-stone-600">{item.insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
