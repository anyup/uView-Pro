import { $u, type RequestOptions } from './libs';
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
    uni.$u = $u;
    if (options) {
        // 配置主题
        if (options.theme) {
            $u.color = $u.deepMerge($u.color, options.theme);
        }
        // 设置调试模式
        logger
            .setDebugMode(options?.log?.debug ?? true)
            .setPrefix(options?.log?.prefix)
            .setShowCallerInfo(options?.log?.showCallerInfo ?? true);
    }
    // 可扩展更多配置项
    app.config.globalProperties.$u = $u;
};

export default {
    install
};

export * from './libs';

export type { UViewProOptions };
