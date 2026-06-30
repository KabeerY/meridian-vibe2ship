# Visual Design Direction

## 1. Visual Design Goal

The interface should turn a broken commitment from a vague threat into a bounded,
inspectable piece of work. The user begins uncertain and possibly overloaded.
They should quickly understand what is true now, what changed, what needs their
judgment, and which single move can happen next.

The design should feel calm without feeling sleepy, professional without feeling
corporate, and intelligent without performing AI magic. It should communicate:

- this is one recoverable commitment, not the user's entire backlog;
- evidence exists for what is being claimed;
- uncertainty is allowed and visible;
- correction is expected rather than treated as failure;
- nothing consequential happens without approval;
- forward motion is available without urgency theater.

## 2. Design Principles

- **Low-shame:** no punitive overdue counts, streaks, blame, or personal-failure
  language.
- **Calm urgency:** communicate deadlines through facts and consequences, not
  alarm styling.
- **Evidence first:** connect every material AI claim to a source.
- **One commitment:** one title, one current state, one decision, one next move.
- **Truth before planning:** reveal recovery choices only after state review.
- **Progressive disclosure:** lead with current truth; reveal raw evidence on
  demand.
- **Visible uncertainty:** use specific evidence states, not vague disclaimers or
  fake precision.
- **Cheap correction:** make confirm, edit, reject, and obsolete first-class.
- **Approval before consequence:** visibly separate drafting from acting.
- **No hidden automation:** preview, trace, and allow rollback.
- **Provenance over reasoning theater:** use sources, timestamps, status, and logs,
  not chain-of-thought exposure.

## 3. Product Metaphor

| Metaphor | Emotional tone | What it communicates well | Risk |
| --- | --- | --- | --- |
| Recovery Room | Supportive, protected, restorative | A damaged plan can be stabilized before action. | Can feel medical, crisis-heavy, or paternalistic. |
| Evidence Board | Investigative, transparent, connected | Claims connect to sources and contradictions remain visible. | Can become cluttered, forensic, or visually theatrical. |
| Calm Command Center | Capable, controlled, operational | Current status, risks, and next actions are legible. | Easily becomes a dense dashboard or militarized productivity UI. |
| Case File / Work Dossier | Focused, document-led, professional | One commitment has history, evidence, status, and a decision record. | Can feel bureaucratic, legalistic, or surveillance-oriented. |

### Chosen Primary Metaphor: Recovery Desk

The **Recovery Desk** refines Recovery Room into a professional surface where one
disrupted commitment is reconciled and moved forward. The user is an active
operator, not a patient.

### Supporting Metaphor: Evidence Board

Evidence Board supplies the trust grammar through source rails, relationship
markers, and inspectable snippets, never corkboards or detective theater.

## 4. Information Hierarchy

The hierarchy is:

1. **Current commitment state:** what the obligation is now and whether it remains
   actionable.
2. **What changed:** the smallest set of changes that invalidated the old plan.
3. **Blocked or uncertain:** facts requiring input before action.
4. **Evidence:** compact provenance attached to each material claim.
5. **Correction required:** the user's highest-impact confirmations.
6. **Recovery paths:** only feasible choices, with consequences.
7. **Approved next move:** one action or draft, separated from approval.
8. **Trace and rollback:** available but visually secondary until needed.

Source evidence should remain one gesture away from every material claim. It
should not occupy equal visual weight with the reconstructed state unless the
user is reviewing a contradiction.

## 5. Core State Concepts

| State | User question | Main content and system answer | Trust signal | Primary action | Main failure risk |
| --- | --- | --- | --- | --- | --- |
| Start | What am I recovering? | One commitment and bounded intake. | Selected-source scope. | Add artifact. | Chatbot homepage. |
| Artifact intake | Is this the right evidence? | Sources, dates, and inclusion. | Visible boundary. | Review. | Broad-access pressure. |
| Sufficiency | Can this proceed? | Known facts and missing evidence. | Honest threshold. | Add source or continue with limits. | False completeness. |
| Reconstruction | What is happening? | Extraction, comparison, conflicts. | Named operations, not reasoning theater. | Cancel or inspect. | AI spectacle. |
| Current state | What is true now? | Commitment, changes, progress, blockers, unknowns. | Claim-level evidence states. | Review confirmations. | Long summary. |
| Contradiction | Which claim governs? | Competing sources with date and scope. | No default winner. | Confirm or leave unresolved. | Silent resolution. |
| Correction | What is wrong? | Decision-relevant corrections only. | Propagation preview. | Confirm state. | Verification marathon. |
| Recovery choice | What can I do? | Feasible paths, consequences, authority. | Confirmed-state basis. | Choose path. | Equal-weight overload. |
| Approval | What will happen? | One move or draft. | Preview and rollback. | Approve, edit, reject. | Draft/execution confusion. |
| Insufficient evidence | What is missing? | One missing fact and bounded next check. | Abstention. | Add evidence or fallback. | Dead end. |
| Rejection | Can I leave safely? | Discard unapproved state or export confirmed facts. | Nothing retained silently. | Exit or fallback. | Punishing rejection. |
| Trace | Can I undo this? | Decisions, corrections, approvals, versions. | Actor and source attribution. | Restore state. | Audit dashboard. |

