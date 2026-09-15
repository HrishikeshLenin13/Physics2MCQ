import { useMemo, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  X,
  Zap,
} from "lucide-react";
import { QUESTIONS, LETTERS, TOTAL } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { QuestionDiagram } from "@/components/quiz/diagrams";
import { scoreOf, useQuiz } from "@/store/quiz";
import { cn } from "@/lib/utils";

const OPTION_BG = [
  "bg-option-a",
  "bg-option-b",
  "bg-option-c",
  "bg-option-d",
] as const;

export function QuizApp() {
  const phase = useQuiz((s) => s.phase);
  if (phase === "start") return <StartScreen />;
  if (phase === "results") return <ResultsScreen />;
  if (phase === "review") return <ReviewScreen />;
  return <QuizScreen />;
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </div>
    </div>
  );
}

function StartScreen() {
  const start = useQuiz((s) => s.start);
  return (
    <Shell>
      <div className="flex flex-1 flex-col justify-center gap-8">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          Unit 02.10
        </p>
        <div className="space-y-3">
          <h1 className="font-display text-4xl leading-tight text-fg sm:text-5xl">
            Electric Force, Fields, and Potential
          </h1>
          <p className="max-w-lg text-base text-muted">
            57 multiple-choice questions in original order. Tap an answer, then
            continue. After the last question you will see your score, review
            every item, and retest as many times as you want.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <span className="rounded-md border border-border bg-surface px-3 py-1.5">
            {TOTAL} questions
          </span>
          <span className="rounded-md border border-border bg-surface px-3 py-1.5">
            Click to choose
          </span>
          <span className="rounded-md border border-border bg-surface px-3 py-1.5">
            Review + retest
          </span>
        </div>
        <div>
          <Button size="lg" onClick={() => start(false)} className="min-w-44">
            Start quiz
            <Zap className="size-4" strokeWidth={1.75} />
          </Button>
        </div>
      </div>
    </Shell>
  );
}

function QuizScreen() {
  const index = useQuiz((s) => s.index);
  const activeIds = useQuiz((s) => s.activeIds);
  const answers = useQuiz((s) => s.answers);
  const select = useQuiz((s) => s.select);
  const next = useQuiz((s) => s.next);
  const prev = useQuiz((s) => s.prev);

  const qid = activeIds[index];
  const question = QUESTIONS[qid - 1];
  const chosen = answers[qid - 1];
  const last = index === activeIds.length - 1;
  const progress = ((index + (chosen !== null ? 1 : 0)) / activeIds.length) * 100;

  return (
    <Shell>
      <header className="mb-6 flex items-center justify-between gap-3">
        <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
          Question {index + 1} of {activeIds.length}
        </p>
        <p className="tabular-nums text-xs text-muted">#{question.id}</p>
      </header>
      <div className="mb-6 h-1 overflow-hidden rounded-full bg-elevated">
        <div
          className="h-full bg-accent transition-all duration-200"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-5">
        {question.diagram ? <QuestionDiagram id={question.diagram} /> : null}
        <h2 className="font-display text-xl leading-snug text-fg sm:text-2xl">
          {question.prompt}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {question.choices.map((choice, i) => {
            const selected = chosen === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => select(i)}
                className={cn(
                  "flex min-h-16 items-start gap-3 rounded-lg px-4 py-3.5 text-left text-sm leading-snug text-fg transition-transform duration-150",
                  OPTION_BG[i],
                  selected ? "ring-2 ring-fg ring-offset-2 ring-offset-bg" : "opacity-95 hover:opacity-100",
                )}
              >
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-sm bg-bg/20 font-semibold">
                  {LETTERS[i]}
                </span>
                <span className="pt-0.5">{choice}</span>
              </button>
            );
          })}
        </div>
      </div>
      <footer className="mt-8 flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={prev} disabled={index === 0}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button onClick={next} disabled={chosen === null}>
          {last ? "See score" : "Next"}
          <ArrowRight className="size-4" />
        </Button>
      </footer>
    </Shell>
  );
}

function ResultsScreen() {
  const answers = useQuiz((s) => s.answers);
  const start = useQuiz((s) => s.start);
  const openReview = useQuiz((s) => s.openReview);
  const reset = useQuiz((s) => s.reset);
  const { correct, total } = scoreOf(answers);
  const missed = total - correct;
  const pct = Math.round((correct / total) * 100);

  return (
    <Shell>
      <div className="flex flex-1 flex-col justify-center gap-8">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          Results
        </p>
        <div>
          <p className="font-display text-6xl leading-none tabular-nums text-fg">
            {correct}
            <span className="text-3xl text-muted">/{total}</span>
          </p>
          <p className="mt-3 text-lg text-muted">{pct}% correct</p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-w-sm">
          <div className="rounded-lg border border-border bg-surface px-4 py-3">
            <p className="text-xs text-muted">Right</p>
            <p className="mt-1 font-display text-2xl tabular-nums text-correct">{correct}</p>
          </div>
          <div className="rounded-lg border border-border bg-surface px-4 py-3">
            <p className="text-xs text-muted">Wrong</p>
            <p className="mt-1 font-display text-2xl tabular-nums text-wrong">{missed}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={openReview}>
            Review answers
          </Button>
          <Button size="lg" variant="secondary" onClick={() => start(false)}>
            <RotateCcw className="size-4" />
            Retake all
          </Button>
          {missed > 0 ? (
            <Button size="lg" variant="secondary" onClick={() => start(true)}>
              Retake missed ({missed})
            </Button>
          ) : null}
        </div>
        <button type="button" className="self-start text-sm text-muted hover:text-fg" onClick={reset}>
          Back to start
        </button>
      </div>
    </Shell>
  );
}

