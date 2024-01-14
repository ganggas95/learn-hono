
type PasswordParams = {
    password: string
    hash: string
}

export const hashPassword = async (password: string): Promise<string> => {
    return await Bun.password.hash(password);
}

export const checkPassword = async (params: PasswordParams): Promise<boolean> => {
    return await Bun.password.verify(params.password, params.hash);
}
