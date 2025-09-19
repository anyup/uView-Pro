<template>
    <view class="u-time-axis-item">
        <slot name="content" />
        <view class="u-time-axis-node" :style="[nodeStyle]">
            <slot name="node">
                <view class="u-dot"> </view>
            </slot>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TimeLineItemProps } from './types';

defineOptions({ name: 'u-time-line-item' });

/**
 * timeLineItem 时间轴Item
 * @description 时间轴组件一般用于物流信息展示，各种跟时间相关的记录等场景。(搭配u-time-line使用)
 * @tutorial https://uviewpro.cn/zh/components/timeLine.html
 * @property {String} bg-color 左边节点的背景颜色，一般通过slot内容自定义背景颜色即可（默认#ffffff）
 * @property {String | Number} node-top 节点左边图标绝对定位的top值，单位rpx
 * @example <u-time-line-item node-top="2">...</u-time-line-item>
 */

/**
 * 节点的背景颜色
 * @default "#ffffff"
 */
const props = defineProps(TimeLineItemProps);

/**
 * 计算节点样式
 * @returns 节点样式对象
 */
const nodeStyle = computed(() => {
    // 生成节点样式对象
    const style: Record<string, string> = {
        backgroundColor: props.bgColor
    };
    // 如果设置了 nodeTop，则添加 top 属性
    if (props.nodeTop !== '') style.top = String(props.nodeTop) + 'rpx';
    return style;
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-time-axis-item {
    @include vue-flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    margin-bottom: 32rpx;
}

.u-time-axis-node {
    position: absolute;
    top: 12rpx;
    left: -40rpx;
    transform-origin: 0;
    transform: translateX(-50%);
    @include vue-flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    font-size: 24rpx;
}

.u-dot {
    height: 16rpx;
    width: 16rpx;
    border-radius: 100rpx;
    background: #ddd;
}
</style>
