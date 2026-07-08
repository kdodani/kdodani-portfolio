import { ProviderSegmentDiagram } from "@/components/projects/ProviderSegmentDiagram";

const PLATFORM_PATHS = [
  {
    segment: "High-volume providers",
    channel: "Redesigned provider portal",
    needs:
      "Multi-claim and multi-invoice entries, line duplication, real-time validation.",
  },
  {
    segment: "Hearing aid providers",
    channel: "Blueprint EMR integration",
    needs:
      "Bulk uploads through a new Blueprint release — demand mobilized bottom-up.",
  },
  {
    segment: "Physicians & GPs",
    channel: "Direct EMR integration",
    needs:
      "Workflows at point of care — validated first through OSCAR API integration.",
  },
] as const;

const PLATFORM_DELIVERABLES = [
  "$580K funding secured",
  "Portal redesigned for high-volume workflows",
  "Interoperability roadmap defined",
  "OSCAR API integration validated",
  "Bottom-up demand with provider orgs (Blueprint)",
] as const;

/** Standalone diagram for platform strategy insight — used on case study + JPG export. */
export function PlatformStrategyInsightDiagram() {
  return (
    <div
      className="overflow-hidden rounded-3xl border border-stone-200/60 bg-white shadow-[0_24px_64px_-32px_rgba(15,23,42,0.12)]"
      role="img"
      aria-label="Platform strategy insight: one product could not serve every provider segment — high-volume portal, Blueprint vendor integration, and direct EMR integration"
    >
      <div className="border-b border-stone-100 bg-gradient-to-br from-[rgba(109,94,245,0.04)] to-white px-8 py-8 sm:px-10 sm:py-9">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-400">
          WorkSafeBC · Provider Invoice Submission
        </p>
        <h2 className="font-display mt-3 max-w-2xl text-[clamp(1.45rem,2vw+0.9rem,2rem)] font-medium tracking-[-0.03em] text-stone-900">
          One product couldn&apos;t serve every provider
        </h2>
        <p className="mt-3 max-w-3xl text-[14px] leading-[1.68] text-stone-500 sm:text-[15px]">
          A single portal couldn&apos;t unlock the remaining paper volume. That insight shifted the
          roadmap from optimizing one product to building a long-term platform strategy — matching
          each segment to the channel that fits how they actually work.
        </p>
      </div>

      <div className="px-8 py-8 sm:px-10 sm:py-9">
        <ProviderSegmentDiagram highlight="none" />

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {PLATFORM_PATHS.map((path) => (
            <div
              key={path.segment}
              className="rounded-2xl border border-stone-200/60 bg-stone-50/30 px-5 py-5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
                {path.segment}
              </p>
              <p className="mt-2 font-display text-[1rem] font-medium tracking-[-0.018em] text-stone-900">
                {path.channel}
              </p>
              <p className="mt-2 text-[12px] leading-[1.62] text-stone-500">{path.needs}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-[rgba(109,94,245,0.16)] bg-[rgba(109,94,245,0.04)] px-6 py-5 sm:px-7 sm:py-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent/70">
            Platform deliverables
          </p>
          <p className="mt-2.5 text-[13px] leading-[1.68] text-stone-600 sm:text-[14px]">
            Built the business cases securing $580K in funding, redesigned the provider portal for
            high-volume workflows, defined an interoperability roadmap, validated the first API
            integration with OSCAR EMR, and partnered with provider organizations to build
            bottom-up demand for future integrations — starting with Blueprint.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {PLATFORM_DELIVERABLES.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-[rgba(109,94,245,0.14)] bg-white px-3 py-1.5 text-[11px] font-medium text-stone-600"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
