# Page 2 Practical — LLM, Context aur Memory

## Objective
Practise giving a coding agent relevant, bounded context before asking for a code change.

## Inspected project
- `src/statusFilter.js`: exports `filterTasks(tasks, selectedStatus)`.
- `test/statusFilter.test.js`: uses Node's built-in test runner and strict assertions.
- `package.json`: sets `"type": "module"` and `"test": "node --test"`.

## Page 2 exercise
Write a six-part context packet: Goal, Relevant files, Current behavior, Expected behavior, Constraints, Acceptance criteria. Then ask the agent to list missing assumptions before editing.

## Scope decision
This exercise is context preparation only. It does not require modifying application code. The existing filter implementation and tests are kept unchanged.

## Verification status
- Project files were inspected from the supplied ZIP.
- Tests have **not** been run as part of this Task 2 package.
- No claim is made that the code or tests were re-executed in this step.
