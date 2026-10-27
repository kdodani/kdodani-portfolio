import type { KeyDecision } from "@/content/case-studies/types";
import { CARD } from "./styles";

export function DecisionMatrix({ items }: { items: KeyDecision[] }) {
  return (
    <div className={`mt-6 overflow-hidden ${CARD} border-[rgba(109,94,245,0.2)] bg-gradient-to-br from-[rgba(109,94,245,0.03)] to-white`}>
      <div className="border-b border-[rgba(109,94,245,0.12)] px-6 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
          Key product decisions
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-[12px]">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50/80">
              <th className="px-4 py-3 font-semibold text-stone-600">Decision</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Alternative</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Why we chose this</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Tradeoffs</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Outcome</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.decision} className="border-b border-stone-100 align-top last:border-0">
                <td className="px-4 py-4">
                  <p className="font-medium text-stone-800">{row.decision}</p>
                  {row.category && (
                    <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-accent/60">
                      {row.category}
                    </p>
                  )}
                </td>
                <td className="px-4 py-4 text-stone-500">{row.alternative}</td>
                <td className="px-4 py-4 text-stone-600">{row.why}</td>
                <td className="px-4 py-4 text-stone-500">{row.tradeoff}</td>
                <td className="px-4 py-4 text-stone-600">{row.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
