<template>
    <view>
        <page-nav :desc="desc" title="nav.js" :index="1"></page-nav>
        <view class="u-p-10">
            <u-swiper
                :list="recommendList"
                :effect3d="false"
                autoplay
                mode="none"
                :title="true"
                @click="swiperClick"
            ></u-swiper>
        </view>
        <view class="tool-group-list">
            <view class="tool-group-card" v-for="(item, index) in list" :key="index">
                <view class="tool-group-header">
                    <u-icon :name="item.icon" custom-prefix="custom-icon" :size="50" :color="getRandomColor()"></u-icon>
                    <text class="group-title">{{ getTitle('groupName', item) }}</text>
                </view>
                <view class="tool-list">
                    <view class="tool-card" v-for="tool in item.list" :key="tool.name">
                        <u-icon
                            custom-prefix="custom-icon"
                            :name="tool.icon"
                            :size="50"
                            :color="getRandomColor()"
                        ></u-icon>
                        <view class="tool-info">
                            <text class="tool-name">{{ getTitle('title', tool) }}</text>
                            <text class="tool-desc">{{ getTitle('desc', tool) }}</text>
                        </view>
                        <u-button size="mini" type="primary" @click="openPage(tool.path)">{{
                            t('common.tryit')
                        }}</u-button>
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
import rawList from './js.config';
import { onShareAppMessage, onShow } from '@dcloudio/uni-app';
import { getRandomColor, useTitle } from '@/common/util';

const list = ref<any[]>(Array.isArray(rawList) ? rawList : []);

// 推荐工具（可自定义）
const recommendList = [
    {
        title: '统一封装的网络请求，支持拦截器和全局配置',
        title_en: 'Unified network request, supporting interceptors and global configuration',
        image: getBannerImage('swiper'),
        path: 'http'
    }
];

// 国际化
const { t, locale } = useI18n();
const { setTitle, getTitle } = useTitle(1);

// 组件描述
const desc = computed(() => t('js.desc'));

function openPage(path: string) {
    uni.navigateTo({
        url: path.indexOf('/page') == 0 ? path : '/pages/library/' + path + '/index'
    });
}

function swiperClick(index: number) {
    openPage(recommendList[index].path);
}

function getBannerImage(name: string) {
    let url = `https://ik.imagekit.io/anyup/uview-pro/swiper/${name}.png`;
    // #ifdef APP-HARMONY
    url = `/static/app/${name}.png`;
    // #endif
    return url;
}

onShareAppMessage(res => {
    return {
        title: 'uView Pro - 工具库示例',
        path: '/pages/example/js'
    };
});

// 设置标题
onShow(() => {
    setTitle();
});
</script>

<style lang="scss" scoped>
.tool-group-list {
    padding: 0 20rpx;
}

.tool-group-card {
    background: #fff;
    border-radius: 12rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
    padding: 24rpx 20rpx 12rpx 20rpx;
}

.tool-group-header {
    display: flex;
    align-items: center;
    margin-bottom: 18rpx;
}

.group-title {
    font-size: 36rpx;
    font-weight: 500;
    color: #333;
    margin-left: 10rpx;
}

.tool-card {
    display: flex;
    align-items: center;
    width: 100%;
    background: #f8f9fa;
    border-radius: 8rpx;
    margin-bottom: 14rpx;
    padding: 30rpx 26rpx;
}

.tool-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 16rpx;
}

.tool-name {
    font-size: 30rpx;
    color: #222;
    font-weight: 500;
}

.tool-desc {
    font-size: 24rpx;
    color: #888;
    margin-top: 10rpx;
}
</style>
