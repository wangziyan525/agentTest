---
name: superpowers-systematic-debugging
description: Use when the user explicitly wants a Superpowers-style debugging workflow for bugs, flaky tests, regressions, or unexpected behavior.
---

# Superpowers Systematic Debugging

Do root-cause investigation before proposing fixes.

Phases:

1. Reproduce and inspect the failure carefully.
2. Check recent changes and likely boundaries.
3. Gather evidence where data or control flow may break.
4. Compare with known-working patterns.
5. Form one hypothesis at a time.
6. Test the hypothesis with the smallest change possible.
7. Only then implement the actual fix.

Rules:

- No guess-and-check patching.
- No stacked speculative fixes.
- If repeated fixes fail, step back and question the approach or architecture.
- If a reliable automated reproduction is possible, add it before finalizing the fix.
