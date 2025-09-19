<template>
    <view v-if="visibleSync" :style="[customStyle, { zIndex: Number(uZindex) - 1 }]" class="u-drawer" hover-stop-propagation>
        <u-mask
            :duration="duration"
            :custom-style="maskCustomStyle"
            :maskClickAble="maskCloseAble"
            :z-index="Number(uZindex) - 2"
            :show="showDrawer && mask"
            @click="maskClick"
        ></u-mask>
        <view
            class="u-drawer-content"
            @tap="modeCenterClose(mode)"
            :class="[
                safeAreaInsetBottom ? 'safe-area-inset-bottom' : '',
                'u-drawer-' + mode,
                showDrawer ? 'u-drawer-content-visible' : '',
                zoom && mode == 'center' ? 'u-animation-zoom' : ''
            ]"
            @touchmove.stop.prevent
            @tap.stop.prevent
            :style="[style]"
        >
            <view class="u-mode-center-box" @tap.stop.prevent @touchmove.stop.prevent v-if="mode == 'center'" :style="[centerStyle]">
                <u-icon
                    @click="close"
                    v-if="closeable"
                    class="u-close"
                    :class="['u-close--' + closeIconPos]"
                    :name="closeIcon"
                    :color="closeIconColor"
                    :size="closeIconSize"
                ></u-icon>
                <scroll-view class="u-drawer__scroll-view" scroll-y="true">
                    <slot />
                </scroll-view>
            </view>
            <scroll-view class="u-drawer__scroll-view" scroll-y="true" v-else>
                <slot />
            </scroll-view>
            <view @tap="close" class="u-close" :class="['u-close--' + closeIconPos]">
                <u-icon v-if="mode != 'center' && closeable" :name="closeIcon" :color="closeIconColor" :size="closeIconSize"></u-icon>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { $u } from '../..';
import { PopupProps } from './types';

defineOptions({
    name: 'u-popup'
});

/**
 * popup 弹窗
 * @description 弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出。组件只提供容器，内部内容由用户自定义
 * @tutorial https://uviewpro.cn/zh/components/popup.html
 * @property {String} mode 弹出方向（默认left）
 * @property {Boolean} mask 是否显示遮罩（默认true）
 * @property {Stringr | Number} length mode=left | 见官网说明（默认auto）
 * @property {Boolean} zoom 是否开启缩放动画，只在mode为center时有效（默认true）
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配（默认false）
 * @property {Boolean} mask-close-able 点击遮罩是否可以关闭弹出层（默认true）
 * @property {Object} custom-style 用户自定义样式
 * @property {Stringr | Number} negative-top 中部弹出时，往上偏移的值
 * @property {Numberr | String} border-radius 弹窗圆角值（默认0）
 * @property {Numberr | String} z-index 弹出内容的z-index值（默认1075）
 * @property {Boolean} closeable 是否显示关闭图标（默认false）
 * @property {String} close-icon 关闭图标的名称，只能uView的内置图标
 * @property {String} close-icon-pos 自定义关闭图标位置（默认top-right）
 * @property {String} close-icon-color 关闭图标的颜色（默认#909399）
 * @property {Number | String} close-icon-size 关闭图标的大小，单位rpx（默认30）
 * @event {Function} open 弹出层打开
 * @event {Function} close 弹出层收起
 * @example <u-popup v-model="show"><view>出淤泥而不染，濯清涟而不妖</view></u-popup>
 */

const props = defineProps(PopupProps);
const emit = defineEmits(['update:modelValue', 'open', 'close']);

// 组件内部状态
const visibleSync = ref(false);
const showDrawer = ref(false);
const timer = ref<ReturnType<typeof setTimeout> | null>(null);
const closeFromInner = ref(false); // value的值改变，是发生在内部还是外部
// 根据mode的位置，设定其弹窗的宽度(mode = left|right)，或者高度(mode = top|bottom)
const style = computed(() => {
    let style: Record<string, any> = {};
    // 如果是左边或者上边弹出时，需要给translate设置为负值，用于隐藏
    if (props.mode == 'left' || props.mode == 'right') {
        style = {
            width: props.width ? getUnitValue(props.width) : getUnitValue(props.length),
            height: '100%',
            transform: `translate3D(${props.mode == 'left' ? '-100%' : '100%'},0px,0px)`
        };
    } else if (props.mode == 'top' || props.mode == 'bottom') {
        style = {
            width: '100%',
            height: props.height ? getUnitValue(props.height) : getUnitValue(props.length),
            transform: `translate3D(0px,${props.mode == 'top' ? '-100%' : '100%'},0px)`
        };
    }
    // 如果用户设置了borderRadius值，添加弹窗的圆角
    style.zIndex = uZindex.value;
    if (props.borderRadius) {
        switch (props.mode) {
            case 'left':
                style.borderRadius = `0 ${props.borderRadius}rpx ${props.borderRadius}rpx 0`;
                break;
            case 'top':
                style.borderRadius = `0 0 ${props.borderRadius}rpx ${props.borderRadius}rpx`;
                break;
            case 'right':
                style.borderRadius = `${props.borderRadius}rpx 0 0 ${props.borderRadius}rpx`;
                break;
            case 'bottom':
                style.borderRadius = `${props.borderRadius}rpx ${props.borderRadius}rpx 0 0`;
                break;
            default:
        }
        // 不加可能圆角无效
        style.overflow = 'hidden';
    }
    if (props.duration) style.transition = `all ${Number(props.duration) / 1000}s linear`;
    return style;
});

