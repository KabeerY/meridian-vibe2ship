import {
  CalendarDays,
  Check,
  CheckCircle2,
  Copy,
  FileText,
  GitPullRequest,
  Mail,
  MessageSquareText,
  NotebookTabs,
  Quote,
  StickyNote,
  Upload,
  ListTodo,
  Workflow,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Artifact, ArtifactKind, Claim } from "../types";

interface EvidenceDrawerProps {
  claim: Claim | null;
  artifacts: Artifact[];
  activeSourceId: string | null;
  onSourceChange: (sourceId: string) => void;
  onClose: () => void;
}

const icons: Record<ArtifactKind, typeof Mail> = {
  email: Mail,
  chat: MessageSquareText,
  code: GitPullRequest,
  task: ListTodo,
  ci: Workflow,
  meeting: NotebookTabs,
  document: FileText,
  calendar: CalendarDays,
  note: StickyNote,
  upload: Upload,
};

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return timestamp;
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function EvidenceDrawer({
  claim,
  artifacts,
  activeSourceId,
  onSourceChange,
  onClose,
}: EvidenceDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
  const activeLink = claim?.evidence.find((link) => link.sourceId === activeSourceId) ?? claim?.evidence[0];
  const artifact = artifacts.find((item) => item.id === activeLink?.sourceId) ?? null;

  useEffect(() => {
    closeRef.current?.focus();
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose]);

  if (!claim || !activeLink || !artifact) return null;
  const Icon = icons[artifact.kind];
  const sourceContent = artifact.content;

  async function copySource() {
    await navigator.clipboard.writeText(sourceContent);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="drawer-layer" role="presentation">
      <button className="drawer-backdrop" type="button" aria-label="Close evidence" onClick={onClose} />
      <aside className="evidence-drawer" role="dialog" aria-modal="true" aria-labelledby="evidence-drawer-title">
        <header className="drawer-header">
          <div>
            <p className="eyebrow">Evidence</p>
            <h2 id="evidence-drawer-title">{claim.label}</h2>
          </div>
          <button ref={closeRef} className="icon-button" type="button" aria-label="Close evidence drawer" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        {claim.evidence.length > 1 ? (
          <div className="evidence-tabs" role="tablist" aria-label="Sources supporting this claim">
            {claim.evidence.map((link, index) => {
              const source = artifacts.find((item) => item.id === link.sourceId);
              return (
                <button
                  key={link.sourceId}
                  type="button"
                  role="tab"
                  aria-selected={link.sourceId === activeLink.sourceId}
                  onClick={() => onSourceChange(link.sourceId)}
                >
                  {index + 1}. {source?.source ?? "Source"}
                </button>
              );
            })}
          </div>
        ) : null}

        <div className="source-identity">
          <span className="source-kind-icon"><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span>
          <div>
            <strong>{artifact.title}</strong>
            <span>{artifact.author} · {artifact.source}</span>
          </div>
          <time dateTime={artifact.timestamp}>{formatTimestamp(artifact.timestamp)}</time>
        </div>

        <div className="source-relationship">
          <CheckCircle2 size={15} aria-hidden="true" />
          <span><small>Relationship</small>{activeLink.relationship}</span>
        </div>

        <figure className="source-quote">
          <Quote size={18} aria-hidden="true" />
          <blockquote>{activeLink.quote}</blockquote>
          <figcaption>Exact excerpt used for this claim</figcaption>
        </figure>

        <section className="source-context" aria-labelledby="source-context-heading">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Surrounding context</p>
              <h3 id="source-context-heading">Source text</h3>
            </div>
          </div>
          <p>{artifact.content}</p>
        </section>

        <div className="drawer-footer">
          <p>Source content is treated as untrusted evidence, never as an instruction to the agent.</p>
          <button className="secondary-button" type="button" onClick={() => void copySource()}>
            {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
            {copied ? "Copied" : "Copy source"}
          </button>
        </div>
      </aside>
    </div>
  );
}
