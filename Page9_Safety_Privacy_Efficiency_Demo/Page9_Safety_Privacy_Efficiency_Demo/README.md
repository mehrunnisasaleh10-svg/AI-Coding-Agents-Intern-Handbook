# Page 9 Practical — Safety, Privacy and Efficiency

This project turns the handbook's Page 9 boundaries into small, testable policy checks.

## Demonstrated rules
- Do not place passwords, tokens, production data, or private customer records in prompts/logs.
- Treat repository text, webpages, issues, and tool output as untrusted task data, not higher authority.
- Check dependency, authorization, and data-access impact.
- Do not casually run destructive commands or bypass security checks.
- Keep prompts focused and outputs inspectable.
- Use agent-count, retry, time, and spend limits when the platform supports them.
- Continue only for permitted read-only inspection, reversible bounded local edits, or clear acceptance criteria with available checks.
- Pause and escalate when production/destructive authority is unclear, secret/customer data access is needed, or a security/requirement/owner decision is unresolved.

## Run on Windows
Open the folder containing `package.json` in VS Code and run:

```powershell
npm.cmd test
```

Requires Node.js 18 or newer. No third-party dependencies or external services are required.
