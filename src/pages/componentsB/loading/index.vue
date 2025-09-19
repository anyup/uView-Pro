<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-loading :mode="mode" :show="show" :color="color" :size="size"></u-loading>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">模式</view>
                <u-subsection :list="['圆圈', '花朵']" @change="modeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">颜色(只对圆圈模式有效)</view>
                <u-subsection :list="['default', 'primary', 'error', 'warning', 'success']" @change="colorChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">尺寸(单位rpx)</view>
                <u-subsection current="1" :list="['28', '34', '40']" @change="sizeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">是否显示</view>
                <u-subsection current="1" :list="['否', '是']" @change="showChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

// 加载模式
const mode = ref<'circle' | 'flower'>('circle');
// 加载颜色
const color = ref<string>('#c7c7c7');
// 加载尺寸
const size = ref<string>('34');
// 是否显示
const show = ref<boolean>(true);

/**
 * 切换加载模式
 * @param index 选中索引
 */
function modeChange(index: number): void {
    mode.value = index === 0 ? 'circle' : 'flower';
}

/**
 * 切换颜色
 * @param index 选中索引
 */
function colorChange(index: number): void {
    if (index === 0) {
        color.value = '#c7c7c7';
    } else {
        // 颜色映射
        const colorMap: Record<number, keyof typeof $u.color> = {
            1: 'primary',
            2: 'error',
            3: 'warning',
            4: 'success'
        };
        color.value = $u.color[colorMap[index]];
    }
}

/**
 * 切换尺寸
 * @param index 选中索引
 */
function sizeChange(index: number): void {
    size.value = index === 0 ? '28' : index === 1 ? '34' : '40';
}

/**
 * 切换显示状态
 * @param index 选中索引
 */
function showChange(index: number): void {
    show.value = !!index;
}
</script>
