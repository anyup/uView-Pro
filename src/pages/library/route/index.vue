<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-button @click="openPage">点击跳转</u-button>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">类型</view>
                <u-subsection :list="['navigateTo', 'switchTab', 'navigateBack']" @change="typeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">携带参数(针对type=navigateTo)</view>
                <u-subsection :list="['是', '否']" @change="paramsChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">窗口动画(App且type=navigateTo||navigateBack时有效)</view>
                <u-subsection :list="['是', '否']" @change="animateChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

type RouteType = 'to' | 'tab' | 'back';
type AnimationType = string;
interface Params {
    age?: number;
    name?: string;
    [key: string]: any;
}

const type = ref<RouteType>('to');
const params = ref<Params>({
    age: 22,
    name: '李商隐'
});
const animate = ref<AnimationType>('slide-in-bottom');
const url = ref<string>('');

const jumpUrl = computed(() => {
    let url = '';
    if (type.value === 'to') {
        url = '/pages/library/route/routeTo';
    } else if (type.value === 'tab') {
        url = '/pages/example/about';
    }
    return url;
});

/**
 * 打开页面
 */
function openPage() {
    $u.route({
        type: type.value,
        params: params.value,
        url: jumpUrl.value,
        animationType: animate.value
    });
}

/**
 * 类型变更处理
 * @param index 选择的索引
 */
function typeChange(index: number): void {
    type.value = index === 0 ? 'to' : index === 1 ? 'tab' : 'back';
}

/**
 * 参数变更处理
 * @param index 选择的索引
 */
function paramsChange(index: number): void {
    if (!index) {
        params.value = {
            age: 22,
            name: '李商隐'
        };
    } else {
        params.value = {};
    }
}

/**
 * 动画变更处理
 * @param index 选择的索引
 */
function animateChange(index: number): void {
    animate.value = index === 0 ? 'slide-in-bottom' : '';
}
</script>

<style lang="scss" scoped>
.wrap {
    padding: 24rpx;
}
</style>
