import { versionName as appVersion } from '../manifest.json';
import { version as uViewProVersion, buildDate, releaseDate } from '../../package.json';

export const APP_INFO: {
    name: string;
    version: string;
    buildTime: string;
    platform: string;
} = {
    name: 'uViewPro(跨平台UI组件库)',
    version: appVersion,
    buildTime: buildDate,
    platform: getPlatform()
};

export const UVIEW_PRO_INFO = {
    name: 'uview-pro',
    version: uViewProVersion,
    buildTime: releaseDate
};

function getPlatform() {
    let platform = uni.getSystemInfoSync().platform;
    if (platform) {
        return platform;
    }
    // #ifdef H5
    platform = 'H5';
    // #endif
    // #ifdef MP-WEIXIN
    platform = '微信小程序';
    // #endif
    // #ifdef MP-ALIPAY
    platform = '支付宝小程序';
    // #endif
    // #ifdef APP-PLUS
    platform = 'App';
    // #endif
    // #ifdef APP-HARMONY
    platform = 'HarmonyOS';
    // #endif
    platform = '未知平台';
    return platform;
}

type PlatformType = 'H5' | 'weixin' | 'alipay' | 'toutiao' | 'App' | 'HarmonyOS';
export function isPlatform(value: PlatformType | PlatformType[]): boolean {
    let platform = '';
    // #ifdef H5
    platform = 'H5';
    // #endif
    // #ifdef MP-WEIXIN
    platform = 'weixin';
    // #endif
    // #ifdef MP-ALIPAY
    platform = 'alipay';
    // #endif
    // #ifdef MP-TOUTIAO
    platform = 'toutiao';
    // #endif
    // #ifdef APP-PLUS
    platform = 'App';
    // #endif
    // #ifdef APP-HARMONY
    platform = 'HarmonyOS';
    // #endif
    return Array.isArray(value)
        ? value.some(v => v.toLowerCase() === platform.toLowerCase())
        : platform.toLowerCase() === value.toLowerCase();
}

export const ONBOARDING_STORAGE_BASE_KEY = `guide-onboarded-${APP_INFO.version}`;

export const GUIDE_TABS_KEY = `guide-page-tabs-${APP_INFO.version}`;

export const GUIDE_FAB_KEY = `guide-page-fab-${APP_INFO.version}`;

export const GUIDE_TABBAR_KEY = `guide-page-tabbar-${APP_INFO.version}`;

export const GUIDE_THEME_SWITCHER_KEY = `guide-theme-switcher-${APP_INFO.version}`;

export const GUIDE_EXPERIENCE_KEY = `guide-experience-entry-${APP_INFO.version}`;
