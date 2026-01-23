<template>
    <demo-page :nav-title="t('nav.template')" :nav-back="false" :tabbar="true">
        <view class="template-market">
            <page-nav :desc="desc" title="nav.template" :index="2"></page-nav>

            <!-- 顶部描述 -->
            <view class="market-hero">
                <view class="hero-text">
                    <view class="hero-title">模板市场 · 一键搭建业务页面</view>
                    <view class="hero-desc">精选页面、部件与完整场景示例，支持预览、下载与导出</view>
                </view>
                <view class="hero-actions">
                    <u-button type="primary" size="mini" shape="circle" @click="currentCategory = 1">页面</u-button>
                    <u-button type="success" size="mini" shape="circle" @click="currentCategory = 2">部件</u-button>
                    <u-button type="warning" size="mini" shape="circle" @click="currentCategory = 3">场景</u-button>
                </view>
            </view>

            <!-- 搜索栏 -->
            <view class="market-search">
                <u-search
                    v-model="searchText"
                    placeholder="搜索模板..."
                    :show-action="false"
                    shape="round"
                    @search="handleSearch"
                ></u-search>
            </view>

            <!-- 轮播横幅 -->
            <view class="market-banner">
                <u-swiper
                    :list="bannerList"
                    :effect3d="true"
                    mode="none"
                    autoplay
                    title
                    height="300"
                    @click="swiperClick"
                ></u-swiper>
            </view>

            <!-- 分类标签 -->
            <view class="market-categories">
                <u-subsection
                    :list="categoryOptions"
                    :current="currentCategory"
                    @change="changeCategory"
                    active-color="var(--u-type-primary)"
                ></u-subsection>
            </view>

            <!-- 模板列表 -->
            <view class="market-content">
                <view v-for="(group, gIndex) in filteredGroups" :key="gIndex" class="template-group">
                    <view class="group-header">
                        <view class="group-title">
                            <u-icon
                                custom-prefix="custom-icon"
                                name="folder"
                                size="40"
                                :color="$u.getColor('primary')"
                            ></u-icon>
                            <text class="group-name">{{ getGroupTitle(group) }}</text>
                        </view>
                        <view class="group-count">{{ group.list.length }} 个模板</view>
                    </view>

                    <view class="template-grid">
                        <view
                            v-for="tpl in group.list"
                            :key="tpl.path"
                            class="template-card"
                            @click="openTemplateDetail(tpl)"
                        >
                            <view class="card-preview">
                                <u-image
                                    :src="getPreviewImage(tpl)"
                                    mode="aspectFit"
                                    width="100%"
                                    height="200"
                                    :lazy-load="true"
                                ></u-image>
                                <view class="card-overlay">
                                    <view class="overlay-actions">
                                        <u-button
                                            type="primary"
                                            size="mini"
                                            shape="circle"
                                            @click.stop="openTemplate(tpl)"
                                        >
                                            <u-icon name="eye" size="32" color="#fff"></u-icon>
                                        </u-button>
                                        <u-button
                                            type="success"
                                            size="mini"
                                            shape="circle"
                                            @click.stop="handleDownload(tpl)"
                                        >
                                            <u-icon name="download" size="32" color="#fff"></u-icon>
                                        </u-button>
                                    </view>
                                </view>
                                <view v-if="tpl.isHot" class="card-badge hot">热门</view>
                                <view v-if="tpl.isNew" class="card-badge new">新品</view>
                            </view>
                            <view class="card-content">
                                <view class="card-title">{{ getTitle('title', tpl) }}</view>
                                <view class="card-desc">{{ getTitle('desc', tpl) }}</view>
                                <view class="card-meta">
                                    <view class="meta-item">
                                        <u-icon name="download" size="28" color="var(--u-tips-color)"></u-icon>
                                        <text>{{ tpl.downloadCount || 0 }}</text>
                                    </view>
                                    <view class="meta-item">
                                        <u-icon name="star-fill" size="28" color="var(--u-tips-color)"></u-icon>
                                        <text>{{ tpl.rating || '4.5' }}</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 空状态 -->
                <view v-if="filteredGroups.length === 0" class="empty-state">
                    <u-empty mode="search" text="未找到相关模板" :show-empty="true"></u-empty>
                </view>
            </view>

            <u-gap height="70"></u-gap>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import rawList from './template.config';
