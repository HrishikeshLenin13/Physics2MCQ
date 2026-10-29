import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const source = readFileSync(new URL("../src/lib/study-game.ts", import.meta.url), "utf8");
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
}).outputText;
const {
  INITIAL_GAME,
  gameReducer: reduce,
  shuffleIds,
  nextReward,
  POWER_COST,
} = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));
const ready = (wallet = 0) => reduce(INITIAL_GAME, { type: "hydrate", wallet, best: 0 });
const start = (mode = "streak", wallet = 0, order = [1, 2, 3, 4]) =>
  reduce(ready(wallet), { type: "start", mode, order });
const answer = (state, choice = 0, correct = 0) =>
  reduce(reduce(state, { type: "choose", choice }), { type: "check", answer: correct });
const next = (state) => reduce(state, { type: "next" });
const buy = (state, power, correct = 0) => reduce(state, { type: "buy", power, answer: correct });

test("shuffle copies its input, preserves every ID and changes order", () => {
  const ids = Array.from({ length: 60 }, (_, i) => i + 1),
    original = [...ids];
  const shuffled = shuffleIds(ids, () => 0);
  assert.deepEqual(ids, original);
  assert.notDeepEqual(shuffled, ids);
  assert.deepEqual(
    [...shuffled].sort((a, b) => a - b),
    ids,
  );
});
test("answer choice order never participates in the shuffle", () => {
  const questions = JSON.parse(JSON.stringify([{ id: 1, choices: ["A", "B", "C", "D"] }]));
  shuffleIds(questions.map((q) => q.id));
  assert.deepEqual(questions[0].choices, ["A", "B", "C", "D"]);
});
test("progressive streak rewards are 10, 15, 20 and update wallet and best", () => {
  let s = start();
  for (const reward of [10, 15, 20]) {
    s = answer(s);
    assert.equal(s.lastAward, reward);
    s = next(s);
  }
  assert.equal(s.wallet, 45);
  assert.equal(s.score, 45);
  assert.equal(s.best, 45);
  assert.equal(s.streak, 3);
});
test("wrong answers earn zero and reset the next reward", () => {
  let s = next(answer(start()));
  s = answer(s, 1);
  assert.equal(s.wallet, 10);
  assert.equal(s.streak, 0);
  assert.equal(s.lastAward, 0);
  assert.deepEqual(s.missed, [2]);
  assert.equal(nextReward(s.streak), 10);
});
test("checking twice and changing checked answers cannot farm rewards", () => {
  const s = answer(start());
  assert.strictEqual(reduce(s, { type: "check", answer: 0 }), s);
  assert.strictEqual(reduce(s, { type: "choose", choice: 1 }), s);
  assert.strictEqual(buy(s, "boost"), s);
  assert.equal(s.wallet, 10);
});
test("cannot advance or check without selecting an answer", () => {
  const s = start();
  assert.strictEqual(next(s), s);
  assert.strictEqual(reduce(s, { type: "check", answer: 0 }), s);
});
test("study mode checks answers without awarding or spending currency", () => {
  let s = start("study", 200);
  assert.strictEqual(buy(s, "boost"), s);
  s = answer(s);
  assert.equal(s.correct, 1);
  assert.equal(s.wallet, 200);
  assert.equal(s.score, 0);
});
test("shop rejects insufficient funds without changing state", () => {
  for (const power of Object.keys(POWER_COST))
    assert.strictEqual(buy(start("streak", 0), power).wallet, 0);
});
test("50/50 removes exactly two wrong choices and clears a removed selection", () => {
  let s = reduce(start("streak", 100), { type: "choose", choice: 1 });
  s = buy(s, "fifty");
  assert.deepEqual(s.removed, [1, 2]);
  assert.equal(s.chosen, null);
  assert.equal(s.wallet, 60);
  assert.strictEqual(buy(s, "fifty"), s);
  assert.strictEqual(reduce(s, { type: "choose", choice: 1 }), s);
  assert.equal(next(answer(s)).removed.length, 0);
});
test("double charge costs currency once and doubles only one reward", () => {
  let s = buy(start("streak", 200), "boost");
  assert.equal(s.wallet, 100);
  assert.strictEqual(buy(s, "boost"), s);
  s = answer(s);
  assert.equal(s.lastAward, 20);
  assert.equal(s.wallet, 120);
  assert.equal(s.boost, false);
  s = answer(next(s));
  assert.equal(s.lastAward, 15);
});
test("a wrong answer consumes double charge with no reward", () => {
  const s = answer(buy(start("streak", 100), "boost"), 1);
  assert.equal(s.wallet, 0);
  assert.equal(s.boost, false);
  assert.equal(s.lastAward, 0);
});
test("shield persists through right answers and protects exactly one wrong answer", () => {
  let s = buy(start("survival", 200), "shield");
  assert.equal(s.wallet, 120);
  assert.strictEqual(buy(s, "shield"), s);
  s = next(answer(s));
  assert.equal(s.shield, true);
  s = answer(s, 1);
  assert.equal(s.protected, true);
  assert.equal(s.shield, false);
  assert.equal(s.lives, 3);
  assert.equal(s.streak, 1);
  assert.deepEqual(s.missed, [2]);
  s = answer(next(s), 1);
  assert.equal(s.lives, 2);
  assert.equal(s.streak, 0);
});
test("survival ends on third unprotected wrong answer", () => {
  let s = start("survival");
  for (let i = 0; i < 3; i++) {
    s = answer(s, 1);
    s = next(s);
  }
  assert.equal(s.phase, "end");
  assert.equal(s.lives, 0);
  assert.equal(s.cursor, 2);
  assert.strictEqual(reduce(s, { type: "check", answer: 1 }), s);
});
test("streak mode has no life penalty and ends after the whole deck", () => {
  let s = start("streak", 0, [1, 2]);
  s = next(answer(s, 1));
  s = next(answer(s));
  assert.equal(s.phase, "end");
  assert.equal(s.lives, 3);
  assert.equal(s.correct, 1);
});
test("new rounds reset powers and progress but preserve wallet and personal best", () => {
  let s = answer(start("streak", 250));
  s = reduce(s, { type: "home" });
  s = reduce(s, { type: "start", mode: "survival", order: [4, 3, 2] });
  assert.equal(s.wallet, 260);
  assert.equal(s.best, 10);
  assert.equal(s.score, 0);
  assert.equal(s.cursor, 0);
  assert.equal(s.lives, 3);
  assert.equal(s.boost, false);
});
test("save hydration rejects corrupt balances and runs once", () => {
  for (const value of [-1, Infinity, NaN, 1.2, "999", null])
    assert.equal(reduce(INITIAL_GAME, { type: "hydrate", wallet: value, best: value }).wallet, 0);
  const s = ready(40);
  assert.strictEqual(reduce(s, { type: "hydrate", wallet: 900, best: 900 }), s);
});
test("invalid or duplicate question IDs cannot create empty or repeated rounds", () => {
  const s = ready();
  assert.strictEqual(reduce(s, { type: "start", mode: "streak", order: [] }), s);
  assert.deepEqual(
    reduce(s, { type: "start", mode: "study", order: [1, 1, -1, 2.2, 2] }).order,
    [1, 2],
  );
});
test("all 60 answers complete one round with no repeated reward", () => {
  let s = start(
    "streak",
    0,
    Array.from({ length: 60 }, (_, i) => i + 1),
  );
  for (let i = 0; i < 60; i++) {
    s = answer(s);
    s = next(s);
  }
  assert.equal(s.phase, "end");
  assert.equal(s.correct, 60);
  assert.equal(s.score, 9450);
  assert.equal(s.wallet, 9450);
  assert.equal(s.bestStreak, 60);
});
