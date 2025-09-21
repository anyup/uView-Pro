import { createI18n } from 'vue-i18n';

import en from './langs/en.json'; // 英文
import zhHans from './langs/zh-Hans.json'; // 简体中文

const messages = {
    en,
    'zh-Hans': zhHans
};

// 安全获取locale，避免在SSR环境下出现问题
const getSafeLocale = () => {
    try {
        return uni.getLocale() || 'zh-Hans';
    } catch (e) {
        return 'zh-Hans';
    }
};

const i18n = createI18n({
    locale: getSafeLocale(),
    fallbackLocale: 'zh-Hans',
    messages,
    allowComposition: true,
    legacy: false,
    globalInjection: true
});

export default i18n;
