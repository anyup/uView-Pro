<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <view class="u-no-demo-here"> 只对各家小程序有效，点击右上角的"胶囊"，即可弹出分享菜单 </view>
            </view>
        </view>
    </view>
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
