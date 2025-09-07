<!--
 * @Desc: ---   ----
 * @Date: 2020-04-22 12:29:21
 * @LastEditors: 王
 * @LastEditTime: 2020-04-22 18:33:28
 -->
<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-gap :bg-color="bgColor" :height="height" :margin-top="marginTop" :margin-bottom="marginBottom"></u-gap>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom">参数配置</view>
            <view class="u-config-item">
                <view class="u-item-title">背景颜色</view>
                <u-subsection :list="['default', 'primary', 'error', 'warning', 'success']" @change="bgColorChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">高度</view>
                <u-subsection :list="['30', '50', '70']" @change="heightChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">上下外边距</view>
                <u-subsection :list="['30', '50', '70']" @change="marginChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

const height = ref(30);
const bgColor = ref($u.color.bgColor);
const marginTop = ref<number | string>(30);
const marginBottom = ref<number | string>(30);

function bgColorChange(index: number) {
    const color = index === 0 ? 'default' : index === 1 ? 'primary' : index === 2 ? 'error' : index === 3 ? 'warning' : 'success';
    bgColor.value = color === 'default' ? $u.color['bgColor'] : $u.color[color];
}

function heightChange(index: number) {
    height.value = index === 0 ? 30 : index === 1 ? 50 : 70;
}

function marginChange(index: number) {
    marginTop.value = ['30', '50', '70'][index];
    marginBottom.value = marginTop.value;
}
</script>

<style lang="scss" scoped>
.wrap {
    padding: 24rpx;
}
</style>
