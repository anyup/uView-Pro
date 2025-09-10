<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-divider :type="type" :borderColor="borderColor" :bg-color="bgColor" @click="click" :half-width="halfWidth" :color="color" :font-size="fontSize">{{
                    text
                }}</u-divider>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">提示内容</view>
                <u-subsection :list="['没有更多了', '到底了']" @change="textChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">单边线宽</view>
                <u-subsection current="1" :list="['50', '150', '250']" @change="halfWidthChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">横线颜色</view>
                <u-subsection :list="['#dcdfe6', 'primary', 'error', 'warning', 'success']" @change="borderColorChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">内容样式</view>
                <u-subsection :list="['默认', '自定义']" @change="contentChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { $u } from '@/uni_modules/uview-pro';
import { ref } from 'vue';
import type { ThemeType } from '@/uni_modules/uview-pro/types/global';

const text = ref('没有更多了');
const bgColor = ref('#fafafa');
const halfWidth = ref(150);
const borderColor = ref('#dcdfe6');
const type = ref<ThemeType>('primary');
const color = ref('#909399');
const fontSize = ref(26);

function textChange(index: number) {
    text.value = index === 0 ? '没有更多了' : '到底了';
}

function halfWidthChange(index: number) {
    halfWidth.value = index === 0 ? 50 : index === 1 ? 150 : 250;
}

function borderColorChange(index: number) {
    if (index === 0) {
        borderColor.value = '#dcdfe6';
    } else {
        // 因为border-color参数优先级高于type，要让type起作用，就需要设置border-color为空
        borderColor.value = '';
        type.value = index === 1 ? 'primary' : index === 2 ? 'error' : index === 3 ? 'warning' : 'success';
    }
}

function contentChange(index: number) {
    if (index === 0) {
        color.value = '#909399';
        fontSize.value = 26;
    } else {
        color.value = $u.color['primary'];
        fontSize.value = 30;
    }
}

function click() {
    console.log('click');
}
</script>
