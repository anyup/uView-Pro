import { deepMerge } from 'uview-pro';

/**
 * 请求配置项Meta类型定义
 */
export interface RequestMeta {
    toast?: boolean;
    loading?: boolean;
    originalData?: boolean;
    [key: string]: any;
}

/**
 * 请求配置项类型定义
 */
export interface RequestConfig {
    baseUrl?: string;
    header?: Record<string, any>;
    method?: string;
    dataType?: string;
    responseType?: string;
    timeout?: number;
    meta?: RequestMeta;
    [key: string]: any;
}

/**
 * 忽略的请求参数类型定义
 */
const IGNORE_REQUEST_KEYS = ['baseUrl', 'meta'];

/**
 * 请求拦截器类型定义
 */
export interface RequestInterceptor {
    request?: ((options: RequestOptions) => RequestOptions | false) | null;
    response?: ((response: any) => any | false) | null;
}

/**
 * 请求参数类型定义
 */
export interface RequestOptions {
    url: string;
    header: Record<string, any>;
    method: 'GET' | 'POST' | 'OPTIONS' | 'HEAD' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
    data?: any;
    dataType?: string;
    responseType?: string;
    params?: Record<string, any>;
    complete?: (response: any) => void;
    meta?: RequestMeta;
    [key: string]: any;
}

export class Request {
    public config: RequestConfig;
    public interceptor: RequestInterceptor;
    public options?: RequestOptions;
    // per-request storage to avoid concurrent overwrites of instance-level `options`
    private _requestMap: Map<number, RequestOptions> = new Map();
    private _taskMap: Map<number, any> = new Map(); // store uni.request task for abort
    private _rejectMap: Map<number, (reason?: any) => void> = new Map();
    private _reqId = 0;

    constructor() {
        this.config = {
            baseUrl: '', // 请求的根域名
            header: {}, // 默认的请求头
            method: 'POST', // 请求方式
            dataType: 'json', // 设置为json，返回后uni.request会对数据进行一次JSON.parse
            responseType: 'text', // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
            timeout: 60000,
            meta: {
                originalData: true, // 是否在拦截器中返回服务端的原始数据，见文档说明
                toast: false, // 是否在请求出错时，弹出toast
                loading: false // 是否显示加载中
            }
        };
        this.interceptor = {
            request: null,
            response: null
        };
    }
    /**
     * 返回当前未完成请求的快照（用于调试）
     * 返回数组，元素为 { id, options } 的浅拷贝，不会暴露内部 Map 引用
     */
    public getPendingRequestOptions(): Array<{ id: number; options: RequestOptions }> {
        const result: Array<{ id: number; options: RequestOptions }> = [];
        for (const [id, opts] of this._requestMap.entries()) {
            result.push({ id, options: { ...opts } });
        }
        return result;
    }
    /**
     * 按 id 取消请求（如果还在 pending）
     * 返回取消结果和是否已发送（sent）
     */
    public cancelRequestById(id: number): { cancelled: boolean; sent: boolean } {
        const task = this._taskMap.get(id);
        const reject = this._rejectMap.get(id);
        let cancelled = false;
        let sent = false;
        try {
            if (task) {
                sent = true;
                if (typeof task.abort === 'function') {
                    task.abort();
                    cancelled = true;
                }
            }
        } catch (e) {
            // ignore abort errors but still attempt reject/cleanup
        }
        if (reject) {
            try {
                reject(new Error('Request cancelled by id'));
            } catch (e) {
                // swallow
            }
            cancelled = true;
        }
        // cleanup maps
        this._taskMap.delete(id);
        this._rejectMap.delete(id);
        this._requestMap.delete(id);
        return { cancelled, sent };
    }

    /**
     * 取消所有未完成的请求，返回每个请求的取消结果
     */
    public cancelAllPendingRequests(): Array<{ id: number; cancelled: boolean; sent: boolean }> {
        const results: Array<{ id: number; cancelled: boolean; sent: boolean }> = [];
        const ids = Array.from(this._requestMap.keys());
        for (const id of ids) {
            const res = this.cancelRequestById(id);
            results.push({ id, cancelled: res.cancelled, sent: res.sent });
        }
        return results;
    }

