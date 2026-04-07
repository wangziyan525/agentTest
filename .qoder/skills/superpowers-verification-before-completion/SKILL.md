---
name: superpowers-verification-before-completion
description: Use when the user explicitly wants strict evidence before any completion claim, or when we are about to say work is fixed, done, or passing.
---

# Superpowers Verification Before Completion

Do not claim success without fresh verification.

Process:

1. Identify which command or check proves the claim.
2. Run it now.
3. Read the actual output.
4. State the result based on that evidence.

Rules:

- Avoid wording like `should work`, `probably fixed`, or `looks good` when no fresh verification exists.
- A prior run does not count for a new claim.
- Partial verification is not enough if the claim is broader than the check.
