/**
 * Minimal orchestration-layer demo.
 * The model/proposer is represented by a fixed proposed action so the
 * example remains deterministic and testable without external services.
 */

export function runTask({ request, proposedAction, allowedTools, tools }) {
  const trace = [
    { step: "request_received", detail: request.goal },
    { step: "action_proposed", detail: proposedAction.tool }
  ];

  if (!allowedTools.includes(proposedAction.tool)) {
    trace.push({ step: "permission_denied", detail: proposedAction.tool });
    return {
      status: "blocked",
      result: null,
      trace,
      reason: `Tool "${proposedAction.tool}" is not authorized.`
    };
  }

  const tool = tools[proposedAction.tool];
  if (typeof tool !== "function") {
    trace.push({ step: "tool_unavailable", detail: proposedAction.tool });
    return {
      status: "blocked",
      result: null,
      trace,
      reason: `Authorized tool "${proposedAction.tool}" is unavailable.`
    };
  }

  trace.push({ step: "tool_invoked", detail: proposedAction.tool });
  const result = tool(proposedAction.input);
  trace.push({ step: "result_observed", detail: JSON.stringify(result) });

  const criteriaMet = request.acceptanceCriteria.every((criterion) =>
    criterion(result)
  );

  trace.push({
    step: "completion_checked",
    detail: criteriaMet ? "acceptance criteria met" : "acceptance criteria not met"
  });

  return {
    status: criteriaMet ? "completed" : "incomplete",
    result,
    trace,
    reason: criteriaMet ? "All acceptance criteria were met." : "One or more acceptance criteria were not met."
  };
}

export function filterTasksByStatus({ tasks, selectedStatus }) {
  if (selectedStatus === "All") return tasks;
  return tasks.filter(
    (task) => task.status.toLowerCase() === selectedStatus.toLowerCase()
  );
}
