<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToastRef"></u-toast>
                <u-button @click="showAction">唤起ActionSheet</u-button>
                <u-action-sheet
                    :cancel-btn="cancel"
                    :mask-close-able="maskClick"
                    :tips="tips"
                    @click="click"
                    :list="list"
                    v-model="show"
                    :safe-area-inset-bottom="true"
                ></u-action-sheet>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">取消按钮</view>
                <u-subsection :list="['是', '否']" @change="cancelChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">点击遮罩关闭</view>
                <u-subsection :list="['是', '否']" @change="maskClickChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { ActionSheetTips, ActionSheetItem } from '@/uni_modules/uview-pro/types/global';

const list = ref<ActionSheetItem[]>([
    {
        text: '最是人间留不住'
    },
    {
        text: '朱颜辞镜花辞树',
        disabled: true
    },
    {
        text: '正是江南好风景',
        subText: '春江水暖鸭先知'
    },
    {
        text: '落花时节又逢君'
    }
]);

const tips = ref<ActionSheetTips>({
    text: ''
});

const show = ref(false);
const cancel = ref(true);
const maskClick = ref(true);
const uToastRef = ref(null);

function showAction() {
    show.value = true;
}

function click(index: number) {
    uToastRef.value?.show({
        type: 'success',
        title: '点击了第' + (index + 1) + '项'
    });
}

function tipsChange(index: number) {
    if (index == 0) show.value = true;
    tips.value.text = index == 0 ? '请谨慎执行您的操作' : '';
}

function cancelChange(index: number) {
    show.value = true;
    cancel.value = index === 0;
}

function maskClickChange(index: number) {
    if ((index = 1)) cancel.value = true;
    show.value = true;
    maskClick.value = index === 0;
}
</script>

<style lang="scss" scoped>
.wrap {
    padding: 24rpx;
}
</style>
