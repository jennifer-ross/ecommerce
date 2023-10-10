import { IRole } from './Role'

export interface IUser {
    _id: string
    fullName: string
    email: string
    login: string
    password?: string
    isValid: boolean
    createdDate: Date
    updateDate: Date
    validateDate: Date
    roleId: string
}

export class User implements IUser {
    get role(): IRole | null {
        return this._role
    }

    set role(value: IRole) {
        this._role = value
    }
    private _role: IRole | null = null
}
