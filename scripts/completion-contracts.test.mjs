import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../src/lib/quiz-report.ts';
const q=[{id:1,answer:0,choices:['a','b']},{id:2,answer:1,choices:['a','b']},{id:3,answer:0,choices:['a','b']}];

test("empty-bank-has-no-invented-score", () => {
assert.deepEqual(api.buildQuizReport([],[]).summary,{correct:0,answered:0,total:0,unanswered:0,percentage:0});
});
