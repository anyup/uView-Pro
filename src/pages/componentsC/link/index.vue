<template>
    <demo-page title="Link 链接" desc="用于展示链接，支持不同样式和功能。" :apis="apis">
        <template #default>
            <view class="u-demo">
                <view class="u-demo-wrap">
                    <view class="u-demo-title">演示效果</view>
                    <view class="u-demo-area">
                        <u-link :color="color" :font-size="fontSize" :under-line="underLine" :href="href">
                            点此链接，跳转uView官网
                        </u-link>
                    </view>
                </view>
                <view class="u-config-wrap">
                    <view class="u-config-title u-border-bottom"> 参数配置 </view>
                    <view class="u-config-item">
                        <view class="u-item-title">下划线</view>
                        <u-subsection :list="['显示', '隐藏']" @change="underLineChange"></u-subsection>
                    </view>
                    <view class="u-config-item">
                        <view class="u-item-title">自定义样式</view>
                        <u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $u } from '@/uni_modules/uview-pro';
import { apis } from './config';

const href = ref('https://uviewpro.cn/zh/');
const underLine = ref(true);
const fontSize = ref(28);
const color = ref($u.color.primary);

function underLineChange(index: number) {
    underLine.value = index === 0;
}

function styleChange(index: number) {
    if (index === 0) {
        color.value = $u.color['tipsColor'];
        fontSize.value = 34;
    } else {
        color.value = $u.color['primary'];
        fontSize.value = 28;
    }
}
</script>
