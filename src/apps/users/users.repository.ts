import { injectable } from "inversify";
import UsersEntity from "./users.entitiy";


@injectable()
class UserRepository {
    private users: UsersEntity[] = [];
    private lastIndex: number = 0;
    // constructor() { }
    create(name: string, email: string): UsersEntity {
        const entity = UsersEntity.create(name, email)
        entity.id = undefined;
        return entity
    }

    save(entity: UsersEntity): UsersEntity {
        if (entity.id) {
            const index = this.users.findIndex((user) => user.id === entity.id)
            this.users[index] = entity
            return entity
        }
        entity.id = ++this.lastIndex;
        this.users.push(Object.assign({}, entity));
        console.log(this.lastIndex)
        return entity;
    }

    findById(id: number): UsersEntity | undefined {
        return this.users.find((user) => user.id === id)
    }

    findAll(): UsersEntity[] {
        return this.users
    }

    delete(id: number): void {
        this.users = this.users.filter((user) => user.id !== id)
        return
    }

}

export default UserRepository;