<template>
    <view class="u-tr" :class="customClass" :style="$u.toStyle(customStyle)">
        <slot></slot>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-tr',
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
import { TrProps } from './types';
import { $u } from '../../';

/**
 * tr 表格行标签
 * @description 表格组件一般用于展示大量结构化数据的场景（搭配<u-table>使用）
 * @tutorial https://uviewpro.cn/zh/components/table.html
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
