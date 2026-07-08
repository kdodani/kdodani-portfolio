"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const FLOW_STEPS = [
  {
    id: "total",
    value: "3,795",
    label: "Healthcare Providers",
    accent: false,
    isOutcome: false,
  },
  {
    id: "critical",
    value: "25",
    label: "High-volume Providers",
    accent: true,
    isOutcome: false,
  },
  {
    id: "share",
    value: "50%",
    label: "of all paper invoices",
    accent: true,
    isOutcome: false,
  },
  {
    id: "strategy",
    value: "Targeted Adoption Strategy",
    label: null,
    accent: false,
    isOutcome: true,
  },
] as const;

const WHY_IT_MATTERED = [
  {
    icon: "🎯",
    title: "Prioritized outreach",
    body: "Focused marketing and onboarding on just 25 organizations instead of nearly 4,000.",
  },
  {
    icon: "📈",
    title: "Maximized ROI",
    body: "A small set of providers represented half of all remaining paper invoices.",
  },
  {
    icon: "🚀",
    title: "Product-led growth",
    body: "Data informed our GTM strategy instead of relying on broad communications.",
  },
] as const;

function fadeUpProps(
  reduceMotion: boolean | null,
  delay = 0,
  staticRender = false
) {
  const animate = !staticRender && reduceMotion === false;
  return {
    initial: animate ? { opacity: 0, y: 14 } : false,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, margin: "-48px" } as const,
    transition: {
      duration: 0.52,
      ease,
      delay: animate ? delay : 0,
    },
  };
}

function FlowConnector({
  delay,
  reduceMotion,
  staticRender = false,
}: {
  delay: number;
  reduceMotion: boolean | null;
  staticRender?: boolean;
}) {
  const animate = !staticRender && !reduceMotion;

  return (
    <div className="flex flex-col items-center py-1 sm:py-2" aria-hidden>
      <svg
        width="24"
        height="56"
        viewBox="0 0 24 56"
        fill="none"
        className="overflow-visible"
      >
        <motion.line
          x1="12"
          y1="4"
          x2="12"
          y2="44"
          stroke="#d6d3d1"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={animate ? { pathLength: 0, opacity: 0.35 } : false}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{
            duration: animate ? 0.55 : 0,
            ease,
            delay: animate ? delay : 0,
          }}
        />
        <motion.path
          d="M8 48l4 4 4-4"
          stroke="#d6d3d1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { opacity: 0, y: -4 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{
            duration: animate ? 0.35 : 0,
            ease,
            delay: animate ? delay + 0.35 : 0,
          }}
        />
      </svg>
    </div>
  );
}

type ParetoGrowthStrategyProps = {
  /** When true, only render the visualization card (for diagram export). */
  visualizationOnly?: boolean;
};

export function ParetoGrowthStrategy({ visualizationOnly = false }: ParetoGrowthStrategyProps) {
  const reduceMotion = useReducedMotion();
  const staticRender = visualizationOnly;
  const fadeUp = (delay = 0) => fadeUpProps(reduceMotion, delay, staticRender);

  return (
    <div className={visualizationOnly ? undefined : "space-y-12 sm:space-y-14"}>
      <div
        className="overflow-hidden rounded-3xl border border-stone-200/60 bg-white shadow-[0_24px_64px_-32px_rgba(15,23,42,0.12)]"
        role="img"
        aria-label="Growth strategy visualization: 3,795 healthcare providers narrowed to 25 high-volume providers representing 50% of paper invoices, leading to a targeted adoption strategy"
      >
        <div className="px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <motion.div {...fadeUp(0)} className="mx-auto max-w-xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-400">
              WorkSafeBC · Provider segmentation
            </p>
            <h3 className="font-display mt-3 text-[clamp(1.5rem,2.2vw+0.8rem,2.15rem)] font-medium tracking-[-0.03em] text-stone-900">
              Growth Strategy: Focus on the Critical Few
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[14px] leading-[1.65] text-stone-500">
              Rather than target every provider, I used Pareto analysis to identify the few
              organizations responsible for most paper invoices.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 flex max-w-sm flex-col items-center sm:mt-14">
            {FLOW_STEPS.map((step, index) => (
              <div key={step.id} className="flex w-full flex-col items-center">
                <motion.div
                  {...fadeUp(0.08 + index * 0.1)}
                  className={[
                    "w-full rounded-2xl border px-6 py-7 text-center sm:px-8 sm:py-8",
                    step.isOutcome
                      ? "border-stone-200/80 bg-stone-50/60 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]"
                      : "border-stone-200/50 bg-white shadow-[0_8px_32px_-20px_rgba(15,23,42,0.1)]",
                  ].join(" ")}
                >
                  {step.isOutcome ? (
                    <p className="font-display text-[clamp(1.15rem,1.4vw+0.7rem,1.45rem)] font-medium tracking-[-0.025em] text-stone-800">
                      {step.value}
                    </p>
                  ) : (
                    <>
                      <p
                        className={[
                          "font-display text-[clamp(2.6rem,5vw+1rem,4rem)] font-medium leading-none tracking-[-0.04em]",
                          step.accent ? "text-[#2563eb]" : "text-stone-900",
                        ].join(" ")}
                      >
                        {step.value}
                      </p>
                      {step.label && (
                        <p className="mt-2.5 text-[13px] font-medium uppercase tracking-[0.12em] text-stone-500">
                          {step.label}
                        </p>
                      )}
                    </>
                  )}
                </motion.div>

                {index < FLOW_STEPS.length - 1 && (
                  <FlowConnector
                    delay={0.14 + index * 0.12}
                    reduceMotion={reduceMotion}
                    staticRender={staticRender}
                  />
                )}
              </div>
            ))}
          </div>

          <motion.div
            {...fadeUp(0.48)}
            className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[rgba(37,99,235,0.12)] bg-gradient-to-br from-[rgba(37,99,235,0.04)] to-white px-6 py-6 shadow-[0_12px_40px_-24px_rgba(37,99,235,0.18)] sm:mt-14 sm:px-8 sm:py-7"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
              💡 Product Insight
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-stone-700 sm:text-[16px]">
              &ldquo;The biggest growth opportunities aren&apos;t always in acquiring more
              users—they&apos;re often hidden within existing customer segments.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>

      {!visualizationOnly && (
        <div>
          <motion.div {...fadeUp(0)}>
            <h3 className="font-display text-[clamp(1.2rem,1.2vw+0.9rem,1.5rem)] font-medium tracking-[-0.025em] text-stone-900">
              Why this mattered
            </h3>
          </motion.div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {WHY_IT_MATTERED.map((item, index) => (
              <motion.div
                key={item.title}
                {...fadeUp(0.06 + index * 0.08)}
                className="rounded-2xl border border-stone-200/60 bg-white px-5 py-5 shadow-[0_8px_32px_-24px_rgba(15,23,42,0.08)] sm:px-6 sm:py-6"
              >
                <p className="text-[1.35rem] leading-none" aria-hidden>
                  {item.icon}
                </p>
                <p className="mt-3 text-[14px] font-semibold text-stone-800">{item.title}</p>
                <p className="mt-2 text-[13px] leading-[1.62] text-stone-500">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
