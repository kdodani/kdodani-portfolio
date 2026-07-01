const STAKEHOLDER_LANES = [
  {
    lane: "Government",
    color: "stone" as const,
    nodes: [{ name: "BC Government", sub: "BCeID decommission · deadline owner" }],
  },
  {
    lane: "Vendors",
    color: "stone" as const,
    nodes: [
      { name: "TELUS / CPR", sub: "Provider Portal" },
      { name: "PCIS", sub: "Portal sustainment" },
    ],
  },
  {
    lane: "Engineering",
    color: "accent" as const,
    nodes: [
      { name: "Architecture", sub: "ForgeRock design" },
      { name: "Security & Privacy", sub: "Auth · PII requirements" },
      { name: "Product & Ops", sub: "Requirements · helpdesk" },
    ],
  },
  {
    lane: "Providers",
    color: "stone" as const,
    nodes: [
      { name: "Org admins", sub: "500 organizations" },
      { name: "Providers", sub: "5,600 accounts" },
    ],
  },
] as const;

const TIMELINE_PHASES = [
  { phase: "Discovery", date: "Mar 2024", active: false },
  { phase: "Email campaign", date: "Feb 2025", active: false },
  { phase: "Provisioning", date: "Mar 1–21", active: false },
  { phase: "Go-live", date: "Mar 22", active: true },
  { phase: "Cleanup", date: "Apr–Jun", active: false },
] as const;

function laneStyles(color: "stone" | "accent") {
  if (color === "accent") {
    return "border-[rgba(109,94,245,0.18)] bg-gradient-to-b from-[rgba(109,94,245,0.05)] to-white";
  }
  return "border-stone-200/70 bg-stone-50/30";
}

function nodeStyles(color: "stone" | "accent") {
  if (color === "accent") {
    return "border-[rgba(109,94,245,0.16)] bg-white";
  }
  return "border-stone-200/60 bg-white";
}

export function MigrationCoordinationDiagram() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-stone-200/60 bg-white"
      role="img"
      aria-label="Identity migration stakeholder coordination map and timeline"
    >
      <div className="border-b border-stone-100 bg-stone-50/50 px-5 py-4 sm:px-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
          Coordination map · migration timeline
        </p>
        <p className="mt-1 text-[12px] text-stone-500">
          Nine parties, one fixed deadline — alignment across government, vendors, engineering, and providers.
        </p>
      </div>

      {/* Stakeholder lanes */}
      <div className="grid gap-3 px-5 py-5 sm:grid-cols-2 sm:px-7 lg:grid-cols-4">
        {STAKEHOLDER_LANES.map((lane) => (
          <div
            key={lane.lane}
            className={`rounded-xl border p-3 ${laneStyles(lane.color)}`}
          >
            <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
              {lane.lane}
            </p>
            <div className="space-y-2">
              {lane.nodes.map((node) => (
                <div
                  key={node.name}
                  className={`rounded-lg border px-3 py-2.5 ${nodeStyles(lane.color)}`}
                >
                  <p className="text-[12px] font-semibold text-stone-800">{node.name}</p>
                  <p className="mt-0.5 text-[10px] leading-[1.45] text-stone-400">{node.sub}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Coordination hub */}
      <div className="relative px-5 sm:px-7">
        <div className="flex justify-center">
          <div className="flex w-full max-w-md flex-col items-center">
            <div className="h-6 w-px bg-gradient-to-b from-stone-200 to-[rgba(109,94,245,0.35)]" />
            <div className="w-full rounded-xl border border-[rgba(109,94,245,0.22)] bg-gradient-to-r from-[rgba(109,94,245,0.08)] to-[rgba(79,140,255,0.05)] px-4 py-3 text-center">
              <p className="text-[12px] font-semibold text-stone-900">Identity migration program</p>
              <p className="mt-0.5 text-[10px] text-stone-500">
                PM-owned coordination · requirements · change management
              </p>
            </div>
            <div className="h-6 w-px bg-gradient-to-b from-[rgba(109,94,245,0.35)] to-stone-200" />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t border-stone-100 bg-stone-50/40 px-5 py-5 sm:px-7">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
          Migration timeline · Mar 2024 – Jun 2025
        </p>

        {/* Desktop horizontal timeline */}
        <div className="hidden sm:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-[11px] h-px bg-stone-200" />
            <div className="relative grid grid-cols-5 gap-2">
              {TIMELINE_PHASES.map((step) => (
                <div key={step.phase} className="flex flex-col items-center text-center">
                  <div
                    className={[
                      "relative z-10 h-[22px] w-[22px] rounded-full border-2",
                      step.active
                        ? "border-[#6D5EF5] bg-gradient-to-br from-[#6D5EF5] to-[#4F8CFF]"
                        : "border-stone-300 bg-white",
                    ].join(" ")}
                  />
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                    {step.date}
                  </p>
                  <p
                    className={[
                      "mt-0.5 text-[11px] font-semibold leading-tight",
                      step.active ? "text-accent" : "text-stone-700",
                    ].join(" ")}
                  >
                    {step.phase}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="flex flex-col gap-0 sm:hidden">
          {TIMELINE_PHASES.map((step, i) => (
            <div key={step.phase} className="relative flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={[
                    "mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full",
                    step.active
                      ? "bg-gradient-to-br from-[#6D5EF5] to-[#4F8CFF]"
                      : "border border-stone-300 bg-white",
                  ].join(" ")}
                />
                {i < TIMELINE_PHASES.length - 1 && (
                  <div className="mt-1 w-px flex-1 bg-stone-100" style={{ minHeight: "2rem" }} />
                )}
              </div>
              <div className={`pb-5 ${i === TIMELINE_PHASES.length - 1 ? "pb-0" : ""}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-400">
                  {step.date}
                </p>
                <p
                  className={[
                    "text-[13px] font-semibold",
                    step.active ? "text-accent" : "text-stone-800",
                  ].join(" ")}
                >
                  {step.phase}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-[rgba(109,94,245,0.14)] bg-white px-3 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#6D5EF5] to-[#4F8CFF]" />
          <p className="text-[11px] font-medium text-stone-600">
            0 service disruptions · 5,600 accounts transitioned · on-time go-live
          </p>
        </div>
      </div>
    </div>
  );
}
