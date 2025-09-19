<template>
    <view>
        <view
            class="u-sticky-wrap"
            :class="[elClass]"
            :style="{
                height: fixed ? height + 'px' : 'auto',
                backgroundColor: bgColor
            }"
        >
            <view
                class="u-sticky"
                :style="{
                    position: fixed ? 'fixed' : 'static',
                    top: stickyTop + 'px',
                    left: left + 'px',
                    width: width == 'auto' ? 'auto' : width + 'px',
                    zIndex: uZIndex
                }"
            >
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue';
import { $u } from '../..';
import { StickyProps } from './types';

defineOptions({ name: 'u-sticky' });

/**
 * sticky 吸顶
 * @description 该组件与CSS中position: sticky属性实现的效果一致，当组件达到预设的到顶部距离时， 就会固定在指定位置，组件位置大于预设的顶部距离时，会重新按照正常的布局排列。
 * @tutorial https://uviewpro.cn/zh/components/sticky.html
 * @property {String|Number} offsetTop 吸顶时与顶部的距离，单位rpx（默认0）
 * @property {String|Number} index 自定义标识，用于区分是哪一个组件
 * @property {Boolean} enable 是否开启吸顶功能（默认true）
 * @property {String} bgColor 组件背景颜色（默认#ffffff）
 * @property {String|Number} zIndex 吸顶时的z-index值（默认970）
 * @property {String|Number} h5NavHeight 导航栏高度，自定义导航栏时(无导航栏时需设置为0)，需要传入此值，单位px（默认44）
 * @event fixed 组件吸顶时触发
 * @event unfixed 组件取消吸顶时触发
 * @example <u-sticky offset-top="200"><view>塞下秋来风景异，衡阳雁去无留意</view></u-sticky>
 */
const props = defineProps(StickyProps);

const emit = defineEmits(['fixed', 'unfixed']);

const instance = getCurrentInstance();
const fixed = ref(false);
const height = ref<'auto' | number>('auto');
const stickyTop = ref(0);
const elClass = ref('');
const left = ref(0);
const width = ref<'auto' | number>('auto');
let contentObserver: any = null;

elClass.value = $u.guid();

const uZIndex = computed(() => (props.zIndex ? props.zIndex : ($u?.zIndex?.sticky ?? 970)));

watch(
    () => props.offsetTop,
    () => {
        initObserver();
    }
);

watch(
    () => props.enable,
    val => {
        if (val == false) {
            fixed.value = false;
            disconnectObserver('contentObserver');
        } else {
            initObserver();
        }
    }
);

onMounted(() => {
    initObserver();
});

onBeforeUnmount(() => {
    disconnectObserver('contentObserver');
});

/**
 * 初始化 IntersectionObserver 监听
 */
function initObserver() {
    if (!props.enable) return;
    // #ifdef H5
    stickyTop.value = Number(props.offsetTop) !== 0 ? uni.upx2px(Number(props.offsetTop)) + Number(props.h5NavHeight) : Number(props.h5NavHeight);
    // #endif
    // #ifndef H5
    stickyTop.value = Number(props.offsetTop) !== 0 ? uni.upx2px(Number(props.offsetTop)) : 0;
    // #endif
    console.log('stickyTop.value', stickyTop.value);
    disconnectObserver('contentObserver');
    $u.getRect('.' + elClass.value, instance).then((res: any) => {
        height.value = res.height;
        left.value = res.left;
        width.value = res.width;
        nextTick(() => {
            observeContent();
        });
    });
}

/**
 * 创建 IntersectionObserver 监听内容区域
 */
function observeContent() {
    disconnectObserver('contentObserver');

    contentObserver = uni.createIntersectionObserver(instance?.proxy, {
        thresholds: [0.95, 0.98, 1]
    });
    contentObserver.relativeToViewport({
        top: -stickyTop.value
    });
    contentObserver.observe('.' + elClass.value, (res: any) => {
        if (!props.enable) return;
        setFixed(res.boundingClientRect.top);
    });
}

/**
 * 设置 fixed 状态
 */
function setFixed(top: number) {
    const isFixed = top < stickyTop.value;
    if (isFixed) emit('fixed', props.index);
    else if (fixed.value) emit('unfixed', props.index);
    fixed.value = isFixed;
}

/**
 * 断开 observer
 */
function disconnectObserver(observerName: string) {
    if (observerName === 'contentObserver' && contentObserver) {
        contentObserver.disconnect();
        contentObserver = null;
    }
}
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';
.u-sticky {
    z-index: 9999999999;
}
</style>
