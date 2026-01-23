<template>
    <demo-page nav-title="使用指南" :nav-back="true" hide-tabs>
        <view class="guide-page">
            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="book" size="40" color="var(--u-type-primary)"></u-icon>
                    <text class="section-card__title">快速开始</text>
                </view>
                <view class="section-card__body">
                    <view class="guide-step" v-for="(step, index) in quickStartSteps" :key="index">
                        <view class="guide-step__number">{{ index + 1 }}</view>
                        <view class="guide-step__content">
                            <view class="guide-step__title">{{ step.title }}</view>
                            <view class="guide-step__desc">{{ step.desc }}</view>
                            <view class="guide-step__code" v-if="step.code">
                                <text class="guide-step__code-text">{{ step.code }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="list" size="40" color="var(--u-type-success)"></u-icon>
                    <text class="section-card__title">学习资源</text>
                </view>
                <view class="section-card__body">
                    <view
                        class="resource-item"
                        v-for="(item, index) in resources"
                        :key="index"
                        @click="handleResourceClick(item)"
                    >
                        <view class="resource-item__icon" :style="{ background: item.color }">
                            <u-icon :name="item.icon" size="40" color="#ffffff"></u-icon>
                        </view>
                        <view class="resource-item__content">
                            <view class="resource-item__title">{{ item.title }}</view>
                            <view class="resource-item__desc">{{ item.desc }}</view>
                        </view>
                        <view class="resource-item__arrow">
                            <u-icon name="arrow-right" color="#c0c4cc" size="32"></u-icon>
                        </view>
                    </view>
                </view>
            </view>

            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="lightbulb" size="40" color="var(--u-type-warning)"></u-icon>
                    <text class="section-card__title">最佳实践</text>
                </view>
                <view class="section-card__body">
                    <view class="practice-item" v-for="(item, index) in bestPractices" :key="index">
                        <view class="practice-item__icon">
                            <u-icon name="checkmark-circle" size="32" color="var(--u-type-success)"></u-icon>
                        </view>
                        <view class="practice-item__text">{{ item }}</view>
                    </view>
                </view>
            </view>

            <u-toast ref="uToastRef" />
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const uToastRef = ref();

// 快速开始步骤
const quickStartSteps = ref([
    {
        title: '安装 uView Pro',
        desc: '通过 pnpm、npm 或 yarn 安装',
        code: 'pnpm add uview-pro'
    },
    {
        title: '注册 uView Pro',
        desc: '在 main.ts 中引入',
        code: "import uviewPro from 'uview-pro';\napp.use(uviewPro);"
    },

    {
        title: '引入主题样式',
        desc: '在 uni.scss 中引入主题样式',
        code: "@import 'uview-pro/theme.scss';"
    },
    {
        title: '引入基础样式',
        desc: '在 App.vue 中引入基础样式',
        code: "@import 'uview-pro/index.scss';"
    },

    {
        title: '配置 easycom 自动引入组件',
        desc: '在 pages.json 中配置 easycom 规则',
        code: '{\n  "easycom": {\n  "autoscan": true,\n    "custom": {\n      "^u-(.*)": "uview-pro/components/u-$1/u-$1.vue"\n    }\n  }\n}'
    },
    {
        title: '开始使用',
        desc: '在页面中直接使用组件',
        code: '<u-button type="primary">按钮</u-button>'
    }
]);

// 学习资源
const resources = ref([
    {
        title: '官方文档',
        desc: 'https://uviewpro.cn',
        icon: 'file-text',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        url: 'https://uviewpro.cn'
    },
    {
        title: 'GitHub 仓库',
        desc: '查看源代码和 Issues',
        icon: 'github-circle-fill',
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        url: 'https://github.com/anyup/uview-pro'
    },
    {
        title: '组件示例',
        desc: '查看所有组件演示',
        icon: 'grid',
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        url: '/pages/example/components',
        onClick: () => {
            uni.switchTab({
                url: '/pages/example/components'
            });
        }
    }
]);

// 最佳实践
const bestPractices = ref([
    '使用 TypeScript 获得更好的类型提示',
    '合理使用主题系统，保持界面风格统一',
    '注意组件的平台兼容性',
    '遵循组件使用规范，避免不必要的样式覆盖',
    '定期更新到最新版本，获得新功能和修复'
]);

// 处理资源点击
function handleResourceClick(item: any) {
    if (item.onClick) {
        item.onClick();
        return;
    }
    if (item.url) {
        if (item.url.startsWith('http')) {
            copyLink(item.url);
        } else {
            uni.navigateTo({
                url: item.url
            });
        }
    }
}

// 复制链接
function copyLink(url: string) {
    // #ifdef H5
    window.open(url);
    // #endif
    // #ifndef H5
    uni.setClipboardData({
        data: url,
        success: () => {
            showToast('链接已复制，请打开浏览器粘贴访问');
        }
    });
    // #endif
}

// 显示 Toast
function showToast(title: string) {
    uToastRef.value?.show({
        title: title,
        type: 'success'
    });
}
</script>

<style lang="scss" scoped>
.guide-page {
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

.guide-step {
    display: flex;
    gap: 24rpx;
    padding: 24rpx 0;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.04);

    &:last-child {
        border-bottom: none;
    }

    &__number {
        flex-shrink: 0;
        width: 64rpx;
        height: 64rpx;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--u-type-primary), var(--u-type-success));
        color: #ffffff;
        font-size: 32rpx;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4rpx 12rpx rgba(41, 121, 255, 0.3);
    }

    &__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12rpx;
    }

    &__title {
        font-size: 30rpx;
        font-weight: 600;
        color: $u-main-color;
    }

    &__desc {
        font-size: 26rpx;
        color: $u-content-color;
    }

    &__code {
        background: rgba(0, 0, 0, 0.04);
        border-radius: 8rpx;
        padding: 16rpx;
        margin-top: 8rpx;
    }

    &__code-text {
        font-size: 24rpx;
        color: $u-main-color;
        font-family: 'Courier New', monospace;
        white-space: pre-wrap;
        word-break: break-all;
    }
}

.resource-item {
    display: flex;
    align-items: center;
    gap: 20rpx;
    padding: 24rpx;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 16rpx;
    margin-bottom: 16rpx;
    transition: all 0.3s ease;
    border: 1rpx solid rgba(0, 0, 0, 0.04);

    &:active {
        transform: scale(0.98);
        background: rgba(41, 121, 255, 0.08);
    }

    &:last-child {
        margin-bottom: 0;
    }

    &__icon {
        flex-shrink: 0;
        width: 80rpx;
        height: 80rpx;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
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
    }

    &__arrow {
        flex-shrink: 0;
    }
}

.practice-item {
    display: flex;
    align-items: flex-start;
    gap: 16rpx;
    padding: 20rpx 0;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.04);

    &:last-child {
        border-bottom: none;
    }

    &__icon {
        flex-shrink: 0;
        margin-top: 4rpx;
    }

    &__text {
        flex: 1;
        font-size: 26rpx;
        line-height: 1.8;
        color: $u-content-color;
    }
}
</style>
