# Lint fix notes

This patch addresses the remaining visible diagnostics from the latest `check-lint` screenshots:

- `src/ported/messages-helpers.ts`: explicitly marks the destructured `image` as intentionally consumed (it is excluded from the outer message and embedded as `productImage`), fixing `no-unused-vars` without changing the payload.
- `src/ported/messages-helpers.ts`: replaces `mapped == null` with `mapped === null || mapped === undefined`, preserving the nullish check while satisfying `eqeqeq`.
- The earlier targeted rule suppressions for the two copied legacy MessageBuilder entry files remain in place because those upstream loose comparisons and deeply nested blocks are behavior-sensitive.

This ZIP has been checked for archive integrity. A full ESLint run was not available in this environment, so the CI workflow must be rerun to confirm the remaining repository-wide error count.
