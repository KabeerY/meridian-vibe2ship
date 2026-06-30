import type {
  Artifact,
  CopilotResponse,
  Reconstruction,
  RecoveryPath,
  ReviewDecision,
  TraceEvent,
  WorkspaceStep,
} from "../types";
import { demoArtifacts, demoReconstruction } from "../data/demo";

interface ReconstructionWireResponse {
  reconstruction: Reconstruction | null;
  mode: "gemini" | "demo";
  warning?: string;
}

interface ReconstructionResult {
  reconstruction: Reconstruction;
  mode: "gemini" | "demo";
  warning?: string;
}

export async function reconstructCommitment(artifacts: Artifact[]): Promise<ReconstructionResult> {
  const response = await fetch("/api/reconstruct", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      artifacts: artifacts.filter((artifact) => artifact.selected),
    }),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "The commitment could not be reconstructed.");
  }

  const result = (await response.json()) as ReconstructionWireResponse;

  if (!result.reconstruction) {
    const selected = artifacts.filter((artifact) => artifact.selected);
    const demoIds = new Set(demoArtifacts.map((artifact) => artifact.id));
    const isDemoScenario = selected.length >= 2 && selected.every((artifact) => demoIds.has(artifact.id));
    if (!isDemoScenario) {
      throw new Error(result.warning ?? "Live AI is unavailable. Use the guided demo sources or try again later.");
    }
    return {
      reconstruction: {
        ...demoReconstruction,
        generatedAt: new Date().toISOString(),
        mode: "demo",
      },
      mode: "demo",
      warning: result.warning,
    };
  }

  return {
    reconstruction: result.reconstruction,
    mode: result.mode,
    warning: result.warning,
  };
}

export async function askCopilot(input: {
  message: string;
  artifacts: Artifact[];
  reconstruction: Reconstruction | null;
  step: WorkspaceStep;
  selectedPath?: string | null;
  draft?: string;
}): Promise<CopilotResponse> {
  const response = await fetch("/api/copilot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...input,
      artifacts: input.artifacts.filter((artifact) => artifact.selected),
    }),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "Meridian could not answer that question.");
  }

  return response.json() as Promise<CopilotResponse>;
}

export async function persistRecovery(input: {
  reconstruction: Reconstruction;
  path: RecoveryPath;
  draft: string;
  decisions: Record<string, ReviewDecision>;
  trace: TraceEvent[];
}): Promise<{ persisted: boolean; id?: string }> {
  const response = await fetch("/api/recoveries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "The cloud recovery record could not be saved.");
  }

  return response.json() as Promise<{ persisted: boolean; id?: string }>;
}
