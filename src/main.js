import { Router } from "@vaadin/router";

function initRouter() {
    const _this = this;
    const closeMenu = function () {
        window.dispatchEvent(new CustomEvent("CLOSE_MENU", { bubbles: false, detail: "" }));
    };

    const router = new Router(document.querySelector("#app"));
    router.setRoutes([
        {
            path: "/",
            component: "my-home",
            action: () => {
                import("./pages/Home");
                closeMenu();
            },
        },
        {
            path: "/crypto",
            component: "crypto-list",
            action: () => {
                import("./pages/Crypto");
                closeMenu();
            },
        },
        {
            path: "/users",
            component: "user-list",
            action: () => {
                import("./pages/Users");
                closeMenu();
            },
        },
        {
            path: "/books",
            component: "book-list",
            action: () => {
                import("./pages/Books");
                closeMenu();
            },
        },
        {
            path: "/stocks",
            component: "stock-list",
            action: () => {
                import("./pages/Stocks");
                closeMenu();
            },
        },
        {
            path: "/about",
            component: "my-about",
            action: () => {
                import("./pages/About");
                closeMenu();
            },
        },
    ]);
}

window.addEventListener("load", () => initRouter());
