<template>
    <demo-page :nav-title="t('nav.about')" :nav-back="false" :tabbar="true">
        <view class="about-page">
            <!-- 用户信息卡片 -->
            <view class="hero-card" @click="navigateTo('/pages/example/about/about-me')">
                <view class="hero-card__bg"></view>
                <view class="hero-card__content">
                    <view class="hero-avatar">
                        <view class="hero-avatar__wrapper">
                            <u-avatar src="/static/logo.png" size="160"></u-avatar>
                            <view class="hero-avatar__ring"></view>
                        </view>
                    </view>
                    <view class="hero-info">
                        <view class="hero-info__name">
                            <text class="hero-info__name-text">uView Pro</text>
                            <view class="hero-info__badge">Pro</view>
                        </view>
                        <view class="hero-info__desc">
                            <text class="hero-info__desc-icon">💬</text>
                            <text>微信号：anyupxing</text>
                        </view>
                        <view class="hero-info__tagline">高质量跨平台 UI 组件库</view>
                    </view>
                    <view class="hero-arrow">
                        <u-icon name="arrow-right" color="rgba(255,255,255,0.8)" size="36"></u-icon>
                    </view>
                </view>
            </view>

            <!-- 功能入口 -->
            <view class="section-card">
                <view class="section-card__header">
                    <u-icon custom-prefix="custom-icon" name="grid" size="40" color="var(--u-type-primary)"></u-icon>
                    <text class="section-card__title">功能入口</text>
                </view>
                <view class="section-card__body">
                    <view class="menu-grid">
                        <view
                            v-for="(item, index) in menuList"
                            :key="index"
                            class="menu-item"
                            @click="navigateTo(item.path)"
                        >
                            <view class="menu-item__icon" :style="{ background: item.color }">
                                <u-icon
                                    :custom-prefix="item.customIcon ? 'custom-icon' : 'uicon'"
                                    :name="item.icon"
                                    size="48"
                                    color="#ffffff"
                                ></u-icon>
                            </view>
                            <view class="menu-item__title">{{ item.title }}</view>
                            <view class="menu-item__desc">{{ item.desc }}</view>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 交流群 -->
            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="chat" size="40" color="var(--u-type-success)"></u-icon>
                    <text class="section-card__title">交流反馈</text>
                </view>
                <view class="section-card__body">
                    <view v-for="(item, index) in chatList" :key="index" class="info-item" @click="itemClick(item)">
                        <view class="info-item__icon">
                            <u-image
                                :src="getImageUrl(item.icon)"
                                :width="64"
                                :height="64"
                                mode="aspectFill"
                                :fade="true"
                                radius="12"
                            ></u-image>
                        </view>
                        <view class="info-item__content">
                            <view class="info-item__title">{{ item.title }}</view>
                            <view class="info-item__label">{{ item.label }}</view>
                        </view>
                        <view class="info-item__arrow">
                            <u-icon name="arrow-right" color="#c0c4cc" size="32"></u-icon>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 其他信息 -->
            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="moments" size="40" color="var(--u-type-warning)"></u-icon>
                    <text class="section-card__title">其他信息</text>
                </view>
                <view class="section-card__body">
                    <view v-for="(item, index) in infoList" :key="index" class="info-item" @click="itemClick(item)">
                        <view class="info-item__icon">
                            <u-image
                                :src="getImageUrl(item.icon, true)"
                                :width="64"
                                :height="64"
                                mode="aspectFill"
                                :fade="true"
                                radius="12"
                            ></u-image>
                        </view>
                        <view class="info-item__content">
                            <view class="info-item__title">{{ item.title }}</view>
                            <view class="info-item__label">{{ item.label }}</view>
                        </view>
                        <view class="info-item__arrow">
                            <u-icon name="arrow-right" color="#c0c4cc" size="32"></u-icon>
                        </view>
                    </view>
                </view>
            </view>

            <u-toast ref="uToastRef" position="bottom" />
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { useTitle } from '@/common/useHooks';
import { onShow } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const uToastRef = ref();
// 国际化
const { t, locale } = useI18n();
const { setTitle } = useTitle(3);

