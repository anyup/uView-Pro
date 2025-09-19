<template>
    <view class="u-time-axis">
        <slot />
    </view>
</template>

<script setup lang="ts">
defineOptions({ name: 'u-time-line' });

/**
 * timeLine 时间轴
 * @description 时间轴组件一般用于物流信息展示，各种跟时间相关的记录等场景。
 * @tutorial https://uviewpro.cn/zh/components/timeLine.html
 * @example <u-time-line></u-time-line>
 */

// 当前组件无 props 和方法，仅作为时间轴容器使用
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-time-axis {
    padding-left: 40rpx;
    position: relative;
}

.u-time-axis::before {
    content: ' ';
    position: absolute;
    left: 0;
    top: 12rpx;
    width: 1px;
    bottom: 0;
    border-left: 1px solid #ddd;
    transform-origin: 0 0;
    transform: scaleX(0.5);
}
</style>
