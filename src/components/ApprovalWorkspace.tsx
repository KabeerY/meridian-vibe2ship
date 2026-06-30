import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clipboard,
  Clock3,
  Copy,
  Database,
  FileCheck2,
  History,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import type { PersistenceStatus, RecoveryPath, Reconstruction } from "../types";

interface ApprovalWorkspaceProps {
  reconstruction: Reconstruction;
  path: RecoveryPath;
  draft: string;
  approved: boolean;
  persistenceStatus: PersistenceStatus;
  recoveryId: string | null;
  onDraftChange: (value: string) => void;
  onApprove: () => void;
  onBack: () => void;
  onRestart: () => void;
}

export function ApprovalWorkspace({
  reconstruction,
  path,
  draft,
  approved,
  persistenceStatus,
  recoveryId,
  onDraftChange,
  onApprove,
  onBack,
  onRestart,
}: ApprovalWorkspaceProps) {
  const [copied, setCopied] = useState(false);

  async function copyDraft() {
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  if (approved) {
    return (
      <main className="workspace workspace--approved" aria-labelledby="approved-title">
        <section className="approved-hero">
          <span className="approved-mark"><Check size={25} aria-hidden="true" /></span>
          <p className="eyebrow">Recovery ready</p>
          <h1 id="approved-title">The comeback has a clear first move.</h1>
          <p>
            Your confirmed state, chosen path, and approved plan are preserved together. Complete source artifacts are not stored.
          </p>
        </section>

        <div className="approved-summary">
          <div className="approved-summary-heading">
            <div>
              <span>{reconstruction.commitment.title}</span>
              <h2>{path.title}</h2>
            </div>
            <span className="approved-status"><CheckCircle2 size={15} /> Approved</span>
          </div>
          <div className="approved-next-move">
            <p className="eyebrow">First valid move</p>
            <strong>{path.nextMove}</strong>
          </div>
          <div className="approved-grid">
            <div><Clock3 size={16} /><span><small>Deadline</small>{reconstruction.commitment.deadline}</span></div>
            <div><ShieldCheck size={16} /><span><small>Authority</small>User approved</span></div>
            <div>
              {persistenceStatus === "saved" ? <Database size={16} /> : <History size={16} />}
              <span>
                <small>Recovery record</small>
                {persistenceStatus === "saving" ? "Saving securely..." : null}
                {persistenceStatus === "saved" ? `Cloud saved${recoveryId ? ` · ${recoveryId.slice(0, 8)}` : ""}` : null}
                {persistenceStatus === "session" ? "Session mode" : null}
                {persistenceStatus === "error" ? "Cloud save unavailable" : null}
              </span>
            </div>
          </div>
        </div>

        <div className="approved-actions">
          <button className="secondary-button" type="button" onClick={() => void copyDraft()}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy status draft"}
          </button>
          <button className="primary-button" type="button" onClick={onRestart}>
            <RotateCcw size={16} />
            Recover another commitment
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="workspace workspace--approval" aria-labelledby="approval-title">
      <header className="workspace-heading approval-heading">
        <div>
          <button className="back-link" type="button" onClick={onBack}>
            <ArrowLeft size={15} aria-hidden="true" />
            Recovery paths
          </button>
          <p className="eyebrow">Approved next move</p>
          <h1 id="approval-title">Review the plan before it becomes active.</h1>
          <p className="heading-copy">The draft is editable. Approval records your decision; it does not send anything externally.</p>
        </div>
        <div className="approval-safety-note">
          <ShieldCheck size={18} aria-hidden="true" />
          <span><strong>Human-controlled</strong>Nothing changes until you approve.</span>
        </div>
      </header>

      <div className="approval-layout">
        <section className="next-move-section" aria-labelledby="next-move-heading">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">{path.title}</p>
              <h2 id="next-move-heading">One locally executable next move</h2>
            </div>
            <span className="draft-label">Draft</span>
          </div>

          <div className="next-move-statement">
            <span className="next-move-number">01</span>
            <strong>{path.nextMove}</strong>
          </div>

          <ol className="recovery-checklist">
            {path.steps.map((step, index) => (
              <li key={`${step.title}-${index}`}>
                <span>{index + 1}</span>
                <div><strong>{step.title}</strong><p>{step.detail}</p></div>
              </li>
            ))}
          </ol>

          <div className="plan-boundary">
            <FileCheck2 size={16} aria-hidden="true" />
            <p><strong>Plan boundary</strong>This plan uses confirmed evidence only and does not treat blank calendar time as free.</p>
          </div>
        </section>

        <section className="draft-section" aria-labelledby="draft-heading">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Optional stakeholder update</p>
              <h2 id="draft-heading">Status draft</h2>
            </div>
            <Clipboard size={18} aria-hidden="true" />
          </div>
          <textarea
            aria-label="Editable stakeholder status draft"
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            rows={11}
          />
          <div className="draft-footer">
            <span>Editable · Not sent</span>
            <button className="text-button" type="button" onClick={() => void copyDraft()}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </section>
      </div>

      <div className="action-dock action-dock--approval">
        <div>
          <span className="dock-kicker">Consequence</span>
          <strong>Record this recovery plan and first move</strong>
        </div>
        <button className="primary-button" type="button" onClick={onApprove}>
          <ShieldCheck size={17} aria-hidden="true" />
          Approve recovery plan
        </button>
      </div>
    </main>
  );
}
