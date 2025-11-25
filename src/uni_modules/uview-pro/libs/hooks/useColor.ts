/**
 * 响应式颜色管理 composable
 * 提供响应式的颜色访问，支持主题切换和暗黑模式
 *
 * 使用方式：
 * const { color, getColor } = useColor()
 * // color 是响应式的，可以直接在模板中使用
 * // getColor('primary') 返回响应式的颜色值
 */

import { computed, type ComputedRef } from 'vue';
import type { ColorType } from '../../types/global';
import configProvider from '../util/config-provider';

/**
 * 响应式颜色 composable
 * 返回响应式的颜色对象和获取颜色的方法
 */
export function useColor() {
    // 从 configProvider 获取当前主题的响应式引用
    const currentTheme = configProvider.currentThemeRef;
    const darkModeRef = configProvider.darkModeRef;

    /**
     * 获取当前激活模式下的颜色对象（响应式）
     */
    const color = computed(() => {
        const theme = currentTheme.value;
        if (!theme) return {} as Record<ColorType, string>;

        const isDark = configProvider.isInDarkMode();
        const palette =
            isDark && theme.darkColor && Object.keys(theme.darkColor).length ? theme.darkColor : theme.color || {};

        // 合并默认值，确保所有颜色都有值
        const defaultPalette = isDark
            ? (configProvider as any).baseDarkColorTokens || {}
            : (configProvider as any).baseColorTokens || {};

        return {
            ...defaultPalette,
            ...palette
        } as Record<ColorType, string>;
    });

    /**
     * 获取指定颜色（响应式）
     * @param name 颜色名称
     * @returns 颜色值
     */
    const getColor = (name: ColorType): ComputedRef<string> => {
        return computed(() => {
            return color.value[name] || '';
        });
    };

    return {
        color,
        getColor
    };
}
