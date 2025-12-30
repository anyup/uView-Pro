import type { ColorType, ThemeColor } from '../../types/global';
import { color } from '../config/color';
import { lightPalette } from '../config/theme-tokens';
import configProvider from '../util/config-provider';

/**
 * 获取颜色值（响应式）
 * 优先从 configProvider 获取当前主题颜色，否则返回默认值
 * @param name 颜色名称
 * @returns 颜色值
 */
export function getColor(name: ColorType): string {
    // 从响应式 color 对象获取（会被 configProvider 更新）
    if (color[name]) {
        return color[name] as string;
    }

    // 兜底返回默认值
    return lightPalette[name] || '';
}

export function setColor(theme: Partial<ThemeColor> | undefined) {
    configProvider.setThemeColor(theme);
}

export default color;
