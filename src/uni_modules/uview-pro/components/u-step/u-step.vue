<template>
    <view class="u-steps__item" :class="[customClass, 'u-steps__item--' + direction]" :style="$u.toStyle(customStyle)">
        <view class="u-steps__item__num--wrap" v-if="mode == 'number'">
            <view class="u-steps__item__num">
                <view
                    class="u-steps__item__num--text"
                    v-if="currentIndex < childIndex"
                    :style="numberStyle(childIndex)"
                >
                    <text :style="textStyle(childIndex)">
                        {{ childIndex + 1 }}
                    </text>
                </view>
                <view v-else class="u-steps__item__num--circle">
                    <slot name="icon">
                        <view class="u-steps__item__num--icon" :style="numberStyle(childIndex)">
                            <u-icon size="22" color="#ffffff" :name="iconName"></u-icon>
                        </view>
                    </slot>
                </view>
            </view>
        </view>
        <view class="u-steps__item__dot" v-else-if="mode == 'dot'">
            <view class="u-steps__item__dot--box" :style="dotStyle(childIndex)"></view>
        </view>
        <view>
            <view class="u-line-1" :style="textStyle(childIndex)" :class="['u-steps__item__text--' + direction]">
                <slot name="name">
                    <text>
                        {{ name }}
                    </text>
                </slot>
            </view>
            <view v-if="hasDesc" :class="['u-steps__item__desc--' + direction]">
                <slot name="desc">
                    <text>
                        {{ desc }}
                    </text>
                </slot>
            </view>
        </view>
        <view class="u-steps__item__line" :class="['u-steps__item__line--' + mode]" v-if="showLine">
            <u-line :direction="direction" length="100%" :hair-line="false" :color="unActiveColor"></u-line>
        </view>
    </view>
</template>
<script lang="ts">
export default {
    name: 'u-step',
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
import { computed } from 'vue';
import { $u, useChildren } from '../..';
import { StepProps } from './types';

const props = defineProps(StepProps);

// 使用组件关系 hooks 获取父组件
const { childIndex, parentExposed } = useChildren('u-step', 'u-steps');

// 父组件的默认值（兼容没有父组件的场景）
const parentData = computed(() => {
    return (
        parentExposed?.value?.props || {
            mode: 'dot',
            list: [],
            type: 'primary',
            current: 0,
            activeColor: $u.color.primary,
            unActiveColor: $u.color.info,
            icon: 'checkmark',
            direction: 'row'
        }
    );
});

const childLen = computed(() => {
    if (parentExposed?.value?.childLen && typeof parentExposed?.value?.childLen === 'function') {
        return parentExposed?.value?.childLen();
    }
    return 0;
});

const showLine = computed(() => childIndex.value < childLen.value - 1);

// 计算属性，计算当前步骤的索引值
// 如果 current 是字符串，则转换为数字，否则直接使用数字
const currentIndex = computed(() =>
    typeof parentData.value.current === 'string' ? Number(parentData.value.current) : parentData.value.current
);
const mode = computed(() => parentData.value.mode);
const direction = computed(() => parentData.value.direction);
// 计算方向样式

const activeColor = computed(() => props.activeColor || parentData.value.activeColor);
const unActiveColor = computed(() => props.unActiveColor || parentData.value.unActiveColor);

const name = computed(() => props.name || '');
const desc = computed(() => props.desc || '');
const hasDesc = computed(() => !$u.test.isEmpty(desc));
const iconName = computed(() => {
    if (props.icon !== parentData.value.icon) {
        if (props.icon !== 'checkmark') {
            return props.icon;
        } else if (parentData.value.icon !== 'checkmark') {
            return parentData.value.icon;
        }
    }
    return props.icon || parentData.value.icon;
});

// 计算当前步骤的样式
const numberStyle = (index: number) => ({
    backgroundColor: currentIndex.value < index ? '#fff' : activeColor.value,
    borderColor: currentIndex.value < index ? unActiveColor.value : activeColor.value
});

// 计算当前步骤的样式
const dotStyle = (index: number) => ({
    backgroundColor: index <= currentIndex.value ? activeColor.value : unActiveColor.value
});

// 计算当前步骤的文字样式
const textStyle = (index: number) => ({
    color: index <= currentIndex.value ? activeColor.value : unActiveColor.value
});
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

$u-steps-item-number-width: 44rpx;
$u-steps-item-dot-width: 20rpx;

.inline-block {
    display: inline-block;
}
.u-steps__item {
    flex: 1;
    text-align: center;
    position: relative;
    min-width: 100rpx;
    font-size: 26rpx;
    color: #8799a3;
    @include vue-flex;
    flex-direction: column;

    &--row {
        align-items: center;
        @include vue-flex;
        flex-direction: column;

        .u-steps__item__line {
            position: absolute;
            z-index: 0;

            &--dot {
                width: calc(100% - #{$u-steps-item-dot-width});
                top: calc(#{$u-steps-item-dot-width} / 2);
                left: calc(#{$u-steps-item-dot-width} / 2 + 50%);
            }

            &--number {
                width: calc(100% - $u-steps-item-number-width);
                top: calc(#{$u-steps-item-number-width} / 2);
                left: calc(#{$u-steps-item-number-width} / 2 + 50%);
            }
        }
    }

    &--column {
        @include vue-flex;
        flex-direction: row;
        justify-content: flex-start;
        min-height: 120rpx;
        padding-bottom: 6rpx;

        .u-steps__item__line {
            position: absolute;
            z-index: 0;

            &--dot {
                height: calc(100% - #{$u-steps-item-dot-width});
                top: calc(#{$u-steps-item-dot-width} + 6rpx);
                left: calc(#{$u-steps-item-dot-width} / 2);
            }

            &--number {
                height: calc(100% - #{$u-steps-item-number-width});
                top: #{$u-steps-item-number-width};
                left: calc(#{$u-steps-item-number-width} / 2);
            }
        }

        .u-steps__item__dot {
            margin-top: 6rpx;
        }
    }

    &__num {
        &--wrap {
            width: $u-steps-item-number-width;
            height: $u-steps-item-number-width;
        }
        &--text,
        &--icon,
        &--circle {
            @include vue-flex;
            align-items: center;
            justify-content: center;
            width: $u-steps-item-number-width;
            height: $u-steps-item-number-width;
            overflow: hidden;
        }
        &--text,
        &--icon {
            border: 1px solid #8799a3;
            border-radius: 50%;
        }
    }

    &__dot {
        display: inline-block;
        width: $u-steps-item-dot-width;
        height: $u-steps-item-dot-width;
        // @include vue-flex;
        &--box {
            width: $u-steps-item-dot-width;
            height: $u-steps-item-dot-width;
            border-radius: 50%;
            overflow: hidden;
        }
    }

    &__text--row {
        margin-top: 14rpx;
    }

    &__text--column {
        margin-left: 14rpx;
        text-align: left;
    }

    &__desc--row {
        color: $u-type-info;
        font-size: 24rpx;
    }

    &__desc--column {
        margin-left: 14rpx;
        text-align: left;
        color: $u-type-info;
        font-size: 24rpx;
    }
}
</style>
