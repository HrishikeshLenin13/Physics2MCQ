import { INITIAL_GAME, gameReducer, type Power, type StudyMode } from "./study-game";
import { QUESTIONS } from "../data/questions";

export type RankedMode = Exclude<StudyMode, "study">;
export type RunMove =
  { qid: number; type: "answer"; choice: number } | { qid: number; type: "power"; power: Power };
export type RunTicket = {
  version: 1;
  id: string;
  player: string;
  name: string;
  mode: RankedMode;
  order: number[];
  wallet: number;
  expires: number;
};
export type PublicScore = {
  name: string;
  score: number;
  correct: number;
  checked: number;
  streak: number;
  mode: RankedMode;
  date: string;
};
export type PlayerRecord = {
  name: string;
  wallet: number;
  scores: Partial<Record<RankedMode, PublicScore>>;
};
export type BoardData = {
  version: 1;
  players: Record<string, PlayerRecord>;
  runs: Record<string, number>;
};
export const EMPTY_BOARD: BoardData = { version: 1, players: {}, runs: {} };

export function cleanPlayerName(value: unknown): string {
  if (typeof value !== "string") throw new Error("Enter a nickname with 1–24 characters.");
  const name = value.normalize("NFKC").replace(/\s+/g, " ").trim();
  if (!name || name.length > 24 || !/^[\p{L}\p{N} ._'’-]+$/u.test(name))
    throw new Error("Use 1–24 letters, numbers, spaces, apostrophes, dots, or hyphens.");
  return name;
}

/** Recompute the entire round; the browser never submits a trusted numeric score. */
export function replayRankedRun(ticket: RunTicket, input: unknown) {
  if (!Array.isArray(input) || input.length < 1 || input.length > QUESTIONS.length * 4)
    throw new Error("This round's answer history is incomplete.");
  let state = gameReducer(INITIAL_GAME, { type: "hydrate", wallet: ticket.wallet, best: 0 });
  state = gameReducer(state, { type: "start", mode: ticket.mode, order: ticket.order });
  for (const raw of input) {
    if (!raw || typeof raw !== "object" || state.phase !== "play")
      throw new Error("Invalid round history.");
    const move = raw as RunMove;
    const question = QUESTIONS.find((q) => q.id === state.order[state.cursor]);
    if (!question || move.qid !== question.id)
      throw new Error("Question order does not match this round.");
    if (move.type === "power") {
      if (!["fifty", "boost", "shield"].includes(move.power)) throw new Error("Unknown power-up.");
      const changed = gameReducer(state, {
        type: "buy",
        power: move.power,
        answer: question.answer,
      });
      if (changed === state) throw new Error("Power-up purchase is not valid.");
      state = changed;
    } else if (move.type === "answer") {
      const selected = gameReducer(state, { type: "choose", choice: move.choice });
      if (
        selected.chosen !== move.choice ||
        !Number.isInteger(move.choice) ||
        move.choice < 0 ||
        move.choice > 3
      )
        throw new Error("Invalid answer choice.");
      state = gameReducer(selected, { type: "check", answer: question.answer });
      state = gameReducer(state, { type: "next" });
    } else throw new Error("Unknown round action.");
  }
  if (state.phase !== "end") throw new Error("Finish the round before posting a score.");
  return state;
}

export function publicScores(board: BoardData, mode?: RankedMode): PublicScore[] {
  // A nickname gets its highest score per mode, even when played on different devices.
  const named = new Map<string, PublicScore>();
  for (const player of Object.values(board.players))
    for (const score of Object.values(player.scores)) {
      if (!score || (mode && score.mode !== mode)) continue;
      const key = `${player.name.toLocaleLowerCase()}:${score.mode}`;
      const item = { ...score, name: player.name };
      const previous = named.get(key);
      if (
        !previous ||
        item.score > previous.score ||
        (item.score === previous.score && item.correct > previous.correct)
      )
        named.set(key, item);
    }
  return [...named.values()]
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.correct - a.correct ||
        b.streak - a.streak ||
        a.date.localeCompare(b.date),
    )
    .slice(0, 50);
}

export function recordRun(board: BoardData, ticket: RunTicket, moves: unknown, now: number) {
  const result = replayRankedRun(ticket, moves);
  if (board.runs[ticket.id])
    return { board, duplicate: true, wallet: board.players[ticket.player]?.wallet ?? 0 };
  const previous = board.players[ticket.player] ?? { name: ticket.name, wallet: 0, scores: {} };
  const wallet = previous.wallet + result.wallet - ticket.wallet;
  if (wallet < 0) throw new Error("Your wallet changed in another game. Start a new ranked round.");
  const score: PublicScore = {
    name: ticket.name,
    score: result.score,
    correct: result.correct,
    checked: result.cursor + 1,
    streak: result.bestStreak,
    mode: ticket.mode,
    date: new Date(now).toISOString(),
  };
  const priorBest = previous.scores[ticket.mode];
  const best =
    !priorBest ||
    score.score > priorBest.score ||
    (score.score === priorBest.score && score.correct > priorBest.correct)
      ? score
      : priorBest;
  const runs = Object.fromEntries(Object.entries(board.runs).filter(([, expiry]) => expiry > now));
  return {
    board: {
      version: 1 as const,
      players: {
        ...board.players,
        [ticket.player]: {
          name: ticket.name,
          wallet,
          scores: { ...previous.scores, [ticket.mode]: best },
        },
      },
      runs: { ...runs, [ticket.id]: ticket.expires },
    },
    duplicate: false,
    wallet,
  };
}
