// libs/util/config-provider.ts

// 全局配置类：管理 Theme 的初始化、切换、持久化

import { ref } from 'vue';
import type { Theme } from '../../types/global';

const THEME_STORAGE_KEY = 'uview-pro-theme';

/**
 * ConfigProvider: 管理全局主题
 * - init(themes, defaultName): 初始化主题系统
 * - setTheme(name): 切换主题并持久化
 * - getThemes/getCurrentTheme: 读取当前数据
 *
 * 实现细节：
 * - 尝试调用 `uni.$u.setColor` 更新运行时主题（如果存在）
 * - 将 CSS 变量写入 `document.documentElement`（H5）以支持 `var(--u-type-*)` 使用
 */
export class ConfigProvider {
    // 响应式状态，供外部直接引用
    public themesRef = ref<Theme[]>([]);
    public currentThemeRef = ref<Theme | null>(null);
    private debug: boolean = false;

    constructor() {
        // 默认不自动初始化，调用 init 以传入主题列表
    }

    /**
     * 初始化主题系统
     * @param themes 可用主题数组
     * @param defaultThemeName 可选默认主题名
     */
    init(themes: Theme[], defaultThemeName?: string) {
        if (!Array.isArray(themes) || themes.length === 0) {
            console.warn('[ConfigProvider] init called with empty themes');
            return;
        }

        this.themesRef.value = themes.slice();

        // 先尝试从 Storage 读取已保存主题名
        let saved: string | null = null;
        try {
            saved = uni.getStorageSync(THEME_STORAGE_KEY) || null;
        } catch (e) {
            console.warn('[ConfigProvider] failed to read storage', e);
        }

        let initialName = saved || defaultThemeName || this.themesRef.value[0].name;
        const found = this.themesRef.value.find(t => t.name === initialName) || this.themesRef.value[0];

        this.currentThemeRef.value = found;

        // 应用主题
        this.applyTheme(found);

        if (this.debug) console.log('[ConfigProvider] initialized, theme=', found.name);

        return this;
    }

    /**
     * 获取所有可用主题
     */
    getThemes(): Theme[] {
        return this.themesRef.value.slice();
    }

    /**
     * 获取当前主题
     */
    getCurrentTheme(): Theme | null {
        return this.currentThemeRef.value;
    }

    /**
     * 切换主题并持久化
     */
    setTheme(themeName: string) {
        if (!this.themesRef.value || this.themesRef.value.length === 0) {
            console.warn('[ConfigProvider] setTheme called but themes list empty');
            return;
        }

        const theme = this.themesRef.value.find(t => t.name === themeName);
        if (!theme) {
            console.warn('[ConfigProvider] theme not found:', themeName);
            return;
        }

        this.currentThemeRef.value = theme;

        // 应用
        this.applyTheme(theme);

        // 持久化
        try {
            uni.setStorageSync(THEME_STORAGE_KEY, themeName);
        } catch (e) {
            console.warn('[ConfigProvider] failed to save theme to storage', e);
        }

        if (this.debug) console.log('[ConfigProvider] setTheme ->', themeName);
    }

    /**
     * 将主题应用到运行时：
     * - 1) 调用 uni.$u.setColor(theme.color) 如果存在
     * - 2) 在 H5 环境中，将 css map 注入到 document.documentElement 的 CSS 变量中
     */
    private applyTheme(theme: Theme) {
        if (!theme) return;

        // 1) 更新 uView $u 主题（如果存在）
        try {
            if (typeof uni !== 'undefined' && uni.$u && uni.$u.setColor) {
                try {
                    uni.$u.setColor(theme.color || {});
                } catch (e) {
                    if (this.debug) console.warn('[ConfigProvider] uni.$u.setColor error', e);
                }
            }
        } catch (e) {
            // ignore
        }

        // 2) 注入 CSS 变量（H5）
        try {
            if (typeof document !== 'undefined' && document.documentElement) {
                const root = document.documentElement;
                const cssMap = (theme as any).color || (theme as any).css || ({} as Record<string, string>);
                Object.entries(cssMap).forEach(([key, value]) => {
                    const cssVarName = key.startsWith('--') ? key : `--u-type-${key}`;
                    root.style.setProperty(cssVarName, String(value));

                    // 生成 rgb 版本，供 rgba(var(--u-type-xxx-rgb), 0.5) 使用
                    if (typeof value === 'string' && value.startsWith('#')) {
                        const hex = value.replace('#', '');
                        if (/^[0-9a-fA-F]{6}$/.test(hex)) {
                            const r = parseInt(hex.slice(0, 2), 16);
                            const g = parseInt(hex.slice(2, 4), 16);
                            const b = parseInt(hex.slice(4, 6), 16);
                            root.style.setProperty(`${cssVarName}-rgb`, `${r}, ${g}, ${b}`);
                        }
                    }
                });
            }
        } catch (e) {
            if (this.debug) console.warn('[ConfigProvider] apply CSS variables failed', e);
        }
    }
}

// 单例导出
export const configProvider = new ConfigProvider();
export default configProvider;
