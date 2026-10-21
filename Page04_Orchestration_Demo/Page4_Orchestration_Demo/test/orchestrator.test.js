import test from "node:test";
import assert from "node:assert/strict";
import { runTask, filterTasksByStatus } from "../src/orchestrator.js";

const tasks = [
  { id: 1, title: "Review request", status: "Open" },
  { id: 2, title: "Update report", status: "Done" },
  { id: 3, title: "Check evidence", status: "Open" }
];

const tools = {
  filterTasks: (input) => filterTasksByStatus(input)
};

test("orchestrator invokes an authorized tool and verifies the result", () => {
  const outcome = runTask({
    request: {
      goal: "Show only Open tasks",
      acceptanceCriteria: [
        (result) => result.length === 2,
        (result) => result.every((task) => task.status === "Open")
      ]
    },
    proposedAction: {
      tool: "filterTasks",
      input: { tasks, selectedStatus: "Open" }
    },
    allowedTools: ["filterTasks"],
    tools
  });

  assert.equal(outcome.status, "completed");
  assert.equal(outcome.result.length, 2);
  assert.ok(outcome.trace.some((item) => item.step === "result_observed"));
  assert.equal(outcome.trace.at(-1).step, "completion_checked");
});

test("orchestrator blocks a tool that is not authorized", () => {
  const outcome = runTask({
    request: {
      goal: "Run an unapproved tool",
      acceptanceCriteria: [(result) => result !== null]
    },
    proposedAction: { tool: "deleteFiles", input: {} },
    allowedTools: ["filterTasks"],
    tools
  });

  assert.equal(outcome.status, "blocked");
  assert.equal(outcome.result, null);
  assert.ok(outcome.trace.some((item) => item.step === "permission_denied"));
});

test("orchestrator reports incomplete when acceptance criteria fail", () => {
  const outcome = runTask({
    request: {
      goal: "Find tasks that are Done",
      acceptanceCriteria: [(result) => result.length === 99]
    },
    proposedAction: {
      tool: "filterTasks",
      input: { tasks, selectedStatus: "Done" }
    },
    allowedTools: ["filterTasks"],
    tools
  });

  assert.equal(outcome.status, "incomplete");
  assert.equal(outcome.result.length, 1);
});

test("filter tool returns all tasks when status is All", () => {
  assert.equal(filterTasksByStatus({ tasks, selectedStatus: "All" }).length, 3);
});
