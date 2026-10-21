export const WORKFLOW_STEPS = Object.freeze([
  "instructions-and-status",
  "code-and-criteria",
  "branch-or-worktree",
  "small-change",
  "inspect-diff",
  "checks",
  "pull-request-review",
  "exact-revision"
]);

export const DELIVERY_STATES = Object.freeze([
  "local-tests-pass",
  "hosted-ci-pass",
  "merged",
  "deployed"
]);

export function inspectWorkingTree(statusOutput) {
  const status = String(statusOutput ?? "").trim();
  if (!status || status === "working tree clean") {
    return { clean: true, warning: null };
  }
  return {
    clean: false,
    warning: "Existing changes detected. Inspect and preserve them before editing; do not overwrite or silently include them."
  };
}

export function validateHandoff(handoff) {
  const errors = [];
  if (!handoff || typeof handoff !== "object") {
    return { valid: false, errors: ["Handoff must be an object."] };
  }
  if (typeof handoff.revision !== "string" || !handoff.revision.trim()) {
    errors.push("Exact revision identifier is required.");
  }
  if (!Array.isArray(handoff.checks) || handoff.checks.length === 0) {
    errors.push("List the exact checks that were run.");
  } else if (handoff.checks.some((check) =>
    !check || typeof check.command !== "string" || !check.command.trim() ||
    typeof check.result !== "string" || !check.result.trim()
  )) {
    errors.push("Every check must include its exact command and result.");
  }
  if (!DELIVERY_STATES.includes(handoff.deliveryState)) {
    errors.push("Use one recognized delivery state; do not treat local tests, CI, merge, and deployment as equivalent.");
  }
  if (typeof handoff.scope !== "string" || !handoff.scope.trim()) {
    errors.push("Change scope is required.");
  }
  if (typeof handoff.diffSummary !== "string" || !handoff.diffSummary.trim()) {
    errors.push("Diff summary is required.");
  }
  return { valid: errors.length === 0, errors };
}

export function assessBaseChange({ changedFiles = [], risk = "medium", policy = "targeted" } = {}) {
  const knownRisk = ["low", "medium", "high"].includes(risk);
  const knownPolicy = ["targeted", "full-suite"].includes(policy);
  if (!knownRisk || !knownPolicy) {
    return { valid: false, recommendedChecks: [], note: "Unknown risk or project policy; clarify before selecting checks." };
  }
  const recommendedChecks = policy === "full-suite" || risk === "high"
    ? ["project-required-full-suite"]
    : changedFiles.length > 0
      ? ["checks-for-changed-surface", "relevant-regression-tests"]
      : ["confirm-changed-surface", "checks-required-by-project-policy"];
  return {
    valid: true,
    recommendedChecks,
    note: "A clean textual merge does not prove semantic compatibility. Choose checks based on risk, policy, and the changed surface."
  };
}

export function summarizeHandoff(handoff) {
  const validation = validateHandoff(handoff);
  if (!validation.valid) return { ready: false, errors: validation.errors, summary: null };
  return {
    ready: true,
    errors: [],
    summary: {
      revision: handoff.revision,
      scope: handoff.scope,
      diffSummary: handoff.diffSummary,
      checks: handoff.checks.map(({ command, result }) => ({ command, result })),
      deliveryState: handoff.deliveryState
    }
  };
}
