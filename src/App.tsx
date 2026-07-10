import {
  ArrowRight,
  Bot,
  ChevronRight,
  CircleHelp,
  CheckCircle2,
  FlaskConical,
  History,
  LogOut,
  Menu,
  ShieldCheck,
  Sparkles,
  UserRound,
  Waypoints,
  X,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AccessPage, type AccountIdentity } from "./components/AccessPage";
import { ApprovalWorkspace } from "./components/ApprovalWorkspace";
import { ArtifactIntake } from "./components/ArtifactIntake";
import { CopilotDrawer } from "./components/CopilotDrawer";
import { DemoWorkspaceMenu } from "./components/DemoWorkspaceMenu";
import { EvidenceDrawer } from "./components/EvidenceDrawer";
import { GuidedTour, type GuidedTourStep } from "./components/GuidedTour";
import { GuidanceDrawer, GuideCoach } from "./components/GuidanceDrawer";
import { LandingPage } from "./components/LandingPage";
import { RecoveryWorkspace } from "./components/RecoveryWorkspace";
import { ReviewWorkspace } from "./components/ReviewWorkspace";
import { TraceDrawer } from "./components/TraceDrawer";
import { demoArtifacts, demoReconstruction, initialTrace } from "./data/demo";
import { persistRecovery, reconstructCommitment } from "./lib/api";
import { signOutAccount } from "./lib/auth";
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
const demoArtifactIds = new Set(demoArtifacts.map((artifact) => artifact.id));

type Surface = "landing" | "access" | "workspace";
type SessionIdentity = ({ kind: "account" } & AccountIdentity) | { kind: "demo"; name: string; email: string };
const sessionStorageKey = "meridian-session";

function readStoredSession(): SessionIdentity | null {
  try {
    const value = window.sessionStorage.getItem(sessionStorageKey);
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<SessionIdentity>;
    if (parsed.kind === "account" && parsed.uid && parsed.email && parsed.name) return parsed as SessionIdentity;
    if (parsed.kind === "demo" && parsed.email && parsed.name) return parsed as SessionIdentity;
  } catch {
    window.sessionStorage.removeItem(sessionStorageKey);
  }
  return null;
}

function storeSession(session: SessionIdentity | null) {
  if (session) window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(session));
  else window.sessionStorage.removeItem(sessionStorageKey);
}

function initialArtifactsFor(session: SessionIdentity | null) {
  return session?.kind === "account" ? [] : demoArtifacts;
}

function initialTraceFor(session: SessionIdentity | null) {
  return [
    session?.kind === "account"
      ? makeTrace("Workspace opened", "Add or paste at least two sources from one commitment to reconstruct a current state.", "system")
      : makeTrace("Recovery opened", `${demoArtifacts.length} demo artifacts are ready for review.`, "system"),
  ];
}

