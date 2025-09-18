import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni()],
    resolve: {
        alias: {
            '@': path.join(process.cwd(), './src'),
            'uview-pro': path.join(process.cwd(), './src/uni_modules/uview-pro')
        }
    },
    server: {
        port: 5173,
        fs: {
            // Allow serving files from one level up to the project root
            allow: ['..']
        }
    }
});
