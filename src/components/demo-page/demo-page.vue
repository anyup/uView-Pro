<template>
    <view class="demo-page" :class="{ 'has-tabbar': tabbar }" :style="$u.toStyle(customStyle)">
        <!-- 引导页 -->
        <!-- #ifdef APP-HARMONY || APP-PLUS -->
        <demo-guide v-model:show="showOnboarding" @complete="handleOnboardingComplete" @skip="handleOnboardingSkip" />
        <!-- #endif -->
        <view v-if="!showOnboarding">
            <!-- 导航栏 -->
            <!-- #ifndef MP-ALIPAY -->
            <u-navbar
                v-if="!hideNav && !showOnboarding"
                :is-back="navBack"
                :title="navTitle || title"
                :background="background"
                :is-fixed="true"
                :immersive="false"
                back-icon-name="arrow-leftward"
                title-width="350"
                title-color="#ffffff"
                back-icon-color="#ffffff"
            >
                <template #left>
                    <view v-if="tabbar" class="u-m-l-30">
                        <!-- #ifdef MP -->
                        <u-icon
                            custom-prefix="custom-icon"
                            name="theme-fill"
                            size="46"
                            color="#ffffff"
                            custom-style="margin-right:16px"
                            @click="$u.route('/pages/other/theme/index')"
                        ></u-icon>
                        <!-- #endif -->
                        <u-icon
                            custom-prefix="custom-icon"
                            :name="darkModeIcon"
                            size="46"
                            color="#ffffff"
                            @click="switchTheme"
                        ></u-icon>
                    </view>
                    <view v-else>
                        <!-- #ifdef H5 -->
                        <u-icon
                            custom-prefix="custom-icon"
                            :name="darkModeIcon"
                            size="46"
                            color="#ffffff"
                            @click="switchTheme"
                        ></u-icon>
                        <!-- #endif -->
                        <!-- #ifdef MP -->
                        <u-icon
                            name="share1"
                            size="48"
                            color="#ffffff"
                            custom-style="margin-left:7px"
                            custom-prefix="custom-icon"
                            @click="sharePage"
                        ></u-icon>
                        <!-- #endif -->
                    </view>
                </template>
                <!-- #ifndef MP -->
                <template #right>
                    <view class="u-m-r-20">
                        <u-icon
                            v-if="tabbar"
                            custom-prefix="custom-icon"
                            name="theme-fill"
                            size="44"
                            color="#ffffff"
                            @click="$u.route('/pages/other/theme/index')"
                        ></u-icon>
                        <u-icon
                            name="share1"
                            size="46"
                            color="#ffffff"
                            custom-style="margin-left:10px"
                            custom-prefix="custom-icon"
                            @click="sharePage"
                        ></u-icon>
                    </view>
                </template>
                <!-- #endif -->
            </u-navbar>
            <!-- #endif -->
            <wx-tips v-if="showWxTips" />
            <!-- 标题 -->
            <view v-if="title || desc" class="demo-page_header">
                <view class="demo-page_title">{{ title }}</view>
                <view class="demo-page_desc" v-if="desc">{{ desc }}</view>
            </view>
            <!-- 标签栏 -->
            <demo-guide-use
                v-if="!tabbar && !hideTabs && tabList.length > 1"
                :immediate="guideImmediate[0]"
                :position="{ top: '500rpx', right: '200rpx' }"
                :storage-key="GUIDE_TABS_KEY"
                placement="bottom"
                text="左右切换体验：\n演示：初步了解组件的各项能力\n互动反馈：组件沉浸式体验评价\nAPI文档：探索组件更多详细用法"
                button-text="下一步"
                @close="guideImmediate[1] = true"
            >
                <view v-if="!tabbar && !hideTabs && tabList.length > 1" class="demo-page-tabs">
                    <view class="demo-page-tabs__container">
                        <view
                            v-for="(item, index) in tabList"
                            :key="index"
                            class="demo-page-tabs__item"
                            :class="{ 'demo-page-tabs__item--active': tabIndex === index }"
                            @click="change(index)"
                        >
                            <view class="demo-page-tabs__item-content">
                                <text class="demo-page-tabs__item-text">{{ item.name }}</text>
                                <view class="demo-page-tabs__item-indicator"></view>
                            </view>
                        </view>
                        <view class="demo-page-tabs__slider" :style="sliderStyle"></view>
                    </view>
                </view>
            </demo-guide-use>
            <!-- #ifdef MP-WEIXIN -->
            <ad-custom v-if="!hideAd && !tabbar" unit-id="adunit-f5898174f44ec220"></ad-custom>
            <!-- #endif -->
            <!-- 1.组件演示 -->
            <view class="demo-page-default" v-show="currentTabName === TAB_NAMES.base">
                <u-transition :show="transitionShow" :name="fabTransitionName" :duration="1300" :key="fabKey">
                    <slot />
                </u-transition>
            </view>
            <!-- 2.互动反馈 -->
            <view class="demo-page_scene" v-show="currentTabName === TAB_NAMES.interaction && enableExperience">
                <u-transition :show="transitionShow" :name="fabTransitionName" :duration="1300" :key="fabKey">
                    <view class="demo-page_toolbar">
                        <view class="toolbar-head">
                            <u-gap></u-gap>
                            <u-line-progress
                                :percent="experienceProgress"
                                height="12px"
                                :show-text="false"
                                active-color="var(--u-type-primary)"
                                inactive-color="rgba(0,0,0,0.08)"
                            />
                            <text class="toolbar-head__tip">{{ experienceHint }}</text>
                        </view>
                        <u-gap></u-gap>

                        <view class="toolbar-stats">
                            <view class="toolbar-stat-card">
                                <view class="stat-card__icon">
                                    <u-icon name="thumb-up-fill" size="40" color="#ff4757"></u-icon>
                                </view>
                                <view class="stat-card__content">
                                    <view class="stat-card__value">{{ toolbarState.liked ? '已点赞' : '未点赞' }}</view>
                                    <view class="stat-card__label">点赞状态</view>
                                </view>
                            </view>
                            <view class="toolbar-stat-card">
                                <view class="stat-card__icon">
                                    <u-icon name="star-fill" size="40" color="#ffa502"></u-icon>
                                </view>
                                <view class="stat-card__content">
                                    <view class="stat-card__value">
                                        {{ toolbarState.bookmarked ? '已收藏' : '未收藏' }}
                                    </view>
                                    <view class="stat-card__label">收藏状态</view>
                                </view>
                            </view>
                            <view class="toolbar-stat-card">
                                <view class="stat-card__icon">
                                    <u-icon
                                        custom-prefix="custom-icon"
                                        name="hand-sparkles"
                                        size="40"
                                        color="#5f27cd"
                                    ></u-icon>
                                </view>
                                <view class="stat-card__content">
                                    <view class="stat-card__value">{{ toolbarState.interactions }}</view>
                                    <view class="stat-card__label">互动次数</view>
                                </view>
                            </view>
                        </view>
                        <view class="toolbar-actions">
                            <u-button
                                shape="circle"
                                size="mini"
                                :type="toolbarState.liked ? 'error' : 'default'"
                                :plain="!toolbarState.liked"
                                @click="toggleLike"
                            >
                                <u-icon :name="toolbarState.liked ? 'thumb-up-fill' : 'thumb-up'" size="36"></u-icon>
                                <text class="toolbar-actions__text">{{ toolbarState.liked ? '已点赞' : '点赞' }}</text>
                            </u-button>
                            <u-button
                                shape="circle"
                                size="mini"
                                :type="toolbarState.bookmarked ? 'primary' : 'default'"
                                :plain="!toolbarState.bookmarked"
                                @click="toggleBookmark"
                            >
                                <u-icon :name="toolbarState.bookmarked ? 'star-fill' : 'star'" size="36"></u-icon>
                                <text class="toolbar-actions__text">{{
                                    toolbarState.bookmarked ? '已收藏' : '收藏'
                                }}</text>
                            </u-button>
                        </view>
                        <u-gap></u-gap>

                        <view class="toolbar-rate">
                            <view class="toolbar-rate__label">体验评分</view>
                            <u-rate
                                :count="5"
                                :model-value="toolbarState.rating"
                                allow-half
                                active-color="var(--u-type-warning)"
                                @change="handleRateChange"
                            />
                            <text class="toolbar-rate__desc">{{ rateText }}</text>
                        </view>
                        <u-gap></u-gap>

                        <view class="toolbar-section">
                            <view class="toolbar-section__title">
                                <u-icon
                                    custom-prefix="custom-icon"
                                    name="file-text"
                                    size="32"
                                    color="var(--u-type-primary)"
                                ></u-icon>
                                <text>体验记录</text>
                            </view>
                            <view class="toolbar-log" v-if="experienceLogs && experienceLogs.length">
                                <view v-for="(log, index) in experienceLogs" :key="index" class="toolbar-log__item">
                                    <view class="toolbar-log__time">{{ formatLogTime(index) }}</view>
                                    <view class="toolbar-log__content">{{ log }}</view>
                                </view>
                            </view>
                            <view v-else class="toolbar-empty">
                                <u-icon
                                    custom-prefix="custom-icon"
                                    name="file-text"
                                    size="48"
                                    color="var(--u-tips-color)"
                                ></u-icon>
                                <text>暂无体验记录，开始互动吧</text>
                            </view>
                        </view>
                    </view>
                </u-transition>
            </view>
            <!-- 3.API文档 -->
            <view class="demo-page_api" v-show="currentTabName === TAB_NAMES.api">
                <slot name="api">
                    <view v-if="apiContent">
                        <!-- #ifdef APP-HARMONY -->
                        <zero-markdown-view
                            :themeColor="$u.getColor('primary')"
                            :markdown="apiContent"
                        ></zero-markdown-view>
                        <!-- #endif -->
                    </view>
                    <view v-else>
                        <u-gap height="100"></u-gap>
                        <u-empty mode="data" text="暂无文档"></u-empty>
                    </view>
                </slot>
            </view>
            <!-- 互动反馈组件FAB -->
            <demo-guide-use
                v-if="!tabbar && showFab"
                :immediate="guideImmediate[1]"
                :position="{ bottom: '100rpx', right: '200rpx' }"
                :storage-key="GUIDE_FAB_KEY"
                placement="left"
                text="这里可以切换主题与预览炫酷动效"
                button-text="去试试"
                @close="guideImmediate[2] = true"
            >
                <view class="demo-page_feedback" v-show="!tabbar">
                    <u-fab
                        ref="uFabRef"
                        type="primary"
                        direction="top"
                        :draggable="true"
                        :autoStick="true"
                        :gap="{ right: 20, bottom: 130 }"
                    >
                        <u-button
                            shape="circle"
                            size="mini"
                            type="warning"
                            custom-class="demo-page-fabbtn"
                            @click="toggleTheme"
                        >
                            <u-icon custom-prefix="custom-icon" name="magic-sparkles" size="38"></u-icon>
                        </u-button>

                        <u-button
                            shape="circle"
                            size="mini"
                            type="success"
                            custom-class="demo-page-fabbtn"
                            @click="playFabAnimation"
                        >
                            <u-icon custom-prefix="custom-icon" name="hand-sparkles" size="38"></u-icon>
                        </u-button>
                    </u-fab>
                </view>
            </demo-guide-use>
            <!-- 底部标签栏 -->
            <demo-guide-use
                v-if="tabbar && !showOnboarding"
                ref="tabbarGuideRef"
                :position="{ bottom: '300rpx', left: '100rpx' }"
                :storage-key="GUIDE_TABBAR_KEY"
                placement="top"
                text="切换底部标签栏，探索更多精彩内容"
                button-text="我知道了"
            >
                <u-tabbar
                    v-if="tabbar && !showOnboarding"
                    v-model="current"
                    :mid-button="true"
                    :list="tabbarList"
                    :active-color="$u.color.primary"
                ></u-tabbar>
            </demo-guide-use>
            <!-- 体验提示 -->
            <u-transition name="fade" :show="Boolean(xpToast)">
                <view v-if="xpToast" class="experience-toast">
                    <view class="experience-toast__inner"> +{{ xpToast.amount }} XP · {{ xpToast.source }} </view>
                </view>
            </u-transition>
        </view>
        <u-action-sheet v-model="actionSheetShow" :safe-area-inset-bottom="true">
            <u-action-sheet-item padding="0">
                <u-text
                    text="分享给朋友"
                    size="32"
                    openType="share"
                    :block="true"
                    line-height="50px"
                    align="center"
                ></u-text>
            </u-action-sheet-item>
        </u-action-sheet>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-input',
    options: {
        addGlobalClass: true,
        // #ifndef MP-TOUTIAO
        virtualHost: true,
        // #endif
        styleIsolation: 'shared'
    }
};
</script>

