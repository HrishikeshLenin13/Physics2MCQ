import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../src/lib/quiz-report.ts';
const questions=[{id:10,answer:1,choices:['a','b']},{id:20,answer:0,choices:['a','b']}];
test('percentage uses all questions and handles an empty bank', () => { assert.equal(api.buildQuizReport(questions,[1,null]).summary.percentage,50); assert.equal(api.buildQuizReport([],[]).summary.percentage,0); });
test('CSV preserves question IDs and distinguishes unanswered slots', () => { const csv=api.quizReportCsv(questions,[1,null]); assert.ok(csv.includes('"10","1","correct"')); assert.ok(csv.includes('"20","","unanswered"')); });
