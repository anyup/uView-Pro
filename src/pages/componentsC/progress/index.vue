<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-line-progress v-if="mode == 'line'" :percent="percent" :active-color="activeColor" :striped="striped" :stripedActive="stripedActive"></u-line-progress>
                <u-circle-progress v-else :percent="percent" :active-color="activeColor" bg-color="rgb(250, 250, 250)">
                    <view class="u-progress-content">
                        <view class="u-progress-dot"></view>
                        <text class="u-progress-info">查找中</text>
                    </view>
                </u-circle-progress>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">模式选择</view>
                <u-subsection :current="current" :list="['线型', '圆型']" @change="modeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">增减</view>
                <u-subsection :list="['减少30%', '增加30%']" @change="calcChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">自定义样式(线型时有效)</view>
                <u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">动态条纹(线型时有效)</view>
                <u-subsection current="1" :list="['是', '否']" @change="stripedChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

const percent = ref(50);
const mode = ref('line');
const activeColor = ref('#19be6b');
const striped = ref(false);
const stripedActive = ref(false);
const current = ref(0);

function modeChange(index: number) {
    current.value = index;
    mode.value = index === 0 ? 'line' : 'circle';
}

function calcChange(index: number) {
    percent.value = index === 0 ? percent.value - 30 : percent.value + 30;
    if (percent.value > 100) percent.value = 100;
    if (percent.value < 0) percent.value = 0;
}

function styleChange(index: number) {
    activeColor.value = index === 0 ? $u.color['error'] : '#19be6b';
    if (index === 0) {
        mode.value = 'line';
        current.value = 0;
    }
}

function stripedChange(index: number) {
    striped.value = index === 0;
    stripedActive.value = striped.value;
    if (index === 0) {
        mode.value = 'line';
        current.value = 0;
    }
}
</script>

<style lang="scss" scoped>
.u-progress-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

.u-progress-dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    background-color: #fb9126;
}

.u-progress-info {
    font-size: 28rpx;
    padding-left: 16rpx;
    letter-spacing: 2rpx;
}
</style>
