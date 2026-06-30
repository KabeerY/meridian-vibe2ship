# Research Notes

This file contains the useful conclusions only. Everything remains provisional
until later research independently supports it.

## Research 0: Judging Calibration

Research 0 studied how hackathon projects are judged. It does not decide the
product problem.

Useful signals:

- Visible intelligence matters more than invisible backend complexity.
- One polished end-to-end workflow beats many shallow features.
- Judges should see the AI take meaningful action, not only generate advice.
- Google technologies should be essential to the experience, not decorative.
- The first impressive moment must happen quickly in the demo.
- A deployed, reliable, polished product strongly affects perceived quality.
- Generic chat wrappers and feature-heavy productivity dashboards are weak.

## Research Method Learnings

- Deadline failure should be modeled as multiple interacting failure pathways,
  not one universal root cause.
- Product discovery must happen before AI capability matching.
- Different reports are not independent evidence when they repeat the same
  underlying study or source.
- Reddit and reviews reveal lived experiences, not population prevalence.
- Research must stop before it consumes the build phase.

## Research 1: Productivity Landscape

Research 1 mapped productivity tools and how they intervene across the deadline
lifecycle.

### Main Product Families

- Auto-schedulers place and rearrange work on the calendar.
- Ritual planners force daily prioritization and capacity reflection.
- Task and database systems help users capture and organize work but depend on
  continuous manual maintenance.
- Unified inbox tools reduce fragmentation across work applications.
- Focus tools block distractions or measure attention.
- Decomposition tools reduce intimidating work into smaller actions.

### Most Useful Learnings

1. **Tools specialize in only parts of the deadline lifecycle.**
   Capturing, scheduling, starting, sustaining, recovering, and reflecting are
   usually handled by different products or left to the user.

2. **A productivity system can become stale.**
   When users stop updating estimates, priorities, or task states, the software
   continues operating on a fictional version of reality.

3. **Maintenance effort may become its own failure mode.**
   Highly configurable systems can demand enough upkeep that users abandon the
   system, although this still needs direct user evidence.

4. **Start time and due time are different concepts.**
   Many tools emphasize when something is due without making clear when work must
   begin. This may cause commitments to remain invisible until urgency rises.

5. **Automatic rescheduling has a possible downside.**
   It helps recover from disruption, but may also keep pushing unfinished work
   forward and hide chronic overcommitment. This is an open hypothesis.

6. **Features are not proof of outcomes.**
   Research 1 found little credible longitudinal evidence showing that these
   products consistently reduce missed deadlines.

7. **Recovery is underdeveloped.**
   Many systems either move an overdue task, leave it red in a backlog, or require
   manual replanning. Few appear to understand why the plan failed and help repair
   the underlying plan.

## Important Unknowns

- Why do people stop maintaining productivity tools after initial enthusiasm?
- What happens immediately before reminders begin getting ignored?
- Do people fail mainly at clarification, estimation, initiation, sustained work,
  coordination, or recovery?
- Which failures differ between students, professionals, and entrepreneurs?
- What replaces a productivity tool after someone abandons it?
- Which forms of automation improve recovery, and which reduce awareness?
- How often are missed deadlines caused by dependencies and other people rather
  than individual behavior?

## Research 2: User Complaints and Abandonment

Research 2 coded 107 user-authored observations across Reddit, Product Hunt, app
stores, and Hacker News. It studied what breaks in lived use, why people abandon
systems, and what they use instead.

### Strongest Finding

**The system often fails when the user falls behind, not when the task is first
captured.** After a missed day or changed plan, tasks accumulate, the stored plan
stops matching reality, and returning requires cleanup and repeated decisions.
The tool becomes hardest to use precisely when the user has the least capacity to
maintain it.

Tentative failure loop:

> Reality diverges from the plan -> stale or punishing system state -> costly
> cleanup -> avoidance -> further divergence -> missed work or abandonment.

Later psychology research must test the emotional and cognitive links in this
loop. R2 shows that users report the sequence; it does not prove causality.

### Useful Learnings

1. **Re-entry cost appears central.**
   Paper, notes, and simple weekly systems often survive because restarting is
   quick. Their advantage may be cheap recovery rather than simplicity itself.

2. **Reminders can succeed technically and still fail behaviorally.**
   A notification may fire and disappear while the ignored commitment becomes
   less visible. The problem is often resurfacing after dismissal, not alerting.

3. **Backlogs can become visually and emotionally aversive.**
   Users described stale or overdue lists becoming chores they avoided opening.

4. **Hard commitments and soft intentions need different treatment.**
   Filling a calendar with flexible tasks can reduce trust in the same calendar
   used for fixed meetings and deadlines.

5. **Capture should not require complete planning.**
   Users abandoned tools when adding a task required duration, categorization,
   project structure, and other context they did not yet know.

6. **Reliability creates or destroys trust.**
   Missing tasks, broken sync, freezes, and weak persistence caused users to keep
   shadow systems or leave entirely.

7. **The same mechanism can help one person and harm another.**
   Feature depth, calendar integration, overdue persistence, and task
   decomposition all produced positive and negative experiences.

8. **Date semantics are not merely cosmetic.**
   Users repeatedly struggled with due date, do date, start date, recurrence, and
   when unfinished work should resurface.

### Product Constraints Emerging From R2

- The system must remain truthful after a missed day, not only on an ideal day.
- Re-entering the system must cost less than continuing to avoid it.
- Recovery should be persistent without becoming visually punitive.
- Ignored reminders must leave the commitment legible and recoverable.
- Hard commitments must remain distinguishable from flexible intentions.
- Capture must work before every planning detail is known.
- Automation is valuable only when correcting it costs less than doing the work
  manually.
- Reliability and reversibility are part of the core experience.
- The product cannot assume that one workflow fits every persona.

### Evidence Limits

