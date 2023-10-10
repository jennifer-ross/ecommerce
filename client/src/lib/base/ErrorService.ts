import { makeAutoObservable } from 'mobx'

import { Subject } from 'rxjs'

class BaseError {}

const createError = (type: string): typeof BaseError =>
    class extends BaseError {
        type = ''
        constructor() {
            super()
            this.type = type
        }
    }

export const UnauthorizedError = createError('unauthorized-error')
export const ForbiddenError = createError('forbidden-error')
export const InternalError = createError('internal-error')
export const OfflineError = createError('offline-error')

const UNAUTHORIZED = 401
const FORBIDDEN = 403
const INTERNAL = 500
const GATEWAY = 504

export class ErrorService {
    permissionsSubject = new Subject<void>()
    offlineSubject = new Subject<void>()
    dieSubject = new Subject<undefined | string>()

    constructor() {
        makeAutoObservable(this)
    }

    processStatusCode = (code: number) => {
        if (code === UNAUTHORIZED) {
            throw new UnauthorizedError()
        } else if (code === FORBIDDEN) {
            throw new ForbiddenError()
        } else if (code === INTERNAL) {
            throw new InternalError()
        } else if (code === GATEWAY) {
            throw new InternalError()
        }
    }

    handleError = (e: Error) => {
        console.log('errorService handleError', e)
        if (e instanceof ForbiddenError) {
            this.logout()
        } else if (e instanceof InternalError) {
            this.die()
        } else if (e instanceof UnauthorizedError) {
            this.logout()
        } else if (e instanceof OfflineError) {
            this.offline()
        } else {
            this.die()
        }
    }

    die = (message?: string) => {
        this.dieSubject.next(message)
    }

    offline = () => {
        this.offlineSubject.next()
    }

    logout = async () => {
        this.permissionsSubject.next()
    }
}

export default ErrorService
