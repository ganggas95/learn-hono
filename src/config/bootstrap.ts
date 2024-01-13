import { Hono } from "hono";
import { HonoBase } from "hono/hono-base";
import { Container } from "inversify";
import UserRoutes from "../apps/users/users.routes";
import AppContainer from "./container";

class BootstrapApp {
    public app: HonoBase;
    public container: Container;
    constructor() {
        this.container = new AppContainer().container;
        this.app = new Hono();
        this.initRoutes();
    }

    initRoutes() {

        this.app.route("/users", new UserRoutes(this.container).routes);
    }
}

export default BootstrapApp;
