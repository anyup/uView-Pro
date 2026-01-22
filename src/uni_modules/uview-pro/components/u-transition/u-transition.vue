<template>
    <view
        v-if="rendered"
        ref="rootRef"
        class="u-transition"
        :class="[customClass, animationClass]"
        :style="$u.toStyle(animationStyle, customStyle)"
        @animationstart="handleAnimationStart"
        @animationend="handleAnimationEnd"
    >
        <slot />
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-transition',
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
import { computed, nextTick, ref, watch } from 'vue';
import { TransitionProps } from './types';
import { $u } from '../..';
import type { TransitionDuration } from '../../types/global';

/**
 * transition 过渡动画
 * @description 统一的过渡与进出场动效封装，支持多种预设动画和自定义时长。
 * @tutorial https://uviewpro.cn/zh/components/transition.html
 * @property {Boolean} show 是否展示内容（默认true）
 * @property {String} name 预设动画名，可选 fade/slide-up/slide-down/slide-left/slide-right/zoom-in/zoom-out（默认fade）
 * @property {String} mode 进入/离开过渡模式，等同于原生 transition 的 mode（默认空）
 * @property {Number|Object} duration 进入/离开动画时长，单位ms，支持 { enter, leave }（默认300）
 * @property {String} timing-function 动画曲线（默认cubic-bezier(0.2,0.8,0.2,1)）
 * @property {Number} delay 动画延迟，单位ms（默认0）
 * @property {Boolean} appear 首次渲染时是否执行动画（默认false）
 * @property {String} custom-class 自定义 class
 * @property {String|Object} custom-style 自定义样式
 * @example <u-transition :show="visible" name="slide-up"><view>content</view></u-transition>
 */

const props = defineProps(TransitionProps);

const emit = defineEmits([
    'before-enter',
    'enter',
    'after-enter',
    'enter-cancelled',
    'before-leave',
    'leave',
    'after-leave',
    'leave-cancelled'
]);

const normalizeDuration = (duration: number | TransitionDuration) => {
    if (typeof duration === 'number') {
        return {
            enter: duration,
            leave: duration
        };
    }
    return {
        enter: duration?.enter ?? 300,
        leave: duration?.leave ?? duration?.enter ?? 300
    };
};

const rootRef = ref();
const rendered = ref<boolean>(props.show);
const animationPhase = ref<'enter' | 'leave' | ''>('');
const animating = ref(false);
const initialized = ref(false);

const transitionDuration = computed(() => normalizeDuration(props.duration));

const animationStyle = computed(() => {
    const currentDuration =
        animationPhase.value === 'leave' ? transitionDuration.value.leave : transitionDuration.value.enter;
    return {
        '--u-transition-duration-enter': `${transitionDuration.value.enter}ms`,
        '--u-transition-duration-leave': `${transitionDuration.value.leave}ms`,
        '--u-transition-delay': `${props.delay}ms`,
        '--u-transition-timing': props.timingFunction,
        animationDuration: `${currentDuration}ms`,
        animationDelay: `${props.delay}ms`,
        animationTimingFunction: props.timingFunction
    };
});

const animationClass = computed(() => {
    if (!animationPhase.value) {
        return '';
    }
    return `u-transition-${props.name}-${animationPhase.value}`;
});

const getEl = () => rootRef.value as any;

const startEnter = () => {
    if (animating.value && animationPhase.value === 'enter') {
        return;
    }
    if (animating.value && animationPhase.value === 'leave') {
        emit('leave-cancelled', getEl());
    }
    rendered.value = true;
    animationPhase.value = 'enter';
    animating.value = true;
    emit('before-enter', getEl());
};

const startLeave = () => {
    if (!rendered.value) {
        return;
    }
    if (animating.value && animationPhase.value === 'leave') {
        return;
    }
    if (animating.value && animationPhase.value === 'enter') {
        emit('enter-cancelled', getEl());
    }
    animationPhase.value = 'leave';
    animating.value = true;
    emit('before-leave', getEl());
};

const handleAnimationStart = () => {
    if (animationPhase.value === 'enter') {
        emit('enter', getEl());
    } else if (animationPhase.value === 'leave') {
        emit('leave', getEl());
    }
};

const handleAnimationEnd = () => {
    if (animationPhase.value === 'enter') {
        animating.value = false;
        animationPhase.value = '';
        emit('after-enter', getEl());
        return;
    }
    if (animationPhase.value === 'leave') {
        animating.value = false;
        animationPhase.value = '';
        rendered.value = false;
        emit('after-leave', getEl());
    }
};

