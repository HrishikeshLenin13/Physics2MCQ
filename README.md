# Optics Lab · Physics2MCQ

AP Physics 2 Unit 05.13 practice with the original 60 geometric optics questions, answer letters, marked solutions, and diagrams.

## Modes

- **Study desk:** select a choice, press **Check question**, see the correct answer, and retry missed questions. Optional shuffled order; no currency is spent or awarded.
- **Streak climb:** a shuffled, non-repeating deck. Consecutive correct answers earn 10, 15, 20… points and HBOBS. A miss resets the next reward to 10.
- **Three-heart challenge:** shuffled questions and the same growing rewards, with three lives.
- **Classic quiz:** original-order questions, end-of-quiz scoring, review, retakes, and review downloads.

Game power-ups cost earned HBOBS: **50/50** (40), **Double charge** (100), and **Streak shield** (80). Purchases happen before checking. Checked answers lock and each question pays only once.

## Public leaderboard

Enter an optional nickname before starting a game. Your score syncs automatically after every checked answer, including during unfinished rounds. Everyone can view the same public board without signing in. The board refreshes every 3 seconds while visible, when returning to the tab, or with **Refresh**.

- Separate rankings for all named players for each game, best posted score per nickname/mode.
- Shared persistent storage in a connected **private Vercel Blob store**; only the app's server can write it. All deployment domains use the same store and production namespace.
- The backend signs anonymous browser sessions and round tickets, replays answer/purchase history against the actual question bank, and computes scores rather than accepting a browser-supplied number.
- Conditional ETag writes retry concurrent submissions, and run IDs make repeated submissions idempotent.
- Nicknames are public labels, not verified accounts. Matching nicknames share a public rank; browser identity and ranked wallet remain separate. Ranked HBOBS are banked incrementally after each synced answer; repeated or delayed checkpoints do not award currency twice.
- Private practice uses browser-local earnings. Clearing browser storage resets those. Clearing cookies resets anonymous ranked identity; public scores remain.

## Development

Requires Node.js 22+ and npm.

```sh
npm ci
npm run dev
npm test
npm run typecheck
npm run build
```

For live leaderboard development, supply the connected store's `BLOB_READ_WRITE_TOKEN` as a **server-only process environment variable**. Never prefix it with `VITE_`, put it in client code, or commit it. Vercel injects it into the connected project's environments. Without storage credentials, private modes still work and the leaderboard shows an explicit retryable unavailable state.

Set the optional server-only `LEADERBOARD_NAMESPACE` to a dedicated test value when testing against the store. Production defaults to `magnetism-v1`; use that same namespace across domains to share one board.

The question bank follows the source document's checked answers verbatim, including apparent source inconsistencies. It is a study aid, not an official grade record.

- [Feature usage and API contracts](docs/RECENT_IMPROVEMENTS.md)
- [Troubleshooting and recovery](docs/TROUBLESHOOTING.md)
- [Contributor checks and change review](docs/CONTRIBUTOR_CHECKLIST.md)

## Implementation notes

See [November implementation improvements](docs/NOVEMBER_IMPROVEMENTS.md) for the tested API additions.
