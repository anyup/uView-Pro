import { useLocale } from 'uview-pro';
import { useI18n } from 'vue-i18n';

export function useLang() {
    const { locale } = useI18n();
    const { setLocale } = useLocale();
    function switchLang(payload: any) {
        // 切换uniapp语言
        uni.setLocale(payload.locale);
        // 切换vue-i18n语言
        locale.value = payload.locale;
        // 切换uView Pro语言
        setLocale(payload.name);
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
        uni?.setNavigationBarTitle({
            title: t(titles[index])
        });
        titles.forEach((text, index) => {
            uni?.setTabBarItem({
                index,
                text: t(text)
            });
        });
    }

    return { getTitle, setTitle };
}
