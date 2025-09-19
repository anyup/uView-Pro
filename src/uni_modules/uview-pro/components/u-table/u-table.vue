<template>
    <view class="u-table" :style="tableStyle">
        <slot />
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TableProps } from './types';

defineOptions({ name: 'u-table' });

/**
 * table 表格
 * @description 表格组件一般用于展示大量结构化数据的场景
 * @tutorial https://uviewpro.cn/zh/components/table.html
 * @property {String} border-color 表格边框的颜色（默认#e4e7ed）
 * @property {String} bg-color 表格的背景颜色（默认#ffffff）
 * @property {String} align 单元格的内容对齐方式，作用类似css的text-align（默认center）
 * @property {String} padding 单元格的内边距，同css的padding写法（默认10rpx 0）
 * @property {String | Number} font-size 单元格字体大小，单位rpx（默认28）
 * @property {String} color 单元格字体颜色（默认#606266）
 * @property {Object} th-style th单元格的样式，对象形式(将th所需参数放在table组件，是为了避免每一个th组件要写一遍）
 * @event {Function} click 点击组件时触发
 * @event {Function} close 点击关闭按钮时触发
 * @example <u-table></u-table>
 */

const props = defineProps(TableProps);

/**
 * 计算表格样式
 */
const tableStyle = computed(() => {
    const style: Record<string, any> = {};
    style.borderLeft = `solid 1px ${props.borderColor}`;
    style.borderTop = `solid 1px ${props.borderColor}`;
    style.backgroundColor = props.bgColor;
    return style;
});

defineExpose({
    props,
    tableStyle
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-table {
    width: 100%;
    box-sizing: border-box;
}
</style>
