import { Hono } from "hono";
import { HonoBase } from "hono/hono-base";
import UserRoutes from "../apps/users/users.routes";
import AppContainer from "./container";

class BootstrapApp {
    public app: HonoBase;
    public container: AppContainer;
    constructor() {
        this.container = new AppContainer();
        this.app = new Hono();
        this.initRoutes();
    }

    initRoutes() {
        this.app.route("/users", new UserRoutes(this.container).routes);
    }
}

export default BootstrapApp;
