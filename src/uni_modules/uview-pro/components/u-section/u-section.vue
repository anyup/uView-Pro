<template>
    <view class="u-section">
        <view
            class="u-section__title"
            :style="{
                fontWeight: bold ? 'bold' : 'normal',
                color: color,
                fontSize: fontSize + 'rpx',
                paddingLeft: showLine ? Number(fontSize) * 0.7 + 'rpx' : 0
            }"
            :class="{
                'u-section--line': showLine
            }"
        >
            <view class="u-section__title__icon-wrap u-flex" :style="lineStyle" v-if="showLine">
                <u-icon top="0" name="column-line" :size="Number(fontSize) * 1.25" bold :color="lineColor ? lineColor : color"></u-icon>
            </view>
            <text class="u-flex u-section__title__text">{{ title }}</text>
        </view>
        <view
            class="u-section__right-info"
            v-if="right || $slots.right"
            :style="{
                color: subColor
            }"
            @tap="rightClick"
        >
            <slot name="right" v-if="$slots.right" />
            <template v-else>
                {{ subTitle }}
                <view class="u-section__right-info__icon-arrow u-flex" v-if="arrow">
                    <u-icon name="arrow-right" size="24" :color="subColor"></u-icon>
                </view>
            </template>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { SectionProps } from './types';
import { $u } from '../..';

defineOptions({ name: 'u-section' });

/**
 * section 查看更多
 * @description 该组件一般用于分类信息有很多，但是限于篇幅只能列出一部分，让用户通过"查看更多"获得更多信息的场景，实际效果见演示。
 * @tutorial https://uviewpro.cn/zh/components/section.html
 * @property {String} title 左边主标题
 * @property {String} subTitle 右边副标题（默认更多）
 * @property {Boolean} right 是否显示右边的内容（默认true）
 * @property {Boolean} showLine 是否显示左边的竖条（默认true）
 * @property {Boolean} arrow 是否显示右边箭头（默认true）
 * @property {String|Number} fontSize 主标题的字体大小（默认28）
 * @property {Boolean} bold 主标题是否加粗（默认true）
 * @property {String} color 主标题颜色（默认#303133）
 * @property {String} subColor 右边副标题颜色（默认#909399）
 * @property {String} lineColor 左边竖线的颜色
 * @event click 组件右侧的内容被点击时触发，用于跳转"更多"
 * @example <u-section title="今日热门" :right="false"></u-section>
 */

const props = defineProps(SectionProps);

const emit = defineEmits(['click']);

/**
 * 左边竖条的样式
 * @description 由于安卓和iOS的，需要稍微调整绝对定位的top值，才能让左边的竖线和右边的文字垂直居中
 */
const lineStyle = computed(() => {
    let isIOS = $u.os && $u.os() === 'ios';
    return {
        // 由于竖线为字体图标，具有比实际线宽更宽的宽度，所以也需要根据字体打下动态调整
        left: -(Number(props.fontSize) * 0.9) + 'rpx',
        top: -(Number(props.fontSize) * (isIOS ? 0.14 : 0.15)) + 'rpx'
    };
});

/**
 * 组件右侧的内容被点击时触发，用于跳转"更多"
 */
function rightClick() {
    emit('click');
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-section {
    @include vue-flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &__title {
        position: relative;
        font-size: 28rpx;
        padding-left: 20rpx;
        @include vue-flex;
        align-items: center;

        &__icon-wrap {
            position: absolute;
        }

        &__text {
            line-height: 1;
        }
    }

    &__right-info {
        color: $u-tips-color;
        font-size: 26rpx;
        @include vue-flex;
        align-items: center;

        &__icon-arrow {
            margin-left: 6rpx;
        }
    }
}
</style>
