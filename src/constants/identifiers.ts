const DI_IDENTIFIER = {
    DATABASE: Symbol.for('Database'),
    USER_REPOSITORY: Symbol.for('UserRepository'),
    USER_SERVICE: Symbol.for('UserService'),
    USER_CONTROLLER: Symbol.for('UserController')
}

export default DI_IDENTIFIER;