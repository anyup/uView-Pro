<template>
    <view
        class="u-count-num"
        :style="{
            fontSize: props.fontSize + 'rpx',
            fontWeight: props.bold ? 'bold' : 'normal',
            color: props.color
        }"
    >
        {{ displayValue }}
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { CountToProps } from './types';

defineOptions({ name: 'u-count-to' });

/**
 * countTo 数字滚动
 * @description 该组件一般用于需要滚动数字到某一个值的场景，目标要求是一个递增的值。
 * @tutorial https://uviewpro.cn/zh/components/countTo.html
 * @property {String | Number} start-val 开始值
 * @property {String | Number} end-val 结束值
 * @property {String | Number} duration 滚动过程所需的时间，单位ms（默认2000）
 * @property {Boolean} autoplay 是否自动开始滚动（默认true）
 * @property {String | Number} decimals 要显示的小数位数，见官网说明（默认0）
 * @property {Boolean} use-easing 滚动结束时，是否缓动结尾，见官网说明（默认true）
 * @property {String} separator 千位分隔符，见官网说明
 * @property {String} color 字体颜色（默认#303133）
 * @property {String | Number} font-size 字体大小，单位rpx（默认50）
 * @property {Boolean} bold 字体是否加粗（默认false）
 * @event {Function} end 数值滚动到目标值时触发
 * @example <u-count-to ref="uCountTo" :end-val="endVal" :autoplay="autoplay"></u-count-to>
 */

const emit = defineEmits(['end']);

const props = defineProps(CountToProps);

const localStartVal = ref(Number(props.startVal));
const displayValue = ref(formatNumber(props.startVal));
const printVal = ref<number | null>(null);
const paused = ref(false); // 是否暂停
const localDuration = ref(Number(props.duration));
const startTime = ref<number | null>(null); // 开始的时间
const timestamp = ref<number | null>(null); // 时间戳
const remaining = ref<number | null>(null); // 停留的时间
const rAF = ref<number | null>(null);
const lastTime = ref(0); // 上一次的时间

/**
 * 是否倒计时
 */
const countDown = computed(() => Number(props.startVal) > Number(props.endVal));

watch(
    () => props.startVal,
    () => {
        if (props.autoplay) start();
    }
);
watch(
    () => props.endVal,
    () => {
        if (props.autoplay) start();
    }
);

onMounted(() => {
    if (props.autoplay) start();
});

/**
 * 缓动函数
 */
function easingFn(t: number, b: number, c: number, d: number): number {
    return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
}

/**
 * requestAnimationFrame polyfill
 */
function requestAnimationFrame(callback: (ts: number) => void): number {
    const currTime = new Date().getTime();
    // 为了使setTimteout的尽可能的接近每秒60帧的效果
    const timeToCall = Math.max(0, 16 - (currTime - lastTime.value));
    const id = setTimeout(() => {
        callback(currTime + timeToCall);
    }, timeToCall);
    lastTime.value = currTime + timeToCall;
    return id as unknown as number;
}

/**
 * 取消动画帧
 */
function cancelAnimationFrame(id: number | null) {
    if (id) clearTimeout(id);
}

/**
 * 开始滚动数字
 */
function start() {
    localStartVal.value = Number(props.startVal);
    startTime.value = null;
    localDuration.value = Number(props.duration);
    paused.value = false;
    rAF.value = requestAnimationFrame(count);
}

/**
 * 暂停/恢复滚动
 * 暂定状态，重新再开始滚动；或者滚动状态下，暂停
 */
function reStart() {
    if (paused.value) {
        resume();
        paused.value = false;
    } else {
        stop();
        paused.value = true;
    }
}

/**
 * 暂停
 */
function stop() {
    cancelAnimationFrame(rAF.value);
}

/**
 * 重新开始(暂停的情况下)
 */
function resume() {
    startTime.value = null;
    localDuration.value = remaining.value || Number(props.duration);
    localStartVal.value = printVal.value || Number(props.startVal);
    rAF.value = requestAnimationFrame(count);
}

/**
 * 重置
 */
function reset() {
    startTime.value = null;
    cancelAnimationFrame(rAF.value);
    displayValue.value = formatNumber(props.startVal);
}

/**
 * 数字滚动动画主逻辑
 */
function count(ts: number) {
    if (!startTime.value) startTime.value = ts;
    timestamp.value = ts;
    const progress = ts - (startTime.value || 0);
    remaining.value = localDuration.value - progress;
    let val: number;
    if (props.useEasing) {
        if (countDown.value) {
            val = localStartVal.value - easingFn(progress, 0, localStartVal.value - Number(props.endVal), localDuration.value);
        } else {
            val = easingFn(progress, localStartVal.value, Number(props.endVal) - localStartVal.value, localDuration.value);
        }
    } else {
        if (countDown.value) {
            val = localStartVal.value - (localStartVal.value - Number(props.endVal)) * (progress / localDuration.value);
        } else {
            val = localStartVal.value + (Number(props.endVal) - localStartVal.value) * (progress / localDuration.value);
        }
    }
    if (countDown.value) {
        val = val < Number(props.endVal) ? Number(props.endVal) : val;
    } else {
        val = val > Number(props.endVal) ? Number(props.endVal) : val;
    }
    printVal.value = val;
    displayValue.value = formatNumber(val);
    if (progress < localDuration.value) {
        rAF.value = requestAnimationFrame(count);
    } else {
        emit('end');
    }
}

/**
 * 判断是否数字
 */
function isNumber(val: unknown): boolean {
    return !isNaN(parseFloat(String(val)));
}

/**
 * 格式化数字
 */
function formatNumber(num: unknown): string {
    // 将num转为Number类型，因为其值可能为字符串数值，调用toFixed会报错
    let n = Number(num);
    n = Number(n.toFixed(Number(props.decimals)));
    let str = n + '';
    const x = str.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? String(props.decimal) + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    if (props.separator && !isNumber(props.separator)) {
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + props.separator + '$2');
        }
    }
    return x1 + x2;
}

// 销毁时清理动画帧
onUnmounted(() => {
    cancelAnimationFrame(rAF.value);
});

// 暴露给父组件的函数
defineExpose({
    start,
    stop,
    reStart,
    resume,
    reset
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-count-num {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    text-align: center;
}
</style>
