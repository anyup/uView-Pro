<template>
    <view class="u-notice-bar" :style="{ background: computeBgColor, padding: props.padding }" :class="[props.type ? `u-type-${props.type}-light-bg` : '']">
        <view class="u-icon-wrap">
            <u-icon class="u-left-icon" v-if="props.volumeIcon" name="volume-fill" :size="props.volumeSize" :color="computeColor"></u-icon>
        </view>
        <swiper
            :disable-touch="props.disableTouch"
            @change="change"
            :autoplay="props.autoplay && props.playState === 'play'"
            :vertical="vertical"
            circular
            :interval="props.duration"
            class="u-swiper"
        >
            <swiper-item v-for="(item, index) in props.list" :key="index" class="u-swiper-item">
                <view class="u-news-item u-line-1" :style="textStyle" @tap="click(index)" :class="['u-type-' + props.type]">
                    {{ item }}
                </view>
            </swiper-item>
        </swiper>
        <view class="u-icon-wrap">
            <u-icon @click="getMore" class="u-right-icon" v-if="props.moreIcon" name="arrow-right" :size="26" :color="computeColor"></u-icon>
            <u-icon @click="close" class="u-right-icon" v-if="props.closeIcon" name="close" :size="24" :color="computeColor"></u-icon>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ColumnNoticeProps } from './types';

defineOptions({ name: 'u-column-notice' });

/**
 * u-column-notice 通告栏
 * @property {Array} list 显示的内容，数组
 * @property {String} type 显示的主题，success|error|primary|info|warning
 * @property {Boolean} volumeIcon 是否显示左侧的音量图标
 * @property {Boolean} moreIcon 是否显示右侧的右箭头图标
 * @property {Boolean} closeIcon 是否显示右侧的关闭图标
 * @property {Boolean} autoplay 是否自动播放
 * @property {String} color 文字颜色，各图标也会使用文字颜色
 * @property {String} bgColor 背景颜色
 * @property {String} direction 滚动方向，row-水平滚动，column-垂直滚动
 * @property {Boolean} show 是否显示
 * @property {String|Number} fontSize 字体大小，单位rpx
 * @property {String|Number} duration 滚动一个周期的时间长，单位ms
 * @property {String|Number} volumeSize 音量喇叭的大小
 * @property {Number} speed 水平滚动时的滚动速度，即每秒滚动多少rpx
 * @property {Boolean} isCircular 水平滚动时，是否采用衔接形式滚动
 * @property {String} mode 滚动方向，horizontal-水平滚动，vertical-垂直滚动
 * @property {String} playState 播放状态，play-播放，paused-暂停
 * @property {Boolean} disableTouch 是否禁止用手滑动切换
 * @property {String|Number} padding 通知的边距
 */

const props = defineProps(ColumnNoticeProps);

const emit = defineEmits<{ (e: 'click', index: number): void; (e: 'close'): void; (e: 'getMore'): void; (e: 'end'): void }>();

/**
 * 计算字体颜色，如果没有自定义的，就用uview主题颜色
 */
const computeColor = computed(() => {
    if (props.color) return props.color;
    // 如果是无主题，就默认使用content-color
    else if (props.type === 'none') return '#606266';
    else return props.type;
});

/**
 * 文字内容的样式
 */
const textStyle = computed(() => {
    const style: Record<string, any> = {};
    if (props.color) style.color = props.color;
    else if (props.type === 'none') style.color = '#606266';
    style.fontSize = props.fontSize + 'rpx';
    return style;
});

/**
 * 垂直或者水平滚动
 */
const vertical = computed(() => {
    return props.mode !== 'horizontal';
});

/**
 * 计算背景颜色
 */
const computeBgColor = computed(() => {
    if (props.bgColor) return props.bgColor;
    else if (props.type === 'none') return 'transparent';
    else return '';
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
 * swiper 切换事件
 */
function change(e: { detail: { current: number } }) {
    const index = e.detail.current;
    if (index === props.list.length - 1) {
        emit('end');
    }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-notice-bar {
    width: 100%;
    @include vue-flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    padding: 18rpx 24rpx;
    overflow: hidden;
}

.u-swiper {
    font-size: 26rpx;
    height: 32rpx;
    @include vue-flex;
    align-items: center;
    flex: 1;
    margin-left: 12rpx;
}

.u-swiper-item {
    @include vue-flex;
    align-items: center;
    overflow: hidden;
}

.u-news-item {
    overflow: hidden;
}

.u-right-icon {
    margin-left: 12rpx;
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    align-items: center;
}

.u-left-icon {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    align-items: center;
}
</style>
