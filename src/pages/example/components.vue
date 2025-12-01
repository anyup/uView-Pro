<template>
    <demo-page :nav-title="t('nav.components')" :nav-back="false" :tabbar="true">
        <view class="wrap">
            <page-nav :desc="desc" title="nav.components" :index="0"></page-nav>

            <!-- 主题切换按钮区域 -->
            <view class="theme-switcher">
                <view class="theme-label">{{ t('components.theme') || '主题' }}</view>
                <view class="theme-buttons">
                    <view
                        v-for="theme in themes"
                        :key="theme.name"
                        class="theme-btn"
                        :class="{ active: currentTheme.name === theme.name }"
                        @click="switchTheme(theme.name)"
                        :title="theme.description"
                    >
                        <view class="theme-color" :style="{ backgroundColor: theme.color.primary }"></view>
                        <view class="theme-name">{{ theme.label }}</view>
                    </view>
                </view>
            </view>

            <!-- 搜索区域 -->
            <view class="search-container">
                <u-sticky bg-color="transparent">
                    <view class="search-box">
                        <u-search
                            v-model="searchText"
                            @search="handleSearch"
                            @custom="handleSearch"
                            :placeholder="`${t('components.searchComponent')}`"
                            :show-action="false"
                            :action-text="t('components.search')"
                            shape="round"
                            :bg-color="searchBgColor"
                        ></u-search>
                    </view>
                </u-sticky>

                <view v-if="searchText" class="search-tips">
                    {{ t('components.find') }} <text class="count">{{ filteredList.length }}</text>
                    {{ t('components.matchingComponent') }}
                    <text class="clear-btn" @click="clearSearch">{{ t('components.clear') }}</text>
                </view>
            </view>

            <!-- 无搜索结果 -->
            <view v-if="searchText && filteredList.length === 0" class="empty-state">
                <u-empty mode="search" :text="t('components.notFound')" :show-empty="true"></u-empty>
            </view>

            <!-- 组件列表：流式卡片展示 -->
            <view v-else class="list-wrap">
                <view v-for="(group, gIndex) in filteredList" :key="gIndex" class="group-section">
                    <view class="group-title">
                        <u-image :height="50" :width="50" :src="getIcon(group.icon)"></u-image>
                        <text class="group-name">{{ getTitle('groupName', group) }}</text>
                        <view class="group-count">{{ group.list.length }}</view>
                    </view>

                    <view class="cards">
                        <view
                            class="card"
                            v-for="(item, idx) in group.list"
                            :key="idx"
                            @click="handleCardClick(item.path)"
                            :style="{ animationDelay: gIndex * 120 + idx * 60 + 'ms' }"
                        >
                            <!-- 图像小预览 -->
                            <u-image
                                :height="50"
                                :width="50"
                                :src="getIcon(item.icon || item.path)"
                                mode="widthFix"
                            ></u-image>
                            <view class="card-body">
                                <view class="card-title">{{ getTitle('title', item) }}</view>
                                <view class="card-desc">{{ getTitle('desc', item) }}</view>
                            </view>
                            <view class="card-arrow">›</view>
                        </view>
                    </view>
                </view>
            </view>
            <u-gap height="70"></u-gap>
            <u-back-top
                mode="circle"
                :scroll-top="scrollTop"
                :bottom="220"
                :custom-style="{ backgroundColor: $u.getColor('primaryLight') }"
            >
                <u-icon custom-prefix="custom-icon" name="rocket" size="50" :color="$u.getColor('primary')"></u-icon>
            </u-back-top>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import rawList from './components.config';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { onPageScroll, onShareAppMessage, onShow } from '@dcloudio/uni-app';
import { useTitle } from '@/common/util';
import { useTheme } from '@/uni_modules/uview-pro';
import { $u } from 'uview-pro';

// 主题管理（使用组合式 useTheme）
const { currentTheme, themes, setTheme } = useTheme();

const switchTheme = (themeName: string) => {
    setTheme(themeName);
};

// 组件数据
const itemStyle = {
    border: '1px solid rgb(230, 230, 230)',
    marginTop: '20px',
    padding: '15rpx 20rpx',
    borderRadius: '8px'
};
const list = ref<any[]>(Array.isArray(rawList) ? rawList : []); // 明确类型 any[]
const scrollTop = ref(0);
const searchText = ref('');
const searchBgColor = computed(() => $u.getColor('bgColor'));

