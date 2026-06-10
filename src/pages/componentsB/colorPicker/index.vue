<template>
    <demo-page
        title="ColorPicker 颜色选择器"
        desc="用于颜色选择，支持弹窗和内联两种模式，可选择单色或渐变色，支持透明度、吸管、历史记录和预设颜色。"
        :apis="'color-picker'"
    >
        <template #default>
            <view class="u-demo">
                <!-- 弹窗模式 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">弹窗模式</view>
                    <view class="u-demo-area">
                        <view class="demo-preview-row">
                            <u-color-picker
                                :show="popupShow"
                                v-model="popupColor"
                                :colorMode="popupColorMode"
                                :showAlpha="popupShowAlpha"
                                :showEyeDropper="true"
                                :showHistory="popupShowHistory"
                                :showPresets="popupShowPresets"
                                :shape="popupShape"
                                @confirm="onPopupConfirm"
                                @cancel="popupShow = false"
                                @update:show="(val: boolean) => (popupShow = val)"
                            ></u-color-picker>
                            <view class="demo-result">
                                <view class="demo-color-block" :style="{ background: popupColor }"></view>
                                <text class="demo-color-value">{{ popupColor }}</text>
                            </view>
                        </view>
                        <u-button type="primary" shape="circle" @click="popupShow = true">打开颜色选择器</u-button>
                    </view>
                </view>

                <!-- 内联模式 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">内联模式</view>
                    <view class="u-demo-area">
                        <u-color-picker
                            v-model="inlineColor"
                            mode="inline"
                            :colorMode="inlineColorMode"
                            :showAlpha="inlineShowAlpha"
                            :showEyeDropper="true"
                            :showHistory="inlineShowHistory"
                            :showPresets="inlineShowPresets"
                            @change="onInlineChange"
                        ></u-color-picker>
                        <view class="demo-result" style="margin-top: 20rpx">
                            <text class="demo-label">当前颜色：</text>
                            <text class="demo-color-value">{{ inlineColor }}</text>
                        </view>
                    </view>
                </view>

                <!-- 仅单色模式 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">仅单色模式（无渐变）</view>
                    <view class="u-demo-area">
                        <u-color-picker
                            :show="solidShow"
                            v-model="solidColor"
                            colorMode="solid"
                            :showAlpha="true"
                            @confirm="solidShow = false"
                            @cancel="solidShow = false"
                            @update:show="(val: boolean) => (solidShow = val)"
                        ></u-color-picker>
                        <view class="demo-result">
                            <view class="demo-color-block" :style="{ background: solidColor }"></view>
                            <text class="demo-color-value">{{ solidColor }}</text>
                        </view>
                        <u-button type="primary" shape="circle" @click="solidShow = true" style="margin-top: 20rpx">
                            选择单色
                        </u-button>
                    </view>
                </view>

                <!-- 圆形触发器 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">圆形触发器</view>
                    <view class="u-demo-area">
                        <u-color-picker
                            :show="circleShow"
                            v-model="circleColor"
                            shape="circle"
                            size="80rpx"
                            @confirm="circleShow = false"
                            @cancel="circleShow = false"
                            @update:show="(val: boolean) => (circleShow = val)"
                        ></u-color-picker>
                        <text class="demo-color-value" style="margin-top: 20rpx; display: block">{{
                            circleColor
                        }}</text>
                    </view>
                </view>

                <!-- 使用 u-color-select-panel 直接嵌入 -->
                <view class="u-demo-wrap">
                    <view class="u-demo-title">直接使用颜色选择面板</view>
                    <view class="u-demo-area">
                        <u-color-select-panel
                            v-model="panelColor"
                            :showEyeDropper="true"
                            :showHistory="true"
                            :showPresets="true"
                            @change="onPanelChange"
                        ></u-color-select-panel>
                    </view>
                </view>

                <!-- 参数配置 -->
                <view class="u-config-wrap">
                    <view class="u-config-title u-border-bottom">弹窗模式参数配置</view>
                    <view class="u-config-item">
                        <view class="u-item-title">颜色模式</view>
                        <u-subsection
                            :list="['全部', '纯色', '渐变']"
                            :current="popupColorModeIndex"
                            @change="popupColorModeChange"
                        ></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">显示透明度</view>
                        <u-subsection
                            :list="['显示', '隐藏']"
                            :current="popupShowAlpha ? 0 : 1"
                            @change="popupShowAlphaChange"
                        ></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">显示历史记录</view>
                        <u-subsection
                            :list="['显示', '隐藏']"
                            :current="popupShowHistory ? 0 : 1"
                            @change="popupShowHistoryChange"
                        ></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">显示预设颜色</view>
                        <u-subsection
                            :list="['显示', '隐藏']"
                            :current="popupShowPresets ? 0 : 1"
                            @change="popupShowPresetsChange"
                        ></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">触发器形状</view>
                        <u-subsection
                            :list="['方形', '圆形']"
                            :current="popupShape === 'square' ? 0 : 1"
                            @change="popupShapeChange"
                        ></u-subsection>
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const popupShow = ref(false);
const popupColor = ref('#2979ff');
const popupColorMode = ref<string>('both');
const popupShowAlpha = ref(true);
const popupShowHistory = ref(true);
const popupShowPresets = ref(true);
const popupShape = ref<'square' | 'circle'>('square');

