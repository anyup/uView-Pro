<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view style="margin-bottom: 10px">
                    <u-text decoration="underline" :text="content"></u-text>
                </view>
                <u-copy v-if="useSlot" :content="content" :toast="toast">
                    <button size="mini" type="primary">复制</button>
                </u-copy>
                <u-copy custom-style="color:#2979ff" v-else :content="content" :toast="toast"></u-copy>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title"
                    >弹出提示<u-text
                        type="warning"
                        mode="link"
                        href="https://uniapp.dcloud.net.cn/api/system/clipboard.html#%E6%B3%A8%E6%84%8F"
                        text="(小程序无效)"
                    ></u-text
                ></view>

                <u-subsection current="0" :list="['是', '否']" @change="toastChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">使用slot</view>
                <u-subsection current="1" :list="['是', '否']" @change="slotChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const useSlot = ref(false);
const content = ref('我用十年青春,赴你最后之约');
const toast = ref(true);

function toastChange(index: number) {
    toast.value = index === 0;
}
function slotChange(index: number) {
    useSlot.value = index === 0;
}
</script>