<script setup lang="ts">
import { $u, useTheme, useToast } from 'uview-pro';
import { ref, computed, onMounted, onUnmounted, reactive, type PropType, watch } from 'vue';
import { getMarkdown } from '@/api';
import type { TabbarItem, TabsItem, ThemeType } from '@/uni_modules/uview-pro/types/global';
import { useI18n } from 'vue-i18n';
import { useExperience } from '@/common/useExperience';
import { useExperienceCenter } from '@/common/useExperienceCenter';
import DemoGuide from '@/components/demo-guide/demo-guide.vue';
import DemoGuideUse from '@/components/demo-guide-use/demo-guide-use.vue';
import { GUIDE_TABS_KEY, GUIDE_FAB_KEY, GUIDE_TABBAR_KEY, isPlatform } from '@/common/constant';

const { darkMode, getDarkMode, setDarkMode, setTheme, currentTheme, getAvailableThemes } = useTheme();

const props = defineProps({
    navTitle: {
        type: String,
        default: ''
    },
    navBack: {
        type: Boolean,
        default: true
    },
    hideNav: {
        type: Boolean,
        default: false
    },
    tabbar: {
        type: Boolean,
        default: false
    },
    hideTabs: {
        type: Boolean,
        default: false
    },
    hideAd: {
        type: Boolean,
        default: false
    },
    showWxTips: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    scenes: {
        type: Array as PropType<SceneItem[]>,
        default: () => []
    },
    apis: {
        type: String as PropType<string>,
        default: ''
    },
    faqs: {
        type: Array as PropType<FaqItem[]>,
        default: () => []
    },
    enableExperience: {
        type: Boolean,
        default: true
    },
    experienceKey: {
        type: String,
        default: ''
    },
    extras: {
        type: Array,
        default: () => []
    },
    customStyle: {
        type: [String, Object] as PropType<string | Record<string, any>>,
        default: ''
    }
});

