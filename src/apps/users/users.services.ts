import { inject, injectable } from "inversify";
import UsersEntity from "./users.entitiy";
import UserRepository from "./users.repository";


@injectable()
class UserService {

    constructor(
        @inject(UserRepository)
        private readonly userRepository: UserRepository
    ) { }

    findById(id: number): UsersEntity | undefined {
        return this.userRepository.findById(id)
    }

    findAll(): UsersEntity[] {
        return this.userRepository.findAll()
    }
    create(name: string, email: string): UsersEntity {
        let user = this.userRepository.create(name, email);
        user = this.userRepository.save(user);
        return user;
    }

    delete(id: number): void {
        this.userRepository.delete(id)
    }

    update(id: number, name: string, email: string): UsersEntity {
        let findUser = this.userRepository.findById(id);
        if (!findUser) {
            throw new Error("User not found")
        }
        findUser.name = name
        findUser.email = email
        findUser = this.userRepository.save(findUser);
        return findUser;
    }
}

export default UserService;