export type WorkspaceStep = "sources" | "review" | "recovery" | "approve";

export type ArtifactKind =
  | "email"
  | "chat"
  | "code"
  | "task"
  | "ci"
  | "meeting"
  | "document"
  | "calendar"
  | "note"
  | "upload";

export type EvidenceState =
  | "explicit"
  | "inferred"
  | "conflicting"
  | "missing"
  | "obsolete";

export type ClaimCategory =
  | "commitment"
  | "change"
  | "progress"
  | "blocker"
  | "unknown"
  | "timing";

export type RecoveryPathType =
  | "repair"
  | "delay"
  | "rebuild"
  | "drop"
  | "renegotiate";

export interface Artifact {
  id: string;
  kind: ArtifactKind;
  title: string;
  source: string;
  author: string;
  timestamp: string;
  content: string;
  selected: boolean;
}

export interface EvidenceLink {
  sourceId: string;
  quote: string;
  relationship: string;
}

export interface Claim {
  id: string;
  category: ClaimCategory;
  label: string;
  value: string;
  state: EvidenceState;
  evidence: EvidenceLink[];
  reviewNote?: string;
}

export interface ConflictOption {
  id: string;
  sourceId: string;
  label: string;
  value: string;
  reason: string;
}

export interface Conflict {
  id: string;
  title: string;
  description: string;
  options: ConflictOption[];
}

export interface CommitmentState {
  title: string;
  owner: string;
  deadline: string;
  health: "on_track" | "at_risk" | "blocked";
  healthLabel: string;
  summary: string;
}

export interface RecoveryPath {
  type: RecoveryPathType;
  title: string;
  summary: string;
  basis: string;
  consequence: string;
  nextMove: string;
  steps: Array<{
    title: string;
    detail: string;
  }>;
  draft: string;
  available: boolean;
  recommended?: boolean;
}

export interface Reconstruction {
  commitment: CommitmentState;
  claims: Claim[];
  conflicts: Conflict[];
  paths: RecoveryPath[];
  sufficiency: {
    status: "enough" | "partial" | "insufficient";
    label: string;
    note: string;
  };
  generatedAt: string;
  mode?: "gemini" | "demo";
  durationMs?: number;
}

export type ReviewDecision = "confirmed" | "corrected" | "rejected" | "unresolved";

export type PersistenceStatus = "idle" | "saving" | "saved" | "session" | "error";

export interface TraceEvent {
  id: string;
  timestamp: string;
  title: string;
  detail: string;
  type: "system" | "evidence" | "correction" | "decision" | "approval";
}
