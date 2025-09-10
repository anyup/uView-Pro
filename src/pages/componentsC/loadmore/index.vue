<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToastRef" />
                <u-loadmore :status="status" :loadText="loadText" :icon-type="iconType" :is-dot="isDot" @loadmore="loadmore" />
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">模式选择</view>
                <u-subsection :current="current" :list="['加载前', '加载中', '加载后', '没有更多']" @change="statusChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">自定义提示语</view>
                <u-subsection current="1" :list="['是', '否']" @change="loadTextChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">加载中图标样式</view>
                <u-subsection :list="['circle', 'flower']" @change="styleChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">没有更多时用点替代</view>
                <u-subsection current="1" :list="['是', '否']" @change="isDotChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const uToastRef = ref();
const status = ref('loadmore');
const iconType = ref('circle');
const isDot = ref(false);
const loadText = ref({
    loadmore: '点击或上拉加载更多',
    loading: '正在加载...',
    nomore: '没有更多了'
});
const current = ref<number>(0);

function statusChange(index: number) {
    current.value = index;
    status.value = index === 0 ? 'loadmore' : index === 1 ? 'loading' : index === 2 ? 'loadmore' : 'nomore';
}

function loadTextChange(index: number) {
    if (index === 0) {
        loadText.value = {
            loadmore: '用力往上拉',
            loading: '正在加载，请喝杯茶...',
            nomore: '我也是有底线的'
        };
    } else {
        loadText.value = {
            loadmore: '点击或上拉加载更多',
            loading: '正在加载...',
            nomore: '没有更多了'
        };
    }
}

function styleChange(index: number) {
    current.value = 1;
    statusChange(1);
    iconType.value = index === 0 ? 'circle' : 'flower';
}

function isDotChange(index: number) {
    current.value = 3;
    statusChange(3);
    isDot.value = index === 0;
}

// 点击组件，触发加载更多事件(status为'loadmore'状态下才触发)
function loadmore() {
    uToastRef.value?.show({
        title: '点击触发加载更多',
        type: 'success'
    });
}

// 页面触底事件
function onReachBottom() {
    // 在此请求下一页
}
</script>

<style lang="scss" scoped>
.u-demo {
}
</style>
