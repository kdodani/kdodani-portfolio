type Highlight = "portal" | "vendor" | "emr" | "none";

type SegmentRow = {
  id: string;
  segment: string;
  segmentDetail: string;
  channel: string;
  channelDetail: string;
  workflows: string;
  route: Highlight;
};

const SEGMENTS: SegmentRow[] = [
  {
    id: "high-volume",
    segment: "High-volume providers",
    segmentDetail: "Clinics · allied health · medical supplies",
    channel: "Telus Provider Portal",
    channelDetail: "Web submission · batch upload",
    workflows: "Invoicing · referrals · claims status",
    route: "portal",
  },
  {
    id: "physicians",
    segment: "Physicians & GPs",
    segmentDetail: "Top 5 EMRs ≈ 80% of BC market",
    channel: "EMR integrations",
    channelDetail: "Direct Connect API · point-of-care",
    workflows: "Form 8/11 · clinical documentation",
    route: "emr",
  },
  {
    id: "hearing-aid",
    segment: "Hearing aid providers",
    segmentDetail: "Blueprint practice management software",
    channel: "Vendor EMR integration",
    channelDetail: "Bulk upload · new Blueprint release",
    workflows: "Device billing · multi-patient invoices",
    route: "vendor",
  },
];

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className ?? "h-3 w-3 shrink-0 text-stone-300"}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M2 6h8M7 3l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function rowHighlight(route: Highlight, highlight: Highlight) {
  if (highlight === "none") return false;
  return route === highlight;
}

type ProviderSegmentDiagramProps = {
  /** Emphasize the route this case study owns */
  highlight?: Highlight;
};

export function ProviderSegmentDiagram({ highlight = "none" }: ProviderSegmentDiagramProps) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-stone-200/60 bg-white"
      role="img"
      aria-label="Provider experience platform segment routing diagram"
    >
      <div className="border-b border-stone-100 bg-stone-50/50 px-5 py-4 sm:px-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
          Provider experience platform · segment routing
        </p>
        <p className="mt-1 text-[12px] text-stone-500">
          Match the channel to how each provider segment actually works — not one interface for everyone.
        </p>
      </div>

      {/* Desktop: column headers */}
      <div className="hidden border-b border-stone-100 px-7 py-3 sm:grid sm:grid-cols-[1.1fr_auto_1fr_auto_1fr] sm:items-center sm:gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
          Provider segment
        </p>
        <span />
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
          Experience channel
        </p>
        <span />
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
          WorkSafeBC workflows
        </p>
      </div>

      <div className="divide-y divide-stone-100">
        {SEGMENTS.map((row) => {
          const active = rowHighlight(row.route, highlight);
          return (
            <div
              key={row.id}
              className={[
                "px-5 py-5 sm:px-7 sm:py-5",
                active
                  ? "bg-gradient-to-r from-[rgba(109,94,245,0.05)] to-transparent"
                  : "bg-white",
              ].join(" ")}
            >
              {/* Mobile: stacked */}
              <div className="flex flex-col gap-3 sm:hidden">
                <SegmentCell label="Segment" title={row.segment} detail={row.segmentDetail} active={active} />
                <div className="flex items-center gap-2 pl-1">
                  <div className="h-px flex-1 bg-stone-200" />
                  <Arrow />
                  <div className="h-px flex-1 bg-stone-200" />
                </div>
                <SegmentCell label="Channel" title={row.channel} detail={row.channelDetail} active={active} />
                <div className="flex items-center gap-2 pl-1">
                  <div className="h-px flex-1 bg-stone-200" />
                  <Arrow />
                  <div className="h-px flex-1 bg-stone-200" />
                </div>
                <SegmentCell label="Workflows" title={row.workflows} detail="" active={active} />
              </div>

              {/* Desktop: row */}
              <div className="hidden sm:grid sm:grid-cols-[1.1fr_auto_1fr_auto_1fr] sm:items-center sm:gap-3">
                <SegmentCell title={row.segment} detail={row.segmentDetail} active={active} />
                <Arrow />
                <SegmentCell title={row.channel} detail={row.channelDetail} active={active} />
                <Arrow />
                <SegmentCell title={row.workflows} detail="" active={active} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Hub */}
      <div className="border-t border-stone-100 bg-gradient-to-r from-[rgba(109,94,245,0.04)] to-[rgba(79,140,255,0.03)] px-5 py-4 sm:px-7">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
          <span className="rounded-lg border border-[rgba(109,94,245,0.2)] bg-white px-3 py-1.5 text-[12px] font-semibold text-stone-800">
            WorkSafeBC Provider Experience Platform
          </span>
          <span className="hidden text-[11px] text-stone-400 sm:inline">·</span>
          <span className="text-[11px] text-stone-500">
            One ecosystem — segmented channels, shared identity &amp; operations
          </span>
        </div>
      </div>
    </div>
  );
}

function SegmentCell({
  label,
  title,
  detail,
  active,
}: {
  label?: string;
  title: string;
  detail: string;
  active: boolean;
}) {
  return (
    <div
      className={[
        "rounded-xl border px-3.5 py-3",
        active
          ? "border-[rgba(109,94,245,0.22)] bg-white shadow-[0_1px_0_rgba(109,94,245,0.06)]"
          : "border-stone-200/70 bg-stone-50/40",
      ].join(" ")}
    >
      {label && (
        <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-400 sm:hidden">
          {label}
        </p>
      )}
      <p className={`text-[13px] font-semibold ${active ? "text-stone-900" : "text-stone-700"}`}>
        {title}
      </p>
      {detail && <p className="mt-0.5 text-[11px] leading-[1.5] text-stone-400">{detail}</p>}
    </div>
  );
}
