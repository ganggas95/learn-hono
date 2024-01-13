import { injectable } from "inversify";
import { Repository } from "typeorm";
import { InjectRepository } from "../../commons/typeorm.decorators";
import { UserDto } from "./dto/users.dto";
import UsersEntity from "./entity/users.entitiy";


@injectable()
class UserService {

    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
    ) { }

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
        Object.assign(findUser, userDto)
        return await this.userRepository.save(findUser);
    }
}

export default UserService;