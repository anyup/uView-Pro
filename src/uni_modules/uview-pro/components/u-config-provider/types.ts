import type { ExtractPropTypes, PropType } from 'vue';
import { baseProps } from '../common/props';
import { configProvider } from '../../libs';
import type { Theme } from '../../types/global';

export const ConfigProviderProps = {
    ...baseProps,
    /**
     * 主题风格，设置为 dark 来开启深色模式，全局生效
     */
    themeMode: {
        type: String as PropType<'light' | 'dark'>,
        default: 'light'
    },
    /**
     * 当前主题名称（用于多主题切换）
     */
    currentTheme: {
        type: String,
        default: () => configProvider.getCurrentTheme()?.name ?? 'blue'
    },
    /**
     * 自定义主题列表
     */
    themes: {
        type: Array as PropType<Theme[]>,
        default: () => configProvider.getThemes()
    }
};

export type ConfigProviderProps = ExtractPropTypes<typeof ConfigProviderProps>;