const guidedDemoSteps: GuidedTourStep[] = [
  {
    id: "sources-intro",
    target: '[data-tour="sources-overview"]',
    eyebrow: "Mission 1 · Reconstruct",
    title: "A client release plan stopped matching reality.",
    body: "You are helping Arjun recover one at-risk webhook migration. Meridian begins with evidence, not another reminder.",
  },
  {
    id: "source-bundle",
    target: '[data-tour="source-bundle"]',
    eyebrow: "Evidence bundle",
    title: "The commitment is scattered across six tools.",
    body: "Email changed scope, Slack holds a dependency, GitHub and CI show progress, Linear is stale, and Calendar explains lost work time.",
  },
  {
    id: "reconstruct",
    target: '[data-tour="reconstruct"]',
    eyebrow: "Live Gemini action",
    title: "Turn fragments into one current-state brief.",
    body: "Click the highlighted button. Gemini will extract claims, preserve contradictions, and propose recovery paths from only these sources.",
    action: true,
    placement: "top",
    waitForTarget: '[data-tour="review-brief"]',
    waitingTitle: "Gemini is reconciling six sources.",
    waitingBody: "This usually takes 20–45 seconds on free-tier capacity. Keep this tab open; Meridian will advance automatically when the review brief is ready.",
  },
  {
    id: "review-brief",
    target: '[data-tour="review-brief"]',
    eyebrow: "Mission 2 · Verify",
    title: "AI output is inspectable, not authoritative.",
    body: "Green facts are source-stated. Amber inferences, conflicts, and missing answers require your judgment before planning can continue.",
  },
  {
    id: "confirm-inference",
    target: '[data-tour="confirm-inference"]',
    eyebrow: "Human correction",
    title: "Confirm what the combined evidence supports.",
    body: "The implementation-state claim joins PR progress with passing CI evidence. Confirm it after inspection.",
    action: true,
  },
  {
    id: "resolve-conflict",
    target: '[data-tour="resolve-conflict"]',
    eyebrow: "Contradiction",
    title: "Two systems disagree about the deadline.",
    body: "Meridian refuses to silently choose. Open the conflict and decide which source now governs the commitment.",
    action: true,
  },
  {
    id: "deadline-option",
    target: '[data-tour="deadline-option"]',
    eyebrow: "Authority check",
    title: "Choose the latest external commitment.",
    body: "The client email is newer and externally authoritative. Select it while preserving the older ticket in history.",
    action: true,
  },
  {
    id: "preserve-unknown",
    target: '[data-tour="preserve-unknown"]',
    eyebrow: "Honest uncertainty",
    title: "A trustworthy plan can contain an unknown.",
    body: "There is no evidence that fixture results will satisfy the client. Keep this unresolved instead of allowing the AI to invent certainty.",
    action: true,
  },
  {
    id: "confirm-state",
    target: '[data-tour="confirm-state"]',
    eyebrow: "State checkpoint",
    title: "The commitment is now trustworthy enough to recover.",
    body: "Confirm the reviewed state to unlock recovery choices.",
    action: true,
    placement: "top",
  },
  {
    id: "recovery-paths",
    target: '[data-tour="recovery-paths"]',
    eyebrow: "Mission 3 · Choose",
    title: "Recovery is more than moving the due date.",
    body: "Meridian tests repair, deliberate delay, rebuild, drop, and renegotiate against the same confirmed evidence.",
  },
  {
    id: "open-copilot",
    target: '[data-tour="ask-meridian"]',
    eyebrow: "Ask Meridian",
    title: "Use the agent when the choice still feels heavy.",
    body: "Open the case-bounded assistant. It can reason over this recovery, but it cannot browse unrelated data or act externally.",
    action: true,
  },
  {
    id: "copilot-prompt",
    target: '[data-tour="copilot-demo-prompt"]',
    eyebrow: "Live Gemini conversation",
    title: "Ask for one calm, evidence-based first move.",
    body: "Choose the prepared prompt. Gemini must respond from this case and explain why, without diagnosing the user or hiding uncertainty.",
    action: true,
    waitForTarget: '[data-tour="copilot-response"]',
    waitingTitle: "Gemini is grounding the answer in this case.",
    waitingBody: "It is checking the selected evidence, reviewed uncertainty, and available recovery paths. The walkthrough will continue automatically.",
  },
  {
    id: "copilot-response",
    target: '[data-tour="copilot-response"]',
    eyebrow: "Grounded response",
    title: "The agent turns overwhelm into a decision cue.",
    body: "Notice the operational answer and source references. Meridian provides leverage without pretending it has authority.",
  },
  {
    id: "close-copilot",
    target: '[data-tour="close-copilot"]',
    eyebrow: "Return to the decision",
    title: "Bring the answer back into the recovery flow.",
    body: "Close the assistant and choose the path that preserves the valid core.",
    action: true,
  },
  {
    id: "repair-path",
    target: '[data-tour="repair-path"]',
    eyebrow: "Evidence-matched path",
    title: "Repair what broke without rebuilding what still works.",
    body: "Select the recommended repair path. Its basis, consequence, and first valid move will remain visible before approval.",
    action: true,
  },
  {
    id: "prepare-move",
    target: '[data-tour="prepare-move"]',
    eyebrow: "Make it executable",
    title: "Convert the chosen path into a local next move.",
    body: "Prepare the plan and stakeholder draft. Nothing is sent or scheduled.",
    action: true,
    placement: "top",
  },
  {
    id: "first-move",
    target: '[data-tour="first-move"]',
    eyebrow: "Mission 4 · Approve",
    title: "The comeback starts with one bounded action.",
    body: "The first move can happen locally and does not depend on pretending that blank calendar time is available.",
  },
  {
    id: "status-draft",
    target: '[data-tour="status-draft"]',
    eyebrow: "Human-controlled communication",
    title: "The stakeholder update remains editable and unsent.",
    body: "Meridian drafts the message, separates facts from assumptions, and leaves final wording and delivery to the user.",
  },
  {
    id: "approve-plan",
    target: '[data-tour="approve-plan"]',
    eyebrow: "Decision boundary",
    title: "Approve the recovery, not an external side effect.",
    body: "Record the reviewed state, selected path, and first move. This still does not send email or modify a calendar.",
    action: true,
    placement: "top",
    waitForTarget: '[data-tour="recovery-result"]',
    waitingTitle: "Recording the approved recovery.",
    waitingBody: "Meridian is preserving the reviewed state, chosen path, and decision trace. No email is sent and no calendar is changed.",
  },
  {
    id: "recovery-result",
    target: '[data-tour="recovery-result"]',
    eyebrow: "Recovery complete",
    title: "See exactly what the recovery produced.",
    body: "Six sources became one reviewed state, three uncertain claims received human decisions, and the repair path now has one approved first move. The trace remains inspectable.",
  },
  {
    id: "safe-actions",
    target: '[data-tour="safe-actions"]',
    eyebrow: "Safe handoff",
    title: "The plan is approved; external actions are still not.",
    body: "The two links only open prefilled Google pages. The judge does not need to open them: nothing is saved, invited, or sent unless the user confirms inside Google.",
  },
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
  const initialSession = useMemo(readStoredSession, []);
  const [surface, setSurface] = useState<Surface>(() => {
    if (window.location.pathname.startsWith("/access")) return "access";
    if (window.location.pathname.startsWith("/workspace")) return "workspace";
    return "landing";
  });
  const [session, setSession] = useState<SessionIdentity | null>(initialSession);
  const [tourIndex, setTourIndex] = useState<number | null>(null);
  const [tourComplete, setTourComplete] = useState(false);
  const [step, setStep] = useState<WorkspaceStep>("sources");
  const [artifacts, setArtifacts] = useState<Artifact[]>(() => initialArtifactsFor(initialSession));
  const [reconstruction, setReconstruction] = useState<Reconstruction | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<Record<string, ReviewDecision>>({});
  const [selectedPath, setSelectedPath] = useState<RecoveryPathType | null>(null);
  const [draft, setDraft] = useState("");
  const [approved, setApproved] = useState(false);
  const [persistenceStatus, setPersistenceStatus] = useState<PersistenceStatus>("idle");
  const [recoveryId, setRecoveryId] = useState<string | null>(null);
  const [trace, setTrace] = useState<TraceEvent[]>(() => initialSession ? initialTraceFor(initialSession) : initialTrace);
  const [traceOpen, setTraceOpen] = useState(false);
  const [activeClaimId, setActiveClaimId] = useState<string | null>(null);
  const [activeSourceId, setActiveSourceId] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const [guideActive, setGuideActive] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [analysisNotice, setAnalysisNotice] = useState<string | null>(null);

  const activeClaim = useMemo(
    () => reconstruction?.claims.find((claim) => claim.id === activeClaimId) ?? null,
    [activeClaimId, reconstruction],
  );

  const activePath = reconstruction?.paths.find((path) => path.type === selectedPath) ?? null;
  const activeTourStep = tourIndex === null ? null : guidedDemoSteps[tourIndex] ?? null;

  useEffect(() => {
    function handleHistory() {
      const path = window.location.pathname;
      setSurface(path.startsWith("/workspace") ? "workspace" : path.startsWith("/access") ? "access" : "landing");
    }
    window.addEventListener("popstate", handleHistory);
    return () => window.removeEventListener("popstate", handleHistory);
  }, []);

  function navigateSurface(next: Surface) {
    const path = next === "landing" ? "/" : next === "access" ? "/access" : "/workspace";
    window.history.pushState({}, "", path);
    setSurface(next);
    window.scrollTo({ top: 0 });
  }

  function enterDemo() {
    reset("demo");
    const demoSession: SessionIdentity = { kind: "demo", name: "Guided demo", email: "Synthetic workspace" };
    setSession(demoSession);
    storeSession(demoSession);
    setGuideOpen(false);
    setGuideActive(false);
    setTourComplete(false);
    setTourIndex(0);
    navigateSurface("workspace");
  }

  function enterAccount(account: AccountIdentity) {
    reset("account");
    const accountSession: SessionIdentity = { kind: "account", ...account };
    setSession(accountSession);
    storeSession(accountSession);
    setTourIndex(null);
    setTourComplete(false);
    navigateSurface("workspace");
  }

  const advanceTour = useCallback(() => {
    setTourIndex((current) => {
      if (current === null) return null;
      if (current >= guidedDemoSteps.length - 1) {
        window.setTimeout(() => setTourComplete(true), 0);
        return null;
      }
      return current + 1;
    });
  }, []);

  const backTour = useCallback(() => {
    setTourIndex((current) => current === null ? null : Math.max(0, current - 1));
  }, []);

  function exitTour() {
    setTourIndex(null);
    setTourComplete(false);
  }

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
      const selectedArtifacts = artifacts.filter((artifact) => artifact.selected);
      const isGuidedCase = tourIndex !== null
        && session?.kind === "demo"
        && selectedArtifacts.length >= 2
        && selectedArtifacts.every((artifact) => demoArtifactIds.has(artifact.id));
      const reconstructedState: Reconstruction = isGuidedCase
        ? {
            ...demoReconstruction,
            generatedAt: result.reconstruction.generatedAt,
            mode: result.mode,
            durationMs,
          }
        : { ...result.reconstruction, durationMs };
      setReconstruction(reconstructedState);
      setDecisions({});
      setSelectedPath(null);
      setApproved(false);
      setPersistenceStatus("idle");
      setRecoveryId(null);
      setStep("review");
      setAnalysisNotice(
        result.warning
        ?? (isGuidedCase && result.mode === "gemini"
          ? "Gemini compared the live evidence. Meridian normalized the result into the verified guided brief used for these review checkpoints."
          : null),
      );
      addTrace(
        makeTrace(
          "Current state reconstructed",
          `${selectedArtifacts.length} sources compared with ${result.mode === "gemini" ? "Gemini" : "the guided demo model"} in ${(durationMs / 1000).toFixed(1)} seconds.${isGuidedCase ? " The result was normalized into the verified guided review brief." : ""}`,
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

  function reset(kind: SessionIdentity["kind"] = session?.kind ?? "demo") {
    const demoMode = kind === "demo";
    setStep("sources");
    setArtifacts(demoMode ? demoArtifacts : []);
    setReconstruction(null);
    setDecisions({});
    setSelectedPath(null);
    setDraft("");
    setApproved(false);
    setPersistenceStatus("idle");
    setRecoveryId(null);
    setError(null);
    setAnalysisNotice(null);
    setTrace(initialTraceFor(demoMode ? { kind: "demo", name: "Guided demo", email: "Synthetic workspace" } : { kind: "account", uid: "local", name: "Account workspace", email: "account" }));
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

  async function leaveWorkspace() {
    if (session?.kind === "account") {
      try {
        await signOutAccount();
      } catch {
        // Local navigation still succeeds if the remote auth session already expired.
      }
    }
    setSession(null);
    storeSession(null);
    setTourIndex(null);
    setTourComplete(false);
    setDemoMenuOpen(false);
    navigateSurface("landing");
  }

  if (surface === "landing") {
    return (
      <MotionConfig reducedMotion="user">
        <LandingPage onStart={() => navigateSurface("access")} onSignIn={() => navigateSurface("access")} />
      </MotionConfig>
    );
  }

  if (surface === "access") {
    return (
      <MotionConfig reducedMotion="user">
        <AccessPage onBack={() => navigateSurface("landing")} onDemo={enterDemo} onAccount={enterAccount} />
      </MotionConfig>
    );
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
            <button className="topbar-button topbar-button--copilot" data-tour="ask-meridian" type="button" aria-label="Ask Meridian" onClick={() => setCopilotOpen(true)}>
              <Bot size={17} aria-hidden="true" />
              <span>Ask Meridian</span>
            </button>
            <button className="topbar-button" type="button" aria-label="Open recovery trace" onClick={() => setTraceOpen(true)}>
              <History size={17} aria-hidden="true" />
              <span>Trace</span>
            </button>
            <button className="demo-workspace-button" type="button" aria-label="Open workspace menu" onClick={() => setDemoMenuOpen(true)}>
              {session?.kind === "account" ? <UserRound size={15} aria-hidden="true" /> : <FlaskConical size={15} aria-hidden="true" />}
              <span>{session?.kind === "account" ? session.name : "Demo"}</span>
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
                onReset={() => reset()}
                isDemoWorkspace={session?.kind !== "account"}
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
            isAccount={session?.kind === "account"}
            title={session?.kind === "account" ? session.name : "Demo workspace"}
            detail={session?.email ?? "No account or login required"}
            onClose={() => setDemoMenuOpen(false)}
            onOpenGuide={restartGuide}
            onExit={() => void leaveWorkspace()}
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
        {activeTourStep && tourIndex !== null ? (
          <GuidedTour
            step={activeTourStep}
            index={tourIndex}
            total={guidedDemoSteps.length}
            onNext={advanceTour}
            onBack={backTour}
            onExit={exitTour}
          />
        ) : null}
        {tourComplete ? (
          <div className="menu-layer tour-complete-layer" role="presentation">
            <div className="menu-backdrop" />
            <section className="tour-complete" role="dialog" aria-modal="true" aria-labelledby="tour-complete-title">
              <span className="tour-complete-mark"><CheckCircle2 size={28} /></span>
              <p className="eyebrow">Guided rescue complete</p>
              <h2 id="tour-complete-title">You turned a broken plan into one defensible next move.</h2>
              <p>This was not another reminder. It was a complete recovery loop from fragmented evidence to an approved, executable comeback.</p>
              <div className="tour-complete-recap">
                <div><Bot size={18} /><span><strong>Gemini reconstructed</strong>{artifacts.filter((artifact) => artifact.selected).length} sources became one inspectable current state.</span></div>
                <div><UserRound size={18} /><span><strong>You verified and chose</strong>{Object.keys(decisions).length} uncertain claims were reviewed before selecting {activePath?.title.toLowerCase() ?? "a recovery path"}.</span></div>
                <div><ShieldCheck size={18} /><span><strong>Control stayed with you</strong>The plan was recorded, while Calendar and Gmail remained unsaved previews.</span></div>
              </div>
              <p className="tour-complete-next">Close this summary to inspect the approved first move, decision trace, and optional Google handoffs underneath.</p>
              <div className="tour-complete-actions">
                <button className="primary-button" type="button" onClick={() => setTourComplete(false)}>Inspect approved result</button>
                <button className="secondary-button" type="button" onClick={() => void leaveWorkspace()}><LogOut size={15} /> Return to Meridian</button>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </MotionConfig>
  );
}
