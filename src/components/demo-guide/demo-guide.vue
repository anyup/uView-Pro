<template>
    <view v-if="show" class="demo-guide">
        <view class="demo-guide__bg">
            <view class="demo-guide__bg-circle demo-guide__bg-circle--1"></view>
            <view class="demo-guide__bg-circle demo-guide__bg-circle--2"></view>
            <view class="demo-guide__bg-circle demo-guide__bg-circle--3"></view>
        </view>

        <view class="onboarding-header">
            <view class="onboarding-badge">
                <u-icon custom-prefix="custom-icon" name="sparkles" size="32" color="#fff"></u-icon>
                <text>uView Pro</text>
            </view>
            <view class="onboarding-subtitle">高质量跨平台 UI 组件库</view>
            <view class="onboarding-subdesc">跨端一致体验 · 深度适配 HarmonyOS App</view>
        </view>

        <swiper
            class="onboarding-swiper"
            :class="{ 'onboarding-swiper--disabled': !enableSwipe }"
            :current="onboardingIndex"
            @change="handleOnboardingChange"
            :duration="500"
        >
            <swiper-item v-for="(slide, index) in onboardingSlides" :key="`slide-${index}-${slideKey}`">
                <view class="onboarding-slide">
                    <view
                        v-for="(card, cardIndex) in slide.cards"
                        :key="`card-${index}-${cardIndex}`"
                        class="onboarding-card"
                        :class="[
                            `onboarding-card--${card.position}`,
                            `onboarding-card--${card.size || 'medium'}`,
                            { 'onboarding-card--active': activeCardId === `${index}-${cardIndex}` }
                        ]"
                        :style="getCardStyle(card, cardIndex, index, cardIndex)"
                        @click="handleCardClick(index, cardIndex)"
                    >
                        <view class="onboarding-card__icon" v-if="card.icon">
                            <u-icon
                                :custom-prefix="card.prefix || 'custom-icon'"
                                :name="card.icon"
                                size="64"
                                :color="card.iconColor || '#fff'"
                            ></u-icon>
                        </view>
                        <view class="onboarding-card__content">
                            <view class="onboarding-card__title">{{ card.title }}</view>
                            <view class="onboarding-card__desc">{{ card.desc }}</view>
                            <view v-if="card.features && card.features.length" class="onboarding-card__features">
                                <view
                                    v-for="(feature, fIndex) in card.features"
                                    :key="fIndex"
                                    class="onboarding-card__feature"
                                >
                                    <view class="onboarding-card__feature-dot"></view>
                                    <text>{{ feature }}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </swiper-item>
        </swiper>

        <view class="onboarding-dots">
            <view
                v-for="(slide, index) in onboardingSlides"
                :key="slide.title + index"
                class="onboarding-dot"
                :class="{ 'onboarding-dot--active': onboardingIndex === index }"
                @click="handleDotClick(index)"
            ></view>
        </view>

        <view class="onboarding-actions">
            <view v-if="onboardingIndex > 0" class="action-btn action-btn--prev" @click="handlePrev">
                <u-icon name="arrow-left" size="32" color="#fff"></u-icon>
                <text>上一步</text>
            </view>
            <view
                v-if="onboardingIndex < onboardingSlides.length - 1"
                class="action-btn action-btn--next"
                @click="handleNext"
            >
                <text>下一步</text>
                <u-icon name="arrow-right" size="32" color="#fff"></u-icon>
            </view>
            <view v-else class="action-btn action-btn--complete" @click="handleComplete">
                <u-icon custom-prefix="custom-icon" name="sparkles" size="36" color="#fff"></u-icon>
                <text>进入应用</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { $u } from 'uview-pro';
import { ref, computed, onMounted, nextTick } from 'vue';
import { ONBOARDING_STORAGE_BASE_KEY } from '../../common/constant';

interface OnboardingCard {
    title: string;
    desc: string;
    icon?: string;
    prefix?: string;
    iconColor?: string;
    position: 'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-right';
    size?: 'small' | 'medium' | 'large';
    features?: string[];
    delay?: number;
}

interface OnboardingSlide {
    title: string;
    cards: OnboardingCard[];
}

