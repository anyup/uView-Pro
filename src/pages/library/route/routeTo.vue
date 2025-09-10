<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="u-no-demo-here"> 收到的参数为：{{ paramsStr }} </view>
                <view class="u-btn-wrap">
                    <u-button @click="back">返回</u-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { $u } from '@/uni_modules/uview-pro';

const params = ref<Record<string, any>>({});

const paramsStr = computed(() => {
    return JSON.stringify(params.value);
});

onLoad((option: Record<string, any>) => {
    params.value = option;
});

/**
 * 返回上一页
 */
function back() {
    $u.route({
        type: 'back',
        animationType: 'slide-in-top'
    });
}
</script>

<style lang="scss" scoped>
.wrap {
    padding: 24rpx;
}

.u-btn-wrap {
    margin-top: 50rpx;
}
</style>
