type QuizQuestion = { id: number; answer: number; choices: readonly string[] };

/** Use only known question slots; stale or malformed saved choices are unanswered. */
export function buildQuizReport(questions: readonly QuizQuestion[], answers: ReadonlyArray<number | null>, questionIds?: readonly number[]) {
  const ids=new Set<number>();
  for(const question of questions) {
    if (!Number.isSafeInteger(question.id) || ids.has(question.id) || !question.choices.length || !Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.choices.length) throw new RangeError("Use unique question IDs and valid answer keys.");
    ids.add(question.id);
  }
  const allResults = questions.map((question, index) => {
    const value = answers[index];
    const choice = Number.isInteger(value) && value !== null && value >= 0 && value < question.choices.length ? value : null;
    return { questionId: question.id, selectedChoice: choice,
      status: choice === null ? 'unanswered' : choice === question.answer ? 'correct' : 'incorrect' };
  });
  if (questionIds && (new Set(questionIds).size !== questionIds.length || questionIds.some(id=>!ids.has(id)))) throw new RangeError("Export scope must contain unique known question IDs.");
  const selected = questionIds ? new Set(questionIds) : null;
  const results = selected ? allResults.filter(result=>selected.has(result.questionId)) : allResults;
  const correct = results.filter(result => result.status === 'correct').length;
  const answered = results.filter(result => result.status !== 'unanswered').length;
  return { schemaVersion: 1, summary: {correct, answered, total:results.length, unanswered:results.length-answered,percentage:results.length ? Math.round(correct/results.length*100) : 0}, results };
}

export function downloadQuizReport(questions: readonly QuizQuestion[], answers: ReadonlyArray<number | null>, format: "json" | "csv" = "json", questionIds?: readonly number[]) {
  const url = URL.createObjectURL(new Blob([format === 'csv' ? quizReportCsv(questions,answers,questionIds) : JSON.stringify(buildQuizReport(questions, answers,questionIds), null, 2) + '\n'], {type:format === 'csv' ? 'text/csv;charset=utf-8' : 'application/json'}));
  const link = document.createElement('a');
  link.href = url; link.download = `physics-review.${format}`;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function quizReportCsv(questions: readonly QuizQuestion[], answers: ReadonlyArray<number|null>, questionIds?: readonly number[]): string {
  const report=buildQuizReport(questions,answers,questionIds);
  const rows: (string|number)[][]=[['Question ID','Selected choice (zero-based)','Status']];
  for(const result of report.results) rows.push([result.questionId,result.selectedChoice ?? '',result.status]);
  return rows.map(row=>row.map(value=>'"'+String(value).replace(/"/g,'""')+'"').join(',')).join('\r\n')+'\r\n';
}

export function selectQuizAnswer(answers: ReadonlyArray<number|null>, slot:number, choice:number, total:number, choices:number): Array<number|null> {
  if (![slot,choice,total,choices].every(Number.isSafeInteger) || slot < 0 || slot >= total || choice < 0 || choice >= choices) return answers.slice();
  const next=Array.from({length:total},(_,index)=>answers[index] ?? null);
  next[slot]=choice;return next;
}

export function reviewQuestionIds(questions: readonly QuizQuestion[], answers: ReadonlyArray<number|null>, filter:'all'|'wrong'|'right'|'unanswered'):number[] {
  return buildQuizReport(questions,answers).results.filter(result=>filter==='all' || (filter==='unanswered' ? result.status==='unanswered' : filter==='right' ? result.status==='correct' : result.status!=='correct')).map(result=>result.questionId);
}

export function clearQuizAnswer(answers: ReadonlyArray<number|null>, slot: number): Array<number|null> {
  const next=answers.slice();
  if (Number.isSafeInteger(slot) && slot>=0 && slot<next.length) next[slot]=null;
  return next;
}
