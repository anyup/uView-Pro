import { defineConfig } from 'vite';
import Uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
import { UniRoot } from './src/uni_modules/uview-pro/plugins';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [UniRoot(), Uni()],
    resolve: {
        alias: {
            '@': path.join(process.cwd(), './src'),
            'uview-pro': path.join(process.cwd(), './src/uni_modules/uview-pro'),
            'uview-pro/': path.join(process.cwd(), './src/uni_modules/uview-pro/')
        }
    },
    optimizeDeps: {
        exclude: ['vue-i18n']
    },
    server: {
        port: 5173,
        fs: {
            // Allow serving files from one level up to the project root
            allow: ['..']
        }
    }
});