const popupColorModeIndex = ref(0);

const inlineColor = ref('#ff6b6b');
const inlineColorMode = ref('both');
const inlineShowAlpha = ref(true);
const inlineShowHistory = ref(true);
const inlineShowPresets = ref(true);

const solidShow = ref(false);
const solidColor = ref('#00c853');

const circleShow = ref(false);
const circleColor = ref('#e040fb');

const panelColor = ref('#ff9800');

function onPopupConfirm(color: string) {
    console.log('弹窗模式确认颜色：', color);
}

function onInlineChange(color: string) {
    console.log('内联模式颜色变化：', color);
}

function onPanelChange(color: string) {
    console.log('面板颜色变化：', color);
}

function popupColorModeChange(index: number) {
    const modes = ['both', 'solid', 'gradient'];
    popupColorMode.value = modes[index];
    popupColorModeIndex.value = index;
}

function popupShowAlphaChange(index: number) {
    popupShowAlpha.value = index === 0;
}

function popupShowHistoryChange(index: number) {
    popupShowHistory.value = index === 0;
}

function popupShowPresetsChange(index: number) {
    popupShowPresets.value = index === 0;
}

function popupShapeChange(index: number) {
    popupShape.value = index === 0 ? 'square' : 'circle';
}
</script>

<style lang="scss">
.u-demo-wrap {
    background-color: var(--u-bg-white);
    padding: 40rpx 8rpx;
    margin-left: -14rpx;
    margin-right: -14rpx;
    margin-bottom: 20rpx;
}

.u-demo-title {
    font-size: 28rpx;
    font-weight: bold;
    color: var(--u-main-color);
    margin-bottom: 20rpx;
}

.u-demo-area {
    padding: 10rpx 0;
}

.demo-preview-row {
    display: flex;
    align-items: center;
    gap: 20rpx;
    margin-bottom: 20rpx;
    flex-wrap: wrap;
}

.demo-result {
    display: flex;
    align-items: center;
    gap: 16rpx;
}

.demo-color-block {
    width: 80rpx;
    height: 80rpx;
    border-radius: 12rpx;
    border: 1px solid var(--u-border-color);
}

.demo-color-value {
    font-size: 28rpx;
    color: var(--u-content-color);
    font-family: monospace;
}

.demo-label {
    font-size: 28rpx;
    color: var(--u-main-color);
}

.u-config-wrap {
    background-color: var(--u-bg-white);
    padding: 30rpx 20rpx;
    border-radius: 16rpx;
    margin-bottom: 30rpx;
}

.u-config-title {
    font-size: 32rpx;
    font-weight: bold;
    color: var(--u-main-color);
    padding-bottom: 24rpx;
    margin-bottom: 24rpx;
    border-bottom: 1px solid var(--u-divider-color);
}

.u-config-item {
    margin-top: 30rpx;
}

.u-item-title {
    font-size: 28rpx;
    color: var(--u-tips-color);
    margin-bottom: 16rpx;
}
</style>
