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

test("invalid-question-contract-id-unsafe", () => {
const questions=[{...q[0],id:Number.MAX_SAFE_INTEGER+1}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});

test("invalid-question-contract-key-negative", () => {
const questions=[{...q[0],answer:-1}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});

test("invalid-question-contract-key-overflow", () => {
const questions=[{...q[0],answer:2}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});

test("invalid-question-contract-key-nan", () => {
const questions=[{...q[0],answer:NaN}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});

test("invalid-question-contract-key-fraction", () => {
const questions=[{...q[0],answer:.5}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});

test("invalid-question-contract-key-text", () => {
const questions=[{...q[0],answer:'0'}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});

test("invalid-question-contract-key-bool", () => {
const questions=[{...q[0],answer:false}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});

test("invalid-question-contract-empty-choices", () => {
const questions=[{...q[0],choices:[]}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});

test("invalid-question-contract-key-null", () => {
const questions=[{...q[0],answer:null}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});

test("invalid-question-contract-key-infinite", () => {
const questions=[{...q[0],answer:Infinity}];assert.throws(()=>api.buildQuizReport(questions,[0]),RangeError);assert.throws(()=>api.quizReportCsv(questions,[0]),RangeError);
});

test("scope-preserves-bank-order-1", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[]);assert.deepEqual(result.results.map(x=>x.status),[]);assert.equal(result.summary.total,0);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,2);
});

test("scope-preserves-bank-order-2", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([1]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[1]);assert.deepEqual(result.results.map(x=>x.status),["correct"]);assert.equal(result.summary.total,1);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,3);
});

test("scope-preserves-bank-order-3", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([2]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[2]);assert.deepEqual(result.results.map(x=>x.status),["incorrect"]);assert.equal(result.summary.total,1);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,3);
});

test("scope-preserves-bank-order-4", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([3]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[3]);assert.deepEqual(result.results.map(x=>x.status),["unanswered"]);assert.equal(result.summary.total,1);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,3);
});

test("scope-preserves-bank-order-5", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([1, 2]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[1, 2]);assert.deepEqual(result.results.map(x=>x.status),["correct", "incorrect"]);assert.equal(result.summary.total,2);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,4);
});

test("scope-preserves-bank-order-6", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([1, 3]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[1, 3]);assert.deepEqual(result.results.map(x=>x.status),["correct", "unanswered"]);assert.equal(result.summary.total,2);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,4);
});

test("scope-preserves-bank-order-7", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([2, 3]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[2, 3]);assert.deepEqual(result.results.map(x=>x.status),["incorrect", "unanswered"]);assert.equal(result.summary.total,2);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,4);
});

test("scope-preserves-bank-order-8", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([3, 1]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[1, 3]);assert.deepEqual(result.results.map(x=>x.status),["correct", "unanswered"]);assert.equal(result.summary.total,2);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,4);
});

test("scope-preserves-bank-order-9", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([3, 2]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[2, 3]);assert.deepEqual(result.results.map(x=>x.status),["incorrect", "unanswered"]);assert.equal(result.summary.total,2);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,4);
});

test("scope-preserves-bank-order-10", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([2, 1]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[1, 2]);assert.deepEqual(result.results.map(x=>x.status),["correct", "incorrect"]);assert.equal(result.summary.total,2);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,4);
});

test("scope-preserves-bank-order-11", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([1, 2, 3]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[1, 2, 3]);assert.deepEqual(result.results.map(x=>x.status),["correct", "incorrect", "unanswered"]);assert.equal(result.summary.total,3);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,5);
});

test("scope-preserves-bank-order-12", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([3, 2, 1]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[1, 2, 3]);assert.deepEqual(result.results.map(x=>x.status),["correct", "incorrect", "unanswered"]);assert.equal(result.summary.total,3);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,5);
});

test("scope-preserves-bank-order-13", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([2, 3, 1]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[1, 2, 3]);assert.deepEqual(result.results.map(x=>x.status),["correct", "incorrect", "unanswered"]);assert.equal(result.summary.total,3);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,5);
});

test("scope-preserves-bank-order-14", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([1, 3, 2]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[1, 2, 3]);assert.deepEqual(result.results.map(x=>x.status),["correct", "incorrect", "unanswered"]);assert.equal(result.summary.total,3);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,5);
});

test("scope-preserves-bank-order-15", () => {
const answers=Object.freeze([0,0,null]);const scope=Object.freeze([2, 1, 3]);const result=api.buildQuizReport(q,answers,scope);assert.deepEqual(result.results.map(x=>x.questionId),[1, 2, 3]);assert.deepEqual(result.results.map(x=>x.status),["correct", "incorrect", "unanswered"]);assert.equal(result.summary.total,3);assert.equal(api.quizReportCsv(q,answers,scope).split('\r\n').length,5);
});

test("select-clear-size-2-slot-0", () => {
const input=Object.freeze(Array.from({length:2},()=>null));const selected=api.selectQuizAnswer(input,0,1,2,2);assert.equal(selected[0],1);assert.equal(selected.length,2);const cleared=api.clearQuizAnswer(selected,0);assert.deepEqual(cleared,input);assert.equal(selected[0],1);assert.notEqual(cleared,input);
});

test("select-clear-size-2-slot-1", () => {
const input=Object.freeze(Array.from({length:2},()=>null));const selected=api.selectQuizAnswer(input,1,1,2,2);assert.equal(selected[1],1);assert.equal(selected.length,2);const cleared=api.clearQuizAnswer(selected,1);assert.deepEqual(cleared,input);assert.equal(selected[1],1);assert.notEqual(cleared,input);
});

test("select-clear-size-3-slot-0", () => {
const input=Object.freeze(Array.from({length:3},()=>null));const selected=api.selectQuizAnswer(input,0,1,3,2);assert.equal(selected[0],1);assert.equal(selected.length,3);const cleared=api.clearQuizAnswer(selected,0);assert.deepEqual(cleared,input);assert.equal(selected[0],1);assert.notEqual(cleared,input);
});

test("select-clear-size-3-slot-1", () => {
const input=Object.freeze(Array.from({length:3},()=>null));const selected=api.selectQuizAnswer(input,1,1,3,2);assert.equal(selected[1],1);assert.equal(selected.length,3);const cleared=api.clearQuizAnswer(selected,1);assert.deepEqual(cleared,input);assert.equal(selected[1],1);assert.notEqual(cleared,input);
});

test("select-clear-size-3-slot-2", () => {
const input=Object.freeze(Array.from({length:3},()=>null));const selected=api.selectQuizAnswer(input,2,1,3,2);assert.equal(selected[2],1);assert.equal(selected.length,3);const cleared=api.clearQuizAnswer(selected,2);assert.deepEqual(cleared,input);assert.equal(selected[2],1);assert.notEqual(cleared,input);
});

test("select-clear-size-4-slot-0", () => {
const input=Object.freeze(Array.from({length:4},()=>null));const selected=api.selectQuizAnswer(input,0,1,4,2);assert.equal(selected[0],1);assert.equal(selected.length,4);const cleared=api.clearQuizAnswer(selected,0);assert.deepEqual(cleared,input);assert.equal(selected[0],1);assert.notEqual(cleared,input);
});

test("select-clear-size-4-slot-1", () => {
const input=Object.freeze(Array.from({length:4},()=>null));const selected=api.selectQuizAnswer(input,1,1,4,2);assert.equal(selected[1],1);assert.equal(selected.length,4);const cleared=api.clearQuizAnswer(selected,1);assert.deepEqual(cleared,input);assert.equal(selected[1],1);assert.notEqual(cleared,input);
});
