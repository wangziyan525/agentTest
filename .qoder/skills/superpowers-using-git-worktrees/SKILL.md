---
name: superpowers-using-git-worktrees
description: Use when the user explicitly wants a Superpowers-style isolated workspace setup, especially before larger feature work or plan execution on a separate branch.
---

# Superpowers Using Git Worktrees

Set up isolated work safely before larger implementation runs.

Process:

1. Confirm whether isolation is actually useful for the task.
2. Pick a consistent worktree directory.
3. Create a branch and worktree with a clear name.
4. Verify the worktree is clean and usable.
5. Continue implementation there rather than on the main working tree.

Rules:

- Do not create worktrees casually for tiny changes.
- Do not assume branch names or directories without checking local conventions.
- If the user does not want worktrees, do not force them.
