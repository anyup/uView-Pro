<template>
    <view class="u-th" :style="$u.toStyle(thStyle, customStyle)" :class="customClass">
        <slot></slot>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-th',
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
import { ThProps } from './types';

/**
 * th th单元格
 * @description 表格组件一般用于展示大量结构化数据的场景（搭配u-table使用）
 * @tutorial https://uviewpro.cn/zh/components/table.html#td-props
 * @property {String | Number} width 标题单元格宽度百分比或者具体带单位的值，如30%，200rpx等，一般使用百分比，单元格宽度默认为均分tr的长度
 * @example 暂无示例
 */

const props = defineProps(ThProps);

const { parentExposed } = useChildren('u-th', 'u-table');

const thStyle = computed(() => {
    const style: Record<string, any> = {};
    if (props.width && props.width !== 'auto') style.width = props.width;
    else style.flex = '1';
    style.textAlign = parentExposed.value?.props?.align;
    style.padding = parentExposed.value?.props?.padding;
    style.borderBottom = `solid 1px ${parentExposed.value?.props?.borderColor}`;
    style.borderRight = `solid 1px ${parentExposed.value?.props?.borderColor}`;
    Object.assign(style, parentExposed.value?.props?.thStyle);
    return style;
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-th {
    @include vue-flex;
    flex-direction: column;
    // flex: 1;
    justify-content: center;
    font-size: 28rpx;
    color: $u-main-color;
    font-weight: bold;
    background-color: rgb(245, 246, 248);
}
</style>
