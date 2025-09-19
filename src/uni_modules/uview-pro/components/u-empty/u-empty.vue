<template>
    <view class="u-empty" v-if="show" :style="{ marginTop: marginTop + 'rpx' }">
        <u-icon
            :name="src ? src : 'empty-' + mode"
            :custom-style="iconStyle"
            :label="text ? text : icons[mode]"
            label-pos="bottom"
            :label-color="color"
            :label-size="fontSize"
            :size="iconSize"
            :color="iconColor"
            margin-top="14"
        ></u-icon>
        <view class="u-slot-wrap">
            <slot name="bottom"></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
import { EmptyProps } from './types';

defineOptions({
    name: 'u-empty'
});

/**
 * empty 内容为空
 * @description 该组件用于需要加载内容，但是加载的第一页数据就为空，提示一个"没有内容"的场景， 我们精心挑选了十几个场景的图标，方便您使用。
 * @tutorial https://uviewpro.cn/zh/components/empty.html
 * @property {String} color 文字颜色（默认#c0c4cc）
 * @property {String} text 文字提示（默认“无内容”）
 * @property {String} src 自定义图标路径，如定义，mode参数会失效
 * @property {String Number} font-size 提示文字的大小，单位rpx（默认28）
 * @property {String} mode 内置的图标，见官网说明（默认data）
 * @property {String Number} img-width 图标的宽度，单位rpx（默认240）
 * @property {String} img-height 图标的高度，单位rpx（默认auto）
 * @property {String Number} margin-top 组件距离上一个元素之间的距离（默认0）
 * @property {Boolean} show 是否显示组件（默认true）
 * @event {Function} click 点击组件时触发
 * @event {Function} close 点击关闭按钮时触发
 * @example <u-empty text="所谓伊人，在水一方" mode="list"></u-empty>
 */
const props = defineProps(EmptyProps);

/**
 * 预置图标对应的提示文字
 */
const icons: Record<string, string> = {
    car: '购物车为空',
    page: '页面不存在',
    search: '没有搜索结果',
    address: '没有收货地址',
    wifi: '没有WiFi',
    order: '订单为空',
    coupon: '没有优惠券',
    favor: '暂无收藏',
    permission: '无权限',
    history: '无历史记录',
    news: '无新闻列表',
    message: '消息列表为空',
    list: '列表为空',
    data: '数据为空'
};
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-empty {
    @include vue-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.u-image {
    margin-bottom: 20rpx;
}

.u-slot-wrap {
    @include vue-flex;
    justify-content: center;
    align-items: center;
    margin-top: 20rpx;
}
</style>
