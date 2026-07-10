import { ArrowUp, Bot, FileSearch, ShieldCheck, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { askCopilot } from "../lib/api";
import type { Artifact, CopilotResponse, Reconstruction, RecoveryPathType, WorkspaceStep } from "../types";

interface Message {
  id: string;
  role: "assistant" | "user";
  text: string;
  mode?: CopilotResponse["mode"];
  referencedClaimIds?: string[];
}

const prompts: Record<WorkspaceStep, string[]> = {
  sources: ["What should I include?", "Why keep this to one commitment?", "What happens after reconstruction?"],
  review: ["What should I verify next?", "Why is this claim inferred?", "Which facts conflict?"],
  recovery: ["I'm overwhelmed and not sure what to do first. Based only on the evidence, what should I do next and why?", "Compare repair and renegotiate", "What needs external approval?"],
  approve: ["What should not be claimed?", "Make the draft more direct", "Is this first move safe?"],
};

export function CopilotDrawer({
  artifacts,
  reconstruction,
  step,
  selectedPath,
  draft,
  onClose,
  onOpenClaim,
}: {
  artifacts: Artifact[];
  reconstruction: Reconstruction | null;
  step: WorkspaceStep;
  selectedPath: RecoveryPathType | null;
  draft: string;
  onClose: () => void;
  onOpenClaim: (claimId: string) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: reconstruction
        ? "Ask about this recovery's evidence, uncertainty, options, or draft. I will stay inside the selected case."
        : "Ask what evidence belongs in this recovery. I will stay focused on the selected commitment.",
      mode: "guided",
    },
  ]);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const claimsById = useMemo(
    () => new Map(reconstruction?.claims.map((claim) => [claim.id, claim]) ?? []),
    [reconstruction],
  );

  const assistantModeLabel = (message: Message) => {
    if (message.mode !== "gemini") return "Meridian guide";
    return reconstruction ? "Meridian · Gemini" : "Meridian · Gemini guide";
  };

  useEffect(() => {
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, busy]);

  async function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setQuestion("");
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", text: trimmed }]);
    setBusy(true);
    try {
      const result = await askCopilot({
        message: trimmed,
        artifacts,
        reconstruction,
        step,
        selectedPath,
        draft,
      });
      setMessages((current) => [...current, {
        id: crypto.randomUUID(),
        role: "assistant",
        text: result.answer,
        mode: result.mode,
        referencedClaimIds: result.referencedClaimIds,
      }]);
    } catch (error) {
      setMessages((current) => [...current, {
        id: crypto.randomUUID(),
        role: "assistant",
        text: error instanceof Error ? error.message : "I could not answer that safely.",
        mode: "guided",
      }]);
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void submit(question);
  }

  return (
    <div className="drawer-layer" role="presentation">
      <button className="drawer-backdrop" type="button" aria-label="Close Ask Meridian" onClick={onClose} />
      <aside className="copilot-drawer" role="dialog" aria-modal="true" aria-labelledby="copilot-title">
        <header className="drawer-header">
          <div>
            <p className="eyebrow">Case-bounded assistant</p>
            <h2 id="copilot-title">Ask Meridian</h2>
          </div>
          <button ref={closeRef} className="icon-button" data-tour="close-copilot" type="button" aria-label="Close Ask Meridian" onClick={onClose}><X size={18} /></button>
        </header>

        <div className="copilot-boundary"><ShieldCheck size={15} /><span>Selected evidence only. No external action.</span></div>

        <div className="copilot-messages" aria-live="polite">
          {messages.map((message, index) => (
            <article
              key={message.id}
              className={`copilot-message copilot-message--${message.role}`}
              data-tour={message.role === "assistant" && index === messages.length - 1 && messages.length > 1 ? "copilot-response" : undefined}
            >
              {message.role === "assistant" ? <span className="copilot-avatar"><Bot size={15} /></span> : null}
              <div>
                {message.role === "assistant" ? <small>{assistantModeLabel(message)}</small> : null}
                <p>{message.text}</p>
                {message.referencedClaimIds?.length ? (
                  <div className="copilot-references">
                    {message.referencedClaimIds.map((id) => {
                      const claim = claimsById.get(id);
                      return claim ? (
                        <button key={id} type="button" onClick={() => onOpenClaim(id)}><FileSearch size={12} />{claim.label}</button>
                      ) : null;
                    })}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
          {busy ? <div className="copilot-thinking"><Sparkles size={14} /><span>Checking the recovery state...</span></div> : null}
          <div ref={endRef} />
        </div>

        <div className="copilot-prompts">
          {prompts[step].map((prompt, index) => <button data-tour={step === "recovery" && index === 0 ? "copilot-demo-prompt" : undefined} key={prompt} type="button" disabled={busy} onClick={() => void submit(prompt)}>{prompt}</button>)}
        </div>

        <form className="copilot-composer" onSubmit={onSubmit}>
          <label className="visually-hidden" htmlFor="copilot-question">Ask about this recovery</label>
          <textarea
            id="copilot-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void submit(question);
              }
            }}
            placeholder="Ask about evidence, options, or the draft..."
            rows={2}
            maxLength={1000}
          />
          <button type="submit" disabled={busy || !question.trim()} aria-label="Send question"><ArrowUp size={16} /></button>
        </form>
      </aside>
    </div>
  );
}
