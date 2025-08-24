<template>
    <view class="u-tr">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { TrProps } from './types';

defineOptions({ name: 'u-tr' });

/**
 * tr 表格行标签
 * @description 表格组件一般用于展示大量结构化数据的场景（搭配<u-table>使用）
 * @tutorial https://uview-pro.netlify.app/components/table.html
 * @example <u-tr></u-tr>
 */
const props = defineProps(TrProps);
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-tr {
    @include vue-flex;
}
</style>
