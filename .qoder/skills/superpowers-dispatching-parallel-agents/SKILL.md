---
name: superpowers-dispatching-parallel-agents
description: Use when the user explicitly wants a Superpowers-style parallel workflow or when there are multiple independent tasks that can safely proceed without shared write conflicts.
---

# Superpowers Dispatching Parallel Agents

Use delegation for independent domains, not for one tangled problem.

Process:

1. Group work into independent domains.
2. Keep each delegated task narrow and self-contained.
3. Give each worker a clear goal, constraints, and expected output.
4. Run them in parallel only if their write scopes do not collide.
5. Review and integrate results before declaring success.

Do not use this when:

- The failures are probably related.
- The tasks need the same files at the same time.
- The next local step is blocked on one urgent result.
