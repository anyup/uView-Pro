<template>
    <demo-page hide-tabs title="数据统计" desc="统计你的使用情况，了解你的使用习惯。" :nav-back="true">
        <view class="dashboard-container">
            <!-- 概览卡片 -->
            <view class="overview-card">
                <view class="overview-title">使用概览</view>
                <view class="overview-stats">
                    <view class="stat-box">
                        <view class="stat-value">{{ totalVisits }}</view>
                        <view class="stat-label">总访问次数</view>
                    </view>
                    <view class="stat-box">
                        <view class="stat-value">{{ totalComponents }}</view>
                        <view class="stat-label">体验组件数</view>
                    </view>
                    <view class="stat-box">
                        <view class="stat-value">{{ totalXP }}</view>
                        <view class="stat-label">累计体验值</view>
                    </view>
                </view>
            </view>

            <!-- 使用时长统计 -->
            <u-card title="使用时长统计" :border="false">
                <template #body>
                    <view class="time-stats">
                        <view class="time-item">
                            <view class="time-label">今日使用</view>
                            <view class="time-value">{{ formatTime(todayTime) }}</view>
                        </view>
                        <view class="time-item">
                            <view class="time-label">本周使用</view>
                            <view class="time-value">{{ formatTime(weekTime) }}</view>
                        </view>
                        <view class="time-item">
                            <view class="time-label">本月使用</view>
                            <view class="time-value">{{ formatTime(monthTime) }}</view>
                        </view>
                    </view>
                </template>
            </u-card>

            <!-- 组件使用排行 -->
            <u-card title="组件使用排行" :border="false">
                <template #body>
                    <view class="ranking-list">
                        <view v-for="(item, index) in topComponents" :key="item.key" class="ranking-item">
                            <view class="ranking-index" :class="getRankClass(index)">
                                {{ index + 1 }}
                            </view>
                            <view class="ranking-info">
                                <view class="ranking-name">{{ item.key }}</view>
                                <view class="ranking-meta">
                                    <text>访问 {{ item.visits }} 次</text>
                                    <text>·</text>
                                    <text>交互 {{ item.interactions }} 次</text>
                                </view>
                            </view>
                            <view class="ranking-xp">{{ item.xp }} XP</view>
                        </view>
                        <view v-if="topComponents.length === 0" class="ranking-empty"> 暂无使用记录 </view>
                    </view>
                </template>
            </u-card>

            <!-- 功能使用统计 -->
            <u-card title="功能使用统计" :border="false">
                <template #body>
                    <view class="feature-stats">
                        <view class="feature-item">
                            <view class="feature-icon">
                                <u-icon name="list" size="50" color="var(--u-type-primary)"></u-icon>
                            </view>
                            <view class="feature-info">
                                <view class="feature-name">待办事项</view>
                                <view class="feature-count">{{ todoCount }} 条</view>
                            </view>
                        </view>
                        <view class="feature-item">
                            <view class="feature-icon">
                                <u-icon name="file-text" size="50" color="var(--u-type-success)"></u-icon>
                            </view>
                            <view class="feature-info">
                                <view class="feature-name">我的笔记</view>
                                <view class="feature-count">{{ noteCount }} 条</view>
                            </view>
                        </view>
                        <view class="feature-item">
                            <view class="feature-icon">
                                <u-icon name="star" size="50" color="var(--u-type-warning)"></u-icon>
                            </view>
                            <view class="feature-info">
                                <view class="feature-name">收藏组件</view>
                                <view class="feature-count">{{ favoriteCount }} 个</view>
                            </view>
                        </view>
                    </view>
                </template>
            </u-card>

            <!-- 最近活动 -->
            <u-card title="最近活动" :border="false">
                <template #body>
                    <view class="activity-list">
                        <view v-for="(activity, index) in recentActivities" :key="index" class="activity-item">
                            <view class="activity-icon" :class="getActivityClass(activity.type)">
                                <u-icon :name="getActivityIcon(activity.type)" size="30" color="#fff"></u-icon>
                            </view>
                            <view class="activity-content">
                                <view class="activity-text">{{ activity.text }}</view>
                                <view class="activity-time">{{ formatActivityTime(activity.time) }}</view>
                            </view>
                        </view>
                        <view v-if="recentActivities.length === 0" class="activity-empty"> 暂无活动记录 </view>
                    </view>
                </template>
            </u-card>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useExperienceCenter } from '@/common/useExperienceCenter';

