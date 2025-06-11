import { Hono } from "hono";
import { cors } from "hono/cors";
import searchRouter from "./routes/search/router";

const app = new Hono();
app.use(
    cors({
        origin: "http://localhost:3000",
    }),
);
app.route("/search", searchRouter);

Bun.serve({
    port: 5500,
    fetch(req, server) {
        return app.fetch(req, { ip: server.requestIP(req) });
    },
});
