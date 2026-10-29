import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/leaderboard")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { handleLeaderboard } = await import("@/lib/leaderboard.server");
        return handleLeaderboard(request);
      },
      POST: async ({ request }) => {
        const { handleLeaderboard } = await import("@/lib/leaderboard.server");
        return handleLeaderboard(request);
      },
    },
  },
});
