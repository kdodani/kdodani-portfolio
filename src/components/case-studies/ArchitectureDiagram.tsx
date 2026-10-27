import type { ArchitectureNode, ResponsibilityItem } from "@/content/case-studies/types";
import { CARD, CARD_PAD } from "./styles";

export function ArchitectureDiagram({
  title,
  nodes,
  responsibilities,
  tradeoffs,
}: {
  title: string;
  nodes: ArchitectureNode[];
  responsibilities: ResponsibilityItem[];
  tradeoffs: string[];
}) {
  const roleLabel = {
    product: "Product",
    engineering: "Engineering",
    shared: "Shared",
  };

  const roleColor = {
    product: "text-accent",
    engineering: "text-stone-600",
    shared: "text-stone-500",
  };

  return (
    <div className="mt-6 space-y-4">
      <p className="text-[13px] text-stone-500">{title}</p>

      <div className={`${CARD} ${CARD_PAD}`}>
        <div className="flex flex-col items-center gap-3">
          {nodes.map((node, i) => (
            <div key={node.label} className="flex w-full max-w-md flex-col items-center">
              {i > 0 && (
                <svg aria-hidden className="mb-2 h-4 w-4 text-stone-300" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 2v8M2 7l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <div className="w-full rounded-xl border border-stone-200/70 bg-stone-50/50 px-4 py-3 text-center">
                <p className="text-[13px] font-semibold text-stone-800">{node.label}</p>
                <p className="mt-1 text-[11px] leading-[1.5] text-stone-400">{node.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {responsibilities.map((group) => (
          <div key={group.role} className={`${CARD} ${CARD_PAD}`}>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${roleColor[group.role]}`}>
              {roleLabel[group.role]} responsibilities
            </p>
            <ul className="mt-3 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-[12px] leading-[1.55] text-stone-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {tradeoffs.length > 0 && (
        <div className={`${CARD} ${CARD_PAD}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
            Technical tradeoffs
          </p>
          <ul className="mt-3 space-y-2">
            {tradeoffs.map((t) => (
              <li key={t} className="text-[12px] leading-[1.55] text-stone-600">
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
