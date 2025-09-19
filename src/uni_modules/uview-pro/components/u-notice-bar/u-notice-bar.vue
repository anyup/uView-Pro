<template>
    <view class="u-notice-bar-wrap" v-if="isShow" :style="{ borderRadius: props.borderRadius + 'rpx' }">
        <block v-if="props.mode === 'horizontal' && props.isCircular">
            <u-row-notice
                :type="props.type"
                :color="props.color"
                :bgColor="props.bgColor"
                :list="props.list"
                :volumeIcon="props.volumeIcon"
                :moreIcon="props.moreIcon"
                :volumeSize="props.volumeSize"
                :closeIcon="props.closeIcon"
                :mode="props.mode"
                :fontSize="props.fontSize"
                :speed="props.speed"
                :playState="props.playState"
                :padding="props.padding"
                @getMore="getMore"
                @close="close"
                @click="click"
            ></u-row-notice>
        </block>
        <block v-if="props.mode === 'vertical' || (props.mode === 'horizontal' && !props.isCircular)">
            <u-column-notice
                :type="props.type"
                :color="props.color"
                :bgColor="props.bgColor"
                :list="props.list"
                :volumeIcon="props.volumeIcon"
                :moreIcon="props.moreIcon"
                :closeIcon="props.closeIcon"
                :mode="props.mode"
                :volumeSize="props.volumeSize"
                :disable-touch="props.disableTouch"
                :fontSize="props.fontSize"
                :duration="props.duration"
                :playState="props.playState"
                :padding="props.padding"
                @getMore="getMore"
                @close="close"
                @click="click"
                @end="end"
            ></u-column-notice>
        </block>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NoticeBarProps } from './types';

// 组件名称声明
defineOptions({ name: 'u-notice-bar' });

/**
 * noticeBar 滚动通知
 * @description 该组件用于滚动通告场景，有多种模式可供选择
 * @tutorial https://uviewpro.cn/zh/components/noticeBar.html
 * @property {Array} list 滚动内容，数组形式，见上方说明
 * @property {String} type 显示的主题（默认warning）
 * @property {Boolean} volumeIcon 是否显示小喇叭图标（默认true）
 * @property {Boolean} moreIcon 是否显示右边的向右箭头（默认false）
 * @property {Boolean} closeIcon 是否显示关闭图标（默认false）
 * @property {Boolean} autoplay 是否自动播放（默认true）
 * @property {String} color 文字颜色
 * @property {String|Number} bgColor 背景颜色
 * @property {String} mode 滚动模式（默认horizontal）
 * @property {Boolean} show 是否显示（默认true）
 * @property {String|Number} fontSize 字体大小，单位rpx（默认28）
 * @property {String|Number} volumeSize 左边喇叭的大小（默认34）
 * @property {String|Number} duration 滚动周期时长，只对步进模式有效，横向衔接模式无效，单位ms（默认2000）
 * @property {String|Number} speed 水平滚动时的滚动速度，即每秒移动多少距离，只对水平衔接方式有效，单位rpx（默认160）
 * @property {Boolean} isCircular mode为horizontal时，指明是否水平衔接滚动（默认true）
 * @property {String} playState 播放状态，play - 播放，paused - 暂停（默认play）
 * @property {String|Number} borderRadius 通知栏圆角（默认为0）
 * @property {String|Number} padding 内边距，字符串，与普通的内边距css写法一致（默认"18rpx 24rpx"）
 * @property {Boolean} noListHidden 列表为空时，是否显示组件（默认false）
 * @property {Boolean} disableTouch 是否禁止通过手动滑动切换通知，只有mode = vertical，或者mode = horizontal且isCircular = false时有效（默认true）
 * @event {Function} click 点击通告文字触发，只有mode = vertical，或者mode = horizontal且isCircular = false时有效
 * @event {Function} close 点击右侧关闭图标触发
 * @event {Function} getMore 点击右侧向右图标触发
 * @event {Function} end 列表的消息每次被播放一个周期时触发，只有mode = vertical，或者mode = horizontal且isCircular = false时有效
 * @example <u-notice-bar :more-icon="true" :list="list"></u-notice-bar>
 */

const props = defineProps(NoticeBarProps);

const emit = defineEmits<{ (e: 'click', index: number): void; (e: 'close'): void; (e: 'getMore'): void; (e: 'end'): void }>();

/**
 * 是否显示组件
 * 如果设置show为false，或者设置了noListHidden为true，且list长度又为零的话，隐藏组件
 */
const isShow = computed(() => {
    if (!props.show || (props.noListHidden && props.list.length === 0)) return false;
    return true;
});

/**
 * 点击通告栏
 */
function click(index: number) {
    emit('click', index);
}

/**
 * 点击关闭按钮
 */
function close() {
    emit('close');
}

/**
 * 点击更多箭头按钮
 */
function getMore() {
    emit('getMore');
}

/**
 * 滚动一个周期结束，只对垂直，或者水平步进形式有效
 */
function end() {
    emit('end');
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';
.u-notice-bar-wrap {
    overflow: hidden;
}
.u-notice-bar {
    padding: 18rpx 24rpx;
    overflow: hidden;
}
.u-direction-row {
    @include vue-flex;
    align-items: center;
    justify-content: space-between;
}
.u-left-icon {
    @include vue-flex;
    align-items: center;
}
.u-notice-box {
    flex: 1;
    @include vue-flex;
    overflow: hidden;
    margin-left: 12rpx;
}
.u-right-icon {
    margin-left: 12rpx;
    @include vue-flex;
    align-items: center;
}
.u-notice-content {
    line-height: 1;
    white-space: nowrap;
    font-size: 26rpx;
    animation: u-loop-animation 10s linear infinite both;
    text-align: right;
    // 这一句很重要，为了能让滚动左右连接起来
    padding-left: 100%;
}
@keyframes u-loop-animation {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(-100%, 0, 0);
    }
}
</style>
