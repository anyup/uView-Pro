<template>
    <view class="nav-wrap">
        <view class="nav-title">
            <image class="logo" src="/static/logo.png" mode="widthFix"></image>
            <view class="nav-info">
                <view class="nav-title__text">
                    <text class="nav-info__title__text">uView Pro</text>
                </view>
                <view class="nav-slogan">
                    {{ t('common.intro') }}
                </view>
            </view>
        </view>
        <view class="nav-desc">
            {{ desc }}
        </view>
        <view class="lang">
            <u-icon
                custom-prefix="custom-icon"
                :name="darkModeIcon"
                size="42"
                :color="darkMode === 'dark' ? 'warning' : 'primary'"
                custom-style="margin-right:10rpx"
                @click="switchTheme"
            ></u-icon>
            <u-icon
                size="46"
                :color="darkMode === 'dark' ? 'warning' : 'primary'"
                :name="lang"
                @click="switchLang"
            ></u-icon>
        </view>
    </view>
</template>

<script setup lang="ts">
import { useTitle } from '@/common/util';
import { useTheme } from 'uview-pro';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { darkMode, getDarkMode, setDarkMode } = useTheme();

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

/**
 * 页面导航栏组件
 * @description 顶部logo、标题、描述、语言切换
 */

const props = defineProps<{
    desc?: string;
    title?: string;
    index: number;
}>();

// 国际化钩子
const { t, locale } = useI18n();
const { setTitle } = useTitle(props.index);

/**
 * 当前语言标识
 */
const lang = computed(() => {
    return locale.value === 'zh-Hans' ? 'zh' : 'en';
});

/**
 * 语言切换
 */
function switchLang() {
    const nextLocale = locale.value === 'zh-Hans' ? 'en' : 'zh-Hans';
    uni.setLocale(nextLocale);
    locale.value = nextLocale;
    // 设置标题
    setTitle();
}

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
</script>

<style lang="scss" scoped>
.nav-wrap {
    padding: 15px;
    position: relative;
}

.lang {
    position: absolute;
    top: 15px;
    right: 15px;
}

.nav-title {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    align-items: center;
}

.nav-info {
    margin-left: 15px;
}

.nav-title__text {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    color: $u-main-color;
    font-size: 25px;
    font-weight: bold;
}

.logo {
    width: 70px;
    /* #ifndef APP-NVUE */
    height: auto;
    /* #endif */
}

.nav-slogan {
    color: $u-tips-color;
    font-size: 14px;
}

.nav-desc {
    margin-top: 10px;
    font-size: 14px;
    color: $u-content-color;
}
</style>
