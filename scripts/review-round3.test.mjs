import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../src/lib/quiz-report.ts';
const questions=[{id:1,answer:0,choices:['a','b']},{id:2,answer:1,choices:['a','b']},{id:3,answer:0,choices:['a','b']}];
test('clearing one answer preserves the remaining answers and original state',()=>{const answers=[0,1,0];assert.deepEqual(api.clearQuizAnswer(answers,1),[0,null,0]);assert.deepEqual(answers,[0,1,0]);assert.deepEqual(api.clearQuizAnswer(answers,-1),answers);});