This was directional user evidence, not a representative population study. Of the
107 observations, 62 came from Reddit and 67 had no safely inferable persona.
Students and entrepreneurs were underrepresented. Treat frequency as frequency
inside this corpus only.

## Current Cross-Report Signal

R1 suggested that maintenance and recovery are underdeveloped. R2 independently
found repeated abandonment after stale plans, overdue pileups, hidden items, and
costly recovery. This raises the maintenance-and-re-entry mechanism from an R1
idea to a serious candidate bottleneck, but R4-R7 must still test and explain it.

## Research 3: Psychological Mechanisms

Research 3 tested whether psychology supports the R2 recovery-and-avoidance loop.
It found strong evidence for avoiding the underlying task after negative affect,
ambiguity, aversiveness, or reduced self-efficacy. Direct evidence for avoiding a
productivity system specifically because of backlog cleanup remains limited.

### Strongest Refinement

**Re-entry cost is not one psychological mechanism.** It is a working label for a
bundle of distinct burdens:

- **Affective burden:** overdue work evokes dread, guilt, shame, or frustration.
- **Clarity burden:** the next valid action is ambiguous after the plan changes.
- **Expectancy burden:** falling behind reduces belief that recovery is feasible.
- **Mismatch burden:** the goal, plan, or tool may genuinely no longer fit reality.

These burdens can interact, but they predict different responses and must not be
collapsed into one explanation.

### Best-Supported Mechanisms

1. Procrastination often functions as short-term mood repair or avoidance of
   negative affect, not merely poor time management.
2. Task aversiveness and ambiguity increase the likelihood of delay.
3. Strong intentions do not guarantee action; an intention-action gap is common.
4. Reduced self-efficacy after failure can make catching up feel impossible.
5. Cue-linked if-then plans can improve follow-through when the goal is still
   valued and feasible.
6. Reminders can help memory, but overload, distrust, poor context, or dependence
   on reminders can still weaken behavior.
7. Some delay is strategic and some abandonment is rational. Dropping an obsolete
   goal or mismatched tool is not the same as avoidance.

### Important Distinctions

The project must distinguish:

- avoiding the underlying task;
- avoiding the productivity system;
- disengaging from an unrealistic goal;
- rationally abandoning an obsolete plan or mismatched tool.

Treating all four as procrastination would produce the wrong intervention.

### What R3 Weakened

- Ego depletion is not a reliable foundation; major replication efforts found
  weak or near-zero support for the classic effect.
- Decision fatigue is too inconsistently defined to explain the entire recovery
  loop.
- More reminders are not a universal answer.
- Planning becomes useful when it connects a real cue to a concrete response;
  generic planning alone may not close the intention-action gap.
- The claim that planning itself is procrastination remains plausible but
  directly under-studied.

### Emerging Cross-Report Model

> A plan diverges from reality. The discrepancy becomes emotionally threatening,
> unclear, or apparently unrecoverable. Avoidance provides immediate relief but
> worsens the future state. Recovery succeeds only if the commitment is still
> valid, the next action becomes legible, and completion feels feasible again.

R1 found weak recovery support in existing tools. R2 found user-reported failure
during re-entry. R3 provides strong psychological grounding for task avoidance
after slippage, but only analogical support for productivity-system avoidance.

### Product Constraints Emerging From R3

- Do not assume weak intention or forgetting is the primary problem.
- Do not make missed work more threatening through shame or punitive visuals.
- Before pushing recovery, determine whether the commitment is still valid.
- Recovery must restore clarity and perceived feasibility, not merely reschedule.
- Reminders should preserve context and legibility rather than only repeat alerts.
- A plan should connect a meaningful cue to a concrete next response.
- Support adaptive disengagement from obsolete commitments.

## Research 4: Cognitive Recovery Machinery

Research 4 found that post-slip recovery is cognitively demanding even before
emotion or avoidance enters. Remembering that a task exists is not the same as
being able to resume it.

### Strongest Finding

**Context reconstruction is the best-supported cognitive explanation for
post-slip difficulty.** Returning to stale work can require the person to:

1. detect that the stored plan and reality have diverged;
2. reconstruct where the work stopped;
3. determine which tasks, deadlines, and dependencies remain valid;
4. suppress or remove obsolete cues;
5. reconcile conflicting notes, lists, calendars, and artifacts;
6. reprioritize the remaining work;
7. produce a locally executable next action.

A reminder can retrieve the task name while leaving all seven operations undone.

### Useful Learnings

1. **Interruptions create measurable resumption costs.**
   People need time and usable cues to rebuild a task representation after an
   interruption. Rich contextual cues can reduce this cost.

2. **Externalization reallocates cognitive work.**
   Lists, calendars, and notes reduce remembering demands, but create maintenance,
   search, interpretation, and correction work when they become stale.

3. **Fragmentation matters beyond task count.**
   One commitment distributed across email, documents, calendars, and task apps
   may require reconciliation before action can resume.

4. **Reminder usefulness depends on the bottleneck.**
   Reminders can strongly help prospective memory. They are less useful when the
   problem is ambiguity, stale context, conflicting representations, or choosing
   the next action.

5. **Stress is a moderator, not a universal shutdown.**
   Acute stress modestly impairs working memory and cognitive flexibility, which
   are important for updating and reprioritizing. It does not erase all executive
   control.

6. **Automation can reduce burden while weakening awareness.**
   If automated output becomes stale or opaque, users may need to verify and
   correct it before trusting it, creating new cognitive work.

7. **Recovery cost can improve with cues and practice.**
   It is not a fixed personal deficit. Better preserved context can shorten
   resumption without requiring more motivation.

### R3 and R4 Together

> R3 explains why the person may not want to return. R4 explains why returning is
> cognitively expensive even before emotion enters.

The emerging hybrid model is:

> Plan-reality divergence creates stale representations. Reconstructing state is
> cognitively expensive. Stress, ambiguity, and fragmented context raise that
> cost. Negative affect and reduced expectancy then make avoidance more
> attractive, causing further divergence.

