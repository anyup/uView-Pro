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
    if (options) {
        // 配置主题：统一使用 useTheme 的 initTheme 初始化，避免重复初始化
        if (options.themes) {
            // 使用 useTheme 的 initTheme，它会智能处理重复初始化
            initTheme(options.themes);
        } else if (options.theme) {
            // 兼容之前只有一套样式的情况,需要覆盖默认主题
            // 获取默认主题（uviewpro）
            const defaultTheme = defaultThemes[0];
            if (defaultTheme) {
                // 创建新主题对象，用用户的 theme 覆盖默认主题的 color
                const mergedTheme: Theme = {
                    ...defaultTheme,
                    color: {
                        ...defaultTheme.color,
                        ...options.theme
                    }
                };
                // 初始化主题（只包含覆盖后的默认主题）
                initTheme([mergedTheme], defaultTheme.name);
            }
        }
        // 设置调试模式
        logger
            .setDebugMode(options?.log?.debug ?? false)
            .setPrefix(options?.log?.prefix)
            .setShowCallerInfo(options?.log?.showCallerInfo ?? true);
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
