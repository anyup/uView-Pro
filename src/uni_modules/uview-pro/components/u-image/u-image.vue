<template>
    <view class="u-image" @tap="onClick" :style="[wrapStyle, backgroundStyle]">
        <image
            v-if="!isError"
            :src="src"
            :mode="mode"
            @error="onErrorHandler"
            @load="onLoadHandler"
            :lazy-load="lazyLoad"
            class="u-image__image"
            :show-menu-by-longpress="showMenuByLongpress"
            :style="{ borderRadius: shape === 'circle' ? '50%' : $u.addUnit(borderRadius) }"
        ></image>
        <view v-if="showLoading && loading" class="u-image__loading" :style="{ borderRadius: shape === 'circle' ? '50%' : $u.addUnit(borderRadius), backgroundColor: bgColor }">
            <slot v-if="hasSlot('loading')" name="loading" />
            <u-icon v-else :name="loadingIcon" :width="width" :height="height"></u-icon>
        </view>
        <view v-if="showError && isError && !loading" class="u-image__error" :style="{ borderRadius: shape === 'circle' ? '50%' : $u.addUnit(borderRadius) }">
            <slot v-if="hasSlot('error')" name="error" />
            <u-icon v-else :name="errorIcon" :width="width" :height="height"></u-icon>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, useSlots } from 'vue';
import { type ImageExpose, ImageProps } from './types';
import { $u } from '../..';

defineOptions({
    name: 'u-image'
});

/**
 * Image 图片
 * @description 此组件为uni-app的image组件的加强版，在继承了原有功能外，还支持淡入动画、加载中、加载失败提示、圆角值和形状等。
 * @tutorial https://uviewpro.cn/zh/components/image.html
 * @property {String} src 图片地址
 * @property {String} mode 裁剪模式，见官网说明
 * @property {String | Number} width 宽度，单位任意，如果为数值，则为rpx单位（默认100%）
 * @property {String | Number} height 高度，单位任意，如果为数值，则为rpx单位（默认 auto）
 * @property {String} shape 图片形状，circle-圆形，square-方形（默认square）
 * @property {String | Number} border-radius 圆角值，单位任意，如果为数值，则为rpx单位（默认 0）
 * @property {Boolean} lazy-load 是否懒加载，仅微信小程序、App、百度小程序、字节跳动小程序有效（默认 true）
 * @property {Boolean} show-menu-by-longpress 是否开启长按图片显示识别小程序码菜单，仅微信小程序有效（默认 false）
 * @property {String} loading-icon 加载中的图标，或者小图片（默认 photo）
 * @property {String} error-icon 加载失败的图标，或者小图片（默认 error-circle）
 * @property {Boolean} show-loading 是否显示加载中的图标或者自定义的slot（默认 true）
 * @property {Boolean} show-error 是否显示加载错误的图标或者自定义的slot（默认 true）
 * @property {Boolean} fade 是否需要淡入效果（默认 true）
 * @property {Boolean} webp 只支持网络资源，只对微信小程序有效（默认 false）
 * @property {String | Number} duration 搭配fade参数的过渡时间，单位ms（默认 500）
 * @property {String} bg-color 背景颜色，用于深色页面加载图片时，为了和背景色融合（默认 #f3f4f6）
 * @event {Function} click 点击图片时触发
 * @event {Function} error 图片加载失败时触发
 * @event {Function} load 图片加载成功时触发
 * @example <u-image width="100%" height="300rpx" :src="src"></u-image>
 */

const emit = defineEmits<{
    (e: 'click'): void;
    (e: 'error', err: any): void;
    (e: 'load'): void;
}>();

const props = defineProps(ImageProps);

// 图片是否加载错误，如果是，则显示错误占位图
const isError = ref(false);
// 初始化组件时，默认为加载中状态
const loading = ref(true);
// 不透明度，为了实现淡入淡出的效果
const opacity = ref(1);
// 过渡时间，因为props的值无法修改，故需要一个中间值
const durationTime = ref(props.duration);
// 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
const backgroundStyle = ref<Record<string, any>>({});

