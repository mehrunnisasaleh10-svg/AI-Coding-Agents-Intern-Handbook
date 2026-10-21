# Page 8 Practical — Debugging, Review and Evidence

This demo follows the Page 8 debugging loop:

Reproduce → Relevant error → Hypothesis → Focused change → Verify → Regression check

It demonstrates a Task Tracker bug where selecting `Done` can miss tasks whose stored status is lowercase `done`. The fix normalizes case and includes positive and negative test cases.

## Run on Windows

Open the folder containing `package.json` in VS Code and run:

```powershell
npm.cmd test
```

Requires Node.js 18 or newer. No third-party packages or external services are needed.

## Evidence report

Use `docs/evidence-report-template.md` to record the exact revision, commands/cases, results, checks not run, limitations, and next required action. Do not claim behavior beyond the checks actually run.