interface SceneItem {
    title: string;
    desc: string;
    demo?: any;
}
interface FaqItem {
    q: string;
    a: string;
}

const background = reactive({
    backgroundColor: 'var(--u-type-primary)',
    // 渐变色
    backgroundImage: 'linear-gradient(90deg, var(--u-type-primary-dark), var(--u-type-primary-disabled))'
});

const { t } = useI18n();

const guideImmediate = ref([true, false]);
const tabbarGuideRef = ref();
const toast = useToast();
const actionSheetShow = ref(false);
function showTabbarGuide() {
    tabbarGuideRef.value.show();
}

function showToast(title: string, type: ThemeType = 'success') {
    toast.show({
        title,
        type,
        duration: 2000,
        icon: true,
        position: 'top'
    });
}

const darkModeIcon = computed(() => {
    switch (darkMode.value) {
        case 'light':
            return 'sun';
        case 'dark':
            return 'moon';
        case 'auto':
            return 'auto';
        default:
            return 'sun';
    }
});

// 定义响应式数据
const tabbarList = computed<TabbarItem[]>(() => {
    return [
        {
            text: t('nav.components'),
            iconPath: 'component',
            selectedIconPath: 'component-fill',
            pagePath: '/pages/example/components',
            customIcon: true
        },
        {
            text: t('nav.js'),
            iconPath: 'tool',
            selectedIconPath: 'tool-fill',
            pagePath: '/pages/example/js',
            customIcon: true
        },
        {
            iconPath: 'map-circle',
            selectedIconPath: 'map-circle-fill',
            text: t('nav.experience'),
            pagePath: '/pages/example/experienceMap',
            midButton: true,
            customIcon: true
        },
        {
            text: t('nav.template'),
            iconPath: 'template',
            selectedIconPath: 'template-fill',
            pagePath: '/pages/example/template',
            customIcon: true
        },
        {
            text: t('nav.about'),
            iconPath: 'about',
            selectedIconPath: 'about-fill',
            pagePath: '/pages/example/about',
            customIcon: true
        }
    ];
});

