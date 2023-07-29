import { createGlobalStyle } from 'styled-components'
import { IStyledComponentProps, ThemeTypes } from '../Interfaces/styled'

export const GlobalStyles = createGlobalStyle<IStyledComponentProps>`
 *,
 *::before,
 *::after {
    box-sizing: border-box;
 }
 body {
    margin: 0
 }
 :root {
    color-scheme: light ${(props) =>
        props.theme.type === ThemeTypes.light ? 'light' : 'dark'};
 }
 `