## 6. Layout Direction

### A. Three-Pane Workspace

Artifacts sit left, state center, and recovery choice right. Comparison is easy,
but the layout resembles enterprise software and exposes too much at once.

### B. Linear Stepper

This is easy to follow, but evidence disappears between steps and the experience
can feel like a rigid setup wizard.

### C. Focused Workspace With Evidence Drawer

A central surface shows the current stage, with a compact stage rail, expandable
evidence drawer, and stable action dock. Contradiction review temporarily widens
the evidence area.

**Recommendation:** Choose C. It combines the clarity of a stepper with the trust
of a workspace, fits desktop-first use, adapts to mobile, and avoids a permanent
dashboard. The central surface should never contain nested cards; evidence and
actions are adjacent layers around one unframed state model.

## 7. Visual Style Routes

| Route | Grammar | Motion | Strength | Risk |
| --- | --- | --- | --- | --- |
| Calm Professional / Editorial Briefing | Assured, medium-density humanist typography; near-white and graphite with cobalt action, teal confirmed, amber inference, restrained red conflict; flat surfaces, fine dividers, 4-8px radii, outline icons. | Short fades, source highlighting, state replacement. | Trustworthy, readable, implementation-friendly. | Generic SaaS without strong evidence grammar. |
| Investigator / Evidence Board | Document-forward, denser source excerpts, relationship markers, amber annotations, red conflicts, provenance icons. | Relationship tracing and conflict expansion. | Makes grounding unmistakable. | Forensic, cluttered, accusatory. |
| Minimal Recovery Cockpit | Compact operational hierarchy, cool neutrals, status bands, indicators, action dock, route and rollback icons. | Precise transitions toward approval. | Strong forward motion. | Dark command center or anxiety machine. |

## 8. Recommended Visual Route

Choose **Calm Professional / Editorial Briefing**, sharpened by the Evidence Board
grammar. This route supports serious knowledge work, remains approachable across
personas, and gives evidence enough character to prevent generic SaaS styling.

Use Investigator detail only for contradiction review and Cockpit precision only
for approval. Avoid a dark-mode-first direction; it pushes the product toward a
command center and weakens source legibility.

The signature is a concise current-state brief beside an inspectable evidence
rail. Trust comes from assembly, not AI decoration.

## 9. Component Language

| Component | Role |
| --- | --- |
| Artifact item | Source identity, timestamp, inclusion, and removal. |
| Source snippet | Smallest excerpt supporting a claim, linked to its artifact. |
| Evidence status | Text, icon, and shape for explicit, inferred, conflicting, missing, or obsolete. |
| Current-state brief | Unframed commitment, changes, progress, blockers, unknowns, and timing. |
| Contradiction comparison | Competing claims without a default winner. |
| Correction control | Confirm, edit, reject, obsolete, scoped authority, or unresolved. |
| Recovery-path option | Feasible path, basis, consequence, and authority. |
| Approval dock | One move with effect and approve, edit, reject. |
| Draft preview | Generated content separated from permission to act. |
| Trace and rollback | Source, inference, correction, approval, and prior-state restoration. |
| Needs confirmation | Blocks dependent action without making the whole state appear broken. |

## 10. Tone And Microcopy Direction

Language is calm, specific, and non-judgmental. Prefer factual verbs such as
"changed," "conflicts," "needs confirmation," and "not found." Avoid "you
failed," "AI discovered," "smart plan," motivational quotes, and fake certainty.

Example lines:

1. **Start:** "Bring the pieces of one commitment. We'll reconstruct what is true now."
2. **Insufficient evidence:** "The deadline is not supported by the selected sources yet."
3. **Conflict:** "Two sources give different requirements for the final section."
4. **Needs confirmation:** "This appears to be a blocker, but the owner is not explicit."
5. **Obsolete:** "This note predates the client's revised scope."
6. **Repair:** "Most of the original plan still holds. Repair the changed section."
7. **Delay:** "Pause the repair until the data arrives, then review this decision."
8. **Rebuild:** "The commitment still matters, but the old plan no longer fits."
9. **Drop:** "End this item only if it is no longer required or worth its cost."
10. **Renegotiate:** "The obligation remains valid, but its current terms may not be feasible."
11. **Approval:** "This is a draft. Nothing will be sent until you approve it."

## 11. Design Anti-Patterns

- Red overdue panic interfaces and punitive counters.
- Giant backlog or analytics dashboards.
- Generic chatbot homepages and transcript-only state.
- Notion-like document sprawl or Jira-like issue administration.
- Calendar-first layouts that imply scheduling is the core problem.
- Gamification, streaks, scores, confetti, or motivational coaching.
- Surveillance views, employee analytics, or passive-monitoring theater.
- Endless AI summaries without claim-level provenance.
- Hidden automation or ambiguous action status.
- Uncalibrated confidence percentages.
- Treating every slip as rescheduling.
- Deep card nesting, floating page sections, excessive pills, or oversized rounded
  containers.
