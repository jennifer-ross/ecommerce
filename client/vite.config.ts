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
    root: '.',
    plugins: [
        tsconfigPaths({
            root: '.',
        }),
        babel({
            babelConfig: {
                plugins: ['babel-plugin-styless'],
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
        react(),
        reactRefresh(),
        manifestSRI(),
    ],
})
