import { injectable } from "inversify";
import { DataSource, EntityManager } from "typeorm";
import { UsersEntity } from '../apps/users/entity';


@injectable()
class Database {
    public dataSource: DataSource;
    public entities = [UsersEntity];
    constructor() {

        this.dataSource = new DataSource({
            type: "postgres",
            url: process.env.DB_URL,
            synchronize: true,
            logging: true,
            entities: this.entities,
            subscribers: [],
            migrations: [],
        });

        this.initializeDatabase();
    }

    initializeDatabase() {
        this.dataSource?.initialize().then(() => {
            console.log("database initialized")
        }).catch(error => {
            console.error(error)
        })
    }

    get manager(): EntityManager {
        return this.dataSource.manager;
    }
}

export default Database;