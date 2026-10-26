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
  return { schemaVersion: 1, summary: {correct, answered, total:questions.length, unanswered:questions.length-answered}, results };
}

export function downloadQuizReport(questions: readonly QuizQuestion[], answers: ReadonlyArray<number | null>) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(buildQuizReport(questions, answers), null, 2) + '\n'], {type:'application/json'}));
  const link = document.createElement('a');
  link.href = url; link.download = 'physics-review.json';
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
