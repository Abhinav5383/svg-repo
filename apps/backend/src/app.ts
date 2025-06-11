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

export { app };
