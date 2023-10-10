import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
// import react from '@vitejs/plugin-react-swc'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import manifestSRI from 'vite-plugin-manifest-sri'
import babel from 'vite-plugin-babel'
import { extname } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    esbuild: {
        tsconfigRaw: {
            compilerOptions: {
                experimentalDecorators: true,
            },
        },
    },
    root: '.',
    plugins: [
        tsconfigPaths({
            root: '.',
        }),
        babel({
            babelConfig: {
                compact: false,
                plugins: [
                    'babel-plugin-styless',
                    // [
                    //     '@babel/plugin-proposal-decorators',
                    //     { loose: true, version: '2022-03' },
                    // ],
                    // '@babel/plugin-syntax-decorators',
                    // 'decorators-legacy',
                ],
            },
            loader: (path) => {
                if (extname(path) === '.jsx') {
                    return 'jsx'
                }

                if (extname(path) === '.tsx') {
                    return 'jsx'
                }
            },
        }),
        react({
            babel: {
                compact: false,
                parserOpts: {
                    compact: false,
                    plugins: [
                        'decorators-legacy',
                        // [
                        //     '@babel/plugin-proposal-decorators',
                        //     { loose: true, version: '2022-03' },
                        // ],
                        // '@babel/plugin-syntax-decorators',
                    ],
                },
            },
        }),
        reactRefresh(),
        manifestSRI(),
    ],
})
