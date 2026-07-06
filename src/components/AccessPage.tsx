import {
  ArrowLeft,
  ArrowRight,
  Check,
  FlaskConical,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { createAccount, signInAccount } from "../lib/auth";

export interface AccountIdentity {
  uid: string;
  email: string;
  name: string;
}

export function AccessPage({
  onBack,
  onDemo,
  onAccount,
}: {
  onBack: () => void;
  onDemo: () => void;
  onAccount: (account: AccountIdentity) => void;
}) {
  const [mode, setMode] = useState<"signin" | "create">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const account = mode === "create"
        ? await createAccount(email.trim(), password)
        : await signInAccount(email.trim(), password);
      onAccount(account);
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "Account access failed.";
      setError(message.replace(/^Firebase:\s*/i, ""));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="access-page" aria-labelledby="access-title">
      <header className="access-header">
        <button className="back-link" type="button" onClick={onBack}><ArrowLeft size={15} /> Meridian</button>
        <span><ShieldCheck size={15} /> No Gmail or Calendar permission requested</span>
      </header>

      <div className="access-layout">
        <section className="access-demo" aria-labelledby="access-title">
          <div className="access-brand-mark"><Waypoints size={25} /></div>
          <p className="eyebrow">Recommended first</p>
          <h1 id="access-title">Learn Meridian by rescuing a real-looking broken plan.</h1>
          <p>The guided workspace uses synthetic engineering evidence, live Gemini reconstruction, and preview-only external actions.</p>

          <div className="demo-pointer" aria-hidden="true">
            <span><Sparkles size={15} /></span>
            <div><strong>Start here</strong><p>The walkthrough will spotlight every decision.</p></div>
            <i />
          </div>

          <button className="demo-entry-button" data-tour="demo-entry" type="button" onClick={onDemo}>
            <span><FlaskConical size={20} /></span>
            <span><strong>Enter guided demo</strong><small>No signup · isolated session · about 3 minutes</small></span>
            <ArrowRight size={19} />
          </button>

          <ul className="access-assurances">
            <li><Check size={14} /> Nothing is sent or scheduled automatically</li>
            <li><Check size={14} /> Demo activity never touches your Google account</li>
            <li><Check size={14} /> Exit the walkthrough at any time</li>
          </ul>
        </section>

        <section className="account-panel" aria-labelledby="account-title">
          <div className="account-panel-heading">
            <span><KeyRound size={18} /></span>
            <div><p className="eyebrow">Optional account</p><h2 id="account-title">Enter your own workspace</h2></div>
          </div>

          <div className="account-tabs" role="tablist" aria-label="Account access mode">
            <button type="button" role="tab" aria-selected={mode === "signin"} onClick={() => setMode("signin")}>Sign in</button>
            <button type="button" role="tab" aria-selected={mode === "create"} onClick={() => setMode("create")}>Create account</button>
          </div>

          <form onSubmit={submit}>
            <label>Email<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
            <label>Password<input type="password" autoComplete={mode === "create" ? "new-password" : "current-password"} minLength={6} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" /></label>
            {error ? <p className="account-error" role="alert">{error}</p> : null}
            <button className="primary-button account-submit" type="submit" disabled={busy}>
              <LockKeyhole size={16} /> {busy ? "Checking..." : mode === "create" ? "Create Meridian account" : "Sign in to Meridian"}
            </button>
          </form>
          <p className="account-footnote">Accounts use Google Identity Platform. The guided demo remains available without signup, and external tools stay disconnected.</p>
        </section>
      </div>
    </main>
  );
}
