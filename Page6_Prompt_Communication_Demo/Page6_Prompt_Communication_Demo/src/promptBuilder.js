const REQUIRED_SECTIONS = [
  "goal",
  "context",
  "scope",
  "constraints",
  "acceptanceCriteria",
  "verification",
  "requiredResponse"
];

export function validateRequest(request) {
  const missing = REQUIRED_SECTIONS.filter((field) => {
    const value = request?.[field];
    return value == null ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0);
  });
  return { valid: missing.length === 0, missing };
}

export function buildAgentPrompt(request) {
  const validation = validateRequest(request);
  if (!validation.valid) {
    return {
      ok: false,
      missing: validation.missing,
      prompt: null
    };
  }

  const sections = [
    ["Goal", request.goal],
    ["Context", request.context],
    ["Scope", request.scope],
    ["Constraints", request.constraints],
    ["Acceptance criteria", request.acceptanceCriteria],
    ["Verification", request.verification],
    ["Required response", request.requiredResponse]
  ];

  const prompt = sections.map(([heading, value]) => {
    const lines = Array.isArray(value) ? value.map((item) => `- ${item}`).join("\n") : value;
    return `${heading}:\n${lines}`;
  }).join("\n\n");

  return { ok: true, missing: [], prompt };
}

export const STATUS_FILTER_REQUESTS = Object.freeze({
  weak: "Filter theek kar do.",
  better: "Status filter par Done select karne se Open tasks bhi aa rahe hain. Expected: sirf Done.",
  strong: {
    goal: "Fix the Task Tracker status filter.",
    context: "Selecting Done currently includes Open tasks.",
    scope: ["Status-filter component", "Relevant tests"],
    constraints: ["Preserve existing All behavior", "No unrelated refactor", "No new dependencies"],
    acceptanceCriteria: [
      "Selecting Done returns only Done tasks",
      "Selecting Open returns only Open tasks",
      "Selecting All returns every task"
    ],
    verification: ["Run focused Open, Done, and All tests", "Report exact test command and result"],
    requiredResponse: [
      "Summarize the change",
      "List assumptions and any uncertainty",
      "Provide diff summary and exact verification results"
    ]
  }
});

export const COPY_READY_PROMPTS = Object.freeze({
  explainCode: "Explain this feature's data flow in simple terms. Name relevant files/functions. List assumptions and unclear points separately. Do not modify code.",
  diagnoseOnly: "Compare observed and expected behavior. Test the likely cause using evidence. Do not modify files. Give the smallest next verification step.",
  boundedChange: "Make the minimum coherent change for these acceptance criteria. Follow the allowed scope, run relevant checks, and report the diff, exact results, and limitations.",
  reviewDiff: "Review this diff without modifying it. Check correctness, regressions, security/data access, and missing tests. Report findings with evidence and severity."
});