const current = ref<number>(0);

const slots = defineSlots();
const TAB_NAMES = {
    base: '组件演示',
    interaction: '互动反馈',
    api: 'API文档'
} as const;
const apiContent = ref<String>('');
const showOnboarding = ref(false);

const enableExperience = computed(() => props.enableExperience);
const tabList = computed(() => {
    const result: TabsItem[] = [{ name: TAB_NAMES.base, hidden: false }];
    if (enableExperience.value) {
        result.push({ name: TAB_NAMES.interaction, hidden: false });
    }
    result.push({ name: TAB_NAMES.api, hidden: props.apis && isPlatform('HarmonyOS') ? false : true });
    return result.filter(item => !item.hidden);
});
const tabIndex = ref(0);
const currentTabName = computed(() => tabList.value[tabIndex.value]?.name || TAB_NAMES.base);

const showFab = computed(() => {
    if (props.hideTabs) {
        return false;
    }
    if (currentTabName.value === TAB_NAMES.base || currentTabName.value === TAB_NAMES.interaction) {
        return true;
    }
    return false;
});
watch(
    tabList,
    list => {
        if (!list.length) {
            tabIndex.value = 0;
            return;
        }
        if (tabIndex.value >= list.length) {
            tabIndex.value = list.length - 1;
        }
    },
    { immediate: true }
);

