<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="u-no-demo-here">滚动页面即可在右下角看到返回顶部的按钮</view>
            </view>
            <u-back-top
                :scrollTop="scrollTop"
                :mode="mode"
                :bottom="bottom"
                :right="right"
                :top="top"
                :icon="icon"
                :custom-style="customStyle"
                :icon-style="iconStyle"
                :tips="tips"
            >
            </u-back-top>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">模式</view>
                <u-subsection :list="['圆形', '方形']" @change="modeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">组件位置</view>
                <u-subsection :list="['默认', '自定义']" @change="positionChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">显示组件的滚动条距离</view>
                <u-subsection current="1" :list="['200', '400', '600']" @change="scrollTopChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">自定义样式</view>
                <u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Shape } from '@/uni_modules/uview-pro/types/global';

const scrollTop = ref(0);
const mode = ref<Shape>('circle');
const bottom = ref(200);
const right = ref(40);
const top = ref(400);
const icon = ref('arrow-upward');
const iconStyle = ref({
    color: '#909399',
    fontSize: '38rpx'
});
const customStyle = ref({});
const tips = ref('');

function modeChange(index: number) {
    mode.value = !index ? 'circle' : 'square';
}

function positionChange(index: number) {
    if (index === 0) {
        bottom.value = 200;
        right.value = 40;
    } else {
        bottom.value = 400;
        right.value = 80;
    }
}

function scrollTopChange(index: number) {
    top.value = [200, 400, 600][index];
}

function styleChange(index: number) {
    if (index === 0) {
        icon.value = 'arrow-up';
        iconStyle.value = {
            color: '#2979ff',
            fontSize: '34rpx'
        };
        customStyle.value = {
            backgroundColor: '#a0cfff',
            color: '#2979ff'
        };
        tips.value = '顶部';
    } else {
        icon.value = 'arrow-upward';
        iconStyle.value = {
            color: '#909399',
            fontSize: '38rpx'
        };
    }
}
</script>

<style lang="scss" scoped>
.u-demo {
    height: 200vh;
}
</style>
