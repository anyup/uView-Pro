/**
 * 路由跳转 hooks，基于 route.ts 的 Router 类实现
 * 提供 Vue Composition API 风格的路由跳转方法
 */

import { ref } from 'vue';

interface RouterConfig {
    type?: string;
    url?: string;
    delta?: number;
    params?: Record<string, any>;
    animationType?: string;
    animationDuration?: number;
    intercept?: boolean;
}

declare const uni: any;

const config: RouterConfig = {
    type: 'navigateTo',
    url: '',
    delta: 1,
    params: {},
    animationType: 'pop-in',
    animationDuration: 300,
    intercept: false
};

// 响应式配置，支持动态修改
const configRef = ref({ ...config });

/**
 * 判断 url 前面是否有 "/"，如果没有则加上
 */
const addRootPath = (url: string): string => {
    return url[0] === '/' ? url : `/${url}`;
};

/**
 * 整合路由参数
 */
const mixinParam = (url: string, params: Record<string, any>): string => {
    url = url && addRootPath(url);
    let query = '';
    if (/.*\/.*\?.*=.*/.test(url)) {
        query = uni.$u.queryParams(params, false);
        return url + '&' + query;
    } else {
        query = uni.$u.queryParams(params);
        return url + query;
    }
};

/**
 * 执行路由跳转
 */
const openPage = (cfg: RouterConfig): void => {
    const { url = '', type = '', delta = 1, animationDuration = 300 } = cfg;
    if (type === 'navigateTo' || type === 'to') {
        uni.navigateTo({ url, animationDuration });
    }
    if (type === 'redirectTo' || type === 'redirect') {
        uni.redirectTo({ url });
    }
    if (type === 'switchTab' || type === 'tab') {
        uni.switchTab({ url });
    }
    if (type === 'reLaunch' || type === 'launch') {
        uni.reLaunch({ url });
    }
    if (type === 'navigateBack' || type === 'back') {
        uni.navigateBack({ delta });
    }
};

/**
 * 路由跳转主方法
 */
const route = async (options: string | RouterConfig = {}, params: Record<string, any> = {}): Promise<void> => {
    let mergeConfig: RouterConfig = {};

    if (typeof options === 'string') {
        mergeConfig.url = mixinParam(options, params);
        mergeConfig.type = 'navigateTo';
    } else {
        mergeConfig = uni.$u.deepMerge(configRef.value, options);
        mergeConfig.url = mixinParam(options.url || '', options.params || {});
    }

    if (params.intercept !== undefined) {
        configRef.value.intercept = params.intercept;
    }

    mergeConfig.params = params;
    mergeConfig = uni.$u.deepMerge(configRef.value, mergeConfig);

    if (uni.$u.routeIntercept && typeof uni.$u.routeIntercept === 'function') {
        const isNext = await new Promise<boolean>(resolve => {
            uni.$u.routeIntercept(mergeConfig, resolve);
        });
        isNext && openPage(mergeConfig);
    } else {
        openPage(mergeConfig);
    }
};

/**
 * 跳转到指定页面
 */
const to = (url: string, params?: Record<string, any>): Promise<void> => {
    return route({ url, type: 'navigateTo' }, params || {});
};

/**
 * 关闭当前页面，跳转到指定页面
 */
const redirect = (url: string, params?: Record<string, any>): Promise<void> => {
    return route({ url, type: 'redirectTo' }, params || {});
};

/**
 * 跳转到 tabBar 页面
 */
const tab = (url: string, params?: Record<string, any>): Promise<void> => {
    return route({ url, type: 'switchTab' }, params || {});
};

/**
 * 关闭所有页面，跳转到指定页面
 */
const reLaunch = (url: string, params?: Record<string, any>): Promise<void> => {
    return route({ url, type: 'reLaunch' }, params || {});
};

/**
 * 返回上一页
 */
const back = (delta: number = 1): Promise<void> => {
    return route({ type: 'navigateBack', delta });
};

/**
 * 设置默认路由配置
 */
const setConfig = (newConfig: Partial<RouterConfig>): void => {
    configRef.value = uni.$u.deepMerge(configRef.value, newConfig);
};

/**
 * 获取当前路由配置
 */
const getConfig = (): RouterConfig => {
    return { ...configRef.value };
};

export function useRouter() {
    return {
        // 核心跳转方法
        route,
        // 便捷方法
        to,
        redirect,
        tab,
        reLaunch,
        back,
        // 配置方法
        setConfig,
        getConfig
    };
}

export default useRouter;
