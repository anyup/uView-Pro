<template>
    <demo-page
        ref="demoPageRef"
        title="HTTP 请求"
        desc="用于发送HTTP请求，支持GET、POST等多种方法和拦截器。"
        :apis="'http'"
    >
        <template #default>
            <view class="u-demo">
                <!-- HTTP 简介 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-area">
                        <view class="http-intro">
                            <image class="http-logo" :src="getImageUrl('uni-http')" mode="aspectFit"></image>
                            <view class="http-desc">
                                <text class="http-desc-text">
                                    uni-app 轻量级 Http 请求库，支持 TypeScript、Vue3、组合式
                                    API，插件化、全局配置、请求/响应拦截器、toast/loading
                                    灵活控制，开箱即用，适合中小型项目。
                                </text>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 核心特性 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">核心特性</view>
                    <view class="u-demo-area">
                        <view class="features-list">
                            <view class="feature-item" v-for="(feature, index) in features" :key="index">
                                <u-icon name="checkmark-circle-fill" color="var(--u-type-success)" size="32"></u-icon>
                                <text class="feature-text">{{ feature }}</text>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 请求演示 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">请求演示</view>
                    <view class="u-demo-area">
                        <view class="request-demo">
                            <view class="request-method">
                                <u-tag :text="currentMethod.toUpperCase()" :type="getMethodType(currentMethod)"></u-tag>
                                <text class="request-url">{{ requestUrl }}</text>
                            </view>
                            <view class="request-params" v-if="requestParams">
                                <view class="params-title">请求参数：</view>
                                <view class="params-content">{{ JSON.stringify(requestParams, null, 2) }}</view>
                            </view>
                            <view class="request-result">
                                <view class="result-title">请求结果：</view>
                                <view class="result-content">
                                    <view class="u-demo-result-line">{{ resultText }}</view>
                                </view>
                            </view>
                            <view class="request-status" v-if="requestStatus">
                                <u-tag
                                    :text="requestStatus"
                                    :type="requestStatus === '请求成功' ? 'success' : 'error'"
                                ></u-tag>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 模拟请求 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">模拟请求</view>
                    <view class="u-demo-area">
                        <view class="mock-request">
                            <view class="mock-buttons">
                                <u-button type="primary" size="mini" @click="doGet()">GET 请求</u-button>
                                <u-button type="success" size="mini" @click="doPost()">POST 请求</u-button>
                                <u-button type="warning" size="mini" @click="doPut()">PUT 请求</u-button>
                                <u-button type="error" size="mini" @click="doDelete()">DELETE 请求</u-button>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 参数配置 -->
                <view class="u-config-wrap">
                    <view class="u-config-title u-border-bottom">参数配置</view>
                    <view class="u-config-item">
                        <view class="u-item-title">请求方式</view>
                        <u-subsection :list="['get', 'post', 'put', 'delete']" @change="changeMethod"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">请求 Loading</view>
                        <u-subsection :list="['隐藏', '显示']" @change="changeLoading"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">请求错误时显示 Toast</view>
                        <u-subsection :list="['显示', '隐藏']" @change="changeToast"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">自定义 Header</view>
                        <u-subsection :list="['是', '否']" @change="changeHeader"></u-subsection>
                    </view>
                </view>

                <!-- 相关链接 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">相关链接</view>
                    <view class="u-demo-area">
                        <view class="links-list">
                            <u-cell-group :border="false">
                                <u-cell-item
                                    title="查看文档"
                                    :arrow="true"
                                    @click="openDoc"
                                    :label="'了解 HTTP 请求库的完整用法'"
                                >
                                    <template #icon>
                                        <u-icon name="file-text" size="40" color="var(--u-type-primary)"></u-icon>
                                    </template>
                                </u-cell-item>
                                <u-cell-item
                                    title="平台兼容性"
                                    :arrow="false"
                                    :label="'支持 App、H5、微信小程序、支付宝小程序等'"
                                >
                                    <template #icon>
                                        <u-icon
                                            name="checkmark-circle"
                                            size="40"
                                            color="var(--u-type-success)"
                                        ></u-icon>
                                    </template>
                                </u-cell-item>
                            </u-cell-group>
                        </view>
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script lang="ts" setup>
import { $u } from '@/uni_modules/uview-pro';
import { onMounted, ref, computed } from 'vue';