// 中部弹窗的特有样式
const centerStyle = computed(() => {
    let style: Record<string, any> = {};
    style.width = props.width ? getUnitValue(props.width) : getUnitValue(props.length);

    // 中部弹出的模式，如果没有设置高度，就用auto值，由内容撑开高度
    style.height = props.height ? getUnitValue(props.height) : 'auto';
    style.zIndex = uZindex.value;
    style.marginTop = `-${$u.addUnit(props.negativeTop)}`;
    if (props.borderRadius) {
        style.borderRadius = `${props.borderRadius}rpx`;
        // 不加可能圆角无效
        style.overflow = 'hidden';
    }
    return style;
});

// 计算整理后的z-index值
const uZindex = computed(() => (props.zIndex ? props.zIndex : $u.zIndex.popup));

watch(
    () => props.modelValue,
    val => {
        if (val) {
            open();
        } else if (!closeFromInner.value) {
            close();
        }
        closeFromInner.value = false;
    }
);

onMounted(() => {
    if (props.modelValue) open();
});

/**
 * 判断传入的值，是否带有单位，如果没有，就默认用rpx单位
 */
function getUnitValue(val: string | number) {
    if (/(%|px|rpx|auto)$/.test(String(val))) return val;
    else return val + 'rpx';
}

/**
 * 遮罩被点击
 */
function maskClick() {
    close();
}

/**
 * 关闭弹窗
 */
function close() {
    // 标记关闭是内部发生的，否则修改了value值，导致watch中对value检测，导致再执行一遍close
    // 造成@close事件触发两次
    closeFromInner.value = true;
    change('showDrawer', 'visibleSync', false);
}

/**
 * 中部弹出时，点击内容区域关闭弹窗
 */
function modeCenterClose(mode: string) {
    // 中部弹出时，需要.u-drawer-content将居中内容，此元素会铺满屏幕，点击需要关闭弹窗
    // 让其只在mode=center时起作用
    if (mode != 'center' || !props.maskCloseAble) return;
    close();
}

/**
 * 打开弹窗
 */
function open() {
    change('visibleSync', 'showDrawer', true);
}

/**
 * 控制弹窗显示/隐藏的动画和状态
 * 此处的原理是，关闭时先通过动画隐藏弹窗和遮罩，再移除整个组件
 * 打开时，先渲染组件，延时一定时间再让遮罩和弹窗的动画起作用
 */
function change(param1: 'showDrawer' | 'visibleSync', param2: 'visibleSync' | 'showDrawer', status: boolean) {
    // 如果this.popup为false，意味着为picker，actionsheet等组件调用了popup组件
    if (props.popup === true) {
        emit('update:modelValue', status);
    }
    (param1 === 'showDrawer' ? showDrawer : visibleSync).value = status;
    if (status) {
        // #ifdef H5 || MP
        timer.value = setTimeout(() => {
            (param2 === 'showDrawer' ? showDrawer : visibleSync).value = status;
            emit(status ? 'open' : 'close');
        }, 50);
        // #endif
        // #ifndef H5 || MP
        nextTick(() => {
            (param2 === 'showDrawer' ? showDrawer : visibleSync).value = status;
            emit(status ? 'open' : 'close');
        });
        // #endif
    } else {
        timer.value = setTimeout(() => {
            (param2 === 'showDrawer' ? showDrawer : visibleSync).value = status;
            emit(status ? 'open' : 'close');
        }, Number(props.duration));
    }
}
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-drawer {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}

.u-drawer-content {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    position: absolute;
    z-index: 1003;
    transition: all 0.25s linear;
}

.u-drawer__scroll-view {
    width: 100%;
    height: 100%;
}

.u-drawer-left {
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
}

.u-drawer-right {
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #ffffff;
}

.u-drawer-top {
    top: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
}

.u-drawer-bottom {
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
}

.u-drawer-center {
    @include vue-flex;
    flex-direction: column;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    opacity: 0;
    z-index: 99999;
}

.u-mode-center-box {
    min-width: 100rpx;
    min-height: 100rpx;
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    position: relative;
    background-color: #ffffff;
}

.u-drawer-content-visible.u-drawer-center {
    transform: scale(1);
    opacity: 1;
}

.u-animation-zoom {
    transform: scale(1.15);
}

.u-drawer-content-visible {
    transform: translate3D(0px, 0px, 0px) !important;
}

.u-close {
    position: absolute;
    z-index: 3;
}

.u-close--top-left {
    top: 30rpx;
    left: 30rpx;
}

.u-close--top-right {
    top: 30rpx;
    right: 30rpx;
}

.u-close--bottom-left {
    bottom: 30rpx;
    left: 30rpx;
}

.u-close--bottom-right {
    right: 30rpx;
    bottom: 30rpx;
}
</style>
