<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-subsection v-if="change" :bold="bold" :active-color="activeColor" :current="current" :mode="mode" :list="['代付款', '待收货', '待评价']"></u-subsection>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">模式选择(为满足演示需要，切换会有抖动，非性能问题)</view>
                <u-subsection mode="button" :list="['button', 'subsection']" @change="modeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">Current值</view>
                <u-subsection mode="button" :list="['0', '1', '2']" @change="currentChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">活动选项字颜色</view>
                <u-subsection mode="button" :list="['primary', 'success', 'error', 'warning']" @change="colorChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">字体加粗</view>
                <u-subsection mode="button" :list="['是', '否']" @change="boldChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import { $u } from '@/uni_modules/uview-pro';
import type { SubsectionMode } from '@/uni_modules/uview-pro/types/global';

const mode = ref<SubsectionMode>('button');
const current = ref(0);
const activeColor = ref($u.color['warning']);
const bold = ref(true);
const change = ref(true);

function modeChange(e: number) {
    switch (e) {
        case 0:
            mode.value = 'button';
            break;
        case 1:
            mode.value = 'subsection';
            break;
    }
    change.value = false;
    nextTick(() => {
        change.value = true;
    });
}

function currentChange(e: number) {
    current.value = e;
}

function colorChange(e: number) {
    let color = 'primary';
    switch (e) {
        case 0:
            color = 'primary';
            break;
        case 1:
            color = 'success';
            break;
        case 2:
            color = 'error';
            break;
        case 3:
            color = 'warning';
            break;
    }
    activeColor.value = $u.color[color];
}

function boldChange(e: number) {
    switch (e) {
        case 0:
            bold.value = true;
            break;
        case 1:
            bold.value = false;
            break;
    }
}
</script>
