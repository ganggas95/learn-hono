import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import DI_IDENTIFIER from "../../constants/identifiers";
import { UserDto } from "./dto/users.dto";
import UsersEntity from "./entity/users.entitiy";


@injectable()
class UserService {

    constructor(
        @inject(DI_IDENTIFIER.USER_REPOSITORY)
        private readonly userRepository: Repository<UsersEntity>,
    ) {}

    async findById(id: number): Promise<UsersEntity | undefined> {
        return await this.userRepository.findOneBy(
            { id }
        ) || undefined;
    }

    async findAll(): Promise<UsersEntity[]> {
        return await this.userRepository.find() || [];
    }
    async create(userDto: UserDto): Promise<UsersEntity | null> {
        let user = this.userRepository.create(userDto);
        if (!user) {
            return null;
        }
        return await this.userRepository.save(user);
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.softDelete(id)
    }

    async update(id: number, userDto: UserDto): Promise<UsersEntity> {
        let findUser = await this.findById(id)
        if (!findUser) {
            throw new Error("User not found")
        }
        return await this.userRepository.save(findUser);
    }
}

export default UserService;