<template>
    <demo-page
        title="Subsection 分段选择器"
        desc="用于在多个选项间进行选择，可切换按钮或分段样式。"
        :apis="'subsection'"
    >
        <template #default>
            <view class="u-demo">
                <view class="u-demo-wrap">
                    <view class="u-demo-title">演示效果</view>
                    <view class="u-demo-area">
                        <u-subsection
                            :bold="bold"
                            :active-color="activeColor"
                            :current="current"
                            :mode="mode"
                            :list="list"
                        ></u-subsection>
                    </view>
                </view>
                <view class="u-config-wrap">
                    <view class="u-config-title u-border-bottom"> 参数配置 </view>
                    <view class="u-config-item">
                        <view class="u-item-title">模式选择</view>
                        <u-subsection
                            mode="button"
                            :list="['button', 'subsection']"
                            @change="modeChange"
                        ></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">Current值</view>
                        <u-subsection mode="button" :list="['0', '1', '2']" @change="currentChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">活动选项字颜色</view>
                        <u-subsection
                            mode="button"
                            :list="['primary', 'success', 'error', 'warning']"
                            @change="colorChange"
                        ></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">字体加粗</view>
                        <u-subsection mode="button" :list="['是', '否']" @change="boldChange"></u-subsection>
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $u } from '@/uni_modules/uview-pro';
import type { SubsectionListItem, SubsectionMode } from '@/uni_modules/uview-pro/types/global';

const mode = ref<SubsectionMode>('button');
const current = ref(0);
const activeColor = ref($u.color['warning']);
const bold = ref(true);
const list = ref<SubsectionListItem[]>([{ name: '待付款' }, { name: '待收货' }, { name: '选项三' }]);
function modeChange(e: number) {
    switch (e) {
        case 0:
            mode.value = 'button';
            break;
        case 1:
            mode.value = 'subsection';
            break;
    }
}

function currentChange(e: number) {
    current.value = e;
}

function colorChange(e: number) {
    let color = 'primary';
    switch (e) {
        case 0:
            color = 'primary';
            break;
        case 1:
            color = 'success';
            break;
        case 2:
            color = 'error';
            break;
        case 3:
            color = 'warning';
            break;
    }
    activeColor.value = $u.color[color];
}

function boldChange(e: number) {
    switch (e) {
        case 0:
            bold.value = true;
            break;
        case 1:
            bold.value = false;
            break;
    }
}
</script>
