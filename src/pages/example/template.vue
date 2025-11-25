<template>
    <view>
        <page-nav :desc="desc" title="nav.template" :index="2"></page-nav>
        <view class="u-p-10">
            <u-swiper :list="bannerList" :effect3d="true" mode="none" autoplay title @click="swiperClick"></u-swiper>
        </view>
        <view class="tpl-group-list">
            <view class="tpl-group-title">{{ t('nav.template') }}</view>
            <view class="tpl-grid">
                <view class="tpl-card" v-for="tpl in flatList" :key="tpl.name" @click="openPage(tpl.path)">
                    <u-icon custom-prefix="custom-icon" :name="tpl.icon" :size="70" :color="getRandomColor()"></u-icon>
                    <view class="tpl-info">
                        <text class="tpl-name">{{ getTitle('title', tpl) }}</text>
                        <text class="tpl-desc">{{ getTitle('desc', tpl) }}</text>
                    </view>
                </view>
            </view>
        </view>
        <u-gap height="70"></u-gap>
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import rawList from './template.config';
import { onShareAppMessage, onShow } from '@dcloudio/uni-app';
import { getRandomColor, useTitle } from '@/common/util';

const list = ref<any[]>(Array.isArray(rawList) ? rawList : []);

// 热门模板横幅（可自定义图片和描述）
const bannerList = [
    {
        title: '支持左右联动，左右分开的分类列表',
        image: getBannerImage('swiper1'),
        desc: '支持左右联动，左右分开的分类列表',
        path: '/pages/template/mallMenu/index2'
    },
    {
        title: '订单列表：订单状态、操作、物流',
        image: getBannerImage('swiper2'),
        desc: '订单状态、操作、物流',
        path: '/pages/template/order/index'
    },
    {
        title: '快速构建收货地址',
        image: getBannerImage('swiper3'),
        desc: '快速构建收货地址',
        path: '/pages/template/address/index'
    }
];

// 扁平化所有模板（带图片和描述）
const flatList = computed(() => {
    const arr: any[] = [];
    list.value.forEach((group: any) => {
        (group.list || []).forEach((tpl: any) => {
            arr.push({
                ...tpl,
                img: tpl.img || 'https://ik.imagekit.io/anyup/uview-pro/logo/default-new.png',
                desc: tpl.desc
            });
        });
    });
    return arr;
});

// 国际化
const { t, locale } = useI18n();
const { getTitle, setTitle } = useTitle(2);

// 组件描述
const desc = computed(() => t('template.desc'));

function getBannerImage(name: string) {
    let url = `https://ik.imagekit.io/anyup/uview-pro/swiper/${name}.png`;
    // #ifdef APP-HARMONY
    url = `/static/app/${name}.png`;
    // #endif
    return url;
}

function swiperClick(index: number) {
    openPage(bannerList[index].path);
}

function openPage(path: string) {
    uni.navigateTo({
        url: path.indexOf('/page') == 0 ? path : '/pages/template/' + path + '/index'
    });
}

onShareAppMessage(res => {
    return {
        title: 'uView Pro - 模版示例',
        path: '/pages/example/template'
    };
});

// 设置标题
onShow(() => {
    setTitle();
});
</script>

<style lang="scss" scoped>
.tpl-group-list {
    padding: 0 20rpx;
}

.tpl-group-title {
    font-size: 28rpx;
    font-weight: 500;
    color: $u-main-color;
    margin: 24rpx 0 18rpx 0;
}

.tpl-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24rpx 3.5%;
}

.tpl-card {
    width: 47%;
    background: $u-bg-color;
    border-radius: 12rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 12rpx 28rpx rgba(var(--u-type-primary-rgb), 0.08);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 26rpx 16rpx 14rpx 16rpx;
    border: 1rpx solid $u-border-color;
}

.tpl-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20rpx;
}

.tpl-name {
    font-size: 26rpx;
    color: $u-main-color;
    font-weight: 500;
}

.tpl-desc {
    font-size: 22rpx;
    color: $u-content-color;
    margin-top: 10rpx;
    word-break: break-all;
}
</style>
