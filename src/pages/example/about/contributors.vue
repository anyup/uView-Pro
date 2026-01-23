<template>
    <demo-page nav-title="贡献者" :nav-back="true" hide-tabs>
        <view class="contributors-page">
            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="man-add" size="40" color="var(--u-type-primary)"></u-icon>
                    <text class="section-card__title">贡献者列表</text>
                </view>
                <view class="section-card__body">
                    <view class="contributors-intro">
                        <text>感谢所有为 uView Pro 做出贡献的开发者们！你们的支持让这个项目变得更好。</text>
                    </view>
                </view>
            </view>

            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="star" size="40" color="var(--u-type-warning)"></u-icon>
                    <text class="section-card__title">活跃贡献者</text>
                </view>
                <view class="section-card__body">
                    <view v-for="(contributor, index) in contributors" :key="index" class="contributor-item">
                        <view class="contributor-item__avatar">
                            <u-avatar :src="getAvatarUrl(contributor.github)" size="80"></u-avatar>
                        </view>
                        <view class="contributor-item__info">
                            <view class="contributor-item__name">{{ contributor.name }}</view>
                            <view class="contributor-item__github" v-if="contributor.github">
                                @{{ contributor.github }}
                            </view>
                            <view class="contributor-item__desc" v-if="contributor.desc">
                                {{ contributor.desc }}
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="heart" size="40" color="var(--u-type-error)"></u-icon>
                    <text class="section-card__title">如何贡献</text>
                </view>
                <view class="section-card__body">
                    <view class="contribute-item" v-for="(item, index) in contributeWays" :key="index">
                        <view class="contribute-item__icon">
                            <u-icon :name="item.icon" size="40" :color="item.color"></u-icon>
                        </view>
                        <view class="contribute-item__content">
                            <view class="contribute-item__title">{{ item.title }}</view>
                            <view class="contribute-item__desc">{{ item.desc }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 贡献者列表
const contributors = ref([
    {
        name: '前端梦工厂',
        github: 'anyup',
        desc: '项目创始人 & 核心维护者'
    },
    {
        name: 'Bin',
        github: 'ffgenius',
        desc: '活跃贡献者'
    },
    {
        name: 'Meet you',
        github: 'wjp980108',
        desc: '活跃贡献者'
    },
    {
        name: 'Flyer',
        github: 'Lonely-flyer',
        desc: '活跃贡献者'
    },
    {
        name: 'liujiayii',
        github: 'liujiayii',
        desc: '活跃贡献者'
    },
    {
        name: 'XiaoZuoOvO',
        github: 'zuo-wentao',
        desc: '活跃贡献者'
    },
    {
        name: '不爱说话郭德纲',
        github: 'elkelkelkelkelk',
        desc: '活跃贡献者'
    }
]);

// 贡献方式
const contributeWays = ref([
    {
        icon: 'plus-circle',
        title: '提交代码',
        desc: '修复 Bug 或添加新功能',
        color: 'var(--u-type-primary)'
    },
    {
        icon: 'file-text',
        title: '完善文档',
        desc: '改进文档和示例',
        color: 'var(--u-type-success)'
    },
    {
        icon: 'question-circle',
        title: '报告问题',
        desc: '发现并报告 Bug',
        color: 'var(--u-type-warning)'
    },
    {
        icon: 'info-circle',
        title: '提出建议',
        desc: '分享你的想法和建议',
        color: 'var(--u-type-error)'
    }
]);

// 获取头像 URL
function getAvatarUrl(github: string) {
    if (!github) return '';
    // #ifdef APP
    return `/static/app/avatar/${github}.jpg`;
    // #endif
    return `https://ik.imagekit.io/anyup/uview-pro/avatar/${github}.jpg`;
}
</script>

<style lang="scss" scoped>
.contributors-page {
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

.contributors-intro {
    font-size: 28rpx;
    line-height: 1.8;
    color: $u-content-color;
    text-align: center;
    padding: 20rpx 0;
}

.contributor-item {
    display: flex;
    align-items: center;
    gap: 24rpx;
    padding: 24rpx 0;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.04);

    &:last-child {
        border-bottom: none;
    }

    &__avatar {
        flex-shrink: 0;
    }

    &__info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8rpx;
    }

    &__name {
        font-size: 30rpx;
        font-weight: 600;
        color: $u-main-color;
    }

    &__github {
        font-size: 24rpx;
        color: var(--u-type-primary);
    }

    &__desc {
        font-size: 24rpx;
        color: $u-tips-color;
    }
}

.contribute-item {
    display: flex;
    align-items: flex-start;
    gap: 20rpx;
    padding: 24rpx 0;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.04);

    &:last-child {
        border-bottom: none;
    }

    &__icon {
        flex-shrink: 0;
        width: 80rpx;
        height: 80rpx;
        border-radius: 16rpx;
        background: rgba(41, 121, 255, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8rpx;
    }

    &__title {
        font-size: 28rpx;
        font-weight: 600;
        color: $u-main-color;
    }

    &__desc {
        font-size: 24rpx;
        color: $u-tips-color;
        line-height: 1.6;
    }
}
</style>