const props = withDefaults(
    defineProps<{
        show?: boolean;
        storageKey?: string;
        slides?: OnboardingSlide[];
        enableSwipe?: boolean;
    }>(),
    {
        show: undefined,
        storageKey: ONBOARDING_STORAGE_BASE_KEY,
        enableSwipe: true,
        slides: () => [
            {
                title: '组件体验升级',
                cards: [
                    {
                        title: '互动反馈',
                        desc: '通过点赞、收藏、评分等互动方式，深度体验每个组件的交互能力',
                        icon: 'hand-sparkles',
                        prefix: 'custom-icon',
                        iconColor: $u.color.primaryDark,
                        position: 'top-left',
                        size: 'large',
                        features: ['实时反馈', '体验记录', '进度追踪'],
                        delay: 0
                    },
                    {
                        title: '任务挑战',
                        desc: '完成组件任务，解锁更多功能，获得体验值奖励',
                        icon: 'target',
                        prefix: 'custom-icon',
                        iconColor: $u.color.successDark,
                        position: 'top-right',
                        size: 'medium',
                        features: ['任务引导', '成就系统'],
                        delay: 150
                    },
                    {
                        title: '体验地图',
                        desc: '查看你的成长轨迹，解锁更多体验节点，成为组件专家',
                        icon: 'map-circle',
                        prefix: 'custom-icon',
                        iconColor: $u.color.warningDark,
                        position: 'bottom-left',
                        size: 'medium',
                        delay: 300
                    },
                    {
                        title: '完整能力',
                        desc: '全面了解组件的所有功能和配置选项，掌握最佳实践',
                        icon: 'sparkles',
                        prefix: 'custom-icon',
                        iconColor: $u.color.errorDark,
                        position: 'bottom-right',
                        size: 'small',
                        delay: 450
                    }
                ]
            },
            {
                title: '任务式学习',
                cards: [
                    {
                        title: '可视化任务',
                        desc: '每个组件都提供清晰的任务指引，帮助你快速上手',
                        icon: 'eye',
                        prefix: 'custom-icon',
                        iconColor: $u.color.primaryDark,
                        position: 'top-left',
                        size: 'large',
                        features: ['任务列表', '进度显示', '完成奖励'],
                        delay: 0
                    },
                    {
                        title: '操作引导',
                        desc: '按照提示完成加载、配置、动效等操作，学习组件用法',
                        icon: 'guide',
                        prefix: 'custom-icon',
                        iconColor: $u.color.successDark,
                        position: 'center',
                        size: 'large',
                        features: ['步骤指引', '实时提示'],
                        delay: 200
                    },
                    {
                        title: '实践操作',
                        desc: '通过实际操作加深理解，掌握组件的各种配置和用法',
                        icon: 'tool',
                        prefix: 'custom-icon',
                        iconColor: $u.color.warningDark,
                        position: 'bottom-left',
                        size: 'medium',
                        delay: 400
                    },
                    {
                        title: '技能提升',
                        desc: '完成任务获得经验值，提升你的组件使用技能等级',
                        icon: 'levels',
                        prefix: 'custom-icon',
                        iconColor: $u.color.errorDark,
                        position: 'bottom-right',
                        size: 'small',
                        delay: 600
                    }
                ]
            },
            {
                title: '养成式成长',
                cards: [
                    {
                        title: '体验值系统',
                        desc: '每次交互都会增加体验值，记录你的学习成长轨迹',
                        icon: 'star',
                        prefix: 'custom-icon',
                        iconColor: $u.color.primaryDark,
                        position: 'top-left',
                        size: 'large',
                        features: ['XP 累积', '等级提升', '成就解锁'],
                        delay: 0
                    },
                    {
                        title: '节点解锁',
                        desc: '随着体验值增加，逐步解锁体验地图的更多节点',
                        icon: 'map-circle',
                        prefix: 'custom-icon',
                        iconColor: $u.color.successDark,
                        position: 'top-right',
                        size: 'medium',
                        delay: 200
                    },
                    {
                        title: '成长记录',
                        desc: '查看详细的体验记录，了解你的学习进度和成就',
                        icon: 'file-text',
                        prefix: 'custom-icon',
                        iconColor: $u.color.warningDark,
                        position: 'bottom-left',
                        size: 'medium',
                        delay: 400
                    },
                    {
                        title: '持续探索',
                        desc: '不断探索新组件，解锁更多功能，成为真正的组件专家',
                        icon: 'compass',
                        prefix: 'custom-icon',
                        iconColor: $u.color.errorDark,
                        position: 'bottom-right',
                        size: 'small',
                        delay: 600
                    }
                ]
            }
        ]
    }
);

