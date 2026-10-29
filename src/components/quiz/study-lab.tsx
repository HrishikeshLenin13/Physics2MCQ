import { useEffect, useReducer, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Coins,
  Flame,
  Heart,
  Moon,
  Shield,
  Shuffle,
  Sparkles,
  Sun,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { QUESTIONS, LETTERS } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { QuestionDiagram } from "./diagrams";
import { QuizApp } from "./quiz-app";
import { PublicLeaderboard, useRankedRound } from "./leaderboard";
import { useTheme } from "@/store/theme";
import { cn } from "@/lib/utils";
import {
  INITIAL_GAME,
  POWER_COST,
  SAVE_KEY,
  gameReducer,
  nextReward,
  shuffleIds,
  type GameState,
  type Power,
  type StudyMode,
} from "@/lib/study-game";

const MODES = [
  {
    id: "study",
    title: "Study desk",
    icon: BookOpen,
    description:
      "Take your time. Check each answer, learn the right one, and revisit what you missed.",
    detail: "No pressure · instant feedback",
  },
  {
    id: "streak",
    title: "Streak climb",
    icon: Flame,
    description:
      "Build a chain of right answers. Every correct answer is worth more than the last.",
    detail: "Shuffled questions · growing rewards",
  },
  {
    id: "survival",
    title: "Three-heart challenge",
    icon: Heart,
    description:
      "Keep your three hearts through a shuffled deck. Use your earnings to stay in the game.",
    detail: "3 lives · power-ups · one full deck",
  },
] as const;
const POWERS = [
  {
    id: "fifty",
    title: "50 / 50",
    icon: Sparkles,
    description: "Remove two wrong choices on this question.",
  },
  {
    id: "boost",
    title: "Double charge",
    icon: Zap,
    description: "Double the reward if this answer is right. Used on check.",
  },
  {
    id: "shield",
    title: "Streak shield",
    icon: Shield,
    description: "Protect your streak and a heart from your next wrong answer.",
  },
] as const;

function LabShell({ children, wallet }: { children: ReactNode; wallet: number }) {
  const theme = useTheme((s) => s.theme);
  const toggle = useTheme((s) => s.toggle);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return (
    <main className="mx-auto min-h-dvh max-w-4xl px-4 py-5 text-fg sm:px-8 sm:py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
        <span className="flex items-center gap-2 font-semibold">
          <Zap className="size-5 text-accent" aria-hidden="true" /> Magnetism Lab
        </span>
        <div className="flex items-center gap-2">
          <span
            className="flex items-center gap-2 rounded-md bg-surface px-3 py-2 text-sm tabular-nums"
            aria-label={`Wallet: ${wallet} HBOBS`}
          >
            <Coins className="size-4 text-accent" aria-hidden="true" />
            {wallet.toLocaleString()} HBOBS
          </span>
          <Button
            variant="ghost"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </div>
      </header>
      {children}
    </main>
  );
}

export function StudyLab() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME);
  const ranked = useRankedRound();
  const [playerName, setPlayerName] = useState("");
  const [classic, setClassic] = useState(false);
  const [randomStudy, setRandomStudy] = useState(false);
  const [saveProblem, setSaveProblem] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  useEffect(() => {
    try {
      setPlayerName(localStorage.getItem("magnetism-player-name-v1") ?? "");
      const saved = JSON.parse(localStorage.getItem(SAVE_KEY) ?? "null");
      dispatch({
        type: "hydrate",
        wallet: saved?.version === 1 ? saved.wallet : 0,
        best: saved?.version === 1 ? saved.best : 0,
      });
    } catch {
      dispatch({ type: "hydrate", wallet: 0, best: 0 });
      setSaveProblem(true);
    }
  }, []);
  useEffect(() => {
    if (!state.hydrated) return;
    try {
      localStorage.setItem(
        SAVE_KEY,
        JSON.stringify({ version: 1, wallet: state.wallet, best: state.best }),
      );
    } catch {
      setSaveProblem(true);
    }
  }, [state.hydrated, state.wallet, state.best]);
  async function start(mode: StudyMode, ids = QUESTIONS.map((q) => q.id)) {
    setConfirmExit(false);
    if (mode !== "study" && playerName.trim()) {
      const session = await ranked.begin(playerName, mode);
      if (!session) return;
      dispatch({ type: "start", mode, order: session.order, wallet: session.wallet });
    } else {
      ranked.clear();
      dispatch({
        type: "start",
        mode,
        order: mode === "study" && !randomStudy ? ids : shuffleIds(ids),
      });
    }
  }
  function changeName(name: string) {
    setPlayerName(name);
    try {
      localStorage.setItem("magnetism-player-name-v1", name);
    } catch {
      setSaveProblem(true);
    }
  }

  if (classic)
    return (
      <>
        <div className="mx-auto max-w-2xl px-4 pt-4">
          <Button variant="secondary" onClick={() => setClassic(false)}>
            <ArrowLeft className="size-4" />
            All modes
          </Button>
        </div>
        <QuizApp />
      </>
    );
  const question = QUESTIONS.find((q) => q.id === state.order[state.cursor]);
  return (
    <LabShell wallet={state.wallet}>
      {saveProblem ? (
        <p role="status" className="mb-4 rounded-md border border-border bg-surface p-3 text-sm">
          Browser storage is unavailable. You can still play; earnings may not survive a refresh.
        </p>
      ) : null}
      {ranked.error ? (
        <p
          role="status"
          className="mb-4 rounded-md border border-wrong bg-wrong-dim p-4 text-sm text-wrong"
        >
          {ranked.error}
        </p>
      ) : null}
      {state.phase === "hub" ? (
        <>
          <section className="mb-8 grid gap-6 sm:grid-cols-3 sm:items-end">
            <div className="sm:col-span-2">
              <p className="mb-3 text-sm text-accent">AP Physics 2 · Unit 04.12</p>
              <h1 className="mb-4 text-4xl leading-tight sm:text-5xl">
                A little practice.
                <br />A longer streak.
              </h1>
              <p className="max-w-xl text-muted">
                Magnetism and induction, one question at a time. Pick how you want to learn from the
                same {QUESTIONS.length}-question deck.
              </p>
            </div>
            <div className="border-l-2 border-accent pl-4">
              <p className="flex items-center gap-2 text-sm text-muted">
                <Trophy className="size-4" />
                Personal best
              </p>
              <p className="mt-1 text-3xl tabular-nums">
                {state.best.toLocaleString()} <span className="text-sm text-muted">points</span>
              </p>
            </div>
          </section>
          <section className="mb-6 rounded-lg border border-border bg-surface p-5">
            <label htmlFor="player-name" className="mb-2 block font-medium">
              Leaderboard nickname (optional)
            </label>
            <input
              id="player-name"
              value={playerName}
              onChange={(event) => changeName(event.target.value)}
              maxLength={24}
              autoComplete="nickname"
              placeholder="Your nickname"
              aria-describedby="nickname-help"
              className="min-h-11 w-full rounded-md border border-border bg-elevated px-3 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:max-w-sm"
            />
            <p id="nickname-help" className="mt-2 text-sm text-muted">
              Enter a nickname for ranked games, or leave blank for private practice. Finish a game
              and choose Post to leaderboard to share your name and score publicly. Ranked games use
              a shared wallet that saves when you post.
            </p>
          </section>
          {ranked.starting ? (
            <p role="status" className="mb-4 text-sm text-accent">
              Starting your shared ranked round…
            </p>
          ) : null}
          <h2 className="mb-3 text-xl">Choose your mode</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {MODES.map((mode) => (
              <button
                key={mode.id}
                aria-label={`Play ${mode.title}`}
                disabled={!state.hydrated || ranked.starting}
                onClick={() => start(mode.id)}
                className="group flex min-h-64 flex-col items-start rounded-lg border border-border bg-elevated p-5 text-left transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-40"
              >
                <mode.icon className="mb-6 size-7 text-accent" aria-hidden="true" />
                <h3 className="mb-2 text-2xl">{mode.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-muted">{mode.description}</p>
                <span className="mt-auto flex w-full items-center justify-between gap-2 text-xs text-accent">
                  {mode.detail}
                  <ArrowRight className="size-4 shrink-0" />
                </span>
              </button>
            ))}
          </div>
          <label className="my-5 flex min-h-11 w-fit cursor-pointer items-center gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={randomStudy}
              onChange={(e) => setRandomStudy(e.target.checked)}
              className="size-4 accent-accent"
            />
            Shuffle questions in Study desk too
          </label>
          <section className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border p-5">
            <div>
              <h2 className="text-xl">Prefer the original quiz?</h2>
              <p className="mt-1 text-sm text-muted">
                Original order, score at the end, review and retest.
              </p>
            </div>
            <Button variant="secondary" onClick={() => setClassic(true)}>
              Classic quiz
              <ArrowRight className="size-4" />
            </Button>
          </section>
          <p className="pb-6 text-sm text-muted">
            Game rewards start at 10 HBOBS, then 15, 20, 25… for consecutive right answers. A miss
            resets the next reward to 10. Spend HBOBS in the shop during a game. Your wallet and
            best score save on this browser.
          </p>
          <PublicLeaderboard revision={ranked.revision} />
        </>
      ) : state.phase === "end" ? (
        <section className="mx-auto max-w-2xl space-y-6 py-6">
          <Trophy className="size-10 text-accent" />
          <h1 className="text-4xl">
            {state.lives === 0
              ? "Out of hearts. Not out of practice."
              : "Deck complete. Nicely done."}
          </h1>
          <p className="text-lg text-muted">
            {state.correct} right out of {state.cursor + 1} checked · best streak {state.bestStreak}
          </p>
          {state.mode !== "study" ? (
            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="text-sm text-muted">Points earned this round</p>
              <p className="mt-1 text-5xl tabular-nums">{state.score.toLocaleString()}</p>
              <p className="mt-3 text-sm text-muted">
                Your wallet holds {state.wallet.toLocaleString()} HBOBS after purchases.
              </p>
            </div>
          ) : null}
          {ranked.ticket && state.mode !== "study" ? (
            <section className="rounded-lg border border-accent bg-surface p-5">
              <h2 className="mb-2 text-xl">Share your score, {playerName}</h2>
              <p className="mb-4 text-sm text-muted">
                Your nickname and best score will be visible to everyone on every device.
              </p>
              <Button
                disabled={ranked.posting || ranked.posted}
                onClick={async () => {
                  const wallet = await ranked.post(state.history);
                  if (wallet !== null) dispatch({ type: "sync-wallet", wallet });
                }}
              >
                {ranked.posted
                  ? "Score posted"
                  : ranked.posting
                    ? "Posting score…"
                    : "Post to leaderboard"}
              </Button>
              {ranked.posted ? (
                <p role="status" className="mt-3 text-sm text-correct">
                  Saved to the shared leaderboard. Your ranked wallet is synced.
                </p>
              ) : null}
            </section>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <Button disabled={ranked.starting || ranked.posting} onClick={() => start(state.mode)}>
              Play again
            </Button>
            {state.missed.length ? (
              <Button variant="secondary" onClick={() => start("study", state.missed)}>
                Study missed ({state.missed.length})
              </Button>
            ) : null}
            <Button variant="ghost" onClick={() => dispatch({ type: "home" })}>
              All modes
            </Button>
          </div>
          {state.missed.length ? (
            <details className="rounded-lg border border-border p-4">
              <summary className="min-h-11 cursor-pointer font-medium">
                Review missed answers
              </summary>
              <ol className="space-y-5 pt-4">
                {state.missed.map((id) => {
                  const q = QUESTIONS.find((item) => item.id === id)!;
                  return (
                    <li key={id}>
                      <p className="font-medium">
                        #{id} · {q.prompt}
                      </p>
                      {q.diagram ? <QuestionDiagram id={q.diagram} /> : null}
                      <p className="mt-2 text-correct">
                        {LETTERS[q.answer]}. {q.choices[q.answer]}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </details>
          ) : (
            <p className="text-correct">Every answer checked was right.</p>
          )}
          <PublicLeaderboard revision={ranked.revision} />
        </section>
      ) : question ? (
        <>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <Button variant="ghost" onClick={() => setConfirmExit(!confirmExit)}>
              <ArrowLeft className="size-4" />
              All modes
            </Button>
            <p className="flex items-center gap-2 text-sm text-muted">
              {state.mode !== "study" ? (
                <Shuffle className="size-4" />
              ) : (
                <BookOpen className="size-4" />
              )}
              {MODES.find((m) => m.id === state.mode)?.title} · {state.cursor + 1} /{" "}
              {state.order.length}
            </p>
          </div>
          {confirmExit ? (
            <div className="mb-5 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface p-4">
              <p className="flex-1 text-sm">
                Leave this round? Earned HBOBS stay in your wallet, but this round will end.
              </p>
              <Button variant="secondary" onClick={() => setConfirmExit(false)}>
                Keep playing
              </Button>
              <Button
                onClick={() => {
                  setConfirmExit(false);
                  dispatch({ type: "home" });
                }}
              >
                Leave round
              </Button>
            </div>
          ) : null}
          {state.mode !== "study" ? (
            <div className="mb-5 grid grid-cols-3 divide-x divide-border rounded-lg border border-border bg-surface py-4 text-center">
              <div>
                <p className="text-xs text-muted">Round points</p>
                <p className="mt-1 text-2xl tabular-nums">{state.score}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Streak</p>
                <p className="mt-1 flex items-center justify-center gap-1 text-2xl tabular-nums">
                  <Flame className="size-5 text-accent" />
                  {state.streak}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">
                  {state.mode === "survival" ? "Hearts left" : "Next right answer"}
                </p>
                <p className="mt-1 text-2xl tabular-nums">
                  {state.mode === "survival"
                    ? `${state.lives} / 3`
                    : `+${nextReward(state.streak, state.boost)}`}
                </p>
              </div>
            </div>
          ) : (
            <p className="mb-4 text-sm text-muted">
              Select an answer, then check it. {state.correct} correct so far.
            </p>
          )}
          <div
            className="mb-6 h-1 overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-label="Deck progress"
            aria-valuemin={0}
            aria-valuemax={state.order.length}
            aria-valuenow={state.cursor + Number(state.checked)}
          >
            <div
              className="h-full bg-accent transition-all"
              style={{
                width: `${((state.cursor + Number(state.checked)) / state.order.length) * 100}%`,
              }}
            />
          </div>
          <section className="mx-auto max-w-2xl">
            <p className="mb-3 text-xs text-muted">
              {ranked.ticket ? `Ranked · ${playerName} · ` : ""}Original question #{question.id} ·
              choices stay in original letter order
            </p>
            {question.diagram ? (
              <div className="mb-5">
                <QuestionDiagram id={question.diagram} />
              </div>
            ) : null}
            <h2 className="mb-6 text-2xl leading-snug sm:text-3xl">{question.prompt}</h2>
            <div className="grid gap-3">
              {question.choices.map((choice, i) => {
                const right = state.checked && question.answer === i;
                const wrong = state.checked && state.chosen === i && !right;
                const removed = state.removed.includes(i);
                return (
                  <button
                    key={i}
                    disabled={state.checked || removed}
                    onClick={() => dispatch({ type: "choose", choice: i })}
                    aria-pressed={state.chosen === i}
                    className={cn(
                      "flex min-h-14 items-start gap-3 rounded-md border p-4 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      right
                        ? "border-correct bg-correct-dim text-correct"
                        : wrong
                          ? "border-wrong bg-wrong-dim text-wrong"
                          : state.chosen === i
                            ? "border-accent bg-accent text-accent-fg"
                            : "border-border bg-elevated text-fg hover:border-accent",
                      removed && "opacity-40",
                    )}
                  >
                    <span className="shrink-0 font-semibold">{LETTERS[i]}.</span>
                    <span className={cn("flex-1", removed && "line-through")}>
                      {choice}
                      {removed ? " (removed)" : ""}
                    </span>
                    {right ? (
                      <Check className="size-5 shrink-0" aria-label="Correct answer" />
                    ) : wrong ? (
                      <X className="size-5 shrink-0" aria-label="Incorrect answer" />
                    ) : null}
                  </button>
                );
              })}
            </div>
            {state.checked ? (
              <div
                role="status"
                className={cn(
                  "mt-5 rounded-md border p-4",
                  state.chosen === question.answer
                    ? "border-correct bg-correct-dim text-correct"
                    : "border-wrong bg-wrong-dim text-wrong",
                )}
              >
                <p className="font-semibold">
                  {state.chosen === question.answer
                    ? state.mode === "study"
                      ? "Correct. Keep it going."
                      : `Correct! +${state.lastAward} points and HBOBS.`
                    : state.protected
                      ? "Shield used. Your streak and hearts are protected."
                      : "Not quite. Take a look at the right answer."}
                </p>
                {state.chosen !== question.answer ? (
                  <p className="mt-2">
                    Correct answer: {LETTERS[question.answer]}. {question.choices[question.answer]}
                  </p>
                ) : null}
              </div>
            ) : null}
            <div className="my-6 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-muted">
                {state.boost
                  ? "Double charge armed"
                  : state.shield
                    ? "Shield armed"
                    : "Take a moment. You’ve got this."}
              </span>
              {state.checked ? (
                <Button onClick={() => dispatch({ type: "next" })}>
                  {state.cursor === state.order.length - 1 || state.lives === 0
                    ? "See results"
                    : "Next question"}
                  <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button
                  disabled={state.chosen === null}
                  onClick={() => dispatch({ type: "check", answer: question.answer })}
                >
                  Check question
                  <Check className="size-4" />
                </Button>
              )}
            </div>
            {state.mode !== "study" ? (
              <PowerShop
                state={state}
                buy={(power) => dispatch({ type: "buy", power, answer: question.answer })}
              />
            ) : null}
          </section>
        </>
      ) : null}
    </LabShell>
  );
}

function PowerShop({ state, buy }: { state: GameState; buy: (power: Power) => void }) {
  return (
    <aside className="mb-8 border-t border-border pt-6">
      <h2 className="mb-1 flex items-center gap-2 text-xl">
        <Coins className="size-5 text-accent" />
        Power-up shop
      </h2>
      <p className="mb-4 text-sm text-muted">
        Buy before checking. Your wallet carries between games.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {POWERS.map((power) => {
          const armed = power.id === "fifty" ? state.removed.length > 0 : state[power.id];
          return (
            <div
              key={power.id}
              className="flex flex-col rounded-md border border-border bg-surface p-4"
            >
              <power.icon className="mb-3 size-5 text-accent" />
              <h3 className="text-lg">{power.title}</h3>
              <p className="mb-4 mt-1 flex-1 text-xs leading-relaxed text-muted">
                {power.description}
              </p>
              <Button
                size="md"
                variant="secondary"
                disabled={armed || state.checked || state.wallet < POWER_COST[power.id]}
                onClick={() => buy(power.id)}
                aria-label={`Buy ${power.title} for ${POWER_COST[power.id]} HBOBS`}
              >
                {armed ? "Active" : `${POWER_COST[power.id]} HBOBS`}
              </Button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
