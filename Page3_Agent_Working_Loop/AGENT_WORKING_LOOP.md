# Agent Working Loop — Practical Walkthrough

## 1. Task
Make status matching case-insensitive while preserving the existing `All` behavior. Keep the change small and local.

## 2. Inspect
Read `src/statusFilter.js` and `test/statusFilter.test.js`. The initial implementation compares status strings directly, so `Done` and `done` do not match.

## 3. Propose
Normalize both the selected status and each task status to lowercase before comparing. Keep the `All` branch unchanged. Do not add dependencies or change unrelated files.

## 4. Policy check
The change is limited to the local demo. It does not access secrets, production records, APIs, or databases. The test command is `node --test`.

## 5. Execute
Run `node --test` before the change to observe the failing case. Then apply the proposed one-function change.

## 6. Observe
The initial test run should show the case-insensitive `Done` test failing. The actual captured result is in `evidence/initial-test-output.txt`.

## 7. Adjust
Update the comparison to normalize both values. This is the smallest change that addresses the observed failure.

## 8. Verify
Run `node --test` again. The final captured output is in `evidence/final-test-output.txt`. Review the final source and tests.

## 9. Handoff
Report the exact scope, the change made, the test command and its actual result. A tool attempt is not proof of success; the final command output is the evidence.
