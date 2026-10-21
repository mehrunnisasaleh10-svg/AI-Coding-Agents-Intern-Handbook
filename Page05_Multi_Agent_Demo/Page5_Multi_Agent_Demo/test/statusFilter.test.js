import test from "node:test";
import assert from "node:assert/strict";
import { filterTasks } from "../src/statusFilter.js";
const tasks = [
  { id: 1, title: "Review request", status: "Open" },
  { id: 2, title: "Update report", status: "Done" },
  { id: 3, title: "Check evidence", status: "Open" }
];
test("All returns every task", () => assert.equal(filterTasks(tasks, "All").length, 3));
test("status matching is case-insensitive", () => assert.equal(filterTasks(tasks, "open").length, 2));
test("unknown status returns no tasks", () => assert.deepEqual(filterTasks(tasks, "Blocked"), []));
