import { Container } from "inversify";

import { Repository } from "typeorm";
import { UsersEntity } from "../apps/users/entity";
import UserController from "../apps/users/users.controller";
import UserService from "../apps/users/users.services";
import { getRepositoryToken } from "../commons/typeorm.utils";
import DI_IDENTIFIER from "../constants/identifiers";
import Database from "./data-source";


class AppContainer {
    public readonly container: Container;
    constructor() {
        this.container = new Container();
        this.init();
    }
    init() {
        this.container
            .bind<Database>(DI_IDENTIFIER.DATABASE)
            .to(Database);
        this.initRepositories();
        this.container
            .bind<UserService>(DI_IDENTIFIER.USER_SERVICE)
            .to(UserService);
        this.container
            .bind<UserController>(DI_IDENTIFIER.USER_CONTROLLER)
            .to(UserController).inRequestScope();
    }

    private initRepositories() {
        const database = this
            .container
            .get<Database>(DI_IDENTIFIER.DATABASE);
        database.entities.forEach(entity => {
            this.container
                .bind<Repository<UsersEntity>>(getRepositoryToken(entity))
                .toConstantValue(database.manager.getRepository(entity));
        })
    }
}

export default AppContainer;