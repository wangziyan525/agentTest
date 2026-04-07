---
name: superpowers-executing-plans
description: Use when the user explicitly wants to execute an existing plan in the current session using a structured Superpowers workflow.
---

# Superpowers Executing Plans

Execute a written plan carefully instead of improvising.

Process:

1. Read the plan and sanity-check it before touching code.
2. Raise blockers or gaps before implementation.
3. Track tasks explicitly as you execute them.
4. Follow the plan task by task.
5. Run verification after each meaningful change.
6. When implementation is complete, switch to `superpowers-finishing-a-development-branch`.

Guardrails:

- Do not silently rewrite the plan while implementing.
- If a step is unclear, ask or fix the plan first.
- If work becomes independent and parallelizable, consider `superpowers-subagent-driven-development`.
