const SENSITIVE_TERMS = [
  "password",
  "token",
  "production data",
  "private customer record",
  "customer records",
  "secret"
];

const UNTRUSTED_SOURCES = [
  "repository text",
  "webpage",
  "issue text",
  "tool output"
];

export function scanPromptForSensitiveData(prompt) {
  const text = String(prompt ?? "").toLowerCase();
  const matches = SENSITIVE_TERMS.filter((term) => text.includes(term));
  return {
    safe: matches.length === 0,
    findings: matches.map((term) => `Potential sensitive-data reference: ${term}`)
  };
}

export function classifyInstructionSource(source) {
  const normalized = String(source ?? "").toLowerCase();
  const untrusted = UNTRUSTED_SOURCES.some((term) => normalized.includes(term));
  return {
    trustedForPolicy: !untrusted,
    classification: untrusted ? "untrusted-task-data" : "requires-normal-policy-check"
  };
}

export function assessAction({
  actionType = "read-only",
  authorityConfirmed = false,
  needsSecretOrCustomerData = false,
  acceptanceCriteriaClear = false,
  checksAvailable = false,
  securityConcern = false,
  ownerDecisionMissing = false
} = {}) {
  const consequential = ["production-write", "destructive", "security-bypass"].includes(actionType);
  const escalate = (consequential && !authorityConfirmed) ||
    needsSecretOrCustomerData ||
    securityConcern ||
    ownerDecisionMissing;

  if (escalate) {
    return {
      decision: "pause-and-escalate",
      reasons: [
        ...(consequential && !authorityConfirmed ? ["Authority for consequential action is not confirmed."] : []),
        ...(needsSecretOrCustomerData ? ["Required secret or customer-data access needs authorization."] : []),
        ...(securityConcern ? ["A security concern needs review."] : []),
        ...(ownerDecisionMissing ? ["A required owner decision is missing."] : [])
      ]
    };
  }

  if (actionType === "read-only" && authorityConfirmed) {
    return { decision: "continue", reasons: ["Permitted read-only inspection."] };
  }
  if (actionType === "bounded-local-edit" && authorityConfirmed) {
    return { decision: "continue", reasons: ["Bounded, reversible local edit is authorized."] };
  }
  if (acceptanceCriteriaClear && checksAvailable && authorityConfirmed) {
    return { decision: "continue", reasons: ["Acceptance criteria and verification checks are available."] };
  }
  return {
    decision: "pause-and-clarify",
    reasons: ["Confirm authority, scope, acceptance criteria, and available checks before proceeding."]
  };
}

export function getEfficiencyLimits({ platformSupportsLimits = false } = {}) {
  if (!platformSupportsLimits) {
    return {
      applicable: false,
      note: "The platform does not expose these controls; do not claim limits were configured."
    };
  }
  return {
    applicable: true,
    limits: ["agent-count", "retries", "execution-time", "spend"]
  };
}
