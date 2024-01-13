import { Container } from "inversify";

import UserController from "../apps/users/users.controller";
import UserRepository from "../apps/users/users.repository";
import UserService from "../apps/users/users.services";
import Database from "./data-source";


class AppContainer {
    public readonly container: Container;
    constructor() {
        this.container = new Container();
        this.init();
    }
    init() {
        this.container.bind<Database>(Database).toSelf();
        this.container.bind<UserRepository>(UserRepository).toSelf();
        this.container.bind<UserService>(UserService).toSelf();
        this.container.bind<UserController>(UserController).toSelf().inRequestScope();
    }
    
}

export default AppContainer;