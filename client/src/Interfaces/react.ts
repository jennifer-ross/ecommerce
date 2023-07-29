import { ReactElement, ReactPortal } from 'react'

export type ReactText = string | number
export type ReactChild = ReactElement | ReactText

export interface ReactNodeArray extends Array<ReactNode> {}
export type ReactFragment = {} | ReactNodeArray
export type ReactNode =
    | ReactChild
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined

export type Props = {
    children: ReactNode
}

export type PropsWithChildren<P> = P & { children?: ReactNode }
