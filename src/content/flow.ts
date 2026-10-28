/** Shared types for the workflow diagram used by the AI Builds. */

export type FlowKind = "input" | "llm" | "script" | "browser" | "human" | "output" | "future";

export type FlowNode = {
  id: string;
  label: string;
  detail: string;
  kind: FlowKind;
};

export const flowKindLabel: Record<FlowKind, string> = {
  input: "Input",
  llm: "LLM judgment",
  script: "Deterministic script",
  browser: "Browser agent",
  human: "Person decides",
  output: "Output",
  future: "Not built yet",
};