### Product Constraints Emerging From R4

- Preserve enough context to resume work, not merely a task title and deadline.
- Make the current authoritative state distinguishable from obsolete plans.
- Reduce reconciliation across fragmented sources.
- Use reminders for memory failures, not as a substitute for state repair.
- Recovery must clarify what changed, what remains valid, and what happens next.
- Automation must preserve situation awareness and remain correctable.
- The experience must remain usable when working memory and flexibility are
  reduced by stress.

### Evidence Limits

The strongest direct evidence concerns interrupted task resumption, prospective
memory, and laboratory or professional tasks. Applying it to stale personal
productivity systems is still partly analogical. Evidence that updating an old
plan is harder than creating a new one remains weak. Early fragmentation studies
also used small samples, so they support the mechanism without establishing its
population prevalence.

## Research 5: Behavioral Economics of Recovery

Research 5 examined why repairing a slipped plan can lose to delay even when the
future cost is larger. It found no single economic explanation. Immediate effort,
uncertainty, optimistic forecasts, discounted future consequences, and changing
goal value can all shape the decision.

### Strongest Finding

**After slippage, the person is not choosing only between acting and
procrastinating.** The real choice set is:

1. repair the existing plan now;
2. delay repair;
3. rebuild from scratch;
4. drop the commitment;
5. renegotiate the deadline or obligation.

Each option has different immediate effort, uncertainty, future benefit, failure
penalty, social cost, and reversibility. Treating all non-completion as irrational
delay would erase important differences.

### Useful Learnings

1. **Present bias explains some delay, not all delay.**
   Unpleasant immediate work can be overweighted relative to future cost, but
   optimism about future time and task demands can produce similar behavior.

2. **Planning error often creates the slip upstream.**
   Underestimated duration, ignored obstacles, and overcommitment can make the
   original plan infeasible before any later self-control failure occurs.

3. **Repair has an immediate economic cost.**
   Cleanup, interpretation, switching, and uncertainty reduce the perceived value
   of repairing now. Direct stale-plan evidence is limited, but effort-discounting
   and procedural-friction research support the mechanism analogically.

4. **Ambiguity raises the uncertainty-adjusted cost of action.**
   A plan can reduce delay when it clarifies scope, or increase delay when it adds
   uncertain cleanup and conflicting choices.

5. **Demand for commitment does not prove commitment will help.**
   Self-imposed deadlines and commitments sometimes improve follow-through, but
   hard penalties frequently fail and can make participants worse off.

6. **Soft commitments can outperform hard penalties.**
   Structure, appointments, or externally meaningful deadlines can help without
   imposing the welfare cost of failed financial self-binding.

7. **Defaults and nudges are modifiers, not central explanations.**
   Their effects vary by domain, preference strength, trust, and context.

8. **Abandonment can be rational.**
   Dropping an obsolete or low-value goal can protect resources and well-being.
   Evidence is stronger for goal adjustment than for abandoning productivity
   tools specifically.

### Cross-Report Model After R5

> Optimistic or incomplete planning creates an unrealistic commitment. Reality
> diverges. The external plan becomes stale and cognitively expensive to
> reconstruct. Repair has a high immediate cost and uncertain payoff. Negative
> affect and reduced expectancy make avoidance attractive. Delay feels locally
> reasonable while future deadline risk grows.

This is a multi-stage model. Planning error, cognitive reconstruction, affective
avoidance, and intertemporal choice can each dominate in different cases.

### Product Constraints Emerging From R5

- Distinguish repair, delay, rebuild, drop, and renegotiate.
- Do not assume delay always reflects weak motivation or irrationality.
- Planning must represent uncertainty and changing constraints, not only one
  optimistic duration estimate.
- Lower the immediate effort and uncertainty involved in recovery.
- Preserve renegotiation and adaptive abandonment as legitimate outcomes.
- Do not equate demand for accountability with benefit from punishment.
- Avoid hard penalties or irreversible commitments as a universal default.
- Treat defaults, nudges, and reminders as context-sensitive modifiers.

### Evidence Limits

Direct evidence about repairing stale personal plans remains sparse. Friction
evidence often comes from public-benefit procedures, commitment evidence from
health, savings, or education, and goal-adjustment evidence from broader life
contexts. The optimism alternative to present bias is promising but relies partly
on working-paper evidence. These findings support mechanisms and constraints, not
population-level claims about productivity-app users.

## Research 6: Work Ecology

Research 6 examined how work, study, and entrepreneurial environments create
deadline risk. Its strongest evidence supports a combined workload-volatility and
fragmentation account rather than a simple claim that modern work is busier.

### Strongest Finding

**Plans can be reasonable when created and later become false because the
environment changes faster than the person can repair them.** New urgent work,
changed requirements, moved meetings, dependency delays, and shifting priorities
can invalidate the plan rather than merely interrupt execution.

R6 distinguishes:

- **Plan disruption:** a work block is interrupted or displaced.
- **Plan invalidation:** assumptions, priorities, requirements, or inputs change.
- **Deadline-risk increase:** completion becomes less likely even before a miss.
- **Actual miss:** the external commitment is not met.

The literature strongly studies the first three, but actual deadline misses are
measured much less often.

### Useful Learnings

1. **Workload volatility matters more than average busyness.**
   A rotating queue of incoming obligations repeatedly forces reprioritization and
   can invalidate previously viable plans.

2. **Communication channels can act as obligation injectors.**
   Email, chat, meetings, and collaboration platforms both communicate and create
   hidden tasks, follow-ups, monitoring work, and fragmented commitment queues.

3. **Complex work is more interruption-sensitive.**
   Interruption effects depend on task complexity, timing, and the context that
   must be reconstructed afterward.

