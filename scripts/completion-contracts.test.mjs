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

test("reject-fractional-id", () => {
assert.throws(()=>api.buildQuizReport([{...q[0],id:.5}],[]),RangeError);
});

test("reject-unsafe-id", () => {
assert.throws(()=>api.buildQuizReport([{...q[0],id:Number.MAX_SAFE_INTEGER+1}],[]),RangeError);
});

test("reject-nonfinite-id", () => {
assert.throws(()=>api.buildQuizReport([{...q[0],id:Infinity}],[]),RangeError);
});

test("reject-negative-key", () => {
assert.throws(()=>api.buildQuizReport([{...q[0],answer:-1}],[]),RangeError);
});

test("reject-fractional-key", () => {
assert.throws(()=>api.buildQuizReport([{...q[0],answer:.5}],[]),RangeError);
});

test("reject-past-last-key", () => {
assert.throws(()=>api.buildQuizReport([{...q[0],answer:2}],[]),RangeError);
});

test("empty-choice-lists-are-not-scoreable", () => {
assert.throws(()=>api.buildQuizReport([{...q[0],choices:[]}],[]),RangeError);
});

test("empty-export-scope-has-zero-total", () => {
const r=api.buildQuizReport(q,[0,1,0],[]);assert.equal(r.summary.total,0);assert.deepEqual(r.results,[]);
});

test("scope-keeps-bank-order-not-request-order", () => {
assert.deepEqual(api.buildQuizReport(q,[0,1,0],[3,1]).results.map(x=>x.questionId),[1,3]);
});

test("scope-does-not-reindex-sparse-answers", () => {
const r=api.buildQuizReport(q,[0,1,null],[2,3]);assert.equal(r.results[0].selectedChoice,1);assert.equal(r.results[1].selectedChoice,null);
});

test("unknown-export-ids-are-not-silently-ignored", () => {
assert.throws(()=>api.buildQuizReport(q,[],[999]),RangeError);
});

test("duplicate-export-ids-are-not-double-counted", () => {
assert.throws(()=>api.buildQuizReport(q,[],[1,1]),RangeError);
});

test("scoped-percentage-uses-selected-bank-size", () => {
assert.equal(api.buildQuizReport(q,[0,0,0],[1,2]).summary.percentage,50);
});

test("scoped-export-still-validates-unselected-bank-records", () => {
assert.throws(()=>api.buildQuizReport([...q,{...q[0]}],[],[]),RangeError);
});

test("reports-do-not-mutate-the-question-bank", () => {
const before=JSON.stringify(q);api.buildQuizReport(q,[0,1,0]);assert.equal(JSON.stringify(q),before);
});

test("reports-do-not-alias-saved-answers", () => {
const a=[0,1,0],r=api.buildQuizReport(q,a);a[0]=1;assert.equal(r.results[0].selectedChoice,0);
});

test("reports-export-status-not-answer-keys", () => {
const r=api.buildQuizReport(q,[0,1,0]);assert.ok(r.results.every(x=>!('answer' in x)&&!('choices' in x)));assert.equal(r.schemaVersion,1);
});

test("right-and-missed-filters-partition-the-bank", () => {
const a=[0,0,null],right=api.reviewQuestionIds(q,a,'right'),wrong=api.reviewQuestionIds(q,a,'wrong');assert.deepEqual(right,[1]);assert.deepEqual(wrong,[2,3]);
});

test("unanswered-filter-is-a-subset-of-missed", () => {
assert.deepEqual(api.reviewQuestionIds(q,[0,0,null],'unanswered'),[3]);assert.deepEqual(api.reviewQuestionIds(q,[0,0,null],'all'),[1,2,3]);
});

test("selection-copies-rather-than-mutates-answer-arrays", () => {
const a=[null,null,null],b=api.selectQuizAnswer(a,1,1,3,2);assert.deepEqual(a,[null,null,null]);assert.deepEqual(b,[null,1,null]);
});

test("selection-rejects-negative-slot", () => {
const a=[null,null,null];assert.deepEqual(api.selectQuizAnswer(a,-1,0,3,2),a);
});

test("selection-rejects-outside-slot", () => {
const a=[null,null,null];assert.deepEqual(api.selectQuizAnswer(a,3,0,3,2),a);
});

test("selection-rejects-fractional-slot", () => {
const a=[null,null,null];assert.deepEqual(api.selectQuizAnswer(a,0.5,0,3,2),a);
});

test("selection-rejects-invalid-choice", () => {
const a=[null,null,null];assert.deepEqual(api.selectQuizAnswer(a,0,2,3,2),a);
});

test("selection-rejects-empty-choices", () => {
const a=[null,null,null];assert.deepEqual(api.selectQuizAnswer(a,0,0,3,0),a);
});
