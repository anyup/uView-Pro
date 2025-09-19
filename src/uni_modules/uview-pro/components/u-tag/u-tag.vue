<template>
    <view
        v-if="show"
        :class="[disabled ? 'u-disabled' : '', 'u-size-' + size, 'u-shape-' + shape, 'u-mode-' + mode + '-' + type]"
        class="u-tag"
        :style="[customStyle]"
        @tap="clickTag"
    >
        {{ text }}
        <view class="u-icon-wrap" @tap.stop>
            <u-icon @click="close" size="22" v-if="closeable" :color="closeIconColor" name="close" class="u-close-icon" :style="[iconStyle]"></u-icon>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TagProps } from './types';

defineOptions({
    name: 'u-tag'
});

/**
 * tag 提示
 * @description 该组件一般用于标记和选择
 * @tutorial https://uviewpro.cn/zh/components/tag.html
 * @property {String} type 主题类型（默认primary）
 * @property {String} size 标签大小（默认default）
 * @property {String} shape 标签形状（默认square）
 * @property {String} text 标签的文字内容
 * @property {String} bg-color 自定义标签的背景颜色
 * @property {String} border-color 标签的边框颜色
 * @property {String} close-color 关闭按钮的颜色
 * @property {String|Number} index 点击标签时，会通过click事件返回该值
 * @property {String} mode 模式选择，见官网说明（默认light）
 * @property {Boolean} closeable 是否可关闭，设置为true，文字右边会出现一个关闭图标（默认false）
 * @property {Boolean} show 标签显示与否（默认true）
 * @event {Function} click 点击标签触发
 * @event {Function} close closeable为true时，点击标签关闭按钮触发
 * @example <u-tag text="雪月夜" type="success" />
 */

const emit = defineEmits<{
    (e: 'click', index: string | number): void;
    (e: 'close', index: string | number): void;
}>();

const props = defineProps(TagProps);

/**
 * 计算 tag 的自定义样式
 */
const customStyle = computed(() => {
    let style: Record<string, any> = {};
    // 文字颜色（如果有此值，会覆盖type值的颜色）
    if (props.color) style.color = props.color;
    // tag的背景颜色（如果有此值，会覆盖type值的颜色）
    if (props.bgColor) style.backgroundColor = props.bgColor;
    // 如果是镂空型tag，没有传递边框颜色（borderColor）的话，使用文字的颜色（color属性）
    if (props.mode === 'plain' && props.color && !props.borderColor) style.borderColor = props.color;
    else style.borderColor = props.borderColor;
    return style;
});

/**
 * 计算关闭图标的样式
 */
const iconStyle = computed(() => {
    if (!props.closeable) return undefined;
    let style: Record<string, any> = {};
    if (props.size === 'mini') style.fontSize = '20rpx';
    else style.fontSize = '22rpx';
    if (props.mode === 'plain' || props.mode === 'light') style.color = props.type;
    else if (props.mode === 'dark') style.color = '#ffffff';
    if (props.closeColor) style.color = props.closeColor;
    return style;
});

/**
 * 关闭图标的颜色
 */
const closeIconColor = computed(() => {
    // 如果定义了关闭图标的颜色，就用此值，否则用字体颜色的值
    // 如果上面的二者都没有，如果是dark深色模式，图标就为白色
    // 最后如果上面的三者都不合适，就返回type值给图标获取颜色
    if (props.closeColor) return props.closeColor;
    else if (props.color) return props.color;
    else if (props.mode === 'dark') return '#ffffff';
    else return props.type;
});

/**
 * 标签被点击
 */
function clickTag() {
    // 如果是disabled状态，不发送点击事件
    if (props.disabled) return;
    emit('click', props.index);
}

/**
 * 点击标签关闭按钮
 */
function close() {
    emit('close', props.index);
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-tag {
    box-sizing: border-box;
    align-items: center;
    border-radius: 6rpx;
    /* #ifndef APP-NVUE */
    display: inline-block;
    /* #endif */
    line-height: 1;
}

.u-size-default {
    font-size: 22rpx;
    padding: 12rpx 22rpx;
}

.u-size-mini {
    font-size: 20rpx;
    padding: 6rpx 12rpx;
}

.u-mode-light-primary {
    background-color: $u-type-primary-light;
    color: $u-type-primary;
    border: 1px solid $u-type-primary-disabled;
}

.u-mode-light-success {
    background-color: $u-type-success-light;
    color: $u-type-success;
    border: 1px solid $u-type-success-disabled;
}

.u-mode-light-error {
    background-color: $u-type-error-light;
    color: $u-type-error;
    border: 1px solid $u-type-error-disabled;
}

.u-mode-light-warning {
    background-color: $u-type-warning-light;
    color: $u-type-warning;
    border: 1px solid $u-type-warning-disabled;
}

.u-mode-light-info {
    background-color: $u-type-info-light;
    color: $u-type-info;
    border: 1px solid $u-type-info-disabled;
}

.u-mode-dark-primary {
    background-color: $u-type-primary;
    color: #ffffff;
}

.u-mode-dark-success {
    background-color: $u-type-success;
    color: #ffffff;
}

.u-mode-dark-error {
    background-color: $u-type-error;
    color: #ffffff;
}

.u-mode-dark-warning {
    background-color: $u-type-warning;
    color: #ffffff;
}

.u-mode-dark-info {
    background-color: $u-type-info;
    color: #ffffff;
}

.u-mode-plain-primary {
    background-color: #ffffff;
    color: $u-type-primary;
    border: 1px solid $u-type-primary;
}

.u-mode-plain-success {
    background-color: #ffffff;
    color: $u-type-success;
    border: 1px solid $u-type-success;
}

.u-mode-plain-error {
    background-color: #ffffff;
    color: $u-type-error;
    border: 1px solid $u-type-error;
}

.u-mode-plain-warning {
    background-color: #ffffff;
    color: $u-type-warning;
    border: 1px solid $u-type-warning;
}

.u-mode-plain-info {
    background-color: #ffffff;
    color: $u-type-info;
    border: 1px solid $u-type-info;
}

.u-disabled {
    opacity: 0.55;
}

.u-shape-circle {
    border-radius: 100rpx;
}

.u-shape-circleRight {
    border-radius: 0 100rpx 100rpx 0;
}

.u-shape-circleLeft {
    border-radius: 100rpx 0 0 100rpx;
}

.u-close-icon {
    margin-left: 14rpx;
    font-size: 22rpx;
    color: $u-type-success;
}

.u-icon-wrap {
    display: inline-flex;
    transform: scale(0.86);
}
</style>
