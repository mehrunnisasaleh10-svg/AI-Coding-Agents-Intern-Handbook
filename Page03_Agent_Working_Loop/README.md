# Page 3 Practical Task — Agent Ka Working Loop

## Goal
Demonstrate the supervised coding-agent loop: Task → Inspect → Propose → Policy check → Execute → Observe → Adjust → Verify → Handoff.

## Demo scope
A tiny JavaScript Task Tracker status filter. The exercise starts with a case-sensitive filter, observes a failing test for `Done`/`done`, applies a bounded normalization fix, and reruns the focused tests.

## Run
Requires Node.js. From this folder run:

```bash
node --test
```

## Safety and evidence
- The initial failing test and final passing test output are recorded in `evidence/`.
- The final implementation is in `src/statusFilter.js`.
- No API, database, production data, or external dependency is used.
- Review the diff and report only the checks actually executed.
