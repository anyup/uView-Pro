<template>
    <view class="u-code-wrap">
        <!-- 此组件功能由js完成，无需写html逻辑 -->
    </view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { VerificationCodeProps } from './types';

defineOptions({ name: 'u-verification-code' });

/**
 * verificationCode 验证码输入框
 * @description 考虑到用户实际发送验证码的场景，可能是一个按钮，也可能是一段文字，提示语各有不同，所以本组件不提供界面显示，只提供提示语，由用户将提示语嵌入到具体的场景
 * @tutorial https://uviewpro.cn/zh/components/verificationCode.html
 * @property {Number|String} seconds 倒计时所需的秒数（默认60）
 * @property {String} startText 开始前的提示语，见官网说明（默认获取验证码）
 * @property {String} changeText 倒计时期间的提示语，必须带有字母"x"，见官网说明（默认X秒重新获取）
 * @property {String} endText 倒计时结束的提示语，见官网说明（默认重新获取）
 * @property {Boolean} keepRunning 是否在H5刷新或各端返回再进入时继续倒计时（默认false）
 * @property {String} uniqueKey 区分多个页面或多个倒计时组件本地存储的key
 * @event change 倒计时期间，每秒触发一次
 * @event start 开始倒计时触发
 * @event end 结束倒计时触发
 * @example <u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" />
 */

const emit = defineEmits(['change', 'start', 'end']);

const props = defineProps(VerificationCodeProps);

/** 当前倒计时秒数 */
const secNum = ref(Number(props.seconds));
/** 定时器句柄 */
let timer: ReturnType<typeof setInterval> | null = null;
/** 是否可以执行验证码操作 */
const canGetCode = ref(true);

// 监听 seconds 变化，重置倒计时秒数
watch(
    () => props.seconds,
    n => {
        secNum.value = Number(n);
    },
    { immediate: true }
);

onMounted(() => {
    checkKeepRunning();
});

onBeforeUnmount(() => {
    setTimeToStorage();
    if (timer) clearTimeout(timer);
    timer = null;
});

/**
 * 检查是否需要继续上一次的倒计时
 * @description 用于H5刷新或各端返回再进入时继续倒计时
 */
function checkKeepRunning() {
    // 获取上一次退出页面(H5还包括刷新)时的时间戳，如果没有上次的保存，此值可能为空
    const lastTimestamp = Number(uni.getStorageSync(props.uniqueKey + '_$uCountDownTimestamp'));
    if (!lastTimestamp) return changeEvent(props.startText);
    // 当前秒的时间戳
    const nowTimestamp = Math.floor(+new Date() / 1000);
    // 判断当前的时间戳，是否小于上一次的本该按设定结束，却提前结束的时间戳
    if (props.keepRunning && lastTimestamp && lastTimestamp > nowTimestamp) {
        // 剩余尚未执行完的倒计秒数
        secNum.value = lastTimestamp - nowTimestamp;
        // 清除本地保存的变量
        uni.removeStorageSync(props.uniqueKey + '_$uCountDownTimestamp');
        // 开始倒计时
        start();
    } else {
        // 如果不存在需要继续上一次的倒计时，执行正常的逻辑
        changeEvent(props.startText);
    }
}

/**
 * 开始倒计时
 * @description 防止快速点击获取验证码的按钮而导致内部产生多个定时器导致混乱
 */
function start() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    emit('start');
    canGetCode.value = false;
    // 一开始时就提示，否则要等setInterval的1秒后才会有提示
    changeEvent(props.changeText.replace(/x|X/, String(secNum.value)));
    setTimeToStorage();
    timer = setInterval(() => {
        if (--secNum.value) {
            // 用当前倒计时的秒数替换提示字符串中的"x"字母
            changeEvent(props.changeText.replace(/x|X/, String(secNum.value)));
        } else {
            clearInterval(timer!);
            timer = null;
            changeEvent(props.endText);
            secNum.value = Number(props.seconds);
            emit('end');
            canGetCode.value = true;
        }
    }, 1000);
}

/**
 * 重置，可以让用户再次获取验证码
 */
function reset() {
    canGetCode.value = true;
    if (timer) clearInterval(timer);
    timer = null;
    secNum.value = Number(props.seconds);
    changeEvent(props.endText);
}

/**
 * 触发 change 事件
 * @param text 当前提示文本
 */
function changeEvent(text: string) {
    emit('change', text);
}

/**
 * 保存时间戳，为了防止倒计时尚未结束，H5刷新或者各端的右上角返回上一页再进来
 */
function setTimeToStorage() {
    if (!props.keepRunning || !timer) return;
    // 记录当前的时间戳，为了下次进入页面，如果还在倒计时内的话，继续倒计时
    // 倒计时尚未结束，结果大于0；倒计时已经开始，就会小于初始值，如果等于初始值，说明没有开始倒计时，无需处理
    if (secNum.value > 0 && secNum.value <= Number(props.seconds)) {
        // 获取当前时间戳(+ new Date()为特殊写法)，除以1000变成秒，再去除小数部分
        const nowTimestamp = Math.floor(+new Date() / 1000);
        // 将本该结束时候的时间戳保存起来 => 当前时间戳 + 剩余的秒数
        uni.setStorage({
            key: props.uniqueKey + '_$uCountDownTimestamp',
            data: nowTimestamp + Number(secNum.value)
        });
    }
}
defineExpose({
    start,
    reset,
    canGetCode
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-code-wrap {
    width: 0;
    height: 0;
    position: fixed;
    z-index: -1;
}
</style>
