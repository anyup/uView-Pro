<template>
    <view class="guide-wrapper" :class="{ 'guide-wrapper--active': displayShow }">
        <!-- 目标插槽区域 -->
        <view class="guide-wrapper__target" :style="targetStyle">
            <slot />
        </view>

        <!-- 引导遮罩层 -->
        <view v-if="displayShow" class="demo-guide-overlay" @touchmove.stop.prevent>
            <!-- 全屏蒙层 -->
            <view class="demo-guide-overlay__mask"></view>

            <!-- 气泡提示 -->
            <view class="demo-guide-overlay__bubble" :class="bubbleAnimationClass" :style="bubblePositionStyle">
                <view class="demo-guide-overlay__hand">{{ displayHand }}</view>
                <view class="demo-guide-overlay__text">
                    <text>{{ text }}</text>
                </view>
                <u-button type="primary" size="mini" shape="circle" @click.stop="handleClose">
                    {{ buttonText }}
                </u-button>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { $u } from 'uview-pro';

const props = withDefaults(
    defineProps<{
        show?: boolean;
        storageKey?: string;
        text?: string;
        hand?: string;
        buttonText?: string;
        placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
        position?: string | Record<string, any>;
        immediate?: boolean | string;
    }>(),
    {
        show: false,
        storageKey: '',
        text: '',
        hand: '',
        buttonText: '知道了',
        placement: 'auto',
        position: '',
        immediate: false
    }
);

const emit = defineEmits(['close', 'checkStorage']);
const displayShow = ref(false);
const setDisplayShow = () => {
    if (props.show) {
        displayShow.value = true;
    }
    let showValue = false;
    if (props.storageKey) {
        showValue = !uni.getStorageSync(props.storageKey);
    }
    displayShow.value = props.immediate ? showValue : false;
};

const displayHand = computed(() => {
    if (props.hand) return props.hand;
    switch (props.placement) {
        case 'top':
            return '👇';
        case 'left':
            return '👉';
        case 'right':
            return '👈';
        case 'bottom':
        default:
            return '👆';
    }
});

watch(
    () => [props.show, props.storageKey, props.immediate],
    () => {
        // #ifdef APP-HARMONY
        setDisplayShow;
        // #endif
    }
);

const bubbleAnimationClass = computed(() => {
    const placement = props.placement === 'auto' ? 'bottom' : props.placement;
    return `demo-guide-overlay__bubble--${placement}`;
});

const bubblePositionStyle = computed(() => {
    return $u.toStyle(props.position);
});

const targetStyle = computed(() => {
    const style: Record<string, any> = {};
    if (displayShow.value) {
        // 确保目标元素在最上层
        style.zIndex = 20002;
        style.pointerEvents = 'none';
    }
    return style;
});

const handleClose = () => {
    if (props.storageKey) uni.setStorageSync(props.storageKey, true);
    displayShow.value = false;
    emit('close');
};

function showByStorage() {
    if (props.storageKey) {
        const shown = !uni.getStorageSync(props.storageKey);
        displayShow.value = shown;
    }
}

function show(byStorage = false) {
    if (byStorage) return showByStorage();
    displayShow.value = true;
}

function close() {
    handleClose();
}

onMounted(() => {
    // #ifdef APP-HARMONY
    if (props.storageKey) {
        const shown = !uni.getStorageSync(props.storageKey);
        emit('checkStorage', shown);
    }
    setDisplayShow();
    // #endif
});

defineExpose({
    show,
    close
});
</script>

<style lang="scss" scoped>
.guide-wrapper {
    position: relative;
    display: block;

    &__target {
        position: relative;
    }
}

.demo-guide-overlay {
    position: fixed;
    inset: 0;
    z-index: 20000;
    pointer-events: none; // 遮罩层本身不拦截事件
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &__mask {
        position: absolute;
        inset: 0;
        // background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(8rpx);
        pointer-events: auto; // 允许蒙层拦截所有事件，阻止页面交互
        width: 100%;
        height: 100vh;
    }

    &__bubble {
        position: fixed;
        min-width: 300rpx;
        max-width: 520rpx;
        padding: 24rpx 32rpx;
        border-radius: 16rpx;
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 12rpx 48rpx rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(12rpx);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16rpx;
        z-index: 20003;
        pointer-events: auto;
        animation: bubbleFadeIn 0.3s ease-out;

        &--top {
            animation:
                bubbleFadeIn 0.3s ease-out,
                bubbleFloatTop 1.5s ease-in-out 0.3s infinite;
        }

        &--bottom {
            animation:
                bubbleFadeIn 0.3s ease-out,
                bubbleFloatBottom 1.5s ease-in-out 0.3s infinite;
        }

        &--left {
            animation:
                bubbleFadeIn 0.3s ease-out,
                bubbleFloatLeft 1.5s ease-in-out 0.3s infinite;
        }

        &--right {
            animation:
                bubbleFadeIn 0.3s ease-out,
                bubbleFloatRight 1.5s ease-in-out 0.3s infinite;
        }
    }

    &__hand {
        font-size: 48rpx;
        line-height: 1;
    }

    &__text {
        font-size: 28rpx;
        color: #666;
        line-height: 1.6;
        text-align: center;
        font-weight: 500;
    }
}

@keyframes bubbleFadeIn {
    from {
        opacity: 0;
        transform: translateY(20rpx) scale(0.9);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes bubbleFloatTop {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-12rpx);
    }
}

@keyframes bubbleFloatBottom {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(12rpx);
    }
}

@keyframes bubbleFloatLeft {
    0%,
    100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(-12rpx);
    }
}

@keyframes bubbleFloatRight {
    0%,
    100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(12rpx);
    }
}
</style>
