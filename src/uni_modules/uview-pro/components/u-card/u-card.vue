<template>
    <view
        class="u-card"
        @tap.stop="onClick"
        :class="{ 'u-border': border, 'u-card-full': full, 'u-card--border': Number(borderRadius) > 0 }"
        :style="{
            borderRadius: borderRadius + 'rpx',
            margin: margin,
            boxShadow: boxShadow
        }"
    >
        <view
            v-if="showHead"
            class="u-card__head"
            :style="[{ padding: padding + 'rpx' }, headStyle]"
            :class="{
                'u-border-bottom': headBorderBottom
            }"
            @tap="onHeadClick"
        >
            <view v-if="!slots.head" class="u-flex u-row-between">
                <view class="u-card__head--left u-flex u-line-1" v-if="title">
                    <image
                        :src="thumb"
                        class="u-card__head--left__thumb"
                        mode="aspectFill"
                        v-if="thumb"
                        :style="{
                            height: thumbWidth + 'rpx',
                            width: thumbWidth + 'rpx',
                            borderRadius: thumbCircle ? '100rpx' : '6rpx'
                        }"
                    ></image>
                    <text
                        class="u-card__head--left__title u-line-1"
                        :style="{
                            fontSize: titleSize + 'rpx',
                            color: titleColor
                        }"
                    >
                        {{ title }}
                    </text>
                </view>
                <view class="u-card__head--right u-line-1" v-if="subTitle">
                    <text
                        class="u-card__head__title__text"
                        :style="{
                            fontSize: subTitleSize + 'rpx',
                            color: subTitleColor
                        }"
                    >
                        {{ subTitle }}
                    </text>
                </view>
            </view>
            <slot name="head" v-else />
        </view>
        <view @tap="onBodyClick" class="u-card__body" :style="[{ padding: padding + 'rpx' }, bodyStyle]">
            <slot name="body" />
        </view>
        <view
            v-if="showFoot"
            class="u-card__foot"
            @tap="onFootClick"
            :style="[{ padding: slots.foot ? padding + 'rpx' : 0 }, footStyle]"
            :class="{
                'u-border-top': footBorderTop
            }"
        >
            <slot name="foot" />
        </view>
    </view>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import { CardProps } from './types';

defineOptions({
    name: 'u-card'
});

/**
 * card 卡片
 * @description 卡片组件一般用于多个列表条目，且风格统一的场景
 * @tutorial https://uviewpro.cn/zh/components/card.html
 * @property {Boolean} full 卡片与屏幕两侧是否留空隙（默认false）
 * @property {String} title 头部左边的标题
 * @property {String} title-color 标题颜色（默认#303133）
 * @property {String | Number} title-size 标题字体大小，单位rpx（默认30）
 * @property {String} sub-title 头部右边的副标题
 * @property {String} sub-title-color 副标题颜色（默认#909399）
 * @property {String | Number} sub-title-size 副标题字体大小（默认26）
 * @property {Boolean} border 是否显示边框（默认true）
 * @property {String | Number} index 用于标识点击了第几个卡片
 * @property {String} box-shadow 卡片外围阴影，字符串形式（默认none）
 * @property {String} margin 卡片与屏幕两边和上下元素的间距，需带单位，如"30rpx 20rpx"（默认30rpx）
 * @property {String | Number} border-radius 卡片整体的圆角值，单位rpx（默认16）
 * @property {Object} head-style 头部自定义样式，对象形式
 * @property {Object} body-style 中部自定义样式，对象形式
 * @property {Object} foot-style 底部自定义样式，对象形式
 * @property {Boolean} head-border-bottom 是否显示头部的下边框（默认true）
 * @property {Boolean} foot-border-top 是否显示底部的上边框（默认true）
 * @property {Boolean} show-head 是否显示头部（默认true）
 * @property {Boolean} show-foot 是否显示尾部（默认true）
 * @property {String} thumb 缩略图路径，如设置将显示在标题的左边，不建议使用相对路径
 * @property {String | Number} thumb-width 缩略图的宽度，高等于宽，单位rpx（默认60）
 * @property {Boolean} thumb-circle 缩略图是否为圆形（默认false）
 * @event {Function} click 整个卡片任意位置被点击时触发
 * @event {Function} head-click 卡片头部被点击时触发
 * @event {Function} body-click 卡片主体部分被点击时触发
 * @event {Function} foot-click 卡片底部部分被点击时触发
 * @example <u-card padding="30" title="card"></u-card>
 */
const props = defineProps(CardProps);

const emit = defineEmits(['click', 'head-click', 'body-click', 'foot-click']);
const slots = useSlots();

/**
 * 整个卡片任意位置被点击时触发
 */
function onClick() {
    emit('click', props.index);
}
/**
 * 卡片头部被点击时触发
 */
function onHeadClick() {
    emit('head-click', props.index);
}
/**
 * 卡片主体部分被点击时触发
 */
function onBodyClick() {
    emit('body-click', props.index);
}
/**
 * 卡片底部部分被点击时触发
 */
function onFootClick() {
    emit('foot-click', props.index);
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-card {
    position: relative;
    overflow: hidden;
    font-size: 28rpx;
    background-color: #ffffff;
    box-sizing: border-box;

    &-full {
        // 如果是与屏幕之间不留空隙，应该设置左右边距为0
        margin-left: 0 !important;
        margin-right: 0 !important;
        width: 100%;
    }

    &--border:after {
        border-radius: 16rpx;
    }

    &__head {
        &--left {
            color: $u-main-color;

            &__thumb {
                margin-right: 16rpx;
            }

            &__title {
                max-width: 400rpx;
            }
        }

        &--right {
            color: $u-tips-color;
            margin-left: 6rpx;
        }
    }

    &__body {
        color: $u-content-color;
    }

    &__foot {
        color: $u-tips-color;
    }
}
</style>
