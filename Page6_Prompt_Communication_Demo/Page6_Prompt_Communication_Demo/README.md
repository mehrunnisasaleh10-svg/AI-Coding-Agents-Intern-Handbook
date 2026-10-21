# Page 6 Practical — Communicating Clearly with an AI Agent

This project implements Page 6's reusable request structure:

**Goal → Context → Scope → Constraints → Acceptance criteria → Verification → Required response**

## What's included
- A typed-by-contract request builder that validates required prompt sections.
- A weak → better → strong request comparison for the Task Tracker status-filter issue.
- Copy-ready templates for explain-code, diagnose-only, bounded-change, and review-diff requests.
- Tests that ensure prompts are measurable, scoped, and request observable verification rather than hidden chain-of-thought.

## Run tests on Windows PowerShell
From the project folder, run:

```powershell
npm.cmd test
```

Requires Node.js 18 or newer. No external services or dependencies are needed.
