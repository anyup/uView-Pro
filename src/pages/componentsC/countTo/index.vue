<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToastRef"></u-toast>
                <view class="u-no-demo-here">如果使用text-align: center对齐，数字滚动期间可能会抖动，见文档说明</view>
                <view class="count-to-demo">
                    <u-count-to
                        class="count-to"
                        :useEasing="useEasing"
                        ref="uCountToRef"
                        :autoplay="autoplay"
                        :startVal="startVal"
                        :endVal="endVal"
                        :duration="duration"
                        :decimals="decimals"
                        :bold="bold"
                        @end="end"
                    ></u-count-to>
                </view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom">参数配置</view>
            <view class="u-config-item">
                <view class="u-item-title">状态</view>
                <u-subsection :current="current" :list="['启动', '暂停', '继续', '重置']" @change="statusChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">目标值</view>
                <u-subsection :list="['608', '5604', '45617']" @change="endValChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">滚动时间</view>
                <u-subsection current="1" :list="['1000', '2000', '3000']" @change="durationChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">显示小数</view>
                <u-subsection current="1" :list="['是', '否']" @change="decimalsChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">字体加粗</view>
                <u-subsection current="1" :list="['是', '否']" @change="boldChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';

const uToastRef = ref(null);
const uCountToRef = ref(null);

const startVal = ref(0);
const endVal = ref(608);
const separator = ref(',');
const decimals = ref(0);
const duration = ref(2000);
const autoplay = ref(false);
const useEasing = ref(true);
const current = ref(3);
const isStop = ref(false); // 如果开没启动前，不允许点击状态选项的"继续"按钮，否则会导致显示NaN
const bold = ref(false);

function endValChange(index: number) {
    endVal.value = index === 0 ? 608 : index === 1 ? 5604 : 45617;
    reset();
    start();
}

function durationChange(index: number) {
    duration.value = index === 0 ? 1000 : index === 1 ? 2000 : 3000;
}

function boldChange(index: number) {
    bold.value = !!!index;
}

function decimalsChange(index: number) {
    decimals.value = index === 0 ? 2 : 0;
}

function statusChange(index: number) {
    current.value = index;
    if (index === 0) {
        start();
    } else if (index === 1) {
        stop();
    } else if (index === 2) {
        resume();
    } else {
        reset();
    }
}

function end() {
    current.value = 3;
    uToastRef.value?.show({
        type: 'warning',
        title: '滚动结束'
    });
}

function start() {
    current.value = 0;
    isStop.value = true;
    uCountToRef.value?.start();
}

function stop() {
    uCountToRef.value?.stop();
}

function resume() {
    if (!isStop.value) {
        uToastRef.value?.show({
            type: 'error',
            title: '请开始并暂停后才能继续'
        });
        nextTick(() => {
            current.value = 3;
        });
        return;
    }
    uCountToRef.value?.resume();
}

function reset() {
    uCountToRef.value?.reset();
}
</script>

<style lang="scss" scoped>
.count-to-demo {
    text-align: center;
}
</style>
