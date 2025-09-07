<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToastRef"></u-toast>
                <view class="u-no-demo-here"> 请点击弹出遮罩查看效果 </view>
                <u-mask :show="show" @click="show = false" :zoom="zoom" :duration="duration">
                    <view class="warp" v-if="content">
                        <view class="rect" @tap.stop></view>
                    </view>
                </u-mask>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">状态</view>
                <u-subsection :current="current" :list="['显示', '隐藏']" @change="showChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">缩放效果</view>
                <u-subsection :list="['是', '否']" @change="zoomChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">内容填充</view>
                <u-subsection current="1" :list="['是', '否']" @change="contentChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">动画时长(ms)</view>
                <u-subsection current="1" :list="['100', '300', '800']" @change="durationChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const uToastRef = ref();
const show = ref(false);
const zoom = ref(true);
const duration = ref(300);
const content = ref(false);

const current = computed<number>(() => {
    return show.value ? 0 : 1;
});

function showChange(index: number) {
    show.value = index === 0;
}

function zoomChange(index: number) {
    zoom.value = index === 0;
    show.value = true;
}

function durationChange(index: number) {
    duration.value = index === 0 ? 100 : index === 1 ? 300 : 800;
    show.value = true;
}

function contentChange(index: number) {
    content.value = index === 0;
    show.value = true;
}
</script>

<style scoped lang="scss">
.warp {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.rect {
    width: 120px;
    height: 120px;
    background-color: #fff;
}
</style>
