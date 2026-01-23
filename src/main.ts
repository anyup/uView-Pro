import { createSSRApp } from 'vue';
import App from './App.vue';
import themes from '@/uview-pro.theme';
import uViewPro, { httpPlugin } from '@/uni_modules/uview-pro';
import { httpInterceptor, httpRequestConfig } from './common/http.interceptor';
import i18n from '@/locales';
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
            defaultTheme: 'green',
            defaultDarkMode: 'auto'
        },
        locale: {
            // 部分覆盖内置语言包
            locales: [
                { name: 'zh-CN', uModal: { confirmText: '好的', cancelText: '算了' } },
                { name: 'en-US', uModal: { confirmText: 'OK', cancelText: 'Cancel' } }
            ],
            defaultLocale: 'zh-CN'
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
