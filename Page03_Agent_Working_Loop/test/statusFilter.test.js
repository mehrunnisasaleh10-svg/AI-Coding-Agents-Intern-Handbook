import test from "node:test";
import assert from "node:assert/strict";
import { filterTasks } from "../src/statusFilter.js";

const tasks = [
  { id: 1, title: "Write report", status: "Open" },
  { id: 2, title: "Review changes", status: "Done" },
  { id: 3, title: "Fix typo", status: "open" },
];

test("All returns every task", () => {
  assert.equal(filterTasks(tasks, "All").length, 3);
});

test("Open matching is case-insensitive", () => {
  assert.deepEqual(filterTasks(tasks, "OPEN").map((task) => task.id), [1, 3]);
});

test("Done matching is case-insensitive", () => {
  assert.deepEqual(filterTasks(tasks, "done").map((task) => task.id), [2]);
});

test("unknown status returns an empty list", () => {
  assert.deepEqual(filterTasks(tasks, "Blocked"), []);
});
