import { $u, type RequestOptions, initTheme } from './libs';
import type { UViewProOptions } from './types/global';
import { logger } from './libs/util/logger';

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
        if (options.theme) {
            $u.setColor?.(options.theme);
        }
        if (options.themes) {
            // 使用 useTheme 的 initTheme，它会智能处理重复初始化
            initTheme(options.themes);
        }
        // 设置调试模式
        logger
            .setDebugMode(options?.log?.debug ?? true)
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
