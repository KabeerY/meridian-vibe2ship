import type { Artifact, Reconstruction, TraceEvent } from "../types";

export const demoArtifacts: Artifact[] = [
  {
    id: "client-email",
    kind: "email",
    title: "Re: Acme webhook release scope",
    source: "Gmail",
    author: "Lena Ortiz · Acme PM",
    timestamp: "2026-06-29T09:14:00+05:30",
    selected: true,
    content:
      "Hi Arjun — keeping Thursday, July 2 at 5:00 PM as the production handoff. The release must now include refund.completed and dispute.opened events, with idempotent handling for duplicate deliveries. We no longer need the polling fallback. Please include the implementation, passing integration tests, and a short rollout note.",
  },
  {
    id: "slack-dependency",
    kind: "chat",
    title: "#acme-integration · credential handoff",
    source: "Slack",
    author: "Neel Shah · Platform engineering",
    timestamp: "2026-06-30T10:08:00+05:30",
    selected: true,
    content:
      "Acme rotated the sandbox account and the new credentials are waiting on their security approval. Best estimate is Tuesday at 12:00 PM. Use the signed fixture payloads for local work, but do not call production or describe fixture results as a sandbox pass.",
  },
  {
    id: "github-pr",
    kind: "code",
    title: "PR #184 · migrate Acme payment webhooks",
    source: "GitHub",
    author: "Arjun Mehta",
    timestamp: "2026-06-30T11:42:00+05:30",
    selected: true,
    content:
      "Signature verification, event parsing, and the base charge flow are complete. Refund and dispute handlers are TODO. Retry queue wiring is partial. The current branch has two failing duplicate-delivery tests and has not been validated against the rotated sandbox account.",
  },
  {
    id: "linear-ticket",
    kind: "task",
    title: "PAY-248 · Acme webhook migration",
    source: "Linear",
    author: "Payments team",
    timestamp: "2026-06-25T16:20:00+05:30",
    selected: true,
    content:
      "Due Friday, July 3. Acceptance criteria: handle charge.succeeded events and retain polling as a fallback when webhook delivery is delayed. Refund and dispute events are out of scope for this iteration.",
  },
  {
    id: "ci-run",
    kind: "ci",
    title: "CI run #9281 · payment integration suite",
    source: "GitHub Actions",
    author: "Continuous integration",
    timestamp: "2026-06-30T11:48:00+05:30",
    selected: true,
    content:
      "48 tests passed, 2 failed. Failure 1: duplicate refund delivery creates a second ledger entry. Failure 2: retry worker emits an event without the original idempotency key. Signature verification and existing charge-event tests passed.",
  },
  {
    id: "calendar-incident",
    kind: "calendar",
    title: "Webhook migration focus block",
    source: "Google Calendar",
    author: "Arjun Mehta",
    timestamp: "2026-06-29T14:00:00+05:30",
    selected: true,
    content:
      "Planned focus block from 2:00 PM to 5:00 PM was missed because Arjun joined a production checkout incident from 1:40 PM to 4:20 PM. No replacement work block has been confirmed.",
  },
];

