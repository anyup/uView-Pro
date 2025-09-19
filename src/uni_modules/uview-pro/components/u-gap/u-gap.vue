<template>
    <view class="u-gap" :style="gapStyle"></view>
</template>

<script setup lang="ts">
import { GapProps } from './types';
import { computed } from 'vue';

defineOptions({
    name: 'u-gap'
});

/**
 * gap 间隔槽
 * @description 该组件一般用于内容块之间的用一个灰色块隔开的场景，方便用户风格统一，减少工作量
 * @tutorial https://uviewpro.cn/zh/components/gap.html
 * @property {String} bg-color 背景颜色（默认#f3f4f6）
 * @property {String Number} height 分割槽高度，单位rpx（默认30）
 * @property {String Number} margin-top 与前一个组件的距离，单位rpx（默认0）
 * @property {String Number} margin-bottom 与后一个组件的距离，单位rpx（0）
 * @example <u-gap height="80" bg-color="#bbb"></u-gap>
 */
const props = defineProps(GapProps);

/**
 * 间隔槽样式
 */
const gapStyle = computed(() => {
    return {
        backgroundColor: props.bgColor,
        height: props.height + 'rpx',
        marginTop: props.marginTop + 'rpx',
        marginBottom: props.marginBottom + 'rpx'
    };
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';
</style>