    /**
     * 根据 URL 或正则取消匹配的未完成请求
     * @param urlOrRegex 字符串或 RegExp，字符串支持精确匹配或作为子串匹配
     * @returns 每个被尝试取消请求的结果数组
     */
    public cancelRequestsByUrl(
        urlOrRegex: string | RegExp
    ): Array<{ id: number; url: string; cancelled: boolean; sent: boolean }> {
        const results: Array<{ id: number; url: string; cancelled: boolean; sent: boolean }> = [];
        const matcher =
            typeof urlOrRegex === 'string'
                ? (u: string) => u === urlOrRegex || u.endsWith(urlOrRegex) || u.indexOf(urlOrRegex) !== -1
                : (u: string) => (urlOrRegex as RegExp).test(u);
        for (const [id, opts] of this._requestMap.entries()) {
            const u = opts?.url || '';
            try {
                if (matcher(u)) {
                    const res = this.cancelRequestById(id);
                    results.push({ id, url: u, cancelled: res.cancelled, sent: res.sent });
                }
            } catch (e) {
                results.push({ id, url: u, cancelled: false, sent: Boolean(this._taskMap.get(id)) });
            }
        }
        return results;
    }
    /**
     * 将全局配置合并到本次请求的 options 中
     * - 忽略 IGNORE_REQUEST_KEYS 中的字段（如 meta）
     * - 对 header 使用深合并（全局 header 为默认，options.header 优先）
     * - 对对象类型的字段尝试深合并，基础类型以 options 值优先
     * - 处理 baseUrl：若存在全局 baseUrl 且 options.url 非完整 url（非 http 开头），则合并成完整 URL
     */
    private mergeGlobalConfigToOptions(options: RequestOptions): RequestOptions {
        const mergedOptions: RequestOptions = { ...options };
        for (const key of Object.keys(this.config)) {
            if (IGNORE_REQUEST_KEYS.includes(key)) {
                continue;
            }
            const cfgVal = this.config[key];
            const optVal = options[key];

            // 跳过未设置的全局配置
            if (cfgVal === undefined) continue;

            // header 需要做深合并，且以 options.header 为准覆盖同名属性
            if (key === 'header') {
                mergedOptions.header = deepMerge(cfgVal || {}, optVal || {});
                continue;
            }

            // 针对 method 等枚举字符串，优先使用 options 中的值，否则使用全局配置
            if (typeof cfgVal === 'string' || typeof cfgVal === 'number' || typeof cfgVal === 'boolean') {
                mergedOptions[key] = optVal !== undefined ? optVal : cfgVal;
                continue;
            }

            // 对对象类型的配置（如自定义扩展）尝试做深合并
            if (typeof cfgVal === 'object' && !Array.isArray(cfgVal)) {
                mergedOptions[key] = deepMerge(cfgVal || {}, optVal || {});
                continue;
            }

            // 其他类型，若 options 未传入则使用全局配置
            if (optVal === undefined) {
                mergedOptions[key] = cfgVal;
            }
        }
        // 如果存在 baseUrl，并且 options.url 为相对地址，则拼接成完整 url
        const baseUrl = this.config.baseUrl;
        if (
            baseUrl &&
            mergedOptions.url &&
            typeof mergedOptions.url === 'string' &&
            mergedOptions.url.indexOf('http') !== 0
        ) {
            mergedOptions.url =
                baseUrl + (mergedOptions.url.indexOf('/') === 0 ? mergedOptions.url : `/${mergedOptions.url}`);
        }
        // 确保 url 存在，且为 string
        if (!mergedOptions.url) {
            mergedOptions.url = '';
        }
        return mergedOptions;
    }
    /**
     * 验证并规范化 RequestOptions，返回规范化后的对象
     * - 确保 url 为 string
     * - 确保 method 为大写且在允许集合内；否则使用全局默认 method
     * - 确保 header 为对象
     */
    private validateOptions(options: RequestOptions): RequestOptions {
        const normalized: RequestOptions = { ...options };
        // url
        normalized.url = normalized.url == null ? '' : String(normalized.url);

        // header
        if (!normalized.header || typeof normalized.header !== 'object' || Array.isArray(normalized.header)) {
            normalized.header = {};
        }

        // method
        const allowedMethods = new Set(['GET', 'POST', 'OPTIONS', 'HEAD', 'PUT', 'DELETE', 'TRACE', 'CONNECT']);
        if (normalized.method) {
            const m = String(normalized.method).toUpperCase();
            normalized.method = (allowedMethods.has(m) ? m : String(this.config.method || 'POST')) as any;
        } else {
            normalized.method = (String(this.config.method || 'POST').toUpperCase() as any) || 'POST';
        }

        // meta default
        if (!normalized.meta || typeof normalized.meta !== 'object') {
            normalized.meta = normalized.meta || {};
        }

        return normalized;
    }
    /**
     * 设置全局默认配置
     * @param customConfig 自定义配置
     */
    setConfig(customConfig: Partial<RequestConfig>): void {
        this.config = deepMerge(this.config, customConfig);
    }