export const demoReconstruction: Reconstruction = {
  commitment: {
    title: "Acme payment webhook migration",
    owner: "Arjun Mehta · Software engineer",
    deadline: "Thursday, July 2 · 5:00 PM",
    health: "at_risk",
    healthLabel: "At risk, still recoverable",
    summary:
      "The core integration works, but the client expanded the event scope, duplicate handling is failing, and sandbox access arrives late in the remaining window.",
  },
  sufficiency: {
    status: "enough",
    label: "Enough evidence to reconstruct",
    note: "Six sources cover the client commitment, changed scope, implementation state, test failures, dependency, and lost work time.",
  },
  generatedAt: new Date().toISOString(),
  mode: "demo",
  claims: [
    {
      id: "claim-deadline",
      category: "commitment",
      label: "Current delivery commitment",
      value: "Production handoff is Thursday, July 2 at 5:00 PM.",
      state: "explicit",
      evidence: [
        {
          sourceId: "client-email",
          quote: "keeping Thursday, July 2 at 5:00 PM as the production handoff",
          relationship: "Latest deadline stated by the client owner",
        },
      ],
    },
    {
      id: "claim-change",
      category: "change",
      label: "Release scope expanded",
      value: "Refund and dispute events now require idempotent duplicate handling.",
      state: "explicit",
      evidence: [
        {
          sourceId: "client-email",
          quote:
            "The release must now include refund.completed and dispute.opened events, with idempotent handling for duplicate deliveries.",
          relationship: "Defines the revised acceptance criteria",
        },
      ],
    },
    {
      id: "claim-progress",
      category: "progress",
      label: "Implementation still valid",
      value: "Signature verification, event parsing, and the base charge flow remain usable.",
      state: "inferred",
      reviewNote: "The PR marks these areas complete and CI confirms their tests pass.",
      evidence: [
        {
          sourceId: "github-pr",
          quote: "Signature verification, event parsing, and the base charge flow are complete.",
          relationship: "Reports implementation progress",
        },
        {
          sourceId: "ci-run",
          quote: "Signature verification and existing charge-event tests passed.",
          relationship: "Confirms the retained implementation still passes",
        },
      ],
    },
    {
      id: "claim-obsolete",
      category: "change",
      label: "Old fallback is obsolete",
      value: "The polling fallback in PAY-248 is no longer required.",
      state: "obsolete",
      evidence: [
        {
          sourceId: "client-email",
          quote: "We no longer need the polling fallback.",
          relationship: "Supersedes the old acceptance criterion",
        },
        {
          sourceId: "linear-ticket",
          quote: "retain polling as a fallback when webhook delivery is delayed",
          relationship: "Identifies the superseded plan",
        },
      ],
    },
    {
      id: "claim-blocker",
      category: "blocker",
      label: "Sandbox validation is blocked",
      value: "Rotated sandbox credentials are expected Tuesday at 12:00 PM.",
      state: "explicit",
      evidence: [
        {
          sourceId: "slack-dependency",
          quote: "the new credentials are waiting on their security approval. Best estimate is Tuesday at 12:00 PM.",
          relationship: "States the external dependency and expected handoff",
        },
      ],
    },
    {
      id: "claim-tests",
      category: "progress",
      label: "Duplicate handling is not complete",
      value: "Two integration tests fail because refund retries are not preserving idempotency.",
      state: "explicit",
      evidence: [
        {
          sourceId: "ci-run",
          quote:
            "duplicate refund delivery creates a second ledger entry. Failure 2: retry worker emits an event without the original idempotency key.",
          relationship: "Directly identifies the failing behavior",
        },
      ],
    },
    {
      id: "claim-conflict",
      category: "timing",
      label: "Deadline conflict",
      value: "The older Linear ticket says Friday; the latest client email says Thursday at 5:00 PM.",
      state: "conflicting",
      reviewNote: "The client email is newer and externally authoritative, but the system will not choose silently.",
      evidence: [
        {
          sourceId: "linear-ticket",
          quote: "Due Friday, July 3.",
          relationship: "Older internal delivery record",
        },
        {
          sourceId: "client-email",
          quote: "keeping Thursday, July 2 at 5:00 PM as the production handoff",
          relationship: "Latest client commitment",
        },
      ],
    },
    {
      id: "claim-unknown",
      category: "unknown",
      label: "Validation evidence is unresolved",
      value: "Will the client accept fixture-backed evidence before sandbox credentials arrive?",
      state: "missing",
      evidence: [
        {
          sourceId: "slack-dependency",
          quote: "Use the signed fixture payloads for local work, but do not call production or describe fixture results as a sandbox pass.",
          relationship: "Permits local work but does not establish client acceptance",
        },
      ],
    },
  ],
  conflicts: [
    {
      id: "deadline-conflict",
      title: "Which deadline governs recovery?",
      description: "Two sources describe different delivery dates. Select the one that should control the plan.",
      options: [
        {
          id: "client-deadline",
          sourceId: "client-email",
          label: "Client production handoff",
          value: "Thursday, July 2 · 5:00 PM",
          reason: "Latest instruction from the external commitment owner",
        },
        {
          id: "linear-deadline",
          sourceId: "linear-ticket",
          label: "Internal ticket deadline",
          value: "Friday, July 3",
          reason: "Older plan created before the client expanded scope",
        },
      ],
    },
  ],
  paths: [
    {
      type: "repair",
      title: "Repair the release plan",
      summary: "Preserve the working core and repair only the changed event handlers, retries, and validation path.",
      basis: "The verified foundation remains useful and signed fixtures unblock most implementation work.",
      consequence: "Tuesday becomes the critical sandbox-validation day, leaving a narrow rollout window.",
      nextMove: "Split PR #184 into a stable core and a focused idempotency patch using signed fixtures.",
      steps: [
        {
          title: "Protect the valid core",
          detail: "Separate the passing signature, parser, and charge-flow changes from unfinished refund and dispute work.",
        },
        {
          title: "Repair duplicate handling",
          detail: "Implement idempotency-key propagation and make both failing CI cases pass with signed fixtures.",
        },
        {
          title: "Validate when the blocker clears",
          detail: "Run the focused sandbox suite Tuesday at noon, then prepare the rollout note and production handoff.",
        },
      ],
      draft:
        "Hi Lena,\n\nQuick status on the Acme webhook migration: signature verification, event parsing, and the existing charge flow are intact. I am separating those passing changes from the new refund and dispute handlers, then repairing duplicate-event idempotency against signed fixtures.\n\nThe rotated sandbox credentials are expected Tuesday at noon. I will run the focused sandbox suite as soon as they arrive and flag any material risk to Thursday's 5:00 PM handoff immediately.\n\nThanks,\nArjun",
      available: true,
      recommended: true,
    },
    {
      type: "delay",
      title: "Deliberately wait for credentials",
      summary: "Pause environment-dependent validation while preserving the confirmed implementation state.",
      basis: "The remaining external dependency has a specific expected handoff time.",
      consequence: "Avoids false confidence but compresses all sandbox correction and rollout work into Tuesday afternoon.",
      nextMove: "Finish fixture-based idempotency tests and set a Tuesday 12:15 PM validation checkpoint.",
      steps: [
        { title: "Finish local evidence", detail: "Complete all deterministic fixture tests that do not require Acme credentials." },
        { title: "Hold the environment claim", detail: "Keep sandbox validation explicitly unresolved until real credentials arrive." },
        { title: "Resume at the checkpoint", detail: "Run the targeted sandbox suite Tuesday at 12:15 PM and reassess delivery risk." },
      ],
      draft:
        "Hi Lena,\n\nThe integration core is progressing, but final sandbox validation remains blocked on the rotated credentials expected Tuesday at noon. I am completing the fixture-based idempotency suite now and will run the focused sandbox checks immediately after access is restored.\n\nI will send a confirmed delivery-risk update after that checkpoint.\n\nThanks,\nArjun",
      available: true,
    },
    {
      type: "rebuild",
      title: "Rebuild the event pipeline",
      summary: "Replace the current handler structure with a fresh event-routing and idempotency boundary.",
      basis: "Useful only if the existing retry design cannot support the expanded event types safely.",
      consequence: "Cleaner architecture, but substantially more implementation and regression risk before Thursday.",
      nextMove: "Draft a minimal event-routing interface and prove it against the two failing duplicate-delivery cases.",
      steps: [
        { title: "Define the new boundary", detail: "Specify one event-routing and idempotency contract for charge, refund, and dispute events." },
        { title: "Prove the risky behavior", detail: "Implement the smallest vertical slice that passes both duplicate-delivery tests." },
        { title: "Decide before migration", detail: "Compare repair and rebuild cost before moving the passing charge flow." },
      ],
      draft:
        "Hi Lena,\n\nThe expanded event scope exposed a structural issue in the current retry path. I am testing a smaller unified idempotency boundary before deciding whether the existing handler design remains safe for Thursday's release.\n\nI will confirm the implementation route after the duplicate-delivery proof is complete.\n\nThanks,\nArjun",
      available: true,
    },
    {
      type: "drop",
      title: "Drop the release",
      summary: "End the commitment only if the client release is no longer required or authorized.",
      basis: "No selected source indicates that the client commitment has ended.",
      consequence: "Would require explicit authority and direct client communication.",
      nextMove: "Confirm cancellation authority and prepare a release-withdrawal message.",
      steps: [
        { title: "Confirm authority", detail: "Identify who can cancel the external production commitment." },
        { title: "Preserve the trace", detail: "Record the cancellation basis and the resulting client communication." },
      ],
      draft:
        "Hi Lena,\n\nWe need to withdraw the current production handoff while the release commitment is reassessed. Nothing will be cancelled without explicit owner approval.\n\nThanks,\nArjun",
      available: false,
    },
    {
      type: "renegotiate",
      title: "Renegotiate scope or timing",
      summary: "Request a phased event rollout or move the production handoff after sandbox validation.",
      basis: "The client expanded scope while a client-controlled credential delay reduced the validation window.",
      consequence: "Lowers release risk but changes an external commitment and requires client approval.",
      nextMove: "Draft a two-option request: phase refunds first or move the full handoff to Friday morning.",
      steps: [
        { title: "Show the changed evidence", detail: "State the added events, failing idempotency cases, and delayed sandbox access without blame." },
        { title: "Offer bounded options", detail: "Propose either a phased event scope or a Friday morning full handoff." },
        { title: "Wait for approval", detail: "Do not change the external commitment until the client explicitly chooses an option." },
      ],
      draft:
        "Hi Lena,\n\nThe added refund and dispute events are workable, but the rotated sandbox credentials arriving Tuesday at noon leave a narrow validation window before Thursday's production handoff.\n\nTo protect the release, could we choose one of these options: ship the refund path first and phase disputes next, or move the complete handoff to Friday morning after full sandbox validation?\n\nI can proceed with either option as soon as you confirm.\n\nThanks,\nArjun",
      available: true,
    },
  ],
};

export const initialTrace: TraceEvent[] = [
  {
    id: "trace-invoked",
    timestamp: new Date().toISOString(),
    title: "Recovery opened",
    detail: "Six artifacts were selected for one software release commitment.",
    type: "system",
  },
];
