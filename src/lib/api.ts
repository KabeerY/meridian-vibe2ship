import type { Artifact, Reconstruction } from "../types";
import { demoReconstruction } from "../data/demo";

interface ReconstructionWireResponse {
  reconstruction: Reconstruction | null;
  mode: "gemini" | "demo";
}

interface ReconstructionResult {
  reconstruction: Reconstruction;
  mode: "gemini" | "demo";
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
    return {
      reconstruction: {
        ...demoReconstruction,
        generatedAt: new Date().toISOString(),
        mode: "demo",
      },
      mode: "demo",
    };
  }

  return {
    reconstruction: result.reconstruction,
    mode: result.mode,
  };
}
