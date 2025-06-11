import { Hono } from "hono";
import { handle } from "hono/vercel";
import { app } from "~/app";

export const runtime = "edge";

const vercel_api = new Hono().basePath("/api");

vercel_api.route("/", app);

export const GET = handle(vercel_api);
export const POST = handle(vercel_api);
