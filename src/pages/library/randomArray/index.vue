<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="u-no-demo-here"> 源数组为：[1, 2, 3, 4, 5] </view>
                <view class="u-demo-result-line">
                    {{ `[${result.join(', ')}]` }}
                </view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">操作</view>
                <u-button @click="getResult">执行</u-button>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { $u } from '@/uni_modules/uview-pro';

const orginArray = ref([1, 2, 3, 4, 5]);
const result = ref<number[]>([]);

onLoad(() => {
    getResult();
});

/**
 * 获取随机排序后的数组
 */
function getResult() {
    result.value = $u.randomArray(orginArray.value);
}
</script>
