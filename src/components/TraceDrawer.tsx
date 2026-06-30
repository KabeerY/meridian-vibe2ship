import {
  CheckCircle2,
  FileSearch,
  History,
  PencilLine,
  Route,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";
import type { TraceEvent } from "../types";

interface TraceDrawerProps {
  events: TraceEvent[];
  onClose: () => void;
}

const traceIcons: Record<TraceEvent["type"], typeof History> = {
  system: History,
  evidence: FileSearch,
  correction: PencilLine,
  decision: Route,
  approval: ShieldCheck,
};

function formatTime(timestamp: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function TraceDrawer({ events, onClose }: TraceDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose]);

  return (
    <div className="drawer-layer drawer-layer--right" role="presentation">
      <button className="drawer-backdrop" type="button" aria-label="Close recovery trace" onClick={onClose} />
      <aside className="trace-drawer" role="dialog" aria-modal="true" aria-labelledby="trace-title">
        <header className="drawer-header">
          <div>
            <p className="eyebrow">Trace and rollback</p>
            <h2 id="trace-title">Recovery history</h2>
          </div>
          <button ref={closeRef} className="icon-button" type="button" aria-label="Close recovery history" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="trace-assurance">
          <CheckCircle2 size={16} aria-hidden="true" />
          Every inference, correction, decision, and approval remains inspectable.
        </div>

        <ol className="trace-list">
          {[...events].reverse().map((event) => {
            const Icon = traceIcons[event.type];
            return (
              <li key={event.id}>
                <span className={`trace-icon trace-icon--${event.type}`}><Icon size={15} aria-hidden="true" /></span>
                <div>
                  <div><strong>{event.title}</strong><time dateTime={event.timestamp}>{formatTime(event.timestamp)}</time></div>
                  <p>{event.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="drawer-footer drawer-footer--trace">
          <p>Rollback controls appear after a retained state change. External actions are never reversed silently.</p>
        </div>
      </aside>
    </div>
  );
}