// 国际化
const { t, locale } = useI18n();
const { setTitle, getTitle } = useTitle(0);

// 获取图标地址
const getIcon = (path: string) => {
    // #ifdef APP
    return '/static/app/example/' + path + '.png';
    // #endif
    return 'https://ik.imagekit.io/anyup/uview-pro/example/' + path + '.png';
};

// 组件描述
const desc = computed(() => t('components.desc'));

// 搜索过滤逻辑：支持 title / title_en / description / path
const filteredList = computed(() => {
    if (!searchText.value) {
        return list.value;
    }

    const keyword = searchText.value.toLowerCase();

    return list.value
        .map(group => {
            const filteredItems = group.list.filter((item: any) => {
                const title = (getTitle('title', item) || '').toLowerCase();
                const titleEn = (item.title_en || '').toLowerCase();
                const desc = (item.description || item.desc || '').toLowerCase();
                const path = (item.path || '').toLowerCase();

                return (
                    title.includes(keyword) ||
                    titleEn.includes(keyword) ||
                    desc.includes(keyword) ||
                    path.includes(keyword)
                );
            });

            return {
                ...group,
                list: filteredItems
            };
        })
        .filter(group => group.list.length > 0);
});

/**
 * 处理搜索
 */
function handleSearch() {
    // 搜索操作
}

/**
 * 清空搜索
 */
function clearSearch() {
    searchText.value = '';
}

/**
 * 处理卡片点击
 */
function handleCardClick(path: string) {
    openPage(path);
}

/**
 * 路由跳转
 */
function openPage(path: string) {
    // 兼容所有平台的跳转
    uni.navigateTo({ url: path });
}

/**
 * 分享
 */
onShareAppMessage(res => {
    return {
        title: 'uView Pro - 组件示例',
        path: '/pages/example/components'
    };
});

// 页面滚动事件处理
onPageScroll(e => {
    scrollTop.value = e.scrollTop;
});

// 设置标题
onShow(() => {
    setTitle();
});
</script>

<style lang="scss" scoped>
// 主题切换器
.theme-switcher {
    padding: 24rpx 30rpx;
    background: transparent;

    .theme-label {
        font-size: 24rpx;
        font-weight: 600;
        color: $u-main-color;
        margin-bottom: 16rpx;
    }

    .theme-buttons {
        display: flex;
        gap: 12rpx;
        flex-wrap: wrap;
    }

    .theme-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8rpx;
        padding: 12rpx 20rpx;
        background: $u-bg-color;
        border: 2rpx solid $u-border-color;
        border-radius: 10rpx;
        transition: all 0.28s cubic-bezier(0.2, 0.9, 0.2, 1);
        cursor: pointer;
        box-shadow: 0 4rpx 14rpx rgba(var(--u-main-color-rgb, 48, 49, 51), 0.08);

        &:active,
        &.active {
            border-color: $u-type-primary;
            background: rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.08);
            box-shadow: 0 8rpx 24rpx rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.2);
            transform: scale(1.02);
        }

        .theme-color {
            width: 32rpx;
            height: 32rpx;
            border-radius: 50%;
            box-shadow: 0 2rpx 8rpx rgba(var(--u-main-color-rgb, 48, 49, 51), 0.12);
            border: 2rpx solid $u-bg-color;
        }

        .theme-name {
            font-size: 22rpx;
            color: $u-content-color;
            font-weight: 500;
        }

        &.active .theme-name {
            color: $u-type-primary;
            font-weight: 700;
        }
    }
}

.u-cell-icon {
    width: 36rpx;
    height: 36rpx;
    margin-right: 8rpx;
}

// 搜索容器
.search-container {
    padding: 10rpx 30rpx;
    background: transparent;
    position: relative;
    z-index: 10;

    .search-box {
        margin-bottom: 20rpx;
        background-color: transparent;
        border-radius: 12rpx;
    }
}

// 搜索提示
.search-tips {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12rpx 20rpx;
    background: rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.08);
    border-radius: 8rpx;
    font-size: 24rpx;
    color: $u-content-color;
    border-left: 4rpx solid $u-type-primary;

    .count {
        color: $u-type-primary;
        font-weight: bold;
        margin: 0 8rpx;
    }

    .clear-btn {
        color: $u-type-primary;
        font-size: 22rpx;
        padding: 8rpx 16rpx;
        background: rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.12);
        border-radius: 6rpx;
        transition: all 0.3s ease;

        &:active {
            background: rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.22);
            transform: scale(0.95);
        }
    }
}

