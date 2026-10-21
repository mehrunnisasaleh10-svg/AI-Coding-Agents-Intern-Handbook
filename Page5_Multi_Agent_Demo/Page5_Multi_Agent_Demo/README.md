# Page 5 Practical — Multi-Agent System

Based on Page 5 of *AI Coding Agents: Intern se Confident*.

This deterministic local demo shows:
- Coordinator, Implementation, Test, and Review roles.
- A task graph where final review waits for implementation and test evidence.
- A delegation contract: task, inputs, allowed files, constraints, output, verification, and stop condition.
- A file-conflict guard to prevent multiple roles editing the same file.
- Review based on actual output and test evidence, not another agent's opinion.

This is a simulation, not a real multi-agent LLM system. No external API, network, database, shell command, or repository is accessed.

## Run on Windows PowerShell
```powershell
npm.cmd test
```
Requires Node.js 18 or newer.
