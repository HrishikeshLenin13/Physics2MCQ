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

test("joint-outcomes-incorrect-incorrect-correct", () => {
const answers=[1, 0, 0];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["incorrect", "incorrect", "correct"]);assert.equal(report.summary.correct,1);assert.equal(report.summary.answered,3);assert.equal(report.summary.unanswered,0);assert.equal(report.summary.percentage,33);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-incorrect-incorrect-incorrect", () => {
const answers=[1, 0, 1];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["incorrect", "incorrect", "incorrect"]);assert.equal(report.summary.correct,0);assert.equal(report.summary.answered,3);assert.equal(report.summary.unanswered,0);assert.equal(report.summary.percentage,0);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-incorrect-incorrect-unanswered", () => {
const answers=[1, 0, null];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["incorrect", "incorrect", "unanswered"]);assert.equal(report.summary.correct,0);assert.equal(report.summary.answered,2);assert.equal(report.summary.unanswered,1);assert.equal(report.summary.percentage,0);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-incorrect-unanswered-correct", () => {
const answers=[1, null, 0];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["incorrect", "unanswered", "correct"]);assert.equal(report.summary.correct,1);assert.equal(report.summary.answered,2);assert.equal(report.summary.unanswered,1);assert.equal(report.summary.percentage,33);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-incorrect-unanswered-incorrect", () => {
const answers=[1, null, 1];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["incorrect", "unanswered", "incorrect"]);assert.equal(report.summary.correct,0);assert.equal(report.summary.answered,2);assert.equal(report.summary.unanswered,1);assert.equal(report.summary.percentage,0);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-incorrect-unanswered-unanswered", () => {
const answers=[1, null, null];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["incorrect", "unanswered", "unanswered"]);assert.equal(report.summary.correct,0);assert.equal(report.summary.answered,1);assert.equal(report.summary.unanswered,2);assert.equal(report.summary.percentage,0);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-unanswered-correct-correct", () => {
const answers=[null, 1, 0];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["unanswered", "correct", "correct"]);assert.equal(report.summary.correct,2);assert.equal(report.summary.answered,2);assert.equal(report.summary.unanswered,1);assert.equal(report.summary.percentage,67);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-unanswered-correct-incorrect", () => {
const answers=[null, 1, 1];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["unanswered", "correct", "incorrect"]);assert.equal(report.summary.correct,1);assert.equal(report.summary.answered,2);assert.equal(report.summary.unanswered,1);assert.equal(report.summary.percentage,33);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-unanswered-correct-unanswered", () => {
const answers=[null, 1, null];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["unanswered", "correct", "unanswered"]);assert.equal(report.summary.correct,1);assert.equal(report.summary.answered,1);assert.equal(report.summary.unanswered,2);assert.equal(report.summary.percentage,33);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-unanswered-incorrect-correct", () => {
const answers=[null, 0, 0];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["unanswered", "incorrect", "correct"]);assert.equal(report.summary.correct,1);assert.equal(report.summary.answered,2);assert.equal(report.summary.unanswered,1);assert.equal(report.summary.percentage,33);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-unanswered-incorrect-incorrect", () => {
const answers=[null, 0, 1];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["unanswered", "incorrect", "incorrect"]);assert.equal(report.summary.correct,0);assert.equal(report.summary.answered,2);assert.equal(report.summary.unanswered,1);assert.equal(report.summary.percentage,0);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-unanswered-incorrect-unanswered", () => {
const answers=[null, 0, null];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["unanswered", "incorrect", "unanswered"]);assert.equal(report.summary.correct,0);assert.equal(report.summary.answered,1);assert.equal(report.summary.unanswered,2);assert.equal(report.summary.percentage,0);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-unanswered-unanswered-correct", () => {
const answers=[null, null, 0];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["unanswered", "unanswered", "correct"]);assert.equal(report.summary.correct,1);assert.equal(report.summary.answered,1);assert.equal(report.summary.unanswered,2);assert.equal(report.summary.percentage,33);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-unanswered-unanswered-incorrect", () => {
const answers=[null, null, 1];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["unanswered", "unanswered", "incorrect"]);assert.equal(report.summary.correct,0);assert.equal(report.summary.answered,1);assert.equal(report.summary.unanswered,2);assert.equal(report.summary.percentage,0);assert.equal(JSON.stringify(answers),before);
});

test("joint-outcomes-unanswered-unanswered-unanswered", () => {
const answers=[null, null, null];const before=JSON.stringify(answers);const report=api.buildQuizReport(q,answers);assert.deepEqual(report.results.map(x=>x.status),["unanswered", "unanswered", "unanswered"]);assert.equal(report.summary.correct,0);assert.equal(report.summary.answered,0);assert.equal(report.summary.unanswered,3);assert.equal(report.summary.percentage,0);assert.equal(JSON.stringify(answers),before);
});

test("invalid-question-contract-id-nan", () => {
const questions=[{...q[0],id:NaN}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});

test("invalid-question-contract-id-infinite", () => {
const questions=[{...q[0],id:Infinity}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});

test("invalid-question-contract-id-text", () => {
const questions=[{...q[0],id:'1'}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});

test("invalid-question-contract-id-bool", () => {
const questions=[{...q[0],id:true}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});

test("invalid-question-contract-id-fraction", () => {
const questions=[{...q[0],id:1.5}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});
