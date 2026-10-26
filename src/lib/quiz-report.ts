type QuizQuestion = { id: number; answer: number; choices: readonly string[] };

/** Use only known question slots; stale or malformed saved choices are unanswered. */
export function buildQuizReport(questions: readonly QuizQuestion[], answers: ReadonlyArray<number | null>) {
  const ids=new Set<number>();
  for(const question of questions) {
    if (!Number.isSafeInteger(question.id) || ids.has(question.id) || !question.choices.length || !Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.choices.length) throw new RangeError("Use unique question IDs and valid answer keys.");
    ids.add(question.id);
  }
  const results = questions.map((question, index) => {
    const value = answers[index];
    const choice = Number.isInteger(value) && value !== null && value >= 0 && value < question.choices.length ? value : null;
    return { questionId: question.id, selectedChoice: choice,
      status: choice === null ? 'unanswered' : choice === question.answer ? 'correct' : 'incorrect' };
  });
  const correct = results.filter(result => result.status === 'correct').length;
  const answered = results.filter(result => result.status !== 'unanswered').length;
  return { schemaVersion: 1, summary: {correct, answered, total:questions.length, unanswered:questions.length-answered,percentage:questions.length ? Math.round(correct/questions.length*100) : 0}, results };
}

export function downloadQuizReport(questions: readonly QuizQuestion[], answers: ReadonlyArray<number | null>, format: "json" | "csv" = "json") {
  const url = URL.createObjectURL(new Blob([format === 'csv' ? quizReportCsv(questions,answers) : JSON.stringify(buildQuizReport(questions, answers), null, 2) + '\n'], {type:format === 'csv' ? 'text/csv;charset=utf-8' : 'application/json'}));
  const link = document.createElement('a');
  link.href = url; link.download = `physics-review.${format}`;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function quizReportCsv(questions: readonly QuizQuestion[], answers: ReadonlyArray<number|null>): string {
  const report=buildQuizReport(questions,answers);
  const rows: (string|number)[][]=[['Question ID','Selected choice (zero-based)','Status']];
  for(const result of report.results) rows.push([result.questionId,result.selectedChoice ?? '',result.status]);
  return rows.map(row=>row.map(value=>'"'+String(value).replace(/"/g,'""')+'"').join(',')).join('\r\n')+'\r\n';
}

export function selectQuizAnswer(answers: ReadonlyArray<number|null>, slot:number, choice:number, total:number, choices:number): Array<number|null> {
  if (![slot,choice,total,choices].every(Number.isSafeInteger) || slot < 0 || slot >= total || choice < 0 || choice >= choices) return answers.slice();
  const next=Array.from({length:total},(_,index)=>answers[index] ?? null);
  next[slot]=choice;return next;
}

export function reviewQuestionIds(questions: readonly QuizQuestion[], answers: ReadonlyArray<number|null>, filter:'all'|'wrong'|'right'):number[] {
  return buildQuizReport(questions,answers).results.filter(result=>filter==='all' || (filter==='right' ? result.status==='correct' : result.status!=='correct')).map(result=>result.questionId);
}
