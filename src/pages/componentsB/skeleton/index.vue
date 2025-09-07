<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast ref="uToast"></u-toast>
                <view class="container u-skeleton">
                    <view class="userinfo">
                        <!--u-skeleton-circle 绘制圆形-->
                        <image class="userinfo-avatar u-skeleton-circle" :src="userInfo.avatarUrl"></image>
                        <!--u-skeleton-fillet 绘制圆角矩形-->
                        <text class="u-skeleton-fillet">{{ userInfo.nickName }}</text>
                    </view>
                    <view style="margin: 20px 0">
                        <!--u-skeleton-rect 绘制矩形-->
                        <view class="u-skeleton-rect lists" v-for="(item, index) in lists" :key="index">
                            <text>{{ item }}</text>
                        </view>
                    </view>
                </view>
                <!--引用组件-->
                <u-skeleton bg-color="rgb(250, 250, 250)" :loading="loading" :animation="animation" :el-color="elColor" :border-radius="borderRadius"></u-skeleton>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">加载状态</view>
                <u-subsection :current="current" :list="['请求中', '请求结束']" @change="loadingChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">骨架动画</view>
                <u-subsection current="1" :list="['是', '否']" @change="animationChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">自定义样式</view>
                <u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { $u } from '@/uni_modules/uview-pro';
import { onLoad } from '@dcloudio/uni-app';

const userInfo = ref({
    avatarUrl: 'https://ik.imagekit.io/anyup/uview-pro/common/logo.png',
    nickName: 'uView'
});
const lists = ref(['君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪。', '人生得意须尽欢，莫使金樽空对月', '天生我材必有用，千金散尽还复来']);
const loading = ref(true); // 是否显示骨架屏组件
const animation = ref(false);
const elColor = ref('#e5e5e5');
const borderRadius = ref(10);

const current = computed(() => {
    return loading.value ? 0 : 1;
});

onLoad(() => {
    getData();
});

function animationChange(index: number) {
    animation.value = index === 0 ? true : false;
    getData();
}

function loadingChange(index: number) {
    loading.value = index === 0 ? true : false;
    if (index === 0) getData();
}

function styleChange(index: number) {
    if (index === 0) {
        elColor.value = $u.color['primary'];
        borderRadius.value = 14;
    } else {
        elColor.value = '#e5e5e5';
        borderRadius.value = 10;
    }
    getData();
}

function getData() {
    loading.value = true;
    // 通过延时模拟向后端请求数据，调隐藏骨架屏
    setTimeout(() => {
        loading.value = false;
    }, 3000);
}
</script>

<style lang="scss" scoped>
.container {
    text-align: left;
    font-size: 28rpx;
    color: $u-content-color;
}

.userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.userinfo-avatar {
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
}

.lists {
    margin: 10px 0;
}
</style>
