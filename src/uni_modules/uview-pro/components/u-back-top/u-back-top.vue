<template>
    <view
        @tap="backToTop"
        class="u-back-top"
        :class="['u-back-top--mode--' + mode]"
        :style="[
            {
                bottom: bottom + 'rpx',
                right: right + 'rpx',
                borderRadius: mode == 'circle' ? '10000rpx' : '8rpx',
                zIndex: uZIndex,
                opacity: opacity
            },
            customStyle
        ]"
    >
        <view class="u-back-top__content" v-if="!slots.default">
            <u-icon @click="backToTop" :name="icon" :custom-style="iconStyle"></u-icon>
            <view class="u-back-top__content__tips">
                {{ tips }}
            </view>
        </view>
        <slot v-else />
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, useSlots } from 'vue';
import { BackTopProps } from './types';

defineOptions({
    name: 'u-back-top'
});

/**
 * back-top 返回顶部按钮
 * @description 页面滚动时显示的返回顶部按钮
 * @property {String} mode 返回顶部的形状，circle-圆形，square-方形
 * @property {String} icon 自定义图标
 * @property {String} tips 提示文字
 * @property {Number|String} duration 返回顶部滚动时间
 * @property {Number|String} scrollTop 滚动距离
 * @property {Number|String} top 距离顶部多少距离显示，单位rpx
 * @property {Number|String} bottom 返回顶部按钮到底部的距离，单位rpx
 * @property {Number|String} right 返回顶部按钮到右边的距离，单位rpx
 * @property {Number|String} zIndex 层级
 * @property {Object} iconStyle 图标的样式，对象形式
 * @property {Object} customStyle 整个组件的样式
 */
const props = defineProps(BackTopProps);

const slots = useSlots();

// 不透明度，为了让组件有一个显示和隐藏的过渡动画
const opacity = ref(0);
// 组件的z-index值，隐藏时设置为-1，就会看不到
const uZIndex = ref(-1);

/**
 * 计算是否显示返回顶部按钮
 * 由于scrollTop为页面的滚动距离，默认为px单位，这里将用于传入的top(rpx)值
 * 转为px用于比较，如果滚动条到顶的距离大于设定的距离，就显示返回顶部的按钮
 */
const showBackTop = computed(() => {
    // uni.upx2px 用于将 rpx 转为 px
    return Number(props.scrollTop) > (typeof uni !== 'undefined' && uni.upx2px ? uni.upx2px(Number(props.top)) : Number(props.top));
    // #else
    // return Number(props.scrollTop) > Number(props.top)
});

// 监听组件的显示与隐藏状态，修改组件的层级和不透明度
// 让组件有显示和消失的动画效果，如果用v-if控制组件状态，将无设置动画效果
watch(showBackTop, nVal => {
    if (nVal) {
        uZIndex.value = Number(props.zIndex);
        opacity.value = 1;
    } else {
        uZIndex.value = -1;
        opacity.value = 0;
    }
});

/**
 * 返回顶部方法
 */
function backToTop() {
    // uni.pageScrollTo 用于页面滚动到顶部
    if (typeof uni !== 'undefined' && uni.pageScrollTo) {
        uni.pageScrollTo({
            scrollTop: 0,
            duration: Number(props.duration)
        });
    }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-back-top {
    width: 80rpx;
    height: 80rpx;
    position: fixed;
    z-index: 9;
    @include vue-flex;
    flex-direction: column;
    justify-content: center;
    background-color: #e1e1e1;
    color: $u-content-color;
    align-items: center;
    transition: opacity 0.4s;

    &__content {
        @include vue-flex;
        flex-direction: column;
        align-items: center;

        &__tips {
            font-size: 24rpx;
            transform: scale(0.8);
            line-height: 1;
        }
    }
}
</style>
