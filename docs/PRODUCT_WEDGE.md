# Product Wedge

## 1. Decision Summary

> Build a personal recovery assistant for individual knowledge workers whose
> commitments become stale or fragmented across email, calendar, documents,
> notes, and meetings after reality changes.

**Primary audience:** Individual professionals and early-career knowledge
workers responsible for a meaningful deliverable, including individual
contributors, interns, consultants, and freelancers. They may depend on other
people, but they are recovering their own commitment rather than managing a
team's workflow.

**Target topology:** A known or discoverable commitment remains actionable, but
its stored plan is no longer trustworthy. Material evidence is spread across
language-heavy artifacts, and reminders or ordinary rescheduling cannot explain
what changed or what should happen next.

**Primary measurable outcome:** Time to a trustworthy current state.

**Explicit non-goals:** This is not a generic task manager, calendar optimizer,
team project-management system, motivation chatbot, autonomous communicator, or
guarantee against missed deadlines.

The wedge is professional-flavored rather than profession-exclusive. Students,
founders, freelancers, and other individuals remain relevant when they share the
same deadline topology.

## 2. Alternatives Considered

| Wedge | Evidence fit | AI advantage | Scenario legibility | Risk profile | Decision |
| --- | --- | --- | --- | --- | --- |
| Student single-assignment recovery | Weak to moderate. Procrastination and deadline pressure are supported, but the state is often available in one LMS. | Low when the due date and instructions are already structured. | Very easy to understand and validate. | High risk of becoming a generic homework planner; limited recovery depth. | Reject as the first wedge. |
| Student group or capstone recovery | Moderate. Group work, changing requirements, and multi-source context fit the thesis. | Moderate to high when evidence spans LMS, email, chat, notes, and shared documents. | Relatable, but group ownership and academic rules add ambiguity. | Can drift toward collaboration software or a student-only identity. | Preserve as a secondary scenario. |
| Professional individual knowledge-worker recovery | Strong conceptual fit with fragmented communication, interruptions, changed requirements, and reconstruction cost. Direct deadline-outcome evidence remains limited. | High in language-heavy, multi-source cases where structured rules cannot reconcile current truth. | Clear when anchored to one concrete deliverable rather than a workplace dashboard. | Corporate privacy and authority require synthetic validation data and strict personal scope. | Choose as the first wedge. |
| Founder, freelancer, or client-deliverable recovery | Strong fit for volatility, external dependencies, and renegotiation. Evidence is narrower and often project-level. | High where business evidence is heterogeneous and plans change rapidly. | Potentially compelling but more difficult to bound. | High confidentiality, forecasting uncertainty, and scope creep toward a startup operating system. | Preserve as a stress case, not the hero wedge. |
| Broad topology-only recovery assistant | Most faithful to the research thesis and broadly applicable. | Varies correctly with artifact structure. | Too abstract to produce one coherent first workflow or evaluation. | Risks a generic product, vague audience, and uncontrolled feature breadth. | Use as positioning logic, not the first product wedge. |

The chosen wedge balances five needs: it expresses the locked topology clearly,
creates a real role for AI, remains personal rather than organizational, supports
a controlled validation scenario, and avoids looking like another student
planner. Its main weakness is privacy and enterprise resemblance. The MVP must
therefore use user-selected artifacts, synthetic scenarios, and an individual
commitment boundary.

## 3. Chosen Target Topology

The first product should serve a commitment with all of these properties:

- It is known or discoverable from artifacts the user can legitimately provide.
- An original plan, expectation, or partial work state exists.
- Reality changed after that plan was formed.
- Current evidence is stale, fragmented, contradictory, or expensive to
  interpret.
- The commitment is still actionable or meaningfully adjustable.
- The user can act directly or request a change from the relevant person.
- The sources contain enough natural language and contextual ambiguity that
  manual reconciliation is costly.
- A reminder or automatic calendar move cannot determine what remains true.

The wedge does not cover:

- commitments with no recoverable evidence;
- tasks already represented accurately in one structured source;
- simple forgetting solved by a reminder;
- impossible deadlines with no feasible adjustment;
- obligations controlled entirely by someone else;
- goals that require motivation coaching rather than state reconstruction;
- multi-team planning, resource allocation, or organizational portfolio control.

