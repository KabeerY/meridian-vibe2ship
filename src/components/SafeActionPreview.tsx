import { CalendarPlus2, ExternalLink, Mail, ShieldCheck } from "lucide-react";
import type { RecoveryPath, Reconstruction } from "../types";

function calendarDate(value: Date) {
  return value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function buildCalendarUrl(reconstruction: Reconstruction, path: RecoveryPath) {
  const start = new Date();
  start.setDate(start.getDate() + 1);
  start.setHours(9, 30, 0, 0);
  const end = new Date(start.getTime() + 90 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Recovery block: ${reconstruction.commitment.title}`,
    dates: `${calendarDate(start)}/${calendarDate(end)}`,
    details: `First move: ${path.nextMove}\n\nPrepared by Meridian from a user-approved recovery plan. Review the time before saving.`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildGmailUrl(reconstruction: Reconstruction, draft: string) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    su: `Status: ${reconstruction.commitment.title}`,
    body: draft,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function SafeActionPreview({
  reconstruction,
  path,
  draft,
}: {
  reconstruction: Reconstruction;
  path: RecoveryPath;
  draft: string;
}) {
  return (
    <section className="safe-actions" data-tour="safe-actions" aria-labelledby="safe-actions-title">
      <header>
        <div>
          <p className="eyebrow">Prepared, never automatic</p>
          <h2 id="safe-actions-title">Carry the recovery into your tools</h2>
          <p className="safe-actions-intro">The recovery is complete. These optional handoffs let the user inspect exactly what would happen before Google saves or sends anything.</p>
        </div>
        <span><ShieldCheck size={15} /> Preview only</span>
      </header>
      <div className="safe-action-grid">
        <article>
          <span className="safe-action-icon"><CalendarPlus2 size={19} /></span>
          <div><small>Optional handoff 1</small><strong>Recovery focus block</strong><p>Tomorrow · 9:30–11:00 AM · no guests or recurrence</p></div>
          <a href={buildCalendarUrl(reconstruction, path)} target="_blank" rel="noreferrer">
            Open in Google Calendar <ExternalLink size={14} />
          </a>
        </article>
        <article>
          <span className="safe-action-icon"><Mail size={19} /></span>
          <div><small>Optional handoff 2</small><strong>Stakeholder status draft</strong><p>Subject and approved body prefilled · recipient left blank</p></div>
          <a href={buildGmailUrl(reconstruction, draft)} target="_blank" rel="noreferrer">
            Open draft in Gmail <ExternalLink size={14} />
          </a>
        </article>
      </div>
      <p className="safe-action-boundary"><strong>What happens if opened:</strong> Meridian opens a prefilled Google page in a new tab. Nothing is saved, invited, or sent until the user confirms it there.</p>
    </section>
  );
}
