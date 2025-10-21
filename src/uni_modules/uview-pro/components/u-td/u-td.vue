<template>
    <view class="u-td" :style="$u.toStyle(tdStyle, customStyle)" :class="customClass">
        <slot></slot>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-td',
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
import { computed } from 'vue';
import { $u, useChildren } from '../..';
import { TdProps } from './types';

/**
 * td td单元格
 * @description 表格组件一般用于展示大量结构化数据的场景（搭配u-table使用）
 * @tutorial https://uviewpro.cn/zh/components/table.html#td-props
 * @property {String | Number} width 单元格宽度百分比或者具体带单位的值，如30%， 200rpx等，一般使用百分比，单元格宽度默认为均分tr的长度（默认auto）
 * @example <u-td>二年级</u-td>
 */

const props = defineProps(TdProps);

const { parentExposed } = useChildren('u-td', 'u-table');

const tdStyle = computed(() => {
    const style: Record<string, any> = {};
    if (props.width && props.width !== 'auto') style.width = props.width;
    else style.flex = '1';
    style.textAlign = parentExposed.value?.props?.align;
    style.fontSize = parentExposed.value?.props?.fontSize + 'rpx';
    style.padding = parentExposed.value?.props?.padding;
    style.borderBottom = `solid 1px ${parentExposed.value?.props?.borderColor}`;
    style.borderRight = `solid 1px ${parentExposed.value?.props?.borderColor}`;
    style.color = parentExposed.value?.props?.color;
    return style;
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-td {
    @include vue-flex;
    flex-direction: column;
    // flex: 1;
    justify-content: center;
    font-size: 28rpx;
    color: $u-content-color;
    align-self: stretch;
    box-sizing: border-box;
    height: 100%;
}
</style>
