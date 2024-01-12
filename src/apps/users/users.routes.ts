import { Hono } from "hono";
import AppContainer from "../../config/container";
import UserController from "./users.controller";


class UserRoutes {
    public readonly routes: Hono;

    constructor(private readonly appContainer: AppContainer) {
        this.routes = new Hono();
        this.init();
    }

    private get container() {
        return this.appContainer.container;
    }

    init() {
        const userController = this.container.get<UserController>(UserController);
        this.routes.get("/list", c => userController.findAll(c));
        this.routes.post("/list", c => userController.create(c));
        this.routes.get("/:id", c => userController.findById(c));
        this.routes.delete("/:id", c => userController.delete(c));
        this.routes.put("/:id", c => userController.update(c));
    }
}

export default UserRoutes;