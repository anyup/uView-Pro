<template>
    <view
        class="u-grid-item"
        :hover-class="parentData.hoverClass"
        :hover-stay-time="200"
        @tap="click"
        :style="{
            background: bgColor,
            width: width
        }"
    >
        <view class="u-grid-item-box" :style="[customStyle]" :class="[parentData.border ? 'u-border-right u-border-bottom' : '']">
            <slot />
        </view>
    </view>
</template>

<script setup lang="ts">
import { GridItemProps } from './types';
import { ref, computed, getCurrentInstance, onMounted } from 'vue';
import { $u } from '../..';

defineOptions({ name: 'u-grid-item' });

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

// props 定义，保留参数注释
const props = defineProps(GridItemProps);

// emits 定义
const emit = defineEmits(['click']);

const instance = getCurrentInstance();

// 父组件参数
const parentData = ref({
    hoverClass: '',
    col: 3,
    border: true
});

// 计算每个grid-item的宽度
const width = computed(() => 100 / Number(parentData.value.col) + '%');

// 获取父组件参数
function updateParentData() {
    if (!instance) return;
    const parent = $u.parentData('u-grid', instance);
    if (parent) {
        parentData.value.hoverClass = parent.props.hoverClass;
        parentData.value.col = parent.props.col;
        parentData.value.border = parent.props.border;
        // 注册到父组件children
        if (Array.isArray(parent.children.value)) {
            const exist = parent.children.value.find((val: any) => val === instance);
            if (!exist) parent.children.value.push(instance);
        }
    }
}

/**
 * 点击宫格
 */
function click() {
    emit('click', props.index);
    const parent = $u.parentData('u-grid', instance);
    if (parent && typeof parent.click === 'function') parent.click(props.index);
}

onMounted(() => {
    updateParentData();
});

defineExpose({ updateParentData, click });
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
