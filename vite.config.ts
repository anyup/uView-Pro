import { defineConfig } from 'vite';
import Uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
import UniKuRoot from '@uni-ku/root';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [UniKuRoot(), Uni()],
    resolve: {
        alias: {
            '@': path.join(process.cwd(), './src'),
            'uview-pro': path.join(process.cwd(), './src/uni_modules/uview-pro')
        }
    },
    define: {
        __VUE_I18N_FULL_INSTALL__: true,
        __VUE_I18N_LEGACY_API__: false,
        __INTLIFY_PROD_DEVTOOLS__: false,
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false
    },
    esbuild: {
        target: 'es2015'
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
