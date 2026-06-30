import {
  ArrowRight,
  Bot,
  ChevronRight,
  CircleHelp,
  FlaskConical,
  History,
  Menu,
  Sparkles,
  Waypoints,
  X,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ApprovalWorkspace } from "./components/ApprovalWorkspace";
import { ArtifactIntake } from "./components/ArtifactIntake";
import { CopilotDrawer } from "./components/CopilotDrawer";
import { DemoWorkspaceMenu } from "./components/DemoWorkspaceMenu";
import { EvidenceDrawer } from "./components/EvidenceDrawer";
import { GuidanceDrawer, GuideCoach } from "./components/GuidanceDrawer";
import { RecoveryWorkspace } from "./components/RecoveryWorkspace";
import { ReviewWorkspace } from "./components/ReviewWorkspace";
import { TraceDrawer } from "./components/TraceDrawer";
import { demoArtifacts, initialTrace } from "./data/demo";
import { persistRecovery, reconstructCommitment } from "./lib/api";
import type {
  Artifact,
  Claim,
  Reconstruction,
  PersistenceStatus,
  RecoveryPathType,
  ReviewDecision,
  TraceEvent,
  WorkspaceStep,
} from "./types";

const steps: Array<{ id: WorkspaceStep; label: string; shortLabel: string }> = [
  { id: "sources", label: "Sources", shortLabel: "Sources" },
  { id: "review", label: "Current state", shortLabel: "State" },
  { id: "recovery", label: "Recovery", shortLabel: "Recovery" },
  { id: "approve", label: "Approve", shortLabel: "Approve" },
];

function makeTrace(
  title: string,
  detail: string,
  type: TraceEvent["type"],
): TraceEvent {
  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    title,
    detail,
    type,
  };
}

