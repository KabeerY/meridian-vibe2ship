import {
  ArrowLeft,
  Ban,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleX,
  Hammer,
  MessageSquareText,
  Pause,
  Route,
  Wrench,
} from "lucide-react";
import type { RecoveryPath, RecoveryPathType, Reconstruction } from "../types";

interface RecoveryWorkspaceProps {
  reconstruction: Reconstruction;
  selectedPath: RecoveryPathType | null;
  onSelect: (path: RecoveryPathType) => void;
  onBack: () => void;
  onPrepare: () => void;
}

const pathIcons: Record<RecoveryPathType, typeof Wrench> = {
  repair: Wrench,
  delay: Pause,
  rebuild: Hammer,
  drop: CircleX,
  renegotiate: MessageSquareText,
};

function PathOption({
  path,
  selected,
  onSelect,
}: {
  path: RecoveryPath;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = pathIcons[path.type];

  return (
    <button
      className={`path-option${selected ? " path-option--selected" : ""}${!path.available ? " path-option--unavailable" : ""}`}
      type="button"
      disabled={!path.available}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className="path-icon"><Icon size={19} strokeWidth={1.8} aria-hidden="true" /></span>
      <span className="path-option-copy">
        <span className="path-title-line">
          <strong>{path.title}</strong>
          {path.recommended ? <small>Best fit</small> : null}
          {!path.available ? <small className="unavailable-label"><Ban size={12} /> Not supported</small> : null}
        </span>
        <span>{path.summary}</span>
      </span>
      <ChevronRight size={17} aria-hidden="true" />
    </button>
  );
}

export function RecoveryWorkspace({
  reconstruction,
  selectedPath,
  onSelect,
  onBack,
  onPrepare,
}: RecoveryWorkspaceProps) {
  const activePath = reconstruction.paths.find((path) => path.type === selectedPath) ?? null;

  return (
    <main className="workspace workspace--recovery" aria-labelledby="recovery-title">
      <header className="workspace-heading recovery-heading">
        <div>
          <button className="back-link" type="button" onClick={onBack}>
            <ArrowLeft size={15} aria-hidden="true" />
            Current state
          </button>
          <p className="eyebrow">Recovery decision</p>
          <h1 id="recovery-title">Choose what happens next.</h1>
          <p className="heading-copy">
            The state is confirmed. These paths reflect the evidence, remaining time, and known constraints.
          </p>
        </div>
        <div className="state-confirmed-stamp">
          <CheckCircle2 size={18} aria-hidden="true" />
          <span><strong>Current state confirmed</strong>{reconstruction.commitment.title} · {reconstruction.commitment.deadline}</span>
        </div>
      </header>

      <div className="recovery-layout">
        <section className="path-list-section" aria-labelledby="paths-heading">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Available paths</p>
              <h2 id="paths-heading">Different choices, different consequences</h2>
            </div>
          </div>
          <div className="path-list">
            {reconstruction.paths.map((path) => (
              <PathOption
                key={path.type}
                path={path}
                selected={path.type === selectedPath}
                onSelect={() => onSelect(path.type)}
              />
            ))}
          </div>
        </section>

        <aside className={`path-detail${activePath ? " path-detail--active" : ""}`} aria-live="polite">
          {activePath ? (
            <>
              <div className="path-detail-heading">
                <span className="path-detail-icon">
                  {(() => {
                    const Icon = pathIcons[activePath.type];
                    return <Icon size={22} strokeWidth={1.7} aria-hidden="true" />;
                  })()}
                </span>
                <div>
                  <p className="eyebrow">Selected path</p>
                  <h2>{activePath.title}</h2>
                </div>
              </div>
              <p className="path-detail-summary">{activePath.summary}</p>
              <dl className="path-detail-list">
                <div>
                  <dt><Route size={15} aria-hidden="true" /> Why it fits</dt>
                  <dd>{activePath.basis}</dd>
                </div>
                <div>
                  <dt><CalendarClock size={15} aria-hidden="true" /> Tradeoff</dt>
                  <dd>{activePath.consequence}</dd>
                </div>
                <div>
                  <dt><Wrench size={15} aria-hidden="true" /> First valid move</dt>
                  <dd>{activePath.nextMove}</dd>
                </div>
              </dl>
              <div className="authority-note">
                <CheckCircle2 size={15} aria-hidden="true" />
                You choose the path. Nothing external changes before approval.
              </div>
            </>
          ) : (
            <div className="path-detail-empty">
              <Route size={24} strokeWidth={1.5} aria-hidden="true" />
              <h2>Select a recovery path</h2>
              <p>Review its basis, tradeoff, and first move before continuing.</p>
            </div>
          )}
        </aside>
      </div>

      <div className="action-dock">
        <div>
          <span className="dock-kicker">Recovery path</span>
          <strong>{activePath ? activePath.title : "No path selected"}</strong>
        </div>
        <button className="primary-button" type="button" disabled={!activePath} onClick={onPrepare}>
          Prepare next move
          <ChevronRight size={17} aria-hidden="true" />
        </button>
      </div>
    </main>
  );
}
