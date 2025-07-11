import { createI18n } from 'vue-i18n';

import en from './langs/en.json'; // 英文
import zhHans from './langs/zh-Hans.json'; // 简体中文

const messages = {
    en,
    'zh-Hans': zhHans
};

export default createI18n({
    locale: uni.getLocale(),
    messages,
    allowComposition: true
});