function StageRail({
  current,
  currentComplete,
  onNavigate,
}: {
  current: WorkspaceStep;
  currentComplete: boolean;
  onNavigate: (step: WorkspaceStep) => void;
}) {
  const activeIndex = steps.findIndex((step) => step.id === current);

  return (
    <nav className="stage-rail" aria-label="Recovery progress">
      <ol>
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex || (currentComplete && index === activeIndex);
          const canNavigate = index <= activeIndex;

          return (
            <li key={step.id} className={`${isActive ? "is-active" : ""}${isComplete ? " is-complete" : ""}`}>
              <button
                type="button"
                disabled={!canNavigate}
                aria-current={isActive ? "step" : undefined}
                onClick={() => canNavigate && onNavigate(step.id)}
              >
                <span className="stage-number">{isComplete ? "✓" : index + 1}</span>
                <span className="stage-label"><span>{step.label}</span><small>{step.shortLabel}</small></span>
              </button>
              {index < steps.length - 1 ? <span className="stage-line" aria-hidden="true" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function App() {
  const [step, setStep] = useState<WorkspaceStep>("sources");
  const [artifacts, setArtifacts] = useState<Artifact[]>(demoArtifacts);
  const [reconstruction, setReconstruction] = useState<Reconstruction | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<Record<string, ReviewDecision>>({});
  const [selectedPath, setSelectedPath] = useState<RecoveryPathType | null>(null);
  const [draft, setDraft] = useState("");
  const [approved, setApproved] = useState(false);
  const [persistenceStatus, setPersistenceStatus] = useState<PersistenceStatus>("idle");
  const [recoveryId, setRecoveryId] = useState<string | null>(null);
  const [trace, setTrace] = useState<TraceEvent[]>(initialTrace);
  const [traceOpen, setTraceOpen] = useState(false);
  const [activeClaimId, setActiveClaimId] = useState<string | null>(null);
  const [activeSourceId, setActiveSourceId] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(() => window.localStorage.getItem("meridian-guide-seen") !== "true");
  const [guideActive, setGuideActive] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [analysisNotice, setAnalysisNotice] = useState<string | null>(null);

  const activeClaim = useMemo(
    () => reconstruction?.claims.find((claim) => claim.id === activeClaimId) ?? null,
    [activeClaimId, reconstruction],
  );

  const activePath = reconstruction?.paths.find((path) => path.type === selectedPath) ?? null;

  function addTrace(event: TraceEvent) {
    setTrace((events) => [...events, event]);
  }

  async function analyze() {
    setError(null);
    setIsAnalyzing(true);
    const startedAt = performance.now();
    try {
      const result = await reconstructCommitment(artifacts);
      const durationMs = Math.round(performance.now() - startedAt);
      setReconstruction({ ...result.reconstruction, durationMs });
      setDecisions({});
      setSelectedPath(null);
      setApproved(false);
      setPersistenceStatus("idle");
      setRecoveryId(null);
      setStep("review");
      setAnalysisNotice(result.warning ?? null);
      addTrace(
        makeTrace(
          "Current state reconstructed",
          `${artifacts.filter((artifact) => artifact.selected).length} sources compared with ${result.mode === "gemini" ? "Gemini" : "the guided demo model"} in ${(durationMs / 1000).toFixed(1)} seconds.`,
          "evidence",
        ),
      );
      window.scrollTo({ top: 0 });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Reconstruction failed.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleDecision(claim: Claim, decision: ReviewDecision, note?: string) {
    setDecisions((current) => ({ ...current, [claim.id]: decision }));
    addTrace(
      makeTrace(
        decision === "confirmed"
          ? "Inference confirmed"
          : decision === "corrected"
            ? "Claim corrected"
            : decision === "rejected"
              ? "Claim rejected"
              : "Question kept unresolved",
        note ?? `${claim.label}: ${claim.value}`,
        "correction",
      ),
    );
  }

  function updateClaim(claimId: string, value: string) {
    setReconstruction((current) => current
      ? {
          ...current,
          claims: current.claims.map((claim) => claim.id === claimId ? { ...claim, value } : claim),
        }
      : current);
  }

  function openEvidence(claimId: string, sourceId?: string) {
    const claim = reconstruction?.claims.find((item) => item.id === claimId);
    setActiveClaimId(claimId);
    setActiveSourceId(sourceId ?? claim?.evidence[0]?.sourceId ?? null);
  }

  function confirmState() {
    setStep("recovery");
    addTrace(
      makeTrace(
        "Current state confirmed",
        "The user reviewed every inferred, conflicting, or missing material claim.",
        "decision",
      ),
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prepareMove() {
    if (!reconstruction || !selectedPath) return;
    const path = reconstruction.paths.find((item) => item.type === selectedPath);
    if (!path) return;
    setDraft(path.draft);
    setStep("approve");
    addTrace(
      makeTrace(
        "Recovery path selected",
        reconstruction.paths.find((path) => path.type === selectedPath)?.title ?? selectedPath,
        "decision",
      ),
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function approvePlan() {
    if (!activePath || !reconstruction) return;
    const approvalEvent = makeTrace(
      "Recovery plan approved",
      `${activePath.title}. First move: ${activePath.nextMove}`,
      "approval",
    );
    setApproved(true);
    setPersistenceStatus("saving");
    addTrace(approvalEvent);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const result = await persistRecovery({
        reconstruction,
        path: activePath,
        draft,
        decisions,
        trace: [...trace, approvalEvent],
      });
      setPersistenceStatus(result.persisted ? "saved" : "session");
      setRecoveryId(result.id ?? null);
    } catch {
      setPersistenceStatus("error");
    }
  }

  function revisePlan() {
    const priorRecord = recoveryId;
    setApproved(false);
    setPersistenceStatus("idle");
    setRecoveryId(null);
    addTrace(
      makeTrace(
        "Approved plan reopened",
        priorRecord
          ? "A revision was started. The previous cloud record remains unchanged until a new version is approved."
          : "A revision was started before the recovery record finished saving.",
        "correction",
      ),
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setStep("sources");
    setArtifacts(demoArtifacts);
    setReconstruction(null);
    setDecisions({});
    setSelectedPath(null);
    setDraft("");
    setApproved(false);
    setPersistenceStatus("idle");
    setRecoveryId(null);
    setError(null);
    setAnalysisNotice(null);
    setTrace([makeTrace("Recovery opened", `${demoArtifacts.length} demo artifacts are ready for review.`, "system")]);
    window.scrollTo({ top: 0 });
  }

  function navigate(target: WorkspaceStep) {
    const currentIndex = steps.findIndex((item) => item.id === step);
    const targetIndex = steps.findIndex((item) => item.id === target);
    if (targetIndex > currentIndex) return;
    setStep(target);
    if (target !== "approve") setApproved(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeGuide() {
    window.localStorage.setItem("meridian-guide-seen", "true");
    setGuideOpen(false);
  }

  function startGuide() {
    window.localStorage.setItem("meridian-guide-seen", "true");
    setGuideOpen(false);
    setGuideActive(true);
  }

  function restartGuide() {
    setDemoMenuOpen(false);
    setGuideOpen(true);
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell">
        <header className="topbar">
          <div className="brand-lockup">
            <span className="brand-mark"><Waypoints size={20} strokeWidth={1.9} aria-hidden="true" /></span>
            <div><strong>Meridian</strong><span>Recovery desk</span></div>
          </div>

          <div className="commitment-breadcrumb">
            <span>Recovery</span>
            <ChevronRight size={14} aria-hidden="true" />
            <strong>{reconstruction?.commitment.title ?? "New commitment"}</strong>
          </div>

          <div className="topbar-actions">
            <button className="topbar-button topbar-button--help" type="button" title="Open recovery guide" aria-label="Open recovery guide" onClick={() => setGuideOpen(true)}>
              <CircleHelp size={17} aria-hidden="true" />
            </button>
            <button className="topbar-button topbar-button--copilot" type="button" aria-label="Ask Meridian" onClick={() => setCopilotOpen(true)}>
              <Bot size={17} aria-hidden="true" />
              <span>Ask Meridian</span>
            </button>
            <button className="topbar-button" type="button" aria-label="Open recovery trace" onClick={() => setTraceOpen(true)}>
              <History size={17} aria-hidden="true" />
              <span>Trace</span>
            </button>
            <button className="demo-workspace-button" type="button" aria-label="Open demo workspace menu" onClick={() => setDemoMenuOpen(true)}>
              <FlaskConical size={15} aria-hidden="true" />
              <span>Demo</span>
            </button>
            <button className="mobile-menu-button" type="button" aria-label="Open demo workspace menu" onClick={() => setDemoMenuOpen(true)}><Menu size={19} /></button>
          </div>
        </header>

        <StageRail current={step} currentComplete={approved} onNavigate={navigate} />

        {guideActive ? <GuideCoach step={step} approved={approved} onEnd={() => setGuideActive(false)} /> : null}
        {analysisNotice ? <div className="system-notice" role="status"><Sparkles size={15} /><span>{analysisNotice}</span><button type="button" onClick={() => setAnalysisNotice(null)} aria-label="Dismiss notice"><X size={14} /></button></div> : null}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${step}-${approved ? "approved" : "active"}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {step === "sources" ? (
              <ArtifactIntake
                artifacts={artifacts}
                isAnalyzing={isAnalyzing}
                error={error}
                onToggle={(id) => setArtifacts((items) => items.map((item) => item.id === id ? { ...item, selected: !item.selected } : item))}
                onAdd={(artifact) => setArtifacts((items) => [...items, artifact])}
                onRemove={(id) => setArtifacts((items) => items.filter((item) => item.id !== id))}
                onReset={reset}
                onAnalyze={() => void analyze()}
              />
            ) : null}

            {step === "review" && reconstruction ? (
              <ReviewWorkspace
                reconstruction={reconstruction}
                artifacts={artifacts}
                decisions={decisions}
                onDecision={handleDecision}
                onUpdateClaim={updateClaim}
                onOpenEvidence={openEvidence}
                onBack={() => navigate("sources")}
                onConfirmState={confirmState}
              />
            ) : null}

            {step === "recovery" && reconstruction ? (
              <RecoveryWorkspace
                reconstruction={reconstruction}
                selectedPath={selectedPath}
                onSelect={setSelectedPath}
                onBack={() => navigate("review")}
                onPrepare={prepareMove}
              />
            ) : null}

            {step === "approve" && reconstruction && activePath ? (
              <ApprovalWorkspace
                reconstruction={reconstruction}
                path={activePath}
                draft={draft}
                approved={approved}
                persistenceStatus={persistenceStatus}
                recoveryId={recoveryId}
                sourceCount={artifacts.filter((artifact) => artifact.selected).length}
                reviewedCount={Object.keys(decisions).length}
                onDraftChange={setDraft}
                onApprove={() => void approvePlan()}
                onRevise={revisePlan}
                onBack={() => navigate("recovery")}
                onRestart={reset}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>

        <footer className="app-footer">
          <span>Evidence-grounded recovery</span>
          <span><ArrowRight size={13} aria-hidden="true" /> Nothing external happens without approval</span>
        </footer>

        {activeClaim ? (
          <EvidenceDrawer
            claim={activeClaim}
            artifacts={artifacts}
            activeSourceId={activeSourceId}
            onSourceChange={setActiveSourceId}
            onClose={() => {
              setActiveClaimId(null);
              setActiveSourceId(null);
            }}
          />
        ) : null}

        {traceOpen ? <TraceDrawer events={trace} onClose={() => setTraceOpen(false)} /> : null}
        {guideOpen ? (
          <GuidanceDrawer
            currentStep={step}
            firstVisit={window.localStorage.getItem("meridian-guide-seen") !== "true"}
            onClose={closeGuide}
            onStartGuide={startGuide}
          />
        ) : null}
        {demoMenuOpen ? (
          <DemoWorkspaceMenu
            onClose={() => setDemoMenuOpen(false)}
            onOpenGuide={restartGuide}
            onReset={() => {
              setDemoMenuOpen(false);
              reset();
            }}
          />
        ) : null}
        {copilotOpen ? (
          <CopilotDrawer
            artifacts={artifacts}
            reconstruction={reconstruction}
            step={step}
            selectedPath={selectedPath}
            draft={draft}
            onClose={() => setCopilotOpen(false)}
            onOpenClaim={(claimId) => {
              setCopilotOpen(false);
              openEvidence(claimId);
            }}
          />
        ) : null}
      </div>
    </MotionConfig>
  );
}