4. **Meetings and coordination are non-linear.**
   Some synchronous coordination is useful. Excessive density fragments focus
   time, while eliminating meetings entirely can create coordination debt.

5. **Flexibility is conditional, not inherently good or bad.**
   Hybrid work can improve satisfaction and retention without harming measured
   performance, but outcomes depend on role, boundaries, infrastructure, and the
   ability to create temporal structure.

6. **Always-on availability erodes recovery.**
   After-hours connectivity is consistently associated with weaker recuperation,
   poorer work-life boundaries, and greater conflict, although deadline effects
   are mostly indirect.

7. **Personas face different environmental volatility.**
   Students face paid-work competition and fragmented academic platforms;
   professionals face message and meeting density; entrepreneurs face role
   multiplicity and shifting priorities; caregivers face boundary instability.

8. **AI is changing work composition, but the deadline effect is unsettled.**
   Current evidence suggests both performance gains and new verification,
   correction, transparency, monitoring, and expectation burdens. Most evidence
   is recent, survey-based, or policy-level rather than causal deadline data.

### Cross-Report Model After R6

> The environment injects or changes work, invalidating the plan. Commitment state
> becomes fragmented across channels. Recovery requires cognitive reconstruction
> and has immediate effort and uncertainty. Negative affect and reduced expectancy
> make avoidance attractive. Delay allows further environmental divergence.

R6 therefore explains how the recovery loop can begin repeatedly even when the
person initially planned well.

### Product Constraints Emerging From R6

- Detect and handle plan invalidation separately from ordinary interruption.
- Do not assume more alerts solve volatility-driven failure.
- Remain useful when commitments are distributed across imperfect sources.
- Balance coordination needs with protection of execution time.
- Do not assume remote, hybrid, asynchronous, or AI-mediated work is uniformly
  harmful.
- Allow renegotiation, rebuilding, and dropping when the environment invalidates
  the original plan.
- Do not blame the user for maintaining a plan that external conditions made
  obsolete.

### Evidence Limits

Most environmental studies measure workload, stress, focus, resumption cost,
performance, or wellbeing rather than actual missed deadlines. The Trip.com
hybrid-work trial concerns one company and one hybrid arrangement. Interruption
and fragmentation evidence is often self-reported, short-term, or based on older
small field studies. AI-era conclusions remain especially provisional.

## Research 7: Coordination and Dependencies

Research 7 examined deadline failures that emerge across owners, blockers,
approvals, handoffs, and shared representations. It supports a distinct collective
failure layer without implying that every multi-person delay is a coordination
problem.

### Strongest Finding

**The person who appears late may only be where an upstream dependency failure
becomes visible.** In networked work, the meaningful unit of failure can be the
dependency state rather than one assignee's effort or planning.

A useful dependency-state chain is:

1. required dependency is unknown;
2. dependency is known but not owned;
3. owned but not visible;
4. visible but blocked;
5. blocked but not escalated;
6. escalated but unresolved;
7. resolved after downstream windows have closed;
8. resolved but not propagated into the shared plan.

### Useful Learnings

1. **Task ownership, deadline ownership, and escalation ownership differ.**
   A single assignee field can hide who is responsible for the next action, final
   commitment, approval, or unblocking decision.

2. **Waiting time is not active work time.**
   Approvals, client decisions, late inputs, suppliers, and upstream changes can
   dominate delivery delay even when downstream work is ready.

3. **A handoff must create actionability, not merely transfer history.**
   The receiver needs the next action, relevant context, acceptance conditions,
   risks, and contingencies, adapted to what they already know.

4. **Sharedness is not correctness.**
   Teams can coordinate smoothly around the same outdated assumption. A shared
   but inaccurate model may be worse than openly incomplete knowledge.

5. **Early warning requires safety and accountable follow-through.**
   Hierarchy, blame, and evaluation threat can delay risk disclosure. Psychological
   safety helps voice, but safety without ownership or action is insufficient.

6. **Monitoring and transparency can backfire.**
   Visibility can improve coordination or produce gaming, concealment, ritualized
   reporting, and optimization of metrics instead of the real commitment.

7. **Execution artifacts work through social conventions.**
   Boards, checklists, standups, and workflow states help when they change shared
   attention, sequence, ownership, and response. Merely storing more information
   does not coordinate a team.

8. **High-stakes procedures provide mechanisms, not templates.**
   Healthcare and safety-critical evidence supports explicit action lists,
   confirmation, contingency framing, and receiver alignment. Transfer to ordinary
   knowledge work remains analogical.

### Individual-Versus-Collective Attribution Test

Treat a failure as potentially collective when:

- required input or approval sat outside the assignee's control;
- task, deadline, and escalation ownership were separated;
- a handoff changed or lost the effective work state;
- actors held different assumptions about status, priority, or timing;
- a blocker was socially known but surfaced or acted upon too late.

Treat it as more plausibly individual when the task was genuinely solo,
dependencies were already satisfied, ownership was clear, and no external queue
or shared-state mismatch can be traced.

### Cross-Report Model After R7

> Volatile environments and dependency networks change the work. The shared plan
> becomes stale, fragmented, or inconsistent. The visible assignee must reconstruct
> context and absorb waiting or approval costs. Negative affect, reduced
> expectancy, and immediate repair effort make delay attractive. Risk is disclosed
> or renegotiated too late, and the final miss is attributed to the individual even
> when the failure propagated through the network.

### Product Constraints Emerging From R7

- Represent dependencies, approvals, blockers, and waiting as schedule risks.
- Distinguish next-action, deadline, approval, and escalation ownership.
- Make handoffs actionable and receiver-aware.
- Keep shared state accurate, not merely visible.
- Support early risk disclosure without turning visibility into punishment.
- Do not confuse more messages or reporting with better coordination.
- Externalized execution systems must change action, not merely store status.
- Attribute deadline risk to the dependency network when evidence supports it.

### Evidence Limits

