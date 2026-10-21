# Page 4 Practical — Orchestration Layer

A small, beginner-friendly JavaScript demo based on Page 4 of *AI Coding Agents: Intern se Confident*.

## Goal
Demonstrate how an orchestrator coordinates a request, a proposed action, an authorized tool, an observable result, and a completion decision. This is a local simulation: it does not call an LLM, edit a real repository, or use external services.

## Run
Requires Node.js 18 or newer.

```bash
npm test
```

## What is implemented
- A task request with explicit acceptance criteria.
- An orchestrator that checks whether the requested tool is allowed.
- A small authorized tool that performs a status-filter operation.
- Observable results recorded in a trace.
- A completion check against the expected result.
- Tests for success, denied tools, and incomplete criteria.

## Safety boundary
This is an educational simulation, not a production agent framework. Tool permissions are checked in application code; no external commands or network requests are executed.
