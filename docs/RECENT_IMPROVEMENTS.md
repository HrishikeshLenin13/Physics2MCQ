# Validated quiz review and CSV downloads

This guide covers implemented behavior. It does not change deployment or account configuration.

## Usage

```ts
import {buildQuizReport, quizReportCsv, reviewQuestionIds} from './src/lib/quiz-report';
const questions = [{id:10, answer:1, choices:['a','b']}];
const answers = [null];
buildQuizReport(questions, answers).summary.percentage; // 0
reviewQuestionIds(questions, answers, 'wrong'); // [10]
quizReportCsv(questions, answers);
```

## Contracts and limits

- Percentages use the full supplied question bank and round to a whole number. An empty bank reports zero.
- Question IDs must be unique safe integers, and every answer key must address an existing choice. Invalid bank metadata fails before scoring.
- Invalid or stale saved selections are unanswered. Wrong review includes unanswered questions, while right review includes only correct answers.
- The results screen offers JSON and CSV downloads. CSV records question ID, zero-based selected choice, and status; it omits answer text and student identity.

## Source map

- [`src/lib/quiz-report.ts`](../src/lib/quiz-report.ts)
<!-- source: src/lib/quiz-report.ts -->
- [`src/store/quiz.ts`](../src/store/quiz.ts)
<!-- source: src/store/quiz.ts -->
- [`src/components/quiz/quiz-app.tsx`](../src/components/quiz/quiz-app.tsx)
<!-- source: src/components/quiz/quiz-app.tsx -->
- [`scripts/quiz-round2.test.mjs`](../scripts/quiz-round2.test.mjs)
<!-- source: scripts/quiz-round2.test.mjs -->

## Regression command

Run from the repository root:

```sh
npm test && npm run typecheck
```


## Flexible attempts and focused review

Learners can clear one answer or skip a question without restarting. Results distinguish incorrect and unanswered counts; missed retakes still include both. The unanswered review filter isolates unattempted work, and Download filtered CSV exports only the current review scope while preserving original question IDs and answer-slot alignment. Scoped report APIs reject duplicate or unknown selected IDs.
