<template>
    <view
        class="u-slider"
        @tap="onClick"
        :class="[disabled ? 'u-slider--disabled' : '']"
        :style="{
            backgroundColor: inactiveColor
        }"
    >
        <view
            class="u-slider__gap"
            :style="[
                barStyle,
                {
                    height: height + 'rpx',
                    backgroundColor: activeColor
                }
            ]"
        >
            <view class="u-slider__button-wrap" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
                <slot v-if="slots.default" />
                <view
                    v-else
                    class="u-slider__button"
                    :style="[
                        blockStyle,
                        {
                            height: blockWidth + 'rpx',
                            width: blockWidth + 'rpx',
                            backgroundColor: blockColor
                        }
                    ]"
                />
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
/**
 * slider 滑块选择器
 * @tutorial https://uviewpro.cn/zh/components/slider.html
 * @property {Number | String} value 滑块默认值（默认0）
 * @property {Number | String} min 最小值（默认0）
 * @property {Number | String} max 最大值（默认100）
 * @property {Number | String} step 步长（默认1）
 * @property {Number | String} blockWidth 滑块宽度，高等于宽（30）
 * @property {Number | String} height 滑块条高度，单位rpx（默认6）
 * @property {String} inactiveColor 底部条背景颜色（默认#c0c4cc）
 * @property {String} activeColor 底部选择部分的背景颜色（默认#2979ff）
 * @property {String} blockColor 滑块颜色（默认#ffffff）
 * @property {Object} blockStyle 给滑块自定义样式，对象形式
 * @property {Boolean} disabled 是否禁用滑块(默认为false)
 * @event start 滑动触发
 * @event moving 正在滑动中
 * @event end 滑动结束
 * @example <u-slider v-model="value" />
 */
import { ref, watch, onMounted, useSlots, getCurrentInstance } from 'vue';
import { $u } from '../..';
import { SliderProps } from './types';

defineOptions({ name: 'u-slider' });

const emit = defineEmits(['update:modelValue', 'start', 'moving', 'end']);

const props = defineProps(SliderProps);

const slots = useSlots();
const instance = getCurrentInstance();

// 滑块条的尺寸信息
const sliderRect = ref<{ left: number; width: number }>({ left: 0, width: 0 });
const startX = ref(0);
const status = ref<'start' | 'moving' | 'end'>('end');
const newValue = ref(0);
const distanceX = ref(0);
const startValue = ref(0);
const barStyle = ref<Record<string, any>>({});

// 监听 value 变化，非滑动状态时才更新滑块值
watch(
    () => props.modelValue,
    n => {
        // 只有在非滑动状态时，才可以通过modelValue更新滑块值，这里监听，是为了让用户触发
        if (status.value === 'end') updateValue(props.modelValue, false);
    }
);

onMounted(() => {
    // 获取滑块条的尺寸信息
    $u.getRect('.u-slider', instance).then((rect: { left: number; width: number }) => {
        sliderRect.value = rect;
    });
    updateValue(props.modelValue, false);
});

/**
 * 触摸开始
 */
function onTouchStart(event: TouchEvent) {
    if (props.disabled) return;
    startX.value = 0;
    // 触摸点集
    const touches = event.touches[0];
    // 触摸点到屏幕左边的距离
    startX.value = touches.clientX;
    // 此处的props.modelValue虽为props值，但是通过emit('update:modelValue')进行了修改
    startValue.value = format(props.modelValue);
    // 标示当前的状态为开始触摸滑动
    status.value = 'start';
}

/**
 * 触摸移动
 */
function onTouchMove(event: TouchEvent) {
    if (props.disabled) return;
    // 连续触摸的过程会一直触发本方法，但只有手指触发且移动了才被认为是拖动了，才发出事件
    // 触摸后第一次移动已经将status设置为moving状态，故触摸第二次移动不会触发本事件
    if (status.value === 'start') emit('start');
    const touches = event.touches[0];
    // 滑块的左边不一定跟屏幕左边接壤，所以需要减去最外层父元素的左边值
    distanceX.value = touches.clientX - sliderRect.value.left;
    // 获得移动距离对整个滑块的百分比值，此为带有多位小数的值，不能用此更新视图
    // 否则造成通信阻塞，需要每改变一个step值时修改一次视图
    newValue.value = (distanceX.value / sliderRect.value.width) * 100;
    status.value = 'moving';
    // 发出moving事件
    emit('moving');
    updateValue(newValue.value, true);
}

/**
 * 触摸结束
 */
function onTouchEnd() {
    if (props.disabled) return;
    if (status.value === 'moving') {
        updateValue(newValue.value, false);
        emit('end');
    }
    status.value = 'end';
}

/**
 * 更新滑块值
 * @param value 新值
 * @param drag 是否为拖动
 */
function updateValue(value: number | string, drag: boolean) {
    // 去掉小数部分，同时也是对step步进的处理
    const width = format(value);
    // 不允许滑动的值超过max最大值，百分比也不能超过100
    if (width > Number(props.max) || width > 100) return;
    // 设置移动的百分比值
    const style: Record<string, any> = {
        width: width + '%'
    };
    // 移动期间无需过渡动画
    if (drag === true) {
        style.transition = 'none';
    } else {
        // 非移动期间，删掉对过渡为空的声明，让css中的声明起效
        delete style.transition;
    }
    // 修改value值
    emit('update:modelValue', width);
    barStyle.value = style;
}

/**
 * 格式化滑块值
 * @param value 输入值
 * @returns 处理后的值
 */
function format(value: number | string): number {
    // 将小数变成整数，为了减少对视图的更新，造成视图层与逻辑层的阻塞
    return Math.round(Math.max(Number(props.min), Math.min(Number(value), Number(props.max))) / Number(props.step)) * Number(props.step);
}

/**
 * 点击滑块条
 */
function onClick(event: any) {
    if (props.disabled) return;
    // 直接点击滑块的情况，计算方式与onTouchMove方法相同
    const value = ((event.detail.x - sliderRect.value.left) / sliderRect.value.width) * 100;
    updateValue(value, false);
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-slider {
    position: relative;
    border-radius: 999px;
    background-color: #ebedf0;
}

.u-slider:before {
    position: absolute;
    right: 0;
    left: 0;
    content: '';
    top: -8px;
    bottom: -8px;
    z-index: -1;
}

.u-slider__gap {
    position: relative;
    border-radius: inherit;
    transition: width 0.2s;
    background-color: #1989fa;
}

.u-slider__button {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    background-color: #fff;
    cursor: pointer;
}

.u-slider__button-wrap {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate3d(50%, -50%, 0);
}

.u-slider--disabled {
    opacity: 0.5;
}
</style>
