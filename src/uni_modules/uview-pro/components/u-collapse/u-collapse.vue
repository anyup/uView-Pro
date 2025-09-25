<template>
    <view class="u-collapse" :style="$u.toStyle(customStyle)" :class="customClass">
        <slot />
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-collapse',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { CollapseProps } from './types';
import { $u } from '../../';

/**
 * collapse 手风琴
 * @description 通过折叠面板收纳内容区域
 * @tutorial https://uviewpro.cn/zh/components/collapse.html
 * @property {Boolean} accordion 是否手风琴模式（默认true）
 * @property {Boolean} arrow 是否显示标题右侧的箭头（默认true）
 * @property {String} arrow-color 标题右侧箭头的颜色（默认#909399）
 * @property {Object} head-style 标题自定义样式，对象形式
 * @property {Object} body-style 主体自定义样式，对象形式
 * @property {String} hover-class 样式类名，按下时有效（默认u-hover-class）
 * @event {Function} change 当前激活面板展开时触发(如果是手风琴模式，参数activeNames类型为String，否则为Array)
 * @example <u-collapse></u-collapse>
 */
const props = defineProps(CollapseProps);

const emit = defineEmits(['change']);

// 子元素集合
const children = ref<any[]>([]);

/**
 * 重新初始化一次内部的所有子元素的高度计算，用于异步获取数据渲染的情况
 */
function init() {
    children.value.forEach((vm, index) => {
        vm.init && vm.init();
    });
}

/**
 * collapse item被点击，由collapse item调用父组件方法
 */
function onChange(index: string | number) {
    emit('change', index);
}

defineExpose({
    props,
    children,
    init,
    onChange
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';
</style>