// 空状态
.empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400rpx;
    background: transparent;
}

// 列表容器
.list-wrap {
    padding: 0 30rpx;
    margin-top: 20rpx;
}

// 分组区
.group-section {
    margin-bottom: 36rpx;
}

/* 卡片网格 */
.cards {
    display: flex;
    flex-wrap: wrap;
    gap: 18rpx;
    margin-top: 20rpx;
}

.card {
    width: calc((100% - 3 * 18rpx) / 4);
    background: $u-bg-white;
    border-radius: 14rpx;
    padding: 22rpx 18rpx;
    display: flex;
    align-items: center;
    box-shadow: 0 12rpx 30rpx rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.08);
    transition:
        transform 0.18s cubic-bezier(0.2, 0.9, 0.2, 1),
        box-shadow 0.18s ease,
        filter 0.18s ease;
    cursor: pointer;
    will-change: transform, opacity;
    opacity: 0;
    transform: translateY(10rpx) scale(0.997);
    animation: fadeUp 420ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
}

.card:hover {
    transform: translateY(-8rpx) scale(1.01);
    box-shadow: 0 26rpx 60rpx rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.16);
    filter: saturate(1.02);
}

.card-body {
    margin-left: 20rpx;
    flex: 1;
}

.card-title {
    font-size: 30rpx;
    font-weight: 700;
    color: $u-main-color;
    margin-bottom: 16rpx;
}

.card-desc {
    font-size: 26rpx;
    color: $u-content-color;
    line-height: 32rpx;
    max-height: 64rpx;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-arrow {
    font-size: 40rpx;
    color: rgba(0, 0, 0, 0.12);
    margin-left: 12rpx;
    color: $u-type-primary;
}

.card:hover .card-img {
    transform: scale(1.06) rotate(-1deg);
}

.card:hover .card-arrow {
    transform: translateX(8rpx);
    color: $u-type-primary;
    transition:
        transform 0.18s ease,
        color 0.18s ease;
}

@keyframes fadeUp {
    0% {
        opacity: 0;
        transform: translateY(12rpx) scale(0.995);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* 为了 stagger 效果：使用内联 style 设置 animation-delay */

/* 响应：小屏 2 列 */
@media (max-width: 768px) {
    .card {
        width: calc((100% - 18rpx) / 2);
    }
    .card-title {
        font-size: 26rpx;
    }

    .card-desc {
        font-size: 22rpx;
        line-height: 30rpx;
        max-height: 60rpx;
    }
}

/* 更小屏 1 列 */
@media (max-width: 420px) {
    .card {
        width: 100%;
    }
    .card-title {
        font-size: 30rpx;
    }

    .card-desc {
        font-size: 24rpx;
        line-height: 32rpx;
        max-height: 64rpx;
    }
}

// 组群标题
.group-title {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    font-weight: 600;
    color: $u-main-color;
    height: 60rpx;
    position: relative;

    image {
        margin-right: 20rpx;
        border-radius: 6rpx;
    }

    .group-name {
        flex: 1;
        background: linear-gradient(135deg, $u-type-primary 0%, $u-type-primary-dark 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 36rpx;
        margin-left: 20rpx;
    }

    .group-count {
        background: linear-gradient(135deg, $u-type-primary 0%, $u-type-primary-dark 100%);
        color: #ffffff;
        padding: 6rpx 16rpx;
        border-radius: 20rpx;
        font-size: 22rpx;
        font-weight: 600;
        box-shadow: 0 4rpx 15rpx rgba(102, 126, 234, 0.4);
    }
}

// 平台特定样式
// H5平台增强
@media (min-width: 769px) {
    .group-title {
        transition: all 0.3s ease;

        &:hover {
            transform: translateX(10rpx);
        }
    }

    .clear-btn {
        cursor: pointer;

        &:hover {
            background: rgba(0, 122, 255, 0.15);
        }
    }
}

// 小程序平台
/* #ifdef MP-WEIXIN */
.group-title {
    padding-right: 20rpx;
}
/* #endif */

// App平台
/* #ifdef APP-PLUS */
.wrap {
    padding-top: 10rpx;
}
/* #endif */
</style>
