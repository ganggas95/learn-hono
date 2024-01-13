import { Container } from "inversify";
import DI_IDENTIFIER from "../../constants/identifiers";
import BaseRoutes, { BaseRoutesType } from "../../core/routes";
import UserController from "./users.controller";


class UserRoutes extends BaseRoutes implements BaseRoutesType {
    constructor(private readonly container: Container) {
        super();
        this.init();
    }

    init() {
        const userController = this.container
            .get<UserController>(DI_IDENTIFIER.USER_CONTROLLER);
        this.routes.get("/list", c => userController.findAll(c));
        this.routes.post("/list", c => userController.create(c));
        this.routes.get("/:id", c => userController.findById(c));
        this.routes.delete("/:id", c => userController.delete(c));
        this.routes.put("/:id", c => userController.update(c));
    }
}

export default UserRoutes;