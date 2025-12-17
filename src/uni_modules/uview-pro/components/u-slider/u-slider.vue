<template>
    <view
        class="u-slider"
        @tap="onClick"
        :class="[disabled ? 'u-slider--disabled' : '', customClass]"
        :style="$u.toStyle(sliderStyle, customStyle)"
    >
        <view
            v-if="showEdgeValue"
            class="u-slider__edge u-slider__edge--start"
            :class="`u-slider__edge--${edgeValuePosition}`"
        >
            {{ startLabel }}
        </view>
        <view
            v-if="showEdgeValue"
            class="u-slider__edge u-slider__edge--end"
            :class="`u-slider__edge--${edgeValuePosition}`"
        >
            {{ endLabel }}
        </view>
        <view
            class="u-slider__gap"
            :style="
                $u.toStyle(barStyle, {
                    height: height + 'rpx',
                    backgroundColor: activeColor
                })
            "
        >
            <view
                class="u-slider__button-wrap"
                @touchstart="onTouchStart"
                @touchmove="onTouchMove"
                @touchend="onTouchEnd"
                @touchcancel="onTouchEnd"
            >
                <slot v-if="slots.default" />
                <view
                    v-else
                    class="u-slider__button"
                    :style="
                        $u.toStyle(blockStyle, {
                            height: blockWidth + 'rpx',
                            width: blockWidth + 'rpx',
                            backgroundColor: blockColor
                        })
                    "
                />
                <view v-if="showValue" class="u-slider__value" :class="`u-slider__value--${valuePosition}`">
                    {{ displayValue }}
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-slider',
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
import { computed, ref, watch, onMounted, useSlots, getCurrentInstance } from 'vue';
import { $u } from '../..';
import { SliderProps } from './types';

/**
 * slider 滑块选择器
 * @tutorial https://uviewpro.cn/zh/components/slider.html
 * @property {Number | String} value 滑块当前值，位于[start, end]范围内（默认0）
 * @property {Number | String} start 整体范围起点值（默认0）
 * @property {Number | String} end 整体范围终点值（默认100）
 * @property {Number | String} min 有效拖动最小值，需在[start, end]中（默认0）
 * @property {Number | String} max 有效拖动最大值，需在[start, end]中（默认100）
 * @property {Number | String} step 步长（默认1）
 * @property {Number | String} blockWidth 滑块宽度，高等于宽（30）
 * @property {Number | String} height 滑块条高度，单位rpx（默认6）
 * @property {String} inactiveColor 底部条背景颜色（默认var(--u-light-color)）
 * @property {String} activeColor 底部选择部分的背景颜色（默认主题色primary）
 * @property {String} blockColor 滑块颜色（默认var(--u-bg-white)）
 * @property {Object} blockStyle 给滑块自定义样式，对象形式
 * @property {Boolean} disabled 是否禁用滑块(默认为false)
 * @property {Boolean} showValue 是否在滑块上方/下方显示当前数值
 * @property {String} valuePosition 当前数值显示位置，top-上方，bottom-下方（默认top）
 * @property {Boolean} showEdgeValue 是否在起始和结束位置显示数值
 * @property {String} edgeValuePosition 起始和结束数值显示位置，top-上方，bottom-下方（默认top）
 * @event start 滑动触发
 * @event moving 正在滑动中
 * @event end 滑动结束
 * @example <u-slider v-model="value" />
 */

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
const innerValue = ref<number>(0);

const rangeStart = computed(() => Number(props.start));
const rangeEnd = computed(() => Number(props.end));
const rangeTotal = computed(() => {
    const total = rangeEnd.value - rangeStart.value;
    return total === 0 ? 1 : total;
});

const sliderStyle = computed(() => {
    const style = {
        backgroundColor: props.inactiveColor
    } as Record<string, any>;
    if (
        (props.showValue && props.valuePosition === 'top') ||
        (props.showEdgeValue && props.edgeValuePosition === 'top')
    ) {
        style.marginTop = '80rpx';
    }
    if (
        (props.showValue && props.valuePosition === 'bottom') ||
        (props.showEdgeValue && props.edgeValuePosition === 'bottom')
    ) {
        style.marginBottom = '80rpx';
    }
    return style;
});

// 限制min和max在start和end范围内
const effectiveMin = computed(() => {
    const min = Number(props.min);
    return Math.max(rangeStart.value, Math.min(min, rangeEnd.value));
});