const emit = defineEmits<{
    complete: [];
    skip: [];
    'update:show': [value: boolean];
}>();

const onboardingSlides = ref<OnboardingSlide[]>(props.slides);
const internalShow = ref(false);
const onboardingIndex = ref(0);
const slideKey = ref(0);
const activeCardId = ref<string | null>(null);
const isChanging = ref(false);

const enableSwipe = computed(() => props.enableSwipe);

const show = computed({
    get: () => (props.show !== undefined ? props.show : internalShow.value),
    set: (value: boolean) => {
        if (props.show === undefined) {
            internalShow.value = value;
        }
        emit('update:show', value);
    }
});
const getOnboardingStorageKey = () => {
    let version = '';
    try {
        // @ts-ignore 运行时全局配置，由 uni-app 注入
        const cfg = typeof __uniConfig !== 'undefined' ? __uniConfig : undefined;
        version = cfg?.versionName || cfg?.version || '';
    } catch (error) {
        console.warn('getOnboardingStorageKey error', error);
    }
    const baseKey = props.storageKey || ONBOARDING_STORAGE_BASE_KEY;
    return version ? `${baseKey}-${version}` : baseKey;
};

const checkOnboarding = () => {
    try {
        if (typeof uni === 'undefined') {
            if (props.show === undefined) {
                internalShow.value = false;
            }
            emit('update:show', false);
            return;
        }
        const key = getOnboardingStorageKey();
        const viewed = uni.getStorageSync(key);
        const shouldShow = !viewed;
        if (props.show === undefined) {
            internalShow.value = shouldShow;
        }
        emit('update:show', shouldShow);
    } catch (error) {
        console.warn('checkOnboarding error', error);
        if (props.show === undefined) {
            internalShow.value = true;
        }
        emit('update:show', true);
    }
};

let animationTimer: ReturnType<typeof setTimeout> | null = null;

const triggerAnimation = () => {
    if (isChanging.value) return;
    isChanging.value = true;
    activeCardId.value = null;

    // 清除之前的定时器
    if (animationTimer) {
        clearTimeout(animationTimer);
    }

    // 延迟更新slideKey，避免频繁更新
    animationTimer = setTimeout(() => {
        slideKey.value += 1;
        // 延迟重置，确保动画完成
        setTimeout(() => {
            isChanging.value = false;
        }, 600);
    }, 50);
};

const handleNext = () => {
    if (onboardingIndex.value < onboardingSlides.value.length - 1) {
        onboardingIndex.value += 1;
        triggerAnimation();
    } else {
        handleComplete();
    }
};

const handlePrev = () => {
    if (onboardingIndex.value > 0) {
        onboardingIndex.value -= 1;
        triggerAnimation();
    }
};

const handleSkip = () => {
    show.value = false;
    try {
        if (typeof uni !== 'undefined') {
            const key = getOnboardingStorageKey();
            uni.setStorageSync(key, true);
        }
    } catch (error) {
        console.warn('handleSkip error', error);
    }
    emit('skip');
};

const handleComplete = () => {
    show.value = false;
    try {
        if (typeof uni !== 'undefined') {
            const key = getOnboardingStorageKey();
            uni.setStorageSync(key, true);
        }
    } catch (error) {
        console.warn('handleComplete error', error);
    }
    emit('complete');
};

let changeTimer: ReturnType<typeof setTimeout> | null = null;

const handleOnboardingChange = (event: any) => {
    const newIndex = event.detail.current;
    if (newIndex !== onboardingIndex.value) {
        // 清除之前的定时器
        if (changeTimer) {
            clearTimeout(changeTimer);
        }

        onboardingIndex.value = newIndex;
        activeCardId.value = null;

        // 延迟触发动画，避免滑动过程中频繁更新
        changeTimer = setTimeout(() => {
            if (!isChanging.value) {
                triggerAnimation();
            }
        }, 100);
    }
};

const handleDotClick = (index: number) => {
    if (index !== onboardingIndex.value && !isChanging.value) {
        onboardingIndex.value = index;
        triggerAnimation();
    }
};

