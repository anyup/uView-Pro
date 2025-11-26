import { createSSRApp } from 'vue';
import App from './App.vue';
import { theme, themes } from '@/uview-pro.theme';
import uViewPro, { httpPlugin } from '@/uni_modules/uview-pro';
import { httpInterceptor, httpRequestConfig } from './common/http.interceptor';
import i18n from '@/locales';

export function createApp() {
    const app = createSSRApp(App);
    app.use(i18n);
    // 引入uView Pro 主库
    // app.use(uViewPro, { theme, themes, log: { debug: false, prefix: '[uViewPro]', showCallerInfo: true } });
    app.use(uViewPro, { themes });
    // 引入uView Pro 的http插件
    app.use(httpPlugin, { interceptor: httpInterceptor, requestConfig: httpRequestConfig });
    return {
        app
    };
}
