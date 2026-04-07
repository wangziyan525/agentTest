---
name: superpowers-subagent-driven-development
description: Use when the user explicitly wants a Superpowers-style task-by-task execution workflow with delegation and review checkpoints.
---

# Superpowers Subagent-Driven Development

Use this when a plan exists and execution benefits from separate worker/review cycles.

Process:

1. Read the plan and extract the tasks.
2. Execute one task at a time.
3. Delegate implementation for that task when helpful.
4. Review for spec compliance first.
5. Review for code quality second.
6. Fix issues before moving to the next task.
7. Finish with `superpowers-finishing-a-development-branch`.

Guardrails:

- Do not run multiple workers against the same write scope.
- Do not skip review loops.
- Do not mark a task done if either review still has open issues.
