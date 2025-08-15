<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-city-select v-model="value" @city-change="cityChange"></u-city-select>
                <view class="u-demo-result-line">{{ input ? input : 'Picker值' }}</view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom">参数配置</view>
            <view class="u-config-item">
                <view class="u-item-title">状态</view>
                <u-button @click="value = true">打开Picker</u-button>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Picker弹窗显示状态
const value = ref(false);
// 选择结果字符串
const input = ref('');

/**
 * 省市区选择回调
 * @param e 选中的省市区对象
 */
function cityChange(e: any) {
    input.value = e.province.label + '-' + e.city.label + '-' + e.area.label;
}
</script>

<style scoped>
.btn-wrap {
    margin: 100rpx 30rpx;
}
</style>
