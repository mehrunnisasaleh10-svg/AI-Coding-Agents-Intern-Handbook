# Task 2 — Six-Line Context Packet

**Goal:** Ensure the Task Tracker status filter returns only tasks matching the selected status.

**Relevant files:** `src/statusFilter.js` and `test/statusFilter.test.js`; `package.json` identifies the existing Node.js test command.

**Current behavior:** `filterTasks` returns all tasks when the selected status is exactly `"All"`; otherwise it compares task statuses case-insensitively using `toLowerCase()`.

**Expected behavior:** `"All"` returns all tasks; `"Open"` returns only open tasks; `"Done"` returns only done tasks. A task with status `"Open"` must never appear in the `"Done"` result.

**Constraints:** Keep the existing JavaScript/Node test setup. Do not add dependencies, refactor unrelated code, change files outside the filter and its relevant tests, or use real/private data.

**Acceptance criteria:** Tests cover All/Open/Done, including case differences, and the negative case that no Open task appears when Done is selected. Inspect the diff and report exact commands/results; do not claim a check passed unless it was run.
