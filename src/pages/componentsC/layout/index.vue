<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-row :justify="justify" @click="rowClick">
                    <u-col :span="span" :offset="offset" @click="click" stop>
                        <view class="demo-layout bg-purple-dark"> </view>
                    </u-col>
                    <u-col :span="span" :offset="offset">
                        <view class="demo-layout bg-purple-dark"> </view>
                    </u-col>
                    <u-col :span="span" :offset="offset">
                        <view class="demo-layout bg-purple-dark"> </view>
                    </u-col>
                </u-row>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">每个栅格占用栏数(演示共3个栅格)</view>
                <u-subsection :current="2" :list="['1', '2', '3', '4', '5']" @change="spanChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">分栏偏移</view>
                <u-subsection :list="['0', '1', '2', '3', '4']" @change="offsetChange"></u-subsection>
            </view>
            <!-- #ifndef MP -->
            <view class="u-config-item">
                <view class="u-item-title">水平排列方式(微信小程序无效)</view>
                <u-subsection :list="['start', 'end', 'around', 'between']" @change="justifyChange"></u-subsection>
            </view>
            <!-- #endif -->
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { RowJustify } from '@/uni_modules/uview-pro/types/global';

const span = ref(3);
const offset = ref(0);
const justify = ref<RowJustify>('start');

function click() {
    console.log('col click');
}

function rowClick() {
    console.log('row click');
}

function spanChange(e: number) {
    switch (e) {
        case 0:
            span.value = 1;
            break;
        case 1:
            span.value = 2;
            break;
        case 2:
            span.value = 3;
            break;
        case 3:
            span.value = 4;
            break;
        case 4:
            span.value = 5;
            break;
    }
}

function offsetChange(e: number) {
    switch (e) {
        case 0:
            offset.value = 0;
            break;
        case 1:
            offset.value = 1;
            break;
        case 2:
            offset.value = 2;
            break;
        case 3:
            offset.value = 3;
            break;
    }
}

function justifyChange(e: number) {
    switch (e) {
        case 0:
            justify.value = 'start';
            break;
        case 1:
            justify.value = 'end';
            break;
        case 2:
            justify.value = 'around';
            break;
        case 3:
            justify.value = 'between';
            break;
    }
}
</script>

<style scoped lang="scss">
.demo-layout {
    height: 70rpx;
    border-radius: 8rpx;
    margin: 20rpx 0;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.bg-purple-dark {
    background: #99a9bf;
}

// H5中，电脑端文档演示时，可能会导致演示块挤出边界，特别处理。
// 真实使用环境不会产生此问题
/* #ifdef H5 */
.u-demo-area :deep(.u-row) {
    display: flex;
    flex-wrap: wrap;
}
/* #endif */
</style>