const { componentStats, totalInteractions } = useExperienceCenter();

// 统计数据
const totalVisits = ref(0);
const totalComponents = ref(0);
const totalXP = ref(0);
const todayTime = ref(0);
const weekTime = ref(0);
const monthTime = ref(0);
const todoCount = ref(0);
const noteCount = ref(0);
const favoriteCount = ref(0);

// 组件使用排行
const topComponents = computed(() => {
    const stats = (componentStats as any)?.value || componentStats || {};
    const components = Object.entries(stats)
        .map(([key, value]: [string, any]) => ({
            key,
            ...value
        }))
        .filter(item => item.visits > 0)
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 10);
    return components;
});

// 最近活动
const recentActivities = ref<Array<{ type: string; text: string; time: number }>>([]);

// 获取排名样式
function getRankClass(index: number) {
    if (index === 0) return 'rank-gold';
    if (index === 1) return 'rank-silver';
    if (index === 2) return 'rank-bronze';
    return '';
}

// 获取活动图标
function getActivityIcon(type: string) {
    const iconMap: Record<string, string> = {
        component: 'grid-fill',
        task: 'checkmark-circle',
        note: 'file-text',
        favorite: 'star'
    };
    return iconMap[type] || 'info-circle';
}

// 获取活动样式
function getActivityClass(type: string) {
    const classMap: Record<string, string> = {
        component: 'activity-component',
        task: 'activity-task',
        note: 'activity-note',
        favorite: 'activity-favorite'
    };
    return classMap[type] || 'activity-default';
}

