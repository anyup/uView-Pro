<template>
    <view
        class="u-grid-item"
        :class="customClass"
        :hover-class="hoverClass"
        :hover-stay-time="200"
        @tap="click"
        :style="
            $u.toStyle(
                {
                    background: bgColor,
                    width: width
                },
                customStyle
            )
        "
    >
        <view class="u-grid-item-box" :style="[customStyle]" :class="[border ? 'u-border-right u-border-bottom' : '']">
            <slot />
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-grid-item',
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
import { GridItemProps } from './types';
import { computed } from 'vue';
import { $u, useChildren } from '../..';

/**
 * gridItem 宫格项
 * @description 宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件(badge)，或者图标等，也可以扩展为左右滑动的轮播形式。搭配u-grid使用
 * @tutorial https://uviewpro.cn/zh/components/grid.html
 * @property {String} bg-color 宫格的背景颜色（默认#ffffff）
 * @property {String|Number} index 点击宫格时，返回的值
 * @property {Object} custom-style 自定义样式，对象形式
 * @event {Function} click 点击宫格触发
 * @example <u-grid-item></u-grid-item>
 */

const props = defineProps(GridItemProps);
const { parentExposed } = useChildren('u-grid-item', 'u-grid');
const emit = defineEmits(['click']);

// 宫格按压时的样式类，"none"为无效果
const hoverClass = computed(() => {
    return parentExposed?.value?.props?.hoverClass ?? '';
});

// 是否显示边框
const border = computed(() => {
    return parentExposed?.value?.props?.border ?? true;
});

// 分成几列
const col = computed(() => {
    return parentExposed?.value?.props?.col ?? 3;
});

// 计算每个grid-item的宽度
const width = computed(() => 100 / Number(col.value) + '%');

/**
 * 点击宫格
 */
function click() {
    emit('click', props.index);
    parentExposed?.value?.click(props.index);
}

defineExpose({ click });
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-grid-item {
    box-sizing: border-box;
    background: #fff;
    @include vue-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-direction: column;

    /* #ifdef MP */
    position: relative;
    float: left;
    /* #endif */
}

.u-grid-item-hover {
    background: #f7f7f7 !important;
}

.u-grid-marker-box {
    position: absolute;
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    line-height: 0;
}

.u-grid-marker-wrap {
    position: absolute;
}

.u-grid-item-box {
    padding: 30rpx 0;
    @include vue-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
}
</style>
