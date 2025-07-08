import { createSSRApp } from "vue";
import App from "./App.vue";
import { createI18n } from 'vue-i18n'

import colorfulUniPlus from '@/uni_modules/colorful-uni-plus';


// 引入语言包，注意路径
import zhCN from '@/common/locales/zh.js';
import enUS from '@/common/locales/en.js';

const messages = {
	'zh-CN': {
    ...zhCN
  },
  'en-US': {
    ...enUS
  }
}

let i18nConfig = {
  locale: uni.getStorageSync('currentLang') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages,
  legacy: false
}

const i18n = createI18n(i18nConfig)

export function createApp() {
  const app = createSSRApp(App);
  app.use(i18n);
  app.use(colorfulUniPlus);
  app.config.globalProperties.$t = i18n.global.t
  return {
    app,
  };
}
