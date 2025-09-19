<template>
    <view class="u-tips" :class="['u-' + type, isShow ? 'u-tip-show' : '']" :style="tipStyle">{{ title }}</view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { $u } from '../..';
import { TopTipsProps } from './types';

defineOptions({ name: 'u-top-tips' });

/**
 * topTips 顶部提示
 * @description 该组件一般用于页面顶部向下滑出一个提示，尔后自动收起的场景。
 * @tutorial https://uviewpro.cn/zh/components/topTips.html
 * @property {String|Number} navbarHeight 导航栏高度(包含状态栏高度在内)，单位PX
 * @property {String|Number} zIndex z-index值（默认975）
 * @example <u-top-tips ref="uTips"></u-top-tips>
 */

const props = defineProps(TopTipsProps);

let timer: number | null = null; // 定时器
const isShow = ref(false); // 是否显示消息组件
const title = ref(''); // 组件中显示的消息内容
const type = ref<'primary' | 'success' | 'error' | 'warning' | 'info'>('primary'); // 消息的类型（颜色不同），primary，success，error，warning，info
const duration = ref(2000); // 组件显示的时间，单位为毫秒

const uZIndex = computed(() => (props.zIndex ? props.zIndex : $u.zIndex.topTips));

const uNavbarHeight = computed(() => {
    if (props.navbarHeight) {
        return props.navbarHeight;
    }
    let height = 0;
    // #ifndef H5
    height = 0;
    // #endif
    // #ifdef H5
    height = 44;
    // #endif
    return height;
});

const tipStyle = computed(() => ({
    top: Number(uNavbarHeight.value) + 'px',
    zIndex: uZIndex.value
}));

/**
 * 显示顶部提示
 * @param config 配置项 { title, type, duration }
 */
function show(config: { title: string; type?: string; duration?: number } = { title: '' }) {
    // 先清除定时器（可能是上一次定义的，需要清除了再开始新的）
    if (timer) clearTimeout(timer);
    // 时间，内容，类型主题(type)等参数
    if (config.duration) duration.value = config.duration;
    if (config.type) type.value = config.type as any;
    title.value = config.title;
    isShow.value = true;
    // 倒计时
    timer = setTimeout(() => {
        isShow.value = false;
        if (timer) clearTimeout(timer);
        timer = null;
    }, duration.value);
}
defineExpose({ show });
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';
view {
    box-sizing: border-box;
}
.u-tips {
    width: 100%;
    position: fixed;
    z-index: 1;
    padding: 20rpx 30rpx;
    color: #ffffff;
    font-size: 28rpx;
    left: 0;
    right: 0;
    @include vue-flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateY(-100%);
    transition: all 0.35s linear;
}
.u-tip-show {
    transform: translateY(0);
    opacity: 1;
    z-index: 99;
}
.u-primary {
    background: $u-type-primary;
}
.u-success {
    background: $u-type-success;
}
.u-warning {
    background: $u-type-warning;
}
.u-error {
    background: $u-type-error;
}
.u-info {
    background: $u-type-info;
}
</style>
