<template>
    <view
        class="u-grid"
        :class="{ 'u-border-top u-border-left': border, customClass }"
        :style="$u.toStyle(gridStyle, customStyle)"
    >
        <slot />
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-grid',
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
import { useParent, $u } from '../../';
import { GridProps } from './types';
import { computed } from 'vue';

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
const emit = defineEmits(['click']);
useParent('u-grid');

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

/**
 * 点击宫格
 * @param index 子项索引
 */
function click(index: number) {
    emit('click', index);
}

defineExpose({ click, props });
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
