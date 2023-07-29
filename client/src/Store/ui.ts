import { makeAutoObservable } from 'mobx'
import { DefaultTheme } from 'styled-components'

import { ThemeTypes } from '../Interfaces/styled'
import { darkTheme, lightTheme } from '../Styles/theme'
import { RootStore } from './rootStore'

export class UIStore {
    theme: DefaultTheme = lightTheme
    private rootStore: RootStore | undefined

    constructor(rootStore?: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    get isLightTheme(): boolean {
        return this.theme.type === ThemeTypes.light
    }

    toggleTheme(): void {
        this.theme = this.isLightTheme ? darkTheme : lightTheme
    }
}