function ReviewScreen() {
  const answers = useQuiz((s) => s.answers);
  const filter = useQuiz((s) => s.filter);
  const reviewIndex = useQuiz((s) => s.reviewIndex);
  const setFilter = useQuiz((s) => s.setFilter);
  const setReviewIndex = useQuiz((s) => s.setReviewIndex);
  const start = useQuiz((s) => s.start);
  const finish = useQuiz((s) => s.finish);

  const items = useMemo(() => {
    return QUESTIONS.filter((q, i) => {
      const ok = answers[i] === q.answer;
      if (filter === "wrong") return !ok;
      if (filter === "right") return ok;
      return true;
    });
  }, [answers, filter]);

  const current = items[reviewIndex] ?? items[0];
  const { correct } = scoreOf(answers);

  if (!current) {
    return (
      <Shell>
        <p className="text-muted">Nothing in this filter.</p>
        <Button className="mt-4" variant="secondary" onClick={() => setFilter("all")}>
          Show all
        </Button>
      </Shell>
    );
  }

  const chosen = answers[current.id - 1];
  const isCorrect = chosen === current.answer;

  return (
    <Shell>
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
          Review · {correct}/{TOTAL}
        </p>
        <div className="flex gap-1 rounded-md border border-border bg-surface p-1">
          {(["all", "wrong", "right"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-sm px-3 py-1.5 text-xs capitalize",
                filter === f ? "bg-elevated text-fg" : "text-muted hover:text-fg",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {QUESTIONS.map((q, i) => {
          const ok = answers[i] === q.answer;
          const active = current.id === q.id;
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => {
                setFilter("all");
                setReviewIndex(i);
              }}
              className={cn(
                "flex size-8 items-center justify-center rounded-sm text-xs tabular-nums",
                ok ? "bg-correct-dim text-correct" : "bg-wrong-dim text-wrong",
                active && "ring-2 ring-fg",
              )}
              aria-label={`Question ${q.id}, ${ok ? "correct" : "incorrect"}`}
            >
              {q.id}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-sm">
        {isCorrect ? (
          <span className="inline-flex items-center gap-1 text-correct">
            <Check className="size-4" /> Correct
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-wrong">
            <X className="size-4" /> Incorrect
          </span>
        )}
        <span className="text-muted">Question {current.id}</span>
      </div>

      {current.diagram ? (
        <div className="mt-4">
          <QuestionDiagram id={current.diagram} />
        </div>
      ) : null}

      <h2 className="mt-4 font-display text-xl leading-snug">{current.prompt}</h2>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {current.choices.map((choice, i) => {
          const isAns = i === current.answer;
          const isPick = i === chosen;
          return (
            <div
              key={i}
              className={cn(
                "flex min-h-16 items-start gap-3 rounded-lg px-4 py-3.5 text-sm text-fg",
                OPTION_BG[i],
                isAns && "ring-2 ring-correct ring-offset-2 ring-offset-bg",
                isPick && !isAns && "ring-2 ring-wrong ring-offset-2 ring-offset-bg",
              )}
            >
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-sm bg-bg/20 font-semibold">
                {LETTERS[i]}
              </span>
              <span className="flex-1 pt-0.5">{choice}</span>
              {isAns ? <Check className="mt-1 size-4 shrink-0" /> : null}
              {isPick && !isAns ? <X className="mt-1 size-4 shrink-0" /> : null}
            </div>
          );
        })}
      </div>

      <footer className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => setReviewIndex(Math.max(0, items.indexOf(current) - 1))}
            disabled={items.indexOf(current) <= 0}
          >
            <ArrowLeft className="size-4" />
            Prev
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              setReviewIndex(Math.min(items.length - 1, items.indexOf(current) + 1))
            }
            disabled={items.indexOf(current) >= items.length - 1}
          >
            Next
            <ArrowRight className="size-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={finish}>
            Score
          </Button>
          <Button onClick={() => start(false)}>
            <RotateCcw className="size-4" />
            Retake
          </Button>
        </div>
      </footer>
    </Shell>
  );
}