const apis = computed<string>(() => props.apis ?? '');
const experienceKey = computed(() => props.experienceKey || props.title || 'default');
const { logs: experienceLogs, recordAction } = useExperience(experienceKey.value);
const { lastGain } = useExperienceCenter();
const storageKey = computed(() => {
    const base = props.experienceKey || props.title || 'default';
    return `uview-demo-experience-${base}`;
});
const toolbarState = ref({
    liked: false,
    bookmarked: false,
    rating: 0,
    interactions: 0
});
const xpToast = ref<{ amount: number; source: string } | null>(null);
let xpToastTimer: ReturnType<typeof setTimeout> | null = null;
const experienceProgress = computed(() => {
    const likeScore = toolbarState.value.liked ? 15 : 0;
    const bookmarkScore = toolbarState.value.bookmarked ? 20 : 0;
    const ratingScore = toolbarState.value.rating * 10;
    const interactionScore = Math.min(toolbarState.value.interactions * 8, 45);
    const total = likeScore + bookmarkScore + ratingScore + interactionScore;
    return Math.min(100, total);
});
const rateText = computed(() => {
    if (!toolbarState.value.rating) return '请为体验评分';
    if (toolbarState.value.rating >= 4.5) return '沉浸式体验';
    if (toolbarState.value.rating >= 3) return '不错，可以继续优化';
    return '欢迎继续提建议';
});
const experienceHint = computed(() => {
    if (experienceProgress.value >= 80) return '体验任务完成度很高，继续探索吧';
    if (experienceProgress.value >= 40) return '完成互动可解锁更多提示';
    return '点击上方按钮即可累积体验值';
});

const handleOnboardingComplete = () => {
    showOnboarding.value = false;
};

const handleOnboardingSkip = () => {
    showOnboarding.value = false;
};
watch(
    () => lastGain.value?.timestamp,
    () => {
        if (!lastGain.value) return;
        xpToast.value = {
            amount: lastGain.value.amount,
            source: lastGain.value.source
        };
        if (xpToastTimer) {
            clearTimeout(xpToastTimer);
        }
        xpToastTimer = setTimeout(() => {
            xpToast.value = null;
        }, 1800);
    }
);
onUnmounted(() => {
    if (xpToastTimer) {
        clearTimeout(xpToastTimer);
    }
});

const persistToolbarState = () => {
    try {
        if (typeof uni === 'undefined') return;
        const payload = {
            ...toolbarState.value
        };
        uni.setStorageSync(storageKey.value, payload);
    } catch (error) {
        console.warn('persistToolbarState error', error);
    }
};
const loadToolbarState = () => {
    try {
        if (typeof uni === 'undefined') return;
        const cache = uni.getStorageSync(storageKey.value) || {};
        if (Object.keys(cache).length) {
            toolbarState.value = Object.assign({}, toolbarState.value, cache);
        }
    } catch (error) {
        console.warn('loadToolbarState error', error);
    }
};
const trackInteraction = (message: string) => {
    toolbarState.value.interactions += 1;
    recordAction(message);
    persistToolbarState();
};
const toggleLike = () => {
    toolbarState.value.liked = !toolbarState.value.liked;
    trackInteraction(toolbarState.value.liked ? '已点赞当前组件' : '取消点赞');
};
const toggleBookmark = () => {
    toolbarState.value.bookmarked = !toolbarState.value.bookmarked;
    trackInteraction(toolbarState.value.bookmarked ? '收藏到本地体验集' : '取消收藏');

    // 同步保存到收藏列表
    if (toolbarState.value.bookmarked) {
        addToFavorites();
    } else {
        removeFromFavorites();
    }
};

// 添加到收藏列表
const addToFavorites = () => {
    try {
        if (typeof uni === 'undefined' || typeof getCurrentPages === 'undefined') return;
        const STORAGE_KEY = 'uview-favorites';
        const favorites = uni.getStorageSync(STORAGE_KEY) || [];
        const pages = getCurrentPages();
        if (!pages || pages.length === 0) return;
        const currentPage = pages[pages.length - 1];
        const currentPath = currentPage?.route || '';
        const fullPath = '/' + currentPath;

        // 检查是否已收藏
        const exists = favorites.some((item: any) => item.path === fullPath);
        if (exists) return;

        // 获取组件信息
        const componentTitle = props.title || '未命名组件';
        const componentDesc = props.desc || '';

        const favoriteItem = {
            path: fullPath,
            title: componentTitle,
            desc: componentDesc,
            icon: props.experienceKey || currentPath.split('/').pop() || '',
            collectedAt: Date.now()
        };

        favorites.unshift(favoriteItem);
        uni.setStorageSync(STORAGE_KEY, favorites);
    } catch (error) {
        console.warn('addToFavorites error', error);
    }
};

// 从收藏列表移除
const removeFromFavorites = () => {
    try {
        if (typeof uni === 'undefined' || typeof getCurrentPages === 'undefined') return;
        const STORAGE_KEY = 'uview-favorites';
        const favorites = uni.getStorageSync(STORAGE_KEY) || [];
        const pages = getCurrentPages();
        if (!pages || pages.length === 0) return;
        const currentPage = pages[pages.length - 1];
        const currentPath = currentPage?.route || '';
        const fullPath = '/' + currentPath;

        const filtered = favorites.filter((item: any) => item.path !== fullPath);
        uni.setStorageSync(STORAGE_KEY, filtered);
    } catch (error) {
        console.warn('removeFromFavorites error', error);
    }
};
const handleRateChange = (value: number) => {
    toolbarState.value.rating = value;
    trackInteraction(`评分 ${value} 分`);
};

