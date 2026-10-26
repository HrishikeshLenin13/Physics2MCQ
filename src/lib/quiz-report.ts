type QuizQuestion = { id: number; answer: number; choices: readonly string[] };

/** Use only known question slots; stale or malformed saved choices are unanswered. */
export function buildQuizReport(questions: readonly QuizQuestion[], answers: ReadonlyArray<number | null>) {
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
