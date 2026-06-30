import {
  CalendarDays,
  Check,
  FilePlus2,
  FileText,
  GitPullRequest,
  Mail,
  MessageSquareText,
  NotebookTabs,
  Plus,
  RotateCcw,
  ListTodo,
  ShieldCheck,
  StickyNote,
  Trash2,
  Upload,
  Workflow,
} from "lucide-react";
import { useRef, useState } from "react";
import type { Artifact, ArtifactKind } from "../types";

interface ArtifactIntakeProps {
  artifacts: Artifact[];
  isAnalyzing: boolean;
  error: string | null;
  onToggle: (id: string) => void;
  onAdd: (artifact: Artifact) => void;
  onRemove: (id: string) => void;
  onReset: () => void;
  onAnalyze: () => void;
}

const kindMeta: Record<ArtifactKind, { label: string; icon: typeof Mail }> = {
  email: { label: "Email", icon: Mail },
  chat: { label: "Chat", icon: MessageSquareText },
  code: { label: "Code review", icon: GitPullRequest },
  task: { label: "Task", icon: ListTodo },
  ci: { label: "CI run", icon: Workflow },
  meeting: { label: "Meeting notes", icon: NotebookTabs },
  document: { label: "Document", icon: FileText },
  calendar: { label: "Calendar", icon: CalendarDays },
  note: { label: "Note", icon: StickyNote },
  upload: { label: "Uploaded file", icon: Upload },
};

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return timestamp;

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function ArtifactIntake({
  artifacts,
  isAnalyzing,
  error,
  onToggle,
  onAdd,
  onRemove,
  onReset,
  onAnalyze,
}: ArtifactIntakeProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPaste, setShowPaste] = useState(false);
  const [pasteTitle, setPasteTitle] = useState("");
  const [pasteContent, setPasteContent] = useState("");
  const selectedCount = artifacts.filter((artifact) => artifact.selected).length;

  async function handleFiles(files: FileList | null) {
    if (!files) return;

    for (const file of Array.from(files).slice(0, 5)) {
      const content = await file.text();
      if (!content.trim()) continue;

      onAdd({
        id: `upload-${crypto.randomUUID()}`,
        kind: "upload",
        title: file.name,
        source: "Local upload",
        author: "You",
        timestamp: new Date(file.lastModified || Date.now()).toISOString(),
        content: content.slice(0, 20_000),
        selected: true,
      });
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function addPastedSource() {
    if (!pasteTitle.trim() || !pasteContent.trim()) return;

    onAdd({
      id: `note-${crypto.randomUUID()}`,
      kind: "note",
      title: pasteTitle.trim(),
      source: "Pasted context",
      author: "You",
      timestamp: new Date().toISOString(),
      content: pasteContent.trim().slice(0, 20_000),
      selected: true,
    });
    setPasteTitle("");
    setPasteContent("");
    setShowPaste(false);
  }

  return (
    <main className="workspace workspace--intake" aria-labelledby="intake-title">
      <header className="workspace-heading intake-heading">
        <div>
          <p className="eyebrow">One commitment</p>
          <h1 id="intake-title">Bring the pieces together.</h1>
          <p className="heading-copy">
            Select the artifacts that describe what was promised, what changed, and where the work stopped.
          </p>
        </div>
        <button className="quiet-button" type="button" onClick={onReset}>
          <RotateCcw size={15} aria-hidden="true" />
          Reset demo
        </button>
      </header>

      <div className="intake-layout">
        <section className="artifact-section" aria-labelledby="artifact-heading">
          <div className="section-heading-row">
            <div>
              <h2 id="artifact-heading">Selected evidence</h2>
              <p>{selectedCount} of {artifacts.length} sources included</p>
            </div>
            <div className="add-source-actions">
              <input
                ref={fileInputRef}
                className="visually-hidden"
                type="file"
                multiple
                accept=".txt,.md,.csv,.json,text/plain,text/markdown,text/csv,application/json"
                onChange={(event) => void handleFiles(event.target.files)}
              />
              <button className="secondary-button" type="button" onClick={() => fileInputRef.current?.click()}>
                <FilePlus2 size={16} aria-hidden="true" />
                Add files
              </button>
              <button className="secondary-button" type="button" onClick={() => setShowPaste((value) => !value)}>
                <Plus size={16} aria-hidden="true" />
                Paste source
              </button>
            </div>
          </div>

          {showPaste ? (
            <div className="paste-source-panel">
              <label>
                Source title
                <input
                  autoFocus
                  value={pasteTitle}
                  onChange={(event) => setPasteTitle(event.target.value)}
                  placeholder="e.g. Latest client message"
                />
              </label>
              <label>
                Source content
                <textarea
                  value={pasteContent}
                  onChange={(event) => setPasteContent(event.target.value)}
                  placeholder="Paste the relevant email, note, transcript, or requirement here."
                  rows={5}
                />
              </label>
              <div className="inline-actions">
                <button className="text-button" type="button" onClick={() => setShowPaste(false)}>
                  Cancel
                </button>
                <button
                  className="primary-button primary-button--compact"
                  type="button"
                  disabled={!pasteTitle.trim() || !pasteContent.trim()}
                  onClick={addPastedSource}
                >
                  Add source
                </button>
              </div>
            </div>
          ) : null}

          <div className="artifact-list">
            {artifacts.map((artifact) => {
              const meta = kindMeta[artifact.kind];
              const Icon = meta.icon;
              const isCustom = artifact.id.startsWith("upload-") || artifact.id.startsWith("note-");

              return (
                <article
                  className={`artifact-row${artifact.selected ? " artifact-row--selected" : ""}`}
                  key={artifact.id}
                >
                  <button
                    className="artifact-select"
                    type="button"
                    aria-pressed={artifact.selected}
                    aria-label={`${artifact.selected ? "Exclude" : "Include"} ${artifact.title}`}
                    onClick={() => onToggle(artifact.id)}
                  >
                    <span className="selection-box">{artifact.selected ? <Check size={14} aria-hidden="true" /> : null}</span>
                  </button>
                  <span className="artifact-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <div className="artifact-copy">
                    <div className="artifact-title-line">
                      <h3>{artifact.title}</h3>
                      <span>{meta.label}</span>
                    </div>
                    <p>{artifact.author} · {artifact.source} · {formatTimestamp(artifact.timestamp)}</p>
                    <p className="artifact-preview">{artifact.content}</p>
                  </div>
                  {isCustom ? (
                    <button
                      className="icon-button"
                      type="button"
                      title="Remove source"
                      aria-label={`Remove ${artifact.title}`}
                      onClick={() => onRemove(artifact.id)}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <aside className="sufficiency-panel" aria-label="Evidence sufficiency">
          <span className="sufficiency-icon"><ShieldCheck size={19} aria-hidden="true" /></span>
          <p className="eyebrow">Evidence check</p>
          <h2>{selectedCount >= 4 ? "Enough to begin" : selectedCount >= 2 ? "A partial picture" : "More context needed"}</h2>
          <p>
            {selectedCount >= 4
              ? "The selected sources cover scope, progress, timing, and the main dependency. You will verify every inferred fact."
              : selectedCount >= 2
                ? "Reconstruction can begin, but missing sources may leave important questions unresolved."
                : "Select at least two sources that describe the same commitment."}
          </p>
          <div className="privacy-note">
            <ShieldCheck size={15} aria-hidden="true" />
            Only these selected artifacts are analyzed. Meridian does not save uploaded source text.
          </div>
        </aside>
      </div>

      {error ? <div className="error-banner" role="alert">{error}</div> : null}

      <div className="action-dock action-dock--intake">
        <div>
          <span className="dock-kicker">Ready to reconstruct</span>
          <strong>{selectedCount} sources · one commitment</strong>
        </div>
        <button className="primary-button" type="button" disabled={selectedCount < 2 || isAnalyzing} onClick={onAnalyze}>
          {isAnalyzing ? "Reconstructing…" : "Reconstruct current state"}
        </button>
      </div>

      {isAnalyzing ? (
        <div className="analysis-overlay" role="status" aria-live="polite">
          <div className="analysis-panel">
            <span className="analysis-mark"><span /></span>
            <p className="eyebrow">Reconstructing current state</p>
            <h2>Comparing what changed across {selectedCount} sources.</h2>
            <div className="analysis-steps">
              <span className="analysis-step analysis-step--done"><Check size={14} /> Commitments extracted</span>
              <span className="analysis-step analysis-step--active"><span className="mini-spinner" /> Contradictions checked</span>
              <span className="analysis-step"><span /> Recovery paths evaluated</span>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