// 根据mode处理动画顺序（主要用于快速切换时的时序控制）
const shouldWaitForAnimation = (newPhase: 'enter' | 'leave') => {
    if (!animating.value) return false;

    const currentPhase = animationPhase.value;

    // 如果当前正在进行相反的动画，根据mode决定是否需要等待
    if (props.mode === 'out-in' && currentPhase === 'leave' && newPhase === 'enter') {
        return true; // 等待离开动画完成
    }
    if (props.mode === 'in-out' && currentPhase === 'enter' && newPhase === 'leave') {
        return true; // 等待进入动画完成
    }

    return false;
};

watch(
    () => props.show,
    value => {
        if (!initialized.value) {
            initialized.value = true;
            if (value) {
                rendered.value = true;
                if (props.appear) {
                    nextTick(() => startEnter());
                }
            } else {
                rendered.value = false;
            }
            return;
        }
        if (value) {
            if (shouldWaitForAnimation('enter')) {
                // 根据mode等待当前动画完成后再开始进入动画
                // 简单的方式：延迟到下一个tick检查
                nextTick(() => {
                    if (!animating.value) {
                        startEnter();
                    }
                });
            } else {
                startEnter();
            }
        } else {
            if (shouldWaitForAnimation('leave')) {
                // 根据mode等待当前动画完成后再开始离开动画
                nextTick(() => {
                    if (!animating.value) {
                        startLeave();
                    }
                });
            } else {
                startLeave();
            }
        }
    },
    { immediate: true }
);
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-transition {
    // display: inline-flex;
    // width: auto;
}

@mixin animation-base {
    animation-fill-mode: both;
}

.u-transition-fade-enter {
    @include animation-base;
    animation-name: u-transition-fade-in;
}
.u-transition-fade-leave {
    @include animation-base;
    animation-name: u-transition-fade-out;
}

.u-transition-slide-up-enter {
    @include animation-base;
    animation-name: u-transition-slide-up-in;
}
.u-transition-slide-up-leave {
    @include animation-base;
    animation-name: u-transition-slide-up-out;
}

.u-transition-slide-down-enter {
    @include animation-base;
    animation-name: u-transition-slide-down-in;
}
.u-transition-slide-down-leave {
    @include animation-base;
    animation-name: u-transition-slide-down-out;
}

.u-transition-slide-left-enter {
    @include animation-base;
    animation-name: u-transition-slide-left-in;
}
.u-transition-slide-left-leave {
    @include animation-base;
    animation-name: u-transition-slide-left-out;
}

.u-transition-slide-right-enter {
    @include animation-base;
    animation-name: u-transition-slide-right-in;
}
.u-transition-slide-right-leave {
    @include animation-base;
    animation-name: u-transition-slide-right-out;
}

.u-transition-zoom-in-enter {
    @include animation-base;
    animation-name: u-transition-zoom-in-in;
}
.u-transition-zoom-in-leave {
    @include animation-base;
    animation-name: u-transition-zoom-in-out;
}

.u-transition-zoom-out-enter {
    @include animation-base;
    animation-name: u-transition-zoom-out-in;
}
.u-transition-zoom-out-leave {
    @include animation-base;
    animation-name: u-transition-zoom-out-out;
}

@keyframes u-transition-fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes u-transition-fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@keyframes u-transition-slide-up-in {
    0% {
        opacity: 0;
        transform: translate3d(0, 40rpx, 0);
    }
    100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}
@keyframes u-transition-slide-up-out {
    0% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
    100% {
        opacity: 0;
        transform: translate3d(0, 40rpx, 0);
    }
}

@keyframes u-transition-slide-down-in {
    0% {
        opacity: 0;
        transform: translate3d(0, -40rpx, 0);
    }
    100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}
@keyframes u-transition-slide-down-out {
    0% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
    100% {
        opacity: 0;
        transform: translate3d(0, -40rpx, 0);
    }
}

@keyframes u-transition-slide-left-in {
    0% {
        opacity: 0;
        transform: translate3d(40rpx, 0, 0);
    }
    100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}
@keyframes u-transition-slide-left-out {
    0% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
    100% {
        opacity: 0;
        transform: translate3d(40rpx, 0, 0);
    }
}

@keyframes u-transition-slide-right-in {
    0% {
        opacity: 0;
        transform: translate3d(-40rpx, 0, 0);
    }
    100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}
@keyframes u-transition-slide-right-out {
    0% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
    100% {
        opacity: 0;
        transform: translate3d(-40rpx, 0, 0);
    }
}

@keyframes u-transition-zoom-in-in {
    0% {
        opacity: 0;
        transform: scale(0.85);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
@keyframes u-transition-zoom-in-out {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0.85);
    }
}

@keyframes u-transition-zoom-out-in {
    0% {
        opacity: 0;
        transform: scale(1.1);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
@keyframes u-transition-zoom-out-out {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(1.1);
    }
}
</style>
