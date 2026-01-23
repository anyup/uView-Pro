<template>
    <demo-page nav-title="版本信息" :nav-back="true" hide-tabs>
        <view class="version-page">
            <view class="version-card">
                <view class="version-card__logo">
                    <u-avatar src="/static/logo.png" size="120"></u-avatar>
                </view>
                <view class="version-card__name">uView Pro</view>
                <view class="version-card__version">v{{ APP_INFO.version }}</view>
            </view>

            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="info-circle" size="40" color="var(--u-type-primary)"></u-icon>
                    <text class="section-card__title">应用信息</text>
                </view>
                <view class="section-card__body">
                    <view class="info-item">
                        <view class="info-item__label">应用名称</view>
                        <view class="info-item__value">{{ APP_INFO.name }}</view>
                    </view>
                    <view class="info-item">
                        <view class="info-item__label">版本号</view>
                        <view class="info-item__value">{{ APP_INFO.version }}</view>
                    </view>
                    <view class="info-item">
                        <view class="info-item__label">构建时间</view>
                        <view class="info-item__value">{{ APP_INFO.buildTime }}</view>
                    </view>
                    <view class="info-item">
                        <view class="info-item__label">平台</view>
                        <view class="info-item__value">{{ APP_INFO.platform }}</view>
                    </view>
                </view>
            </view>
            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="tags" size="40" color="var(--u-type-primary)"></u-icon>
                    <text class="section-card__title">uView Pro 组件库</text>
                </view>
                <view class="section-card__body">
                    <view class="info-item">
                        <view class="info-item__label">组件库名称</view>
                        <view class="info-item__value">{{ UVIEW_PRO_INFO.name }}</view>
                    </view>
                    <view class="info-item">
                        <view class="info-item__label">版本号</view>
                        <view class="info-item__value">{{ UVIEW_PRO_INFO.version }}</view>
                    </view>
                    <view class="info-item">
                        <view class="info-item__label">发布时间</view>
                        <view class="info-item__value">{{ UVIEW_PRO_INFO.buildTime }}</view>
                    </view>
                </view>
            </view>

            <view class="section-card" v-if="false">
                <view class="section-card__header">
                    <u-icon name="list" size="40" color="var(--u-type-success)"></u-icon>
                    <text class="section-card__title">更新日志</text>
                </view>
                <view class="section-card__body">
                    <view class="changelog-item" v-for="(item, index) in changelog" :key="index">
                        <view class="changelog-item__version">{{ item.version }}</view>
                        <view class="changelog-item__date">{{ item.date }}</view>
                        <view class="changelog-item__content">
                            <view v-for="(change, idx) in item.changes" :key="idx" class="changelog-item__change">
                                • {{ change }}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { APP_INFO, UVIEW_PRO_INFO } from '@/common/constant';

// 更新日志
const changelog = ref([
    {
        version: 'v0.4.7',
        date: '2025-12-19',
        changes: ['优化组件性能', '修复已知问题', '新增多个组件']
    }
]);
</script>

<style lang="scss" scoped>
.version-page {
    padding: 24rpx;
    background: linear-gradient(180deg, rgba(41, 121, 255, 0.03) 0%, transparent 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 24rpx;
}

.version-card {
    background: linear-gradient(135deg, #2979ff 0%, #19be6b 50%, #ff9900 100%);
    border-radius: 24rpx;
    padding: 60rpx 40rpx;
    text-align: center;
    box-shadow: 0 12rpx 32rpx rgba(41, 121, 255, 0.2);
    margin-bottom: 8rpx;

    &__logo {
        margin-bottom: 24rpx;
    }

    &__name {
        font-size: 48rpx;
        font-weight: 800;
        color: #ffffff;
        margin-bottom: 12rpx;
        text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
    }

    &__version {
        font-size: 32rpx;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 600;
    }
}

.section-card {
    background: $u-bg-gray-light;
    border-radius: 20rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: all 0.3s ease;

    &__header {
        padding: 28rpx 32rpx;
        display: flex;
        align-items: center;
        gap: 16rpx;
        background: linear-gradient(135deg, rgba(41, 121, 255, 0.05), rgba(25, 190, 107, 0.05));
        border-bottom: 1rpx solid rgba(0, 0, 0, 0.04);
    }

    &__title {
        font-size: 32rpx;
        font-weight: 700;
        color: $u-main-color;
        letter-spacing: 1rpx;
    }

    &__body {
        padding: 24rpx 32rpx 32rpx;
    }
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.04);

    &:last-child {
        border-bottom: none;
    }

    &__label {
        font-size: 28rpx;
        color: $u-content-color;
    }

    &__value {
        font-size: 28rpx;
        font-weight: 600;
        color: $u-main-color;
    }
}

.changelog-item {
    padding: 24rpx 0;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.04);

    &:last-child {
        border-bottom: none;
    }

    &__version {
        font-size: 32rpx;
        font-weight: 700;
        color: var(--u-type-primary);
        margin-bottom: 8rpx;
    }

    &__date {
        font-size: 24rpx;
        color: $u-tips-color;
        margin-bottom: 16rpx;
    }

    &__content {
        padding-left: 16rpx;
    }

    &__change {
        font-size: 26rpx;
        color: $u-content-color;
        line-height: 1.8;
        margin-bottom: 8rpx;
    }
}
</style>