// 格式化时间
function formatTime(seconds: number) {
    if (seconds < 60) return `${seconds}秒`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟`;
    return `${Math.floor(seconds / 3600)}小时${Math.floor((seconds % 3600) / 60)}分钟`;
}

// 格式化活动时间
function formatActivityTime(timestamp: number) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// 加载统计数据
function loadStats() {
    try {
        // 加载体验中心数据
        const stats = (componentStats as any)?.value || componentStats || {};
        totalComponents.value = Object.keys(stats).length;
        totalXP.value = Number(Object.values(stats).reduce((sum: number, item: any) => sum + (item.xp || 0), 0));
        totalVisits.value = Number(
            Object.values(stats).reduce((sum: number, item: any) => sum + (item.visits || 0), 0)
        );

        // 加载其他功能数据
        const todoList = uni.getStorageSync('uview-todo-list') || [];
        todoCount.value = Array.isArray(todoList) ? todoList.length : 0;

        const notesList = uni.getStorageSync('uview-notes-list') || [];
        noteCount.value = Array.isArray(notesList) ? notesList.length : 0;

        const favorites = uni.getStorageSync('uview-favorites') || [];
        favoriteCount.value = Array.isArray(favorites) ? favorites.length : 0;

        // 模拟使用时长（实际应该从真实数据计算）
        const today = Math.floor(Math.random() * 3600) + 1800; // 30分钟到1.5小时
        todayTime.value = today;
        weekTime.value = today * 7;
        monthTime.value = today * 30;

        // 生成最近活动
        generateRecentActivities();
    } catch (error) {
        console.warn('loadStats error', error);
    }
}

// 生成最近活动
function generateRecentActivities() {
    const activities = [];
    const now = Date.now();

    // 从组件统计中生成活动
    const stats = (componentStats as any)?.value || componentStats || {};
    Object.entries(stats).forEach(([key, value]: [string, any]) => {
        if (value.lastUpdated) {
            activities.push({
                type: 'component',
                text: `体验了 ${key} 组件`,
                time: value.lastUpdated
            });
        }
    });

    // 从待办事项生成活动
    const todoList = uni.getStorageSync('uview-todo-list') || [];
    if (Array.isArray(todoList) && todoList.length > 0) {
        const latestTodo = todoList.sort((a, b) => b.createdAt - a.createdAt)[0];
        if (latestTodo) {
            activities.push({
                type: 'task',
                text: `创建了待办事项：${latestTodo.text}`,
                time: latestTodo.createdAt
            });
        }
    }

    // 从笔记生成活动
    const notesList = uni.getStorageSync('uview-notes-list') || [];
    if (Array.isArray(notesList) && notesList.length > 0) {
        const latestNote = notesList.sort((a, b) => b.updatedAt - a.updatedAt)[0];
        if (latestNote) {
            activities.push({
                type: 'note',
                text: `创建了笔记：${latestNote.title}`,
                time: latestNote.updatedAt
            });
        }
    }

    // 排序并取最近10条
    recentActivities.value = activities.sort((a, b) => b.time - a.time).slice(0, 10);
}

onMounted(() => {
    loadStats();
});
</script>

<style lang="scss" scoped>
.dashboard-container {
    padding: 24rpx;
    min-height: 100vh;
    background: linear-gradient(180deg, rgba(41, 121, 255, 0.02) 0%, transparent 100%);
}

.overview-card {
    padding: 32rpx;
    background: linear-gradient(135deg, rgba(41, 121, 255, 0.15), rgba(25, 190, 107, 0.15));
    border-radius: 20rpx;
    box-shadow: 0 8rpx 24rpx rgba(41, 121, 255, 0.15);
    margin-bottom: 24rpx;
}

.overview-title {
    font-size: 32rpx;
    font-weight: 600;
    color: var(--u-main-color);
    margin-bottom: 24rpx;
}

.overview-stats {
    display: flex;
    gap: 20rpx;
}

.stat-box {
    flex: 1;
    text-align: center;
}

.stat-value {
    font-size: 48rpx;
    font-weight: 700;
    color: var(--u-type-primary);
    margin-bottom: 8rpx;
}

.stat-label {
    font-size: 24rpx;
    color: var(--u-content-color);
}

.time-stats {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.time-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    background: rgba(41, 121, 255, 0.05);
    border-radius: 12rpx;
}

.time-label {
    font-size: 28rpx;
    color: var(--u-content-color);
}

.time-value {
    font-size: 32rpx;
    font-weight: 600;
    color: var(--u-type-primary);
}

.ranking-list {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
}

.ranking-item {
    display: flex;
    align-items: center;
    padding: 20rpx;
    background: rgba(41, 121, 255, 0.05);
    border-radius: 12rpx;
    gap: 20rpx;
}

.ranking-index {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--u-border-color);
    color: var(--u-content-color);
    font-size: 28rpx;
    font-weight: 600;

    &.rank-gold {
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        color: #fff;
    }

    &.rank-silver {
        background: linear-gradient(135deg, #c0c0c0, #e8e8e8);
        color: #fff;
    }

    &.rank-bronze {
        background: linear-gradient(135deg, #cd7f32, #e6a23c);
        color: #fff;
    }
}

.ranking-info {
    flex: 1;
}

.ranking-name {
    font-size: 28rpx;
    font-weight: 600;
    color: var(--u-main-color);
    margin-bottom: 8rpx;
}

.ranking-meta {
    font-size: 22rpx;
    color: var(--u-tips-color);
    display: flex;
    gap: 8rpx;
}

.ranking-xp {
    font-size: 28rpx;
    font-weight: 600;
    color: var(--u-type-warning);
}

.ranking-empty {
    text-align: center;
    padding: 40rpx 0;
    color: var(--u-tips-color);
}

.feature-stats {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.feature-item {
    display: flex;
    align-items: center;
    padding: 24rpx;
    background: rgba(41, 121, 255, 0.05);
    border-radius: 12rpx;
    gap: 24rpx;
}

.feature-icon {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(41, 121, 255, 0.1);
    border-radius: 16rpx;
}

.feature-info {
    flex: 1;
}

.feature-name {
    font-size: 28rpx;
    font-weight: 600;
    color: var(--u-main-color);
    margin-bottom: 8rpx;
}

.feature-count {
    font-size: 24rpx;
    color: var(--u-tips-color);
}

.activity-list {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
}

.activity-item {
    display: flex;
    align-items: center;
    gap: 20rpx;
    padding: 20rpx;
    background: rgba(41, 121, 255, 0.05);
    border-radius: 12rpx;
}

.activity-icon {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &.activity-component {
        background: var(--u-type-primary);
    }

    &.activity-task {
        background: var(--u-type-success);
    }

    &.activity-note {
        background: var(--u-type-warning);
    }

    &.activity-favorite {
        background: var(--u-type-error);
    }

    &.activity-default {
        background: var(--u-tips-color);
    }
}

.activity-content {
    flex: 1;
}

.activity-text {
    font-size: 28rpx;
    color: var(--u-main-color);
    margin-bottom: 8rpx;
}

.activity-time {
    font-size: 22rpx;
    color: var(--u-tips-color);
}

.activity-empty {
    text-align: center;
    padding: 40rpx 0;
    color: var(--u-tips-color);
}
</style>
