import { createSSRApp } from 'vue';
import App from './App.vue';

import colorfulUniPlus from '@/uni_modules/colorful-uni-plus';

import i18n from '@/locales';

export function createApp() {
    const app = createSSRApp(App);
    app.use(i18n);
    app.use(colorfulUniPlus);
    return {
        app
    };
}
