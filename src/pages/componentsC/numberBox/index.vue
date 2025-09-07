<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-number-box v-model="value" :bg-color="bgColor" :color="color" :min="0" :step="step" :disabled="disabled" @change="change" @focus="focus"></u-number-box>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">初始值</view>
                <u-subsection :list="['1', '5', '18']" @change="valueChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">自定义样式</view>
                <u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">是否禁用</view>
                <u-subsection current="1" :list="['是', '否']" @change="disabledChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">步进值</view>
                <u-subsection :list="['1', '3', '5', '8']" @change="stepChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(1);
const bgColor = ref('#F2F3F5');
const color = ref('#323233');
const disabled = ref(false);
const step = ref(1);

function valueChange(index: number) {
    value.value = index === 0 ? 1 : index === 1 ? 5 : 18;
}

function styleChange(index: number) {
    if (index === 0) {
        bgColor.value = '#ff6d00';
        color.value = '#fff';
    } else {
        bgColor.value = '#F2F3F5';
        color.value = '#323233';
    }
}

function disabledChange(index: number) {
    disabled.value = index === 0;
}

function stepChange(index: number) {
    step.value = index === 0 ? 1 : index === 1 ? 3 : index === 2 ? 5 : 8;
}

interface ChangeEvent {
    value: number;
}

function change(e: ChangeEvent) {
    //console.log(e.value);
}

function focus() {
    console.log('focus');
}
</script>
