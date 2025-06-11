/* @refresh reload */
import { render } from "solid-js/web";

import { Route, Router } from "@solidjs/router";
import App from "./App";
import "./app.css";

function AppRoutes() {
    return (
        <Router>
            <Route path={"/"} component={App} />
        </Router>
    );
}

const docRoot = document.getElementById("root");

if (import.meta.env.DEV && !(docRoot instanceof HTMLElement)) {
    throw new Error("Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?");
}

if (docRoot) render(() => <AppRoutes />, docRoot);
