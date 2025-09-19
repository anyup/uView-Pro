<template>
    <view class="u-col" :class="['u-col-' + span]" :style="colStyle" @tap="onClick">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { ColProps } from './types';

defineOptions({
    name: 'u-col'
});

/**
 * col 布局单元格
 * @description 通过基础的 12 分栏，迅速简便地创建布局（搭配<u-row>使用）
 * @tutorial https://uviewpro.cn/zh/components/layout.html
 * @property {String|Number} span 栅格占据的列数，总12等分（默认0）
 * @property {String} text-align 文字水平对齐方式（默认left）
 * @property {String|Number} offset 分栏左边偏移，计算方式与span相同（默认0）
 * @example <u-col span="3"><view class="demo-layout bg-purple"></view></u-col>
 */

const emit = defineEmits<{ (e: 'click'): void }>();

const props = defineProps(ColProps);

/**
 * gutter 给col添加间距，左右边距各占一半，从父组件u-row获取
 */
const gutter = inject('u-row-gutter', 20);

/**
 * 计算水平排列方式
 * @returns {string}
 */
const uJustify = computed(() => {
    if (props.justify === 'end' || props.justify === 'start') return 'flex-' + props.justify;
    else if (props.justify === 'around' || props.justify === 'between') return 'space-' + props.justify;
    else return props.justify;
});

/**
 * 计算垂直对齐方式
 * @returns {string}
 */
const uAlignItem = computed(() => {
    if (props.align === 'top') return 'flex-start';
    if (props.align === 'bottom') return 'flex-end';
    else return props.align;
});

/**
 * 计算样式对象
 */
const colStyle = computed<any>(() => ({
    padding: `0 ${Number(gutter) / 2}rpx`,
    marginLeft: `${(100 / 12) * Number(props.offset)}%`,
    flex: `0 0 ${(100 / 12) * Number(props.span)}%`,
    alignItems: uAlignItem.value,
    justifyContent: uJustify.value,
    textAlign: props.textAlign
}));

/**
 * 点击事件
 * @param e 事件对象
 */
function onClick(e: Event) {
    emit('click');
}
</script>

<style lang="scss">
@import '../../libs/css/style.components.scss';

.u-col {
    /* #ifdef MP-WEIXIN || MP-QQ || MP-TOUTIAO */
    float: left;
    /* #endif */
}

.u-col-0 {
    width: 0;
}
.u-col-1 {
    width: calc(100% / 12);
}
.u-col-2 {
    width: calc(100% / 12 * 2);
}
.u-col-3 {
    width: calc(100% / 12 * 3);
}
.u-col-4 {
    width: calc(100% / 12 * 4);
}
.u-col-5 {
    width: calc(100% / 12 * 5);
}
.u-col-6 {
    width: calc(100% / 12 * 6);
}
.u-col-7 {
    width: calc(100% / 12 * 7);
}
.u-col-8 {
    width: calc(100% / 12 * 8);
}
.u-col-9 {
    width: calc(100% / 12 * 9);
}
.u-col-10 {
    width: calc(100% / 12 * 10);
}
.u-col-11 {
    width: calc(100% / 12 * 11);
}
.u-col-12 {
    width: calc(100% / 12 * 12);
}
</style>
