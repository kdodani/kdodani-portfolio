import type { Metadata } from "next";
import { AiBuildsPage } from "@/components/ai-builds/AiBuildsPage";

export const metadata: Metadata = {
  title: "AI Builds",
  description:
    "Hands-on AI projects: a healthcare ops intake specialist agent, an AI-built PM portfolio, and PM copilot workflows.",
};

export default function Page() {
  return <AiBuildsPage />;
}
