import {
  AlertTriangle,
  Archive,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  FileSearch,
  Link2,
  Pencil,
  RotateCcw,
  ShieldQuestion,
} from "lucide-react";
import { useMemo, useState } from "react";
import type {
  Artifact,
  Claim,
  EvidenceState,
  Reconstruction,
  ReviewDecision,
} from "../types";

interface ReviewWorkspaceProps {
  reconstruction: Reconstruction;
  artifacts: Artifact[];
  decisions: Record<string, ReviewDecision>;
  onDecision: (claim: Claim, decision: ReviewDecision, note?: string) => void;
  onUpdateClaim: (claimId: string, value: string) => void;
  onOpenEvidence: (claimId: string, sourceId?: string) => void;
  onBack: () => void;
  onConfirmState: () => void;
}

const stateMeta: Record<
  EvidenceState,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  explicit: { label: "Source stated", icon: CheckCircle2, className: "explicit" },
  inferred: { label: "Needs confirmation", icon: ShieldQuestion, className: "inferred" },
  conflicting: { label: "Conflict", icon: AlertTriangle, className: "conflicting" },
  missing: { label: "Not found", icon: CircleHelp, className: "missing" },
  obsolete: { label: "Obsolete", icon: Archive, className: "obsolete" },
};

const reviewRequired = new Set<EvidenceState>(["inferred", "conflicting", "missing"]);

function StateMarker({ state }: { state: EvidenceState }) {
  const meta = stateMeta[state];
  const Icon = meta.icon;

  return (
    <span className={`state-marker state-marker--${meta.className}`}>
      <Icon size={14} aria-hidden="true" />
      {meta.label}
    </span>
  );
}

function categoryTitle(category: Claim["category"]) {
  const titles: Record<Claim["category"], string> = {
    commitment: "Commitment",
    change: "What changed",
    progress: "Progress still valid",
    blocker: "Current blocker",
    timing: "Timing",
    unknown: "Open question",
  };
  return titles[category];
}

