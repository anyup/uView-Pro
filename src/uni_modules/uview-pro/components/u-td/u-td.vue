<template>
    <view class="u-td" :style="tdStyle">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue';
import { $u } from '../..';
import { TdProps } from './types';

defineOptions({ name: 'u-td' });

/**
 * td td单元格
 * @description 表格组件一般用于展示大量结构化数据的场景（搭配u-table使用）
 * @tutorial https://uview-pro.netlify.app/components/table.html#td-props
 * @property {String | Number} width 单元格宽度百分比或者具体带单位的值，如30%， 200rpx等，一般使用百分比，单元格宽度默认为均分tr的长度（默认auto）
 * @example <u-td>二年级</u-td>
 */

const props = defineProps(TdProps);

/**
 * 组合式API变量声明
 * 保留所有说明注释
 */
const tdStyle = ref<Record<string, any>>({}); // 单元格样式
let parent: any = null; // 父组件实例

/**
 * 组件挂载时查找父组件u-table并合并样式
 */
onMounted(() => {
    // 查找父组件u-table
    const instance = getCurrentInstance();
    if (instance) {
        parent = $u.$parent('u-table');
        if (parent) {
            // 将父组件的相关参数，合并到本组件
            const style: Record<string, any> = {};
            if (props.width !== 'auto') style.flex = `0 0 ${props.width}`;
            style.textAlign = parent.props.align;
            style.fontSize = parent.props.fontSize + 'rpx';
            style.padding = parent.props.padding;
            style.borderBottom = `solid 1px ${parent.props.borderColor}`;
            style.borderRight = `solid 1px ${parent.props.borderColor}`;
            style.color = parent.props.color;
            tdStyle.value = style;
        }
    }
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-td {
    @include vue-flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    font-size: 28rpx;
    color: $u-content-color;
    align-self: stretch;
    box-sizing: border-box;
    height: 100%;
}
</style>
