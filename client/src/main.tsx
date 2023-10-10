import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './main.css'
import './responsive.css'
import './App.sass'

import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { configure } from 'mobx'
import { ConfigProvider, App, theme } from 'antd'
import ioc from './lib/ioc'

configure({ enforceActions: 'always' })

const root = ReactDOM.createRoot(document.getElementById('root') as Element)

const currentTheme = theme.defaultConfig

currentTheme.token.colorPrimary = '#27DEBF'
currentTheme.token.colorPrimary = '#23C8AC'
// currentTheme.token.colorPrimary = 'rgb(31,178,153)'

root.render(
    <React.StrictMode>
        <React.Suspense fallback="loading">
            <ConfigProvider theme={theme.defaultConfig}>
                <App>
                    <HelmetProvider>
                        <style>
                            {`
                                 :root {
                                    color-scheme: ${true ? 'light' : 'dark'}
                                }
                            `}
                        </style>
                        <RouterProvider router={ioc.routerService.router} />
                    </HelmetProvider>
                </App>
            </ConfigProvider>
        </React.Suspense>
    </React.StrictMode>,
)
