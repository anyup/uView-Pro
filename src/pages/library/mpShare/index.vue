<template>
    <demo-page title="MpShare 小程序分享" desc="用于小程序的分享功能，支持分享到朋友圈、群聊等。" :apis="'mpShare'">
        <template #default>
            <view class="u-demo">
                <view class="u-demo-wrap">
                    <view class="u-demo-title">演示效果</view>
                    <view class="u-demo-area">
                        <view class="u-no-demo-here"> 只对各家小程序有效，点击右上角的"胶囊"，即可弹出分享菜单 </view>
                    </view>
                </view>
            </view>
        </template>
    </demo-page>
</template>

<script setup lang="ts">
import { onShareAppMessage } from '@dcloudio/uni-app';

onShareAppMessage(res => {
    return {
        title: 'uView Pro - 组件示例',
        path: '/pages/example/components'
    };
});
</script>
