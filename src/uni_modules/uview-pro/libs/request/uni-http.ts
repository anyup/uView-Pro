/**
 * 通用 uni-app 网络请求，uni.request
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 * @author anyup
 */
import deepMerge from '../function/deepMerge';

// 请求内容类型枚举
export enum ContentType {
    JSON = 'application/json;charset=UTF-8',
    URLENCODED = 'application/x-www-form-urlencoded',
    FORMDATA = 'multipart/form-data'
}

// 请求方法类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE' | 'UPLOAD';

// 请求头类型
export type HttpHeaderType = Record<string, string>;

// 请求配置类型
export interface HttpRequestConfig {
    baseURL?: string;
    url?: string | Function;
    header?: HttpHeaderType;
    data?: unknown;
    method?: HttpMethod;
    dataType?: string;
    responseType?: string;
    success?: (res: unknown) => void;
    fail?: (err: unknown) => void;
    complete?: (res: unknown) => void;
    [key: string]: unknown;
}

// 拦截器类型
export interface Interceptor<T = unknown> {
    handler?: (arg: T, P: typeof Promise) => unknown;
    onerror?: (arg: T, P: typeof Promise) => unknown;
    complete?: (arg: T, P: typeof Promise) => unknown;
    use: (...args: any[]) => void;
    lock?: () => void;
    unlock?: () => void;
    clear?: () => void;
    p?: Promise<unknown> | null;
}

/**
 * HttpHeader 构造器，自动处理 Content-Type
 */
export class HttpHeader {
    [key: string]: string;
    constructor(params: HttpHeaderType) {
        Object.keys(params).forEach(key => {
            if (key === 'Content-Type') {
                this[key] = ContentType[params[key] as keyof typeof ContentType] || params[key];
            } else {
                this[key] = params[key];
            }
        });
    }
}

/**
 * Builder 用于批量生成 API 方法
 */
export class Builder {
    private http: Http;
    constructor(http: Http) {
        this.http = http;
    }
    /**
     * 根据 url 配置表批量生成 API 方法
     */
    dispatch(urls: Record<string, any>) {
        const obj: Record<string, any> = {};
        Object.keys(urls).forEach(name => {
            obj[name] = this.use.bind(this, urls[name]);
        });
        return obj;
    }
    /**
     * 发送请求
     */
    use<T = unknown>(urlConfig: Record<string, any>, data?: unknown, config: HttpRequestConfig = {}): Promise<T> {
        // 请求地址
        let url = config?.url ?? urlConfig.url;
        // 兼容 restful url，如果是使用url为function，则为restful格式
        if (config.url && typeof config.url === 'function') {
            url = `${urlConfig.url}${config.url()}`;
        }
        // 请求类型，get,post,put,delete
        const method = config?.method ?? urlConfig?.method ?? 'GET';
        const options = { ...deepMerge(urlConfig, config), url, method };
        return this.http.request<T>(options);
    }
}

/**
 * Http 主类，支持拦截器、链式配置、类型完善
 */
export class Http {
    static Builder = Builder;
    config: HttpRequestConfig;
    interceptors: {
        response: Interceptor;
        request: Interceptor;
    };

    constructor(options: HttpRequestConfig = {}) {
        this.config = {
            baseURL: '',
            header: new HttpHeader({ 'Content-Type': 'JSON' }),
            data: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success() {},
            fail() {},
            complete() {},
            ...options
        };
        this.interceptors = {
            response: {
                use(handler, onerror, complete) {
                    this.handler = handler;
                    this.onerror = onerror;
                    this.complete = complete;
                }
            },
            request: {
                use(handler) {
                    this.handler = handler;
                }
            }
        };
        wrap(this.interceptors.request);
        wrap(this.interceptors.response);
    }

    /**
     * 设置 baseURL
     */
    setBaseURL(baseURL: string) {
        this.config.baseURL = baseURL;
        return this;
    }

    /**
     * 设置 header
     */
    setHeader(header: HttpHeaderType) {
        this.config.header = { ...this.config.header, ...header };
        return this;
    }

