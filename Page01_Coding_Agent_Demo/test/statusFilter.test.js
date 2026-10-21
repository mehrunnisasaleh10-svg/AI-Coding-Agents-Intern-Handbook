import test from "node:test";
import assert from "node:assert/strict";
import { filterTasks } from "../src/statusFilter.js";

const tasks = [
  { id: 1, title: "Write report", status: "Open" },
  { id: 2, title: "Review changes", status: "Done" },
  { id: 3, title: "Fix typo", status: "open" }
];

test("All returns every task", () => assert.equal(filterTasks(tasks, "All").length, 3));
test("Open returns open tasks case-insensitively", () =>
  assert.deepEqual(filterTasks(tasks, "Open").map(t => t.id), [1, 3]));
test("Done excludes open tasks (negative case)", () => {
  const result = filterTasks(tasks, "Done");
  assert.deepEqual(result.map(t => t.id), [2]);
  assert.equal(result.some(t => t.status.toLowerCase() === "open"), false);
});
test("Unknown status returns an empty list", () =>
  assert.deepEqual(filterTasks(tasks, "Blocked"), []));
