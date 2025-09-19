<template>
    <view class="u-th" :style="thStyle">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, watch } from 'vue';
import { $u } from '../..';
import { ThProps } from './types';

defineOptions({ name: 'u-th' });

/**
 * th th单元格
 * @description 表格组件一般用于展示大量结构化数据的场景（搭配u-table使用）
 * @tutorial https://uviewpro.cn/zh/components/table.html#td-props
 * @property {String | Number} width 标题单元格宽度百分比或者具体带单位的值，如30%，200rpx等，一般使用百分比，单元格宽度默认为均分tr的长度
 * @example 暂无示例
 */

const props = defineProps(ThProps);

const thStyle = ref<Record<string, any>>({}); // 标题单元格样式
let parent: any = null; // 父组件实例

/**
 * 更新标题单元格样式
 */
function updateStyle() {
    if (!parent) return;

    const style: Record<string, any> = {};
    if (props.width && props.width !== 'auto') style.width = props.width;
    else style.flex = '1';
    style.textAlign = parent.props.align;
    style.padding = parent.props.padding;
    style.borderBottom = `solid 1px ${parent.props.borderColor}`;
    style.borderRight = `solid 1px ${parent.props.borderColor}`;
    Object.assign(style, parent.props.thStyle);
    thStyle.value = style;
}

/**
 * 组件挂载时查找父组件u-table并合并样式
 */
onMounted(() => {
    // 查找父组件u-table
    const instance = getCurrentInstance();
    if (instance) {
        parent = $u.$parent('u-table');
        if (parent) {
            updateStyle();

            // 监听父组件属性变化
            watch(
                () => parent.props,
                () => {
                    updateStyle();
                },
                { deep: true }
            );
        }
    }
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
