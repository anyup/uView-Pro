<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="u-no-demo-here" style="text-align: left"> 此处演示为通过JS调用框架内置颜色值，此外还可以通过scss变量调用。 </view>
                <view class="u-demo-result-line" :style="{ color: color, backgroundColor: '#ffffff' }"> 晓镜但愁云鬓改，夜吟应觉月光寒 </view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">主题</view>
                <u-subsection :list="['primary', 'success', 'error', 'warning', 'info']" @change="modeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">常用颜色</view>
                <u-subsection :list="['主要文字', '常规文字', '次要文字', '占位文字', '边框颜色']" @change="colorChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

const color = ref($u.color['primary']);

function modeChange(index: number): void {
    let colorName = index === 0 ? 'primary' : index === 1 ? 'success' : index === 2 ? 'error' : index === 3 ? 'warning' : 'info';
    color.value = $u.color[colorName];
}

function colorChange(index: number): void {
    color.value = index === 0 ? '#303133' : index === 1 ? '#606266' : index === 2 ? '#909399' : index === 3 ? '#c0c4cc' : '#e4e7ed';
}
</script>
