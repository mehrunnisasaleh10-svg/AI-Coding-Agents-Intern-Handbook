# Page 7 Practical — Real Repository Daily Workflow

This small, dependency-free project demonstrates the Page 7 repository workflow:

1. Read repository instructions and inspect working-tree status.
2. Define the task and acceptance criteria.
3. Confirm branch/worktree and protect existing changes.
4. Make one small, scoped change.
5. Inspect the diff.
6. Run relevant checks.
7. Prepare a review handoff.
8. Record the exact revision and checks.

## Run locally (Windows PowerShell)

Open the folder containing `package.json` in VS Code, then run:

```powershell
npm.cmd test
```

Requires Node.js 18 or newer. No external services or third-party packages are needed.

## Demo

The workflow validator checks that the handoff contains the revision identifier, exact checks, results, and delivery state. It keeps Local tests pass, Hosted CI pass, Merged, and Deployed as separate states. It also warns that a clean textual merge does not prove semantic compatibility.
