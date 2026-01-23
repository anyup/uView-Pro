<template>
    <view class="wrap">
        <u-navbar
            :is-back="true"
            title="个人中心"
            :background="background"
            :border-bottom="false"
            :is-fixed="true"
            :immersive="false"
            back-icon-name="arrow-leftward"
            title-width="350"
            title-color="#ffffff"
            back-icon-color="#ffffff"
        >
            <!-- #ifndef MP -->
            <template #right>
                <u-icon
                    custom-style="margin-right:15px"
                    name="camera-fill"
                    color="#ffffff"
                    size="48"
                    @click="$u.toast('点击相机')"
                ></u-icon>
            </template>
            <!-- #endif -->
            <!-- #ifdef MP -->
            <template #left>
                <u-icon
                    custom-style="margin-left:7px"
                    name="camera-fill"
                    color="#ffffff"
                    size="48"
                    @click="$u.toast('点击相机')"
                ></u-icon>
            </template>
            <!-- #endif -->
        </u-navbar>
        <view class="u-flex user-box u-p-30">
            <view class="u-m-r-10">
                <u-avatar :src="pic" size="140"></u-avatar>
            </view>
            <view class="u-flex-1">
                <view class="u-font-18 u-p-b-20">uView Pro</view>
                <view class="u-font-14 u-tips-color">微信号: anyupxing</view>
            </view>
            <view class="u-m-l-10 u-p-10">
                <u-icon name="scan" color="#969799" size="28"></u-icon>
            </view>
            <view class="u-m-l-10 u-p-10">
                <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
            </view>
        </view>

        <view class="u-m-t-20">
            <u-cell-group>
                <u-cell-item icon="rmb-circle" title="支付" @click="$u.toast('点击支付')"></u-cell-item>
            </u-cell-group>
        </view>

        <view class="u-m-t-20">
            <u-cell-group>
                <u-cell-item icon="star" title="收藏" @click="$u.toast('点击收藏')"></u-cell-item>
                <u-cell-item icon="photo" title="相册" @click="$u.toast('点击相册')"></u-cell-item>
                <u-cell-item icon="coupon" title="卡券" @click="$u.toast('点击卡券')"></u-cell-item>
                <u-cell-item icon="heart" title="关注" @click="$u.toast('点击关注')"></u-cell-item>
            </u-cell-group>
        </view>

        <view class="u-m-t-20">
            <u-cell-group>
                <u-cell-item icon="setting" title="设置" @click="$u.toast('点击设置')"></u-cell-item>
            </u-cell-group>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { $u } from 'uview-pro';

// 用户头像图片地址
const pic = ref<string>('https://ik.imagekit.io/anyup/uview-pro/common/logo-new.png');
// 控制页面显示（如后续有弹窗、遮罩等可用）
const show = ref<boolean>(true);

const background = reactive({
    backgroundColor: 'var(--u-type-primary)',
    // 渐变色
    backgroundImage: 'linear-gradient(90deg, var(--u-type-primary-dark), var(--u-type-primary-disabled))'
});

// 页面加载生命周期（如需初始化逻辑可在此处添加）
onMounted(() => {
    // 目前无初始化逻辑
});
</script>

<style lang="scss">
.wrap {
    background-color: $u-bg-color;
}
.camera {
    width: 54px;
    height: 44px;
    &:active {
        background-color: $u-bg-color;
    }
}
.user-box {
    background-color: $u-bg-white;
}
</style>
