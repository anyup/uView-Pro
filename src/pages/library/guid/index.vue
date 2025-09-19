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
                <view class="u-item-title">长度</view>
                <u-subsection current="2" :list="['10', '16', '32', 'rfc4122标准']" @change="lengthChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">首字符为"u"</view>
                <u-subsection :list="['是', '否']" @change="firstUChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">取值基数(进制)</view>
                <u-subsection current="3" :list="['二', '八', '十', '六十二']" @change="radixChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { $u } from '@/uni_modules/uview-pro';

const length = ref(32);
const firstU = ref(true);
const radix = ref(62);
const result = ref(null);

onLoad(() => {
    getResult();
});

function lengthChange(index: number) {
    length.value = index === 0 ? 10 : index === 1 ? 16 : index === 2 ? 32 : null;
    getResult();
}

function firstUChange(index: number) {
    firstU.value = index === 0;
    getResult();
}

function radixChange(index: number) {
    radix.value = index === 0 ? 2 : index === 1 ? 8 : index === 2 ? 10 : 62;
    getResult();
}

function getResult() {
    result.value = $u.guid(length.value, firstU.value, radix.value);
}
</script>
