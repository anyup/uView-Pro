<template>
    <view>
        <view class="u-steps" :style="directionStyle">
            <view class="u-steps__item" :class="['u-steps__item--' + direction]" v-for="(item, index) in list" :key="index">
                <view class="u-steps__item__num" v-if="mode == 'number'" :style="numberStyle(index)">
                    <text v-if="currentIndex < index" :style="textStyle(index)">
                        {{ index + 1 }}
                    </text>
                    <u-icon v-else size="22" color="#ffffff" :name="icon"></u-icon>
                </view>
                <view class="u-steps__item__dot" v-if="mode == 'dot'" :style="dotStyle(index)"></view>
                <text class="u-line-1" :style="textStyle(index)" :class="['u-steps__item__text--' + direction]">
                    {{ item.name }}
                </text>
                <view class="u-steps__item__line" :class="['u-steps__item__line--' + mode]" v-if="index < list.length - 1">
                    <u-line :direction="direction" length="100%" :hair-line="false" :color="unActiveColor"></u-line>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { StepsProps } from './types';

defineOptions({ name: 'u-steps' });

/**
 * steps 步骤条
 * @description 该组件一般用于完成一个任务要分几个步骤，标识目前处于第几步的场景。
 * @tutorial https://uviewpro.cn/zh/components/steps.html
 * @property {String} mode 设置模式（默认dot）
 * @property {Array<{name: string}>} list 数轴条数据，数组。具体见上方示例
 * @property {String} type type主题（默认primary）
 * @property {String} direction row-横向，column-竖向（默认row）
 * @property {Number|String} current 设置当前处于第几步
 * @property {String} activeColor 已完成步骤的激活颜色，如设置，type值会失效
 * @property {String} unActiveColor 未激活的颜色，用于表示未完成步骤的颜色（默认#606266）
 * @property {String} icon 自定义图标
 * @example <u-steps :list="numList" active-color="#fa3534"></u-steps>
 */

const props = defineProps(StepsProps);

// 计算属性，计算当前步骤的索引值
// 如果 current 是字符串，则转换为数字，否则直接使用数字
const currentIndex = computed(() => (typeof props.current === 'string' ? Number(props.current) : props.current));

// 计算方向样式
const directionStyle = computed(() => ({ flexDirection: props.direction as 'row' | 'column' }));

// 计算当前步骤的样式
const numberStyle = (index: number) => ({
    backgroundColor: currentIndex.value < index ? 'transparent' : props.activeColor,
    borderColor: currentIndex.value < index ? props.unActiveColor : props.activeColor
});

// 计算当前步骤的样式
const dotStyle = (index: number) => ({
    backgroundColor: index <= currentIndex.value ? props.activeColor : props.unActiveColor
});

// 计算当前步骤的文字样式
const textStyle = (index: number) => ({
    color: index <= currentIndex.value ? props.activeColor : props.unActiveColor
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

$u-steps-item-number-width: 44rpx;
$u-steps-item-dot-width: 20rpx;

.u-steps {
    @include vue-flex;

    .u-steps__item {
        flex: 1;
        text-align: center;
        position: relative;
        min-width: 100rpx;
        font-size: 26rpx;
        color: #8799a3;
        @include vue-flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        &--row {
            @include vue-flex;
            flex-direction: column;

            .u-steps__item__line {
                position: absolute;
                z-index: 0;
                left: 75%;
                width: 50%;

                &--dot {
                    top: calc(#{$u-steps-item-dot-width} / 2);
                }

                &--number {
                    top: calc(#{$u-steps-item-number-width} / 2);
                }
            }
        }

        &--column {
            @include vue-flex;
            flex-direction: row;
            justify-content: flex-start;
            min-height: 120rpx;

            .u-steps__item__line {
                position: absolute;
                z-index: 0;
                height: 50%;
                top: 75%;

                &--dot {
                    left: calc(#{$u-steps-item-dot-width} / 2);
                }

                &--number {
                    left: calc(#{$u-steps-item-number-width} / 2);
                }
            }
        }

        &__num {
            @include vue-flex;
            align-items: center;
            justify-content: center;
            width: $u-steps-item-number-width;
            height: $u-steps-item-number-width;
            border: 1px solid #8799a3;
            border-radius: 50%;
            overflow: hidden;
        }

        &__dot {
            width: $u-steps-item-dot-width;
            height: $u-steps-item-dot-width;
            @include vue-flex;
            border-radius: 50%;
        }

        &__text--row {
            margin-top: 14rpx;
        }

        &__text--column {
            margin-left: 14rpx;
        }
    }
}
</style>
