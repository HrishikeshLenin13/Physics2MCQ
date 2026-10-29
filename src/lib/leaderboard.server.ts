import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { BlobPreconditionFailedError, get, put } from "@vercel/blob";
import {
  EMPTY_BOARD,
  cleanPlayerName,
  publicScores,
  recordRun,
  type BoardData,
  type RunTicket,
} from "./leaderboard-core";
import { shuffleIds } from "./study-game";
import { QUESTIONS } from "../data/questions";

const PATH = `leaderboard/${process.env.LEADERBOARD_NAMESPACE || "magnetism-v1"}.json`;
const COOKIE = "magnetism_player";
const TTL = 24 * 60 * 60 * 1000;
const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
function secret() {
  const value = process.env.BLOB_READ_WRITE_TOKEN;
  if (!value) throw new Error("Shared leaderboard storage is not configured.");
  return createHmac("sha256", value).update("magnetism-leaderboard-session-v1").digest();
}
function sign(value: unknown) {
  const body = Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${body}.${createHmac("sha256", secret()).update(body).digest("base64url")}`;
}
function verify(value: string): unknown {
  const [body, signature, extra] = value.split(".");
  if (!body || !signature || extra || value.length > 8000)
    throw new Error("This ranked session is invalid. Start a new game.");
  const expected = createHmac("sha256", secret()).update(body).digest();
  const actual = Buffer.from(signature, "base64url");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
    throw new Error("This ranked session is invalid. Start a new game.");
  return JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
}
function playerFrom(request: Request) {
  const value = request.headers
    .get("cookie")
    ?.split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  if (value)
    try {
      const id = verify(value);
      if (typeof id === "string" && /^[a-f0-9-]{36}$/.test(id)) return id;
    } catch {
      /* New anonymous player after a stale cookie. */
    }
  return randomUUID();
}
async function readBoard(): Promise<{ data: BoardData; etag?: string }> {
  const blob = await get(PATH, { access: "private", useCache: false });
  if (!blob || blob.statusCode !== 200) return { data: structuredClone(EMPTY_BOARD) };
  if (blob.blob.size > 4 * 1024 * 1024)
    throw new Error("The leaderboard is full. Try again later.");
  const data = (await new Response(blob.stream).json()) as BoardData;
  if (data.version !== 1 || !data.players || !data.runs)
    throw new Error("Leaderboard data could not be loaded.");
  return { data, etag: blob.blob.etag };
}
export async function handleLeaderboard(request: Request): Promise<Response> {
  try {
    if (request.method === "GET") {
      const { data } = await readBoard();
      return Response.json(
        { scores: publicScores(data), updatedAt: new Date().toISOString() },
        { headers },
      );
    }
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin)
      return Response.json(
        { error: "Use the leaderboard from this website." },
        { status: 403, headers },
      );
    if (!request.headers.get("content-type")?.includes("application/json"))
      return Response.json({ error: "Expected JSON." }, { status: 415, headers });
    const text = await request.text();
    if (text.length > 32000)
      return Response.json({ error: "Round history is too large." }, { status: 413, headers });
    const body = JSON.parse(text);
    if (body.action === "start") {
      const name = cleanPlayerName(body.name);
      if (body.mode !== "streak" && body.mode !== "survival")
        throw new Error("Choose a game mode for ranked play.");
      const player = playerFrom(request);
      const { data } = await readBoard();
      const ticket: RunTicket = {
        version: 1,
        id: randomUUID(),
        player,
        name,
        mode: body.mode,
        order: shuffleIds(QUESTIONS.map((q) => q.id)),
        wallet: data.players[player]?.wallet ?? 0,
        expires: Date.now() + TTL,
      };
      const cookie = `${COOKIE}=${sign(player)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`;
      return Response.json(
        { ticket: sign(ticket), order: ticket.order, wallet: ticket.wallet },
        { headers: { ...headers, "Set-Cookie": cookie } },
      );
    }
    if (body.action !== "finish" || typeof body.ticket !== "string")
      throw new Error("Unknown leaderboard action.");
    const ticket = verify(body.ticket) as RunTicket;
    if (
      ticket.version !== 1 ||
      ticket.expires < Date.now() ||
      ticket.expires > Date.now() + TTL ||
      ticket.player !== playerFrom(request)
    )
      throw new Error("This ranked session expired. Start a new game.");
    cleanPlayerName(ticket.name);
    for (let attempt = 0; attempt < 6; attempt++) {
      const current = await readBoard();
      const result = recordRun(current.data, ticket, body.moves, Date.now());
      if (result.duplicate)
        return Response.json(
          {
            saved: true,
            duplicate: true,
            wallet: result.wallet,
            scores: publicScores(result.board),
          },
          { headers },
        );
      try {
        await put(PATH, JSON.stringify(result.board), {
          access: "private",
          addRandomSuffix: false,
          allowOverwrite: !!current.etag,
          ...(current.etag ? { ifMatch: current.etag } : {}),
          contentType: "application/json",
          cacheControlMaxAge: 60,
        });
        return Response.json(
          { saved: true, wallet: result.wallet, scores: publicScores(result.board) },
          { headers },
        );
      } catch (error) {
        if (
          error instanceof BlobPreconditionFailedError ||
          (!current.etag && error instanceof Error && /already exists/i.test(error.message))
        )
          continue;
        throw error;
      }
    }
    return Response.json(
      { error: "Several scores arrived together. Please try posting again." },
      { status: 409, headers },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "The leaderboard is temporarily unavailable.";
    const validation =
      /nickname|letters|round|session|Question|choice|Power-up|power-up|mode|wallet|action/i.test(
        message,
      );
    return Response.json(
      {
        error: validation
          ? message
          : "The shared leaderboard is temporarily unavailable. Please try again.",
      },
      { status: validation ? 400 : 503, headers },
    );
  }
}