const effectiveMax = computed(() => {
    const max = Number(props.max);
    return Math.min(rangeEnd.value, Math.max(max, rangeStart.value));
});

const startLabel = computed(() => props.start);
const endLabel = computed(() => props.end);
const showValue = computed(() => props.showValue);
const valuePosition = computed(() => props.valuePosition || 'top');
const showEdgeValue = computed(() => props.showEdgeValue);
const edgeValuePosition = computed(() => props.edgeValuePosition || 'top');

const displayValue = computed(() => innerValue.value);

// 监听 value 变化，非滑动状态时才更新滑块值
watch(
    () => props.modelValue,
    n => {
        // 只有在非滑动状态时，才可以通过modelValue更新滑块值，这里监听，是为了让用户触发
        if (status.value === 'end') updateValue(n, false);
    }
);

watch(
    () => [props.start, props.end, props.min, props.max],
    () => {
        updateValue(innerValue.value, false);
    },
    { deep: true }
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
    const ratio = distanceX.value / sliderRect.value.width;
    const raw = rangeStart.value + ratio * rangeTotal.value;
    newValue.value = raw;
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
    // 处理为有效值（步进 + min/max 约束），支持负数
    const formatted = format(value);
    innerValue.value = formatted;

    // 计算相对于[start, end]的百分比宽度
    const ratio = (formatted - rangeStart.value) / rangeTotal.value;
    let percent = ratio * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;

    const style: Record<string, any> = {
        width: percent + '%'
    };
    // 移动期间无需过渡动画
    if (drag === true) {
        style.transition = 'none';
    } else {
        // 非移动期间，删掉对过渡为空的声明，让css中的声明起效
        delete style.transition;
    }
    // 修改value值（为实际值而非百分比）
    emit('update:modelValue', formatted);
    barStyle.value = style;
}

/**
 * 格式化滑块值
 * @param value 输入值
 * @returns 处理后的值
 */
function format(value: number | string): number {
    const numeric = Number(value);
    const step = Number(props.step) || 1;
    // 在有效范围内裁剪（effectiveMin和effectiveMax已限制在start和end范围内），支持负数
    const clipped = Math.max(effectiveMin.value, Math.min(numeric, effectiveMax.value));
    // 将值按步长取整，减少对视图的频繁更新
    return Math.round(clipped / step) * step;
}

/**
 * 点击滑块条
 */
function onClick(event: any) {
    if (props.disabled) return;
    // 直接点击滑块的情况，计算为整体[start, end]范围内的值
    const ratio = (event.detail.x - sliderRect.value.left) / sliderRect.value.width;
    const value = rangeStart.value + ratio * rangeTotal.value;
    updateValue(value, false);
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-slider {
    position: relative;
    border-radius: 999px;
    background-color: var(--u-bg-gray-light);
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
    background-color: $u-type-primary;
}

.u-slider__button {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    background-color: var(--u-bg-white);
    cursor: pointer;
}

.u-slider__button-wrap {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate3d(50%, -50%, 0);
}

.u-slider__value {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 22rpx;
    font-weight: 500;
    color: #333;
    white-space: nowrap;
    min-width: 40rpx;
    height: 56rpx;
    line-height: 56rpx;
    padding: 0 10rpx;
    border-radius: 28rpx;
    background-color: #ffffff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
}

.u-slider__value--top {
    bottom: 100%;
    margin-bottom: 12rpx;
}

.u-slider__value--top::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-width: 4px 3px 0 3px;
    border-style: solid;
    border-color: #ffffff transparent transparent transparent;
}

.u-slider__value--bottom {
    top: 100%;
    margin-top: 12rpx;
}

.u-slider__value--bottom::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-width: 0 6rpx 8rpx 6rpx;
    border-style: solid;
    border-color: transparent transparent #ffffff transparent;
}

.u-slider__edge {
    position: absolute;
    font-size: 24rpx;
    color: $u-tips-color;
    white-space: nowrap;
}

.u-slider__edge--start {
    left: 0;
}

.u-slider__edge--end {
    right: 0;
}

.u-slider__edge--top {
    bottom: 100%;
    margin-bottom: 8rpx;
}

.u-slider__edge--bottom {
    top: 100%;
    margin-top: 8rpx;
}

.u-slider--disabled {
    opacity: 0.5;
}
</style>
