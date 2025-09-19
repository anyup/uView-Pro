<template>
    <view class="u-grid" :class="{ 'u-border-top u-border-left': border }" :style="[gridStyle]">
        <slot />
    </view>
</template>

<script setup lang="ts">
import { GridProps } from './types';
import { ref, computed, watch } from 'vue';

defineOptions({ name: 'u-grid' });

/**
 * grid 宫格布局
 * @description 宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件(badge)，或者图标等，也可以扩展为左右滑动的轮播形式。
 * @tutorial https://uviewpro.cn/zh/components/grid.html
 * @property {String|Number} col 宫格的列数（默认3）
 * @property {Boolean} border 是否显示宫格的边框（默认true）
 * @property {Boolean} hover-class 点击宫格的时候，是否显示按下的灰色背景（默认false）
 * @event {Function} click 点击宫格触发
 * @example <u-grid :col="3" @click="click"></u-grid>
 */
const props = defineProps(GridProps);

// emits 定义
const emit = defineEmits(['click']);

// 当前 grid 的子项集合
const children = ref<any[]>([]);

// 计算父组件的值是否发生变化
const parentData = computed(() => [props.hoverClass, props.col, props.border, props.align]);

// 宫格对齐方式
const gridStyle = computed(() => {
    const style: Record<string, string> = {};
    switch (props.align) {
        case 'left':
            style.justifyContent = 'flex-start';
            break;
        case 'center':
            style.justifyContent = 'center';
            break;
        case 'right':
            style.justifyContent = 'flex-end';
            break;
        default:
            style.justifyContent = 'flex-start';
    }
    return style;
});

// 监听父参数变化，通知子组件
watch(parentData, () => {
    if (children.value.length) {
        children.value.forEach(child => {
            child.exposed.updateParentData();
        });
    }
});

// 兼容原 created 钩子
children.value = [];

/**
 * 点击宫格
 * @param index 子项索引
 */
function click(index: number) {
    emit('click', index);
}

defineExpose({ click, children, props });
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-grid {
    width: 100%;
    /* #ifdef MP */
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    /* #endif */

    /* #ifndef MP */
    @include vue-flex;
    flex-wrap: wrap;
    align-items: center;
    /* #endif */
}
</style>
