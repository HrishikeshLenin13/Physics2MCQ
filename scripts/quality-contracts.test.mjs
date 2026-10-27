import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../src/lib/quiz-report.ts';
const q=[{id:1,answer:0,choices:['a','b']},{id:2,answer:1,choices:['a','b']},{id:3,answer:0,choices:['a','b']}];

test("joint-outcomes-correct-correct-correct", () => {
const answers=[0, 1, 0];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["correct", "correct", "correct"]);assert.equal(report.summary.correct,3);assert.equal(report.summary.answered,3);assert.equal(report.summary.unanswered,0);assert.equal(report.summary.percentage,100);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-correct-correct-incorrect", () => {
const answers=[0, 1, 1];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["correct", "correct", "incorrect"]);assert.equal(report.summary.correct,2);assert.equal(report.summary.answered,3);assert.equal(report.summary.unanswered,0);assert.equal(report.summary.percentage,67);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-correct-correct-unanswered", () => {
const answers=[0, 1, null];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["correct", "correct", "unanswered"]);assert.equal(report.summary.correct,2);assert.equal(report.summary.answered,2);assert.equal(report.summary.unanswered,1);assert.equal(report.summary.percentage,67);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-correct-incorrect-correct", () => {
const answers=[0, 0, 0];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["correct", "incorrect", "correct"]);assert.equal(report.summary.correct,2);assert.equal(report.summary.answered,3);assert.equal(report.summary.unanswered,0);assert.equal(report.summary.percentage,67);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-correct-incorrect-incorrect", () => {
const answers=[0, 0, 1];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["correct", "incorrect", "incorrect"]);assert.equal(report.summary.correct,1);assert.equal(report.summary.answered,3);assert.equal(report.summary.unanswered,0);assert.equal(report.summary.percentage,33);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-correct-incorrect-unanswered", () => {
const answers=[0, 0, null];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["correct", "incorrect", "unanswered"]);assert.equal(report.summary.correct,1);assert.equal(report.summary.answered,2);assert.equal(report.summary.unanswered,1);assert.equal(report.summary.percentage,33);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-correct-unanswered-correct", () => {
const answers=[0, null, 0];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["correct", "unanswered", "correct"]);assert.equal(report.summary.correct,2);assert.equal(report.summary.answered,2);assert.equal(report.summary.unanswered,1);assert.equal(report.summary.percentage,67);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-correct-unanswered-incorrect", () => {
const answers=[0, null, 1];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["correct", "unanswered", "incorrect"]);assert.equal(report.summary.correct,1);assert.equal(report.summary.answered,2);assert.equal(report.summary.unanswered,1);assert.equal(report.summary.percentage,33);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-correct-unanswered-unanswered", () => {
const answers=[0, null, null];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["correct", "unanswered", "unanswered"]);assert.equal(report.summary.correct,1);assert.equal(report.summary.answered,1);assert.equal(report.summary.unanswered,2);assert.equal(report.summary.percentage,33);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-incorrect-correct-correct", () => {
const answers=[1, 1, 0];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["incorrect", "correct", "correct"]);assert.equal(report.summary.correct,2);assert.equal(report.summary.answered,3);assert.equal(report.summary.unanswered,0);assert.equal(report.summary.percentage,67);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-incorrect-correct-incorrect", () => {
const answers=[1, 1, 1];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["incorrect", "correct", "incorrect"]);assert.equal(report.summary.correct,1);assert.equal(report.summary.answered,3);assert.equal(report.summary.unanswered,0);assert.equal(report.summary.percentage,33);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-incorrect-correct-unanswered", () => {
const answers=[1, 1, null];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["incorrect", "correct", "unanswered"]);assert.equal(report.summary.correct,1);assert.equal(report.summary.answered,2);assert.equal(report.summary.unanswered,1);assert.equal(report.summary.percentage,33);assert.equal(JSON.stringify(answers),before);
});
