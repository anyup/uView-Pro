<template>
    <view :class="[animationName]" :style="[animationDelay ? { animationDelay: animationDelay * 0.1 + 's' } : {}]">
        <slot></slot>
    </view>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';

type AnimationType = 'fade' | 'scale-up' | 'scale-down' | 'slide-top' | 'slide-bottom' | 'slide-left' | 'slide-right' | 'shake' | '';

const props = defineProps({
    name: {
        type: String as () => AnimationType,
        default: ''
    },
    delay: {
        type: Number,
        default: 0
    }
});

const animationName = ref('');
const animationDelay = ref(0);

onBeforeMount(() => {
    animationName.value = props.name ? `animation-${props.name}` : '';
    animationDelay.value = props.delay || 0;
});

/**
 * 切换动画效果
 * @param name 动画名称
 * @param delay 延迟时间
 */
function toggle(name?: AnimationType, delay?: number) {
    animationName.value = name ? `animation-${name}` : `animation-${props.name}`;
    animationDelay.value = delay || props.delay;
    setTimeout(() => {
        animationName.value = '';
    }, 500);
}

defineExpose({
    toggle
});
</script>

<style>
@import 'animation.css';
</style>
