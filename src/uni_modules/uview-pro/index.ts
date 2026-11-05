import { $u, type RequestOptions, initTheme, configProvider, resolveThemeOption } from './libs';
import type { UViewProOptions } from './types/global';
import { setConfig } from './libs/config/config';

declare const uni: {
    [key: string]: any;
    $u?: typeof $u;
    createSelectorQuery: () => any;
    hideLoading: () => void;
    showLoading: (options: any) => void;
    request: (options: RequestOptions) => any;
};

// $u挂载到uni对象上
const install = (app: any, options?: UViewProOptions): void => {
    try {
        // 提前设置调试模式，保证初始化过程中的告警能按配置输出
        setConfig({
            debugMode: options?.debugMode ?? false
        });
        if (options) {
            // 配置主题：统一归一化后走同一个初始化入口
            if (options?.theme) {
                // 支持三种形态：Theme[]、{ themes, defaultTheme, defaultDarkMode, isForce, css?, darkCss? }、扁平单主题
                const { themes, defaultConfig, isForce, globalCss } = resolveThemeOption(options.theme);
                if (themes) {
                    // 空数组也继续传递：由 configProvider 统一回退并输出提示，同时保留 defaultConfig / isForce / globalCss
                    initTheme(themes, defaultConfig, isForce, globalCss);
                } else {
                    initTheme();
                }
            } else {
                // 默认初始化系统主题
                initTheme();
            }
            // 初始化国际化（如果提供 options.locale 或使用内置语言包）
            try {
                // options.locale 可以是 string（默认语言名） | any[]（locale 列表） | { locales: any[], defaultLocale?: string }
                if (options?.locale) {
                    const optLocale: any = options.locale as any;
                    if (typeof optLocale === 'string') {
                        configProvider.initLocales(undefined, optLocale);
                    } else if (Array.isArray(optLocale)) {
                        configProvider.initLocales(optLocale);
                    } else if (optLocale && typeof optLocale === 'object') {
                        configProvider.initLocales(optLocale.locales, optLocale.defaultLocale, optLocale.isForce);
                    } else {
                        configProvider.initLocales();
                    }
                } else {
                    // 无 locale 配置，仍然初始化内置语言包以保证可用
                    configProvider.initLocales();
                }
            } catch (e) {
                console.error('[install locales] Error:', e);
            }
        } else {
            // 默认初始化系统主题
            initTheme();
            // 默认初始化内置语言包以保证可用
            configProvider.initLocales();
        }
    } catch (error) {
        console.error('[install options] Error:', error);
    }
    uni.$u = $u;
    // 可扩展更多配置项
    app.config.globalProperties.$u = $u;
};

export default {
    install
};

export * from './libs';

export type { UViewProOptions };
