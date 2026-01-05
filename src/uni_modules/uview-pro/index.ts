import { $u, type RequestOptions, initTheme } from './libs';
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
                // 如果是数组，则为多主题配置
                if (Array.isArray(optTheme)) {
                    initTheme(optTheme);
                } else if (typeof optTheme === 'object' && optTheme.themes) {
                    // 多主题配置+设置默认主题
                    const defaultThemeName = optTheme.default || defaultThemes[0].name;
                    initTheme(optTheme.themes, defaultThemeName);
                } else {
                    // 兼容之前只有一套样式的情况,需要覆盖默认主题，默认系统主题（uviewpro）
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
