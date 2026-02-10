<template>
    <u-mask :z-index="uZIndex" :show="isShow" custom-style="background-color:transparent;">
        <view
            class="u-toast"
            :class="[
                isShow ? 'u-show' : '',
                'u-type-' + tmpConfig.type,
                'u-position-' + tmpConfig.position,
                customClass
            ]"
            :style="$u.toStyle({ zIndex: uZIndex }, customStyle)"
        >
            <view class="u-icon-wrap">
                <!-- loading 类型走独立的加载动画组件 -->
                <u-loading
                    v-if="tmpConfig.loading"
                    mode="circle"
                    custom-style="margin-right: 16rpx;"
                    :color="($u.color as any)[tmpConfig.type]"
                ></u-loading>
                <!-- 其它类型仍然使用图标 -->
                <u-icon
                    v-else-if="tmpConfig.icon && iconName"
                    custom-class="u-toast_icon"
                    custom-style="margin-right: 10rpx;"
                    :name="iconName"
                    :size="40"
                    :color="tmpConfig.type"
                ></u-icon>
            </view>
            <text class="u-text">{{ tmpConfig.title }}</text>
        </view>
    </u-mask>
</template>

<script lang="ts">
export default {
    name: 'u-toast',
    options: {
        addGlobalClass: true,
        // #ifndef MP-TOUTIAO
        virtualHost: true,
        // #endif
        styleIsolation: 'shared'
    }
};
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { $u } from '../..';
import type { ToastExpose } from './types';
import { ToastProps } from './types';
import {
    U_TOAST_EVENT_HIDE,
    U_TOAST_EVENT_SHOW,
    U_TOAST_GLOBAL_EVENT_HIDE,
    U_TOAST_GLOBAL_EVENT_SHOW,
    getEventWithCurrentPage,
    type ToastPayload
} from './service';

/**
 * toast 消息提示
 * @description 此组件表现形式类似uni的uni.showToastAPI，但也有不同的地方。
 * @tutorial https://uviewpro.cn/zh/components/toast.html
 * @property {String|Number} z-index toast展示时的z-index值
 * @event {Function} show 显示toast，如需一进入页面就显示toast，请在onReady生命周期调用
 * @example <u-toast ref="uToast" />
 */
const props = defineProps(ToastProps);

// 是否显示toast
const isShow = ref(false);
// 定时器
let timer: ReturnType<typeof setTimeout> | null = null;
// 内置配置
const config = computed(() => {
    return {
        zIndex: props.zIndex, // z-index值
        type: props.type, // 主题类型，primary，success，error，warning，black
        duration: props.duration, // 显示的时间，毫秒
        icon: props.icon, // 显示的图标
        position: props.position, // toast出现的位置
        callback: props.callback, // 执行完后的回调函数
        back: props.back, // 结束toast是否自动返回上一页
        isTab: props.isTab, // 是否跳转tab页面
        url: props.url, // toast消失后是否跳转页面，有则跳转，优先级高于back参数
        params: props.params, // URL跳转的参数，对象
        loading: props.loading,
        title: '' // 显示文本
    };
});
// 合并后的临时配置变量
const tmpConfig = ref<any>({ ...config.value });

/**
 * 只有不为none，并且type为error|warning|success|info时候，才显示图标
 */
const iconName = computed(() => {
    if (['error', 'warning', 'success', 'info'].indexOf(tmpConfig.value.type) >= 0 && tmpConfig.value.icon) {
        let icon = $u.type2icon(tmpConfig.value.type);
        return icon;
    }
    return '';
});
/**
 * 显示toast时候，如果用户有传递z-index值，优先使用
 */
const uZIndex = computed(() => {
    return isShow.value ? (props.zIndex ? props.zIndex : $u.zIndex.toast) : '999999';
});

/**
 * 显示toast组件，由父组件通过ref.show(options)形式调用
 * @description 当 duration 为 0 或不传时，表示不自动关闭，需要手动调用 hide/close 方法关闭
 */
function show(options: any) {
    // 不将结果合并到config变量，避免多次调用u-toast，前后的配置造成混乱
    tmpConfig.value = $u.deepMerge(config.value, options);
    if (timer) {
        // 清除定时器
        clearTimeout(timer);
        timer = null;
    }
    isShow.value = true;
    // duration 为 0、undefined 或小于等于 0 时，表示不自动关闭，需要手动调用 hide/close
    if (tmpConfig.value.duration > 0) {
        timer = setTimeout(() => {
            // 倒计时结束，清除定时器，隐藏toast组件
            isShow.value = false;
            clearTimeout(timer!);
            timer = null;
            // 判断是否存在callback方法，如果存在就执行
            typeof tmpConfig.value.callback === 'function' && tmpConfig.value.callback();
            timeEnd();
        }, tmpConfig.value.duration);
    }
}
/**
 * 隐藏toast组件，由父组件通过ref.hide()形式调用
 */
function hide() {
    isShow.value = false;
    if (timer) {
        // 清除定时器
        clearTimeout(timer);
        timer = null;
    }
}
/**
 * 倒计时结束之后，进行的一些操作
 */
