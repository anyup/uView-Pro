<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-section :title="title" :right="right" :bold="bold" :color="color" :show-line="showLine"></u-section>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">更换主标题</view>
                <u-subsection :current="1" :list="['是', '否']" @change="titleChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">竖条状态</view>
                <u-subsection :list="['显示', '隐藏']" @change="showLineChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">是否显示右边部分</view>
                <u-subsection :list="['是', '否']" @change="rightChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">主标题粗体</view>
                <u-subsection :list="['是', '否']" @change="boldChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">主标题颜色</view>
                <u-subsection :list="['默认', '自定义']" @change="colorChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

const title = ref('红豆生南国');
const bold = ref(true);
const right = ref(true);
const color = ref($u.color['mainColor']);
const showLine = ref(true);

function titleChange(index: number) {
    if (index === 0) title.value = '春来发几枝';
    else title.value = '红豆生南国';
}

function rightChange(index: number) {
    right.value = index === 0;
}

function boldChange(index: number) {
    bold.value = index === 0;
}

function colorChange(index: number) {
    color.value = index === 0 ? $u.color['mainColor'] : $u.color['primary'];
}

function showLineChange(index: number) {
    showLine.value = !index;
}
</script>