- Purple gradients, beige editorial sameness, dark command-center palettes, or a
  one-hue visual system.

## 12. Accessibility And Practical Constraints

- Use readable body text, restrained heading scale, and no viewport-scaled type.
- Maintain strong contrast and never communicate evidence status through color
  alone.
- Pair status labels with consistent icons and plain-language text.
- Make correction, source navigation, path selection, and approval keyboard
  operable with visible focus states.
- Keep primary controls at least touch-friendly and stable across state changes.
- Support reduced motion; motion cannot be required to understand provenance.
- Keep source snippets selectable. Never hide a material conflict through
  truncation.
- Design desktop-first for artifact comparison, with a focused single-column
  mobile adaptation rather than compressed panes.
- Avoid dependence on branded third-party screenshots. Polish a few states rather
  than inventing a broad component library.

## 13. Stitch / Figma Prompt Pack

### Prompt 1: Overall Product Direction

```text
Design a desktop-first personal recovery assistant for one broken work commitment.
Turn user-selected email, calendar, document, meeting, and note evidence into a
trustworthy current-state brief and human-approved recovery path. Use a Recovery
Desk metaphor and Calm Professional / Editorial Briefing style: near-white,
graphite, restrained cobalt action, teal confirmed, amber inferred, and red only
for conflict or destructive consequence. Use flat surfaces, fine dividers, 4-8px
radii, crisp typography, and an expandable evidence rail. Label explicit,
inferred, conflicting, missing, and obsolete states with icon and text. Avoid a
landing page, dashboard, chatbot-only layout, project manager, calendar-first UI,
dark command center, gradients, gamification, and uncalibrated percentages. Add
no features beyond intake, reconstruction, correction, choice, approval, trace,
and rollback.
```

### Prompt 2: Main Recovery Workspace

```text
Create the focused workspace for one client insight report changed by new
requirements. Center an unframed current-state brief showing commitment, timing,
changes, valid progress, blockers, and unknowns. Add a compact stage rail,
expandable evidence drawer with cited snippets, and stable action dock for the
current confirmation. Every material claim shows source and evidence state.
Keep evidence secondary until inspected. Use medium density, no nested cards,
backlog, chat transcript, team dashboard, or recovery choices before review. Make
the state understandable in ten seconds.
```

### Prompt 3: Contradiction And Correction State

```text
Create contradiction review inside the same workspace. Show two sources
disagreeing about one requirement with identity, timestamp, excerpt, and scope;
preselect no winner. Allow confirming one claim for this fact and time window,
keeping it unresolved, editing it, or marking a source obsolete. Preview affected
state and options. Pair amber needs-confirmation and restrained red conflict with
icons and text. Avoid detective styling, percentages, long AI explanations, and
punitive warnings.
```

### Prompt 4: Recovery Path And Approval State

```text
Create recovery choice and approval after facts are confirmed. Show only feasible
paths among repair, deliberate delay, rebuild, drop, and renegotiate, each with
basis, consequence, and authority requirement. The selected path leads to one
move or draft in a stable approval dock. Separate draft, approve, edit, and reject;
nothing external happens automatically. Keep evidence nearby and assumptions
visible. Distinguish paths through icon, title, and structure, not loud color.
Avoid equal-weight overload, auto-send, blank-calendar assumptions, celebration,
and generic task cards.
```

## 14. Frontend Design Acceptance Criteria

A generated direction passes only when:

- the current commitment state is understandable within ten seconds;
- one commitment clearly dominates the information hierarchy;
- evidence is visible without overwhelming the current-state brief;
- explicit, inferred, conflicting, missing, and obsolete states remain distinct;
- correction actions are obvious and cheaper than manual reconstruction;
- recovery paths are meaningfully different rather than reschedule variants;
- one next move is visually dominant after a path is selected;
- draft and execution states cannot be confused;
- approval is explicit and consequential actions remain blocked beforehand;
- the interface avoids red panic, shame, surveillance, and hidden automation;
- trace and rollback are discoverable without becoming primary navigation;
- layout remains coherent on desktop and focused on mobile;
- no visual concept adds product features or broadens the wedge.

## 15. Handoff To Stitch / Figma

**Recommended metaphor:** Recovery Desk, supported by Evidence Board grammar.

**Recommended layout:** Focused workspace with a compact stage rail, expandable
evidence drawer, central current-state brief, and stable action dock.

**Recommended visual route:** Calm Professional / Editorial Briefing with
Investigator detail reserved for contradictions and Cockpit precision reserved
for approval.

Generate these states first:

1. bounded artifact intake and evidence sufficiency;
2. reconstructed current state with evidence drawer;
3. contradiction review and correction;
4. recovery choice and approved next move.

Evaluate generated designs against the acceptance criteria, especially
ten-second comprehension, evidence visibility, correction cost, explicit
approval, and one-commitment scope. Reject any direction that introduces a
dashboard, chatbot-first flow, team management, calendar optimization, or new
features outside the locked experience.
