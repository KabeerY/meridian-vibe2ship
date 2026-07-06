import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  FileSearch,
  GitBranch,
  ShieldCheck,
  Waypoints,
} from "lucide-react";

export function LandingPage({
  onStart,
  onSignIn,
}: {
  onStart: () => void;
  onSignIn: () => void;
}) {
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <div className="brand-lockup">
          <span className="brand-mark"><Waypoints size={20} strokeWidth={1.9} aria-hidden="true" /></span>
          <div><strong>Meridian</strong><span>Recovery intelligence</span></div>
        </div>
        <button className="landing-sign-in" type="button" onClick={onSignIn}>Sign in</button>
      </header>

      <main>
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="landing-hero-image" aria-hidden="true" />
          <div className="landing-hero-scrim" aria-hidden="true" />
          <div className="landing-hero-content">
            <p className="landing-kicker"><span /> The recovery layer after plans break</p>
            <h1 id="landing-title">Meridian</h1>
            <p className="landing-lede">
              Reconstruct what changed, verify what is still true, and choose one executable comeback before a disrupted commitment becomes a missed deadline.
            </p>
            <div className="landing-actions">
              <button className="landing-primary" type="button" onClick={onStart}>
                Start the guided rescue <ArrowRight size={17} aria-hidden="true" />
              </button>
              <span>Interactive software-engineering case · about 3 minutes</span>
            </div>
          </div>
          <div className="landing-trust-strip">
            <span><Bot size={15} /> Gemini-grounded</span>
            <span><ShieldCheck size={15} /> Human-approved</span>
            <span><CalendarCheck2 size={15} /> External actions stay previews</span>
          </div>
        </section>

        <section className="landing-problem" aria-labelledby="problem-title">
          <div>
            <p className="eyebrow">The overlooked moment</p>
            <h2 id="problem-title">Plans fail in pieces. Recovery should not.</h2>
          </div>
          <p>
            A changed requirement lives in email. Progress sits in GitHub. A blocker appears in chat. The old deadline survives in a ticket. Meridian reconciles that fragmented state before it recommends another plan.
          </p>
        </section>

        <section className="landing-process" aria-labelledby="process-title">
          <header>
            <p className="eyebrow">One recovery loop</p>
            <h2 id="process-title">From scattered evidence to a safe first move</h2>
          </header>
          <ol>
            <li><span><FileSearch size={19} /></span><small>01</small><strong>Reconstruct</strong><p>Compare selected sources and expose contradictions.</p></li>
            <li><span><CheckCircle2 size={19} /></span><small>02</small><strong>Verify</strong><p>Confirm inferences and preserve what remains unknown.</p></li>
            <li><span><GitBranch size={19} /></span><small>03</small><strong>Choose</strong><p>Repair, delay, rebuild, drop, or renegotiate.</p></li>
            <li><span><ShieldCheck size={19} /></span><small>04</small><strong>Approve</strong><p>Commit to one move without silent external action.</p></li>
          </ol>
        </section>

        <section className="landing-cta" aria-labelledby="cta-title">
          <Waypoints size={28} aria-hidden="true" />
          <h2 id="cta-title">See the comeback happen.</h2>
          <p>Follow a guided Acme webhook recovery powered by live Gemini reasoning and inspect every source behind the decision.</p>
          <button className="landing-primary" type="button" onClick={onStart}>Enter guided demo <ArrowRight size={17} /></button>
        </section>
      </main>
    </div>
  );
}
