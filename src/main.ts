import { createSSRApp } from "vue";
import App from "./App.vue";
import { createI18n } from 'vue-i18n'

import colorfulUniPlus from '@/uni_modules/colorful-uni-plus';


// 引入语言包，注意路径
import zhHans from '@/common/locales/zh.js';
import en from '@/common/locales/en.js';

const messages = {
	en,
	'zh-Hans': zhHans,
}

let i18nConfig = {
  locale: uni.getLocale(),// 获取已设置的语言
  messages
}

const i18n = createI18n(i18nConfig)

export function createApp() {
  const app = createSSRApp(App);
  app.use(i18n);
  app.use(colorfulUniPlus);
  return {
    app,
  };
}
