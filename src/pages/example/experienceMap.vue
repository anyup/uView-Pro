<template>
    <demo-page nav-title="体验地图" :nav-back="false" :tabbar="true">
        <view class="experience-map">
            <view class="hero-card u-m-b-20">
                <view class="hero-badge">
                    <view class="hero-badge__inner">
                        <view class="hero-badge__text">{{ levelInfo.title }}</view>
                        <view class="hero-badge__glow"></view>
                    </view>
                </view>
                <view class="hero-title">我的组件体验等级</view>
                <view class="hero-subtitle">{{ levelInfo.title }}</view>
                <view class="hero-xp">
                    <text class="hero-xp__value">{{ xp }} XP</text>
                    <text class="hero-xp__hint">
                        <text v-if="nextLevel">
                            距离 {{ nextLevel.title }} 还差 {{ Math.max(nextLevel.threshold - xp, 0) }} XP
                        </text>
                        <text v-else>已达到最高段位，继续自由探索吧</text>
                    </text>
                </view>
                <u-line-progress
                    :percent="levelProgress"
                    height="16px"
                    :show-text="false"
                    active-color="var(--u-type-warning)"
                    inactive-color="rgba(0,0,0,0.08)"
                />
                <view class="hero-tags">
                    <u-tag size="mini" type="primary" :text="`已体验 ${componentSummary.components} 个组件`" plain />
                    <u-tag size="mini" type="success" :text="`完成 ${componentSummary.tasksCompleted} 个任务`" plain />
                    <u-tag
                        v-if="componentSummary.mostActive"
                        size="mini"
                        type="warning"
                        :text="`最常用：${componentSummary.mostActive.key}`"
                        plain
                    />
                </view>
            </view>

            <u-card title="体验任务" :border="false" margin="0">
                <template #body>
                    <view v-if="currentMission" class="mission-card">
                        <view class="mission-card__title">{{ currentMission.title }}</view>
                        <view class="mission-card__desc">{{ currentMission.desc }}</view>
                        <view class="mission-card__meta">
                            <u-tag size="mini" type="primary" plain :text="currentMission.hint">
                                {{ currentMission.hint }}
                            </u-tag>
                            <u-tag size="mini" type="warning" plain :text="`奖励${currentMission.reward}XP`">
                                {{ currentMission.reward }} XP
                            </u-tag>
                            <u-tag v-if="isCurrentMissionCompleted" size="mini" type="success" plain text="已完成">
                                已完成
                            </u-tag>
                        </view>
                        <view class="mission-card__actions">
                            <u-button type="error" size="mini" plain @click="refreshMission">换一个</u-button>
                            <u-button
                                v-if="isCurrentMissionCompleted"
                                type="success"
                                size="mini"
                                @click="handleClaimReward"
                            >
                                领取积分
                            </u-button>
                            <u-button v-else type="primary" size="mini" @click="handleCompleteMission">
                                完成任务
                            </u-button>
                        </view>
                    </view>
                    <view v-else class="mission-empty">
                        <view class="mission-empty__text">暂无任务，立即领取一个体验挑战吧～</view>
                        <u-button type="primary" size="mini" @click="handleAssignMission">领取任务</u-button>
                    </view>
                </template>
            </u-card>

            <u-card title="成长路线" :border="false" margin="0">
                <template #body>
                    <view class="map-steps">
                        <view v-for="step in displayMapSteps" :key="step.id" class="map-step">
                            <view class="map-step__header">
                                <view class="map-step__title-wrap">
                                    <view class="map-step__dot" :class="`map-step__dot--${step.status}`"></view>
                                    <text class="map-step__title">{{ step.title }}</text>
                                </view>
                                <u-tag
                                    size="mini"
                                    :type="
                                        step.status === 'finish'
                                            ? 'success'
                                            : step.status === 'process'
                                              ? 'warning'
                                              : 'info'
                                    "
                                    :text="
                                        step.status === 'finish'
                                            ? '已达成'
                                            : step.status === 'process'
                                              ? '进行中'
                                              : '未解锁'
                                    "
                                />
                            </view>
                            <u-line-progress
                                :percent="step.percent"
                                height="10px"
                                :show-text="false"
                                active-color="var(--u-type-primary)"
                                inactive-color="rgba(0,0,0,0.08)"
                            />
                            <view class="map-step__tip">{{ step.tip }}</view>
                        </view>
                    </view>
                </template>
            </u-card>

            <u-card title="组件体验雷达" :border="false" margin="0">
                <view class="radar-list">
                    <view v-for="stat in topComponents" :key="stat.key" class="radar-item">
                        <view class="radar-item__header">
                            <text class="radar-item__name">{{ stat.key }}</text>
                            <text class="radar-item__xp">{{ stat.xp }} XP</text>
                        </view>
                        <u-line-progress
                            :percent="getComponentPercent(stat.xp)"
                            height="10px"
                            :show-text="false"
                            active-color="var(--u-type-primary)"
                            inactive-color="rgba(0,0,0,0.06)"
                        />
                        <view class="radar-item__meta">
                            <text>交互 {{ stat.interactions }} 次 · 任务 {{ stat.tasksCompleted }} 个</text>
                        </view>
                    </view>
                    <view v-if="!topComponents.length" class="radar-empty">
                        暂无组件体验记录，去任意组件页面多点点交互吧～
                    </view>
                </view>
            </u-card>

            <u-card title="最近体验记录" :border="false" margin="0">
                <view v-if="hasRealLogs" class="log-list">
                    <view v-for="log in displayLogs" :key="log.timestamp" class="log-item">
                        <view class="log-item__main">
                            <text class="log-item__text">{{ log.message }}</text>
                        </view>
                        <text class="log-item__time">{{ formatLogTime(log.timestamp) }}</text>
                    </view>
                </view>
                <view v-else class="log-list">
                    <view v-for="log in displayLogs" :key="log.timestamp" class="log-item log-item--placeholder">
                        <view class="log-item__main">
                            <text class="log-item__text">{{ log.message }}</text>
                        </view>
                        <text class="log-item__time">{{ formatLogTime(log.timestamp) }}</text>
                    </view>
                    <view class="log-empty">暂无真实体验记录，先去组件页完成一些任务吧～</view>
                </view>
            </u-card>

            <u-card title="下一步推荐" :border="false" margin="0">
                <view class="suggest-list">
                    <u-cell-group :border="false">
                        <u-cell-item
                            v-for="suggest in suggests"
                            :key="suggest.title"
                            :title="suggest.title"
                            :label="suggest.desc"
                            :arrow="false"
                            :custom-style="{ padding: '10px 0' }"
                            :label-style="{ fontSize: '11px' }"
                            @click="goToPath(suggest.path)"
                        >
                            <template #icon>
                                <u-icon
                                    :name="suggest.icon"
                                    custom-prefix="custom-icon"
                                    size="40"
                                    :color="suggest.iconColor"
                                    :custom-style="{ marginRight: '5px' }"
                                ></u-icon>
                            </template>
                            <template #right-icon>
                                <u-tag
                                    size="mini"
                                    type="primary"
                                    :text="suggest.tag"
                                    plain
                                    :custom-style="{ width: '112rpx' }"
                                ></u-tag>
                            </template>
                        </u-cell-item>
                    </u-cell-group>
                </view>
            </u-card>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useExperienceCenter } from '@/common/useExperienceCenter';