    /**
     * 设置 data
     */
    setData(data: unknown) {
        if (isArray(data)) {
            this.config.data = data;
        } else if (isObject(data) && isObject(this.config.data)) {
            this.config.data = { ...(this.config.data as object), ...(data as object) };
        } else {
            this.config.data = data;
        }
        return this;
    }

    /**
     * 设置其他 options
     */
    setOptions(options: HttpRequestConfig) {
        this.config = { ...this.config, ...options };
    }

    /**
     * 请求主方法
     * @param options 实时传递的配置
     * @returns Promise
     * 说明：配置优先级 实时传递的 options > 公共配置的 config
     */
    request<T = unknown>(options: HttpRequestConfig = {}): Promise<T> {
        if (!options) options = {};
        // 请求体
        const data = options.data || {};
        // 请求baseURL：优先级为：实时传递的 > 公共配置的
        options.baseURL = options.baseURL !== undefined ? options.baseURL : this.config.baseURL;
        // 请求头：合并公共配置与实时设置的header， 且优先级实时设置会覆盖公共配置的
        options.header = { ...this.config.header, ...options.header };
        // 请求方式：优先级为：实时传递的 > 公共配置的
        options.method = options.method || this.config.method;
        // 数据格式：默认json
        options.dataType = options.dataType || this.config.dataType;
        // 请求体：优先级为：实时传递的 > 公共配置的
        if (isArray(data)) {
            options.data = data;
        } else if (isObject(data) && isObject(this.config.data)) {
            options.data = { ...(this.config.data as object), ...(data as object) };
        } else {
            options.data = data;
        }

        // 拦截器处理
        const interceptors = this.interceptors;
        const requestInterceptor = interceptors.request;
        const responseInterceptor = interceptors.response;
        const requestInterceptorHandler = requestInterceptor.handler;

        return new Promise((resolve: (value: T) => void, reject: (reason?: unknown) => void) => {
            function isPromise(p: unknown): p is Promise<unknown> {
                return !!p && typeof (p as any).then === 'function' && typeof (p as any).catch === 'function';
            }
            function enqueueIfLocked(promise: Promise<unknown> | null | undefined, callback: () => void) {
                if (promise) {
                    promise.then(() => {
                        callback();
                    });
                } else {
                    callback();
                }
            }
            function onresult(handler: ((arg: unknown, P: typeof Promise) => unknown) | undefined, response: unknown, type: number) {
                enqueueIfLocked(responseInterceptor.p, function () {
                    if (handler) {
                        (response as any).request = options;
                        const ret = handler.call(responseInterceptor, response, Promise);
                        response = ret === undefined ? response : ret;
                    }
                    if (!isPromise(response)) {
                        response = Promise[type === 0 ? 'resolve' : 'reject'](response);
                    }
                    (response as Promise<unknown>)
                        .then((d: unknown) => {
                            resolve((d as any).data as T);
                        })
                        .catch((e: unknown) => {
                            reject(e);
                        });
                });
            }
            (options as any).complete = (response: unknown) => {
                const statusCode: number = (response as any).statusCode;
                let type = 0;
                if ((statusCode >= 200 && statusCode < 300) || statusCode === 304) {
                    type = 0;
                    onresult(responseInterceptor.handler, response, type);
                } else {
                    type = -1;
                    onresult(responseInterceptor.onerror, response, type);
                }
                onresult(responseInterceptor.complete, response, type);
            };
            enqueueIfLocked(requestInterceptor.p, () => {
                options = Object.assign({}, this.config, options);
                (options as any).requestId = new Date().getTime();
                let ret: unknown = options;
                if (requestInterceptorHandler) {
                    ret = requestInterceptorHandler.call(requestInterceptor, options, Promise) || options;
                }
                if (!isPromise(ret)) {
                    ret = Promise.resolve(ret);
                }
                (ret as Promise<unknown>).then(
                    (d: unknown) => {
                        if (d === options) {
                            // 这里断言为 any，兼容 baseURL、restURL、url、method 等属性
                            const req = d as any;
                            req.url = req.url && req.url.indexOf('http') !== 0 ? req.baseURL + req.url : req.url;
                            req.url = req.restURL ? req.url + req.restURL : req.url;
                            req.method = req.method.toUpperCase();
                            if (req.method === 'UPLOAD') {
                                uni.uploadFile(req);
                            } else {
                                uni.request(req);
                            }
                        } else {
                            resolve(d as T);
                        }
                    },
                    (err: unknown) => {
                        reject(err);
                    }
                );
            });
        });
    }

