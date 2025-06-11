import { app } from "./app";

Bun.serve({
    port: 5500,
    fetch(req, server) {
        return app.fetch(req, { ip: server.requestIP(req) });
    },
});
