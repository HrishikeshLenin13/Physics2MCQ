import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../src/lib/quiz-report.ts';
const questions=[{id:1,answer:0,choices:['a','b']},{id:2,answer:1,choices:['a','b']},{id:3,answer:0,choices:['a','b']}];
test('clearing one answer preserves the remaining answers and original state',()=>{const answers=[0,1,0];assert.deepEqual(api.clearQuizAnswer(answers,1),[0,null,0]);assert.deepEqual(answers,[0,1,0]);assert.deepEqual(api.clearQuizAnswer(answers,-1),answers);});
test('skipped slots remain unanswered while later answers retain their score',()=>{const report=api.buildQuizReport(questions,[null,1,0]);assert.equal(report.summary.unanswered,1);assert.equal(report.summary.correct,2);assert.equal(report.results[0].status,'unanswered');});
test('unanswered review separates untouched or stale choices from incorrect attempts',()=>{assert.deepEqual(api.reviewQuestionIds(questions,[0,0,null],'unanswered'),[3]);assert.deepEqual(api.reviewQuestionIds(questions,[0,0,null],'wrong'),[2,3]);assert.deepEqual(api.reviewQuestionIds(questions,[99,1,0],'unanswered'),[1]);});
