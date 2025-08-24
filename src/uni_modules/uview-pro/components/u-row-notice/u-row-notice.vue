<template>
    <view v-if="props.show" class="u-notice-bar" :style="{ background: computeBgColor, padding: props.padding }" :class="[props.type ? `u-type-${props.type}-light-bg` : '']">
        <view class="u-direction-row">
            <view class="u-icon-wrap">
                <u-icon class="u-left-icon" v-if="props.volumeIcon" name="volume-fill" :size="props.volumeSize" :color="computeColor"></u-icon>
            </view>
            <view class="u-notice-box" id="u-notice-box">
                <view class="u-notice-content" id="u-notice-content" :style="{ animationDuration: animationDuration, animationPlayState: animationPlayState }">
                    <text class="u-notice-text" @tap="click" :style="textStyle" :class="['u-type-' + props.type]">{{ showText }}</text>
                </view>
            </view>
            <view class="u-icon-wrap">
                <u-icon @click="getMore" class="u-right-icon" v-if="props.moreIcon" name="arrow-right" :size="26" :color="computeColor"></u-icon>
                <u-icon @click="close" class="u-right-icon" v-if="props.closeIcon" name="close" :size="24" :color="computeColor"></u-icon>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import { RowNoticeProps } from './types';

defineOptions({ name: 'u-row-notice' });

/**
 * u-row-notice 水平滚动通告栏
 * @property {Array} list 显示的内容，数组
 * @property {String} type 显示的主题，success|error|primary|info|warning|none
 * @property {Boolean} volumeIcon 是否显示左侧的音量图标
 * @property {Boolean} moreIcon 是否显示右侧的右箭头图标
 * @property {Boolean} closeIcon 是否显示右侧的关闭图标
 * @property {Boolean} autoplay 是否自动播放
 * @property {String} color 文字颜色，各图标也会使用文字颜色
 * @property {String} bgColor 背景颜色
 * @property {Boolean} show 是否显示
 * @property {String|Number} fontSize 字体大小，单位rpx
 * @property {String|Number} volumeSize 音量喇叭的大小
 * @property {String|Number} speed 水平滚动时的滚动速度，即每秒滚动多少rpx
 * @property {String} playState 播放状态，play-播放，paused-暂停
 * @property {String|Number} padding 通知的边距
 */

const props = defineProps(RowNoticeProps);

const emit = defineEmits<{ (e: 'click'): void; (e: 'close'): void; (e: 'getMore'): void }>();
const instance = getCurrentInstance();
const textWidth = ref(0); // 滚动的文字宽度
const animationDuration = ref('10s'); // 动画执行时间
const animationPlayState = ref('paused'); // 动画的开始和结束执行
const showText = ref(''); // 显示的文本

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
 * 计算背景颜色
 */
const computeBgColor = computed(() => {
    if (props.bgColor) return props.bgColor;
    else if (props.type === 'none') return 'transparent';
    else return '';
});

/**
 * 初始化滚动宽度和动画
 */
function initSize() {
    nextTick(() => {
        uni.createSelectorQuery()
            .in(instance?.proxy)
            .select('#u-notice-content')
            .boundingClientRect()
            .exec(ret => {
                textWidth.value = ret[0]?.width || 0;
                // 根据t=s/v(时间=路程/速度)，这里为何不需要加上#u-notice-box的宽度，因为中设置了.u-notice-content样式中设置了padding-left: 100%
                // 恰巧计算出来的结果中已经包含了#u-notice-box的宽度
                animationDuration.value = `${textWidth.value / uni.upx2px(Number(props.speed))}s`;
                // 这里必须这样开始动画，否则在APP上动画速度不会改变(HX版本2.4.6，IOS13)
                animationPlayState.value = 'paused';
                setTimeout(() => {
                    if (props.playState === 'play' && props.autoplay) animationPlayState.value = 'running';
                }, 10);
            });
    });
}

watch(
    () => props.list,
    val => {
        showText.value = val.join('，');
        initSize();
    },
    { immediate: true }
);

watch(
    () => props.playState,
    val => {
        animationPlayState.value = val === 'play' ? 'running' : 'paused';
    }
);

watch(
    () => props.speed,
    () => {
        initSize();
    }
);

onMounted(() => {
    initSize();
});

/**
 * 点击通告栏
 */
function click() {
    emit('click');
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
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

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
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
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
    display: inline-flex;
    align-items: center;
}

.u-notice-content {
    animation: u-loop-animation 10s linear infinite both;
    text-align: right;
    // 这一句很重要，为了能让滚动左右连接起来
    padding-left: 100%;
    @include vue-flex;
    flex-wrap: nowrap;
}

.u-notice-text {
    font-size: 26rpx;
    word-break: keep-all;
    white-space: nowrap;
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
