<template>
    <demo-page hide-tabs nav-title="收货地址">
        <view class="wrap">
            <view class="item" v-for="res in siteList" :key="res.id">
                <view class="top">
                    <view class="name">{{ res.name }}</view>
                    <view class="phone">{{ res.phone }}</view>
                    <view class="tag">
                        <text v-if="res.isDefault" class="red">默认</text>
                        <text v-for="(item, index) in res.tags" :key="index">{{ item }}</text>
                    </view>
                </view>
                <view class="bottom">
                    <text class="addr">{{ res.region }} {{ res.detail }}</text>
                    <view class="actions">
                        <u-icon @click="editSite(res.id)" name="edit-pen" :size="40" color="#999999"></u-icon>
                        <u-icon @click="deleteSite(res.id)" name="trash" :size="40" color="#f56c6c"></u-icon>
                    </view>
                </view>
            </view>
            <view v-if="!siteList.length" class="empty">
                <u-gap height="200"></u-gap>
                <u-empty mode="list" text="暂无地址，点击下方新增" :show-empty="true"></u-empty>
            </view>
            <view class="addSite" @tap="toAddSite">
                <view class="add">
                    <u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>新建收货地址
                </view>
            </view>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { $u } from 'uview-pro';
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';

const STORAGE_KEY = 'uview-address-list';
const siteList = ref<any[]>([]);

function loadList() {
    try {
        const list = uni.getStorageSync(STORAGE_KEY) || [];
        siteList.value = Array.isArray(list) ? list : [];
    } catch (error) {
        console.warn('load address list error', error);
        siteList.value = [];
    }
}

function toAddSite() {
    uni.navigateTo({ url: '/pages/template/address/addSite' });
}

function editSite(id: string) {
    uni.navigateTo({ url: `/pages/template/address/addSite?id=${id}` });
}

function deleteSite(id: string) {
    uni.showModal({
        title: '删除地址',
        content: '确定要删除该地址吗？',
        success: res => {
            if (res.confirm) {
                const list = siteList.value.filter(item => item.id !== id);
                uni.setStorageSync(STORAGE_KEY, list);
                siteList.value = list;
                $u.toast('已删除', 'success');
            }
        }
    });
}

onShow(loadList);
</script>

<style lang="scss" scoped>
.wrap {
    background-color: $u-bg-white;
}
.item {
    padding: 40rpx 20rpx;
    .top {
        display: flex;
        font-weight: bold;
        font-size: 34rpx;
        .phone {
            margin-left: 60rpx;
        }
        .tag {
            display: flex;
            font-weight: normal;
            align-items: center;
            text {
                display: block;
                width: 60rpx;
                height: 34rpx;
                line-height: 34rpx;
                color: #ffffff;
                font-size: 20rpx;
                border-radius: 6rpx;
                text-align: center;
                margin-left: 30rpx;
                background-color: rgb(49, 145, 253);
            }
            .red {
                background-color: red;
            }
        }
    }
    .bottom {
        display: flex;
        margin-top: 20rpx;
        font-size: 28rpx;
        justify-content: space-between;
        color: #999999;
        .addr {
            flex: 1;
            padding-right: 20rpx;
        }
        .actions {
            display: flex;
            gap: 20rpx;
        }
    }
}
.addSite {
    display: flex;
    justify-content: space-around;
    width: 600rpx;
    line-height: 100rpx;
    position: fixed;
    bottom: calc(env(safe-area-inset-bottom) + 20px);
    left: 50%;
    transform: translateX(-50%);
    background-color: red;
    border-radius: 60rpx;
    font-size: 30rpx;
    .add {
        display: flex;
        align-items: center;
        color: #ffffff;
        .icon {
            margin-right: 10rpx;
        }
    }
}
</style>