The strongest direct deadline evidence comes from construction and project
delivery. The construction meta-analysis aggregated subjective stakeholder
rankings from 16 studies in Africa and Asia, and the 2025 change-order percentages
come from a specific sample. Healthcare handoff evidence is strong but transfers
only analogically to ordinary knowledge work. The newest transactive-memory
meta-analysis covers laboratory studies and reports larger self-report than
behavioral effects. General knowledge-work prevalence therefore remains unknown.

## Frozen Failure Model

Status: **Accepted and frozen before Research 8.**

### Frozen Statement

> Before considering any solution, deadline failure is best modeled as a breakdown
> in maintaining a valid, legible, and recoverable commitment state under changing
> conditions.

This is a multi-path state-transition model, not a universal root cause.

### Distinct Pathways

1. The commitment is never captured or becomes hidden across artifacts.
2. Work remains ambiguous, misestimated, or overcommitted before execution.
3. A viable plan is invalidated by environmental or dependency change.
4. State becomes stale, fragmented, contradictory, or difficult to interpret.
5. Recovery fails through affective burden, context reconstruction, low
   expectancy, immediate repair cost, or delayed coordination.
6. A dependency network fails through ownership, handoff, approval, or escalation.
7. The task is rationally dropped, rebuilt, or renegotiated rather than failed.
8. Task outcome and productivity-system outcome diverge.

### Ranked Bottlenecks

1. **Leading:** plan-reality divergence followed by failed recovery.
2. **Runner-up:** ambiguity, misestimation, and overcommitment before the slip.
3. **Strong anti-thesis:** environmental and dependency invalidation repeatedly
   breaks plans, making recovery appear central when it may be downstream.

These rankings are based on evidence strength, cross-family convergence, outcome
proximity, downstream leverage, severity, and uncertainty. They are not based on
technical feasibility, novelty, marketability, or demonstration value.

### Important Outcome Distinctions

- disruption is not invalidation;
- increased risk is not an actual miss;
- task avoidance is not system avoidance;
- deadline completion is not system adherence;
- personal lateness is not always individual failure;
- rational dropping or renegotiation is not necessarily failure.

### Freeze Caveats

- Direct evidence measuring actual missed deadlines is thinner than evidence on
  delay, workload, stress, avoidance, late completion, and system abandonment.
- R2 is nonrepresentative user testimony and cannot establish prevalence.
- R3-R7 were deliberately asked to test the R2 recovery loop. Their convergence is
  meaningful across different evidence families, but not fully independent of
  prompt focus.
- The leading bottleneck is best supported within this research program, not
  proven to dominate every population or deadline type.
- Persona, task, deadline, environment, and dependency structure remain important
  moderators.

### Rule For Research 8

Research 8 may evaluate capability fit, trust, privacy, autonomy, reversibility,
and risk against this model. It may not rewrite the failure graph to match an
attractive technology. Any intervention must outperform ordinary software for a
specific frozen failure state without creating new staleness, correction work,
ownership ambiguity, monitoring pressure, or mistrust.

## Research 8: AI Capability Fit, Trust, and Autonomy

Research 8 tested where AI adds incremental value against the frozen model rather
than assuming every productivity function needs AI.

### Strongest Finding

**AI is strongest at making fragmented commitment state legible enough for a
person to recover intelligently.** Its clearest advantages are:

- extracting implicit commitments from unstructured artifacts;
- reconstructing where work stopped across messages, documents, notes, and
  calendars;
- exposing contradictions and changed assumptions with source evidence;
- drafting repair, rebuild, drop, and renegotiation options;
- turning ambiguous work into a candidate next executable action.

AI is usually unnecessary when inputs are already explicit, structured, and
rule-encodable. Ordinary software remains the stronger baseline for reminders,
recurrence, fixed scheduling logic, forms, and standard approval routing.

### Fit Against The Recovery Model

- Strongest fit: reconstructing where work stopped and drafting the next action.
- Moderate fit: detecting divergence, reconciling conflicts, determining what
  remains valid, and recommending priorities.
- Weak fit: inferring motives, resolving affective burden, deciding goal value,
  deleting commitments, or changing shared ownership and obligations.
- Rescheduling is valid only when the stored task state remains accurate and the
  user has authority to move it.

The post-slip decision remains human-governed. AI can prepare evidence and drafts
for repair, delay, rebuild, drop, or renegotiate, but should not silently choose
among value-laden or externally consequential options.

### Autonomy And Trust Boundaries

- Access is not authority.
- Explicit facts, probabilistic inferences, recommendations, and actions must be
  visibly distinguished.
- Trust should come from source links, timestamps, uncertainty, action previews,
  approval gates, logs, and undo rather than opaque claims of intelligence.
- Internal writes may be automated only when versioned, reversible, and easy to
  contest.
- Calendar changes should normally be proposed for approval.
- Messages, escalations, deletion, abandonment, ownership changes, and shared
  deadline changes require human approval.
- The system must abstain when sources conflict or authority is unclear.

### Major Failure Risks

- hallucinated commitments or deadlines;
- polished but stale recovery summaries;
- silent selection of the wrong source of truth;
- correction burden that exceeds the time saved;
- overreliance in weak capabilities after success in a different capability;
- privacy-invasive monitoring and sensitive behavioral inference;
- indirect prompt injection through the same emails, documents, and messages the
  system needs to interpret;
- creating another external state layer that becomes stale and avoided.

### Evidence Limits

There is little direct longitudinal evidence that AI productivity assistants
reduce missed deadlines or improve post-slip recovery. Existing field evidence
mostly concerns time savings, email, meetings, writing, adoption, or benchmark
performance. The recovery fit is therefore well-grounded conceptually but remains
largely analogical rather than outcome-proven.

Public product evidence is much stronger for capture, scheduling, rescheduling,
and summarization than for explicit post-divergence reconstruction. This supports
a candidate market gap, but public positioning cannot prove that no competitor
can perform recovery.