    /**
     * 主要请求部分
     * @param options 请求参数
     */
    request<T = unknown>(options: RequestOptions): Promise<T> {
        // 合并 meta 配置，优先级：单次请求 > 全局
        const mergedMeta: RequestMeta = {
            ...this.config.meta,
            ...(options.meta || {})
        };
        // 让 options.meta 传递到拦截器
        options.meta = mergedMeta;
        options.url = options.url || '';
        options.params = options.params || {};
        // 将全局配置合并到本次请求 options 中（注意忽略一些特殊字段如 baseUrl/meta）
        options = this.mergeGlobalConfigToOptions(options);
        // 对合并后的 options 做一次规范化校验
        options = this.validateOptions(options);

        if (this.interceptor.request && typeof this.interceptor.request === 'function') {
            const interceptorRequest = this.interceptor.request(options);
            // 保持兼容：原逻辑中若返回 falsy 则视为取消请求，返回一个 pending Promise
            if (!interceptorRequest) {
                return new Promise(() => {});
            }
            // 若返回对象，则校验并使用拦截器返回的 options
            if (typeof interceptorRequest === 'object') {
                const validated = this.validateOptions(interceptorRequest as RequestOptions);
                options = validated;
            } else {
                // 若返回非对象且非 false，则视为拦截器实现错误，reject
                return Promise.reject(new Error('Interceptor must return false or a RequestOptions object'));
            }
        }

        // 为避免并发写入实例级 `options`，使用 per-request id 存储本次请求参数（供调试/排查）
        const reqId = ++this._reqId;
        this._requestMap.set(reqId, options);

        return new Promise<T>((resolve, reject) => {
            // 保存 reject 以便外部 cancel 使用
            this._rejectMap.set(reqId, reject);
            options.complete = (response: any) => {
                // 清理对应请求的存储
                this._requestMap.delete(reqId);
                this._taskMap.delete(reqId);
                this._rejectMap.delete(reqId);
                // 读取 meta 配置
                const meta = options.meta || this.config.meta || {};
                const originalData = meta.originalData ?? false;
                // 拦截器处理，加入request的配置参数
                response.config = options;
                if (originalData) {
                    // 判断是否存在拦截器
                    if (this.interceptor.response && typeof this.interceptor.response === 'function') {
                        const resInterceptors = this.interceptor.response(response);
                        // 如果拦截器不返回false，就将拦截器返回的内容给请求的then回调
                        if (resInterceptors !== false) {
                            resolve(resInterceptors);
                        } else {
                            // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                            reject(response);
                        }
                    } else {
                        // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
                        resolve(response);
                    }
                } else {
                    if (response.statusCode === 200) {
                        if (this.interceptor.response && typeof this.interceptor.response === 'function') {
                            const resInterceptors = this.interceptor.response(response.data);
                            if (resInterceptors !== false) {
                                resolve(resInterceptors);
                            } else {
                                reject(response.data);
                            }
                        } else {
                            // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                            resolve(response.data);
                        }
                    } else {
                        reject(response);
                    }
                }
            };
            try {
                const task = uni.request(options);
                // 保存 request task 以便 cancel
                this._taskMap.set(reqId, task);
            } catch (err) {
                // 捕获同步抛出的异常并 reject
                // 清理 maps
                this._requestMap.delete(reqId);
                this._taskMap.delete(reqId);
                this._rejectMap.delete(reqId);
                reject(err);
            }
        });
    }

    get<T = unknown>(
        url: string,
        data: any = {},
        options: { header?: Record<string, any>; meta?: RequestMeta } = {}
    ): Promise<T> {
        return this.request<T>({
            method: 'GET',
            url,
            data,
            header: options.header,
            meta: options.meta
        });
    }

    post<T = unknown>(
        url: string,
        data: any = {},
        options: { header?: Record<string, any>; meta?: RequestMeta } = {}
    ): Promise<T> {
        return this.request<T>({
            url,
            method: 'POST',
            data,
            header: options.header,
            meta: options.meta
        });
    }

    put<T = unknown>(
        url: string,
        data: any = {},
        options: { header?: Record<string, any>; meta?: RequestMeta } = {}
    ): Promise<T> {
        return this.request<T>({
            url,
            method: 'PUT',
            data,
            header: options.header,
            meta: options.meta
        });
    }

    delete<T = unknown>(
        url: string,
        data: any = {},
        options: { header?: Record<string, any>; meta?: RequestMeta } = {}
    ): Promise<T> {
        return this.request<T>({
            url,
            method: 'DELETE',
            data,
            header: options.header,
            meta: options.meta
        });
    }
}

// 插件化导出，支持 app.use(http, { interceptor })
const httpInstance = new Request();

interface HttpPluginOptions {
    requestConfig?: Partial<RequestConfig>;
    interceptor?: RequestInterceptor;
}

// 全局导出，支持 import { httpPlugin } from 'uview-pro'
const httpPlugin = {
    install(app: any, options: HttpPluginOptions = {}) {
        if (options.interceptor) {
            const { request, response } = options.interceptor;
            if (request) httpInstance.interceptor.request = request;
            if (response) httpInstance.interceptor.response = response;
        }
        if (options.requestConfig) {
            httpInstance.setConfig(options.requestConfig);
        }
        app.config.globalProperties.$http = httpInstance;
    }
};

// 全局导出，支持 import { http } from 'uview-pro'
export { httpInstance as http };

// 插件化导出，支持 app.use(http, { interceptor })
export default httpPlugin;
