# Delivery States

| State | Meaning |
|---|---|
| Local tests pass | Selected checks passed on the tested local revision. |
| Hosted CI pass | CI checked a specific revision and configuration. |
| Merged | The change was integrated into the base branch. |
| Deployed | The change was released to a runtime environment; behavior still needs observation. |

A clean Git merge confirms textual/structural compatibility only; it does not prove semantic compatibility. Select checks after a base-branch change according to project policy, risk, and the changed surface. Avoid hiding broad refactors inside small bug fixes.