function timeEnd() {
    // 如果带有url值，根据isTab为true或者false进行跳转
    if (tmpConfig.value.url) {
        // 如果url没有"/"开头，添加上，因为uni的路由跳转需要"/"开头
        if (tmpConfig.value.url[0] != '/') tmpConfig.value.url = '/' + tmpConfig.value.url;
        // 判断是否有传递显式的参数
        if (Object.keys(tmpConfig.value.params).length) {
            // 判断用户传递的url中，是否带有参数
            // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
            // 如果有params参数，转换后无需带上"?"
            let query = '';
            if (/.*\/.*\?.*=.*/.test(tmpConfig.value.url)) {
                // object对象转为get类型的参数
                query = $u.queryParams(tmpConfig.value.params, false);
                tmpConfig.value.url = tmpConfig.value.url + '&' + query;
            } else {
                query = $u.queryParams(tmpConfig.value.params);
                tmpConfig.value.url += query;
            }
        }
        // 如果是跳转tab页面，就使用uni.switchTab
        if (tmpConfig.value.isTab) {
            uni.switchTab({ url: tmpConfig.value.url });
        } else {
            uni.navigateTo({ url: tmpConfig.value.url });
        }
    } else if (tmpConfig.value.back) {
        // 回退到上一页
        $u.route({ type: 'back' });
    }
}

/**
 * @description
 * 函数式调用支持：
 * - useToast() 内部通过 uni.$emit 派发「全局」事件，仅由 App 根部的 <u-toast global /> 承接
 * - 普通页面级 <u-toast /> 监听「页面级」事件（当前版本暂未开放对应函数式 API，仅支持 ref 调用）
 * - 不影响原有 ref.show()/ref.hide() 使用方式
 */
function onServiceShow(payload: ToastPayload) {
    show(payload || {});
}
function onServiceHide() {
    hide();
}

// 是否为 App 根部的“全局 toast”
const isGlobal = computed(() => props.global);
// 是否为页面级 toast
const isPage = computed(() => props.page);

// 显示事件
const showEvent = computed(() =>
    isGlobal.value ? U_TOAST_GLOBAL_EVENT_SHOW : isPage.value ? getEventWithCurrentPage(U_TOAST_EVENT_SHOW) : ''
);
// 隐藏事件
const hideEvent = computed(() =>
    isGlobal.value ? U_TOAST_GLOBAL_EVENT_HIDE : isPage.value ? getEventWithCurrentPage(U_TOAST_EVENT_HIDE) : ''
);

// 开始监听事件
function startListeners() {
    // 如果为全局 toast，则先移除所有事件监听，再重新监听
    if (isGlobal.value) {
        removeAllListeners();
    }
    if (showEvent.value) {
        uni?.$on && uni.$on(showEvent.value, onServiceShow);
    }
    if (hideEvent.value) {
        uni?.$on && uni.$on(hideEvent.value, onServiceHide);
    }
}

// 停止监听事件
function stopListeners() {
    if (showEvent.value) {
        uni?.$off && uni.$off(showEvent.value, onServiceShow);
    }
    if (hideEvent.value) {
        uni?.$off && uni.$off(hideEvent.value, onServiceHide);
    }
}

// 移除所有事件监听
function removeAllListeners() {
    if (showEvent.value) {
        uni?.$off && uni.$off(showEvent.value);
    }
    if (hideEvent.value) {
        uni?.$off && uni.$off(hideEvent.value);
    }
}

onMounted(() => {
    startListeners();
});

onBeforeUnmount(() => {
    stopListeners();
});

defineExpose<ToastExpose>({
    show,
    hide,
    close: hide
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-toast {
    position: fixed;
    z-index: -1;
    transition: opacity 0.3s;
    text-align: center;
    color: var(--u-white-color);
    border-radius: 8rpx;
    background: var(--u-content-color);
    @include vue-flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    opacity: 0;
    pointer-events: none;
    padding: 30rpx 40rpx;
}

.u-toast.u-show {
    opacity: 1;
}

.u-icon-wrap {
    /* #ifdef H5 */
    padding-top: 6rpx;
    /* #endif */
}

.u-text {
    word-break: break-all;
}

:deep(.u-toast_icon) {
    margin-right: 10rpx;
    @include vue-flex;
    align-items: center;
    line-height: normal;
}

.u-position-center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* #ifndef APP-NVUE */
    max-width: 70%;
    /* #endif */
}

.u-position-top {
    left: 50%;
    top: 20%;
    transform: translate(-50%, -50%);
}

.u-position-bottom {
    left: 50%;
    bottom: 20%;
    transform: translate(-50%, -50%);
}

.u-type-primary {
    color: $u-type-primary;
    background-color: $u-type-primary-light;
    border: 1px solid rgb(215, 234, 254);
}

.u-type-success {
    color: $u-type-success;
    background-color: $u-type-success-light;
    border: 1px solid var(--u-type-success-light);
}

.u-type-error {
    color: $u-type-error;
    background-color: $u-type-error-light;
    border: 1px solid var(--u-type-error-light);
}

.u-type-warning {
    color: $u-type-warning;
    background-color: $u-type-warning-light;
    border: 1px solid var(--u-type-warning-light);
}

.u-type-info {
    color: $u-type-info;
    background-color: $u-type-info-light;
    border: 1px solid var(--u-bg-gray-light);
}

.u-type-default {
    color: var(--u-white-color);
    background-color: var(--u-content-color);
}
</style>
