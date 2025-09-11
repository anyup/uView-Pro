<template>
    <view class="navigation">
        <view class="left">
            <view class="item">
                <u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
                <view class="text u-line-1">客服</view>
            </view>
            <view class="item">
                <u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
                <view class="text u-line-1">店铺</view>
            </view>
            <view class="item car">
                <u-badge class="car-num" :count="9" type="error" :offset="[-3, -6]"></u-badge>
                <u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
                <view class="text u-line-1">购物车</view>
            </view>
        </view>
        <view class="right">
            <view class="cart btn u-line-1">加入购物车</view>
            <view class="buy btn u-line-1">立即购买</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { $u } from '@/uni_modules/uview-pro';
import { onMounted } from 'vue';

onMounted(() => {
    uni.showModal({
        title: '提示',
        content: '该页面仅为布局演示功能，非电商类小程序，不具备实际功能',
        success: res => {}
    });
});
</script>

<style lang="scss" scoped>
.navigation {
    display: flex;
    border: solid 2rpx #f2f2f2;
    background-color: #ffffff;
    padding: 16rpx 0;
    position: fixed;
    width: 100%;
    bottom: 0;
    .left {
        display: flex;
        font-size: 20rpx;
        .item {
            margin: 0 30rpx;
            &.car {
                text-align: center;
                position: relative;
                .car-num {
                    position: absolute;
                    top: -10rpx;
                    right: -10rpx;
                }
            }
        }
    }
    .right {
        display: flex;
        font-size: 28rpx;
        align-items: center;
        .btn {
            line-height: 66rpx;
            padding: 0 30rpx;
            border-radius: 36rpx;
            color: #ffffff;
        }
        .cart {
            background-color: #ed3f14;
            margin-right: 30rpx;
        }
        .buy {
            background-color: #ff7900;
        }
    }
}
</style>
