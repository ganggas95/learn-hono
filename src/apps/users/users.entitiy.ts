type UserType = {
    id?: number
    name?: string
    email?: string
}
class UsersEntity implements UserType {
    id: number | undefined
    name: string | undefined
    email: string | undefined

    public static create(name: string, email: string) {
        const entity = new UsersEntity()
        entity.email = email
        entity.name = name
        return entity
    }
}

export default UsersEntity