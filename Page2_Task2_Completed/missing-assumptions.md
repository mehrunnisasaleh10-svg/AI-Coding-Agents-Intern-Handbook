# Missing-Assumption Check

Before editing, the agent should answer these questions:

1. Does the repository define any additional allowed status values besides `Open` and `Done`?
2. Should `" All "` (with whitespace) be treated as `"All"`, or should only the exact label `"All"` select every task?
3. Can `task.status` ever be missing, null, or not a string? The current function assumes it is a string.
4. Should the function return the original task array for `"All"` or a copy? The current implementation returns the original array.
5. Are there project instructions outside the supplied ZIP that must be followed?

## Safe handling
- Do not guess answers to these questions if repository instructions or data do not establish them.
- For this bounded exercise, preserve current behavior unless the acceptance criteria or repository source requires a change.
- If an answer affects implementation and cannot be determined from the available files, ask the human before changing behavior.
