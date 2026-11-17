import { useEffect, useState } from "react";
import { RefreshCw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PublicScore, RankedMode } from "@/lib/leaderboard-core";

export function PublicLeaderboard({
  revision = 0,
  playerName = "",
  initialMode = "streak",
}: {
  revision?: number;
  playerName?: string;
  initialMode?: RankedMode;
}) {
  const [scores, setScores] = useState<PublicScore[]>([]);
  const [filter, setFilter] = useState<RankedMode>(initialMode);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [updated, setUpdated] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    let pending = false;
    async function load() {
      if (pending || document.hidden) return;
      pending = true;
      try {
        const response = await fetch("/api/leaderboard", {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "The leaderboard could not be loaded.");
        if (active) {
          setScores(data.scores);
          setUpdated(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
          setError("");
        }
      } catch (cause) {
        if (active && !controller.signal.aborted)
          setError(cause instanceof Error ? cause.message : "The leaderboard could not be loaded.");
      } finally {
        pending = false;
        if (active) setLoading(false);
      }
    }
    void load();
    const timer = window.setInterval(() => {
      void load();
    }, 3000);
    const onFocus = () => {
      void load();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      active = false;
      controller.abort();
      window.clearInterval(timer);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [revision, refresh]);
  const rows = scores.filter((score) => score.mode === filter);
  const myIndex = rows.findIndex(
    (row) => row.name.trim().toLowerCase() === playerName.trim().toLowerCase(),
  );

  return (
    <section aria-label="Public leaderboard" className="my-8 border-t border-border pt-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-2xl">
          <Trophy className="size-5 text-accent" />
          Public leaderboard
        </h2>
        <Button
          variant="secondary"
          onClick={() => setRefresh((r) => r + 1)}
          aria-label="Refresh leaderboard"
        >
          <RefreshCw className="size-4" />
          Refresh
        </Button>
      </div>
      <p className="mb-4 text-sm text-muted">
        One shared board for every device. Best automatically synced score per nickname and mode.
        Refreshes every 3 seconds while this page is visible.
      </p>
      <div className="mb-4 flex flex-wrap gap-2" aria-label="Leaderboard mode">
        {(["streak", "survival"] as const).map((mode) => (
          <Button
            key={mode}
            variant={filter === mode ? "primary" : "secondary"}
            aria-pressed={filter === mode}
            onClick={() => setFilter(mode)}
          >
            {mode === "streak" ? "Streak climb" : "Three-heart challenge"}
          </Button>
        ))}
      </div>
      {playerName ? (
        <p className="mb-4 font-medium text-accent">
          {myIndex >= 0
            ? `Your place: #${myIndex + 1} of ${rows.length} · ${rows[myIndex].score} points`
            : `No ${filter === "streak" ? "Streak climb" : "Three-heart challenge"} score for ${playerName} yet. Play this event to join.`}
        </p>
      ) : null}
      {error ? (
        <p role="status" className="mb-3 rounded-md border border-border bg-surface p-3 text-sm">
          {error} Use Refresh to try again.
        </p>
      ) : null}
      {loading ? (
        <p className="py-6 text-muted">Loading shared scores…</p>
      ) : rows.length ? (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Highest {filter === "streak" ? "Streak climb" : "Three-heart challenge"} scores across
              all devices
            </caption>
            <thead className="bg-surface text-muted">
              <tr>
                <th scope="col" className="p-3">
                  Rank
                </th>
                <th scope="col" className="p-3">
                  Player
                </th>
                <th scope="col" className="p-3 text-right">
                  Points
                </th>
                <th scope="col" className="p-3 text-right">
                  Streak
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={`${row.name}:${row.mode}`} className="border-t border-border">
                  <td className="p-3 tabular-nums">{i + 1}</td>
                  <th scope="row" className="max-w-48 break-words p-3 font-medium">
                    {row.name}
                  </th>
                  <td className="p-3 text-right tabular-nums">{row.score.toLocaleString()}</td>
                  <td className="p-3 text-right tabular-nums">{row.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !error ? (
        <p className="rounded-lg border border-dashed border-border p-6 text-muted">
          No scores yet in this mode. Enter a nickname and start a game to join this event.
        </p>
      ) : null}
      {updated ? (
        <p className="mt-3 text-xs text-muted">
          Last synced {updated} · nicknames are public, not verified identities.
        </p>
      ) : null}
    </section>
  );
}
