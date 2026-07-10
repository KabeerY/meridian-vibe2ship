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
  mode: "gemini" | "gemma" | "demo";
  warning?: string;
}

interface ReconstructionResult {
  reconstruction: Reconstruction;
  mode: "gemini" | "gemma" | "demo";
  warning?: string;
}

interface ReconstructionOptions {
  timeoutMs?: number;
}

export async function reconstructCommitment(
  artifacts: Artifact[],
  options: ReconstructionOptions = {},
): Promise<ReconstructionResult> {
  const selected = artifacts.filter((artifact) => artifact.selected);
  const demoIds = new Set(demoArtifacts.map((artifact) => artifact.id));
  const isDemoScenario = selected.length >= 2 && selected.every((artifact) => demoIds.has(artifact.id));
  const demoFallback = (warning?: string): ReconstructionResult => ({
    reconstruction: {
      ...demoReconstruction,
      generatedAt: new Date().toISOString(),
      mode: "demo",
    },
    mode: "demo",
    warning: warning ?? "Live AI is temporarily unavailable. The verified guided demo brief is being used.",
  });
  const controller = options.timeoutMs ? new AbortController() : null;
  const timeout = options.timeoutMs && controller
    ? window.setTimeout(() => controller.abort(), options.timeoutMs)
    : null;

  let response: Response;
  try {
    response = await fetch("/api/reconstruct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artifacts: selected }),
      signal: controller?.signal,
    });
  } catch (error) {
    if (isDemoScenario) {
      return demoFallback(error instanceof DOMException && error.name === "AbortError"
        ? "Live AI did not finish within the demo time window. The verified guided brief is being used."
        : undefined);
    }
    throw new Error("Live AI is unavailable. Try again later or use the guided demo sources.");
  } finally {
    if (timeout) window.clearTimeout(timeout);
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    if (isDemoScenario) return demoFallback(body?.error);
    throw new Error(body?.error ?? "The commitment could not be reconstructed.");
  }

  let result: ReconstructionWireResponse;
  try {
    result = (await response.json()) as ReconstructionWireResponse;
  } catch {
    if (isDemoScenario) return demoFallback();
    throw new Error("The reconstruction response was not readable.");
  }

  if (!result.reconstruction) {
    if (!isDemoScenario) {
      throw new Error(result.warning ?? "Live AI is unavailable. Use the guided demo sources or try again later.");
    }
    return demoFallback(result.warning);
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
