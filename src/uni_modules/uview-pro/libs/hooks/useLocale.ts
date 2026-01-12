import configProvider from '../util/config-provider';

/**
 * 国际化 composable
 * 提供：
 * - currentLocale / locales 响应式引用
 * - t(key, replacements) 翻译方法
 * - setLocale(name) 切换语言
 * - initLocales(locales?, defaultName?) 初始化语言包
 */
export function useLocale() {
    return {
        // 响应式引用
        currentLocale: configProvider.currentLocaleRef,
        locales: configProvider.localesRef,

        // 方法
        t: (key: string, replacements?: any, localeName?: string) => configProvider.t(key, replacements, localeName),
        setLocale: (name: string) => configProvider.setLocale(name),
        getLocales: () => configProvider.getLocales(),
        getCurrentLocale: () => configProvider.getCurrentLocale(),
        initLocales: (locales?: any[], defaultLocaleName?: string) =>
            configProvider.initLocales(locales, defaultLocaleName)
    };
}
