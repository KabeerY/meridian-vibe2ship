import { CircleHelp, FlaskConical, RotateCcw, ShieldCheck, X } from "lucide-react";
import { useEffect, useRef } from "react";

export function DemoWorkspaceMenu({
  onClose,
  onReset,
  onOpenGuide,
}: {
  onClose: () => void;
  onReset: () => void;
  onOpenGuide: () => void;
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
    <div className="menu-layer" role="presentation">
      <button className="menu-backdrop" type="button" aria-label="Close demo workspace menu" onClick={onClose} />
      <aside className="demo-menu" role="dialog" aria-modal="true" aria-labelledby="demo-menu-title">
        <header>
          <span><FlaskConical size={17} aria-hidden="true" /></span>
          <div><strong id="demo-menu-title">Demo workspace</strong><small>No account or login required</small></div>
          <button ref={closeRef} className="icon-button" type="button" aria-label="Close menu" onClick={onClose}><X size={16} /></button>
        </header>
        <p className="demo-menu-copy">This workspace uses a synthetic software-engineering case. You can add your own text sources, but complete source artifacts are not stored by default.</p>
        <div className="demo-menu-actions">
          <button type="button" onClick={onOpenGuide}><CircleHelp size={16} /><span><strong>Recovery guide</strong><small>Understand each stage</small></span></button>
          <button type="button" onClick={onReset}><RotateCcw size={16} /><span><strong>Reset demo</strong><small>Restore the original case</small></span></button>
        </div>
        <div className="demo-menu-boundary"><ShieldCheck size={15} /><span><strong>Human-controlled</strong> Nothing external is sent or changed.</span></div>
      </aside>
    </div>
  );
}
