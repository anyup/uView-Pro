<template>
    <demo-page nav-title="设置" :nav-back="true" hide-tabs>
        <view class="settings-page">
            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="setting" size="40" color="var(--u-type-primary)"></u-icon>
                    <text class="section-card__title">主题设置</text>
                </view>
                <view class="section-card__body">
                    <view class="setting-item">
                        <view class="setting-item__label">深色模式</view>
                        <u-switch v-model="darkModeEnabled" @change="handleDarkModeChange"></u-switch>
                    </view>
                    <view class="setting-item">
                        <view class="setting-item__label">主题颜色</view>
                        <view class="setting-item__value" @click="showThemePicker = true">
                            {{ currentThemeValue.label || currentTheme }}
                            <u-icon name="arrow-right" color="#c0c4cc" size="28"></u-icon>
                        </view>
                    </view>
                    <view class="setting-item">
                        <view class="setting-item__label"> 多语言 </view>
                        <view class="setting-item__value" @click="showLocalePicker = true">
                            {{ currentLocale.label || currentLocale.name }}
                            <u-icon name="arrow-right" color="#c0c4cc" size="28" />
                        </view>
                    </view>
                </view>
            </view>

            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="info-circle" size="40" color="var(--u-type-success)"></u-icon>
                    <text class="section-card__title">应用设置</text>
                </view>
                <view class="section-card__body">
                    <view class="setting-item" @click="handleClearCache">
                        <view class="setting-item__label">清除缓存</view>
                        <u-icon name="arrow-right" color="#c0c4cc" size="32"></u-icon>
                    </view>
                    <view class="setting-item" @click="handleCheckUpdate">
                        <view class="setting-item__label">检查更新</view>
                        <view class="setting-item__value">
                            <text class="setting-item__version">当前版本: v{{ APP_INFO.version }}</text>
                            <u-icon name="arrow-right" color="#c0c4cc" size="32"></u-icon>
                        </view>
                    </view>
                </view>
            </view>

            <view class="section-card">
                <view class="section-card__header">
                    <u-icon name="more-circle" size="40" color="var(--u-type-warning)"></u-icon>
                    <text class="section-card__title">其他</text>
                </view>
                <view class="section-card__body">
                    <view class="setting-item" @click="navigateTo('/pages/other/theme/index')">
                        <view class="setting-item__label">主题管理</view>
                        <u-icon name="arrow-right" color="#c0c4cc" size="32"></u-icon>
                    </view>
                    <view class="setting-item" @click="navigateTo('/pages/example/about/faq')">
                        <view class="setting-item__label">常见问题</view>
                        <u-icon name="arrow-right" color="#c0c4cc" size="32"></u-icon>
                    </view>
                </view>
            </view>

            <!-- 主题选择器 -->
            <u-popup v-model="showThemePicker" mode="bottom" border-radius="20">
                <view class="theme-picker">
                    <view class="theme-picker__header">
                        <text class="theme-picker__title">选择主题</text>
                        <u-icon name="close" size="40" @click="showThemePicker = false"></u-icon>
                    </view>
                    <view class="theme-picker__body">
                        <view
                            v-for="theme in themes"
                            :key="theme.name"
                            class="theme-item"
                            :class="{ 'theme-item--active': currentTheme === theme.name }"
                            @click="selectTheme(theme.name)"
                        >
                            <view class="theme-item__color" :style="{ background: theme.color }"></view>
                            <view class="theme-item__name">{{ theme.label }}</view>
                            <u-icon
                                v-if="currentTheme === theme.name"
                                name="checkmark-circle"
                                size="32"
                                color="var(--u-type-primary)"
                            ></u-icon>
                        </view>
                    </view>
                </view>
            </u-popup>

            <!-- 多语言选择器 -->
            <u-popup v-model="showLocalePicker" mode="bottom" border-radius="20">
                <view class="theme-picker">
                    <view class="theme-picker__header">
                        <text class="theme-picker__title"> 选择多语言 </text>
                        <u-icon name="close" size="40" @click="showLocalePicker = false" />
                    </view>
                    <view class="theme-picker__body">
                        <view
                            v-for="locale in locales"
                            :key="locale.name"
                            class="theme-item"
                            :class="{ 'theme-item--active': currentLocale.name === locale.name }"
                            @click="selectLocale(locale)"
                        >
                            <view class="theme-item__name">
                                {{ locale.label }}
                            </view>
                            <u-icon
                                v-if="currentLocale.name === locale.name"
                                name="checkmark-circle"
                                size="32"
                                color="var(--u-type-primary)"
                            />
                        </view>
                    </view>
                </view>
            </u-popup>

            <u-toast ref="uToastRef" />
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLocale, useTheme } from 'uview-pro';
import { APP_INFO } from '@/common/constant';
import { useLang } from '@/common/useHooks';
const { getDarkMode, setDarkMode, currentTheme: currentThemeValue, setTheme, getAvailableThemes } = useTheme();
const uToastRef = ref();
const { currentLocale, locales: availableLocales } = useLocale();
const { switchLang } = useLang();