// FAB 动效预览相关
const transitionNames = ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'zoom-in', 'zoom-out'] as const;
const fabTransitionName = ref<(typeof transitionNames)[number]>('fade');
const transitionTexts = {
    fade: 'fade 淡入淡出',
    'slide-up': 'slide-up 上滑',
    'slide-down': 'slide-down 下滑',
    'slide-left': 'slide-left 左滑',
    'slide-right': 'slide-right 右滑',
    'zoom-in': '`zoom-in 放大',
    'zoom-out': 'zoom-out 缩小'
};
const fabColor = ref('#2979ff');
const transitionShow = ref(true);
const fabKey = ref(0);
const fabColors = [
    '#2979ff', // primary
    '#19be6b', // success
    '#ff9900', // warning
    '#ff4757', // error
    '#5f27cd', // purple
    '#00d2d3', // cyan
    '#ff6348' // coral
];

const themeNames = getAvailableThemes().map(theme => theme.name);
const toggleTheme = () => {
    const currentIndex = themeNames.indexOf(currentTheme.value?.name || 'uviewpro');
    const nextIndex = (currentIndex + 1) % themeNames.length;
    const nextTheme = themeNames[nextIndex];
    setTheme(nextTheme);
    trackInteraction('触发主题预览');
    $u.debounce(() => {
        showToast(`已切换到「${nextTheme}」主题`, 'success');
    }, 600);
};

const playFabAnimation = () => {
    // 随机选择transition效果
    const randomIndex = Math.floor(Math.random() * transitionNames.length);
    fabTransitionName.value = transitionNames[randomIndex];

    // 随机选择颜色
    const colorIndex = Math.floor(Math.random() * fabColors.length);
    fabColor.value = fabColors[colorIndex];

    // 触发动画：先隐藏再显示
    transitionShow.value = false;
    fabKey.value += 1;
    setTimeout(() => {
        transitionShow.value = true;
    }, 50);

    trackInteraction('触发随机动效预览');
    if (typeof uni !== 'undefined' && typeof uni.vibrateShort === 'function') {
        uni.vibrateShort();
    }
    $u.debounce(() => {
        showToast(`随机动效预览「${transitionTexts?.[fabTransitionName.value] ?? '动画'}」已渲染`, 'success');
    }, 1300);
};

const formatLogTime = (index: number) => {
    // 简单的相对时间显示
    const total = experienceLogs.value?.length || 0;
    const reverseIndex = total - index - 1;
    if (reverseIndex === 0) return '刚刚';
    if (reverseIndex === 1) return '1次前';
    return `${reverseIndex}次前`;
};

function switchTheme() {
    switch (getDarkMode()) {
        case 'light':
            setDarkMode('dark');
            break;
        case 'dark':
            setDarkMode('auto');
            break;
        case 'auto':
            setDarkMode('light');
            break;
        default:
            setDarkMode('dark');
            break;
    }
}
// 定义change事件回调函数
const change = (index: number) => {
    tabIndex.value = index;
};

// 计算滑动指示器的样式
const sliderStyle = computed(() => {
    if (tabList.value.length === 0) return {};

    const itemWidth = 100 / tabList.value.length;
    const left = tabIndex.value * itemWidth;

    return {
        width: `${itemWidth}%`,
        left: `${left}%`,
        '--primary-color': $u.color.primary
    };
});

function sharePage() {
    const pages = getCurrentPages();
    // 页面栈中的最后一个即为项为当前页面，route属性为页面路径
    const pageUrl = pages[pages.length - 1].route as string;
    const fullPath = 'https://h5.uviewpro.cn/#/' + pageUrl;
    // #ifdef H5
    window.open(fullPath);
    // #endif
    // #ifdef APP
    plus.runtime.openURL(fullPath);
    // #endif
    // #ifdef MP
    actionSheetShow.value = true;
    // #endif
}

onMounted(() => {
    // #ifndef MP
    if (apis.value) {
        getMarkdown(apis.value).then((res: any) => {
            apiContent.value = res;
        });
    }
    // #endif
});
watch(
    () => storageKey.value,
    () => {
        loadToolbarState();
    },
    { immediate: true }
);

defineExpose({
    showTabbarGuide,
    changeTab: change
});
</script>