### Questions Carried Into Research 9

- Is recovery-state reconstruction the product's central intervention, while
  commitment extraction serves only as context gathering?
- Does richer inference save more effort than it creates in verification and
  correction work?
- Can the system remain useful without surveillance-like access or continuous
  manual maintenance?
- Which upstream failures are actually mediated by recovery, and which would
  still cause failure even under perfect recovery?
- Should collaboration remain a dependency-aware guardrail rather than become a
  full coordination product?
- Where should the boundary sit between reversible assistance and human-only
  commitment governance?

## Research 8.5: Persona And Deadline-Topology Calibration

Status: **Accepted as a bounded calibration memo, not as a new evidence pillar.**

### Strongest Finding

**Deadline topology predicts recovery burden and AI fit more precisely than broad
persona labels.** The relevant dimensions are:

- fixed or negotiable;
- solo or collaborative;
- structured or ambiguous;
- single-source or fragmented;
- internally controlled or dependency-blocked;
- stable or repeatedly invalidated;
- low-consequence or high-consequence;
- reversible or hard to reverse.

A fragmented student group project may resemble cross-functional professional
work more than a single-source student assignment. A solo founder's fixed client
commitment may resemble another individual's externally constrained deadline.

### Persona Calibration

- **Students:** easiest self-contained scenario, but AI adds little when the task
  is already legible in one LMS. The recovery thesis fits best for multi-course,
  group-project, application, or work-study commitments fragmented across
  portals, messages, notes, and calendars.
- **Professionals:** strong conceptual fit for cross-artifact reconstruction due
  to interruptions and tool fragmentation. Direct evidence connecting this to
  missed deadlines or post-slip recovery remains limited, and real deployment
  carries corporate privacy and authority constraints.
- **Entrepreneurs:** strong conceptual fit for repeated invalidation,
  heterogeneous artifacts, and external dependencies. The strongest direct
  outcome evidence is narrow to crowdfunded hardware delivery rather than daily
  personal recovery, and the resulting product can easily expand into complex
  team or project management.

No persona currently has enough direct evidence to become the universal target
solely from this calibration. Product synthesis should select the topology first
and treat persona as scenario context.

### Evidence Cautions

- The student-fragmentation statistic comes from a vendor-sponsored survey of
  U.S. college students. It supports scenario plausibility, not prevalence in all
  students or proof of post-slip reconstruction burden.
- Workplace app-switching, interruption, and tool-count statistics are mostly
  vendor studies or analogical proxies. They establish fragmentation, not actual
  deadline misses or AI benefit.
- The founder evidence directly measures missed delivery promises across a
  narrow crowdfunded-hardware sample. It should not be generalized to all
  entrepreneurs or individual commitments.
- General procrastination, interruption, or project-delay evidence must not be
  counted automatically as evidence that AI improves recovery.

### Claims Removed Or Restricted

- Remove the unsupported comparison that students procrastinate two to three
  times more than workers.
- Do not describe student privacy or authority as simple.
- Do not claim busy professionals broadly recover well after deadline slips.
- Do not infer that AI forecasting improves founder estimates merely because
  founder estimates are inaccurate.
- Keep demo suitability separate from evidence strength until the thesis survives
  Research 10.

### Implication For Research 9

Synthesize around a person facing a stale, fragmented, multi-source commitment
rather than around a universal student, professional, or entrepreneur profile.
R9 may test whether one recovery workflow generalizes across persona-specific
examples, but it must not use demo convenience to determine the causal thesis.

## Research 9: Corrected Synthesis

Status: **Provisional synthesis accepted after logic correction; must survive
Research 10 before the thesis is locked.**

### Final Causal Interpretation

Deadline failure remains a multi-path breakdown in maintaining a valid, legible,
and recoverable commitment state under changing conditions. Commitments may be
uncaptured, ambiguous, misestimated, overcommitted, externally invalidated,
dependency-blocked, or represented by stale and conflicting artifacts.

Plan-reality divergence followed by failed recovery remains the leading
intervention candidate, but it is not a universal cause. Recovery is most relevant
when:

- the commitment is known or discoverable;
- its stored representation no longer matches reality;
- a meaningful decision or action remains possible;
- the user has enough time and authority to repair, rebuild, drop, or renegotiate.

When these conditions do not hold, non-capture, infeasible workload, external
constraints, or dependency failure can independently determine the outcome.

### Corrected Perfect-Recovery Counterfactual

- **Non-capture:** not recoverable until the commitment is discovered. If it is
  discovered too late, perfect state reconstruction cannot save the deadline.
- **Ambiguity or misestimation:** recovery can clarify and replan, but cannot make
  an infeasible workload fit the remaining time.
- **Environmental or dependency invalidation:** perfect personal recovery cannot
  supply missing inputs or reverse external constraints. It may reveal that
  renegotiation, escalation, or abandonment is necessary.
- **Stale or fragmented state:** recovery removes an important state barrier, but
  does not guarantee task execution or on-time completion.
- **Affective or cognitive recovery burden:** lowering re-entry cost can restore
  the possibility of action without guaranteeing the outcome.
- **Rational abandonment:** successful recovery may correctly conclude that the
  commitment should be dropped or changed.
- **System outcome:** completing the task and continuing to use the productivity
  system remain separate outcomes.

The counterfactual therefore supports recovery as a high-leverage intervention
for a bounded class of failures, not as a complete explanation of missed
deadlines.

### Ranked Thesis

**Primary thesis:**

> When a still-actionable commitment becomes stale or fragmented after reality
> changes, the overlooked bottleneck is reconstructing a trustworthy current
> state and choosing the right recovery path.

The recovery paths are repair, deliberate delay, rebuild, drop, or renegotiate.
The intervention should reduce the work required to determine what changed, what
remains valid, what is blocked, and what can happen next.

