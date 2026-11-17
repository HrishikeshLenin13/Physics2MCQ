import { useEffect, useRef, useState } from "react";
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

export function useRankedRound(history: RunMove[], enabled: boolean) {
  const currentTicket = useRef<string | null>(null);
  const queue = useRef<{ ticket: string; moves: RunMove[] } | null>(null);
  const working = useRef(false);
  const [ticket, setTicket] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  function clear() {
    currentTicket.current = null;
    queue.current = null;
    setTicket(null);
    setPosted(false);
    setError("");
  }
  async function begin(name: string, mode: RankedMode) {
    setStarting(true);
    clear();
    try {
      const data = await leaderboardRequest({ action: "start", name, mode });
      currentTicket.current = data.ticket;
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
    if (!ticket || posting) return null;
    setPosting(true);
    setError("");
    try {
      const data = await leaderboardRequest({ action: "checkpoint", ticket, moves });
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

  useEffect(() => {
    if (!ticket || !enabled) return;
    queue.current = { ticket, moves: history };
    async function drain() {
      if (working.current) return;
      working.current = true;
      while (queue.current) {
        const item = queue.current;
        queue.current = null;
        if (currentTicket.current !== item.ticket) continue;
        setPosting(true);
        let saved = false;
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            await leaderboardRequest({
              action: "checkpoint",
              ticket: item.ticket,
              moves: item.moves,
            });
            saved = true;
            if (currentTicket.current === item.ticket) {
              setError("");
              setPosted(true);
              setRevision((r) => r + 1);
            }
            break;
          } catch (cause) {
            if (attempt < 2)
              await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
            else if (currentTicket.current === item.ticket)
              setError(
                cause instanceof Error ? cause.message : "Score sync failed. Use Retry sync.",
              );
          }
        }
        if (!saved && !queue.current) break;
      }
      working.current = false;
      setPosting(false);
    }
    void drain();
  }, [ticket, enabled, history]);
  return { ticket, starting, posting, posted, error, revision, clear, begin, post };
}
