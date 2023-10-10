import { provide } from './helpers/serviceManager'

import RouterService from './lib/base/RouterService'
import SessionService from './lib/base/SessionService'
import ErrorService from './lib/base/ErrorService'
import ApiService from './lib/base/ApiService'
import UserService from './lib/services/UserService'

import TYPES from './lib/types'

provide(TYPES.routerService, () => new RouterService())
provide(TYPES.sessionService, () => new SessionService())
provide(TYPES.errorService, () => new ErrorService())
provide(TYPES.apiService, () => new ApiService())
provide(TYPES.apiService, () => new UserService())
