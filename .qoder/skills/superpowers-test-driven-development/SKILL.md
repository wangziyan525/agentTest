---
name: superpowers-test-driven-development
description: Use when the user explicitly wants strict test-first implementation for a feature or bugfix, or when we need stronger discipline around verification during coding.
---

# Superpowers Test-Driven Development

Apply RED-GREEN-REFACTOR.

Cycle:

1. Write one failing test for one behavior.
2. Run it and confirm it fails for the expected reason.
3. Write the smallest code that makes it pass.
4. Run the test again and confirm it passes.
5. Refactor only while keeping tests green.
6. Repeat for the next behavior.

Rules:

- No production code before a failing test, unless the user explicitly approves an exception.
- One behavior per test is preferred.
- Verification is mandatory; a test that was never observed failing does not prove enough.
- When fixing a bug, first add a failing reproduction test if practical.
