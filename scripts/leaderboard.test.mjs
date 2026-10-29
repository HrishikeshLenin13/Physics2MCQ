import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
function transpile(file) {
  return ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
  }).outputText;
}
const url = (code) => "data:text/javascript;base64," + Buffer.from(code).toString("base64");
const study = url(transpile("../src/lib/study-game.ts"));
const questions = url(transpile("../src/data/questions.ts"));
const { QUESTIONS } = await import(questions);
const core = transpile("../src/lib/leaderboard-core.ts")
  .replace('"./study-game"', JSON.stringify(study))
  .replace('"../data/questions"', JSON.stringify(questions));
const { EMPTY_BOARD, cleanPlayerName, publicScores, recordRun, replayRankedRun } = await import(
  url(core)
);
const now = Date.now();
const ticket = (overrides = {}) => ({
  version: 1,
  id: "run-1",
  player: "player-1",
  name: "Physics Friend",
  mode: "survival",
  order: QUESTIONS.map((q) => q.id),
  wallet: 0,
  expires: now + 86400000,
  ...overrides,
});
const answer = (id, right = true) => ({
  type: "answer",
  qid: id,
  choice: right ? QUESTIONS[id - 1].answer : (QUESTIONS[id - 1].answer + 1) % 4,
});
const lose = [answer(1), answer(2), answer(3, false), answer(4, false), answer(5, false)];
const empty = () => structuredClone(EMPTY_BOARD);
test("nickname normalization accepts human names, trims spaces and rejects markup", () => {
  assert.equal(cleanPlayerName("  Ada   Lovelace  "), "Ada Lovelace");
  assert.equal(cleanPlayerName("José-2"), "José-2");
  for (const v of ["", null, 42, "a".repeat(25), "<script>alert(1)</script>", "x\u202ey"])
    assert.throws(() => cleanPlayerName(v));
});
test("server replays actual choices and computes score instead of trusting a claimed score", () => {
  const s = replayRankedRun(ticket(), lose);
  assert.equal(s.score, 25);
  assert.equal(s.correct, 2);
  assert.equal(s.lives, 0);
  assert.equal(s.wallet, 25);
});
test("partial rounds, repeated questions, invalid choices and unaffordable powers fail", () => {
  for (const moves of [
    [],
    [answer(1)],
    [answer(2)],
    [answer(1), answer(1)],
    [{ type: "answer", qid: 1, choice: 99 }],
    [{ type: "power", qid: 1, power: "boost" }],
    [{ type: "power", qid: 1, power: "invented" }],
  ])
    assert.throws(() => replayRankedRun(ticket(), moves));
});
test("full streak deck receives exactly 9450, not an arbitrary browser score", () => {
  const state = replayRankedRun(
    ticket({ mode: "streak" }),
    QUESTIONS.map((q) => answer(q.id)),
  );
  assert.equal(state.score, 9450);
  assert.equal(state.correct, 60);
});
test("server handles purchased double reward, removed choices and shield correctly", () => {
  const t = ticket({ wallet: 220 });
  const wrong = (QUESTIONS[0].answer + 1) % 4;
  const moves = [
    { type: "power", qid: 1, power: "boost" },
    answer(1),
    { type: "power", qid: 2, power: "shield" },
    answer(2, false),
    answer(3, false),
    answer(4, false),
    answer(5, false),
  ];
  const s = replayRankedRun(t, moves);
  assert.equal(s.score, 20);
  assert.equal(s.wallet, 60);
  assert.equal(s.correct, 1);
  assert.equal(s.lives, 0);
  assert.throws(() =>
    replayRankedRun(t, [
      { type: "power", qid: 1, power: "fifty" },
      { type: "answer", qid: 1, choice: wrong },
    ]),
  );
});
test("posting once saves best score, posting again cannot mint currency or duplicate rows", () => {
  const a = recordRun(empty(), ticket(), lose, now);
  assert.equal(a.wallet, 25);
  assert.equal(publicScores(a.board)[0].score, 25);
  const b = recordRun(a.board, ticket(), lose, now);
  assert.equal(b.duplicate, true);
  assert.equal(b.wallet, 25);
  assert.equal(Object.keys(b.board.players).length, 1);
});
test("a later lower score does not overwrite personal best and keeps wallet earnings", () => {
  let a = recordRun(empty(), ticket(), lose, now).board;
  const b = recordRun(
    a,
    ticket({ id: "run-2", wallet: 25 }),
    [answer(1, false), answer(2, false), answer(3, false)],
    now + 1,
  );
  assert.equal(publicScores(b.board)[0].score, 25);
  assert.equal(b.wallet, 25);
});
test("identical nicknames on separate devices share only the best public rank per mode", () => {
  let b = recordRun(empty(), ticket(), lose, now).board;
  b = recordRun(
    b,
    ticket({ id: "run-2", player: "player-2", name: "physics friend" }),
    [answer(1, false), answer(2, false), answer(3, false)],
    now + 1,
  ).board;
  assert.equal(publicScores(b).length, 1);
  assert.equal(publicScores(b)[0].score, 25);
  assert.equal(publicScores(b, "streak").length, 0);
});
test("expired replay markers are pruned but current run stays idempotent", () => {
  const b = empty();
  b.runs.old = now - 1;
  const result = recordRun(b, ticket(), lose, now);
  assert.equal(result.board.runs.old, undefined);
  assert.equal(result.board.runs["run-1"], now + 86400000);
});