export function ReviewWorkspace({
  reconstruction,
  artifacts,
  decisions,
  onDecision,
  onUpdateClaim,
  onOpenEvidence,
  onBack,
  onConfirmState,
}: ReviewWorkspaceProps) {
  const [editingClaimId, setEditingClaimId] = useState<string | null>(null);
  const [draftValue, setDraftValue] = useState("");
  const [expandedConflict, setExpandedConflict] = useState<string | null>(null);

  const claimsRequiringReview = useMemo(
    () => reconstruction.claims.filter((claim) => reviewRequired.has(claim.state)),
    [reconstruction.claims],
  );
  const pendingClaims = claimsRequiringReview.filter((claim) => !decisions[claim.id]);

  function beginEdit(claim: Claim) {
    setEditingClaimId(claim.id);
    setDraftValue(claim.value);
  }

  function saveEdit(claim: Claim) {
    if (!draftValue.trim()) return;
    onUpdateClaim(claim.id, draftValue.trim());
    onDecision(claim, "corrected", "Value corrected by the user.");
    setEditingClaimId(null);
  }

  function reviewNext() {
    const next = pendingClaims[0];
    if (!next) return;
    onOpenEvidence(next.id, next.evidence[0]?.sourceId);
  }

  function resolveConflict(claim: Claim, optionId: string) {
    const conflict = reconstruction.conflicts.find((item) => item.id === "deadline-conflict");
    const option = conflict?.options.find((item) => item.id === optionId);
    if (!option) return;

    onUpdateClaim(claim.id, `${option.label}: ${option.value}`);
    onDecision(claim, "corrected", `Resolved using ${option.label}.`);
    setExpandedConflict(null);
  }

  return (
    <main className="workspace workspace--review" aria-labelledby="review-title">
      <header className="workspace-heading review-heading">
        <div>
          <button className="back-link" type="button" onClick={onBack}>
            <ArrowLeft size={15} aria-hidden="true" />
            Sources
          </button>
          <p className="eyebrow">Current-state brief</p>
          <h1 id="review-title">{reconstruction.commitment.title}</h1>
          <p className="heading-copy">{reconstruction.commitment.summary}</p>
        </div>
        <div className="commitment-meta">
          <span className="health-indicator">
            <span aria-hidden="true" />
            {reconstruction.commitment.healthLabel}
          </span>
          <dl>
            <div><dt>Owner</dt><dd>{reconstruction.commitment.owner}</dd></div>
            <div><dt>Deadline</dt><dd>{reconstruction.commitment.deadline}</dd></div>
          </dl>
        </div>
      </header>

      <div className="review-summary-bar">
        <div className="review-summary-status">
          <CheckCircle2 size={17} aria-hidden="true" />
          <span><strong>{reconstruction.sufficiency.label}</strong>{reconstruction.sufficiency.note}</span>
        </div>
        <span className={`engine-badge engine-badge--${reconstruction.mode ?? "demo"}`}>
          {reconstruction.mode === "gemini" ? "Gemini" : "Guided demo"}
          {typeof reconstruction.durationMs === "number" ? ` · ${(reconstruction.durationMs / 1000).toFixed(1)}s` : ""}
        </span>
      </div>

      <section className="brief-section" data-tour="review-brief" aria-labelledby="brief-heading">
        <div className="section-heading-row section-heading-row--brief">
          <div>
            <p className="eyebrow">Reconstructed from {artifacts.filter((item) => item.selected).length} sources</p>
            <h2 id="brief-heading">What appears true now</h2>
          </div>
          <p>Inspect any claim. Correct anything that does not match reality.</p>
        </div>

        <div className="claim-list">
          {reconstruction.claims.map((claim, index) => {
            const meta = stateMeta[claim.state];
            const StateIcon = meta.icon;
            const decision = decisions[claim.id];
            const isEditing = editingClaimId === claim.id;
            const conflict = claim.state === "conflicting"
              ? reconstruction.conflicts.find((item) => item.id === "deadline-conflict")
              : null;

            return (
              <article
                className={`claim-row claim-row--${claim.state}${decision ? " claim-row--reviewed" : ""}`}
                id={`claim-${claim.id}`}
                key={claim.id}
              >
                <div className="claim-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
                <div className="claim-body">
                  <div className="claim-label-line">
                    <span>{categoryTitle(claim.category)}</span>
                    <StateMarker state={claim.state} />
                    {decision ? (
                      <span className="review-decision">
                        <Check size={13} aria-hidden="true" />
                        {decision === "unresolved" ? "Kept unresolved" : decision}
                      </span>
                    ) : null}
                  </div>

                  {isEditing ? (
                    <div className="claim-editor">
                      <textarea
                        autoFocus
                        value={draftValue}
                        onChange={(event) => setDraftValue(event.target.value)}
                        rows={3}
                      />
                      <div className="inline-actions">
                        <button className="text-button" type="button" onClick={() => setEditingClaimId(null)}>Cancel</button>
                        <button className="primary-button primary-button--compact" type="button" onClick={() => saveEdit(claim)}>Save correction</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3>{claim.label}</h3>
                      <p>{claim.value}</p>
                      {claim.reviewNote ? <p className="claim-note">{claim.reviewNote}</p> : null}
                    </>
                  )}

                  {conflict && expandedConflict === claim.id && !decision ? (
                    <div className="conflict-options" aria-label="Conflict resolution options">
                      <div className="conflict-heading">
                        <AlertTriangle size={16} aria-hidden="true" />
                        <span><strong>{conflict.title}</strong>{conflict.description}</span>
                      </div>
                      {conflict.options.map((option) => (
                        <button
                          className="conflict-option"
                          data-tour={option.id === "client-deadline" ? "deadline-option" : undefined}
                          key={option.id}
                          type="button"
                          onClick={() => resolveConflict(claim, option.id)}
                        >
                          <span><strong>{option.label}</strong>{option.value}</span>
                          <small>{option.reason}</small>
                          <ChevronRight size={17} aria-hidden="true" />
                        </button>
                      ))}
                      <button className="text-button" type="button" onClick={() => onDecision(claim, "unresolved", "Conflict intentionally left unresolved.")}>Keep unresolved</button>
                    </div>
                  ) : null}

                  {!decision && reviewRequired.has(claim.state) && !isEditing && expandedConflict !== claim.id ? (
                    <div className="claim-review-actions">
                      {claim.state === "inferred" ? (
                        <>
                          <button data-tour="confirm-inference" type="button" onClick={() => onDecision(claim, "confirmed")}>Confirm</button>
                          <button type="button" onClick={() => beginEdit(claim)}>Correct</button>
                          <button type="button" onClick={() => onDecision(claim, "rejected")}>Reject</button>
                        </>
                      ) : null}
                      {claim.state === "conflicting" ? (
                        <button data-tour="resolve-conflict" type="button" onClick={() => setExpandedConflict(claim.id)}>
                          <AlertTriangle size={14} aria-hidden="true" /> Resolve conflict
                        </button>
                      ) : null}
                      {claim.state === "missing" ? (
                        <>
                          <button type="button" onClick={() => beginEdit(claim)}>Add answer</button>
                          <button data-tour="preserve-unknown" type="button" onClick={() => onDecision(claim, "unresolved")}>Keep unresolved</button>
                        </>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="claim-tools">
                  <button
                    className="evidence-link"
                    data-tour={claim.state === "inferred" ? "inspect-evidence" : undefined}
                    type="button"
                    onClick={() => onOpenEvidence(claim.id, claim.evidence[0]?.sourceId)}
                  >
                    <Link2 size={14} aria-hidden="true" />
                    {claim.evidence.length} {claim.evidence.length === 1 ? "source" : "sources"}
                  </button>
                  {!isEditing ? (
                    <button className="icon-button" type="button" title="Correct claim" aria-label={`Correct ${claim.label}`} onClick={() => beginEdit(claim)}>
                      <Pencil size={15} aria-hidden="true" />
                    </button>
                  ) : null}
                </div>

                <span className={`claim-state-rail claim-state-rail--${meta.className}`} aria-hidden="true">
                  <StateIcon size={13} />
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <details className="obsolete-history">
        <summary><Archive size={15} aria-hidden="true" /> Obsolete evidence remains in history</summary>
        <p>Superseded facts stay inspectable and reversible. They are never silently deleted from the recovery trace.</p>
      </details>

      <div className="action-dock">
        <div>
          <span className="dock-kicker">Review current state</span>
          <strong>
            {pendingClaims.length === 0
              ? "Ready to confirm"
              : `${pendingClaims.length} ${pendingClaims.length === 1 ? "item needs" : "items need"} your decision`}
          </strong>
        </div>
        <div className="dock-actions">
          {pendingClaims.length > 0 ? (
            <button className="secondary-button" type="button" onClick={reviewNext}>
              <FileSearch size={16} aria-hidden="true" />
              Review next
            </button>
          ) : (
            <button className="secondary-button" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <RotateCcw size={16} aria-hidden="true" />
              Recheck brief
            </button>
          )}
          <button className="primary-button" data-tour="confirm-state" type="button" disabled={pendingClaims.length > 0} onClick={onConfirmState}>
            Confirm current state
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </main>
  );
}
