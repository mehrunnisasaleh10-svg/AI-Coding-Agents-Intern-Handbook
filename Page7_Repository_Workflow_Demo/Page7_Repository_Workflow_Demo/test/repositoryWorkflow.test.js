import test from "node:test";
import assert from "node:assert/strict";
import {
  WORKFLOW_STEPS,
  DELIVERY_STATES,
  inspectWorkingTree,
  validateHandoff,
  assessBaseChange,
  summarizeHandoff
} from "../src/repositoryWorkflow.js";

const validHandoff = {
  revision: "abc1234",
  scope: "Correct status-filter matching only",
  diffSummary: "Updated the status comparison and added focused tests.",
  checks: [{ command: "npm.cmd test", result: "9 passed, 0 failed" }],
  deliveryState: "local-tests-pass"
};

test("workflow lists the eight repository steps in order", () => {
  assert.equal(WORKFLOW_STEPS.length, 8);
  assert.equal(WORKFLOW_STEPS[0], "instructions-and-status");
  assert.equal(WORKFLOW_STEPS[7], "exact-revision");
});

test("delivery states remain distinct", () => {
  assert.deepEqual(DELIVERY_STATES, ["local-tests-pass", "hosted-ci-pass", "merged", "deployed"]);
  assert.equal(DELIVERY_STATES.includes("local-tests-pass"), true);
  assert.notEqual("local-tests-pass", "deployed");
});

test("working-tree inspection warns about existing changes", () => {
  const result = inspectWorkingTree(" M src/App.tsx");
  assert.equal(result.clean, false);
  assert.match(result.warning, /preserve them/i);
});

test("clean working tree does not create a warning", () => {
  assert.deepEqual(inspectWorkingTree("working tree clean"), { clean: true, warning: null });
});

test("handoff accepts revision, scope, diff, exact checks, and delivery state", () => {
  assert.deepEqual(validateHandoff(validHandoff), { valid: true, errors: [] });
});

test("handoff rejects missing exact revision and checks", () => {
  const result = validateHandoff({ ...validHandoff, revision: "", checks: [] });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => /revision/i.test(error)));
  assert.ok(result.errors.some((error) => /exact checks/i.test(error)));
});

test("handoff rejects a result without an exact command", () => {
  const result = validateHandoff({
    ...validHandoff,
    checks: [{ command: "", result: "passed" }]
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => /exact command and result/i.test(error)));
});

test("handoff rejects delivery states that overclaim completion", () => {
  const result = validateHandoff({ ...validHandoff, deliveryState: "everything-done" });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => /delivery state/i.test(error)));
});

test("base-change checks are selected using risk and policy", () => {
  const targeted = assessBaseChange({ changedFiles: ["src/filter.js"], risk: "low", policy: "targeted" });
  assert.deepEqual(targeted.recommendedChecks, ["checks-for-changed-surface", "relevant-regression-tests"]);
  const highRisk = assessBaseChange({ changedFiles: ["src/auth.js"], risk: "high", policy: "targeted" });
  assert.deepEqual(highRisk.recommendedChecks, ["project-required-full-suite"]);
});

test("base-change assessment explains that clean merge is not semantic proof", () => {
  const result = assessBaseChange({ changedFiles: ["src/filter.js"], risk: "medium", policy: "targeted" });
  assert.match(result.note, /does not prove semantic compatibility/i);
});

test("summary is ready only when handoff evidence is complete", () => {
  const result = summarizeHandoff(validHandoff);
  assert.equal(result.ready, true);
  assert.equal(result.summary.revision, "abc1234");
  assert.equal(result.summary.deliveryState, "local-tests-pass");
  assert.equal(summarizeHandoff({}).ready, false);
});
