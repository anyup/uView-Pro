import { reactive } from 'vue';
import type { ColorType, ThemeColor } from '../../types/global';

// 默认颜色值（作为初始值）
const defaultColor: ThemeColor = {
    primary: '#2979ff',
    primaryDark: '#2b85e4',
    primaryDisabled: '#a0cfff',
    primaryLight: '#ecf5ff',
    bgColor: '#f3f4f6',
    bgPageColor: '#ffffff',
    bgSurfaceColor: '#ffffff',
    bgOverlayColor: 'rgba(0, 0, 0, 0.5)',
    info: '#909399',
    infoDark: '#82848a',
    infoDisabled: '#c8c9cc',
    infoLight: '#f4f4f5',
    warning: '#ff9900',
    warningDark: '#f29100',
    warningDisabled: '#fcbd71',
    warningLight: '#fdf6ec',
    error: '#fa3534',
    errorDark: '#dd6161',
    errorDisabled: '#fab6b6',
    errorLight: '#fef0f0',
    success: '#19be6b',
    successDark: '#18b566',
    successDisabled: '#71d5a1',
    successLight: '#dbf1e1',
    mainColor: '#303133',
    contentColor: '#606266',
    tipsColor: '#909399',
    lightColor: '#c0c4cc',
    borderColor: '#e4e7ed',
    formItemBorderColor: '#dcdfe6',
    whiteColor: '#ffffff',
    blackColor: '#000000',
    dividerColor: '#e4e7ed',
    maskColor: 'rgba(0, 0, 0, 0.4)',
    shadowColor: 'rgba(0, 0, 0, 0.1)'
};

// 使用 reactive 包装颜色对象，使其在运行时可被响应式读取与更新
// 这个对象会被 configProvider 在主题切换时更新
export const color = reactive<ThemeColor>({ ...defaultColor });

/**
 * 获取颜色值（响应式）
 * 优先从 configProvider 获取当前主题颜色，否则返回默认值
 * @param name 颜色名称
 * @returns 颜色值
 */
export function getColor(name: ColorType): string {
    // // 优先从 configProvider 获取当前主题颜色
    // const currentTheme = configProvider.getCurrentTheme();
    // if (currentTheme) {
    //     const isDark = configProvider.isInDarkMode();
    //     const palette =
    //         isDark && currentTheme.darkColor && Object.keys(currentTheme.darkColor).length
    //             ? currentTheme.darkColor
    //             : currentTheme.color || {};

    //     if (palette[name]) {
    //         return palette[name] as string;
    //     }
    // }

    // 从响应式 color 对象获取（会被 configProvider 更新）
    if (color[name]) {
        return color[name] as string;
    }

    // 兜底返回默认值
    return defaultColor[name] || '';
}

export default color;
