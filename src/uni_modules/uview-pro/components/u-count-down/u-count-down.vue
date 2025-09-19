<template>
    <view class="u-countdown">
        <view class="u-countdown-item" :style="[itemStyle]" v-if="props.showDays && (props.hideZeroDay || (!props.hideZeroDay && d != '00'))">
            <view class="u-countdown-time" :style="[letterStyle]">
                {{ d }}
            </view>
        </view>
        <view
            class="u-countdown-colon"
            :style="{ fontSize: props.separatorSize + 'rpx', color: props.separatorColor, paddingBottom: props.separator == 'colon' ? '4rpx' : 0 }"
            v-if="props.showDays && (props.hideZeroDay || (!props.hideZeroDay && d != '00'))"
        >
            {{ props.separator == 'colon' && props.showHours ? ':' : '天' }}
        </view>
        <view class="u-countdown-item" :style="[itemStyle]" v-if="props.showHours">
            <view class="u-countdown-time" :style="{ fontSize: props.fontSize + 'rpx', color: props.color }">
                {{ h }}
            </view>
        </view>
        <view
            class="u-countdown-colon"
            :style="{ fontSize: props.separatorSize + 'rpx', color: props.separatorColor, paddingBottom: props.separator == 'colon' ? '4rpx' : 0 }"
            v-if="props.showHours"
        >
            {{ props.separator == 'colon' && props.showMinutes ? ':' : '时' }}
        </view>
        <view class="u-countdown-item" :style="[itemStyle]" v-if="props.showMinutes">
            <view class="u-countdown-time" :style="{ fontSize: props.fontSize + 'rpx', color: props.color }">
                {{ i }}
            </view>
        </view>
        <view
            class="u-countdown-colon"
            :style="{ fontSize: props.separatorSize + 'rpx', color: props.separatorColor, paddingBottom: props.separator == 'colon' ? '4rpx' : 0 }"
            v-if="props.showMinutes"
        >
            {{ props.separator == 'colon' && props.showSeconds ? ':' : '分' }}
        </view>
        <view class="u-countdown-item" :style="[itemStyle]" v-if="props.showSeconds">
            <view class="u-countdown-time" :style="{ fontSize: props.fontSize + 'rpx', color: props.color }">
                {{ s }}
            </view>
        </view>
        <view
            class="u-countdown-colon"
            :style="{ fontSize: props.separatorSize + 'rpx', color: props.separatorColor, paddingBottom: 0 }"
            v-if="props.showSeconds && props.separator == 'zh'"
        >
            秒
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { CountDownProps } from './types';

defineOptions({ name: 'u-count-down' });

/**
 * countDown 倒计时
 * @description 该组件一般使用于某个活动的截止时间上，通过数字的变化，给用户明确的时间感受，提示用户进行某一个行为操作。
 * @tutorial https://uviewpro.cn/zh/components/countDown.html
 * @property {String | Number} timestamp 倒计时，单位为秒
 * @property {Boolean} autoplay 是否自动开始倒计时，如果为false，需手动调用开始方法。见官网说明（默认true）
 * @property {String} separator 分隔符，colon为英文冒号，zh为中文（默认colon）
 * @property {String | Number} separator-size 分隔符的字体大小，单位rpx（默认30）
 * @property {String} separator-color 分隔符的颜色（默认#303133）
 * @property {String | Number} font-size 倒计时字体大小，单位rpx（默认30）
 * @property {Boolean} show-border 是否显示倒计时数字的边框（默认false）
 * @property {Boolean} hide-zero-day 当"天"的部分为0时，隐藏该字段 （默认true）
 * @property {String} border-color 数字边框的颜色（默认#303133）
 * @property {String} bg-color 倒计时数字的背景颜色（默认#ffffff）
 * @property {String} color 倒计时数字的颜色（默认#303133）
 * @property {String | Number} height 数字高度值(宽度等同此值)，设置边框时看情况是否需要设置此值，单位rpx（默认auto）
 * @property {Boolean} show-days 是否显示倒计时的"天"部分（默认true）
 * @property {Boolean} show-hours 是否显示倒计时的"时"部分（默认true）
 * @property {Boolean} show-minutes 是否显示倒计时的"分"部分（默认true）
 * @property {Boolean} show-seconds 是否显示倒计时的"秒"部分（默认true）
 * @event {Function} end 倒计时结束
 * @event {Function} change 每秒触发一次，回调为当前剩余的倒计秒数
 * @example <u-count-down ref="uCountDown" :timestamp="86400" :autoplay="false"></u-count-down>
 */

