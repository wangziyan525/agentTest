---
name: superpowers
description: Use when the user explicitly asks to use the Superpowers workflow or when a task would benefit from selecting a Superpowers-style process skill such as brainstorming, planning, debugging, TDD, or verification.
---

# Superpowers For Codex

This is a Codex-compatible local adaptation of the `obra/superpowers` workflow.

Use this skill as the router for the local Superpowers skill set. Pick the matching namespaced skill before acting:

- `superpowers-brainstorming`: design and requirements refinement
- `superpowers-writing-plans`: implementation plan writing
- `superpowers-executing-plans`: plan execution in one session
- `superpowers-subagent-driven-development`: plan execution with task-by-task delegation and review
- `superpowers-test-driven-development`: feature or bugfix implementation with test-first discipline
- `superpowers-systematic-debugging`: root-cause-first debugging
- `superpowers-verification-before-completion`: verify before claiming success
- `superpowers-dispatching-parallel-agents`: parallelize independent investigations or tasks
- `superpowers-requesting-code-review`: ask for review at the right checkpoint
- `superpowers-receiving-code-review`: evaluate feedback before implementing it
- `superpowers-using-git-worktrees`: isolated branch/worktree setup
- `superpowers-finishing-a-development-branch`: structured completion and merge/PR choice
- `superpowers-writing-skills`: create or revise skills with testing discipline

Rules:

1. Prefer explicit Superpowers skills only when the user asks for them or the workflow clearly helps.
2. Follow project instructions in `AGENTS.md` first.
3. Do not let Superpowers process rules override direct user instructions.
