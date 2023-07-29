export enum ThemeTypes {
    light = 'light',
    dark = 'dark',
}

export interface ITheme {
    main: string

    shadows: {
        z1: string
        z2: string
        z3: string
        z4: string
        z5: string
        z6: string
        z7: string
        z8: string
        z9: string
        z10: string
        z11: string
        z12: string
        z13: string
        z14: string
        z15: string
        z16: string
        z17: string
        z18: string
        z19: string
        z20: string
        z21: string
        z22: string
        z23: string
        z24: string
        card: string
        dropdown: string
        dialog: string
        colored: string
    }

    colors: {
        secondary: {
            lighter: string
            light: string
            main: string
            dark: string
            darker: string
        }

        primary: {
            lighter: string
            light: string
            main: string
            dark: string
            darker: string
        }

        grey: {
            100: string
            200: string
            300: string
            400: string
            500: string
            600: string
            700: string
            800: string
            900: string
        }

        info: {
            lighter: string
            light: string
            main: string
            dark: string
            darker: string
        }

        success: {
            lighter: string
            light: string
            main: string
            dark: string
            darker: string
        }

        warning: {
            lighter: string
            light: string
            main: string
            dark: string
            darker: string
        }

        error: {
            lighter: string
            light: string
            main: string
            dark: string
            darker: string
        }

        bg: string
        font: {
            light: string
            dark: string
        }
    }

    media: {
        extraLarge: string
        large: string
        medium: string
        small: string
    }

    sizes: {
        header: { height: number }
        container: { width: number }
        footer: { height: number }
        modal: { width: number }
    }

    durations: {
        ms300: number
    }

    order: {
        header: number
        modal: number
    }
}

export interface IStyledComponentProps {
    theme?: ITheme
}