**Runner-up:** ambiguity, misestimation, and overcommitment can make the original
plan infeasible before a recoverable plan ever exists.

**Anti-thesis:** repeated environmental or dependency invalidation can make
personal recovery downstream or insufficient, particularly when the user lacks
control over the blocking condition.

### Defensible Outcome Claim

Current evidence does not establish that an AI recovery system reduces missed
deadlines, late completion, or stress in longitudinal use.

The strongest claim before product validation is:

> The product is designed to reduce recovery effort and improve decision clarity
> after plan-reality divergence.

Candidate outcomes to test are time to reconstruct a valid plan, correction
burden, overlooked commitments, explicit recovery decisions, silent abandonment,
and only then late or missed deadlines. Preventing a miss is a possible downstream
benefit when divergence is detected early and recovery remains feasible, not an
established effect.

### Intervention Boundary

- **AI:** source-grounded extraction, comparison, contradiction surfacing,
  summarization, uncertainty labeling, and drafting recovery options from
  unstructured artifacts.
- **Deterministic software:** reminders, recurrence, explicit rules, structured
  scheduling, forms, checklists, and approval workflows.
- **Human:** deciding goal value and priorities; confirming what remains valid;
  choosing repair, rebuild, drop, or renegotiate; authorizing external actions.

AI should not diagnose why the user is disengaging, silently resolve conflicting
sources, infer blank calendar time as freely available, or claim reliable effort
and deadline estimates without grounded data and user confirmation.

### Applicability

The thesis is topology-scoped rather than persona-first. It fits best when state
is multi-source, stale or contradictory, still actionable, and costly to
reconstruct. It fits weakly when work is already structured in one source, when a
simple reminder solves the problem, or when an external constraint makes the
deadline impossible regardless of personal recovery.

Students, professionals, and entrepreneurs may all encounter the target topology.
No persona is part of the causal thesis, and demo convenience must not determine
the research conclusion.

### Standing Product Constraints

- Minimize new persistent state and never require duplicate plan maintenance.
- Keep inferred state sourced, timestamped, confidence-labeled, expiring,
  contestable, and reversible.
- Treat access and authority as separate checks.
- Show evidence, contradictions, assumptions, previews, logs, and undo.
- Ask when mental state, goal value, authority, or source truth is uncertain.
- Use minimum necessary data access; automatic derivation is not permission for
  surveillance.
- Require approval for messages, shared-calendar changes, ownership changes,
  commitment deletion, renegotiation, or escalation.
- Treat untrusted email, documents, chats, and web content as prompt-injection
  surfaces.
- Do not make periodic manual cleanup the price of keeping the system accurate.

### Research 10 Must Attack

- selection bias in the R2 abandonment corpus;
- convergence caused by directing R3-R7 toward the recovery hypothesis;
- whether recovery is procrastination research with renamed terms;
- whether easier recovery is valuable enough without proven deadline prevention;
- whether users in avoidance will invoke or verify the system;
- whether the inferred state becomes another stale layer;
- whether deterministic software can achieve similar outcomes with lower cost;
- whether existing products already own more of recovery than their positioning
  suggests;
- whether the topology describes enough real users to support a focused product.

## Research 10: Adversarial Attack

Status: **Accepted. Verdict: thesis survives narrowed as a falsifiable product
hypothesis.** It is not yet evidence of product efficacy, market prevalence, or
competitive novelty.

### Attack Matrix

| Attack | Severity | Result |
| --- | ---: | --- |
| R2 self-selection bias | 2 | Survives for the bounded target topology; broad prevalence remains unknown. |
| Directed-research convergence | 2 | Survives with independent planning and feasibility pathways preserved. |
| Procrastination relabeling | 1 | Survives; state reconstruction is distinct from task aversion. |
| Recovery value without prevention proof | 2 | Survives with recovery effort and decision clarity as the first outcomes. |
| Invocation and maintenance paradox | 3 | Serious unresolved product risk and hard kill condition. |
| Ordinary-software sufficiency | 2 | AI must beat deterministic recovery on unstructured cases only. |
| Competitor overlap | 1 | Weakens empty-market claims, not the bounded problem thesis. |
| Topology frequency and realism | 2 | Survives as a scope, while representative frequency remains unproven. |
| AI safety, trust, and privacy | 3 | Survives only under strict provenance, access, and approval constraints. |

### What Survived

- State reconstruction is a distinct post-divergence task, not merely another
  name for procrastination or motivation.
- Recovery is a bounded intervention for known or discoverable commitments that
  remain actionable after their stored state becomes stale or fragmented.
- Upfront ambiguity, misestimation, non-capture, external invalidation, and
  dependency failure remain independent pathways that recovery cannot always
  solve.
- AI has a plausible role only where evidence is unstructured, multi-source, and
  language-heavy. Structured reminders, rules, and scheduling remain ordinary
  software work.
- Goal value, final priorities, recovery-path choice, and consequential actions
  remain human-governed.

### Final Research Thesis

> When a known or discoverable commitment remains actionable but its plan no
> longer matches reality, recovery requires reconstructing a trustworthy current
> state and choosing whether to repair, deliberately delay, rebuild, drop, or
> renegotiate.

### Intervention Hypothesis

> For messy, multi-source evidence, an evidence-grounded AI assistant may reduce
> the effort required to reconstruct that state and evaluate recovery options,
> without becoming another system the user must maintain.

The first sentence is the surviving problem thesis. The second is a hypothesis
that must beat manual and deterministic baselines.

### Capture Precondition

Recovery requires enough evidence to reconstruct a commitment. A commitment may
already be discoverable in existing artifacts rather than manually entered into
a dedicated task system. Low-friction intake may be necessary when it is not
discoverable, but capture is a precondition for recovery rather than the core
product differentiator.

### Default Interaction Hypothesis

