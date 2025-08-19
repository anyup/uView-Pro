import deepMerge from '../function/deepMerge';

export function isFunction(f: any): boolean {
    return typeof f === 'function';
}

export function isPromise(p: any): boolean {
    return !!(p && p.then && p.catch);
}

export function isArray(arr: any) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

/**
 * 构建基础类
 */
class Builder<T> {
    instance: any;

    constructor(instance: any) {
        this.instance = instance;
    }
    /**
     *
     * @param urlConfig url 配置表
     * @param extra 其他请求方法对象
     * @returns Object
     */
    dispatch(urlConfig: Record<string, any>, extra: Record<string, any> = {}): Record<string, any> {
        const builder: Record<string, any> = {};
        // 创建 API
        Object.keys(urlConfig).forEach(name => {
            builder[name] = this.use.bind(this, urlConfig[name]);
        });
        return { ...builder, ...extra };
    }
    /**
     * 发送请求
     * @param {*} urlConfig : url 配置表
     * @demo urlConfig = { login: { url: '/user/login', method: 'GET', loading: true } }
     * @param {*} config : 开放配置，用户主动配置的
     * @demo api.login({ params: { username: "admin" } })
     * @returns Promise
     */
    use(urlConfig: Record<string, any>, config: Record<string, any> = {}): Promise<T> {
        // 请求地址
        let url = config?.url ?? urlConfig.url;
        // 兼容 restful url，如果是使用url为function，则为restful格式
        if (config.url && isFunction(config.url)) {
            url = `${urlConfig.url}${config.url()}`;
        }
        // 请求类型，get,post,put,delete
        const method = config?.method ?? urlConfig?.method ?? 'GET';
        // 如果有自定义的工厂函数基础类
        const options = { ...deepMerge(urlConfig, config), url, method };
        if (isFunction(this.instance) || isPromise(this.instance)) {
            return this.instance(options);
        }
        // 如果是使用的 instance
        // 默认的请求基础类
        return this.instance.request(options);
    }
}

/**
 * Http 基础类
 */
class AutoHttp {
    static get Builder() {
        return Builder;
    }
    constructor() {}
}

export { AutoHttp };
