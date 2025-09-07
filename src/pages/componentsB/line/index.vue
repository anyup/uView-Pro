<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area u-flex u-row-center">
                <!-- 头条小程序因为兼容性，必须要给组件写上u-line类 -->
                <u-line class="u-line" :border-style="borderStyle" :color="color" :length="length" :direction="direction" :hair-line="hairLine"></u-line>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">颜色</view>
                <u-subsection :list="['primary', 'success', 'warning', 'error', 'info']" @change="colorChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">线条类型</view>
                <u-subsection :list="['实线', '方形虚线', '圆点虚线']" @change="borderStyleChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">细边</view>
                <u-subsection :list="['是', '否']" @change="hairLineChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">方向</view>
                <u-subsection :list="['水平', '垂直']" @change="directionChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { $u } from '@/uni_modules/uview-pro';
import { ref } from 'vue';
import type { LineBorderStyle, LineDirection } from '@/uni_modules/uview-pro/types/global';

const direction = ref<LineDirection>('row');
const hairLine = ref(true);
const length = ref('100%');
const color = ref($u.color['primary']);
const borderStyle = ref<LineBorderStyle>('solid');

function colorChange(index: number) {
    color.value = $u.color[['primary', 'success', 'warning', 'error', 'info'][index]];
}

function hairLineChange(index: number) {
    hairLine.value = !index;
}

function directionChange(index: number) {
    direction.value = index === 0 ? 'row' : ('col' as LineDirection);
    if (index === 0) length.value = '100%';
    else length.value = '50rpx';
}

function borderStyleChange(index: number) {
    borderStyle.value = ['solid', 'dashed', 'dotted'][index] as LineBorderStyle;
}
</script>
