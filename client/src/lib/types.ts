const baseServices = {
    routerService: Symbol.for('routerService'),
    sessionService: Symbol.for('sessionService'),
    errorService: Symbol.for('errorService'),
    apiService: Symbol.for('apiService'),
}

const viewServices = {
    userService: Symbol.for('userService'),
}

export const TYPES = {
    ...baseServices,
    ...viewServices,
}

export default TYPES
