import {test} from 'node:test';
import assert from 'node:assert/strict';
import {quizReviewStatistics} from '../src/lib/quiz-report.ts';
test('answered accuracy is separate from whole-bank completion score',()=>{
 const q=[{id:1,answer:0,choices:['a','b']},{id:2,answer:1,choices:['a','b']},{id:3,answer:0,choices:['a','b']}];const r=quizReviewStatistics(q,[0,0,null]);assert.equal(r.percentage,33);assert.equal(r.answeredAccuracy,50);assert.equal(r.incorrect,1);assert.equal(r.unanswered,1);assert.equal(quizReviewStatistics(q,[0,0,null],[1,3]).answeredAccuracy,100);assert.equal(quizReviewStatistics(q,[]).answeredAccuracy,null);
});