<style lang="scss" scoped>
.demo-page {
    width: 100%;
    min-height: 100vh;
    // padding-bottom: 30rpx;
    overflow-y: auto;
    background-color: $u-bg-white;
    -webkit-font-smoothing: antialiased;
    color: $u-main-color;
    transition: background 0.3s ease;

    &.has-tabbar {
        background-image: linear-gradient(
            135deg,
            rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.04) 0%,
            rgba(var(--u-type-success-rgb, 25, 190, 107), 0.04) 40%,
            rgba(var(--u-type-warning-rgb, 255, 153, 0), 0.04) 100%
        );
    }

    &_api,
    &_scene,
    &_fap {
        padding: 24rpx;
    }
    &_header {
        padding: 24rpx;

        margin-bottom: 24rpx;
    }
    &_title {
        font-size: 36rpx;
        font-weight: bold;
        color: $u-type-primary;
    }
    &_desc {
        color: $u-tips-color;
        font-size: 26rpx;
        margin-top: 8rpx;
    }
    &_feedback {
        text-align: center;
        :deep(.demo-page-fabbtn) {
            min-width: auto !important;
            box-sizing: border-box;
            width: 55px !important;
            height: 55px !important;
            border-radius: 50px !important;
            margin: 0 8rpx 30rpx 8rpx;
            box-shadow: 0 10rpx 26rpx $u-shadow-color;
        }
    }
    &_toolbar {
        margin: 0 24rpx 20rpx;
        padding: 24rpx;
        border-radius: 18rpx;
        background: $u-bg-white;
        border: 1px solid $u-border-color;
        box-shadow: 0 10rpx 26rpx $u-shadow-color;
        display: flex;
        flex-direction: column;
        gap: 20rpx;
    }
}

// 自定义 Tabs 样式
.demo-page-tabs {
    background-color: $u-bg-white;
    backdrop-filter: blur(20rpx);
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.06);
    box-shadow:
        0 2rpx 12rpx rgba(0, 0, 0, 0.04),
        inset 0 -1rpx 0 rgba(0, 0, 0, 0.02);
    position: relative;
    z-index: 10;

    &__container {
        position: relative;
        display: flex;
        align-items: center;
        height: 88rpx;
        padding: 0 24rpx;
    }

    &__item {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 2;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.1), transparent);
            transform: translate(-50%, -50%);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        &--active {
            .demo-page-tabs__item-text {
                color: var(--primary-color, var(--u-type-primary));
                font-weight: 700;
                transform: scale(1.05);
                text-shadow: 0 2rpx 8rpx rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.2);
            }

            .demo-page-tabs__item-indicator {
                opacity: 1;
                transform: scaleX(1);
            }

            &::before {
                width: 200rpx;
                height: 200rpx;
            }
        }

        &:active {
            transform: scale(0.98);
        }

        &:hover:not(&--active) {
            .demo-page-tabs__item-text {
                color: $u-tips-color;
            }
        }
    }

    &__item-content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8rpx;
    }

    &__item-text {
        font-size: 28rpx;
        color: $u-content-color;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        z-index: 2;
    }

    &__item-indicator {
        width: 48rpx;
        height: 6rpx;
        border-radius: 3rpx;
        background: linear-gradient(
            90deg,
            var(--primary-color, var(--u-type-primary)),
            rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.6)
        );
        opacity: 0;
        transform: scaleX(0);
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 2rpx 12rpx rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.4);
        position: relative;

        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            background: radial-gradient(ellipse, rgba(255, 255, 255, 0.5), transparent);
            border-radius: 3rpx;
        }
    }

    &__slider {
        position: absolute;
        bottom: 0;
        height: 6rpx;
        background: linear-gradient(
            90deg,
            rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.3),
            var(--primary-color, var(--u-type-primary)),
            rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.8),
            var(--primary-color, var(--u-type-primary)),
            rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.3)
        );
        background-size: 200% 100%;
        border-radius: 3rpx 3rpx 0 0;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        z-index: 1;
        box-shadow:
            0 -4rpx 12rpx rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.3),
            0 0 24rpx rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.2);
        animation: sliderGradient 3s ease infinite;

        &::before {
            content: '';
            position: absolute;
            top: -4rpx;
            left: 50%;
            transform: translateX(-50%);
            width: 80rpx;
            height: 12rpx;
            background: radial-gradient(ellipse, rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.5), transparent);
            border-radius: 50%;
            animation: sliderGlow 2s ease-in-out infinite;
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: sliderShine 2.5s ease-in-out infinite;
            border-radius: 3rpx 3rpx 0 0;
        }
    }
}

