import { sys } from '../function/sys';

type SystemTheme = 'light' | 'dark';

function getSystemTheme(): SystemTheme {
    // #ifdef MP-WEIXIN
    const { theme } = uni.getAppBaseInfo();
    return (theme || 'light') as SystemTheme;
    // #endif
    // #ifndef MP-WEIXIN
    const sysInfo = sys();
    return (sysInfo.osTheme || sysInfo.theme || 'light') as SystemTheme;
    // #endif
}

/**
 * 非 H5 平台获取当前系统主题
 */
export function getSystemDarkMode(): SystemTheme {
    try {
        const theme = getSystemTheme();
        if (theme === 'dark') {
            return 'dark';
        }
        if (theme === 'light') {
            return 'light';
        }
    } catch (e) {
        // 获取失败时默认返回亮色
        console.warn('[system-theme] getSystemDarkMode failed', e);
    }
    return 'light';
}
