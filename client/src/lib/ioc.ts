import { inject } from '../helpers/serviceManager'

import RouterService from './base/RouterService'
import SessionService from './base/SessionService'
import ErrorService from './base/ErrorService'
import ApiService from './base/ApiService'

import { DENIED_PAGE } from '../config'
import { ERROR_PAGE } from '../config'
import { OFFLINE_PAGE } from '../config'

import '../lib.config'

import TYPES from './types'
import UserService from './services/UserService'

const systemServices = {
    routerService: inject<RouterService>(TYPES.routerService),
    sessionService: inject<SessionService>(TYPES.sessionService),
    errorService: inject<ErrorService>(TYPES.errorService),
    apiService: inject<ApiService>(TYPES.apiService),
}

const appServices = {
    userService: inject<UserService>(TYPES.userService),
}

export const ioc = {
    ...systemServices,
    ...appServices,
}

console.log(ioc)
ioc.errorService.permissionsSubject.subscribe(() => {
    ioc.routerService.push(DENIED_PAGE)
})

ioc.errorService.offlineSubject.subscribe(() => {
    ioc.routerService.push(OFFLINE_PAGE)
})

ioc.errorService.dieSubject.subscribe((message?: string) => {
    ioc.routerService.push(ERROR_PAGE, { message })
})

ioc.errorService.permissionsSubject.subscribe(() => {
    ioc.sessionService.setSessionId('', true)
})

window.addEventListener('unhandledrejection', () => ioc.errorService.die())
window.addEventListener('error', (event) => ioc.errorService.die(event.message))
;(window as any).ioc = ioc

export default ioc
