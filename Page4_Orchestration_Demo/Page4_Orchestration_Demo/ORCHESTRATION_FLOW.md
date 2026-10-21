# Orchestration Flow — Page 4

1. **Human request:** “Show only Open tasks.”
2. **Orchestrator receives the request:** records the goal and acceptance criteria.
3. **Action proposed:** a fixed demo proposal chooses `filterTasks`.
4. **Permission check:** the orchestrator confirms that `filterTasks` is in the allowed-tools list.
5. **Tool execution:** the authorized local function filters the fake task list.
6. **Observe result:** the returned data is added to the trace.
7. **Completion check:** acceptance criteria are evaluated against the observed result.
8. **Handoff state:** `completed`, `incomplete`, or `blocked` is returned.

## Architecture mapping
- Model/proposer: represented by a fixed, deterministic proposed action.
- Orchestration: `runTask`.
- Authorized tool: `filterTasksByStatus`.
- Task state and evidence: returned `status`, `result`, `reason`, and `trace`.

## Limitations
This simulation does not connect to a real language model, repository, database, network, or shell tool. It demonstrates the control flow and permission boundary only.