// 监听src变化，处理加载状态
watch(
    () => props.src,
    n => {
        if (!n) {
            // 如果传入null或者''，或者false，或者undefined，标记为错误状态
            isError.value = true;
            loading.value = false;
        } else {
            isError.value = false;
            loading.value = true;
        }
    },
    { immediate: true }
);

/**
 * 计算图片外层包裹样式
 * @returns {Record<string, any>}
 */
const wrapStyle = computed(() => {
    let style: Record<string, any> = {};
    // 通过调用addUnit()方法，如果有单位，如百分比，px单位等，直接返回，如果是纯粹的数值，则加上rpx单位
    style.width = $u.addUnit(props.width);
    style.height = $u.addUnit(props.height);
    // 如果是配置了圆形，设置50%的圆角，否则按照默认的配置值
    style.borderRadius = props.shape === 'circle' ? '50%' : $u.addUnit(props.borderRadius);
    // 如果设置圆角，必须要有hidden，否则可能圆角无效
    style.overflow = Number(props.borderRadius) > 0 ? 'hidden' : 'visible';
    if (props.fade) {
        style.opacity = opacity.value;
        style.transition = `opacity ${Number(durationTime.value) / 1000}s ease-in-out`;
    }
    return style;
});

/**
 * 点击图片
 * @emits click
 */
function onClick() {
    emit('click');
}

/**
 * 图片加载失败
 * @param err 失败事件对象
 * @emits error
 */
function onErrorHandler(err: any) {
    loading.value = false;
    isError.value = true;
    emit('error', err);
}

/**
 * 图片加载完成，标记loading结束
 * @emits load
 */
function onLoadHandler() {
    loading.value = false;
    isError.value = false;
    emit('load');
    // 如果不需要动画效果，就不执行下方代码，同时移除加载时的背景颜色
    // 否则无需fade效果时，png图片依然能看到下方的背景色
    if (!props.fade) return removeBgColor();
    // 原来opacity为1(不透明，是为了显示占位图)，改成0(透明，意味着该元素显示的是背景颜色，默认的灰色)，再改成1，是为了获得过渡效果
    opacity.value = 0;
    // 这里设置为0，是为了图片展示到背景全透明这个过程时间为0，延时之后延时之后重新设置为duration，是为了获得背景透明(灰色)
    // 到图片展示的过程中的淡入效果
    durationTime.value = 0;
    // 延时50ms，否则在浏览器H5，过渡效果无效
    setTimeout(() => {
        durationTime.value = props.duration;
        opacity.value = 1;
        setTimeout(() => {
            removeBgColor();
        }, Number(durationTime.value));
    }, 50);
}

/**
 * 移除图片的背景色
 * 淡入动画过渡完成后，将背景设置为透明色，否则png图片会看到灰色的背景
 */
function removeBgColor() {
    backgroundStyle.value = {
        backgroundColor: 'transparent'
    };
}

function changeStatus(status: 'loading' | 'error' | 'normal') {
    if (status === 'loading') {
        loading.value = true;
        isError.value = false;
    } else if (status === 'error') {
        loading.value = false;
        isError.value = true;
    } else {
        loading.value = false;
        isError.value = false;
    }
}

// 暴露给模板
const $slots = useSlots();

function hasSlot(name: string) {
    return props.useSlots ? !!$slots[name] && props.useSlots[name] : !!$slots[name];
}

defineExpose<ImageExpose>({
    changeStatus
});
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-image {
    position: relative;
    transition: opacity 0.5s ease-in-out;

    &__image {
        width: 100%;
        height: 100%;
    }

    &__loading,
    &__error {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        @include vue-flex;
        align-items: center;
        justify-content: center;
        background-color: $u-bg-color;
        color: $u-tips-color;
        font-size: 46rpx;
    }
}
</style>