// 功能菜单列表
const menuList = ref([
    {
        title: '关于我',
        desc: '了解开发者',
        icon: 'account',
        path: '/pages/example/about/about-me',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        title: '版本信息',
        desc: '查看应用版本',
        icon: 'info-circle',
        path: '/pages/example/about/version',
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        title: '开源协议',
        desc: 'MIT License',
        icon: 'file-text',
        path: '/pages/example/about/license',
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        title: '贡献者',
        desc: '感谢所有贡献者',
        icon: 'man-add',
        path: '/pages/example/about/contributors',
        color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
        title: '常见问题',
        desc: 'FAQ',
        icon: 'warning',
        path: '/pages/example/about/faq',
        color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
        title: '使用指南',
        desc: '快速上手',
        icon: 'bookmark',
        path: '/pages/example/about/guide',
        color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    },
    {
        title: '主题',
        desc: '多主题管理',
        icon: 'theme-fill',
        path: '/pages/other/theme/index',
        color: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e72 100%)',
        customIcon: true
    },
    {
        title: '国际化',
        desc: '多语言管理',
        icon: 'guide',
        path: '/pages/other/locale/index',
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        customIcon: true
    },
    {
        title: '设置',
        desc: '应用设置',
        icon: 'setting',
        path: '/pages/example/about/settings',
        color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
]);

// 其他信息列表
const infoList = ref([
    {
        icon: 'uview-pro',
        title: '官网文档',
        label: 'https://uviewpro.cn',
        click: () => {
            copyLink('https://uviewpro.cn');
        }
    },
    {
        icon: 'weixin_public',
        title: '微信公众号',
        label: '致力于分享各种前端技术最佳解决方案',
        click: () => {
            preview('qr_weixin_public2');
        }
    },
    {
        icon: 'juejin',
        title: '掘金社区',
        label: '掘金优秀创作者',
        click: () => {
            copyLink('https://juejin.cn/user/4230576472589976/posts');
        }
    },
    {
        icon: 'csdn',
        title: 'CSDN 博客',
        label: 'CSDN博客专家',
        click: () => {
            copyLink('https://blog.csdn.net/qq_24956515?type=blog');
        }
    },
    {
        icon: 'donate',
        title: '榜上有名',
        label: '参与捐赠，即刻上榜',
        click: () => {
            // #ifdef MP-WEIXIN
            copyLink('https://uviewpro.cn/zh/reward/donation.html');
            // #endif
            // #ifndef MP-WEIXIN
            preview('wechat-pay');
            // #endif
        }
    }
]);

// 交流群列表
const chatList = ref([
    {
        icon: 'wxpublic',
        title: '微信交流',
        label: '点击后长按或扫描二维码图片加入群聊，共同交流 uView Pro 相关问题',
        click: () => {
            // #ifdef APP-HARMONY
            preview('weixin-chat-cl');
            // #endif
            // #ifndef APP-HARMONY
            preview(`https://ik.imagekit.io/anyup/images/social/weixin-chat.png?updatedAt=${new Date().getTime()}`);
            // #endif
        }
    }
]);

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

/**
 * 导航到指定页面
 */
function navigateTo(path: string) {
    uni.navigateTo({
        url: path
    });
}

/**
 * 列表项点击事件
 */
function itemClick(item: any) {
    item.click && item.click();
}

/**
 * 图片预览
 */
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

/**
 * 复制链接，兼容H5和小程序
 */
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

// 显示Toast
function showToast(title: string) {
    // 通过ref调用uToast组件的show方法
    uToastRef.value?.show({
        title: title,
        type: 'success'
    });
}

// 设置标题
onShow(() => {
    setTitle();
});
</script>

<style lang="scss" scoped>
.about-page {
    padding: 24rpx;
    background: linear-gradient(180deg, rgba(41, 121, 255, 0.03) 0%, transparent 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 24rpx;
}

// Hero 卡片
.hero-card {
    position: relative;
    margin: 0 0 8rpx;
    border-radius: 24rpx;
    overflow: hidden;
    box-shadow: 0 12rpx 32rpx rgba(41, 121, 255, 0.2);
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.98);
    }

    &__bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #2979ff 0%, #19be6b 50%, #ff9900 100%);
        opacity: 0.95;

        &::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
            animation: heroGlow 8s ease-in-out infinite;
        }
    }

    &__content {
        position: relative;
        z-index: 2;
        padding: 40rpx 32rpx;
        display: flex;
        align-items: center;
        gap: 24rpx;
    }
}

@keyframes heroGlow {
    0%,
    100% {
        transform: rotate(0deg);
        opacity: 0.3;
    }
    50% {
        transform: rotate(180deg);
        opacity: 0.6;
    }
}

