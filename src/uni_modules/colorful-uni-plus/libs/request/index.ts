import deepMerge from '../function/deepMerge';
import validate from '../function/test';

/**
 * 请求配置项类型定义
 */
export interface RequestConfig {
    baseUrl: string;
    header: Record<string, any>;
    method: string;
    dataType: string;
    responseType: string;
    showLoading: boolean;
    loadingText: string;
    loadingTime: number;
    timer: ReturnType<typeof setTimeout> | null;
    originalData: boolean;
    loadingMask: boolean;
}

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
    header?: Record<string, any>;
    method?: 'GET' | 'POST' | 'OPTIONS' | 'HEAD' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
    data?: any;
    dataType?: string;
    responseType?: string;
    params?: Record<string, any>;
    complete?: (response: any) => void;
}

class Request {
    config: RequestConfig;
    interceptor: RequestInterceptor;
    options?: RequestOptions;

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
    request(options: RequestOptions): Promise<any> {
        // 检查请求拦截
        if (this.interceptor.request && typeof this.interceptor.request === 'function') {
            let interceptorRequest = this.interceptor.request(options);
            if (interceptorRequest === false) {
                // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
                return new Promise(() => {});
            }
            this.options = interceptorRequest;
        }
        options.dataType = options.dataType || this.config.dataType;
        options.responseType = options.responseType || this.config.responseType;
        options.url = options.url || '';
        options.params = options.params || {};
        options.header = Object.assign({}, this.config.header, options.header);
        options.method = (options.method || this.config.method) as RequestOptions['method'];
        // 保证 url 一定为 string
        if (!options.url) options.url = '';

        return new Promise<any>((resolve, reject) => {
            options.complete = (response: any) => {
                // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
                uni.hideLoading();
                // 清除定时器，如果请求回来了，就无需loading
                clearTimeout(this.config.timer as ReturnType<typeof setTimeout>);
                this.config.timer = null;
                // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
                if (this.config.originalData) {
                    // 判断是否存在拦截器
                    if (this.interceptor.response && typeof this.interceptor.response === 'function') {
                        let resInterceptors = this.interceptor.response(response);
                        // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
                        if (resInterceptors !== false) {
                            resolve(resInterceptors);
                        } else {
                            // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                            reject(response);
                        }
                    } else {
                        // 如果要求返回原始数据，就算没有拎截器，也返回最原始的数据
                        resolve(response);
                    }
                } else {
                    if (response.statusCode == 200) {
                        if (this.interceptor.response && typeof this.interceptor.response === 'function') {
                            let resInterceptors = this.interceptor.response(response.data);
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
                        // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
                        // if(response.errMsg) {
                        //  uni.showModal({
                        //    title: response.errMsg
                        //  });
                        // }
                        reject(response);
                    }
                }
            };

            // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
            options.url = validate.url(options.url) ? options.url : this.config.baseUrl + (options.url.indexOf('/') == 0 ? options.url : '/' + options.url);

            // 是否显示loading
            // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
            // 而没有清除前者的定时器，导致前者超时，一直显示loading
            if (this.config.showLoading && !this.config.timer) {
                this.config.timer = setTimeout(() => {
                    uni.showLoading({
                        title: this.config.loadingText,
                        mask: this.config.loadingMask
                    });
                    this.config.timer = null;
                }, this.config.loadingTime);
            }
            uni.request(options);
        });
        // .catch(res => {
        //   // 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
        //   // 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
        //   return new Promise(()=>{});
        // })
    }

    constructor() {
        this.config = {
            baseUrl: '', // 请求的根域名
            // 默认的请求头
            header: {},
            method: 'POST',
            // 设置为json，返回后uni.request会对数据进行一次JSON.parse
            dataType: 'json',
            // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
            responseType: 'text',
            showLoading: true, // 是否显示请求中的loading
            loadingText: '请求中...',
            loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
            timer: null, // 定时器
            originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
            loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
        };

        // 拦截器
        this.interceptor = {
            // 请求前的拦截
            request: null,
            // 请求后的拦截
            response: null
        };

        // get请求
        this.get = (url: string, data: any = {}, header: Record<string, any> = {}): Promise<any> => {
            return this.request({
                method: 'GET',
                url,
                header,
                data
            });
        };

        // post请求
        this.post = (url: string, data: any = {}, header: Record<string, any> = {}): Promise<any> => {
            return this.request({
                url,
                method: 'POST',
                header,
                data
            });
        };

        // put请求，不支持支付宝小程序(HX2.6.15)
        this.put = (url: string, data: any = {}, header: Record<string, any> = {}): Promise<any> => {
            return this.request({
                url,
                method: 'PUT',
                header,
                data
            });
        };

        // delete请求，不支持支付宝和头条小程序(HX2.6.15)
        this.delete = (url: string, data: any = {}, header: Record<string, any> = {}): Promise<any> => {
            return this.request({
                url,
                method: 'DELETE',
                header,
                data
            });
        };
    }

    /**
     * GET 请求
     */
    get: (url: string, data?: any, header?: Record<string, any>) => Promise<any>;
    /**
     * POST 请求
     */
    post: (url: string, data?: any, header?: Record<string, any>) => Promise<any>;
    /**
     * PUT 请求
     */
    put: (url: string, data?: any, header?: Record<string, any>) => Promise<any>;
    /**
     * DELETE 请求
     */
    delete: (url: string, data?: any, header?: Record<string, any>) => Promise<any>;
}

export default new Request();
