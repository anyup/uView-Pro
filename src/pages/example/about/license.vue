<template>
    <demo-page nav-title="开源协议" :nav-back="true" hide-tabs>
        <view class="license-page">
            <view class="license-header">
                <view class="license-header__title">MIT License</view>
                <view class="license-header__subtitle">Copyright (c) 2025 uviewpro.cn</view>
            </view>

            <view class="section-card">
                <view class="section-card__body">
                    <view class="license-content">
                        <view class="license-section">
                            <view class="license-section__title">Permission is hereby granted</view>
                            <view class="license-section__text">
                                free of charge, to any person obtaining a copy of this software and associated
                                documentation files (the "Software"), to deal in the Software without restriction,
                                including without limitation the rights to use, copy, modify, merge, publish,
                                distribute, sublicense, and/or sell copies of the Software, and to permit persons to
                                whom the Software is furnished to do so, subject to the following conditions:
                            </view>
                        </view>

                        <view class="license-section">
                            <view class="license-section__title">The above copyright notice</view>
                            <view class="license-section__text">
                                and this permission notice shall be included in all copies or substantial portions of
                                the Software.
                            </view>
                        </view>

                        <view class="license-section">
                            <view class="license-section__title">THE SOFTWARE IS PROVIDED "AS IS"</view>
                            <view class="license-section__text">
                                WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
                                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                                NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
                                OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
                                OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="info-circle" size="40" color="var(--u-type-primary)"></u-icon>
                    <text class="section-card__title">协议说明</text>
                </view>
                <view class="section-card__body">
                    <view class="info-text">
                        <text
                            >MIT License
                            是一个宽松的开源协议，允许您自由使用、修改、分发本软件，包括商业用途。使用本软件时，请保留版权声明和许可声明。</text
                        >
                    </view>
                </view>
            </view>
        </view>
    </demo-page>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.license-page {
    padding: 24rpx;
    background: linear-gradient(180deg, rgba(41, 121, 255, 0.03) 0%, transparent 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 24rpx;
}

.license-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 24rpx;
    padding: 60rpx 40rpx;
    text-align: center;
    box-shadow: 0 12rpx 32rpx rgba(102, 126, 234, 0.2);
    margin-bottom: 8rpx;

    &__title {
        font-size: 48rpx;
        font-weight: 800;
        color: #ffffff;
        margin-bottom: 16rpx;
        text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
    }

    &__subtitle {
        font-size: 28rpx;
        color: rgba(255, 255, 255, 0.9);
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

.license-content {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
}

.license-section {
    &__title {
        font-size: 30rpx;
        font-weight: 700;
        color: var(--u-type-primary);
        margin-bottom: 16rpx;
        line-height: 1.6;
    }

    &__text {
        font-size: 26rpx;
        line-height: 1.8;
        color: $u-content-color;
        text-align: justify;
    }
}

.info-text {
    font-size: 28rpx;
    line-height: 1.8;
    color: $u-content-color;
}
</style>