const showThemePicker = ref(false);
const showLocalePicker = ref(false);

// 深色模式状态
const darkModeEnabled = computed({
    get: () => getDarkMode() === 'dark',
    set: (value: boolean) => {
        setDarkMode(value ? 'dark' : 'light');
    }
});

// 主题列表
const themes = computed(() => {
    return getAvailableThemes().map(theme => ({
        name: theme.name,
        label: theme.label || theme.name,
        color: theme?.color?.primary || '#2979ff'
    }));
});

const locales = computed(() => {
    return availableLocales.value.map((locale: any) => ({
        name: locale.name,
        label: locale.label || locale.name,
        locale: locale.locale
    }));
});

function getLocaleLabel(localeName: string) {
    if (localeName === 'zh-CN') return '简体中文';
    if (localeName === 'en-US') return 'English';
    return localeName;
}

// 当前主题名称
const currentTheme = computed(() => {
    return currentThemeValue.value?.name || 'uviewpro';
});

// 处理深色模式切换
function handleDarkModeChange(value: boolean) {
    setDarkMode(value ? 'dark' : 'light');
    showToast(value ? '已开启深色模式' : '已关闭深色模式');
}

// 选择主题
function selectTheme(themeName: string) {
    setTheme(themeName);
    showThemePicker.value = false;
    showToast(`已切换到「${themes.value.find(t => t.name === themeName)?.label}」主题`);
}

function selectLocale(locale: any) {
    switchLang(locale);
    showLocalePicker.value = false;
    showToast(`已切换到语言「${locale.label}」`);
}

// 清除缓存
function handleClearCache() {
    uni.showModal({
        title: '提示',
        content: '确定要清除所有缓存数据吗？',
        success: res => {
            if (res.confirm) {
                try {
                    uni.clearStorageSync();
                    showToast('缓存已清除');
                } catch (e) {
                    showToast('清除缓存失败', 'error');
                }
            }
        }
    });
}

// 检查更新
function handleCheckUpdate() {
    showToast('当前已是最新版本');
}

// 导航
function navigateTo(path: string) {
    uni.navigateTo({
        url: path
    });
}

// 显示 Toast
function showToast(title: string, type: 'success' | 'error' = 'success') {
    uToastRef.value?.show({
        title: title,
        type: type
    });
}
</script>

<style lang="scss" scoped>
.settings-page {
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

.setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;

    &:last-child {
        border-bottom: none;
    }

    &:active {
        opacity: 0.7;
    }

    &__label {
        font-size: 28rpx;
        color: $u-main-color;
    }

    &__value {
        display: flex;
        align-items: center;
        gap: 12rpx;
        font-size: 26rpx;
        color: $u-content-color;
    }

    &__version {
        font-size: 24rpx;
        color: $u-tips-color;
    }
}

.theme-picker {
    padding: 40rpx 32rpx;
    background: $u-bg-gray-light;
    border-radius: 20rpx 20rpx 0 0;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32rpx;
    }

    &__title {
        font-size: 36rpx;
        font-weight: 700;
        color: $u-main-color;
    }

    &__body {
        display: flex;
        flex-direction: column;
        gap: 16rpx;
    }
}

.theme-item {
    display: flex;
    align-items: center;
    gap: 20rpx;
    padding: 24rpx;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 16rpx;
    border: 2rpx solid transparent;
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.98);
    }

    &--active {
        border-color: var(--u-type-primary);
        background: rgba(41, 121, 255, 0.08);
    }

    &__color {
        width: 48rpx;
        height: 48rpx;
        border-radius: 12rpx;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
    }

    &__name {
        flex: 1;
        font-size: 28rpx;
        color: $u-main-color;
        font-weight: 500;
    }
}
</style>
