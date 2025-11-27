declare const uni: any;

type SystemTheme = 'light' | 'dark';

/**
 * 非 H5 平台获取当前系统主题
 */
export function getSystemDarkMode(): SystemTheme {
    try {
        if (typeof uni !== 'undefined' && typeof uni.getSystemInfoSync === 'function') {
            const systemInfo = uni.getSystemInfoSync();
            const theme = systemInfo.osTheme || systemInfo.theme || 'light';
            if (theme === 'dark') {
                return 'dark';
            }
            if (theme === 'light') {
                return 'light';
            }
        }
    } catch (e) {
        // 获取失败时默认返回亮色
        console.warn('[system-theme] getSystemDarkMode failed', e);
    }
    return 'light';
}
