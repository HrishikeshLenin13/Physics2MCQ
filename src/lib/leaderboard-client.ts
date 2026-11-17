import { useState } from "react";
import type { RankedMode, RunMove } from "./leaderboard-core";

export async function leaderboardRequest(body: unknown) {
  const response = await fetch("/api/leaderboard", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || "The shared leaderboard is temporarily unavailable.");
  return data;
}

export function useRankedRound() {
  const [ticket, setTicket] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  function clear() {
    setTicket(null);
    setPosted(false);
    setError("");
  }
  async function begin(name: string, mode: RankedMode) {
    setStarting(true);
    clear();
    try {
      const data = await leaderboardRequest({ action: "start", name, mode });
      setTicket(data.ticket);
      return { order: data.order as number[], wallet: data.wallet as number };
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Ranked play could not start. Try again.");
      return null;
    } finally {
      setStarting(false);
    }
  }
  async function post(moves: RunMove[]) {
    if (!ticket || posting || posted) return null;
    setPosting(true);
    setError("");
    try {
      const data = await leaderboardRequest({ action: "finish", ticket, moves });
      setPosted(true);
      setRevision((r) => r + 1);
      return data.wallet as number;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Your score was not posted. Try again.");
      return null;
    } finally {
      setPosting(false);
    }
  }
  return { ticket, starting, posting, posted, error, revision, clear, begin, post };
}
