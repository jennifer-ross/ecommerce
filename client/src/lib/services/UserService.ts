import { makeAutoObservable } from 'mobx'

import ApiService from '../base/ApiService'
import RouterService from '../base/RouterService'

import TYPES from '../types'
import { IUser } from '../models/User'
import { inject } from '../../helpers/serviceManager'

export class UserService {
    readonly routerService = inject<RouterService>(TYPES.routerService)
    readonly apiService = inject<ApiService>(TYPES.apiService)

    constructor() {
        makeAutoObservable(this)
    }

    async one(id: string): Promise<IUser | null> {
        if (id === 'create') {
            return Promise.resolve(null)
        } else {
            return await this.apiService.get<IUser>(`users/${id}`)
        }
    }

    async save(user: IUser) {
        return await this.apiService.put(`users/${user._id}`, user)
    }

    async create(rawUser: IUser) {
        const user = await this.apiService.post<IUser, IUser>(`users`, rawUser)
        await this.routerService.push(`/users/${user._id}`)
        return user
    }

    async remove(person: IUser) {
        return await this.apiService.remove(`users/${person._id}`)
    }
}

export default UserService
