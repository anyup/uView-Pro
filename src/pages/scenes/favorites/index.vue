<template>
    <demo-page hide-tabs title="我的收藏" desc="收藏喜欢的组件" :nav-back="true">
        <view class="favorites-container">
            <!-- 统计信息 -->
            <view class="stats-section">
                <view class="stat-card">
                    <view class="stat-value">{{ favorites.length }}</view>
                    <view class="stat-label">已收藏组件</view>
                </view>
            </view>

            <!-- 收藏列表 -->
            <view class="favorites-list">
                <view v-if="favorites.length === 0" class="empty-state">
                    <u-empty mode="data" text="暂无收藏，快去收藏喜欢的组件吧" :show-empty="true"></u-empty>
                    <u-button type="primary" size="mini" @click="goToComponents" style="margin-top: 40rpx">
                        去浏览组件
                    </u-button>
                </view>

                <view
                    v-for="item in favorites"
                    :key="item.path"
                    class="favorite-item"
                    @click="openComponent(item.path)"
                >
                    <view class="favorite-icon">
                        <u-avatar :text="item.title" bg-color="var(--u-bg-gray-light)" mode="square"></u-avatar>
                    </view>
                    <view class="favorite-info">
                        <view class="favorite-title">{{ item.title }}</view>
                        <view class="favorite-desc">{{ item.desc || '组件描述' }}</view>
                        <view class="favorite-time">收藏于 {{ formatTime(item.collectedAt) }}</view>
                    </view>
                    <view class="favorite-actions" @click.stop="removeFavorite(item.path)">
                        <u-icon name="trash" size="40" color="var(--u-type-error)"></u-icon>
                    </view>
                </view>
            </view>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

interface FavoriteItem {
    path: string;
    title: string;
    desc?: string;
    icon?: string;
    collectedAt: number;
}

const STORAGE_KEY = 'uview-favorites';

const favorites = ref<FavoriteItem[]>([]);

// 获取图标地址
function getIcon(path: string) {
    // #ifdef APP
    return '/static/app/example/' + path + '.png';
    // #endif
    return 'https://ik.imagekit.io/anyup/uview-pro/example/' + path + '.png';
}

// 格式化时间
function formatTime(timestamp: number) {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${year}年${month}月${day}日`;
}

// 加载收藏
function loadFavorites() {
    try {
        const stored = uni.getStorageSync(STORAGE_KEY);
        if (stored && Array.isArray(stored)) {
            favorites.value = stored.sort((a, b) => b.collectedAt - a.collectedAt);
        }
    } catch (error) {
        console.warn('loadFavorites error', error);
    }
}

// 保存收藏
function saveFavorites() {
    try {
        uni.setStorageSync(STORAGE_KEY, favorites.value);
    } catch (error) {
        console.warn('saveFavorites error', error);
    }
}

// 打开组件
function openComponent(path: string) {
    uni.navigateTo({ url: path });
}

// 移除收藏
function removeFavorite(path: string) {
    uni.showModal({
        title: '确认取消收藏',
        content: '确定要取消收藏这个组件吗？',
        success: res => {
            if (res.confirm) {
                favorites.value = favorites.value.filter(item => item.path !== path);
                saveFavorites();
                $u.toast('已取消收藏', 'success');
            }
        }
    });
}

// 前往组件页面
function goToComponents() {
    uni.switchTab({ url: '/pages/example/components' });
}

onMounted(() => {
    loadFavorites();
});
</script>

<style lang="scss" scoped>
.favorites-container {
    padding: 24rpx;
    min-height: 100vh;
    background: linear-gradient(180deg, rgba(41, 121, 255, 0.02) 0%, transparent 100%);
}

.stats-section {
    margin-bottom: 24rpx;
}

.stat-card {
    padding: 32rpx;
    background: linear-gradient(135deg, rgba(41, 121, 255, 0.15), rgba(25, 190, 107, 0.15));
    border-radius: 20rpx;
    box-shadow: 0 8rpx 24rpx rgba(41, 121, 255, 0.15);
    text-align: center;
}

.stat-value {
    font-size: 64rpx;
    font-weight: 700;
    color: var(--u-type-primary);
    margin-bottom: 12rpx;
}

.stat-label {
    font-size: 28rpx;
    color: var(--u-content-color);
}

.favorites-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.favorite-item {
    display: flex;
    align-items: center;
    padding: 24rpx;
    background: var(--u-bg-color);
    border-radius: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
    gap: 20rpx;
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.98);
    }
}

.favorite-icon {
    flex-shrink: 0;
}

.favorite-info {
    flex: 1;
    min-width: 0;
}

.favorite-title {
    font-size: 30rpx;
    font-weight: 600;
    color: var(--u-main-color);
    margin-bottom: 8rpx;
}

.favorite-desc {
    font-size: 24rpx;
    color: var(--u-content-color);
    margin-bottom: 8rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.favorite-time {
    font-size: 22rpx;
    color: var(--u-tips-color);
}

.favorite-actions {
    flex-shrink: 0;
    padding: 8rpx;
}

.empty-state {
    padding: 100rpx 0;
    text-align: center;
}
</style>
