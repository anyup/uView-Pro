<template>
    <view
        @tap="onClick"
        class="u-cell"
        :class="{
            'u-border-bottom': borderBottom,
            'u-border-top': borderTop,
            'u-col-center': center,
            'u-cell--required': required
        }"
        hover-stay-time="150"
        :hover-class="hoverClass"
        :style="{ backgroundColor: bgColor }"
    >
        <u-icon :size="iconSize" :name="icon" v-if="icon" :custom-style="iconStyle" class="u-cell__left-icon-wrap"></u-icon>
        <view class="u-flex" v-else>
            <slot name="icon"></slot>
        </view>
        <view class="u-cell_title" :style="[{ width: titleWidth ? titleWidth + 'rpx' : 'auto' }, titleStyle]">
            <template v-if="title !== ''">{{ title }}</template>
            <slot name="title" v-else></slot>
            <view class="u-cell__label" v-if="label || $slots.label" :style="[labelStyle]">
                <template v-if="label !== ''">{{ label }}</template>
                <slot name="label" v-else></slot>
            </view>
        </view>
        <view class="u-cell__value" :style="[valueStyle]">
            <template v-if="value !== ''">{{ value }}</template>
            <slot v-else></slot>
        </view>
        <view class="u-flex u-cell_right" v-if="$slots['right-icon']">
            <slot name="right-icon"></slot>
        </view>
        <u-icon v-if="arrow" name="arrow-right" :style="[arrowStyle]" class="u-icon-wrap u-cell__right-icon-wrap"></u-icon>
    </view>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { CellItemProps } from './types';

defineOptions({
    name: 'u-cell-item'
});

/**
 * cellItem 单元格Item
 * @description cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。搭配u-cell-group使用
 * @tutorial https://uviewpro.cn/zh/components/cell.html
 * @property {String} title 左侧标题
 * @property {String} icon 左侧图标名，只支持uView内置图标，见Icon 图标
 * @property {Object} icon-style 左边图标的样式，对象形式
 * @property {String} value 右侧内容
 * @property {String} label 标题下方的描述信息
 * @property {Boolean} border-bottom 是否显示cell的下边框（默认true）
 * @property {Boolean} border-top 是否显示cell的上边框（默认false）
 * @property {Boolean} center 是否使内容垂直居中（默认false）
 * @property {String} hover-class 是否开启点击反馈，none为无效果（默认true）
 * // @property {Boolean} border-gap border-bottom为true时，Cell列表中间的条目的下边框是否与左边有一个间隔（默认true）
 * @property {Boolean} arrow 是否显示右侧箭头（默认true）
 * @property {Boolean} required 箭头方向，可选值（默认right）
 * @property {Boolean} arrow-direction 是否显示左边表示必填的星号（默认false）
 * @property {Object} title-style 标题样式，对象形式
 * @property {Object} value-style 右侧内容样式，对象形式
 * @property {Object} label-style 标题下方描述信息的样式，对象形式
 * @property {String} bg-color 背景颜色（默认transparent）
 * @property {String|Number} index 用于在click事件回调中返回，标识当前是第几个Item
 * @property {String|Number} title-width 标题的宽度，单位rpx
 * @example <u-cell-item icon="integral-fill" title="会员等级" value="新版本"></u-cell-item>
 */

const emit = defineEmits<{ (e: 'click', index: string | number): void }>();

const props = defineProps(CellItemProps);

const $slots = useSlots();

/**
 * 箭头样式
 */
const arrowStyle = computed(() => {
    let style: Record<string, any> = {};
    if (props.arrowDirection === 'up') style.transform = 'rotate(-90deg)';
    else if (props.arrowDirection === 'down') style.transform = 'rotate(90deg)';
    else style.transform = 'rotate(0deg)';
    return style;
});

/**
 * 点击事件
 */
function onClick() {
    emit('click', props.index);
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';
.u-cell {
    @include vue-flex;
    align-items: center;
    position: relative;
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    /* #endif */
    width: 100%;
    padding: 26rpx 32rpx;
    font-size: 28rpx;
    line-height: 54rpx;
    color: $u-content-color;
    background-color: #fff;
    text-align: left;
}

.u-cell_title {
    font-size: 28rpx;
}

.u-cell__left-icon-wrap {
    margin-right: 10rpx;
    font-size: 32rpx;
}

.u-cell__right-icon-wrap {
    margin-left: 10rpx;
    color: #969799;
    font-size: 28rpx;
}

.u-cell__left-icon-wrap,
.u-cell__right-icon-wrap {
    @include vue-flex;
    align-items: center;
    height: 48rpx;
}

.u-cell-border:after {
    position: absolute;
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    border-bottom: 1px solid $u-border-color;
    /* #endif */
    right: 0;
    left: 0;
    top: 0;
    transform: scaleY(0.5);
}

.u-cell-border {
    position: relative;
}

.u-cell__label {
    margin-top: 6rpx;
    font-size: 26rpx;
    line-height: 36rpx;
    color: $u-tips-color;
    /* #ifndef APP-NVUE */
    word-wrap: break-word;
    /* #endif */
}

.u-cell__value {
    overflow: hidden;
    text-align: right;
    /* #ifndef APP-NVUE */
    vertical-align: middle;
    /* #endif */
    color: $u-tips-color;
    font-size: 26rpx;
}

.u-cell__title,
.u-cell__value {
    flex: 1;
}

.u-cell--required {
    /* #ifndef APP-NVUE */
    overflow: visible;
    /* #endif */
    @include vue-flex;
    align-items: center;
}

.u-cell--required:before {
    position: absolute;
    /* #ifndef APP-NVUE */
    content: '*';
    /* #endif */
    left: 8px;
    margin-top: 4rpx;
    font-size: 14px;
    color: $u-type-error;
}

.u-cell_right {
    line-height: 1;
}
</style>
