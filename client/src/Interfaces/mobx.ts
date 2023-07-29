import { RootStore } from '../Store/rootStore'

export type PropsWithStore<P> = P & { store?: RootStore }
