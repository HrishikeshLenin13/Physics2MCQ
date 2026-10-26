import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildQuizReport } from '../src/lib/quiz-report.ts';
const questions = [{id:10, answer:1, choices:['a','b']}, {id:20, answer:0, choices:['a','b']}];
test('review report distinguishes missed and unanswered slots', () => {
  const report = buildQuizReport(questions, [1,1]);
  assert.deepEqual(report.summary, {correct:1, answered:2, total:2, unanswered:0});
  assert.deepEqual(report.results.map(row=>row.status), ['correct','incorrect']);
  assert.equal(JSON.parse(JSON.stringify(report)).schemaVersion, 1);
});
test('short and malformed saved answer lists do not inflate answered count', () => {
  assert.equal(buildQuizReport(questions, []).summary.answered, 0);
  for (const bad of [NaN, -1, 9, .5, undefined]) assert.equal(buildQuizReport(questions, [bad,null]).summary.answered, 0);
  assert.deepEqual(buildQuizReport([], []).summary, {correct:0, answered:0, total:0, unanswered:0});
});
