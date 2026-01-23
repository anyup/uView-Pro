<template>
    <demo-page nav-title="常见问题" :nav-back="true" hide-tabs>
        <view class="faq-page">
            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="question-circle" size="40" color="var(--u-type-primary)"></u-icon>
                    <text class="section-card__title">常见问题</text>
                </view>
                <view class="section-card__body">
                    <u-collapse v-model="activeNames" :border="false">
                        <u-collapse-item v-for="(item, index) in faqList" :key="index" :name="index" :title="item.q">
                            <view class="faq-answer">{{ item.a }}</view>
                        </u-collapse-item>
                    </u-collapse>
                </view>
            </view>

            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="chat" size="40" color="var(--u-type-success)"></u-icon>
                    <text class="section-card__title">需要帮助？</text>
                </view>
                <view class="section-card__body">
                    <view class="help-text">
                        <text>如果这里没有找到您想要的答案，可以通过以下方式联系我们：</text>
                    </view>
                    <view class="help-links">
                        <view class="help-link" @click="copyLink('https://uviewpro.cn')">
                            <u-icon name="chrome-circle-fill" size="32" color="var(--u-type-primary)"></u-icon>
                            <text>访问官网文档：https://uviewpro.cn</text>
                        </view>
                        <view class="help-link" @click="copyLink('https://github.com/anyup/uview-pro')">
                            <u-icon name="github-circle-fill" size="32" color="var(--u-type-info)"></u-icon>
                            <text>访问 GitHub 仓库：https://github.com/anyup/uview-pro</text>
                        </view>
                        <view class="help-link" @click="preview('weixin-chat-cl')">
                            <u-icon name="chat" size="32" color="var(--u-type-success)"></u-icon>
                            <text>加入交流群</text>
                        </view>
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

// 展开的项
const activeNames = ref<number[]>([0]);

// FAQ 列表
const faqList = ref([
    {
        q: 'uView Pro 支持哪些平台？',
        a: 'uView Pro 支持 H5、微信小程序、支付宝小程序、App（Android/iOS）、HarmonyOS 等多个平台，一套代码多端运行。'
    },
    {
        q: '如何开始使用 uView Pro？',
        a: '您可以通过 pnpm、npm 或 yarn 安装 uView Pro，然后在项目中引入组件即可使用。详细的使用文档请访问官网：https://uviewpro.cn'
    },
    {
        q: 'uView Pro 是免费的吗？',
        a: '是的，uView Pro 采用 MIT 开源协议，完全免费使用，包括商业项目。'
    },
    {
        q: '如何自定义主题？',
        a: 'uView Pro 提供了丰富的主题配置选项，您可以通过 ConfigProvider 组件或主题配置文件来自定义主题颜色、字体等样式。'
    },
    {
        q: '遇到问题如何反馈？',
        a: '您可以通过 GitHub Issues、微信交流群或官网反馈问题。我们会及时处理您的反馈。'
    },
    {
        q: '如何贡献代码？',
        a: '欢迎提交 Pull Request！请先 Fork 项目，创建功能分支，提交代码后发起 PR。我们会及时审查您的贡献。'
    },
    {
        q: '组件支持暗黑模式吗？',
        a: '是的，uView Pro 完全支持暗黑模式，您可以通过主题系统轻松切换明暗主题。'
    },
    {
        q: '性能如何？',
        a: 'uView Pro 经过精心优化，组件体积小、性能优异。我们持续优化组件性能，确保在各种设备上都能流畅运行。'
    }
]);

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

// 图片预览
function preview(url: string) {
    if (!url) return;
    if (!url.includes('http')) {
        url = getImageUrl(url, true);
    }
    uni.previewImage({
        urls: [url],
        current: url
    });
}

// 获取图片地址
function getImageUrl(name: string, force: boolean = false) {
    let url = `https://ik.imagekit.io/anyup/images/social/${name}.png`;
    // #ifdef APP-HARMONY
    url = `/static/app/${name}.png`;
    // #endif
    // #ifndef APP-HARMONY
    if (force) {
        url = `${url}?updatedAt=${new Date().getTime()}`;
    }
    // #endif
    return url;
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
.faq-page {
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

.faq-answer {
    font-size: 26rpx;
    line-height: 1.8;
    color: $u-content-color;
    padding: 16rpx 0;
}

.help-text {
    font-size: 28rpx;
    line-height: 1.8;
    color: $u-content-color;
    margin-bottom: 24rpx;
}

.help-links {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
}

.help-link {
    display: flex;
    align-items: center;
    gap: 16rpx;
    padding: 24rpx;
    background: rgba(41, 121, 255, 0.06);
    border-radius: 16rpx;
    transition: all 0.3s ease;

    &:active {
        background: rgba(41, 121, 255, 0.12);
        transform: scale(0.98);
    }

    text {
        font-size: 28rpx;
        color: $u-main-color;
        font-weight: 500;
    }
}
</style>
