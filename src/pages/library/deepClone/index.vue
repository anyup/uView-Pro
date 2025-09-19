<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="u-no-demo-here"> 源对象为："{info: {name: 'mary'}}" </view>
                <view class="u-demo-result-line">
                    {{ resultValue }}
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { $u } from '@/uni_modules/uview-pro';

const obj = ref({
    info: {
        name: 'mary'
    }
});
const result = ref<typeof obj.value | null>();

const resultValue = computed(() => {
    return result.value ? JSON.stringify(result.value) : '';
});

onLoad(() => {
    result.value = $u.deepClone(obj.value);
});
</script>
