import { createSSRApp } from 'vue';
import App from './App.vue';

import uViewPro, { httpPlugin } from '@/uni_modules/uview-pro';
import { httpInterceptor, httpRequestConfig } from './common/http.interceptor';
import i18n from '@/locales';

export function createApp() {
    const app = createSSRApp(App);
    app.use(i18n);
    // 引入uView Pro 主库
    app.use(uViewPro, { color: { primary: '#2979ff' } });
    // 引入uView Pro 的http插件
    app.use(httpPlugin, { interceptor: httpInterceptor, requestConfig: httpRequestConfig });
    return {
        app
    };
}
