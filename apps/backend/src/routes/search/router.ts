import { type Context, Hono } from "hono";
import { SearchIcons } from "./controller";

const searchRouter = new Hono();
searchRouter.get("/", search_get);

async function search_get(ctx: Context) {
    try {
        const query = ctx.req.query("q") || "";
        const page_query = Number.parseInt(ctx.req.query("page") || "1");
        let page = 1;
        if (!Number.isNaN(page_query)) page = page_query;

        return ctx.json(SearchIcons(query.slice(0, 64), page, 200), 200);
    } catch (err) {
        console.error(err);
        return ctx.json(
            {
                success: false,
                message: "Server error",
            },
            500,
        );
    }
}

export default searchRouter;
