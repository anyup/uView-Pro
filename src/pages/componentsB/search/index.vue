<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToastRef"></u-toast>
                <u-search
                    v-model="value"
                    @change="change"
                    @custom="custom"
                    @search="search"
                    :shape="shape"
                    :clearabled="clearabled"
                    :show-action="showAction"
                    :input-align="inputAlign"
                    @clear="clear"
                ></u-search>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">初始值</view>
                <u-subsection :list="['空', '天山雪莲']" @change="valueChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">搜索框形状</view>
                <u-subsection :list="['圆形', '方形']" @change="shapeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">清除控件</view>
                <u-subsection :list="['启用', '关闭']" @change="clearabledChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">右侧控件</view>
                <u-subsection :list="['启用', '关闭']" @change="showActionChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">水平对齐方式</view>
                <u-subsection :list="['左', '中', '右']" @change="inputAlignChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { $u } from '@/uni_modules/uview-pro';
import type { SearchShape, InputAlign } from '@/uni_modules/uview-pro/types/global';

const value = ref('');
const shape = ref<SearchShape>('round');
const clearabled = ref(true);
const showAction = ref(true);
const inputAlign = ref<InputAlign>('left');
const uToastRef = ref(null);

watch(value, val => {
    // console.log(val);
});

function valueChange(index: number) {
    value.value = index === 0 ? '' : '天山雪莲';
}

function shapeChange(index: number) {
    shape.value = index === 0 ? 'round' : 'square';
}

function clearabledChange(index: number) {
    clearabled.value = index === 0 ? true : false;
}

function showActionChange(index: number) {
    showAction.value = index === 0 ? true : false;
}

function inputAlignChange(index: number) {
    inputAlign.value = index === 0 ? 'left' : index === 1 ? 'center' : 'right';
}

function change(val: string) {
    // 搜索框内容变化时，会触发此事件，value值为输入框的内容
    //console.log(val);
}

function custom(val: string) {
    //console.log(val);
    $u.toast('输入值为：' + val);
}

function search(val: string) {
    $u.toast('搜索内容为：' + val);
}

function clear() {
    // console.log(value.value);
}
</script>
