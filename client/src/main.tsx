import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './Routes'
import { ThemeProvider } from 'styled-components'
import { rootStore } from './Store/rootStore'
import { StoreProvider } from './Providers/StoreProvider'
import { HelmetProvider } from 'react-helmet-async'
import { configure } from 'mobx'
import { GlobalStyles } from './Styles/global'

configure({ enforceActions: 'always' })

const root = ReactDOM.createRoot(document.getElementById('root') as Element)
const router = createBrowserRouter(routes)

root.render(
    <React.StrictMode>
        <StoreProvider store={rootStore}>
            <ThemeProvider theme={rootStore.uiStore.theme}>
                <HelmetProvider>
                    <GlobalStyles />
                    <RouterProvider router={router} />
                </HelmetProvider>
            </ThemeProvider>
        </StoreProvider>
    </React.StrictMode>,
)