    /**
     * 并发请求
     */
    all<T = unknown>(promises: Promise<T>[]): Promise<T[]> {
        return Promise.all(promises);
    }

    /**
     * GET 请求
     */
    get<T = unknown>(url: string, data?: unknown, option?: HttpRequestConfig): Promise<T> {
        return this.request<T>(merge({ url, data, method: 'GET' }, option));
    }
    /**
     * POST 请求
     */
    post<T = unknown>(url: string, data?: unknown, option?: HttpRequestConfig): Promise<T> {
        return this.request<T>(merge({ url, data, method: 'POST' }, option));
    }
    /**
     * PUT 请求
     */
    put<T = unknown>(url: string, data?: unknown, option?: HttpRequestConfig): Promise<T> {
        return this.request<T>(merge({ url, data, method: 'PUT' }, option));
    }
    /**
     * PATCH 请求
     */
    patch<T = unknown>(url: string, data?: unknown, option?: HttpRequestConfig): Promise<T> {
        return this.request<T>(merge({ url, data, method: 'PATCH' }, option));
    }
    /**
     * HEAD 请求
     */
    head<T = unknown>(url: string, data?: unknown, option?: HttpRequestConfig): Promise<T> {
        return this.request<T>(merge({ url, data, method: 'HEAD' }, option));
    }
    /**
     * DELETE 请求
     */
    delete<T = unknown>(url: string, data?: unknown, option?: HttpRequestConfig): Promise<T> {
        return this.request<T>(merge({ url, data, method: 'DELETE' }, option));
    }
    /**
     * UPLOAD 文件上传
     */
    upload<T = unknown>(url: string, data?: unknown, option?: HttpRequestConfig): Promise<T> {
        return this.request<T>(merge({ url, data, method: 'UPLOAD' }, option));
    }

    /**
     * 拦截器锁定
     */
    lock(): void {
        const fn = this.interceptors.request.lock;
        if (typeof fn === 'function') {
            fn.call(this.interceptors.request);
        }
    }
    /**
     * 拦截器解锁
     */
    unlock(): void {
        const fn = this.interceptors.request.unlock;
        if (typeof fn === 'function') {
            fn.call(this.interceptors.request);
        }
    }
    /**
     * 拦截器清空
     */
    clear(): void {
        const fn = this.interceptors.request.clear;
        if (typeof fn === 'function') {
            fn.call(this.interceptors.request);
        }
    }
}

// 数据合并
function merge(a: any, b: any): any {
    for (const key in b) {
        if (!a.hasOwnProperty(key)) {
            a[key] = b[key];
        } else if (isObject(b[key], 1) && isObject(a[key], 1)) {
            merge(a[key], b[key]);
        }
    }
    return a;
}

function isObject(ob: any, real?: number): boolean {
    if (real) {
        return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase() === 'object';
    } else {
        return ob && typeof ob === 'object';
    }
}

function isArray(value: any): value is any[] {
    return Array.isArray(value);
}

function wrap(interceptor: Interceptor) {
    let resolve: ((value?: unknown) => void) | null;
    let reject: ((reason?: any) => void) | null;
    function _clear() {
        interceptor.p = resolve = reject = null;
    }
    merge(interceptor, {
        lock() {
            if (!resolve) {
                interceptor.p = new Promise((_resolve, _reject) => {
                    resolve = _resolve;
                    reject = _reject;
                });
            }
        },
        unlock() {
            if (resolve) {
                resolve();
                _clear();
            }
        },
        clear() {
            if (reject) {
                reject('cancel');
                _clear();
            }
        }
    });
}

/**
 * useHttp hooks 工厂函数，推荐唯一入口
 * @param options 可选的全局配置
 * @returns http 实例（包含 get/post/put/delete 等方法和拦截器）
 */
export function useHttp(options: HttpRequestConfig = {}) {
    const http = new Http(options);
    return http;
}

// 只导出 useHttp，不再导出 Http 类实例化方式
export default useHttp;