import {
    missionPool,
    completeMission,
    assignMission,
    unassignMission,
    claimMissionReward,
    isMissionCompleted,
    type Mission
} from '@/common/useExperience';
import { $u } from 'uview-pro';
import { onShow } from '@dcloudio/uni-app';

const { xp, levelInfo, nextLevel, levelProgress, mapSteps, recentLogs, componentSummary, componentStats } =
    useExperienceCenter();

const formatLogTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hour}:${minute}`;
};

const topComponents = computed(() => {
    // 从 useExperienceCenter 获取所有组件统计数据
    const stats = (componentStats as any)?.value || componentStats || {};

    // 获取所有组件的统计数据
    const components = Object.values(stats) as any[];

    // 按 XP 排序，取前 5 个
    const sorted = components
        .filter(stat => stat && stat.xp > 0)
        .sort((a, b) => b.xp - a.xp)
        .slice(0, 5);

    return sorted;
});

const getComponentPercent = (componentXp: number) => {
    if (componentXp === 0) return 0;

    // 计算该组件在所有组件中的占比，但不超过100%
    const allComponents = topComponents.value;
    if (allComponents.length === 0) return 0;

    const maxComponentXP = Math.max(...allComponents.map(c => c.xp), componentXp);
    if (maxComponentXP === 0) return 0;

    return Math.min(100, Math.round((componentXp / maxComponentXP) * 100));
};

const fallbackMapSteps = [
    { id: 'start', title: '起步探索', tip: '完成任意组件的首次交互', status: 'wait', percent: 0 },
    { id: 'interact', title: '交互达人', tip: '累计体验值达到 80 点', status: 'wait', percent: 0 },
    { id: 'scene', title: '场景高手', tip: '完成 10 个任务点位', status: 'wait', percent: 0 },
    { id: 'mentor', title: '体验导师', tip: '体验值达到 260 点', status: 'wait', percent: 0 }
];

const displayMapSteps = computed(() => {
    const steps = (mapSteps as any)?.value ?? mapSteps;
    if (Array.isArray(steps) && steps.length) return steps;
    return fallbackMapSteps;
});

const fallbackLogs = [
    { message: '完成 Image 组件任务 +12XP', timestamp: Date.now() - 1000 * 60 * 20 },
    { message: '切换主题并收藏组件 +6XP', timestamp: Date.now() - 1000 * 60 * 60 }
];

const getRecentLogs = () => {
    const value = (recentLogs as any)?.value ?? recentLogs;
    return Array.isArray(value) ? value : [];
};

const displayLogs = computed(() => {
    const logs = getRecentLogs();
    if (logs.length) return logs;
    return fallbackLogs;
});
const hasRealLogs = computed(() => getRecentLogs().length > 0);

const missionStateKey = 'experience-map-mission';
const currentMissionId = ref<string | null>(null);
const completedMissionIds = ref<string[]>([]);
const missionVerification = ref<Record<string, { verified: boolean; timestamp: number }>>({});

const currentMission = computed(() => {
    if (!currentMissionId.value) return null;
    return missionPool.find(item => item.id === currentMissionId.value) ?? null;
});

// 检查当前任务是否已完成
const isCurrentMissionCompleted = computed(() => {
    if (!currentMissionId.value) return false;
    return isMissionCompleted(currentMissionId.value);
});

const isMissionVerified = (missionId: string) => {
    const verification = missionVerification.value[missionId];
    if (!verification) return false;
    // 验证时间在5分钟内有效
    return verification.verified && Date.now() - verification.timestamp < 5 * 60 * 1000;
};

const persistMissionState = () => {
    try {
        if (typeof uni === 'undefined') return;
        uni.setStorageSync(missionStateKey, {
            current: currentMissionId.value,
            completed: completedMissionIds.value,
            verification: missionVerification.value
        });
    } catch (error) {
        console.warn('persistMissionState error', error);
    }
};

const loadMissionState = () => {
    try {
        if (typeof uni === 'undefined') return;
        const cache = uni.getStorageSync(missionStateKey);
        if (cache) {
            currentMissionId.value = cache.current || null;
            completedMissionIds.value = Array.isArray(cache.completed) ? cache.completed : [];
            missionVerification.value = cache.verification || {};
            // 如果当前有任务，确保它被标记为已领取
            if (currentMissionId.value) {
                assignMission(currentMissionId.value, true);
            }
        }
    } catch (error) {
        console.warn('loadMissionState error', error);
    }
};

const handleAssignMission = () => {
    const available = missionPool.filter(item => !completedMissionIds.value.includes(item.id));
    if (!available.length) {
        uni.showToast({ title: '当前没有更多任务，稍后再来', icon: 'none' });
        currentMissionId.value = null;
        persistMissionState();
        return;
    }
    const mission = available[Math.floor(Math.random() * available.length)];
    currentMissionId.value = mission.id;
    // 调用 useExperience 中的 assignMission 方法领取任务
    assignMission(mission.id);
    persistMissionState();
};

const refreshMission = () => {
    // 如果当前有任务，先取消领取
    if (currentMissionId.value) {
        unassignMission(currentMissionId.value);
    }
    currentMissionId.value = null;
    handleAssignMission();
};

const verifyMission = (missionId: string) => {
    // 检查用户是否真正完成了任务
    const mission = missionPool.find(m => m.id === missionId);
    if (!mission) return false;

    const componentKey = mission.componentKey;

    // 从 useExperienceCenter 获取组件统计数据
    const stats = (componentStats as any)?.value || componentStats || {};
    const componentStat = stats[componentKey];

    // 检查该组件是否有交互记录（交互次数 > 0 或访问次数 > 0）
    const hasInteraction =
        componentStat && (componentStat.interactions > 0 || componentStat.visits > 0 || componentStat.xp > 0);

    // 或者检查是否有相关的体验记录
    const logs = getRecentLogs();
    const hasRelatedLog = logs.some(
        log =>
            log.message &&
            (log.message.includes(componentKey) ||
                log.message.includes(mission.hint) ||
                log.message.includes(mission.title))
    );

    return hasInteraction || hasRelatedLog;
};

// 领取积分（如果任务已完成则领取积分）
const handleClaimReward = () => {
    if (!currentMission.value) return;

    // 检查任务是否已完成（在 completedMissionIds 中）
    if (isCurrentMissionCompleted.value) {
        // 任务已完成，直接领取积分（不需要验证，因为 completeMission 已经验证过了）
        const success = claimMissionReward(currentMission.value.id);
        if (success) {
            currentMissionId.value = null;
            persistMissionState();
            handleAssignMission();
        }
    } else {
        // 如果任务未完成，先验证任务是否真正完成
        const verified = verifyMission(currentMission.value.id);
        if (verified) {
            // 验证通过，说明任务已完成但可能还没调用 completeMission
            // 先标记为完成，然后领取积分
            const completeSuccess = completeMission(currentMission.value.id);
            if (completeSuccess) {
                // 任务已标记为完成，现在领取积分
                const claimSuccess = claimMissionReward(currentMission.value.id);
                if (claimSuccess) {
                    currentMissionId.value = null;
                    persistMissionState();
                    handleAssignMission();
                }
            }
        } else {
            // 验证失败，提示用户先去完成任务
            uni.showModal({
                title: '任务验证失败',
                content: `请先前往"${currentMission.value.hint}"完成相关操作，然后再来领取积分。`,
                showCancel: false
            });
        }
    }
};

// 验证任务完成状态（当任务未完成时点击"完成任务"按钮）
const handleCompleteMission = () => {
    if (!currentMission.value) return;

    // 首先检查任务是否已经在 completedMissionIds 中（可能刚完成但界面还没更新）
    if (isCurrentMissionCompleted.value) {
        // 任务已完成，直接领取积分
        handleClaimReward();
        return;
    }

    // 验证任务是否真正完成（通过组件统计数据验证）
    const verified = verifyMission(currentMission.value.id);
    if (!verified) {
        uni.showModal({
            title: '任务验证失败',
            content: `请先前往"${currentMission.value.hint}"完成相关操作，然后再来领取积分。`,
            showCancel: false
        });
        return;
    }

    // 如果验证通过，说明任务已完成，但可能还没调用 completeMission
    // 这里可以提示用户，或者自动调用 completeMission
    uni.showToast({ title: '任务已完成，请点击"领取积分"按钮', icon: 'success' });
};

loadMissionState();
if (!currentMissionId.value) {
    handleAssignMission();
}

const suggests = [
    {
        title: '多体验几类基础组件',
        desc: '从 Button、Cell、Avatar 等基础组件开始，熟悉常用交互模式',
        icon: 'component-fill',
        iconColor: $u.color.primaryDark,
        tag: '基础组件',
        path: '/pages/example/components'
    },
    {
        title: '完成更多任务点位',
        desc: '在各示例页中按照“任务体验”提示完成任务，更快提升体验等级',
        icon: 'target',
        iconColor: $u.color.successDark,
        tag: '任务挑战',
        path: '/pages/example/components'
    },
    {
        title: '探索模板示例',
        desc: '进入模板示例页，查看完整业务场景的组件组合用法',
        icon: 'template-fill',
        iconColor: $u.color.warningDark,
        tag: '场景实践',
        path: '/pages/example/template'
    }
];

const goToPath = (path: string) => {
    if (!path) return;
    uni.navigateTo({ url: path });
};

// 页面显示时，重新加载任务状态（因为可能在组件中完成了任务）
onShow(() => {
    // 重新加载已完成的任务数据
    // 注意：这里需要从 useExperience 重新获取，但由于 completedMissionIds 是模块级别的 ref，
    // 应该已经是响应式的，所以这里主要是触发响应式更新
    // 如果任务已完成，界面会自动显示"领取积分"按钮
});
</script>

<style lang="scss" scoped>
.experience-map {
    padding: 24rpx;
    display: flex;
    flex-direction: column;
    gap: 28rpx;
    background: linear-gradient(180deg, rgba(41, 121, 255, 0.02) 0%, transparent 100%);
    min-height: 100vh;
}

.hero-card {
    position: relative;
    padding: 32rpx 24rpx;
    border-radius: 24rpx;
    background: linear-gradient(135deg, rgba(41, 121, 255, 0.15), rgba(25, 190, 107, 0.15), rgba(255, 153, 0, 0.1));
    box-shadow:
        0 12rpx 32rpx rgba(41, 121, 255, 0.15),
        0 4rpx 12rpx rgba(0, 0, 0, 0.08);
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -20%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
        animation: heroGlow 8s ease-in-out infinite;
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

.hero-badge {
    position: absolute;
    // top: -20rpx;
    right: 20rpx;
    width: 140rpx;
    height: 140rpx;
    z-index: 2;

    &__inner {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #ff6b6b, #ffa502, #ff6348);
        border-radius: 50%;
        box-shadow:
            0 8rpx 24rpx rgba(255, 107, 107, 0.4),
            inset 0 2rpx 8rpx rgba(255, 255, 255, 0.3);
        transform: rotate(-15deg);
        animation: badgePulse 2s ease-in-out infinite;
    }

    &__text {
        font-size: 22rpx;
        font-weight: 700;
        color: #fff;
        text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
        letter-spacing: 2rpx;
        transform: rotate(15deg);
    }

    &__glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120%;
        height: 120%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 107, 107, 0.6) 0%, transparent 70%);
        animation: badgeGlow 2s ease-in-out infinite;
    }
}

@keyframes badgePulse {
    0%,
    100% {
        transform: rotate(-15deg) scale(1);
    }
    50% {
        transform: rotate(-15deg) scale(1.05);
    }
}

@keyframes badgeGlow {
    0%,
    100% {
        opacity: 0.6;
        transform: translate(-50%, -50%) scale(1);
    }
    50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.2);
    }
}
.hero-title {
    font-size: 28rpx;
    color: rgba(96, 98, 102, 0.8);
    font-weight: 500;
    margin-bottom: 4rpx;
}
.hero-subtitle {
    margin-top: 8rpx;
    font-size: 42rpx;
    font-weight: 800;
    background: linear-gradient(135deg, #2979ff, #19be6b, #ff9900);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 2rpx;
}
.hero-xp {
    margin: 20rpx 0 24rpx;
    display: flex;
    flex-direction: column;
    gap: 8rpx;
    &__value {
        font-size: 48rpx;
        font-weight: 800;
        background: linear-gradient(135deg, #f59a23, #ff6b6b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 2rpx 8rpx rgba(245, 154, 35, 0.3);
    }
    &__hint {
        font-size: 24rpx;
        color: rgba(144, 147, 153, 0.9);
        line-height: 1.5;
    }
}
.hero-tags {
    margin-top: 16rpx;
    display: flex;
    flex-wrap: wrap;
    gap: 12rpx;
}

.map-steps {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}
.map-step {
    padding: 20rpx 16rpx;
    border-radius: 16rpx;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
    border: 1px solid rgba(41, 121, 255, 0.1);
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2rpx);
        box-shadow: 0 8rpx 20rpx rgba(41, 121, 255, 0.12);
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12rpx;
    }
    &__title-wrap {
        display: flex;
        align-items: center;
        gap: 12rpx;
    }
    &__title {
        font-size: 30rpx;
        font-weight: 700;
        color: #303133;
    }
    &__tip {
        margin-top: 10rpx;
        font-size: 24rpx;
        color: rgba(144, 147, 153, 0.9);
        line-height: 1.5;
    }
    &__dot {
        width: 20rpx;
        height: 20rpx;
        border-radius: 50%;
        background: #dcdfe6;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
        position: relative;

        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60%;
            height: 60%;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.8);
        }

        &--finish {
            background: linear-gradient(135deg, #67c23a, #85ce61);
            box-shadow: 0 2rpx 12rpx rgba(103, 194, 58, 0.4);
        }
        &--process {
            background: linear-gradient(135deg, #e6a23c, #f0a020);
            box-shadow: 0 2rpx 12rpx rgba(230, 162, 60, 0.4);
            animation: dotPulse 2s ease-in-out infinite;
        }
        &--wait {
            background: #dcdfe6;
        }
    }
}

@keyframes dotPulse {
    0%,
    100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.2);
        opacity: 0.8;
    }
}

.radar-list {
    display: flex;
    flex-direction: column;
    gap: 18rpx;
}
.radar-item {
    padding: 16rpx;
    border-radius: 12rpx;
    background: linear-gradient(135deg, rgba(41, 121, 255, 0.06), rgba(25, 190, 107, 0.06));
    border: 1px solid rgba(41, 121, 255, 0.1);
    transition: all 0.3s ease;

    &:hover {
        transform: translateX(4rpx);
        box-shadow: 0 4rpx 12rpx rgba(41, 121, 255, 0.15);
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10rpx;
    }
    &__name {
        font-size: 28rpx;
        font-weight: 700;
        color: #303133;
        letter-spacing: 1rpx;
    }
    &__xp {
        font-size: 26rpx;
        font-weight: 700;
        background: linear-gradient(135deg, #e6a23c, #f59a23);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    &__meta {
        margin-top: 6rpx;
        font-size: 22rpx;
        color: rgba(144, 147, 153, 0.9);
    }
}
.radar-empty {
    font-size: 24rpx;
    color: #909399;
    text-align: center;
    padding: 24rpx 0;
}

.log-list {
    display: flex;
    flex-direction: column;
    gap: 14rpx;
}
.log-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12rpx 16rpx;
    border-radius: 12rpx;
    background: rgba(41, 121, 255, 0.04);
    font-size: 24rpx;
    color: #606266;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(41, 121, 255, 0.08);
        transform: translateX(4rpx);
    }

    &--placeholder {
        opacity: 0.6;
    }

    &__main {
        flex: 1;
    }

    &__text {
        color: #606266;
    }

    &__time {
        font-size: 22rpx;
        color: rgba(192, 196, 204, 0.9);
        margin-left: 16rpx;
    }
}
.log-empty {
    font-size: 24rpx;
    color: #909399;
}

// .suggest-list {
.mission-card {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
    padding: 20rpx;
    border-radius: 16rpx;
    background: linear-gradient(135deg, rgba(255, 153, 0, 0.08), rgba(255, 107, 107, 0.08));
    border: 1px solid rgba(255, 153, 0, 0.2);
    box-shadow: 0 4rpx 16rpx rgba(255, 153, 0, 0.1);

    &__title {
        font-size: 32rpx;
        font-weight: 700;
        color: #303133;
        letter-spacing: 1rpx;
    }
    &__desc {
        font-size: 26rpx;
        color: #606266;
        line-height: 1.6;
    }
    &__meta {
        display: flex;
        gap: 12rpx;
        flex-wrap: wrap;
    }
    &__actions {
        margin-top: 8rpx;
        display: flex;
        gap: 16rpx;
        justify-content: flex-end;
    }
}
.mission-empty {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20rpx;
    &__text {
        font-size: 24rpx;
        color: #909399;
        flex: 1;
    }
}
:deep(.u-cell-item) {
    padding-left: 0 !important;
    padding-right: 0 !important;
}
// }
</style>
