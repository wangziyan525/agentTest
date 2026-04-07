---
name: superpowers-writing-plans
description: Use when the user explicitly wants a Superpowers-style implementation plan written before code changes, especially for multi-step work or work that may be delegated later.
---

# Superpowers Writing Plans

Turn an approved design or clear requirement set into a practical implementation plan.

Process:

1. Confirm scope is small enough for one plan.
2. Map the files that will be created or changed.
3. Break the work into small tasks with clear verification points.
4. For each task, include concrete files, commands, and expected checks.
5. Make the plan readable by someone with little local context.

Plan quality rules:

- Prefer small, testable tasks over big vague phases.
- Use exact file paths when known.
- Include verification, not just coding steps.
- Remove placeholders like `TODO`, `handle edge cases`, or `similar to above`.

When the user wants the plan executed in the same session, switch to `superpowers-executing-plans` or `superpowers-subagent-driven-development`.
