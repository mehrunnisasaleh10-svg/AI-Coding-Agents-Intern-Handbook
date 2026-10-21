# Delegation Contract — Page 5

| Field | Defined value |
|---|---|
| Task | Implement case-insensitive status filtering |
| Inputs | Acceptance criteria and local fake task list |
| Allowed files | `src/statusFilter.js`, `test/statusFilter.test.js` |
| Constraints | No refactor; no network calls; no shared-file editing across roles |
| Output | Implementation result, test results, review notes |
| Verify | Focused automated tests |
| Stop | Stop if blocked by missing input or when acceptance criteria are met |

## Roles
- **Coordinator:** defines scope, contract, boundaries, and task order.
- **Implementation:** owns the status-filter implementation within its allowed files.
- **Test:** runs focused tests and reports evidence.
- **Review:** inspects implementation output and test evidence after implementation/testing.

Implementation and test planning may overlap when inputs are stable. Final review is sequential. A second agent's opinion is not proof; concrete output and test evidence are required.
