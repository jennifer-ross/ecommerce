import { DefaultTheme } from 'styled-components'
import { ITheme, ThemeTypes } from '../Interfaces/styled'

export const baseTheme: ITheme = {
    main: '#fff',

    shadows: {
        z1: 'rgba(145, 158, 171, 0.16) 0px 1px 2px 0px',
        z2: 'rgba(145, 158, 171, 0.2) 0px 3px 1px -2px, rgba(145, 158, 171, 0.14) 0px 2px 2px 0px, rgba(145, 158, 171, 0.12) 0px 1px 5px 0px',
        z3: 'rgba(145, 158, 171, 0.2) 0px 3px 3px -2px, rgba(145, 158, 171, 0.14) 0px 3px 4px 0px, rgba(145, 158, 171, 0.12) 0px 1px 8px 0px',
        z4: 'rgba(145, 158, 171, 0.16) 0px 4px 8px 0px',
        z5: 'rgba(145, 158, 171, 0.2) 0px 3px 5px -1px, rgba(145, 158, 171, 0.14) 0px 5px 8px 0px, rgba(145, 158, 171, 0.12) 0px 1px 14px 0px',
        z6: 'rgba(145, 158, 171, 0.2) 0px 3px 5px -1px, rgba(145, 158, 171, 0.14) 0px 6px 10px 0px, rgba(145, 158, 171, 0.12) 0px 1px 18px 0px',
        z7: 'rgba(145, 158, 171, 0.2) 0px 4px 5px -2px, rgba(145, 158, 171, 0.14) 0px 7px 10px 1px, rgba(145, 158, 171, 0.12) 0px 2px 16px 1px',
        z8: 'rgba(145, 158, 171, 0.16) 0px 8px 16px 0px',
        z9: 'rgba(145, 158, 171, 0.2) 0px 5px 6px -3px, rgba(145, 158, 171, 0.14) 0px 9px 12px 1px, rgba(145, 158, 171, 0.12) 0px 3px 16px 2px',
        z10: 'rgba(145, 158, 171, 0.2) 0px 6px 6px -3px, rgba(145, 158, 171, 0.14) 0px 10px 14px 1px, rgba(145, 158, 171, 0.12) 0px 4px 18px 3px',
        z11: 'rgba(145, 158, 171, 0.2) 0px 6px 7px -4px, rgba(145, 158, 171, 0.14) 0px 11px 15px 1px, rgba(145, 158, 171, 0.12) 0px 4px 20px 3px',
        z12: 'rgba(145, 158, 171, 0.16) 0px 12px 24px -4px',
        z13: 'rgba(145, 158, 171, 0.2) 0px 7px 8px -4px, rgba(145, 158, 171, 0.14) 0px 13px 19px 2px, rgba(145, 158, 171, 0.12) 0px 5px 24px 4px',
        z14: 'rgba(145, 158, 171, 0.2) 0px 7px 9px -4px, rgba(145, 158, 171, 0.14) 0px 14px 21px 2px, rgba(145, 158, 171, 0.12) 0px 5px 26px 4px',
        z15: 'rgba(145, 158, 171, 0.2) 0px 8px 9px -5px, rgba(145, 158, 171, 0.14) 0px 15px 22px 2px, rgba(145, 158, 171, 0.12) 0px 6px 28px 5px',
        z16: 'rgba(145, 158, 171, 0.16) 0px 16px 32px -4px',
        z17: 'rgba(145, 158, 171, 0.2) 0px 8px 11px -5px, rgba(145, 158, 171, 0.14) 0px 17px 26px 2px, rgba(145, 158, 171, 0.12) 0px 6px 32px 5px',
        z18: 'rgba(145, 158, 171, 0.2) 0px 9px 11px -5px, rgba(145, 158, 171, 0.14) 0px 18px 28px 2px, rgba(145, 158, 171, 0.12) 0px 7px 34px 6px',
        z19: 'rgba(145, 158, 171, 0.2) 0px 9px 12px -6px, rgba(145, 158, 171, 0.14) 0px 19px 29px 2px, rgba(145, 158, 171, 0.12) 0px 7px 36px 6px',
        z20: 'rgba(145, 158, 171, 0.16) 0px 20px 40px -4px',
        z21: 'rgba(145, 158, 171, 0.2) 0px 10px 13px -6px, rgba(145, 158, 171, 0.14) 0px 21px 33px 3px, rgba(145, 158, 171, 0.12) 0px 8px 40px 7px',
        z22: 'rgba(145, 158, 171, 0.2) 0px 10px 14px -6px, rgba(145, 158, 171, 0.14) 0px 22px 35px 3px, rgba(145, 158, 171, 0.12) 0px 8px 42px 7px',
        z23: 'rgba(145, 158, 171, 0.2) 0px 11px 14px -7px, rgba(145, 158, 171, 0.14) 0px 23px 36px 3px, rgba(145, 158, 171, 0.12) 0px 9px 44px 8px',
        z24: 'rgba(145, 158, 171, 0.16) 0px 24px 48px 0px',
        dropdown:
            'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px',
        dialog: 'rgba(0, 0, 0, 0.24) -40px 40px 80px -8px',
        card: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
        colored: '0px 8px 16px 0px',
    },

    colors: {
        primary: {
            lighter: '#C8FAD6',
            light: '#5BE49B',
            main: '#00A76F',
            dark: '#007867',
            darker: '#004B50',
        },

        secondary: {
            lighter: '#EFD6FF',
            light: '#C684FF',
            main: '#8E33FF',
            dark: '#5119B7',
            darker: '#27097A',
        },

        info: {
            lighter: '#CAFDF5',
            light: '#61F3F3',
            main: '#00B8D9',
            dark: '#006C9C',
            darker: '#003768',
        },

        success: {
            lighter: '#D3FCD2',
            light: '#77ED8B',
            main: '#22C55E',
            dark: '#118D57',
            darker: '#065E49',
        },

        error: {
            lighter: '#FFE9D5',
            light: '#FFAC82',
            main: '#FF5630',
            dark: '#B71D18',
            darker: '#7A0916',
        },

        warning: {
            lighter: '#FFF5CC',
            light: '#FFD666',
            main: '#FFAB00',
            dark: '#B76E00',
            darker: '#7A4100',
        },

        grey: {
            100: '#F9FAFB',
            200: '#F4F6F8',
            300: '#DFE3E8',
            400: '#C4CDD5',
            500: '#919EAB',
            600: '#637381',
            700: '#454F5B',
            800: '#212B36',
            900: '#161C24',
        },

        bg: '#E5E4E8',
        font: {
            light: '#fff',
            dark: '#19191B',
        },
    },

    media: {
        extraLarge: '(max-width: 1140px)',
        large: '(max-width: 960px)',
        medium: '(max-width: 720px)',
        small: '(max-width: 540px)',
    },

    // in px
    sizes: {
        header: { height: 56 },
        container: { width: 1200 },
        footer: { height: 128 },
        modal: { width: 540 },
    },

    // in ms
    durations: {
        ms300: 300,
    },

    // z-index
    order: {
        header: 50,
        modal: 100,
    },
}

export const lightTheme: DefaultTheme = {
    ...baseTheme,
    type: ThemeTypes.light,

    colors: {
        ...baseTheme.colors,
    },
}

export const darkTheme: DefaultTheme = {
    ...baseTheme,
    type: ThemeTypes.dark,

    colors: {
        ...baseTheme.colors,
    },
}