The topology is intentionally narrower than "busy professional." A crowded inbox
alone does not qualify. The user must have a still-relevant commitment whose
plan has materially diverged from current reality.

## 4. Hero User

The hero user is an early-career individual contributor responsible for a
client-facing or internally visible deliverable. Their work is coordinated with
other people, but they do not own a team-wide project system.

They use ordinary work artifacts: email, calendar events, meeting notes,
documents, and personal notes. These artifacts contain pieces of the commitment,
but none provides a complete and current account after conditions change. The
user has enough authority to revise their own work, ask for missing input, or
request a changed commitment. They do not have authority to silently alter other
people's deadlines or speak on their behalf.

This user is not a proxy for enterprise software. The wedge does not require an
administrator, manager dashboard, shared task database, organization-wide
deployment, employee monitoring, or multi-user workflow engine. It solves one
person's recovery problem for one important commitment.

Students, founders, freelancers, and interns can fit when their commitment has
the same structure. They are secondary applications of the topology, not
separate products.

## 5. Hero Broken-Plan Scenario

An individual contributor is preparing a client insight report due soon. The
original scope was established during a kickoff meeting and followed by a
calendar work block and a partially completed document.

Since then:

- a client email changed one required section;
- meeting notes introduced a dependency on updated data;
- the working document contains partial progress based on the old scope;
- the planned work block passed without completion;
- a later message implies that one original request may no longer be needed;
- the user's task note still describes the original plan;
- a follow-up or renegotiation may now be necessary.

No single artifact is authoritative. The deadline may still be achievable, but
"continue writing" is not yet a trustworthy next action. Before resuming, the
user needs to know:

- what changed and where that evidence came from;
- which original assumptions remain valid;
- what work is already complete and still usable;
- what is blocked by missing input;
- what has become obsolete;
- which facts conflict or remain uncertain;
- which recovery paths are feasible;
- what locally executable action can happen next.

The scenario ends at a human recovery decision and one approved next action or
draft. It does not assume autonomous changes to the client's commitment, another
person's work, or shared calendars.

## 6. Measurable Outcome

The primary metric is **time to a trustworthy current state**.

Measurement begins when the user invokes recovery with the selected artifact
bundle. It ends when the user confirms a current-state representation that:

- includes the material commitment, deadline, changed requirements, partial
  progress, blockers, and ownership facts present in the evidence;
- distinguishes explicit facts from inference;
- exposes material contradictions and unresolved uncertainty;
- links consequential claims to their source;
- contains no uncorrected critical false commitment or deadline.

The metric is not simply time to an AI response. Fast output that requires a
long audit is not a faster recovery.

Secondary metrics are:

- omitted and fabricated commitments or changed facts;
- correction and verification time;
- source coverage and contradiction detection;
- appropriateness of proposed recovery options;
- time to the first valid recovery action;
- whether the user initiates a recovery decision;
- calibrated trust, rejection, overreliance, and abandonment.

Fewer missed deadlines, less late work, faster completion, lower stress, and
higher productivity remain future validation hypotheses rather than wedge
claims.

## 7. MVP Boundary

The smallest complete workflow that proves the wedge is:

1. **Explicit invocation:** The user selects or provides a bounded set of
   artifacts relevant to one disrupted commitment.
2. **Candidate extraction:** The system identifies commitments, deadlines,
   changed requirements, completed work, blockers, ownership, and open questions.
3. **Source-grounded reconstruction:** It produces a current-state model that
   links material claims to artifacts and timestamps.
4. **Conflict and uncertainty surfacing:** It preserves disagreements between
   sources and asks for confirmation rather than silently choosing.
5. **User correction:** The user can confirm, edit, reject, or mark evidence as
   obsolete before consequential planning.
6. **Recovery-path evaluation:** The system presents only plausible options among
   repair, deliberate delay, rebuild, drop, and renegotiate, including the
   relevant constraint or tradeoff.
7. **Approved next move:** The user chooses a path and approves one locally
   executable next action or a draft for a consequential action.
8. **Traceability:** The system records what it inferred, what the user corrected,
   what was approved, and how to reverse the resulting state change.

This boundary proves an end-to-end recovery mechanism without requiring a new
general task database, continuous monitoring, broad account access, or automated
external execution.

## 8. Non-Goals

