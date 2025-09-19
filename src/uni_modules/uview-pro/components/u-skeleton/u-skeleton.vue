<template>
    <view v-if="loading" :style="rootStyle" @touchmove.stop.prevent>
        <view v-for="item in RectNodes" :key="$u.guid()" :class="[animation ? 'skeleton-fade' : '']" :style="rectStyle(item)"></view>
        <view v-for="item in circleNodes" :key="$u.guid()" :class="[animation ? 'skeleton-fade' : '']" :style="circleStyle(item)"></view>
        <view v-for="item in filletNodes" :key="$u.guid()" :class="[animation ? 'skeleton-fade' : '']" :style="filletStyle(item)"></view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, getCurrentInstance } from 'vue';
import { $u } from '../..';
import { SkeletonProps } from './types';

defineOptions({ name: 'u-skeleton' });

/**
 * skeleton 骨架屏
 * @description 骨架屏一般用于页面在请求远程数据尚未完成时，页面用灰色块预显示本来的页面结构，给用户更好的体验。
 * @tutorial https://uviewpro.cn/zh/components/skeleton.html
 * @property {String} elColor 骨架块状元素的背景颜色（默认#e5e5e5）
 * @property {String} bgColor 骨架组件背景颜色（默认#ffffff）
 * @property {Boolean} animation 骨架块是否显示动画效果（默认false）
 * @property {String|Number} borderRadius u-skeleton-fillet类名元素，对应的骨架块的圆角大小，单位rpx（默认10）
 * @property {Boolean} loading 是否显示骨架组件，请求完成后，将此值设置为false（默认true）
 * @example <u-skeleton :loading="true" :animation="true"></u-skeleton>
 */

const props = defineProps(SkeletonProps);

const instance = getCurrentInstance();
const windowWinth = ref(750); // 骨架屏宽度
const windowHeight = ref(1500); // 骨架屏高度
const filletNodes = ref<any[]>([]); // 圆角骨架元素
const circleNodes = ref<any[]>([]); // 圆形骨架元素
const RectNodes = ref<any[]>([]); // 矩形骨架元素
const top = ref(0);
const left = ref(0);

// 计算根元素的样式
const rootStyle = computed(() => ({
    width: windowWinth.value + 'px',
    height: windowHeight.value + 'px',
    backgroundColor: props.bgColor,
    position: 'absolute' as const,
    left: left.value + 'px',
    top: top.value + 'px',
    zIndex: 9998,
    overflow: 'hidden'
}));

// 矩形骨架元素样式
const rectStyle = (item: any) => ({
    width: item.width + 'px',
    height: item.height + 'px',
    backgroundColor: props.elColor,
    position: 'absolute' as const,
    left: item.left - left.value + 'px',
    top: item.top - top.value + 'px'
});

// 圆形骨架元素样式
const circleStyle = (item: any) => ({
    width: item.width + 'px',
    height: item.height + 'px',
    backgroundColor: props.elColor,
    borderRadius: item.width / 2 + 'px',
    position: 'absolute' as const,
    left: item.left - left.value + 'px',
    top: item.top - top.value + 'px'
});

// 圆角骨架元素样式
const filletStyle = (item: any) => ({
    width: item.width + 'px',
    height: item.height + 'px',
    backgroundColor: props.elColor,
    borderRadius: props.borderRadius + 'rpx',
    position: 'absolute' as const,
    left: item.left - left.value + 'px',
    top: item.top - top.value + 'px'
});

/**
 * 查询各节点的信息
 * @description 获取骨架屏各类型元素的位置信息
 */
function selecterQueryInfo() {
    // 获取整个父组件容器的高度，当做骨架屏的高度
    // 在微信小程序中，如果把骨架屏放入组件中使用的话，需要调in(this)上下文为父组件才有效
    let query: any = '';
    // #ifdef MP-WEIXIN
    query = uni.createSelectorQuery().in(instance?.proxy?.$parent);
    // #endif
    // #ifndef MP-WEIXIN
    query = uni.createSelectorQuery();
    // #endif
    query
        .selectAll('.u-skeleton')
        .boundingClientRect()
        .exec((res: any) => {
            windowHeight.value = res[0][0].height;
            windowWinth.value = res[0][0].width;
            top.value = res[0][0].bottom - res[0][0].height;
            left.value = res[0][0].left;
        });
    // 矩形骨架元素
    getRectEls();
    // 圆形骨架元素
    getCircleEls();
    // 圆角骨架元素
    getFilletEls();
}

/**
 * 获取矩形骨架元素
 */
function getRectEls() {
    let query: any = '';
    // 在微信小程序中，如果把骨架屏放入组件中使用的话，需要调in(this)上下文为父组件才有效
    // #ifdef MP-WEIXIN
    query = uni.createSelectorQuery().in(instance?.proxy?.$parent);
    // #endif
    // #ifndef MP-WEIXIN
    query = uni.createSelectorQuery();
    // #endif
    query
        .selectAll('.u-skeleton-rect')
        .boundingClientRect()
        .exec((res: any) => {
            RectNodes.value = res[0];
        });
}

/**
 * 获取圆角骨架元素
 */
function getFilletEls() {
    let query: any = '';
    // 在微信小程序中，如果把骨架屏放入组件中使用的话，需要调in(this)上下文为父组件才有效
    // #ifdef MP-WEIXIN
    query = uni.createSelectorQuery().in(instance?.proxy?.$parent);
    // #endif
    // #ifndef MP-WEIXIN
    query = uni.createSelectorQuery();
    // #endif
    query
        .selectAll('.u-skeleton-fillet')
        .boundingClientRect()
        .exec((res: any) => {
            filletNodes.value = res[0];
        });
}

/**
 * 获取圆形骨架元素
 */
function getCircleEls() {
    let query: any = '';
    // 在微信小程序中，如果把骨架屏放入组件中使用的话，需要调in(this)上下文为父组件才有效
    // #ifdef MP-WEIXIN
    query = uni.createSelectorQuery().in(instance?.proxy?.$parent);
    // #endif
    // #ifndef MP-WEIXIN
    query = uni.createSelectorQuery();
    // #endif
    query
        .selectAll('.u-skeleton-circle')
        .boundingClientRect()
        .exec((res: any) => {
            circleNodes.value = res[0];
        });
}

onMounted(() => {
    // 获取系统信息
    const systemInfo = uni.getSystemInfoSync();
    windowHeight.value = systemInfo.windowHeight;
    windowWinth.value = systemInfo.windowWidth;
    selecterQueryInfo();
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';
.skeleton-fade {
    width: 100%;
    height: 100%;
    background: rgb(194, 207, 214);
    animation-duration: 1.5s;
    animation-name: blink;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
}
@keyframes blink {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.4;
    }
    100% {
        opacity: 1;
    }
}
</style>
