import {test} from 'node:test';
import assert from 'node:assert/strict';
import {quizReviewPlan} from '../src/lib/quiz-report.ts';
test('review plans prioritize unanswered questions and retain original IDs',()=>{
 const questions=[{id:10,answer:0,choices:['a','b']},{id:20,answer:1,choices:['a','b']},{id:30,answer:0,choices:['a','b']}];const answers=Object.freeze([1,null,0]);assert.deepEqual(quizReviewPlan(questions,answers),[20,10]);assert.deepEqual(quizReviewPlan(questions,answers,1),[20]);assert.deepEqual(quizReviewPlan(questions,answers,0),[]);assert.deepEqual(answers,[1,null,0]);for(const limit of [-1,.5,Infinity])assert.throws(()=>quizReviewPlan(questions,answers,limit),RangeError);
});