@keyframes sliderGradient {
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

@keyframes sliderGlow {
    0%,
    100% {
        opacity: 0.5;
        transform: translateX(-50%) scale(1);
    }
    50% {
        opacity: 0.8;
        transform: translateX(-50%) scale(1.3);
    }
}

@keyframes sliderShine {
    0% {
        transform: translateX(-100%) skewX(-20deg);
    }
    100% {
        transform: translateX(200%) skewX(-20deg);
    }
}

.scene-item,
.faq-item {
    margin-bottom: 24rpx;
}
.scene-title {
    font-weight: bold;
}
.scene-desc,
.faq-q {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    font-weight: 500;
    color: $u-type-error;
    margin-top: 8rpx;
    margin-bottom: 2rpx;
}
.faq-q-label {
    font-weight: bold;
    margin-right: 4rpx;
}
.faq-q-text {
    color: $u-main-color;
    font-weight: normal;
}
.faq-a {
    display: flex;
    align-items: flex-start;
    font-size: 28rpx;
    color: $u-type-success;
    margin-top: 2rpx;
    margin-bottom: 12rpx;
}
.faq-a-label {
    font-weight: bold;
    margin-right: 4rpx;
}
.faq-a-text {
    color: $u-main-color;
    font-weight: normal;
}
.toolbar-head {
    display: flex;
    flex-direction: column;
    gap: 8rpx;
    &__tip {
        font-size: 24rpx;
        color: $u-content-color;
    }
}
.toolbar-actions {
    display: flex;
    justify-content: space-between;
    gap: 16rpx;
    &__text {
        margin-left: 6rpx;
        font-size: 24rpx;
    }
}
.toolbar-stats {
    display: flex;
    gap: 16rpx;
    margin: 8rpx 0;
}

.toolbar-stat-card {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12rpx;
    padding: 16rpx 10rpx;
    border-radius: 12rpx;
    background: linear-gradient(
        135deg,
        rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.08),
        rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.04)
    );
    border: 1px solid rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.1);
}

.stat-card__icon {
    width: 64rpx;
    height: 64rpx;
    border-radius: 12rpx;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
}

.stat-card__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4rpx;
}

.stat-card__value {
    font-size: 26rpx;
    font-weight: 600;
    color: $u-main-color;
}

.stat-card__label {
    font-size: 22rpx;
    color: $u-tips-color;
}

.toolbar-rate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16rpx;
    &__label {
        font-size: 26rpx;
        font-weight: 500;
        color: $u-main-color;
    }
    &__desc {
        font-size: 24rpx;
        color: $u-tips-color;
    }
}

.toolbar-section {
    margin-top: 8rpx;
    &__title {
        display: flex;
        align-items: center;
        gap: 8rpx;
        font-size: 28rpx;
        font-weight: 600;
        color: $u-main-color;
        margin-bottom: 12rpx;
    }
}

.toolbar-log {
    background: rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.04);
    border-radius: 12rpx;
    padding: 16rpx;
    font-size: 22rpx;
    color: $u-content-color;
    max-height: 400rpx;
    overflow-y: auto;
    &__item {
        display: flex;
        align-items: flex-start;
        gap: 12rpx;
        padding: 12rpx 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        &:last-child {
            border-bottom: none;
        }
    }
    &__time {
        flex-shrink: 0;
        font-size: 20rpx;
        color: $u-tips-color;
        min-width: 80rpx;
    }
    &__content {
        flex: 1;
        color: $u-content-color;
        line-height: 1.5;
    }
}

.toolbar-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60rpx 20rpx;
    gap: 16rpx;
    color: $u-tips-color;
    font-size: 24rpx;
}

.fab-trigger-wrapper {
    width: 112rpx;
    height: 112rpx;
    border-radius: 112rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
    transition: background-color 0.3s ease;
    cursor: pointer;
}
.map-level {
    display: flex;
    flex-direction: column;
    gap: 12rpx;
    &__value {
        font-size: 40rpx;
        font-weight: 700;
        color: $u-type-warning;
    }
    &__hint {
        font-size: 24rpx;
        color: $u-tips-color;
    }
}
.map-stats {
    display: flex;
    justify-content: space-between;
    margin-top: 24rpx;
    gap: 16rpx;
}
.map-stat {
    flex: 1;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 16rpx;
    padding: 16rpx;
    text-align: center;
    &__value {
        font-size: 32rpx;
        font-weight: 600;
        color: $u-main-color;
    }
    &__label {
        font-size: 22rpx;
        color: $u-tips-color;
    }
}
.map-steps {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}
.map-step {
    padding: 20rpx;
    border-radius: 18rpx;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.04);
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12rpx;
    }
    &__title {
        font-size: 28rpx;
        font-weight: 600;
    }
    &__tip {
        margin-top: 12rpx;
        font-size: 24rpx;
        color: $u-content-color;
    }
}
.experience-toast {
    position: fixed;
    bottom: 160rpx;
    right: 30rpx;
    z-index: 19990;
    &__inner {
        background: rgba(0, 0, 0, 0.78);
        color: #fff;
        padding: 18rpx 28rpx;
        border-radius: 30rpx;
        font-size: 24rpx;
        box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.2);
    }
}
</style>