Explicit low-friction invocation is the default product hypothesis: forwarding
an email, uploading a screenshot, pasting a messy note, or selecting artifacts
for recovery. Background or proactive monitoring remains optional, narrow, and
consented rather than assumed because ambient access introduces surveillance,
false-alert, and nagging risks.

### What R10 Did Not Establish

- It did not establish how frequently the target topology occurs in a
  representative population.
- Generic app-abandonment evidence does not prove that stale-plan recovery caused
  the abandonment.
- It did not establish that clearer state causes task initiation, lower stress,
  fewer late tasks, or fewer missed deadlines.
- It did not establish that passive monitoring is necessary, acceptable, or
  safer than explicit low-friction invocation.
- It did not establish that AI reconstruction beats deterministic integration
  after verification, correction, privacy, latency, and cost are counted.
- It did not establish an empty competitive category. Current products already
  support overlapping extraction, summarization, workflow, and action features.
  The defensible claim remains a recovery-oriented product and experience gap,
  not absence of competing capability.

### Hard Kill Conditions

The intervention hypothesis should be rejected or materially redesigned if:

- the target topology is too infrequent or low-value for users to seek help;
- users do not invoke the experience when overloaded, or required monitoring is
  unacceptable;
- accessible artifacts are insufficient to reconstruct a trustworthy state;
- verification and correction take as much effort as manual recovery;
- a deterministic recovery workflow performs similarly with lower risk or cost;
- hallucinated, omitted, or stale commitments cannot be detected cheaply;
- users gain clarity but do not make a recovery decision or begin an action;
- existing products already provide an equivalent end-to-end recovery workflow
  with provenance and lower switching cost.

### Required Validation Order

1. Compare manual, deterministic, and AI-assisted recovery on the same disrupted
   multi-artifact scenarios.
2. Measure time to trustworthy state, fact precision and recall, source coverage,
   correction burden, recovery-option usefulness, and time to first valid action.
3. Test invocation separately: explicit one-step sharing or triggering versus any
   consented proactive mode. Do not assume ambient monitoring wins.
4. Test controlled omissions, contradictions, stale evidence, and malicious
   instructions before allowing external actions.
5. Only after the mechanism works should longitudinal tests examine late work,
   missed deadlines, stress, or system abandonment.

### Final Boundaries

- Do not claim deadline prevention, reduced late work, reduced burnout, or broad
  prevalence before measurement.
- Do not use chain-of-thought exposure as a trust mechanism. Use provenance,
  uncertainty, previews, approval, logs, and rollback.
- Do not infer that blank calendar time is available.
- Do not require passive access to every artifact. Minimum necessary access and
  explicit invocation must remain viable options.
- Do not claim that no competitor addresses recovery. Compare the complete
  recovery workflow rather than isolated AI features.

### Track A Result

The problem thesis survives Research 10. Product efficacy and differentiation now
become testable build hypotheses rather than additional literature questions.
The next Track A artifact is the Domain Understanding document; product design
and architecture follow after that synthesis is complete.

## Track A Thesis Lock

Status: **Locked after Research 10 unless product validation contradicts it.**

### Locked Problem Thesis

> When a known or discoverable commitment remains actionable but its plan has
> become stale, fragmented, or contradictory after reality changes, recovery
> requires reconstructing a trustworthy current state and choosing whether to
> repair, deliberately delay, rebuild, drop, or renegotiate.

### Defensible Product Claim

> The product is designed to reduce recovery effort and improve decision clarity
> after plan-reality divergence.

Fewer missed deadlines, faster completion, reduced stress, lower abandonment,
and reduced late work remain validation hypotheses rather than established
effects.

### Scope

The thesis applies strongest when:

- the commitment is known or discoverable from existing artifacts;
- the stored plan no longer matches reality;
- the commitment remains actionable;
- the user has enough time and authority to choose or request a recovery path;
- ordinary reminders and structured scheduling are insufficient.

It applies weakly when:

- the commitment was never captured or cannot be discovered;
- the task is fully structured in one reliable source;
- a simple reminder solves the failure;
- an external constraint makes the deadline impossible;
- the user lacks authority to act or renegotiate.

### Responsibility Boundary

- **AI:** reconstructs messy state from unstructured artifacts, surfaces
  contradictions, labels uncertainty, and drafts recovery options.
- **Deterministic software:** handles rules, reminders, recurrence, structured
  scheduling, checklists, and approval workflows.
- **Human:** confirms truth and goal value; chooses repair, deliberate delay,
  rebuild, drop, or renegotiate; approves external or consequential actions.

### Non-Negotiable Constraints

- no duplicate or independently stale planning layer;
- source-grounded inferred state with timestamps, uncertainty, expiry,
  contestability, and reversibility;
- minimum necessary data access and no silent surveillance;
- no inference of mental state, personal authority, or goal value;
- no autonomous external or consequential action;
- blank calendar slots are not automatically available time;
- email, documents, chats, LMS pages, and web content are prompt-injection
  surfaces;
- trust comes from provenance, uncertainty, previews, approval, logs, and
  rollback, not chain-of-thought exposure.

### First Validation

Compare manual recovery, a deterministic recovery workflow, and AI-assisted
recovery on the same disrupted multi-artifact scenarios. Measure:

- time to a trustworthy current state;
- omissions and false commitments;
- correction and verification burden;
- recovery-option quality;
- action initiation;
- trust and abandonment.

### Domain Understanding Completed

The Thesis Lock is the research conclusion, not the product-facing Domain
Understanding document. The completed document at
`docs/DOMAIN_UNDERSTANDING.md` synthesizes:

- R1's product archetypes and public-evidence gap;
- R2's ranked complaints and abandonment loop;
- R6's work-ecology and why-now context;
- the corrected R9 causal synthesis;
- R10's surviving thesis, narrowing, constraints, and kill conditions.

It does not introduce product features, UI, demo scripting, architecture, or
judging strategy. The next artifact is Product Definition, beginning with the
Product Wedge.
