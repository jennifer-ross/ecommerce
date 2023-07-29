import { RootStore } from './rootStore'
import { makeAutoObservable } from 'mobx'
import { isEmpty } from 'lodash'

export class AuthStore {
    // @ts-ignore
    private rootStore: RootStore | undefined
    private accessToken: string = ''
    private refreshToken: string = ''
    private sessionId: string = ''
    private auth: boolean = false

    constructor(rootStore?: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    get isAuth(): boolean {
        return (
            !this.auth || isEmpty(this.accessToken) || isEmpty(this.sessionId)
        )
    }
}
