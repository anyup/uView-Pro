<template>
    <view class="nav-wrap">
        <view class="nav-title">
            <image class="logo" src="https://ik.imagekit.io/anyup/uview-pro/common/logo.png" mode="widthFix"></image>
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
        <!-- #ifndef APP-PLUS -->
        <view class="lang" @tap="switchLang">
            <u-icon size="46" color="warning" :name="lang"></u-icon>
        </view>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import i18n from '@/locales';

/**
 * 页面导航栏组件
 * @description 顶部logo、标题、描述、语言切换
 */

defineProps<{
    desc?: string;
    title?: string;
}>();

// 国际化钩子
const { t } = useI18n();

// 版本号（如需展示可用）
// const version = uni.$u.config.v;

/**
 * 当前语言标识
 */
const lang = computed(() => {
    return i18n.global.locale == 'zh-Hans' ? 'zh' : 'en';
});

/**
 * 语言切换
 */
function switchLang() {
    const locale = i18n.global.locale == 'zh-Hans' ? 'en' : 'zh-Hans';
    uni.setLocale(locale);
    i18n.global.locale = locale;
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
