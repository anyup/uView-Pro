<template>
    <view
        class="u-toast"
        :class="[isShow ? 'u-show' : '', 'u-type-' + tmpConfig.type, 'u-position-' + tmpConfig.position]"
        :style="{
            zIndex: uZIndex
        }"
    >
        <view class="u-icon-wrap">
            <u-icon v-if="tmpConfig.icon" class="u-icon" :name="iconName" :size="30" :color="tmpConfig.type"></u-icon>
        </view>
        <text class="u-text">{{ tmpConfig.title }}</text>
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { $u } from '../..';
import type { ToastExpose } from './types';
import { ToastProps } from './types';

defineOptions({
    name: 'u-toast'
});

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
const config = ref({
    params: {}, // URL跳转的参数，对象
    title: '', // 显示文本
    type: '', // 主题类型，primary，success，error，warning，black
    duration: 2000, // 显示的时间，毫秒
    isTab: false, // 是否跳转tab页面
    url: '', // toast消失后是否跳转页面，有则跳转，优先级高于back参数
    icon: true, // 显示的图标
    position: 'center', // toast出现的位置
    callback: null as null | (() => void), // 执行完后的回调函数
    back: false // 结束toast是否自动返回上一页
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

defineExpose<ToastExpose>({
    show,
    hide
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-toast {
    position: fixed;
    z-index: -1;
    transition: opacity 0.3s;
    text-align: center;
    color: #fff;
    border-radius: 8rpx;
    background: #585858;
    @include vue-flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    opacity: 0;
    pointer-events: none;
    padding: 18rpx 40rpx;
}

.u-toast.u-show {
    opacity: 1;
}

.u-icon {
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
    border: 1px solid #bef5c8;
}

.u-type-error {
    color: $u-type-error;
    background-color: $u-type-error-light;
    border: 1px solid #fde2e2;
}

.u-type-warning {
    color: $u-type-warning;
    background-color: $u-type-warning-light;
    border: 1px solid #faecd8;
}

.u-type-info {
    color: $u-type-info;
    background-color: $u-type-info-light;
    border: 1px solid #ebeef5;
}

.u-type-default {
    color: #fff;
    background-color: #585858;
}
</style>
