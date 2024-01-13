import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity()
class UsersEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column()
    name: string | undefined

    @Column()
    email: string | undefined
}

export default UsersEntity