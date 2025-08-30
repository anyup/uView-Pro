<template>
    <view @touchmove.stop.prevent>
        <view v-if="popupValue" class="u-loading-init" :class="[direction]">
            <view class="u-loading-center"></view>
            <view v-if="currentText" class="u-loading-tips">{{ currentText }}</view>
        </view>
        <view class="u-loading-mask" :class="[popupValue ? 'u-mask-show' : '']" @click="onMaskClick"></view>
    </view>
</template>

<script lang="ts" setup>
import { ref, watch, onUnmounted, computed } from 'vue';
import { LoadingPopupProps } from './types';

// 组件props类型
const props = defineProps(LoadingPopupProps);
const emit = defineEmits(['update:modelValue', 'cancel']);

// 定时器
let timer: ReturnType<typeof setTimeout> | null = null;
// 记录弹窗显示的时间戳
const now = ref(0);
// 是否显示关闭按钮（超时后）
const closeShow = ref(false);
// 当前显示的text，优先级：loading参数 > props.text
const currentText = ref(props.text);

const popupValue = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val)
});

// 监听props.text变化，自动同步到currentText（仅在未手动传入text时）
watch(
    () => props.text,
    val => {
        if (!currentText.value || currentText.value === '' || currentText.value === undefined) {
            currentText.value = val;
        }
    }
);

// 启动超时关闭按钮计时
function startTime() {
    setTimeout(() => {
        closeShow.value = true;
    }, props.cancelTime);
}

// loading主逻辑，支持传入text，优先显示传入的text
function show(text?: string) {
    console.log('show');
    if (typeof text === 'string' && text !== '') {
        currentText.value = text;
    } else {
        currentText.value = props.text;
    }
    startTime();
    clearTimer();
    now.value = Date.now();
    if (props.duration) {
        timer = setTimeout(() => {
            hide();
        }, props.duration);
    }
    emit('update:modelValue', true);
}

// 清理定时器
function clearTimer() {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
}

// 完成加载，关闭弹窗
function hide() {
    console.log('hide');
    closeShow.value = false;
    clearTimer();
    // 关闭时重置currentText为props.text，避免下次未传text时显示旧内容
    currentText.value = props.text;
    emit('update:modelValue', false);
}

// 遮罩点击事件
function onMaskClick() {
    if (Date.now() - now.value > props.cancelTime) {
        emit('cancel');
        hide();
    }
}

onUnmounted(() => {
    clearTimer();
});

defineExpose({
    show,
    hide
});
</script>

<style lang="scss">
.u-loading-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 9999996;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    visibility: hidden;
}

.u-mask-show {
    visibility: visible;
    opacity: 1;
}

.u-loading-init {
    position: relative;
    min-width: 200rpx;
    min-height: 200rpx;
    max-width: 500rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    font-size: 30rpx;
    color: #fff;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 7px;
    .u-icon-close {
        position: absolute;
        top: 4rpx;
        right: 2rpx;
        color: #ffffff;
        opacity: 0.8;
    }
    &.horizontal {
        flex-direction: row;
        align-items: center;
        justify-content: left;
        width: 600rpx;
        max-width: 600rpx;
        min-height: 150rpx;
        padding-left: 40rpx;
        .u-loading-center {
            width: 70rpx;
            height: 70rpx;
        }
        .u-loading-tips {
            margin-top: 0;
            margin-left: 20rpx;
            font-size: 32rpx;
        }
    }
}

.u-loading-center {
    width: 60rpx;
    height: 60rpx;
    border: 3px solid #fff;
    border-color: #8f8d8e #8f8d8e #8f8d8e #ffffff;
    border-radius: 50%;
    margin: 0 6px;
    display: inline-block;
    vertical-align: middle;
    /* clip-path: polygon(0% 0%, 100% 0%, 100% 60%, 0% 60%); */
    animation: rotate 1s linear infinite;
}

.u-loading-tips {
    text-align: center;
    padding: 0 20rpx;
    box-sizing: border-box;
    margin-top: 36rpx;
}

@-webkit-keyframes rotate {
    from {
        transform: rotatez(0deg);
    }

    to {
        transform: rotatez(360deg);
    }
}

@keyframes rotate {
    from {
        transform: rotatez(0deg);
    }

    to {
        transform: rotatez(360deg);
    }
}
</style>
