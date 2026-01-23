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
                size="50"
                :color="darkMode === 'dark' ? 'warning' : 'primary'"
                :name="lang"
                @click="switchLanguage"
            ></u-icon>
        </view>
    </view>
</template>

<script setup lang="ts">
import { useTheme } from 'uview-pro';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLang, useTitle } from '@/common/useHooks';

const { darkMode } = useTheme();

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
const { switchLang } = useLang();

/**
 * 当前语言标识
 */
const lang = computed(() => {
    return locale.value === 'zh-Hans' ? 'zh' : 'en';
});

/**
 * 语言切换
 */
function switchLanguage() {
    const nextLang = locale.value === 'zh-Hans' ? 'en' : 'zh-Hans';
    switchLang(nextLang);
    // 设置标题
    setTitle();
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
