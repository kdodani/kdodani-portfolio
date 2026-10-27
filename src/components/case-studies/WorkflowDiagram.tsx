import type { WorkflowStep } from "@/content/case-studies/types";
import { CARD, CARD_PAD } from "./styles";

export function WorkflowDiagram({
  title,
  steps,
}: {
  title: string;
  steps: WorkflowStep[];
}) {
  return (
    <div className="mt-6">
      <p className="mb-4 text-[13px] text-stone-500">{title}</p>
      <div className={`overflow-x-auto ${CARD} ${CARD_PAD}`}>
        <div className="flex min-w-max items-stretch gap-2">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-stretch gap-2">
              {i > 0 && (
                <div className="flex items-center text-stone-300">
                  <svg aria-hidden className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 8h8M9 5l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              <div
                className={[
                  "flex w-[7.5rem] flex-col rounded-xl border px-3 py-3 sm:w-[8.5rem]",
                  step.bottleneck
                    ? "border-amber-200/80 bg-amber-50/60"
                    : "border-stone-200/70 bg-stone-50/50",
                ].join(" ")}
              >
                <p className="text-[12px] font-semibold leading-tight text-stone-800">
                  {step.label}
                </p>
                {step.bottleneck && (
                  <p className="mt-2 text-[10px] font-medium leading-[1.45] text-amber-800/80">
                    {step.bottleneck}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
