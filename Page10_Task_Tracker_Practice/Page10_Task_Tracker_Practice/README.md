# Page 10 Practice — Task Tracker Status Filter

Implements the Page 10 practice task: add an All/Open/Done filter, preserve existing behavior, diagnose a relevant bug, run positive and negative tests, and prepare an evidence-backed handoff.

## Run tests on Windows
Open this folder in VS Code, open Terminal → New Terminal, then run:

```powershell
npm.cmd test
```

Requires Node.js 18 or newer. No third-party packages are required.

## Included
- `src/statusFilter.js` — focused status-filter implementation.
- `test/statusFilter.test.js` — positive, negative, regression, and edge-case tests.
- `docs/bug-diagnosis.md` — symptom, root cause, fix, and scope.
- `docs/pr-handoff.md` — evidence-backed handoff.
- `evidence/implementation.diff` — focused implementation diff.
- `evidence/final-revision.txt` — exact revision of the completed demo.
- `evidence/final-test-output.txt` — test output from the preparation environment.

Review the diff and rerun tests locally before reporting laptop verification.
