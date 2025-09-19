<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="u-no-demo-here">源对象：{{ JSON.stringify(params) }}</view>
                <view class="u-demo-result-line">
                    {{ result }}
                </view>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">是否带问号</view>
                <u-subsection :list="['是', '否']" @change="prefixChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { $u } from '@/uni_modules/uview-pro';

interface ParamsType {
    name: string;
    age: number;
}

const prefix = ref(true);
const params = ref<ParamsType>({
    name: '典韦',
    age: 32
});
const result = ref('');

onLoad(() => {
    getResult();
});

function prefixChange(index: number) {
    prefix.value = index === 0;
    getResult();
}

async function getResult(): Promise<void> {
    result.value = $u.queryParams(params.value, prefix.value);
}
</script>
