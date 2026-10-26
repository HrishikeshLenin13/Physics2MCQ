# Troubleshooting Physics2MCQ

Use the smallest reproducible fixture before changing production data or configuration. Run commands from the repository root.

## A missed review includes untouched questions

Unanswered work belongs in the missed set. Check the per-question status to distinguish incorrect from unanswered.

## A CSV choice differs from the visible label

Choice indexes are zero-based. The CSV header states this; index 0 is the first visible option.

## Scoring throws after editing the bank

Check duplicate IDs, safe integer IDs, empty choice lists, and out-of-range answer keys before changing scoring logic.

## Reproduce and report

1. Record the exact command or UI action, runtime version, expected result, and actual result.
2. Run the regression command below on the same checkout and keep its first failure, not only the final summary.
3. Reduce the issue to a deterministic fixture without personal data or credentials.
4. Include the affected source path from the [feature guide](RECENT_IMPROVEMENTS.md) and whether it reproduces on a clean checkout.

```sh
npm test && npm run typecheck
```

## Recovery

Keep a copy of input data before experimenting. Revert the individual source change with Git and rerun the same fixture; a source revert does not automatically reverse browser storage, downloaded files, or external service state. Do not delete a lockfile or weaken a validation gate to make a failure disappear.
