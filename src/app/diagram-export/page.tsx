import { MigrationCoordinationDiagram } from "@/components/projects/MigrationCoordinationDiagram";
import { ParetoGrowthStrategy } from "@/components/projects/ParetoGrowthStrategy";
import { PlatformStrategyInsightDiagram } from "@/components/projects/PlatformStrategyInsightDiagram";
import { ProviderSegmentDiagram } from "@/components/projects/ProviderSegmentDiagram";

/** Internal page for exporting diagram artifacts as JPG (see scripts/export_portfolio_jpgs.py). */
export default function DiagramExportPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] px-8 py-10">
      <div className="mx-auto flex w-[1100px] max-w-none flex-col gap-10">
        <div id="platform-strategy-insight" data-export="platform-strategy-insight">
          <PlatformStrategyInsightDiagram />
        </div>
        <div id="provider-segment-diagram" data-export="provider-segment-diagram">
          <ProviderSegmentDiagram highlight="emr" />
        </div>
        <div id="migration-coordination-diagram" data-export="migration-coordination-diagram">
          <MigrationCoordinationDiagram />
        </div>
        <div id="pareto-growth-strategy" data-export="pareto-growth-strategy">
          <ParetoGrowthStrategy visualizationOnly />
        </div>
      </div>
    </div>
  );
}
