import { createSSRApp } from 'vue';
import App from './App.vue';
import themes from '@/uview-pro.theme';
import uViewPro, { httpPlugin } from '@/uni_modules/uview-pro';
import { httpInterceptor, httpRequestConfig } from './common/http.interceptor';
import i18n, { getDefaultLocale } from '@/locales';
// #ifdef MP
import share from './common/share';
// #endif
export function createApp() {
    const app = createSSRApp(App);
    app.use(i18n);
    // 引入uView Pro 主库
    app.use(uViewPro, {
        theme: {
            themes: themes,
            defaultTheme: 'purple',
            defaultDarkMode: 'auto'
        },
        locale: {
            locales: [{ name: 'en-US', actionSheet: { cancelText: 'Close' } }],
            defaultLocale: getDefaultLocale()
        }
    });
    // 引入uView Pro 的http插件
    app.use(httpPlugin, { interceptor: httpInterceptor, requestConfig: httpRequestConfig });
    // #ifdef MP
    app.mixin(share);
    // #endif
    return {
        app
    };
}
