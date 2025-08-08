<template>
    <view
        class="u-row"
        :style="{
            alignItems: uAlignItem,
            justifyContent: uJustify
        }"
        @tap="onClick"
    >
        <slot />
    </view>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';

defineOptions({
    name: 'u-row'
});

/**
 * row 行布局
 * @description 通过基础的 12 分栏，迅速简便地创建布局。
 * @tutorial https://uview-pro.netlify.app/components/layout.html#row-props
 * @property {String|Number} gutter 栅格间隔，左右各为此值的一半，单位rpx（默认0）
 * @property {String} justify 水平排列方式(微信小程序暂不支持)默认（start(或flex-start)）
 * @property {String} align 垂直排列方式（默认center）
 * @example <u-row gutter="16"></u-row>
 */

const emit = defineEmits<{ (e: 'click'): void }>();

const props = defineProps({
    /** 给col添加间距，左右边距各占一半 */
    gutter: { type: [String, Number], default: 20 },
    /** 水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`) */
    justify: { type: String, default: 'start' },
    /** 垂直对齐方式，可选值为top、center、bottom */
    align: { type: String, default: 'center' },
    /** 是否阻止事件传播 */
    stop: { type: Boolean, default: true }
});

// 提供 gutter 给子组件 u-col 使用
provide('u-row-gutter', props.gutter);

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
 * 点击事件
 * @param e 事件对象
 */
function onClick(e: Event) {
    // 触发 click 事件
    emit('click');
}
</script>

<style lang="scss">
@import '../../libs/css/style.components.scss';

.u-row {
    // 由于微信小程序编译后奇怪的页面结构，只能使用float布局实现，flex无法实现
    /* #ifndef MP-WEIXIN || MP-QQ || MP-TOUTIAO */
    @include vue-flex;
    /* #endif */
    flex-wrap: wrap;
}

.u-row:after {
    /* #ifdef MP-WEIXIN || MP-QQ || MP-TOUTIAO */
    display: table;
    clear: both;
    content: '';
    /* #endif */
}
</style>
