import test from "node:test";
import assert from "node:assert/strict";
import {
  buildAgentPrompt,
  validateRequest,
  STATUS_FILTER_REQUESTS,
  COPY_READY_PROMPTS
} from "../src/promptBuilder.js";

test("validates all seven required request sections", () => {
  const result = validateRequest(STATUS_FILTER_REQUESTS.strong);
  assert.deepEqual(result, { valid: true, missing: [] });
});

test("rejects an incomplete request and names missing sections", () => {
  const result = buildAgentPrompt({ goal: "Fix a bug" });
  assert.equal(result.ok, false);
  assert.ok(result.missing.includes("context"));
  assert.ok(result.missing.includes("verification"));
  assert.equal(result.prompt, null);
});

test("builds a structured prompt with scope, constraints, and verification", () => {
  const result = buildAgentPrompt(STATUS_FILTER_REQUESTS.strong);
  assert.equal(result.ok, true);
  for (const heading of ["Goal:", "Context:", "Scope:", "Constraints:", "Acceptance criteria:", "Verification:", "Required response:"]) {
    assert.ok(result.prompt.includes(heading), `Missing ${heading}`);
  }
  assert.match(result.prompt, /Preserve existing All behavior/);
  assert.match(result.prompt, /exact test command and result/);
});

test("strong request is more specific than weak and better examples", () => {
  const strong = buildAgentPrompt(STATUS_FILTER_REQUESTS.strong).prompt;
  assert.ok(strong.length > STATUS_FILTER_REQUESTS.better.length);
  assert.match(STATUS_FILTER_REQUESTS.weak, /Filter/);
  assert.match(STATUS_FILTER_REQUESTS.better, /Expected: sirf Done/);
  assert.match(strong, /Selecting Done returns only Done tasks/);
});

test("copy-ready prompt templates cover four common tasks", () => {
  assert.deepEqual(Object.keys(COPY_READY_PROMPTS).sort(), ["boundedChange", "diagnoseOnly", "explainCode", "reviewDiff"].sort());
  assert.match(COPY_READY_PROMPTS.explainCode, /Do not modify code/);
  assert.match(COPY_READY_PROMPTS.diagnoseOnly, /Do not modify files/);
  assert.match(COPY_READY_PROMPTS.reviewDiff, /without modifying it/);
});

test("request asks for concise rationale and verification, not hidden chain-of-thought", () => {
  const result = buildAgentPrompt(STATUS_FILTER_REQUESTS.strong);
  assert.match(result.prompt, /assumptions and any uncertainty/i);
  assert.match(result.prompt, /exact verification results/i);
  assert.doesNotMatch(result.prompt, /hidden chain.of.thought/i);
});
