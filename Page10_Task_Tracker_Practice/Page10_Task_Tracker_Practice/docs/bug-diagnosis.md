# Bug Diagnosis — Task Tracker Status Filter

## Symptom
Selecting a status can omit tasks whose stored status uses different letter casing (for example, stored `done` while the selected filter is `Done`).

## Root cause
A case-sensitive string comparison treats `done` and `Done` as different values.

## Focused fix
Normalize both the task status and selected status to lowercase before comparing. Keep the `All` path unchanged so it returns every task.

## Regression checks
- `All` returns every task.
- `Open` returns only Open tasks.
- `Done` returns only Done tasks.
- Negative case: Open tasks do not appear in Done results.
- Mixed-case stored values, unknown statuses, empty lists, and malformed statuses are covered.

## Scope
Only the status-filter function and its focused tests are included. No UI, API, database, dependency, or unrelated refactor is included.