const emit = defineEmits(['end', 'change']);

const props = defineProps(CountDownProps);

const d = ref('00'); // 天
const h = ref('00'); // 小时
const i = ref('00'); // 分钟
const s = ref('00'); // 秒
const timer = ref<number | null>(null); // 定时器类型修正
const seconds = ref(0);

/**
 * 倒计时item的样式，item为分别的时分秒部分的数字
 */
const itemStyle = computed(() => {
    const style: Record<string, string> = {};
    if (props.height) {
        style.height = props.height + 'rpx';
        style.width = props.height + 'rpx';
    }
    if (props.showBorder) {
        style.borderStyle = 'solid';
        style.borderColor = props.borderColor;
        style.borderWidth = '1px';
    }
    if (props.bgColor) {
        style.backgroundColor = props.bgColor;
    }
    return style;
});

/**
 * 倒计时数字的样式
 */
const letterStyle = computed(() => {
    const style: Record<string, string> = {};
    if (props.fontSize) style.fontSize = props.fontSize + 'rpx';
    if (props.color) style.color = props.color;
    return style;
});

// 监听时间戳的变化
watch(
    () => props.timestamp,
    (newVal, oldVal) => {
        // 如果倒计时间发生变化，清除定时器，重新开始倒计时
        clearTimer();
        start();
    }
);

onMounted(() => {
    // 如果自动倒计时
    if (props.autoplay && props.timestamp) {
        start();
    }
});

/**
 * 倒计时
 */
function start() {
    // 避免可能出现的倒计时重叠情况
    clearTimer();
    if (Number(props.timestamp) <= 0) return;
    seconds.value = Number(props.timestamp);
    formatTime(seconds.value);
    timer.value = setInterval(() => {
        seconds.value--;
        // 发出change事件
        emit('change', seconds.value);
        if (seconds.value < 0) {
            end();
            return;
        }
        formatTime(seconds.value);
    }, 1000);
}

/**
 * 格式化时间
 */
function formatTime(sec: number) {
    // 小于等于0的话，结束倒计时
    if (sec <= 0) end();
    let dayNum = Math.floor(sec / (60 * 60 * 24));
    let hourNum = Math.floor(sec / (60 * 60)) - dayNum * 24;
    // showHour为需要显示的小时
    let showHour: string;
    // 判断是否显示“天”参数，如果不显示，将天部分的值，加入到小时中
    // hour为给后面计算秒和分等用的(基于显示天的前提下计算)
    if (props.showDays) {
        showHour = hourNum < 10 ? '0' + hourNum : String(hourNum);
    } else {
        // 如果不显示天数，将“天”部分的时间折算到小时中去
        // 如果小于10，在前面补上一个"0"
        const hourTotal = Math.floor(sec / (60 * 60));
        showHour = hourTotal < 10 ? '0' + hourTotal : String(hourTotal);
    }
    let minuteNum = Math.floor(sec / 60) - hourNum * 60 - dayNum * 24 * 60;
    let secondNum = Math.floor(sec) - dayNum * 24 * 60 * 60 - hourNum * 60 * 60 - minuteNum * 60;
    const minute = minuteNum < 10 ? '0' + minuteNum : String(minuteNum);
    const second = secondNum < 10 ? '0' + secondNum : String(secondNum);
    const day = dayNum < 10 ? '0' + dayNum : String(dayNum);
    d.value = day;
    h.value = showHour;
    i.value = minute;
    s.value = second;
}

/**
 * 停止倒计时
 */
function end() {
    clearTimer();
    emit('end', {});
}

/**
 * 清除定时器
 */
function clearTimer() {
    if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
    }
}

defineExpose({
    start,
    end
});
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-countdown {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    align-items: center;
}

.u-countdown-item {
    @include vue-flex;
    align-items: center;
    justify-content: center;
    padding: 2rpx;
    border-radius: 6rpx;
    white-space: nowrap;
    transform: translateZ(0);
}

.u-countdown-time {
    margin: 0;
    padding: 0;
    line-height: 1;
}

.u-countdown-colon {
    @include vue-flex;
    justify-content: center;
    padding: 0 5rpx;
    line-height: 1;
    align-items: center;
    padding-bottom: 4rpx;
}

.u-countdown-scale {
    transform: scale(0.9);
    transform-origin: center center;
}
</style>
