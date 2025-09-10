<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast :type="type" ref="uToastRef"></u-toast>
                <u-notice-bar
                    :autoplay="autoplay"
                    :playState="playState"
                    :speed="speed"
                    @getMore="getMore"
                    :mode="mode"
                    @end="end"
                    @close="close"
                    @click="click"
                    :show="show"
                    :type="type"
                    :list="list"
                    :moreIcon="moreIcon"
                    :volumeIcon="volumeIcon"
                    :duration="duration"
                    :isCircular="isCircular"
                ></u-notice-bar>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">主题</view>
                <u-subsection :current="3" :list="['primary', 'success', 'error', 'warning', 'none']" @change="typeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">滚动模式</view>
                <u-subsection :current="current" :list="['水平', '垂直']" @change="modeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">是否衔接(水平模式有效)</view>
                <u-subsection :list="['是', '否']" @change="isCircularChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">状态</view>
                <u-subsection :list="['播放', '暂停']" @change="playStateChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">速度</view>
                <u-subsection :current="1" :list="['慢', '正常', '快']" @change="speedChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">图标</view>
                <u-subsection :list="['显示', '隐藏']" @change="iconChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Direction, PlayState, ThemeType } from '@/uni_modules/uview-pro/types/global';

const show = ref(true);
const autoplay = ref(false);
const type = ref<ThemeType>('warning');
const list = ref(['锦瑟无端五十弦，一弦一柱思华年', '庄生晓梦迷蝴蝶，望帝春心托杜鹃', '沧海月明珠有泪，蓝田日暖玉生烟']);
const mode = ref<Direction>('horizontal');
const playState = ref<PlayState>('play');
const speed = ref(160);
const duration = ref(2000);
const moreIcon = ref(true);
const volumeIcon = ref(true);
const isCircular = ref(true);
const current = ref(0);

const uToastRef = ref(null);

function typeChange(index: number) {
    type.value = index === 0 ? 'primary' : index === 1 ? 'success' : index === 2 ? 'error' : index === 3 ? 'warning' : undefined;
}

function modeChange(index: number) {
    current.value = index;
    mode.value = index === 0 ? 'horizontal' : 'vertical';
}

function playStateChange(index: number) {
    playState.value = index === 0 ? 'play' : 'paused';
}

function speedChange(index: number) {
    if (index === 0) {
        speed.value = 50;
        duration.value = 6000;
    } else if (index === 1) {
        speed.value = 160;
        duration.value = 2000;
    } else {
        speed.value = 350;
        duration.value = 400;
    }
}

function iconChange(index: number) {
    if (index === 0) {
        moreIcon.value = true;
        volumeIcon.value = true;
    } else {
        moreIcon.value = false;
        volumeIcon.value = false;
    }
}

function isCircularChange(index: number) {
    isCircular.value = index === 0;
    current.value = index;
    mode.value = 'horizontal';
}

function getMore() {
    toast('点击了更多');
}

function toast(title: string) {
    uToastRef.value.show({ title: title, type: 'warning' });
}

function end() {
    console.log('end');
}

function close() {
    console.log('close');
}

function click(index: number) {
    if (mode.value == 'horizontal' && isCircular) {
        toast('此模式无法获取Index值');
    } else {
        toast('点击了第' + index + '项');
    }
}
</script>

<style lang="scss" scoped>
.item {
    margin-top: 30px;
}
</style>
