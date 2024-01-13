import { inject, injectable } from "inversify";
import { UserDto } from "./dto/users.dto";
import UsersEntity from "./entity/users.entitiy";
import UserRepository from "./users.repository";


@injectable()
class UserService {

    constructor(
        @inject(UserRepository)
        private readonly userRepository: UserRepository,
    ) { }

    async findById(id: number): Promise<UsersEntity | undefined> {
        return await this.userRepository.repository.findOneBy(
            { id }
        ) || undefined;
    }

    async findAll(): Promise<UsersEntity[]> {
        return await this.userRepository.repository.find() || [];
    }
    async create(userDto: UserDto): Promise<UsersEntity | null> {
        let user = this.userRepository.repository.create(userDto);
        if (!user) {
            return null;
        }
        return await this.userRepository.repository.save(user);
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.repository.softDelete(id)
    }

    async update(id: number, userDto: UserDto): Promise<UsersEntity> {
        let findUser = await this.findById(id)
        if (!findUser) {
            throw new Error("User not found")
        }
        return await this.userRepository.repository.save(findUser);
    }
}

export default UserService;