import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import Database from "../../config/data-source";
import UsersEntity from "./entity/users.entitiy";


@injectable()
class UserRepository {
    constructor(
        @inject(Database)
        private readonly database: Database
    ) { }

    get repository(): Repository<UsersEntity> {
        return this.database.manager.getRepository(UsersEntity);
    }
}

export default UserRepository;