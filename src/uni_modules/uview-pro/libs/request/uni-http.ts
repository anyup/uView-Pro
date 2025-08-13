/**
 * 通用 uni-app 网络请求，uni.request
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 * @author anyup
 */

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
    url?: string;
    header?: HttpHeaderType;
    data?: any;
    method?: HttpMethod;
    dataType?: string;
    responseType?: string;
    success?: (res: any) => void;
    fail?: (err: any) => void;
    complete?: (res: any) => void;
    [key: string]: any;
}

// 拦截器类型
export interface Interceptor<T = any> {
    handler?: (arg: T, P: typeof Promise) => any;
    onerror?: (arg: T, P: typeof Promise) => any;
    complete?: (arg: T, P: typeof Promise) => any;
    use: (...args: any[]) => void;
    lock?: () => void;
    unlock?: () => void;
    clear?: () => void;
    p?: Promise<any> | null;
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
    use(urlConfig: Record<string, any>, data?: any, config: HttpRequestConfig = {}) {
        let url: string = config.url || urlConfig.url;
        const append: string = config.append || '';
        url = url + append;
        const defaultFn = (res: any) => res;
        const successFn: (res: any) => any = config.success || defaultFn;
        // 只传递一个参数，避免类型不符
        const callbackFn = (res: any) => successFn(res);
        return this.http.request({ url, data, ...urlConfig, ...config }).then(callbackFn);
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
    setData(data: any) {
        if (isArray(data)) {
            this.config.data = data;
        } else {
            this.config.data = { ...this.config.data, ...data };
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
    request<T = any>(options: HttpRequestConfig = {}): Promise<T> {
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
        } else {
            options.data = { ...this.config.data, ...data };
        }

        // 拦截器处理
        const interceptors = this.interceptors;
        const requestInterceptor = interceptors.request;
        const responseInterceptor = interceptors.response;
        const requestInterceptorHandler = requestInterceptor.handler;

        return new Promise((resolve: (value: T) => void, reject: (reason?: any) => void) => {
            function isPromise(p: any): p is Promise<any> {
                return p && typeof p.then === 'function' && typeof p.catch === 'function';
            }
            function enqueueIfLocked(promise: Promise<any> | null | undefined, callback: () => void) {
                if (promise) {
                    promise.then(() => {
                        callback();
                    });
                } else {
                    callback();
                }
            }
            function onresult(
                handler: ((arg: any, P: typeof Promise) => any) | undefined,
                response: any,
                type: number
            ) {
                enqueueIfLocked(responseInterceptor.p, function () {
                    if (handler) {
                        response.request = options;
                        const ret = handler.call(responseInterceptor, response, Promise);
                        response = ret === undefined ? response : ret;
                    }
                    if (!isPromise(response)) {
                        response = Promise[type === 0 ? 'resolve' : 'reject'](response);
                    }
                    response
                        .then((d: any) => {
                            resolve(d.data);
                        })
                        .catch((e: any) => {
                            reject(e);
                        });
                });
            }
            options.complete = (response: any) => {
                const statusCode: number = response.statusCode;
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
                options.requestId = new Date().getTime();
                let ret: any = options;
                if (requestInterceptorHandler) {
                    ret = requestInterceptorHandler.call(requestInterceptor, options, Promise) || options;
                }
                if (!isPromise(ret)) {
                    ret = Promise.resolve(ret);
                }
                ret.then(
                    (d: any) => {
                        if (d === options) {
                            d.url = d.url && d.url.indexOf('http') !== 0 ? d.baseURL + d.url : d.url;
                            d.url = d.restURL ? d.url + d.restURL : d.url;
                            d.method = d.method.toUpperCase();
                            d.method === 'UPLOAD' ? uni.uploadFile(d) : uni.request(d);
                        } else {
                            resolve(d);
                        }
                    },
                    (err: any) => {
                        reject(err);
                    }
                );
            });
        });
    }

    /**
     * 并发请求
     */
    all<T = any>(promises: Promise<T>[]): Promise<T[]> {
        return Promise.all(promises);
    }

    // 动态方法扩展：get/post/put/patch/head/delete/upload
    [key: string]: any;
}

['get', 'post', 'put', 'patch', 'head', 'delete', 'upload'].forEach(e => {
    Http.prototype[e] = function (url: string, data?: any, option?: HttpRequestConfig) {
        return this.request(merge({ url, data, method: e.toUpperCase() }, option));
    };
});

['lock', 'unlock', 'clear'].forEach(e => {
    Http.prototype[e] = function () {
        const fn = this.interceptors.request[e as keyof Interceptor];
        if (typeof fn === 'function') {
            // 只传递 this 作为上下文，不传参数，适配所有类型
            (fn as () => void).call(this.interceptors.request);
        }
    };
});

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
