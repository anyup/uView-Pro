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
                <view class="u-item-title">操作</view>
                <u-subsection :list="['min=0, max=5', 'min=541, max=8164']" @change="paramsChange"></u-subsection>
                <view class="u-btn-wrap">
                    <u-button @click="getResult">执行</u-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { $u } from '@/uni_modules/uview-pro';

const min = ref<number>(0);
const max = ref<number>(5);
const result = ref<string | number>('');

onLoad(() => {
    getResult();
});

/**
 * 参数变更处理
 * @param index 选择的索引
 */
function paramsChange(index: number) {
    if (index === 0) {
        min.value = 0;
        max.value = 5;
    } else {
        min.value = 541;
        max.value = 8164;
    }
    getResult();
}

/**
 * 获取随机结果
 */
function getResult() {
    result.value = $u.random(min.value, max.value);
}
</script>

<style lang="scss" scoped>
.u-btn-wrap {
    margin-top: 50rpx;
}
</style>
