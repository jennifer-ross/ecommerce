import { UIStore } from './ui'

/**
 * Root Store Class with
 */
export class RootStore {
    uiStore: UIStore

    constructor() {
        this.uiStore = new UIStore(this)
    }
}

// export type RootStoreModel = Instance<typeof RootStore>

// const RootStoreModel = types.model('RootStore', {
//     uiStore: types.map(UIStore),
// })

export const rootStore = new RootStore()
