import {
  CheckCircle2,
  CircleHelp,
  FileSearch,
  GitBranch,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";
import type { WorkspaceStep } from "../types";

const guideSteps: Array<{
  id: WorkspaceStep;
  title: string;
  detail: string;
  icon: typeof FileSearch;
}> = [
  {
    id: "sources",
    title: "Bring only the relevant evidence",
    detail: "Select the artifacts that show the promise, what changed, progress, blockers, and timing.",
    icon: FileSearch,
  },
  {
    id: "review",
    title: "Make the current state trustworthy",
    detail: "Inspect sources behind uncertain claims. Confirm, correct, reject, or preserve unknowns.",
    icon: CheckCircle2,
  },
  {
    id: "recovery",
    title: "Choose the right kind of comeback",
    detail: "Compare repair, deliberate delay, rebuild, drop, and renegotiate by evidence and consequence.",
    icon: GitBranch,
  },
  {
    id: "approve",
    title: "Keep consequential action human-controlled",
    detail: "Edit the next move and stakeholder draft. Nothing is sent or changed automatically.",
    icon: ShieldCheck,
  },
];

export function GuidanceDrawer({
  currentStep,
  firstVisit,
  onClose,
  onStartGuide,
}: {
  currentStep: WorkspaceStep;
  firstVisit: boolean;
  onClose: () => void;
  onStartGuide: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="drawer-layer" role="presentation">
      <button className="drawer-backdrop" type="button" aria-label="Close guide" onClick={onClose} />
      <aside className="guidance-drawer" role="dialog" aria-modal="true" aria-labelledby="guide-title">
        <header className="drawer-header">
          <div>
            <p className="eyebrow">{firstVisit ? "Welcome to Meridian" : "Recovery guide"}</p>
            <h2 id="guide-title">Recover the plan before forcing the work.</h2>
          </div>
          <button ref={closeRef} className="icon-button" type="button" aria-label="Close guide" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="guide-intro">
          <Sparkles size={18} aria-hidden="true" />
          <p>
            Meridian is for one important commitment whose plan stopped matching reality. It reconstructs what is true before asking you to choose what happens next.
          </p>
        </div>

        <ol className="guide-step-list">
          {guideSteps.map((step, index) => {
            const Icon = step.icon;
            const active = step.id === currentStep;
            return (
              <li key={step.id} className={active ? "is-current" : ""}>
                <span className="guide-step-icon"><Icon size={16} aria-hidden="true" /></span>
                <div>
                  <small>Step {index + 1}</small>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="guide-boundary">
          <CircleHelp size={16} aria-hidden="true" />
          <p><strong>Not another task manager.</strong> The workflow begins only when an existing commitment becomes difficult to trust or resume.</p>
        </div>

        <div className="drawer-actions">
          <button className="primary-button" type="button" onClick={onStartGuide}>
            <Sparkles size={16} aria-hidden="true" />
            {firstVisit ? "Start guided recovery" : "Guide me from here"}
          </button>
          <button className="text-button" type="button" onClick={onClose}>Explore without guide</button>
        </div>
      </aside>
    </div>
  );
}

const coachContent: Record<WorkspaceStep, { kicker: string; title: string; detail: string }> = {
  sources: {
    kicker: "Guide 1 of 4",
    title: "Choose evidence for one disrupted commitment.",
    detail: "Keep sources that reveal the promise, a change, progress, a blocker, or timing. Then reconstruct the current state.",
  },
  review: {
    kicker: "Guide 2 of 4",
    title: "Review uncertainty before planning.",
    detail: "Open evidence for inferred, conflicting, and missing claims. Resolve what you can and preserve what you cannot know.",
  },
  recovery: {
    kicker: "Guide 3 of 4",
    title: "Pick the recovery type, not just a new date.",
    detail: "Compare each available path by its evidence, consequence, and first valid move.",
  },
  approve: {
    kicker: "Guide 4 of 4",
    title: "Make the comeback executable and safe.",
    detail: "Edit the plan or draft, then approve it. Approval records your choice; it never sends the message automatically.",
  },
};

export function GuideCoach({ step, approved, onEnd }: { step: WorkspaceStep; approved: boolean; onEnd: () => void }) {
  const content = coachContent[step];
  return (
    <section className={`guide-coach${approved ? " guide-coach--complete" : ""}`} aria-label="Guided recovery">
      <span className="guide-coach-mark">{approved ? <CheckCircle2 size={17} /> : <Sparkles size={17} />}</span>
      <div>
        <small>{approved ? "Guide complete" : content.kicker}</small>
        <strong>{approved ? "Your recovery now has a confirmed first move." : content.title}</strong>
        <p>{approved ? "The evidence, correction, decision, and approval trail remain available in Trace." : content.detail}</p>
      </div>
      <button className="text-button" type="button" onClick={onEnd}>{approved ? "Finish" : "End guide"}</button>
    </section>
  );
}
