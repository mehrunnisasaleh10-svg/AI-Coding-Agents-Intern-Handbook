import test from "node:test";
import assert from "node:assert/strict";
import { filterTasks } from "../src/statusFilter.js";

const tasks = [
  { id: 1, title: "Draft proposal", status: "Open" },
  { id: 2, title: "Review pull request", status: "Done" },
  { id: 3, title: "Prepare notes", status: "Open" },
  { id: 4, title: "Run checks", status: "Done" }
];

test("All returns every task and preserves the original task objects", () => {
  const result = filterTasks(tasks, "All");
  assert.equal(result.length, tasks.length);
  assert.deepEqual(result, tasks);
});

test("Open returns only Open tasks", () => {
  assert.deepEqual(filterTasks(tasks, "Open").map((task) => task.id), [1, 3]);
});

test("Done returns only Done tasks", () => {
  assert.deepEqual(filterTasks(tasks, "Done").map((task) => task.id), [2, 4]);
});

test("negative case: Open tasks never appear in Done results", () => {
  const result = filterTasks(tasks, "Done");
  assert.ok(result.every((task) => task.status === "Done"));
  assert.ok(!result.some((task) => task.status === "Open"));
});

test("matching is case-insensitive for stored status values", () => {
  const mixedCaseTasks = [
    { id: 5, title: "One", status: "done" },
    { id: 6, title: "Two", status: "OPEN" }
  ];
  assert.deepEqual(filterTasks(mixedCaseTasks, "Done").map((task) => task.id), [5]);
  assert.deepEqual(filterTasks(mixedCaseTasks, "Open").map((task) => task.id), [6]);
});

test("unknown status returns no tasks", () => {
  assert.deepEqual(filterTasks(tasks, "Blocked"), []);
});

test("empty task list returns an empty list", () => {
  assert.deepEqual(filterTasks([], "Done"), []);
});

test("malformed task status is safely ignored", () => {
  assert.deepEqual(filterTasks([{ id: 7, status: null }], "Done"), []);
});
