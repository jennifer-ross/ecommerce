import { RootStore } from './rootStore'
import { makeAutoObservable } from 'mobx'

export class UserStore {
    // @ts-ignore
    private rootStore: RootStore | undefined
    private uid: string = ''
    private roles: string[] = ['quest']

    constructor(rootStore?: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }
}
