/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(config => {
    const env = loadEnv(config.mode, process.cwd(), '')
    return {
        define: {
            __APP_ENV__: env.APP_ENV
        },
        plugins: [react()],
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
                '*': resolve('')
            }
        },
        server: {
            host: '0.0.0.0',
            port: 8080,
            open: true,
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    target: env.VITE_SERVE,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                }
            }
        }
    }
})
