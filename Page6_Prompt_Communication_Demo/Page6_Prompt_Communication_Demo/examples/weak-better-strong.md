# Page 6 — Weak → Better → Strong

## Weak
> Filter theek kar do.

## Better
> Status filter par Done select karne se Open tasks bhi aa rahe hain. Expected: sirf Done.

## Strong
> Fix the Task Tracker status filter. Context: selecting Done currently includes Open tasks. Scope: status-filter component and relevant tests. Preserve existing All behavior; do not perform unrelated refactors or add dependencies. Acceptance criteria: Done returns only Done, Open returns only Open, and All returns every task. Run focused Open/Done/All tests. Report the diff summary, assumptions, exact test command/results, and any remaining uncertainty.

## Reusable structure
Goal → Context → Scope → Constraints → Acceptance criteria → Verification → Required response
