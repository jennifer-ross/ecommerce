import { createContext } from 'react'
import { RootStore, rootStore } from '../Store/rootStore'

export const StoreContext = createContext<RootStore>(rootStore)
