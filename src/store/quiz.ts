import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { QUESTIONS, TOTAL } from "@/data/questions";

export type Phase = "start" | "quiz" | "results" | "review";
export type Filter = "all" | "wrong" | "right";

type QuizState = {
  phase: Phase;
  index: number;
  answers: Array<number | null>;
  filter: Filter;
  reviewIndex: number;
  missedOnly: boolean;
  activeIds: number[];
  start: (missedOnly?: boolean) => void;
  select: (choice: number) => void;
  next: () => void;
  prev: () => void;
  finish: () => void;
  openReview: () => void;
  setFilter: (filter: Filter) => void;
  setReviewIndex: (i: number) => void;
  reset: () => void;
};

function emptyAnswers(): Array<number | null> {
  return Array.from({ length: TOTAL }, () => null);
}

export const useQuiz = create<QuizState>()(
  persist(
    (set, get) => ({
      phase: "start",
      index: 0,
      answers: emptyAnswers(),
      filter: "all",
      reviewIndex: 0,
      missedOnly: false,
      activeIds: QUESTIONS.map((q) => q.id),
      start: (missedOnly = false) => {
        const prev = get().answers;
        const ids = missedOnly
          ? QUESTIONS.filter((q, i) => prev[i] !== q.answer).map((q) => q.id)
          : QUESTIONS.map((q) => q.id);
        const nextAnswers = emptyAnswers();
        if (missedOnly) {
          QUESTIONS.forEach((q, i) => {
            if (prev[i] === q.answer) nextAnswers[i] = prev[i];
          });
        }
        if (ids.length === 0) {
          set({ phase: "results" });
          return;
        }
        set({
          phase: "quiz",
          index: 0,
          answers: nextAnswers,
          missedOnly,
          activeIds: ids,
          filter: "all",
          reviewIndex: 0,
        });
      },
      select: (choice) => {
        const { activeIds, index, answers } = get();
        const qid = activeIds[index];
        if (!qid) return;
        const slot = qid - 1;
        const next = answers.slice();
        next[slot] = choice;
        set({ answers: next });
      },
      next: () => {
        const { index, activeIds } = get();
        if (index < activeIds.length - 1) set({ index: index + 1 });
        else get().finish();
      },
      prev: () => {
        const { index } = get();
        if (index > 0) set({ index: index - 1 });
      },
      finish: () => set({ phase: "results" }),
      openReview: () => set({ phase: "review", filter: "all", reviewIndex: 0 }),
      setFilter: (filter) => set({ filter, reviewIndex: 0 }),
      setReviewIndex: (i) => set({ reviewIndex: i }),
      reset: () =>
        set({
          phase: "start",
          index: 0,
          answers: emptyAnswers(),
          filter: "all",
          reviewIndex: 0,
          missedOnly: false,
          activeIds: QUESTIONS.map((q) => q.id),
        }),
    }),
    {
      name: "charge-review-quiz",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
    },
  ),
);

export function scoreOf(answers: Array<number | null>) {
  let correct = 0;
  let answered = 0;
  QUESTIONS.forEach((q, i) => {
    if (answers[i] === null) return;
    answered += 1;
    if (answers[i] === q.answer) correct += 1;
  });
  return { correct, answered, total: TOTAL };
}
