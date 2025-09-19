<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="u-demo-result-line">
                    {{ result }}
                </view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">源字符串</view>
                <u-subsection :list="['Take me', 'to', 'your heart']" @change="getResult"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import md5Libs from '@/uni_modules/uview-pro/libs/function/md5';

const result = ref(null);
const string = ref('Take me');

onLoad(() => {
    getResult();
});

function getResult(index?: number) {
    if (index !== undefined) {
        string.value = index === 0 ? 'Take me' : index === 1 ? 'to' : 'your heart';
    }
    result.value = md5Libs.md5(string.value);
}
</script>
