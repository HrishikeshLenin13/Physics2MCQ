import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../src/lib/quiz-report.ts';
const q=[{id:1,answer:0,choices:['a','b']},{id:2,answer:1,choices:['a','b']},{id:3,answer:0,choices:['a','b']}];

test("empty-bank-has-no-invented-score", () => {
assert.deepEqual(api.buildQuizReport([],[]).summary,{correct:0,answered:0,total:0,unanswered:0,percentage:0});
});

test("all-correct-bank-reports-full-percentage", () => {
const r=api.buildQuizReport(q,[0,1,0]);assert.equal(r.summary.percentage,100);assert.ok(r.results.every(x=>x.status==='correct'));
});

test("all-incorrect-bank-is-answered-not-unanswered", () => {
const r=api.buildQuizReport(q,[1,0,1]);assert.equal(r.summary.answered,3);assert.equal(r.summary.unanswered,0);assert.equal(r.summary.correct,0);
});

test("missing-answer-slots-remain-unanswered", () => {
assert.equal(api.buildQuizReport(q,[]).summary.unanswered,3);assert.equal(api.buildQuizReport(q,[0]).summary.unanswered,2);
});

test("saved-negative-choices-are-not-scored", () => {
assert.ok(api.buildQuizReport(q,[-1,-1,-1]).results.every(r=>r.status==='unanswered'));
});

test("saved-fractional-choices-are-not-scored", () => {
assert.ok(api.buildQuizReport(q,[.5,.5,.5]).results.every(r=>r.status==='unanswered'));
});

test("saved-nonfinite-choices-are-not-scored", () => {
assert.ok(api.buildQuizReport(q,[Infinity,Infinity,Infinity]).results.every(r=>r.status==='unanswered'));
});

test("saved-string-choices-are-not-scored", () => {
assert.ok(api.buildQuizReport(q,['0','0','0']).results.every(r=>r.status==='unanswered'));
});

test("saved-boolean-choices-are-not-scored", () => {
assert.ok(api.buildQuizReport(q,[false,false,false]).results.every(r=>r.status==='unanswered'));
});

test("extra-stale-answer-slots-do-not-inflate-results", () => {
assert.deepEqual(api.buildQuizReport(q,[0,1,0,1,1]).summary,api.buildQuizReport(q,[0,1,0]).summary);
});

test("question-ids-need-not-be-dense-or-ordered", () => {
const r=api.buildQuizReport([{...q[0],id:99},{...q[1],id:7}],[0,1]);assert.deepEqual(r.results.map(x=>x.questionId),[99,7]);assert.equal(r.summary.correct,2);
});

test("duplicate-question-ids-fail-before-scoring", () => {
assert.throws(()=>api.buildQuizReport([q[0],q[0]],[0,0]),RangeError);
});
