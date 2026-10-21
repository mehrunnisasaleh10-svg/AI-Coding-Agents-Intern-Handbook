import test from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_CONTRACT, TASK_GRAPH, validateDelegationContract, detectFileConflicts,
  reviewImplementation, coordinateWorkflow
} from "../src/multiAgentWorkflow.js";

const assignments = [
  { role: "Implementation", files: ["src/statusFilter.js"] },
  { role: "Test", files: ["test/statusFilter.test.js"] },
  { role: "Review", files: ["review-notes.md"] }
];
const implementation = {
  changedFiles: ["src/statusFilter.js", "test/statusFilter.test.js"],
  satisfiedCriteria: ["case-insensitive matching", "All returns every task"],
  assignments
};
const passingEvidence = { status: "passed", passed: 4, failed: 0 };
const criteria = ["case-insensitive matching", "All returns every task"];

test("delegation contract includes all required fields", () => {
  assert.deepEqual(validateDelegationContract(DEFAULT_CONTRACT), { valid: true, missing: [] });
});
test("final review depends on implementation and tests", () => {
  assert.deepEqual(TASK_GRAPH.find(n => n.role === "Review").dependsOn, ["Implementation", "Test"]);
});
test("file conflict detector flags a file assigned to two roles", () => {
  const result = detectFileConflicts([
    { role: "Implementation", files: ["src/statusFilter.js"] },
    { role: "Review", files: ["src/statusFilter.js"] }
  ]);
  assert.equal(result.length, 1);
  assert.equal(result[0].file, "src/statusFilter.js");
});
test("review approves criteria with passing test evidence", () => {
  assert.equal(reviewImplementation({ implementation, testEvidence: passingEvidence, acceptanceCriteria: criteria }).approved, true);
});
test("review rejects missing passing test evidence", () => {
  const result = reviewImplementation({ implementation, testEvidence: { status: "failed" }, acceptanceCriteria: criteria });
  assert.equal(result.approved, false);
  assert.match(result.findings[0], /Passing focused test evidence/);
});
test("coordinator blocks conflicting file ownership", () => {
  const result = coordinateWorkflow({
    contract: DEFAULT_CONTRACT,
    assignments: [
      { role: "Implementation", files: ["src/statusFilter.js"] },
      { role: "Review", files: ["src/statusFilter.js"] }
    ],
    implementation, testEvidence: passingEvidence, acceptanceCriteria: criteria
  });
  assert.equal(result.status, "blocked");
});
test("coordinator completes a well-scoped workflow", () => {
  const result = coordinateWorkflow({ contract: DEFAULT_CONTRACT, assignments, implementation, testEvidence: passingEvidence, acceptanceCriteria: criteria });
  assert.equal(result.status, "completed");
});
