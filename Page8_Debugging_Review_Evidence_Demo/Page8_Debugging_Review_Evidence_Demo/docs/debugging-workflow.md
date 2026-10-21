# Debugging Workflow

1. **Reproduce:** create a case with stored status `done` and selected filter `Done`.
2. **Relevant error:** the task should be visible but may be omitted by a case-sensitive comparison.
3. **Hypothesis:** UI selection and stored status differ only by letter case.
4. **Focused change:** normalize both strings before comparing.
5. **Verify:** test matching and non-matching status values.
6. **Regression check:** cover Open, Done, All, unknown status, malformed status, and empty input.

Do not label a failure flaky without repeat or historical evidence. Do not weaken assertions merely to get a green test run. Passing tests cover only the cases they exercise.
