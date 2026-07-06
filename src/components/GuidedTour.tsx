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
  const targetRef = useRef<Element | null>(null);

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
    if (!step.action || !targetRef.current) return;
    const target = targetRef.current;
    const advance = () => window.setTimeout(onNext, 180);
    target.addEventListener("click", advance, { once: true });
    return () => target.removeEventListener("click", advance);
  }, [box, onNext, step.action]);

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
        className={`tour-tooltip${box ? "" : " tour-tooltip--waiting"}`}
        data-tour-tooltip
        style={tooltipStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-title"
      >
        <header>
          <span className="tour-step-mark"><Sparkles size={15} /></span>
          <div><small>{step.eyebrow}</small><strong>{index + 1} / {total}</strong></div>
          <button type="button" aria-label="Exit guided demo" onClick={onExit}><X size={16} /></button>
        </header>
        <h2 id="tour-title">{step.title}</h2>
        <p>{box ? step.body : "Preparing the next part of the recovery..."}</p>
        <footer>
          <button className="tour-back" type="button" disabled={index === 0} onClick={onBack}><ArrowLeft size={14} /> Back</button>
          {step.action ? (
            <span className="tour-action-cue"><MousePointer2 size={14} /> Click the highlighted control</span>
          ) : (
            <button className="tour-next" type="button" onClick={onNext}>Continue <ArrowRight size={14} /></button>
          )}
        </footer>
      </section>
    </div>
  );
}
