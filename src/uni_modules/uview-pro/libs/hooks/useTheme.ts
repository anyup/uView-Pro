/**
 * 主题管理 composable
 * 提供主题切换、持久化、CSS 变量注入、暗黑模式等功能
 *
 * 使用方式：
 * const { currentTheme, themes, setTheme, getDarkMode, setDarkMode, isInDarkMode, getAvailableThemes, initTheme } = useTheme()
 */

import type { Theme } from '../../types/global';
import configProvider from '../util/config-provider';
import { defaultThemes } from '../config/theme-tokens';

const THEME_STORAGE_KEY = 'uview-pro-theme';
const DARK_MODE_STORAGE_KEY = 'uview-pro-dark-mode';
const themesRef = configProvider.themesRef;
const currentTheme = configProvider.currentThemeRef;
const darkModeRef = configProvider.darkModeRef;

/**
 * 保存主题到 Storage
 */
function saveThemeToStorage(themeName: string) {
    try {
        uni.setStorageSync(THEME_STORAGE_KEY, themeName);
    } catch (e) {
        console.warn('[useTheme] failed to write storage', e);
    }
}

/**
 * 保存暗黑模式设置到 Storage
 */
function saveDarkModeToStorage(mode: 'auto' | 'light' | 'dark') {
    try {
        uni.setStorageSync(DARK_MODE_STORAGE_KEY, mode);
    } catch (e) {
        console.warn('[useTheme] failed to write storage', e);
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
 * @param themes 可选的主题列表，如果未提供则尝试从 uni.$u.themes 读取
 * @param defaultThemeName 可选的默认主题名
 */
export function initTheme(themes?: any[], defaultThemeName?: string) {
    // 如果有传入主题列表，使用传入的
    if (Array.isArray(themes) && themes.length > 0) {
        configProvider.init(themes, defaultThemeName);
        return;
    }

    // 若已通过插件或其他方式完成初始化，则不再覆盖，最多按需切换默认主题
    const existingThemes = configProvider.getThemes();
    if (existingThemes.length > 0) {
        if (defaultThemeName) {
            configProvider.setTheme(defaultThemeName);
        } else if (!configProvider.getCurrentTheme()) {
            configProvider.setTheme(existingThemes[0].name);
        } else {
            // 触发一次 apply，便于初始化 CSS 变量
            configProvider.setTheme(configProvider.getCurrentTheme()!.name);
        }
        return;
    }

    // 初始化 configProvider（如果运行时提供了内置主题）
    try {
        const builtin = (typeof uni !== 'undefined' && (uni as any).$u && (uni as any).$u.themes) || [];
        if (Array.isArray(builtin) && builtin.length > 0) {
            configProvider.init(builtin as Theme[], defaultThemeName);
            return;
        }
    } catch (e) {
        // ignore
    }

    // 回退到内置默认主题
    configProvider.init(defaultThemes as Theme[], defaultThemeName);
}

/**
 * 获取当前暗黑模式设置
 */
export function getDarkMode(): 'auto' | 'light' | 'dark' {
    return configProvider.getDarkMode();
}

/**
 * 设置暗黑模式
 * @param mode 'auto' (跟随系统) | 'light' (强制亮色) | 'dark' (强制暗黑)
 */
export function setDarkMode(mode: 'auto' | 'light' | 'dark') {
    configProvider.setDarkMode(mode);
    darkModeRef.value = mode;
    saveDarkModeToStorage(mode);
}

/**
 * 检查当前是否处于暗黑模式
 */
export function isInDarkMode(): boolean {
    return configProvider.isInDarkMode();
}

/**
 * 切换暗黑模式（在当前模式的基础上切换）
 */
export function toggleDarkMode() {
    const current = getDarkMode();
    const nextMode = current === 'dark' ? 'light' : 'dark';
    setDarkMode(nextMode);
}

/**
 * 使用主题的 composable
 * 返回所有主题相关的响应式引用和方法
 */
export function useTheme() {
    return {
        // 响应式引用
        currentTheme,
        themes: themesRef,
        darkMode: darkModeRef,
        cssVars: configProvider.cssVarsRef,

        // 主题相关方法
        setTheme,
        getCurrentTheme,
        getAvailableThemes,
        initTheme,

        // 暗黑模式相关方法
        getDarkMode,
        setDarkMode,
        isInDarkMode,
        toggleDarkMode
    };
}