const handleCardClick = (slideIndex: number, cardIndex: number) => {
    // 只允许点击当前页面的卡片
    if (slideIndex !== onboardingIndex.value) return;

    const cardId = `${slideIndex}-${cardIndex}`;
    if (activeCardId.value === cardId) {
        // 如果已经选中，则取消选中
        activeCardId.value = null;
    } else {
        // 选中新卡片
        activeCardId.value = cardId;
    }
};

const getCardStyle = (card: OnboardingCard, cardIndex: number, slideIndex: number, cardIdx: number) => {
    const isActive = activeCardId.value === `${slideIndex}-${cardIdx}`;
    const baseStyle: Record<string, any> = {
        '--card-delay': `${card.delay || cardIndex * 100}ms`
    };

    // 选中时设置高 z-index，确保置顶
    if (isActive) {
        baseStyle['z-index'] = 999;
    }

    // 根据位置设置不同的初始位置（用于飞入动画）
    const positions: Record<string, { x: string; y: string }> = {
        'top-left': { x: '-120%', y: '-120%' },
        'top-right': { x: '120%', y: '-120%' },
        center: { x: '0', y: '-150%' },
        'bottom-left': { x: '-120%', y: '120%' },
        'bottom-right': { x: '120%', y: '120%' }
    };

    const pos = positions[card.position] || { x: '0', y: '0' };
    baseStyle['--card-start-x'] = pos.x;
    baseStyle['--card-start-y'] = pos.y;

    return baseStyle;
};

onMounted(() => {
    checkOnboarding();
});
</script>

<style lang="scss" scoped>
.demo-guide {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    display: flex;
    flex-direction: column;
    padding: 100rpx 30rpx 60rpx 30rpx;
    box-sizing: border-box;
    overflow: hidden;
}

@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.demo-guide__bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
}

.demo-guide__bg-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    animation: float 20s ease-in-out infinite;

    &--1 {
        width: 400rpx;
        height: 400rpx;
        top: -100rpx;
        left: -100rpx;
        animation-delay: 0s;
    }

    &--2 {
        width: 300rpx;
        height: 300rpx;
        bottom: -50rpx;
        right: -50rpx;
        animation-delay: 5s;
    }

    &--3 {
        width: 250rpx;
        height: 250rpx;
        top: 50%;
        right: -50rpx;
        animation-delay: 10s;
    }
}

@keyframes float {
    0%,
    100% {
        transform: translate(0, 0) scale(1);
        opacity: 0.3;
    }
    33% {
        transform: translate(50rpx, 50rpx) scale(1.1);
        opacity: 0.5;
    }
    66% {
        transform: translate(-50rpx, -50rpx) scale(0.9);
        opacity: 0.4;
    }
}

.onboarding-header {
    position: relative;
    z-index: 2;
    padding-bottom: 32rpx;
    text-align: center;
}

.onboarding-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8rpx;
    padding: 8rpx 24rpx;
    border-radius: 999rpx;
    border: 2rpx solid rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10rpx);
    font-size: 24rpx;
    font-weight: 700;
    color: #fff;
    margin-bottom: 16rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
    animation: badgePulse 2s ease-in-out infinite;
}

@keyframes badgePulse {
    0%,
    100% {
        transform: scale(1);
        box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 6rpx 24rpx rgba(255, 255, 255, 0.3);
    }
}

.onboarding-subtitle {
    font-size: 40rpx;
    font-weight: 800;
    color: #fff;
    text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
    margin-bottom: 8rpx;
    letter-spacing: 2rpx;
}

.onboarding-subdesc {
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.1);
}

.onboarding-swiper {
    flex: 1;
    position: relative;
    z-index: 2;

    &--disabled {
        touch-action: none;
        pointer-events: auto;

        :deep(.uni-swiper-wrapper) {
            touch-action: none;
        }
    }
}

.onboarding-slide {
    height: 100%;
    position: relative;
    padding: 20rpx;
    box-sizing: border-box;
    overflow: hidden;
}

