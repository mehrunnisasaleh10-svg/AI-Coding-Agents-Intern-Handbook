export const DEFAULT_CONTRACT = Object.freeze({
  task: "Implement case-insensitive status filtering",
  inputs: ["acceptance criteria", "local task list"],
  allowedFiles: ["src/statusFilter.js", "test/statusFilter.test.js"],
  constraints: ["No refactor", "No network calls", "No shared-file editing across roles"],
  output: ["implementation result", "test results", "review notes"],
  verify: "Focused automated tests",
  stop: ["Blocked by missing input", "Acceptance criteria met"]
});

export const TASK_GRAPH = Object.freeze([
  { role: "Coordinator", task: "Define scope and delegation contract", dependsOn: [] },
  { role: "Implementation", task: "Implement the status filter", dependsOn: ["Coordinator"] },
  { role: "Test", task: "Run focused test cases", dependsOn: ["Coordinator"] },
  { role: "Review", task: "Review implementation output and test evidence", dependsOn: ["Implementation", "Test"] }
]);

export function validateDelegationContract(contract) {
  const required = ["task", "inputs", "allowedFiles", "constraints", "output", "verify", "stop"];
  const missing = required.filter((field) => {
    const value = contract?.[field];
    return value == null || (Array.isArray(value) && value.length === 0) ||
      (typeof value === "string" && value.trim() === "");
  });
  return { valid: missing.length === 0, missing };
}

export function detectFileConflicts(assignments) {
  const ownersByFile = new Map();
  for (const assignment of assignments) {
    for (const file of assignment.files) {
      const owners = ownersByFile.get(file) ?? [];
      owners.push(assignment.role);
      ownersByFile.set(file, owners);
    }
  }
  return [...ownersByFile.entries()]
    .filter(([, owners]) => owners.length > 1)
    .map(([file, owners]) => ({ file, owners }));
}

export function reviewImplementation({ implementation, testEvidence, acceptanceCriteria }) {
  if (!implementation || !Array.isArray(implementation.changedFiles)) {
    return { approved: false, findings: ["Implementation output is missing."] };
  }
  if (!testEvidence || testEvidence.status !== "passed") {
    return { approved: false, findings: ["Passing focused test evidence is required."] };
  }
  const conflicts = detectFileConflicts(implementation.assignments ?? []);
  if (conflicts.length) {
    return { approved: false, findings: conflicts.map(x => `File conflict: ${x.file} assigned to ${x.owners.join(", ")}.`) };
  }
  const missing = acceptanceCriteria.filter(c => !implementation.satisfiedCriteria?.includes(c));
  if (missing.length) {
    return { approved: false, findings: missing.map(c => `Acceptance criterion not evidenced: ${c}`) };
  }
  return { approved: true, findings: ["Implementation output, file boundaries, criteria, and test evidence reviewed."] };
}

export function coordinateWorkflow({ contract = DEFAULT_CONTRACT, assignments, implementation, testEvidence, acceptanceCriteria }) {
  const contractCheck = validateDelegationContract(contract);
  if (!contractCheck.valid) return { status: "blocked", reason: "Delegation contract is incomplete.", contractCheck };
  const conflicts = detectFileConflicts(assignments ?? []);
  if (conflicts.length) return { status: "blocked", reason: "File ownership conflicts must be resolved before work proceeds.", conflicts };
  const review = reviewImplementation({ implementation, testEvidence, acceptanceCriteria });
  return { status: review.approved ? "completed" : "needs_work", contractCheck, review, taskGraph: TASK_GRAPH };
}
