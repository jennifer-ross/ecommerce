import { FC, ReactElement, ReactNode } from 'react'
import { RootStore } from '../Store/rootStore'
import { StoreContext } from '../Contexts/storeContext'

export type StoreComponent = FC<{
    store: RootStore
    children: ReactNode
}>

export const StoreProvider: StoreComponent = ({
    children,
    store,
}): ReactElement => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}
