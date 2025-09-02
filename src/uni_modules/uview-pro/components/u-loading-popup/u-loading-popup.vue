<template>
    <view @touchmove.stop.prevent>
        <view v-if="popupValue" class="u-loading-init" :class="[direction]">
            <u-loading :mode="mode" :color="color" :size="size" />
            <view v-if="currentText" class="u-loading-tips">
                {{ currentText }}
            </view>
        </view>
        <view class="u-loading-mask" :class="[popupValue ? 'u-mask-show' : '']" @click="onMaskClick" />
    </view>
</template>
<script lang="ts" setup>
import { computed, onUnmounted, ref, watch } from 'vue';
import { LoadingPopupProps } from './types';

// 组件props类型
const props = defineProps(LoadingPopupProps);
const emit = defineEmits(['update:modelValue', 'cancel']);

// 自动关闭的持续时间定时器
let durationTimer: ReturnType<typeof setTimeout> | null = null;
// 关闭按钮倒计时定时器
let cancelTimer: ReturnType<typeof setTimeout> | null = null;
// 记录弹窗显示的时间戳
const now = ref(0);
// 点击遮罩层是否可关闭（超时后）
const canClose = ref(false);
// 当前显示的text，优先级：loading参数 > props.text
const currentText = ref(props.text);

const popupValue = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val)
});

watch(
    () => popupValue.value,
    val => {
        if (val) {
            doOpen(currentText.value);
        } else {
            doClose();
        }
    }
);

// 响应 props 变更，自动刷新当前 text
watch(
    () => props.text,
    val => {
        currentText.value = val;
    }
);

// 响应 cancelTime/duration 变化，重启定时器
watch(
    () => [props.cancelTime, props.duration],
    () => {
        if (popupValue.value) {
            clearDurationTimer();
            startCancelTime();
            startDurationTime();
        }
    }
);

/**
 * 启动超时关闭按钮计时
 */
function startCancelTime() {
    clearCancelTimer();
    canClose.value = false;
    if (props.cancelTime > 0) {
        cancelTimer = setTimeout(() => {
            canClose.value = true;
        }, props.cancelTime);
    }
}

/**
 * 启动持续时间计时
 */
function startDurationTime() {
    clearDurationTimer();
    if (props.duration) {
        durationTimer = setTimeout(() => {
            close();
        }, props.duration);
    }
}

/**
 * 内部显示逻辑，初始化所有状态
 */
function doOpen(text?: string) {
    canClose.value = false;
    clearDurationTimer();
    clearCancelTimer();
    now.value = Date.now();
    if (typeof text === 'string' && text !== '') {
        currentText.value = text;
    } else {
        currentText.value = props.text;
    }
    startCancelTime();
    startDurationTime();
}

/**
 * 内部关闭逻辑，重置所有状态
 */
function doClose() {
    canClose.value = false;
    currentText.value = props.text;
    clearDurationTimer();
    clearCancelTimer();
}

/**
 * 显示弹窗
 * @param text 可选，优先显示的文案
 */
function open(text?: string) {
    currentText.value = text || props.text;
    popupValue.value = true;
}

/**
 * 隐藏弹窗
 */
function close() {
    popupValue.value = false;
}

// 清理定时器
function clearDurationTimer() {
    if (durationTimer) {
        clearTimeout(durationTimer);
        durationTimer = null;
    }
}
function clearCancelTimer() {
    if (cancelTimer) {
        clearTimeout(cancelTimer);
        cancelTimer = null;
    }
}

// 遮罩点击事件
function onMaskClick() {
    // 只有显示关闭按钮时才允许关闭
    if (canClose.value) {
        emit('cancel');
        close();
    }
}

onUnmounted(() => {
    clearDurationTimer();
    clearCancelTimer();
});

defineExpose({
    open,
    close
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
    padding: 15rpx 0;
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

        .u-loading-tips {
            margin-top: 0;
            margin-left: 20rpx;
            font-size: 32rpx;
        }
    }
}

.u-loading-tips {
    text-align: center;
    padding: 0 20rpx;
    box-sizing: border-box;
    margin-top: 36rpx;
}
</style>
