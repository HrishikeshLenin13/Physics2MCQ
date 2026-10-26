import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../src/lib/quiz-report.ts';
const questions=[{id:10,answer:1,choices:['a','b']},{id:20,answer:0,choices:['a','b']}];
test('percentage uses all questions and handles an empty bank', () => { assert.equal(api.buildQuizReport(questions,[1,null]).summary.percentage,50); assert.equal(api.buildQuizReport([],[]).summary.percentage,0); });
test('CSV preserves question IDs and distinguishes unanswered slots', () => { const csv=api.quizReportCsv(questions,[1,null]); assert.ok(csv.includes('"10","1","correct"')); assert.ok(csv.includes('"20","","unanswered"')); });
test('ambiguous IDs and invalid answer keys fail before reporting a score', () => { assert.throws(()=>api.buildQuizReport([questions[0],questions[0]],[]),RangeError); assert.throws(()=>api.buildQuizReport([{...questions[0],answer:9}],[]),RangeError); });
test('answer selection is immutable and rejects invalid slots or choices', () => { const original=[null,null]; assert.deepEqual(api.selectQuizAnswer(original,0,1,2,2),[1,null]); assert.deepEqual(original,[null,null]); assert.deepEqual(api.selectQuizAnswer(original,9,1,2,2),original); assert.deepEqual(api.selectQuizAnswer(original,0,9,2,2),original); });
