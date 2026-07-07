import { ArrowLeft, ArrowRight, MousePointer2, Sparkles, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export interface GuidedTourStep {
  id: string;
  target: string;
  eyebrow: string;
  title: string;
  body: string;
  action?: boolean;
  placement?: "top" | "bottom";
  waitForTarget?: string;
  waitingTitle?: string;
  waitingBody?: string;
}

interface TargetBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

function measure(element: Element): TargetBox {
  const rect = element.getBoundingClientRect();
  return {
    top: Math.max(8, rect.top - 7),
    left: Math.max(8, rect.left - 7),
    width: Math.min(window.innerWidth - 16, rect.width + 14),
    height: Math.min(window.innerHeight - 16, rect.height + 14),
  };
}

export function GuidedTour({
  step,
  index,
  total,
  onNext,
  onBack,
  onExit,
}: {
  step: GuidedTourStep;
  index: number;
  total: number;
  onNext: () => void;
  onBack: () => void;
  onExit: () => void;
}) {
  const [box, setBox] = useState<TargetBox | null>(null);
  const [actionPending, setActionPending] = useState(false);
  const [actionFailed, setActionFailed] = useState(false);
  const [targetMissing, setTargetMissing] = useState(false);
  const targetRef = useRef<Element | null>(null);

  useEffect(() => {
    setActionPending(false);
    setActionFailed(false);
    setTargetMissing(false);
  }, [step.id]);

  useLayoutEffect(() => {
    let frame = 0;
    let active: Element | null = null;

    function findAndMeasure() {
      const target = document.querySelector(step.target);
      if (target !== active) {
        active?.classList.remove("tour-target-active");
        active = target;
        targetRef.current = target;
        active?.classList.add("tour-target-active");
        if (active) active.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
      if (active) setBox(measure(active));
      else setBox(null);
    }

    function scheduleMeasure() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(findAndMeasure);
    }

    const observer = new MutationObserver(scheduleMeasure);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("scroll", scheduleMeasure, true);
    findAndMeasure();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("scroll", scheduleMeasure, true);
      active?.classList.remove("tour-target-active");
      targetRef.current = null;
    };
  }, [step.target]);

  useEffect(() => {
    if (box || actionPending) {
      setTargetMissing(false);
      return;
    }
    const timer = window.setTimeout(() => setTargetMissing(true), 900);
    return () => window.clearTimeout(timer);
  }, [actionPending, box, step.id]);

  useEffect(() => {
    function guard(event: Event) {
      const node = event.target;
      if (!(node instanceof Node)) return;
      if (targetRef.current?.contains(node)) return;
      if (node instanceof Element && node.closest("[data-tour-tooltip]")) return;
      event.preventDefault();
      event.stopPropagation();
    }

    document.addEventListener("pointerdown", guard, true);
    document.addEventListener("click", guard, true);
    return () => {
      document.removeEventListener("pointerdown", guard, true);
      document.removeEventListener("click", guard, true);
    };
  }, []);

  useEffect(() => {
    if (!step.action || !targetRef.current || actionPending) return;
    const target = targetRef.current;
    const advance = () => {
      setActionFailed(false);
      if (step.waitForTarget) setActionPending(true);
      else window.setTimeout(onNext, 180);
    };
    target.addEventListener("click", advance, { once: true });
    return () => target.removeEventListener("click", advance);
  }, [actionPending, box, onNext, step.action, step.waitForTarget]);

  useEffect(() => {
    if (!actionPending || !step.waitForTarget) return;
    let finished = false;

    function checkResult() {
      if (finished) return;
      if (document.querySelector(step.waitForTarget!)) {
        finished = true;
        setActionPending(false);
        window.setTimeout(onNext, 180);
        return;
      }
      if (document.querySelector(".error-banner")) {
        finished = true;
        setActionPending(false);
        setActionFailed(true);
      }
    }

    const observer = new MutationObserver(checkResult);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    checkResult();
    return () => {
      finished = true;
      observer.disconnect();
    };
  }, [actionPending, onNext, step.waitForTarget]);

  const tooltipStyle = box
    ? (() => {
        const width = Math.min(360, window.innerWidth - 24);
        const tooltipHeight = 264;
        const gap = 16;
        const fitsBelow = box.top + box.height + gap + tooltipHeight <= window.innerHeight - 12;
        const preferTop = step.placement === "top" || !fitsBelow;
        const top = preferTop
          ? Math.max(12, box.top - tooltipHeight - gap)
          : box.top + box.height + gap;
        const left = Math.min(window.innerWidth - width - 12, Math.max(12, box.left + box.width / 2 - width / 2));
        return { top, left, width };
      })()
    : undefined;

  return (
    <div className="guided-tour-layer" aria-live="polite">
      {box ? <div className="tour-spotlight" style={box} aria-hidden="true" /> : null}
      <section
        className={`tour-tooltip${box ? "" : " tour-tooltip--waiting"}${actionPending ? " tour-tooltip--busy" : ""}`}
        data-tour-tooltip
        style={tooltipStyle}
        role="dialog"
        aria-modal="true"
        aria-busy={actionPending}
        aria-labelledby="tour-title"
      >
        <header>
          <span className="tour-step-mark"><Sparkles size={15} /></span>
          <div><small>{step.eyebrow}</small><strong>{index + 1} / {total}</strong></div>
          <button type="button" aria-label="Exit guided demo" onClick={onExit}><X size={16} /></button>
        </header>
        <h2 id="tour-title">
          {actionPending
            ? step.waitingTitle ?? "Meridian is preparing the next checkpoint."
            : actionFailed
              ? "Gemini could not finish this pass."
              : step.title}
        </h2>
        <p>
          {actionPending
            ? step.waitingBody ?? "Keep this tab open. The walkthrough will advance automatically when the result is ready."
            : actionFailed
              ? "Nothing was changed. Click the highlighted control to retry, or exit the walkthrough and continue manually."
              : box
                ? step.body
                : targetMissing
                  ? "This checkpoint is not present in the current state. Continue safely; the workspace remains fully usable."
                  : "Locating the next checkpoint..."}
        </p>
        <footer>
          <button className="tour-back" type="button" disabled={index === 0 || actionPending} onClick={onBack}><ArrowLeft size={14} /> Back</button>
          {actionPending ? (
            <span className="tour-progress-cue"><span className="tour-inline-spinner" /> Gemini is working</span>
          ) : step.action && box ? (
            <span className="tour-action-cue"><MousePointer2 size={14} /> Click the highlighted control</span>
          ) : step.action && !targetMissing ? (
            <span className="tour-progress-cue">Finding the control...</span>
          ) : (
            <button className="tour-next" type="button" onClick={onNext}>{targetMissing && step.action ? "Continue safely" : "Continue"} <ArrowRight size={14} /></button>
          )}
        </footer>
      </section>
    </div>
  );
}
