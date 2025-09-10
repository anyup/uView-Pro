<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="u-badge-wrap"><u-badge :is-center="isCenter" :type="type" :count="count" :is-dot="isDot" :offset="offset" :size="size"></u-badge></view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom">参数配置</view>
            <view class="u-config-item">
                <view class="u-item-title">数值显示</view>
                <u-subsection current="1" :list="['0', '8', '15', '106', '209']" @change="countChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">主题选择</view>
                <u-subsection current="2" :list="['primary', 'success', 'error', 'warning', 'info']" @change="typeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">显示点</view>
                <u-subsection current="1" :list="['是', '否']" @change="isDotChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">尺寸</view>
                <u-subsection :list="['default', 'mini']" @change="sizeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">位置偏移</view>
                <u-subsection current="1" :list="['[20, 20]', '[-8, -8]', '[-20, -20]']" @change="offsetChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">中心点与父右上角重合</view>
                <u-subsection current="1" :list="['是', '否']" @change="isCenterChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { ThemeType, BadgeSize } from '@/uni_modules/uview-pro/types/global';

const count = ref(8);
const type = ref<ThemeType>('error');
const isDot = ref(false);
const offset = ref<[number, number]>([-8, -8]);
const size = ref<BadgeSize>('default');
const isCenter = ref(false);

function countChange(index: number) {
    count.value = index === 0 ? 0 : index === 1 ? 8 : index === 2 ? 15 : index === 3 ? 106 : 209;
}

function typeChange(index: number) {
    type.value = index === 0 ? 'primary' : index === 1 ? 'success' : index === 2 ? 'error' : index === 3 ? 'warning' : 'info';
}

function sizeChange(index: number) {
    size.value = index === 0 ? 'default' : 'mini';
}

function isDotChange(index: number) {
    isDot.value = index === 0 ? true : false;
}

function offsetChange(index: number) {
    offset.value = index === 0 ? [20, 20] : index === 1 ? [-8, -8] : [-20, -20];
}

function isCenterChange(index: number) {
    isCenter.value = index === 0 ? true : false;
}
</script>

<style lang="scss" scoped>
.u-badge-wrap {
    width: 60px;
    height: 60px;
    border-radius: 6px;
    background-color: $u-light-color;
    position: relative;
    margin: auto;
}
</style>
