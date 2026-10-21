# Copy-ready prompt for the coding agent

Goal: Prepare to work on the Task Tracker status filter.

Context:
- `src/statusFilter.js` exports `filterTasks(tasks, selectedStatus)`.
- `test/statusFilter.test.js` contains tests using Node's built-in test runner.
- `package.json` has the test command `node --test`.
- Current behavior and required cases are described in `context-packet.md`.

Scope:
- First inspect the listed files and any applicable repository instructions.
- Do not modify files yet.
- Compare current behavior with the acceptance criteria.
- List missing assumptions or unclear requirements separately.
- Identify the smallest relevant checks that should be run after a future change.

Constraints:
- No unrelated refactor.
- No new dependencies.
- Do not expose secrets or private data.
- Do not claim tests ran unless you actually execute them and observe the output.

Required response:
1. Files inspected.
2. Current behavior supported by the code.
3. Assumptions/questions.
4. Proposed smallest change, if any.
5. Tests to run.
6. Uncertainty or information still needed.

Stop after this inspection report and wait for human approval before editing.