.onboarding-card {
    position: absolute;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20rpx);
    border-radius: 24rpx;
    padding: 28rpx;
    box-shadow:
        0 12rpx 32rpx rgba(0, 0, 0, 0.15),
        0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    animation: cardFlyIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
    transform: translate(var(--card-start-x, 0), var(--card-start-y, 0)) scale(0.8);
    animation-delay: var(--card-delay, 0ms);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    border: 2rpx solid rgba(255, 255, 255, 0.5);
    cursor: pointer;
    user-select: none;

    &:active:not(.onboarding-card--active) {
        transform: translate(0, 0) scale(0.98);
    }

    &:hover:not(.onboarding-card--active) {
        transform: translate(0, 0) scale(1.02);
    }

    &--top-left {
        top: 10%;
        left: 4%;
        width: 48%;
    }

    &--top-right {
        top: 10%;
        right: 4%;
        width: 48%;
    }

    &--center {
        top: 50%;
        left: 50%;
        width: 70% !important;
        transform: translate(-50%, -50%) translate(var(--card-start-x, 0), var(--card-start-y, 0)) scale(0.8);
        animation-name: cardFlyInCenter;
        z-index: 10;

        &:active:not(.onboarding-card--active) {
            transform: translate(-50%, -50%) scale(0.98);
        }

        &:hover:not(.onboarding-card--active) {
            transform: translate(-50%, -50%) scale(1.02);
        }
    }

    &--bottom-left {
        bottom: 15%;
        left: 4%;
        width: 48%;
    }

    &--bottom-right {
        bottom: 15%;
        right: 4%;
        width: 48%;
    }

    &--active {
        opacity: 1 !important;
        transform: translate(0, 0) scale(1.05) !important;
        box-shadow:
            0 20rpx 48rpx rgba(41, 121, 255, 0.25),
            0 8rpx 24rpx rgba(25, 190, 107, 0.2),
            0 0 0 4rpx rgba(41, 121, 255, 0.2),
            inset 0 0 0 1rpx rgba(255, 255, 255, 0.5);
        border: 2rpx solid rgba(41, 121, 255, 0.4);
        background: rgba(255, 255, 255, 1) !important;
        animation: cardActiveGlow 3s ease-in-out infinite;
        visibility: visible !important;

        .onboarding-card__icon {
            background: linear-gradient(135deg, rgba(41, 121, 255, 0.15), rgba(25, 190, 107, 0.15));
            box-shadow: 0 4rpx 12rpx rgba(41, 121, 255, 0.2);
            transform: scale(1.05);
        }

        .onboarding-card__title {
            color: #303133 !important;
            font-weight: 700;
            text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.05);
        }

        .onboarding-card__desc {
            color: #606266 !important;
        }

        .onboarding-card__feature {
            color: #909399 !important;
        }

        &::before {
            content: '';
            position: absolute;
            top: -4rpx;
            left: -4rpx;
            right: -4rpx;
            bottom: -4rpx;
            border-radius: 26rpx;
            background: linear-gradient(
                135deg,
                rgba(41, 121, 255, 0.3),
                rgba(25, 190, 107, 0.3),
                rgba(41, 121, 255, 0.3)
            );
            z-index: -1;
            opacity: 0.4;
            animation: cardActiveGlowRing 3s ease-in-out infinite;
            filter: blur(12rpx);
        }

        &::after {
            content: '';
            position: absolute;
            top: -2rpx;
            left: -2rpx;
            right: -2rpx;
            bottom: -2rpx;
            border-radius: 24rpx;
            background: linear-gradient(135deg, rgba(41, 121, 255, 0.15), rgba(25, 190, 107, 0.15));
            z-index: -1;
            opacity: 0.6;
            animation: cardActiveGlowInner 3s ease-in-out infinite;
        }

        &:active {
            transform: translate(0, 0) scale(1.03) !important;
        }
    }

    &--center.onboarding-card--active {
        opacity: 1 !important;
        transform: translate(-50%, -50%) scale(1.05) !important;
        visibility: visible !important;

        .onboarding-card__title {
            color: #303133 !important;
            font-weight: 700;
            text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.05);
        }

        .onboarding-card__desc {
            color: #606266 !important;
        }

        .onboarding-card__feature {
            color: #909399 !important;
        }

        &:active {
            transform: translate(-50%, -50%) scale(1.03) !important;
        }
    }
}

@keyframes cardActiveGlow {
    0%,
    100% {
        box-shadow:
            0 20rpx 48rpx rgba(41, 121, 255, 0.25),
            0 8rpx 24rpx rgba(25, 190, 107, 0.2),
            0 0 0 4rpx rgba(41, 121, 255, 0.2),
            inset 0 0 0 1rpx rgba(255, 255, 255, 0.5);
    }
    50% {
        box-shadow:
            0 24rpx 56rpx rgba(41, 121, 255, 0.3),
            0 12rpx 32rpx rgba(25, 190, 107, 0.25),
            0 0 0 6rpx rgba(41, 121, 255, 0.25),
            inset 0 0 0 1rpx rgba(255, 255, 255, 0.6);
    }
}

