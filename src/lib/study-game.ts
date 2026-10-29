export type StudyMode = "study" | "streak" | "survival";
export type Power = "fifty" | "boost" | "shield";
export const POWER_COST: Record<Power, number> = { fifty: 40, boost: 100, shield: 80 };
export const SAVE_KEY = "magnetism-lab-v1";
export type GameState = {
  mode: StudyMode;
  phase: "hub" | "play" | "end";
  order: number[];
  cursor: number;
  chosen: number | null;
  checked: boolean;
  correct: number;
  streak: number;
  bestStreak: number;
  score: number;
  wallet: number;
  best: number;
  lives: number;
  boost: boolean;
  shield: boolean;
  removed: number[];
  missed: number[];
  lastAward: number;
  protected: boolean;
  hydrated: boolean;
};
export const INITIAL_GAME: GameState = {
  mode: "study",
  phase: "hub",
  order: [],
  cursor: 0,
  chosen: null,
  checked: false,
  correct: 0,
  streak: 0,
  bestStreak: 0,
  score: 0,
  wallet: 0,
  best: 0,
  lives: 3,
  boost: false,
  shield: false,
  removed: [],
  missed: [],
  lastAward: 0,
  protected: false,
  hydrated: false,
};
export type GameAction =
  | { type: "hydrate"; wallet: unknown; best: unknown }
  | { type: "start"; mode: StudyMode; order: number[] }
  | { type: "choose"; choice: number }
  | { type: "check"; answer: number }
  | { type: "buy"; power: Power; answer: number }
  | { type: "next" }
  | { type: "home" };

function savedNumber(value: unknown) {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : 0;
}

/** Fisher–Yates shuffles question IDs only. Letter choices never move. */
export function shuffleIds(ids: number[], random: () => number = Math.random) {
  const order = [...ids];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export function nextReward(streak: number, boosted = false) {
  return (10 + streak * 5) * (boosted ? 2 : 1);
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "hydrate":
      if (state.hydrated) return state;
      return {
        ...state,
        wallet: savedNumber(action.wallet),
        best: savedNumber(action.best),
        hydrated: true,
      };
    case "start": {
      if (!state.hydrated) return state;
      const order = [...new Set(action.order)].filter((id) => Number.isSafeInteger(id) && id > 0);
      if (!order.length) return state;
      return {
        ...INITIAL_GAME,
        hydrated: true,
        wallet: state.wallet,
        best: state.best,
        phase: "play",
        mode: action.mode,
        order,
      };
    }
    case "home":
      return { ...state, phase: "hub" };
    case "choose":
      if (
        state.phase !== "play" ||
        state.checked ||
        !Number.isInteger(action.choice) ||
        action.choice < 0 ||
        action.choice > 3 ||
        state.removed.includes(action.choice)
      )
        return state;
      return { ...state, chosen: action.choice };
    case "check": {
      if (
        state.phase !== "play" ||
        state.checked ||
        state.chosen === null ||
        !Number.isInteger(action.answer) ||
        action.answer < 0 ||
        action.answer > 3
      )
        return state;
      const right = state.chosen === action.answer;
      const protectedMiss = !right && state.shield && state.mode !== "study";
      const streak = right ? state.streak + 1 : protectedMiss ? state.streak : 0;
      const award = right && state.mode !== "study" ? nextReward(state.streak, state.boost) : 0;
      const score = state.score + award;
      return {
        ...state,
        checked: true,
        correct: state.correct + Number(right),
        streak,
        bestStreak: Math.max(state.bestStreak, streak),
        score,
        best: Math.max(state.best, score),
        wallet: state.wallet + award,
        lives: state.lives - Number(!right && !protectedMiss && state.mode === "survival"),
        shield: protectedMiss ? false : state.shield,
        boost: false,
        missed: right ? state.missed : [...state.missed, state.order[state.cursor]],
        lastAward: award,
        protected: protectedMiss,
      };
    }
    case "buy": {
      if (
        state.phase !== "play" ||
        state.mode === "study" ||
        state.checked ||
        state.wallet < POWER_COST[action.power]
      )
        return state;
      if (
        (action.power === "fifty" && state.removed.length) ||
        (action.power === "boost" && state.boost) ||
        (action.power === "shield" && state.shield)
      )
        return state;
      const result = { ...state, wallet: state.wallet - POWER_COST[action.power] };
      if (action.power === "boost") return { ...result, boost: true };
      if (action.power === "shield") return { ...result, shield: true };
      const removed = [0, 1, 2, 3].filter((choice) => choice !== action.answer).slice(0, 2);
      return {
        ...result,
        removed,
        chosen: state.chosen !== null && removed.includes(state.chosen) ? null : state.chosen,
      };
    }
    case "next":
      if (state.phase !== "play" || !state.checked) return state;
      if (state.cursor === state.order.length - 1 || state.lives === 0)
        return { ...state, phase: "end" };
      return {
        ...state,
        cursor: state.cursor + 1,
        chosen: null,
        checked: false,
        removed: [],
        lastAward: 0,
        protected: false,
      };
  }
}
