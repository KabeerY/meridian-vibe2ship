# Project Meridian

An evidence-grounded recovery workspace for commitments whose plans no longer
match reality. Meridian reconstructs what is true from a bounded set of work
artifacts, exposes conflicts and uncertainty, and helps the user choose and
approve a recovery path.

This is the VIBE2SHIP **Last-Minute Life Saver** submission. `Meridian` is a
temporary codename.

## Current Workflow

1. Select the artifacts for one disrupted commitment.
2. Reconstruct a source-grounded current state.
3. Inspect evidence and resolve or preserve uncertainty.
4. Choose repair, deliberate delay, rebuild, drop, or renegotiate.
5. Review and approve one next move.
6. Retain the inference, correction, decision, and approval trace.

The included professional scenario works without an API key. Add a Gemini key
to run the same workflow against selected text artifacts with structured output.

## Run Locally

Requirements: Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The API server runs on
port `3001` during development.

For live Gemini reconstruction:

```bash
cp .env.example .env
```

Set `GEMINI_API_KEY` in `.env`. The key is used only by the Express server and is
never bundled into the browser application.

## Production Build

```bash
npm run build
npm start
```

The Node server serves the built React application and `/api` routes from one
process. It listens on `PORT`, matching the Cloud Run runtime contract.

## Deploy to Google Cloud Run

The repository deploys directly from source with Google Cloud Buildpacks. A
Dockerfile and local Docker installation are not required.

After creating a Google Cloud project, enabling billing, installing and signing
in to the Google Cloud CLI, run:

```bash
PROJECT_ID=your-google-cloud-project-id npm run deploy:gcp
```

The script enables the required APIs, creates a least-privilege runtime service
account, stores the Gemini key in Secret Manager, and deploys a public Cloud Run
service in Mumbai (`asia-south1`). Override `REGION`, `SERVICE`, or `SECRET` as
environment variables when needed. Never put the real key in `.env.example`,
GitHub, or browser-side code.

## Stack

- React, TypeScript, Vite
- Express
- Google GenAI SDK with schema-constrained reconstruction
- Zod validation
- Lucide icons and Motion
- Google Cloud Run deployment target

## Project Files

- `src/`: recovery interface and deterministic demo scenario
- `server/`: Gemini reconstruction API and production static server
- `docs/`: locked domain, product, experience, and visual direction
- `CONTEXT.md`: concise project status and constraints
- `RESEARCH.md`: consolidated research findings