@keyframes cardActiveGlowRing {
    0%,
    100% {
        opacity: 0.4;
        transform: scale(1);
        filter: blur(12rpx);
    }
    50% {
        opacity: 0.5;
        transform: scale(1.01);
        filter: blur(14rpx);
    }
}

@keyframes cardActiveGlowInner {
    0%,
    100% {
        opacity: 0.6;
    }
    50% {
        opacity: 0.7;
    }
}

// 根据size调整卡片大小
.onboarding-card--small {
    width: 42% !important;
    padding: 20rpx;

    .onboarding-card__icon {
        width: 60rpx;
        height: 60rpx;
    }

    .onboarding-card__title {
        font-size: 28rpx;
    }

    .onboarding-card__desc {
        font-size: 22rpx;
    }
}

.onboarding-card--large {
    width: 55% !important;
    padding: 32rpx;

    .onboarding-card__icon {
        width: 100rpx;
        height: 100rpx;
    }

    .onboarding-card__title {
        font-size: 36rpx;
    }

    .onboarding-card__desc {
        font-size: 26rpx;
    }
}

.onboarding-card--medium {
    width: 48%;
    padding: 28rpx;
}

@keyframes cardFlyIn {
    to {
        opacity: 1;
        transform: translate(0, 0) scale(1);
    }
}

@keyframes cardFlyInCenter {
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

.onboarding-card__icon {
    width: 80rpx;
    height: 80rpx;
    border-radius: 20rpx;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.onboarding-card__content {
    display: flex;
    flex-direction: column;
    gap: 12rpx;
}

.onboarding-card__title {
    font-size: 32rpx;
    font-weight: 700;
    color: #303133;
    line-height: 1.4;
}

.onboarding-card__desc {
    font-size: 24rpx;
    color: #606266;
    line-height: 1.6;
}

.onboarding-card__features {
    display: flex;
    flex-direction: column;
    gap: 8rpx;
    margin-top: 8rpx;
    padding-top: 16rpx;
    border-top: 1rpx solid rgba(0, 0, 0, 0.06);
}

.onboarding-card__feature {
    display: flex;
    align-items: center;
    gap: 12rpx;
    font-size: 22rpx;
    color: #909399;

    &-dot {
        width: 8rpx;
        height: 8rpx;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        flex-shrink: 0;
    }
}

.onboarding-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16rpx;
    margin: 24rpx 0;
    position: relative;
    z-index: 2;
}

.onboarding-dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
    }

    &--active {
        width: 40rpx;
        background: #fff;
        box-shadow: 0 4rpx 12rpx rgba(255, 255, 255, 0.5);

        &::before {
            width: 200%;
            height: 200%;
            background: rgba(255, 255, 255, 0.1);
        }
    }
}

.onboarding-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20rpx;
    position: relative;
    z-index: 2;
}

.action-btn {
    flex: 1;
    height: 88rpx;
    border-radius: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    font-size: 28rpx;
    font-weight: 600;
    color: #fff;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.5s ease;
    }

    &:active::before {
        left: 100%;
    }

    &--prev {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.15));
        backdrop-filter: blur(10rpx);
        border: 2rpx solid rgba(255, 255, 255, 0.4);
        box-shadow: 0 4rpx 12rpx rgba(255, 255, 255, 0.1);

        &:active {
            transform: scale(0.95);
            box-shadow: 0 2rpx 8rpx rgba(255, 255, 255, 0.2);
        }
    }

    &--next {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
        backdrop-filter: blur(10rpx);
        border: 2rpx solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 8rpx 24rpx rgba(255, 255, 255, 0.2);

        &:active {
            transform: scale(0.95);
            box-shadow: 0 4rpx 12rpx rgba(255, 255, 255, 0.3);
        }
    }

    &--complete {
        background: linear-gradient(135deg, #667eea, #764ba2);
        box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.4);
        animation: completePulse 2s ease-in-out infinite;

        &:active {
            transform: scale(0.95);
        }
    }
}

@keyframes completePulse {
    0%,
    100% {
        box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.4);
    }
    50% {
        box-shadow: 0 12rpx 32rpx rgba(102, 126, 234, 0.6);
    }
}
</style>
