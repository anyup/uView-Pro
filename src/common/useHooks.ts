import { useLocale } from 'uview-pro';
import { useI18n } from 'vue-i18n';

export function useLang() {
    const { locale } = useI18n();
    const { setLocale } = useLocale();

    function getI18nLocale(value: string) {
        switch (value) {
            case 'zh-CN':
            case 'zh-Hans':
                return 'zh-Hans';
            case 'en-US':
            case 'en':
                return 'en';
            default:
                return 'zh-Hans';
        }
    }

    function getUProLocale(value: string) {
        switch (value) {
            case 'zh-Hans':
            case 'zh-CN':
                return 'zh-CN';
            case 'en':
            case 'en-US':
                return 'en-US';
            default:
                return 'zh-CN';
        }
    }

    function switchLang(lang: string) {
        // 切换uniapp语言
        uni.setLocale(getI18nLocale(lang));
        // 切换vue-i18n语言
        locale.value = getI18nLocale(lang);
        // 切换uView Pro语言
        setLocale(getUProLocale(lang));
    }

    return {
        switchLang
    };
}

/**
 * 获取标题（中英文）
 */
export function useTitle(index: number) {
    const { t, locale } = useI18n();
    const titles = ['nav.components', 'nav.js', 'nav.template', 'nav.about'];
    function getTitle(key: string, item: any = null) {
        if (!item) return key;
        return locale.value === 'zh-Hans' ? item[key] : item[`${key}_en`];
    }

    function setTitle() {
        uni.setNavigationBarTitle({
            title: t(titles[index])
        });
        titles.forEach((text, index) => {
            uni.setTabBarItem({
                index,
                text: t(text)
            });
        });
    }

    return { getTitle, setTitle };
}
