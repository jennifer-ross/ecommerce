import { makeAutoObservable } from 'mobx'
import { darkTheme, lightTheme } from '../Styles/theme'
import { ThemeConfig, theme } from 'antd'

export class UIStore {
    theme: ThemeConfig = lightTheme

    constructor() {
        makeAutoObservable(this)
    }

    get isLightTheme(): boolean {
        return this.theme.algorithm === theme.defaultAlgorithm
    }

    toggleTheme(): void {
        this.theme = this.isLightTheme ? darkTheme : lightTheme
    }
}
