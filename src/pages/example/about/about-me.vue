<template>
    <demo-page nav-title="关于我" :nav-back="true" hide-tabs>
        <view class="about-me-page">
            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="account" size="40" color="var(--u-type-primary)"></u-icon>
                    <text class="section-card__title">关于我</text>
                </view>
                <view class="section-card__body">
                    <view class="about-text">
                        <text class="about-text__highlight">"前端梦工厂"</text>
                        <text>
                            ，一名前端开发工程师，致力于分享各种前端技术最佳解决方案。关注我，让我们一起逐梦前端！
                        </text>
                    </view>
                </view>
            </view>

            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="chat" size="40" color="var(--u-type-success)"></u-icon>
                    <text class="section-card__title">联系方式</text>
                </view>
                <view class="section-card__body">
                    <view class="contact-item">
                        <view class="contact-item__label">微信号</view>
                        <view class="contact-item__value">anyupxing</view>
                    </view>
                    <view class="contact-item">
                        <view class="contact-item__label">公众号</view>
                        <view class="contact-item__value">前端梦工厂</view>
                    </view>
                </view>
            </view>

            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="star" size="40" color="var(--u-type-warning)"></u-icon>
                    <text class="section-card__title">个人简介</text>
                </view>
                <view class="section-card__body">
                    <view class="intro-text">
                        <text>
                            专注于前端开发领域，拥有丰富的跨平台开发经验。致力于打造高质量、易用的 UI
                            组件库，帮助开发者提升开发效率。
                        </text>
                    </view>
                </view>
            </view>
        </view>
    </demo-page>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.about-me-page {
    padding: 24rpx;
    background: linear-gradient(180deg, rgba(41, 121, 255, 0.03) 0%, transparent 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 24rpx;
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

.about-text {
    font-size: 28rpx;
    line-height: 1.8;
    color: $u-content-color;

    &__highlight {
        font-weight: 700;
        background: linear-gradient(135deg, #2979ff, #19be6b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
}

.contact-item {
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

.intro-text {
    font-size: 28rpx;
    line-height: 1.8;
    color: $u-content-color;
}
</style>