interface Result {
    code: number;
    msg: string;
    data: any;
}

// 核心特性列表
const features = [
    '支持 get/post/put/delete 四种常用请求',
    '插件化注册，支持全局配置和拦截器',
    'toast、loading 可全局/单次请求灵活配置',
    '拦截器支持 token 注入、统一错误处理',
    'TypeScript 类型友好，支持组合式 API',
    '适配 H5、App、各主流小程序平台'
];

// 请求结果
const result = ref<any>({});
const loading = ref(false);
const toast = ref(true);
const customHeader = ref(false);
const currentMethod = ref<'get' | 'post' | 'put' | 'delete'>('get');
const requestUrl = ref('/api/demo.json');
const requestParams = ref<any>(null);
const requestStatus = ref('');
const demoPageRef = ref();

// 格式化结果文本
const resultText = computed(() => {
    if (!result.value || Object.keys(result.value).length === 0) {
        return '暂无请求结果';
    }
    return JSON.stringify(result.value, null, 2);
});

// 获取图片地址
function getImageUrl(name: string, force: boolean = false) {
    let url = `https://ik.imagekit.io/anyup/images/social/${name}.png`;
    // #ifdef APP-HARMONY
    url = `/static/app/${name}.png`;
    // #endif
    // #ifndef APP-HARMONY
    if (force) {
        url = `${url}?updatedAt=${new Date().getTime()}`;
    }
    // #endif
    return url;
}

async function getNetworkType() {
    return new Promise((resolve, reject) => {
        uni.getNetworkType({
            success: res => {
                if (res.networkType == 'none') {
                    resolve(res.networkType);
                } else {
                    reject(false);
                }
            }
        });
    });
}

// 获取请求方法类型
function getMethodType(method: string): 'primary' | 'success' | 'warning' | 'error' {
    const typeMap: Record<string, 'primary' | 'success' | 'warning' | 'error'> = {
        get: 'primary',
        post: 'success',
        put: 'warning',
        delete: 'error'
    };
    return typeMap[method] || 'primary';
}

// get请求
function doGet(url = '/api/demo.json') {
    currentMethod.value = 'get';
    requestUrl.value = url;
    requestParams.value = {
        timestamp: Date.now()
    };
    requestStatus.value = '';

    const options: any = { meta: { loading: loading.value, toast: toast.value } };
    if (customHeader.value) {
        options.header = { Authorization: 'Bearer token123', 'X-Custom-Header': 'custom-value' };
    }

    $u.http
        .get<Result>(url, requestParams.value, options)
        .then((res: Result) => {
            if (res.code === 200) {
                requestStatus.value = '请求成功';
                setTimeout(() => {
                    $u.toast('请求成功', 'success');
                }, 1000);
            }
            result.value = res;
        })
        .catch((err: any) => {
            requestStatus.value = '请求失败';
            result.value = { error: err.message || '请求失败' };
        });
}

// post请求
function doPost(url = '/api/demo.json') {
    currentMethod.value = 'post';
    requestUrl.value = url;
    requestParams.value = { name: 'uview-pro', version: '1.0.0', timestamp: Date.now() };
    requestStatus.value = '';

    const options: any = { meta: { loading: loading.value, toast: toast.value } };
    if (customHeader.value) {
        options.header = { Authorization: 'Bearer token123', 'X-Custom-Header': 'custom-value' };
    }

    $u.http
        .post<Result>(url, requestParams.value, options)
        .then((res: Result) => {
            if (res.code === 200) {
                requestStatus.value = '请求成功';
                setTimeout(() => {
                    $u.toast('请求成功', 'success');
                }, 1000);
            }
            result.value = res;
        })
        .catch((err: any) => {
            requestStatus.value = '请求失败';
            result.value = { error: err.message || '请求失败' };
        });
}

// put请求
function doPut(url = '/api/demo.json') {
    currentMethod.value = 'put';
    requestUrl.value = url;
    requestParams.value = { id: 1, name: 'updated-name' };
    requestStatus.value = '';

    const options: any = { meta: { loading: loading.value, toast: toast.value } };
    if (customHeader.value) {
        options.header = { Authorization: 'Bearer token123', 'X-Custom-Header': 'custom-value' };
    }

    $u.http
        .put<Result>(url, requestParams.value, options)
        .then((res: Result) => {
            if (res.code === 200) {
                requestStatus.value = '请求成功';
                setTimeout(() => {
                    $u.toast('请求成功', 'success');
                }, 1000);
            }
            result.value = res;
        })
        .catch((err: any) => {
            requestStatus.value = '请求失败';
            result.value = { error: err.message || '请求失败' };
        });
}

