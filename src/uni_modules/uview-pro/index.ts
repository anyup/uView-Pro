import { $u, type RequestOptions, initTheme, configProvider } from './libs';
import type { UViewProOptions, Theme } from './types/global';
import { logger } from './libs/util/logger';
import { defaultThemes } from './libs/config/theme-tokens';

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
        if (options) {
            // 配置主题：统一使用 useTheme 的 initTheme 初始化，避免重复初始化
            if (options?.theme) {
                const optTheme = options.theme as any;
                // 1.如果是数组，则为多主题配置
                if (Array.isArray(optTheme)) {
                    initTheme(optTheme);
                } else if (typeof optTheme === 'object' && optTheme.themes) {
                    // 2.如果为对象且有themes，则为多主题配置+设置默认主题
                    initTheme(optTheme.themes, {
                        defaultTheme: optTheme.defaultTheme,
                        defaultDarkMode: optTheme.defaultDarkMode
                    });
                } else {
                    // 3.兼容之前只有一套样式的情况,需要覆盖默认主题，默认系统主题（uviewpro）
                    const defaultTheme = defaultThemes[0];
                    if (defaultTheme) {
                        // 创建新主题对象，用用户的 theme 覆盖默认主题的 color
                        const mergedTheme: Theme = {
                            ...defaultTheme,
                            color: {
                                ...defaultTheme.color,
                                ...optTheme
                            }
                        };
                        // 初始化主题（只包含覆盖后的默认主题）
                        initTheme([mergedTheme], defaultTheme.name);
                    }
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
                        configProvider.initLocales(optLocale.locales, optLocale.defaultLocale);
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
            // 设置调试模式
            logger
                .setDebugMode(options?.log?.debug ?? false)
                .setPrefix(options?.log?.prefix)
                .setShowCallerInfo(options?.log?.showCallerInfo ?? true);
        } else {
            // 默认初始化系统主题
            initTheme();
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