.hero-avatar {
    flex-shrink: 0;

    &__wrapper {
        position: relative;
        width: 160rpx;
        height: 160rpx;
        filter: drop-shadow(0 8rpx 16rpx rgba(0, 0, 0, 0.2));
    }

    &__ring {
        position: absolute;
        top: -8rpx;
        left: -8rpx;
        right: -8rpx;
        bottom: -8rpx;
        border: 4rpx solid rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        animation: ringRotate 3s linear infinite;
        box-shadow: 0 0 20rpx rgba(255, 255, 255, 0.3);
    }
}

@keyframes ringRotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.hero-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12rpx;

    &__name {
        display: flex;
        align-items: center;
        gap: 12rpx;
    }

    &__name-text {
        font-size: 44rpx;
        font-weight: 800;
        color: #ffffff;
        letter-spacing: 2rpx;
        text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
    }

    &__badge {
        padding: 4rpx 12rpx;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 8rpx;
        font-size: 20rpx;
        font-weight: 700;
        color: #ffffff;
        letter-spacing: 1rpx;
        backdrop-filter: blur(10rpx);
    }

    &__desc {
        display: flex;
        align-items: center;
        gap: 8rpx;
        font-size: 26rpx;
        color: rgba(255, 255, 255, 0.9);
    }

    &__desc-icon {
        font-size: 28rpx;
    }

    &__tagline {
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.8);
        margin-top: 4rpx;
    }
}

.hero-arrow {
    flex-shrink: 0;
    opacity: 0.8;
    transition: all 0.3s ease;
}

.hero-card:active .hero-arrow {
    transform: translateX(4rpx);
}

// 区块卡片
.section-card {
    background: $u-bg-gray-light;
    border-radius: 20rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 12rpx 32rpx rgba(41, 121, 255, 0.12);
    }

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
        padding: 8rpx 0;
    }
}

// 关于文本
.about-text {
    padding: 24rpx 32rpx 32rpx;
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

// 信息项
.info-item {
    display: flex;
    align-items: center;
    gap: 20rpx;
    padding: 24rpx 32rpx;
    transition: all 0.2s ease;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.04);
    position: relative;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 0;
        background: linear-gradient(135deg, rgba(41, 121, 255, 0.1), rgba(25, 190, 107, 0.1));
        transition: width 0.3s ease;
    }

    &:last-child {
        border-bottom: none;
    }

    &:active {
        background: rgba(41, 121, 255, 0.04);
        transform: translateX(4rpx);

        &::before {
            width: 6rpx;
        }
    }

    &__icon {
        flex-shrink: 0;
        width: 64rpx;
        height: 64rpx;
        border-radius: 12rpx;
        overflow: hidden;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
    }

    &:active &__icon {
        transform: scale(1.05);
        box-shadow: 0 6rpx 16rpx rgba(41, 121, 255, 0.2);
    }

    &__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8rpx;
    }

    &__title {
        font-size: 30rpx;
        font-weight: 600;
        color: $u-main-color;
        transition: color 0.2s ease;
    }

    &:active &__title {
        color: var(--u-type-primary);
    }

    &__label {
        font-size: 24rpx;
        color: $u-tips-color;
        line-height: 1.5;
    }

    &__arrow {
        flex-shrink: 0;
        opacity: 0.6;
        transition: all 0.2s ease;
    }
}

.info-item:active .info-item__arrow {
    transform: translateX(4rpx);
    opacity: 1;
    color: var(--u-type-primary);
}

// 菜单网格
.menu-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24rpx;
    padding: 24rpx 32rpx 32rpx;
}

.menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12rpx;
    padding: 24rpx 16rpx;
    border-radius: 16rpx;
    background: rgba(255, 255, 255, 0.6);
    transition: all 0.3s ease;
    border: 1rpx solid rgba(0, 0, 0, 0.04);

    &:active {
        transform: scale(0.95);
        background: rgba(41, 121, 255, 0.08);
    }

    &__icon {
        width: 96rpx;
        height: 96rpx;
        border-radius: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
    }

    &:active &__icon {
        transform: scale(1.1);
        box-shadow: 0 12rpx 28rpx rgba(0, 0, 0, 0.25);
    }

    &__title {
        font-size: 28rpx;
        font-weight: 600;
        color: $u-main-color;
        text-align: center;
    }

    &__desc {
        font-size: 22rpx;
        color: $u-tips-color;
        text-align: center;
    }
}
</style>
