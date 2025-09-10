<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="input-wrap">
                    <input class="input" disabled type="text" :value="input" placeholder="来自键盘的输入内容" />
                    <u-button :custom-style="{ height: '32px' }" :hairLine="false" class="clear-btn" @click="clear()">清空</u-button>
                </view>
                <u-keyboard
                    :mask="mask"
                    ref="uKeyboard"
                    safe-area-inset-bottom
                    @confirm="confirm"
                    :random="random"
                    :dotEnable="false"
                    :mode="mode"
                    :confirmBtn="true"
                    :cancelBtn="true"
                    :tooltip="tooltip"
                    v-model="show"
                    @change="change"
                    @backspace="backspace"
                ></u-keyboard>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">键盘开关</view>
                <u-subsection :current="show == true ? 0 : 1" :list="['开', '关']" @change="statusChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">键盘类型</view>
                <u-subsection :list="['数字键盘', '身份证键盘', '车牌号键盘']" @change="modeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">打乱顺序</view>
                <u-subsection :current="1" :list="['是', '否']" @change="randomChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">上方工具条</view>
                <u-subsection :list="['显示', '隐藏']" @change="tooltipChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">是否显示遮罩</view>
                <u-subsection :list="['显示', '隐藏']" @change="maskChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const show = ref(false);
const input = ref('');
const mode = ref('number');
const random = ref(false);
const tooltip = ref(true);
const mask = ref(true);

function clear() {
    input.value = '';
}

function statusChange(index: number) {
    show.value = index === 0;
}

function modeChange(index) {
    mode.value = index === 0 ? 'number' : index === 1 ? 'card' : 'car';
    show.value = true;
}

function randomChange(index: number) {
    random.value = index === 0;
    show.value = true;
}

function tooltipChange(index: number) {
    tooltip.value = index === 0;
    show.value = true;
}

function maskChange(index: number) {
    show.value = true;
    mask.value = index === 0;
}

function backspace() {
    if (input.value.length) input.value = input.value.substring(0, input.value.length - 1);
}

function change(detail: string) {
    input.value += detail;
}

function confirm(e: any) {
    console.log(e);
}
</script>

<style lang="scss" scoped>
.input {
    border: 1px solid $u-light-color;
    border-radius: 4px;
    margin-bottom: 20px;
    height: 32px;
    font-size: 26rpx;
    flex: 1;
    box-sizing: border-box;
}

.input-wrap {
    display: flex;
}

.clear-btn {
    margin-left: 10px;
    font-size: 28rpx;
}
</style>
