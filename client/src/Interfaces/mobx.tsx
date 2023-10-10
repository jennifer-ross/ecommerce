import { RootStore } from '../Store/rootStore'
import React, {
    ComponentType,
    FC,
    createContext,
    ReactNode,
    ReactElement,
} from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

export type PropsWithStore = { rootStore?: RootStore }
export type TWithStoreHOC = <P>(
    Component: ComponentType<P>,
) => (props: P) => JSX.Element

export const StoreContext = createContext<RootStore>({} as RootStore)

export type StoreComponent = FC<{
    store: RootStore
    children: ReactNode
}>

export const useStore = () => {
    const store = React.useContext(StoreContext)
    if (store === null) {
        throw new Error('Store cannot be null, please add a context provider')
    }
    return store
}

export const StoreProvider: StoreComponent = ({
    children,
    store,
}): ReactElement => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}

export const withStore: TWithStoreHOC = (WrappedComponent) => (props) => {
    const ComponentWithStore = () => {
        const store = useStore()

        return <WrappedComponent {...props} store={store} />
    }

    ComponentWithStore.defaultProps = { ...WrappedComponent.defaultProps }
    ComponentWithStore.displayName = `WithStores(${
        WrappedComponent.name || WrappedComponent.displayName
    })`

    hoistNonReactStatics(ComponentWithStore, WrappedComponent)

    return <ComponentWithStore />
}
