<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area u-flex u-row-center">
                <u-image :shape="shape" ref="uImageRef" :width="width" :height="height" :src="src" mode="aspectFill" :use-slots="{ loading: loadingSlot, error: errorSlot }">
                    <template #loading>
                        <u-loading size="44" mode="flower"></u-loading>
                    </template>
                    <template #error>
                        <view style="font-size: 24rpx">加载失败</view>
                    </template>
                </u-image>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom">参数配置</view>
            <view class="u-config-item">
                <view class="u-item-title">状态</view>
                <u-subsection :current="statusCurrent" :list="['加载成功', '加载中', '加载失败']" @change="statusChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">加载中状态</view>
                <u-subsection :list="['默认', '自定义']" @change="loadingChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">加载失败状态</view>
                <u-subsection :list="['默认', '自定义']" @change="errorChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">形状</view>
                <u-subsection :list="['方形', '圆形']" @change="shapeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">图片地址</view>
                <u-subsection :list="['网络', '本地']" @change="srcChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { type ImageInstance } from '@/uni_modules/uview-pro/components/u-image/types';
import { ref } from 'vue';
import type { Shape } from '@/uni_modules/uview-pro/types/global';

// 定义响应式数据
const src = ref('https://ik.imagekit.io/anyup/uview-pro/common/logo.png');
const width = ref('200');
const height = ref('200');
const loadingSlot = ref(false);
const statusCurrent = ref(0);
const errorSlot = ref(false);
const shape = ref<Shape>('square');
// 获取 uImage 组件实例
const uImageRef = ref<ImageInstance>();

// 定义方法
const statusChange = (index: number) => {
    if (index == 0) {
        uImageRef.value?.changeStatus('normal');
    } else if (index == 1) {
        uImageRef.value?.changeStatus('loading');
    } else {
        uImageRef.value?.changeStatus('error');
    }
};

const loadingChange = (index: number) => {
    statusCurrent.value = 1;
    statusChange(1);
    loadingSlot.value = index !== 0;
};

const errorChange = (index: number) => {
    statusCurrent.value = 2;
    statusChange(2);
    errorSlot.value = index !== 0;
};

const shapeChange = (index: number) => {
    shape.value = index === 0 ? 'square' : 'circle';
};

const srcChange = (index: number) => {
    if (index == 0) {
        src.value = 'https://ik.imagekit.io/anyup/uview-pro/common/logo.png';
    } else {
        src.value = '/static/logo.png';
    }
};
</script>