- Not an always-on surveillance agent.
- Not a full calendar optimizer or automatic time-blocking service.
- Not a team project-management or employee-monitoring system.
- Not an autonomous email sender or commitment negotiator.
- Not a student homework planner.
- Not a motivation, therapy, or accountability chatbot.
- Not a generic task manager or second inbox.
- Not a deadline-prevention guarantee.
- Not a forecasting engine that promises reliable duration estimates.
- Not a system that infers mental state, goal value, or personal authority.
- Not a system that treats blank calendar slots as available time.
- Not a universal solution for uncaptured, impossible, or externally controlled
  deadlines.

## 9. AI, Deterministic, And Human Split For This Wedge

### AI

- Interpret the user-selected language-heavy artifacts.
- Extract candidate commitments, changed facts, blockers, and ownership clues.
- Compare sources and reconstruct a candidate current state.
- Surface contradictions, missing evidence, and uncertainty.
- Draft relevant recovery options and candidate next actions.

### Deterministic Software

- Store the structured recovery state and source references.
- Preserve timestamps, status, explicit rules, and user corrections.
- Enforce approval gates and action permissions.
- Maintain logs, version history, expiry, and rollback.
- Handle checklists, reminders, and explicit state transitions once truth is
  confirmed.

### Human

- Decide which artifacts may be used.
- Confirm truth when evidence conflicts or remains incomplete.
- Determine goal value and final priority.
- Choose repair, deliberate delay, rebuild, drop, or renegotiate.
- Approve any message, shared-calendar change, deletion, escalation, or other
  consequential action.

## 10. Risks And Kill Conditions

| Risk | Mitigation or validation test | Kill condition |
| --- | --- | --- |
| The user does not invoke recovery while overwhelmed. | Compare explicit one-step artifact sharing with a consented proactive prompt; measure invocation and completion. | The experience requires meaningful new maintenance or is consistently ignored at the target moment. |
| Available artifacts are incomplete or inaccessible. | Test source-coverage thresholds and make missing evidence explicit. | Typical scenarios cannot produce a trustworthy state without reconstructing everything manually. |
| Verification recreates the original burden. | Measure total time through user confirmation, not generation latency. | Correction and verification equal or exceed manual recovery effort. |
| Deterministic software is sufficient. | Run the same scenarios through a structured search, filter, and template baseline. | The deterministic baseline performs similarly with lower risk, cost, or complexity. |
| AI fabricates or omits commitments. | Use source requirements, abstention, contradiction tests, and controlled missing-data cases. | Critical false or omitted state cannot be detected and corrected cheaply. |
| The recovery brief increases overwhelm. | Compare concise staged reconstruction with a comprehensive summary; measure action initiation. | Users gain information but are less likely to choose or begin a valid action. |
| The scenario expands into B2B project management. | Keep one user, one commitment, user-selected artifacts, and no shared workflow database. | Core value requires organization-wide integration, manager controls, or team adoption. |
| Privacy or authority blocks adoption. | Test minimum-access invocation and synthetic professional scenarios; separate access from action permission. | Useful reconstruction requires broad ambient access users will not grant. |
| Existing products already provide equivalent recovery. | Compare the complete source-grounded reconstruction and five-path decision workflow, not isolated AI features. | An existing low-switching-cost workflow provides equivalent recovery with stronger trust or access. |

## 11. Final Wedge Statement

**One sentence**

> A personal recovery assistant for individual knowledge workers that turns a
> user-selected bundle of stale, conflicting work artifacts into a
> source-grounded current state and a human-approved recovery path.

**One paragraph**

The first product serves an individual professional whose important deliverable
has drifted away from its original plan across email, calendar, meeting notes,
documents, and personal notes. After explicit invocation, it reconstructs what
changed, what remains valid, what is blocked, and what is uncertain, with visible
sources and user correction. It then helps the user choose among repair,
deliberate delay, rebuild, drop, or renegotiate and approve one next move. The
product does not replace task management, optimize an organization, or promise
deadline prevention; it tests whether evidence-grounded AI can make one broken
commitment faster and safer to recover than manual or deterministic alternatives.

**One-line non-goal**

> Not another task manager: it intervenes only when an existing commitment has
> become difficult to trust and recover.

**Primary validation metric**

> Time from explicit invocation to a user-confirmed, source-grounded current
> state with no uncorrected critical factual error.

Experience Design is the next pending artifact. It must translate this functional
boundary into the first complete user flow without expanding the wedge.
