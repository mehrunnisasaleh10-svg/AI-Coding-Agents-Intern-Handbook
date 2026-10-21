# Page 1 — Proposal vs. Verified Result

## Goal
Show that an AI agent's proposal is not proof: the application must execute a focused test and produce observable output.

## Handbook connection
Page 1 shows: agent proposes a filter fix -> application executes a test -> focused test result is observed.

## Proposed change
Compare task statuses case-insensitively while keeping the change limited to one function.

## Acceptance criteria
- All returns every task.
- Open returns only open tasks, case-insensitively.
- Done does not include any Open task (negative case).
- Unknown status returns an empty list.

## Run tests
`npm test` (runs Node.js built-in `node --test`; no external packages required).

## Limitations
This is a local example with fake in-memory data. It does not verify a UI, API, database, or production behavior.
