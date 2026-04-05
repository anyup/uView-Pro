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
            themes: themes, // 主题对象数组，至少需要包含一个主题对象，且每个对象必须包含 name 和 color 字段
            defaultTheme: 'green', // 默认主题名称，需与 themes 中的 name 字段对应
            defaultDarkMode: 'auto', // 默认暗黑模式跟随系统，支持 'auto' | 'light' | 'dark'
            isForce: false // 是否初始化强制使用默认主题，如果为true，则会覆盖用户之前选择的主题；如果为false，则会优先使用用户之前选择的主题
        },
        locale: {
            // 部分覆盖内置语言包
            locales: [
                { name: 'zh-CN', uModal: { confirmText: '好的', cancelText: '算了' } },
                { name: 'en-US', uModal: { confirmText: 'OK', cancelText: 'Cancel' } }
            ],
            defaultLocale: 'zh-CN' // 默认语言环境，需与 locales 中的 name 字段对应
        },
        debugMode: false // 是否开启日志和警告
    });
    // 引入uView Pro 的http插件
    app.use(httpPlugin, { interceptor: httpInterceptor, requestConfig: httpRequestConfig });
    // #ifdef MP
    // @ts-ignore
    app.mixin(share);
    // #endif
    return {
        app
    };
}
