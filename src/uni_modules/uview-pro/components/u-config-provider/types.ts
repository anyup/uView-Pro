import type { ExtractPropTypes, PropType } from 'vue';
import { baseProps } from '../common/props';
import { config, configProvider } from '../../libs';
import type { Theme } from '../../types/global';

export const ConfigProviderProps = {
    ...baseProps,
    /**
     * 主题风格，可选值：
     * - 'light': 强制亮色模式（默认）
     * - 'dark': 强制暗黑模式
     * - 'auto': 自动跟随系统设置
     */
    darkMode: {
        type: String as PropType<'light' | 'dark' | 'auto'>,
        default: () => config.defaultDarkMode
    },
    /**
     * 当前主题名称（用于多主题切换）
     */
    currentTheme: {
        type: String,
        default: () => configProvider.getCurrentTheme()?.name ?? config.defaultTheme
    },
    /**
     * 自定义主题列表
     */
    themes: {
        type: Array as PropType<Theme[]>,
        default: () => configProvider.getThemes()
    },
    /**
     * 国际化配置：传入 locale 列表（数组）并可指定默认语言 currentLocale
     */
    locales: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    currentLocale: {
        type: String,
        default: () => configProvider.getCurrentLocale()?.name ?? ''
    }
};

export type ConfigProviderProps = ExtractPropTypes<typeof ConfigProviderProps>;
