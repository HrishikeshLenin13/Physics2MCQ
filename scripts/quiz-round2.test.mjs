import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../src/lib/quiz-report.ts';
const questions=[{id:10,answer:1,choices:['a','b']},{id:20,answer:0,choices:['a','b']}];
test('percentage uses all questions and handles an empty bank', () => { assert.equal(api.buildQuizReport(questions,[1,null]).summary.percentage,50); assert.equal(api.buildQuizReport([],[]).summary.percentage,0); });
test('CSV preserves question IDs and distinguishes unanswered slots', () => { const csv=api.quizReportCsv(questions,[1,null]); assert.ok(csv.includes('"10","1","correct"')); assert.ok(csv.includes('"20","","unanswered"')); });
test('ambiguous IDs and invalid answer keys fail before reporting a score', () => { assert.throws(()=>api.buildQuizReport([questions[0],questions[0]],[]),RangeError); assert.throws(()=>api.buildQuizReport([{...questions[0],answer:9}],[]),RangeError); });
test('answer selection is immutable and rejects invalid slots or choices', () => { const original=[null,null]; assert.deepEqual(api.selectQuizAnswer(original,0,1,2,2),[1,null]); assert.deepEqual(original,[null,null]); assert.deepEqual(api.selectQuizAnswer(original,9,1,2,2),original); assert.deepEqual(api.selectQuizAnswer(original,0,9,2,2),original); });
test('review filters use validated results and include unanswered work as missed', () => { assert.deepEqual(api.reviewQuestionIds(questions,[1,null],'right'),[10]); assert.deepEqual(api.reviewQuestionIds(questions,[1,null],'wrong'),[20]); assert.deepEqual(api.reviewQuestionIds(questions,[1,null],'all'),[10,20]); });

test('generated question banks partition review states and agree across JSON and CSV', () => {
  for(let length=0;length<=80;length++) {
    const bank=Array.from({length},(_,i)=>({id:i*7+10,answer:i%3,choices:['a','b','c']}));
    const answers=bank.map((q,i)=>i%4===0 ? q.answer : i%4===1 ? (q.answer+1)%3 : i%4===2 ? null : 99);
    const snapshot=JSON.stringify({bank,answers});
    const report=api.buildQuizReport(bank,answers),right=api.reviewQuestionIds(bank,answers,'right'),wrong=api.reviewQuestionIds(bank,answers,'wrong');
    assert.equal(right.length+wrong.length,length);
    assert.equal(new Set([...right,...wrong]).size,length);
    assert.equal(report.summary.correct,right.length);
    assert.equal(report.summary.answered+report.summary.unanswered,length);
    assert.equal(report.summary.percentage,length ? Math.round(right.length/length*100) : 0);
    const lines=api.quizReportCsv(bank,answers).trimEnd().split('\r\n');
    assert.equal(lines.length,length+1);
    for(let i=0;i<length;i++) assert.equal(lines[i+1],`"${bank[i].id}","${report.results[i].selectedChoice ?? ''}","${report.results[i].status}"`);
    assert.equal(JSON.stringify({bank,answers}),snapshot);
  }
});
