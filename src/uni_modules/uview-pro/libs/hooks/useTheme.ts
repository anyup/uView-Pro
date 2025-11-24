/**
 * 主题管理 composable
 * 提供主题切换、持久化、CSS 变量注入等功能
 */

import type { Theme } from '../../types/global';
import configProvider from '../util/config-provider';

const THEME_STORAGE_KEY = 'uview-pro-theme';
const themesRef = configProvider.themesRef;
const currentTheme = configProvider.currentThemeRef;

/**
 * 将十六进制颜色转换为 RGB 字符串 (不带#)
 * 如: #2979ff -> 41, 121, 255
 */
function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '0, 0, 0';
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

/**
 * 更新全局 theme 对象（用于代码中 getColor('primary') 等）
 */
function updateGlobalTheme(theme: Theme) {
    try {
        // 委托给 configProvider
        if (theme && configProvider) {
            configProvider.setTheme(theme.name);
        }
    } catch (e) {
        console.warn('Failed to update global theme:', e);
    }
}

/**
 * 保存主题到 Storage
 */
function saveThemeToStorage(themeName: string) {
    try {
        uni.setStorageSync(THEME_STORAGE_KEY, themeName);
    } catch (e) {
        // ignore
    }
}

/**
 * 设置主题
 */
export function setTheme(themeName: string) {
    configProvider.setTheme(themeName);
    currentTheme.value = configProvider.getCurrentTheme();
    saveThemeToStorage(themeName);
}

/**
 * 获取当前主题
 */
export function getCurrentTheme(): Theme | null {
    return currentTheme.value || configProvider.getCurrentTheme();
}

/**
 * 获取所有可用主题
 */
export function getAvailableThemes() {
    return configProvider.getThemes();
}

/**
 * 初始化主题系统
 */
export function initTheme() {
    // 初始化 configProvider（如果运行时提供了内置主题）
    try {
        const builtin = (typeof uni !== 'undefined' && (uni as any).$u && (uni as any).$u.themes) || [];
        if (Array.isArray(builtin) && builtin.length > 0) {
            configProvider.init(builtin as Theme[]);
        }
    } catch (e) {
        // ignore
    }
}

/**
 * 使用主题的 composable
 */
export function useTheme() {
    return {
        // 直接返回响应式 refs，方便组件直接使用
        currentTheme,
        themes: themesRef,
        setTheme,
        getAvailableThemes
    };
}
