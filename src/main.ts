import { createSSRApp } from 'vue';
import App from './App.vue';

import uViewPro from '@/uni_modules/uview-pro';

import i18n from '@/locales';

export function createApp() {
    const app = createSSRApp(App);
    app.use(i18n);
    app.use(uViewPro);
    return {
        app
    };
}
