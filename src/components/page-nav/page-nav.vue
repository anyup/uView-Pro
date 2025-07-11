<template>
    <view class="nav-wrap">
        <view class="nav-title">
            <image class="logo" src="https://cdn.uviewui.com/uview/common/logo.png" mode="widthFix"></image>
            <view class="nav-info">
                <view class="nav-title__text">
                    <text class="nav-info__title__text">uView {{ version }}</text>
                </view>
                <view class="nav-slogan">
                    {{ $t('common.intro') }}
                </view>
            </view>
        </view>
        <view class="nav-desc">
            {{ desc }}
        </view>
        <view class="lang" @tap="switchLang">
            <u-icon size="46" color="warning" :name="lang"></u-icon>
        </view>
    </view>
</template>

<script>
import { version } from 'vue';
import i18n from '@/locales';

export default {
    props: {
        desc: String,
        title: String
    },
    computed: {
        lang() {
            return i18n.global.locale == 'zh' ? 'en' : 'zh';
        }
    },
    data() {
        return {
            version: uni.$u.config.v
        };
    },
    methods: {
        switchLang() {
            uni.setLocale(i18n.global.locale);
            i18n.global.locale = i18n.global.locale == 'zh-Hans' ? 'en' : 'zh-Hans';
        }
    }
};
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
