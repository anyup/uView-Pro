<template>
    <view
        class="u-wrap"
        :style="{
            opacity: Number(opacity),
            borderRadius: props.borderRadius + 'rpx',
            // 因为time值需要改变,所以不直接用duration值(不能改变父组件prop传过来的值)
            transition: `opacity ${Number(time) / 1000}s ${props.effect}`
        }"
        :class="'u-lazy-item-' + elIndex"
    >
        <view :class="'u-lazy-item-' + elIndex">
            <image
                :style="{ borderRadius: props.borderRadius + 'rpx', height: imgHeight }"
                v-if="!isError"
                class="u-lazy-item"
                :src="isShow ? props.image : props.loadingImg"
                :mode="props.imgMode"
                @load="imgLoaded"
                @error="loadError"
                @tap="clickImg"
            ></image>
            <image
                :style="{ borderRadius: props.borderRadius + 'rpx', height: imgHeight }"
                class="u-lazy-item error"
                v-else
                :src="props.errorImg"
                :mode="props.imgMode"
                @load="errorImgLoaded"
                @tap="clickImg"
            ></image>
        </view>
    </view>
</template>

<script setup lang="ts">
import { LazyLoadProps } from './types';
import { ref, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import { $u } from '../..';

defineOptions({ name: 'u-lazy-load' });

/**
 * lazyLoad 懒加载
 * @description 懒加载使用的场景为：页面有很多图片时，APP会同时加载所有的图片，导致页面卡顿，各个位置的图片出现前后不一致等.
 * @tutorial https://uviewpro.cn/zh/components/lazyLoad.html
 * @property {String | Number} index 用户自定义值，在事件触发时回调，用以区分是哪个图片
 * @property {String} image 图片路径
 * @property {String} loading-img 预加载时的占位图
 * @property {String} error-img 图片加载出错时的占位图
 * @property {String | Number} threshold 触发加载时的位置，单位 rpx（默认300）
 * @property {String | Number} duration 图片加载成功时，淡入淡出时间，单位ms（默认）
 * @property {String} effect 图片加载成功时，淡入淡出的css动画效果（默认ease-in-out）
 * @property {Boolean} is-effect 图片加载成功时，是否启用淡入淡出效果（默认true）
 * @property {String | Number} border-radius 图片圆角值，单位rpx（默认0）
 * @property {String | Number} height 图片高度，注意：实际高度可能受img-mode参数影响（默认450）
 * @property {String} img-mode 图片的裁剪模式，详见image组件裁剪模式（默认widthFix）
 * @event {Function} click 点击图片时触发
 * @event {Function} load 图片加载成功时触发
 * @event {Function} error 图片加载失败时触发
 * @example <u-lazy-load :image="image" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
 */

const emit = defineEmits(['click', 'load', 'error']);

const props = defineProps(LazyLoadProps);

const instance = getCurrentInstance();
// 懒加载相关响应式变量
const isShow = ref(false);
const opacity = ref(1);
const time = ref(Number(props.duration));
const loadStatus = ref(''); // 默认是懒加载中的状态
const isError = ref(false); // 图片加载失败
const elIndex = ref('');

// IntersectionObserver 实例
let contentObserver: any = null;

/**
 * 将 threshold 从 rpx 转为 px
 */
const getThreshold = computed(() => {
    // 先取绝对值，因为 threshold 可能是负数，最后根据 props.threshold 是正数或者负数，重新还原
    const thresholdPx = uni.upx2px(Math.abs(Number(props.threshold)));
    return Number(props.threshold) < 0 ? -thresholdPx : thresholdPx;
});

/**
 * 计算图片的高度，可能为 auto，带 %，或者直接数值
 */
const imgHeight = computed(() => {
    return $u.addUnit(props.height);
});

// 监听 isShow 变化，处理淡入淡出动画
watch(isShow, nVal => {
    // 如果是不开启过渡效果，直接返回
    if (!props.isEffect) return;
    time.value = 0;
    // 原来opacity为1(不透明，是为了显示占位图)，改成0(透明，意味着该元素显示的是背景颜色，默认的白色)，再改成1，是为了获得过渡效果
    opacity.value = 0;
    // 延时30ms，否则在浏览器H5，过渡效果无效
    setTimeout(() => {
        time.value = Number(props.duration);
        opacity.value = 1;
    }, 30);
});

// 监听图片路径变化，重置状态，图片路径发生变化时，需要重新标记一些变量，否则会一直卡在某一个状态，比如isError
watch(
    () => props.image,
    n => {
        if (!n) {
            // 如果传入null或者''，或者undefined，标记为错误状态
            isError.value = true;
        } else {
            init();
            isError.value = false;
        }
    }
);

/**
 * 用于重新初始化
 */
function init() {
    isError.value = false;
    loadStatus.value = '';
}

/**
 * 点击图片触发的事件
 * loadlazy-还是懒加载中状态，loading-图片正在加载，loaded-图片加加载完成
 */
function clickImg() {
    let whichImg = '';
    // 如果isShow为false，意味着图片还没开始加载，点击的只能是最开始的占位图
    if (!isShow.value) whichImg = 'lazyImg';
    // 如果isError为true，意味着图片加载失败，这是只剩下错误的占位图，所以点击的只能是错误占位图
    // 当然，也可以给错误的占位图元素绑定点击事件，看你喜欢~
    else if (isError.value) whichImg = 'errorImg';
    // 总共三张图片，除了两个占位图，剩下的只能是正常的那张图片了
    else whichImg = 'realImg';
    // 只通知当前图片的index
    emit('click', props.index);
}

/**
 * 图片加载完成事件
 * 可能是加载占位图时触发，也可能是加载真正的图片完成时触发，通过 isShow 区分
 */
function imgLoaded() {
    // 占位图加载完成
    if (loadStatus.value === '') {
        loadStatus.value = 'lazyed';
    } else if (loadStatus.value === 'lazyed') {
        // 真正的图片加载完成
        loadStatus.value = 'loaded';
        emit('load', props.index);
    }
}

/**
 * 错误的图片加载完成
 */
function errorImgLoaded() {
    emit('error', props.index);
}

/**
 * 图片加载失败
 */
function loadError() {
    isError.value = true;
}

/**
 * 断开 IntersectionObserver
 */
function disconnectObserver(observerName: string) {
    if (observerName === 'contentObserver' && contentObserver) {
        contentObserver.disconnect();
        contentObserver = null;
    }
}

onMounted(() => {
    // 生成唯一 id
    elIndex.value = $u.guid();
    nextTick(() => {
        uni.$once('uOnReachBottom', () => {
            if (!isShow.value) isShow.value = true;
        });
        // mounted的时候，不一定挂载了这个元素，延时30ms，否则会报错或者不报错，但是也没有效果
        setTimeout(() => {
            // 这里是组件内获取布局状态，不能用uni.createIntersectionObserver，而必须用this.createIntersectionObserver
            disconnectObserver('contentObserver');
            contentObserver = uni.createIntersectionObserver(instance?.proxy);
            // 要理解这里怎么计算的，请看这个：
            // https://blog.csdn.net/qq_25324335/article/details/83687695
            contentObserver.relativeToViewport({ bottom: getThreshold.value }).observe('.u-lazy-item-' + elIndex.value, (res: any) => {
                if (res.intersectionRatio > 0) {
                    // 懒加载状态改变
                    isShow.value = true;
                    // 如果图片已经加载，去掉监听，减少性能的消耗
                    disconnectObserver('contentObserver');
                }
            });
        }, 30);
    });
});
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-wrap {
    background-color: #eee;
    overflow: hidden;
}

.u-lazy-item {
    width: 100%;
    // 骗系统开启硬件加速
    transform: transition3d(0, 0, 0);
    // 防止图片加载“闪一下”
    will-change: transform;
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
}
</style>
