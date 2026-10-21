import test from "node:test";
import assert from "node:assert/strict";
import { filterTasks } from "../src/statusFilter.js";

const tasks = [
  { id: 1, title: "Write tests", status: "Open" },
  { id: 2, title: "Review changes", status: "done" },
  { id: 3, title: "Update docs", status: "Done" },
  { id: 4, title: "Check output", status: "open" }
];

test("reproduces the bug: Done includes lowercase stored status", () => {
  assert.deepEqual(
    filterTasks(tasks, "Done").map((task) => task.id),
    [2, 3]
  );
});

test("Open returns only Open tasks regardless of stored letter case", () => {
  assert.deepEqual(
    filterTasks(tasks, "Open").map((task) => task.id),
    [1, 4]
  );
});

test("All returns every task", () => {
  assert.equal(filterTasks(tasks, "All").length, 4);
});

test("unknown status returns no tasks", () => {
  assert.deepEqual(filterTasks(tasks, "Blocked"), []);
});

test("malformed task status does not crash filtering", () => {
  assert.deepEqual(filterTasks([{ id: 5, status: null }], "Done"), []);
});

test("empty task list remains empty", () => {
  assert.deepEqual(filterTasks([], "Done"), []);
});