import { onShow } from '@dcloudio/uni-app';
import { useTitle } from '@/common/useHooks';
import { completeMission } from '@/common/useExperience';
import { $u } from '@/uni_modules/uview-pro';

const list = ref<any[]>(Array.isArray(rawList) ? rawList : []);
const searchText = ref('');
const currentCategory = ref(0);
const categoryOptions = ['全部', '页面', '部件', '场景'];

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

// 获取分组标题
function getGroupTitle(group: any) {
    return group.groupName || group.groupName_en || '未分类';
}

// 筛选后的分组列表
const filteredGroups = computed(() => {
    let result = list.value;

    // 按分类筛选
    if (currentCategory.value > 0) {
        const categoryMap: Record<number, string> = {
            1: '页面',
            2: '部件',
            3: '场景'
        };
        const targetCategory = categoryMap[currentCategory.value];
        result = result.filter((group: any) => {
            const groupName = group.groupName || group.groupName_en || '';
            return groupName.includes(targetCategory);
        });
    }

    // 按搜索关键词筛选
    if (searchText.value) {
        const keyword = searchText.value.toLowerCase();
        result = result
            .map((group: any) => {
                const filteredList = (group.list || []).filter((tpl: any) => {
                    const title = (getTitle('title', tpl) || '').toLowerCase();
                    const desc = (getTitle('desc', tpl) || '').toLowerCase();
                    return title.includes(keyword) || desc.includes(keyword);
                });
                return {
                    ...group,
                    list: filteredList
                };
            })
            .filter((group: any) => group.list.length > 0);
    }

    return result;
});

// 获取预览图
function getPreviewImage(tpl: any) {
    if (tpl.previewImage) {
        return tpl.previewImage;
    }
    // 使用默认预览图
    const iconName = tpl.icon || 'template';
    // #ifdef APP
    return `/static/app/template/${iconName}.png`;
    // #endif
    return `https://ik.imagekit.io/anyup/uview-pro/template/${iconName}.png`;
}

// 国际化
const { t, locale } = useI18n();
const { getTitle, setTitle } = useTitle(2);

// 组件描述
const desc = computed(() => t('template.desc'));

