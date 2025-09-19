import type { RequestConfig, RequestInterceptor, RequestMeta, RequestOptions } from 'uview-pro';

// 示例：演示如何使用token
const token = '';
// 演示
const baseUrl = 'https://env-00jxty5jnvo5-static.normal.cloudstatic.cn';
// 演示
function logout() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
}

// 全局配置
const httpRequestConfig: RequestConfig = {
    baseUrl,
    header: {
        'content-type': 'application/json'
    },
    meta: {
        originalData: true,
        toast: true,
        loading: true
    }
};

// 请求/响应拦截器
const httpInterceptor: RequestInterceptor = {
    // 请求拦截器
    request: (config: RequestOptions) => {
        console.log('请求拦截器', config);
        const meta: RequestMeta = config.meta || {};
        meta.loading && showLoading();
        if (token) {
            config.header.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    // 响应拦截器
    response: async (response: any) => {
        console.log('响应拦截器', response);
        const meta: RequestMeta = response.config?.meta || {};
        meta.loading && hideLoading();
        const { statusCode, data: rawData, errMsg } = response as any;
        // 网络错误
        if (errMsg && errMsg.includes('Failed to connect')) {
            meta.toast && showToast('网络错误', 'error');
            throw new Error('网络错误');
        }
        if (errMsg && errMsg.includes('request:fail')) {
            meta.toast && showToast('请求错误：未知', 'error');
            throw new Error('请求错误：未知');
        }
        // 请求错误
        if (!(statusCode >= 200 && statusCode < 300)) {
            const errorMessage = `请求错误[${statusCode}]`;
            meta.toast && showToast(errorMessage, 'error');
            throw new Error(`${errorMessage}：${errMsg}`);
        }
        // 业务逻辑错误：登录过期/状态码不正确
        // 这里仅为演示，根据实际业务确定
        const { code, msg } = rawData as any;
        if (code === 403 || code === 401) {
            meta.toast && showToast('登录已过期', 'error');
            await logout();
            setTimeout(() => {
                uni.reLaunch({ url: '/pages/login/login' });
            }, 1000);
            throw new Error(`请求错误[${code}]：${msg}`);
        } else if (!(code >= 200 && code < 300)) {
            meta.toast && showToast(msg, 'error', { duration: 2500 });
            throw new Error(`请求错误[${code}]：${msg}`);
        }
        return rawData;
    }
};

// 显示加载中，可以替换为uview-pro的u-loading-popup组件
function showLoading() {
    uni.showLoading({
        title: '加载中...',
        mask: true
    });
}

// 隐藏加载中，可以替换为uview-pro的u-loading-popup组件
function hideLoading() {
    // 代码示例使用settimeout，仅为演示，实际开发中去掉
    setTimeout(() => {
        uni.hideLoading();
    }, 1000);
}

// 显示toast，可以替换为uview-pro的u-toast组件
function showToast(title = '', icon: 'success' | 'error' | 'none' = 'none', options: { duration: number } = { duration: 2000 }) {
    if (title.length === 0) {
        return;
    }
    // 代码示例使用settimeout，仅为演示，实际开发中去掉
    setTimeout(() => {
        uni.showToast({
            title,
            icon: title.length && title.length > 7 ? 'none' : icon,
            duration: options.duration || 2000
        });
    }, 1000);
}

// 导出
export { httpInterceptor, httpRequestConfig };
