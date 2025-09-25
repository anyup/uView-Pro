import { $u, type RequestOptions } from './libs';
import type { UViewProOptions } from './types/global';

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
    if (options && options.theme) {
        $u.color = $u.deepMerge($u.color, options.theme);
    }
    // 可扩展更多配置项
    app.config.globalProperties.$u = $u;
};

export default {
    install
};

export * from './libs';

export type { UViewProOptions };