function getBannerImage(name: string) {
    let url = `https://ik.imagekit.io/anyup/uview-pro/swiper/${name}.png`;
    // #ifdef APP-HARMONY
    url = `/static/app/swiper/${name}.png`;
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

// 打开模板详情
function openTemplateDetail(tpl: any) {
    const fullPath = tpl.path.indexOf('/page') == 0 ? tpl.path : '/pages/template/' + tpl.path + '/index';
    uni.navigateTo({
        url: `/pages/template/detail/index?path=${encodeURIComponent(fullPath)}&title=${encodeURIComponent(getTitle('title', tpl))}&desc=${encodeURIComponent(getTitle('desc', tpl) || '')}`
    });
}

function openTemplate(tpl: any) {
    const fullPath = tpl.path.indexOf('/page') == 0 ? tpl.path : '/pages/template/' + tpl.path + '/index';

    uni.navigateTo({
        url: fullPath
    });
}

// 处理下载
function handleDownload(tpl: any) {
    const itemList = ['预览模板'];
    if (tpl.codeLink) {
        itemList.push('下载代码');
    }
    if (tpl.shareLink) {
        itemList.push('分享模板');
    }
    uni.showActionSheet({
        itemList,
        success: res => {
            if (res.tapIndex === 0) {
                openPage(tpl.path);
            } else if (res.tapIndex === 1) {
                downloadTemplate(tpl);
            } else if (res.tapIndex === 2) {
                shareTemplate(tpl);
            }
        }
    });
}

// 下载模板代码
function downloadTemplate(tpl: any) {
    copyCodeLink(tpl.codeLink);
}

// 导出为图片
function shareTemplate(tpl: any) {
    copyShareLink(tpl.shareLink);
}

// 复制代码链接
function copyCodeLink(link: string) {
    if (!link) return;

    uni.setClipboardData({
        data: link,
        success: () => {
            $u.toast('代码链接已复制', 'success');
        }
    });
}

// 复制分享链接
function copyShareLink(link: string) {
    if (!link) return;
    uni.setClipboardData({
        data: link,
        success: () => {
            $u.toast('分享链接已复制', 'success');
        }
    });
}

// 搜索处理
function handleSearch() {
    // 搜索逻辑已在computed中处理
}

// 切换分类
function changeCategory(index: number) {
    currentCategory.value = index;
}

// 设置标题
onShow(() => {
    setTitle();
    completeMission('template');
});
</script>

<style lang="scss" scoped>
.template-market {
    min-height: 100vh;
    background: linear-gradient(180deg, rgba(41, 121, 255, 0.02) 0%, transparent 100%);
}

.market-hero {
    margin: 0 20rpx 20rpx;
    padding: 24rpx 28rpx;
    background: linear-gradient(135deg, rgba(41, 121, 255, 0.12), rgba(25, 190, 107, 0.1));
    border-radius: 16rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20rpx;
    box-shadow: 0 8rpx 24rpx rgba(41, 121, 255, 0.1);
}

.hero-text {
    display: flex;
    flex-direction: column;
    gap: 10rpx;
}

.hero-title {
    font-size: 32rpx;
    font-weight: 700;
    color: $u-main-color;
}

.hero-desc {
    font-size: 24rpx;
    color: $u-content-color;
}

.hero-actions {
    display: flex;
    gap: 12rpx;
    flex-shrink: 0;
}

.market-search {
    padding: 20rpx 30rpx;
    background: transparent;
}

.market-banner {
    padding: 0 20rpx 24rpx;
}

.market-categories {
    padding: 0 30rpx 24rpx;
}

.market-content {
    padding: 0 20rpx;
}

.template-group {
    margin-bottom: 40rpx;
}

.group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
    padding: 0 10rpx;
}

.group-title {
    display: flex;
    align-items: center;
    gap: 12rpx;
}

.group-name {
    font-size: 32rpx;
    font-weight: 600;
    color: $u-main-color;
}

.group-count {
    font-size: 24rpx;
    color: $u-tips-color;
    background: rgba(41, 121, 255, 0.1);
    padding: 8rpx 16rpx;
    border-radius: 20rpx;
}

.template-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
}

.template-card {
    width: calc((100% - 20rpx) / 2);
    background: $u-bg-color;
    border-radius: 16rpx;
    overflow: hidden;
    box-shadow: 0 8rpx 24rpx rgba(41, 121, 255, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;

    &:active {
        transform: scale(0.98);
    }
}

.card-preview {
    position: relative;
    width: 100%;
    height: 200rpx;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(41, 121, 255, 0.1), rgba(25, 190, 107, 0.1));

    .card-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.6));
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        pointer-events: auto;
        transition: opacity 0.25s ease;

        .overlay-actions {
            display: flex;
            gap: 20rpx;
        }
    }

    &:active {
        .card-overlay {
            opacity: 1;
        }
    }

    .card-badge {
        position: absolute;
        top: 12rpx;
        right: 12rpx;
        padding: 6rpx 16rpx;
        border-radius: 20rpx;
        font-size: 20rpx;
        font-weight: 600;
        color: #fff;

        &.hot {
            background: linear-gradient(135deg, #ff6b6b, #ff4757);
        }

        &.new {
            background: linear-gradient(135deg, #4facfe, #00f2fe);
        }
    }
}

// Hover/press 显示操作层（H5 悬停、触摸按压）
.template-card:hover .card-overlay,
.template-card:active .card-overlay {
    opacity: 1;
}

.card-content {
    padding: 20rpx;
}

.card-title {
    font-size: 28rpx;
    font-weight: 600;
    color: $u-main-color;
    margin-bottom: 8rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-desc {
    font-size: 24rpx;
    color: $u-content-color;
    margin-bottom: 16rpx;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
}

.card-meta {
    display: flex;
    gap: 24rpx;
    align-items: center;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 8rpx;
    font-size: 22rpx;
    color: $u-tips-color;
}

.empty-state {
    padding: 100rpx 0;
}
</style>