// delete请求
function doDelete(url = '/api/demo.json') {
    currentMethod.value = 'delete';
    requestUrl.value = url;
    requestParams.value = null;
    requestStatus.value = '';

    const options: any = { meta: { loading: loading.value, toast: toast.value } };
    if (customHeader.value) {
        options.header = { Authorization: 'Bearer token123', 'X-Custom-Header': 'custom-value' };
    }

    $u.http
        .delete<Result>(url, {}, options)
        .then((res: Result) => {
            if (res.code === 200) {
                requestStatus.value = '请求成功';
                setTimeout(() => {
                    $u.toast('请求成功', 'success');
                }, 1000);
            }
            result.value = res;
        })
        .catch((err: any) => {
            requestStatus.value = '请求失败';
            result.value = { error: err.message || '请求失败' };
        });
}

// 切换请求方式
function changeMethod(index: number) {
    const methods: Array<'get' | 'post' | 'put' | 'delete'> = ['get', 'post', 'put', 'delete'];
    const method = methods[index];
    currentMethod.value = method;

    switch (method) {
        case 'get':
            doGet();
            break;
        case 'post':
            doPost();
            break;
        case 'put':
            doPut();
            break;
        case 'delete':
            doDelete();
            break;
    }
}

// 切换模式，切换请求 Loading 的显示与隐藏
function changeLoading(index: number) {
    loading.value = index === 0;
    doGet();
}

// 切换模式，切换请求错误时 Toast 的显示与隐藏
function changeToast(index: number) {
    toast.value = index === 0;
    doGet(toast.value ? '/api/demo1.json' : '/api/demo.json');
}

// 切换自定义 Header
function changeHeader(index: number) {
    customHeader.value = index === 0;
    doGet();
}

// 打开文档
function openDoc() {
    demoPageRef.value.changeTab(2);
}

onMounted(() => {});
</script>

<style lang="scss" scoped>
.http-intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40rpx 20rpx;
    background: linear-gradient(135deg, rgba(41, 121, 255, 0.05), rgba(25, 190, 107, 0.05));
    border-radius: 16rpx;
}

.http-logo {
    width: 400rpx;
    height: 200rpx;
    margin-bottom: 30rpx;
}

.http-desc {
    text-align: center;
    padding: 0 20rpx;
}

.http-desc-text {
    font-size: 28rpx;
    line-height: 1.8;
    color: #606266;
}

.features-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    padding: 20rpx 0;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 16rpx;
    padding: 16rpx;
    background: rgba(41, 121, 255, 0.03);
    border-radius: 12rpx;
    border-left: 4rpx solid var(--u-type-primary);
}

.feature-text {
    font-size: 28rpx;
    color: #303133;
    flex: 1;
}

.request-demo {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    padding: 20rpx;
    background: #f8f9fa;
    border-radius: 12rpx;
}

.request-method {
    display: flex;
    align-items: center;
    gap: 16rpx;
    padding: 16rpx;
    background: #fff;
    border-radius: 8rpx;
}

.request-url {
    font-size: 28rpx;
    color: #606266;
    font-family: 'Courier New', monospace;
}

.request-params {
    padding: 16rpx;
    background: #fff;
    border-radius: 8rpx;
}

.params-title {
    font-size: 26rpx;
    color: #909399;
    margin-bottom: 12rpx;
}

.params-content {
    font-size: 24rpx;
    color: #303133;
    font-family: 'Courier New', monospace;
    white-space: pre-wrap;
    word-break: break-all;
}

.request-result {
    padding: 16rpx;
    background: #fff;
    border-radius: 8rpx;
}

.result-title {
    font-size: 26rpx;
    color: #909399;
    margin-bottom: 12rpx;
}

.result-content {
    max-height: 400rpx;
    overflow-y: auto;
}

.request-status {
    display: flex;
    justify-content: center;
    padding: 12rpx;
}

.mock-request {
    padding: 20rpx 0;
}

.mock-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    justify-content: center;
}

.links-list {
    padding: 20rpx 0;
}

:deep(.u-cell-item) {
    padding: 24rpx 0;
}
</style>
