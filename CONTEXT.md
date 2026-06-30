# Project Context

Last updated: 2026-06-29

## Hackathon

VIBE2SHIP by Google for Developers and Coding Ninjas.

Problem statement: **The Last-Minute Life Saver**.

Build an AI-powered productivity companion that proactively helps students,
professionals, and entrepreneurs plan, prioritize, and complete work before
deadlines are missed. It must move beyond passive reminders and help users take
meaningful action.

## Judging Weights

- Problem Solving and Impact: 20%
- Agentic Depth: 20%
- Innovation and Creativity: 20%
- Google Technologies: 15%
- Product Experience and Design: 10%
- Technical Implementation: 10%
- Completeness and Usability: 5%

Required submission: public deployed app on Google Cloud, GitHub repository, and
a public Google Doc describing the project.

## Our Direction

We are not building another generic to-do list, reminder app, calendar clone, or
chatbot wrapper.

The locked problem thesis is:

> When a known or discoverable commitment remains actionable but its plan has
> become stale, fragmented, or contradictory after reality changes, recovery
> requires reconstructing a trustworthy current state and choosing whether to
> repair, deliberately delay, rebuild, drop, or renegotiate.

The selected product wedge is a **personal recovery assistant for individual
knowledge workers**. It turns a user-selected bundle of stale, conflicting work
artifacts into a source-grounded current state and a human-approved recovery
path. The hero context is professional and individual-contributor flavored, not
an enterprise project-management system.

The intervention hypothesis remains unproven: evidence-grounded AI must reduce
recovery effort compared with manual and deterministic alternatives without
becoming another system the user must maintain.

## Current Decisions

- Research first, architecture afterward.
- Do not force one universal root cause.
- Judge strategy can shape the demo and polish, but not the human failure model.
- Research 1 through Research 10 are complete and the Track A thesis is locked.
- Domain Understanding, Product Wedge, Experience Design, and Visual Design
  Direction artifacts are complete.
- Primary validation metric: time from explicit invocation to a user-confirmed,
  source-grounded current state with no uncorrected critical factual error.
- Default interaction hypothesis: explicit, low-friction artifact selection or
  sharing; proactive monitoring is optional and consented.
- AI handles unstructured reconstruction; deterministic software handles rules
  and structured state; humans make recovery and consequential decisions.
- Build one exceptional, visible workflow rather than many shallow features.
- Use Google AI Studio and Gemini, with AI Studio deployment to Cloud Run as the
  preferred deployment path.
- React, TypeScript, Vite, and Express now form one Cloud Run-deployable service.
- Gemini reconstruction uses server-side structured output; a deterministic demo
  fallback keeps the submitted workflow reliable without an exposed API key.
- Firebase is deferred until the single-user recovery workflow proves it needs
  persisted accounts or cross-device state.
- Keep the product ambitious but scoped tightly enough to finish and polish.

## Research Path

1. Product landscape
2. Real user complaints and abandonment
3. Psychology, emotion, and avoidance
4. Cognitive load, attention, stress, and executive function
5. Planning fallacy, time judgment, and commitment
6. Modern work environment and AI-era pressures
7. Coordination, dependencies, and external execution systems
8. AI capability, trust, privacy, and autonomy
9. Failure-model synthesis
10. Adversarial attack on the final thesis

Current status: the first complete recovery workflow is implemented and passes a
production build. Artifact intake, reconstruction, evidence inspection,
correction, five-path recovery, approval, and trace history are operational.
Next: live Gemini scenario testing, validation instrumentation, deployment, and
demo polish.
