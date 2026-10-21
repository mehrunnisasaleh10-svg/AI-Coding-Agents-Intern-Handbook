import test from "node:test";
import assert from "node:assert/strict";
import { filterTasks } from "../src/statusFilter.js";

const tasks = [
  { id: 1, title: "Review request", status: "Open" },
  { id: 2, title: "Update report", status: "Done" },
  { id: 3, title: "Check evidence", status: "Open" }
];

test("Done returns only Done tasks", () => {
  assert.deepEqual(filterTasks(tasks, "Done").map((task) => task.status), ["Done"]);
});

test("Open returns only Open tasks", () => {
  assert.deepEqual(filterTasks(tasks, "Open").map((task) => task.status), ["Open", "Open"]);
});

test("All preserves the existing behavior and returns every task", () => {
  assert.equal(filterTasks(tasks, "All").length, 3);
});
