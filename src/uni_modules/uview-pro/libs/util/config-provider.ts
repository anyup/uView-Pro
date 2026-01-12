// libs/util/config-provider.ts

// 全局配置类：管理 Theme 的初始化、切换、持久化

import { ref } from 'vue';
import type { DarkMode, Theme, ThemeColor } from '../../types/global';
import config from '../config/config';
import { defaultThemes } from '../config/theme-tokens';
import { color as reactiveColor } from '../config/color';
import { getSystemDarkMode as getNativeSystemDarkMode } from './system-theme';
import * as localePack from '../../locale';

declare const uni: any;

const THEME_STORAGE_KEY = 'uview-pro-theme';
const DARK_MODE_STORAGE_KEY = 'uview-pro-dark-mode';
const LOCALE_STORAGE_KEY = 'uview-pro-locale';
const DEFAULT_LIGHT_TOKENS = (defaultThemes[0]?.color || {}) as Partial<ThemeColor>;
const DEFAULT_DARK_TOKENS = (defaultThemes[0]?.darkColor || {}) as Partial<ThemeColor>;
const STRUCTURAL_TOKENS = new Set([
    'bgColor',
    'bgWhite',
    'bgGrayLight',
    'bgGrayDark',
    'bgBlack',
    'borderColor',
    'lightColor',
    'mainColor',
    'contentColor',
    'tipsColor',
    'whiteColor',
    'blackColor',
    'dividerColor',
    'maskColor',
    'shadowColor'
]);

export type DefaultThemeConfig = {
    /**
     * 默认主题
     */
    defaultTheme?: string;
    /**
     * 默认暗黑模式
     */
    defaultDarkMode?: DarkMode;
};

/**
 * ConfigProvider: 管理全局主题
 * - init(themes, defaultName): 初始化主题系统
 * - setTheme(name): 切换主题并持久化
 * - getThemes/getCurrentTheme: 读取当前数据
 * - setDarkMode/getDarkMode: 管理暗黑模式
 */
export class ConfigProvider {
    // 响应式状态，供外部直接引用
    public themesRef = ref<Theme[]>([]);
    public currentThemeRef = ref<Theme | null>(null);
    public darkModeRef = ref<DarkMode>(config.defaultDarkMode);
    public cssVarsRef = ref<Record<string, string>>({});
    // 国际化 i18n 状态
    public localesRef = ref<any[]>([]);
    public currentLocaleRef = ref<any | null>(null);
    private baseColorTokens: Partial<ThemeColor> = DEFAULT_LIGHT_TOKENS;
    private baseDarkColorTokens: Partial<ThemeColor> = DEFAULT_DARK_TOKENS;
    private debug: boolean = false;
    private systemDarkModeMediaQuery: MediaQueryList | null = null;
    private lastAppliedCssKeys: string[] = [];
    private interval = 0;

    constructor() {
        // 默认不自动初始化，调用 init 以传入主题列表
        this.initSystemDarkModeListener();
    }

    /**
     * 初始化系统暗黑模式监听器
     * 支持 H5、App、小程序等平台
     */
    private initSystemDarkModeListener() {
        // H5 平台：使用 matchMedia API
        try {
            if (typeof window !== 'undefined' && window.matchMedia) {
                this.systemDarkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                const listener = () => {
                    if (this.darkModeRef.value === 'auto') {
                        this.applyTheme(this.currentThemeRef.value);
                    }
                };
                if (this.systemDarkModeMediaQuery.addEventListener) {
                    this.systemDarkModeMediaQuery.addEventListener('change', listener);
                } else if (this.systemDarkModeMediaQuery.addListener) {
                    this.systemDarkModeMediaQuery.addListener(listener);
                }
            }
        } catch (e) {
            if (this.debug) console.warn('[ConfigProvider] H5 system dark mode listener failed', e);
        }

        // uni-app 平台：使用 uni.onThemeChange API
        try {
            if (typeof uni !== 'undefined' && typeof uni.onThemeChange === 'function') {
                uni.onThemeChange((res: { theme: string }) => {
                    console.log('[ConfigProvider] system theme changed', res);
                    if (this.darkModeRef.value === 'auto') {
                        // 系统主题变化时，重新应用主题
                        this.applyTheme(this.currentThemeRef.value);
                    }
                });
            }
        } catch (e) {
            if (this.debug) console.warn('[ConfigProvider] uni-app system dark mode listener failed', e);
        }
        this.initAppEvent();
    }

    /**
     * App 平台事件监听
     * 经测试 uni.onThemeChange 在 App 平台目前没生效，暂时只能通过定时检查
     */
    private initAppEvent(): void {
        // #ifdef APP
        try {
            if (this.interval) clearInterval(this.interval);

            this.interval = setInterval(() => {
                if (this.darkModeRef.value === 'auto') {
                    // 系统主题变化时，重新应用主题
                    this.applyTheme(this.currentThemeRef.value);
                }
            }, 5000);
        } catch (e) {
            if (this.debug) console.warn('[ConfigProvider] setInterval failed', e);
        }
        // #endif
    }
    /**
     * 检测当前是否应该使用暗黑模式
     */
    private isSystemDarkMode(): boolean {
        try {
            if (this.systemDarkModeMediaQuery) {
                return this.systemDarkModeMediaQuery.matches;
            }
        } catch (e) {
            if (this.debug) console.warn('[ConfigProvider] matchMedia check failed', e);
        }
        try {
            return getNativeSystemDarkMode() === 'dark';
        } catch (e) {
            if (this.debug) console.warn('[ConfigProvider] native system theme check failed', e);
            return false;
        }
    }

    /**
     * 初始化主题系统
     * @param themes 可用主题数组
     * @param defaultTheme 可选默认主题名
     */
    initTheme(themes?: Theme[], defaultConfig?: string | DefaultThemeConfig) {
        const normalizedThemes = this.normalizeThemes(themes);
        if (!normalizedThemes.length) {
            console.warn('[ConfigProvider] init called with empty themes');
            return;
        }

        // 配置默认主题
        if (defaultConfig) {
            if (typeof defaultConfig === 'string') {
                config.defaultTheme = defaultConfig || config.defaultTheme;
            } else if (typeof defaultConfig === 'object') {
                const { defaultTheme, defaultDarkMode } = defaultConfig;
                config.defaultTheme = defaultTheme || config.defaultTheme;
                config.defaultDarkMode = defaultDarkMode || config.defaultDarkMode;
            }
        }

        // 设置主题列表，响应式
        this.themesRef.value = normalizedThemes.slice();

        // 先尝试从 Storage 读取已保存主题名
        const saved = this.readStorage<string>(THEME_STORAGE_KEY);
        let initialName = saved || config.defaultTheme || this.themesRef.value[0].name;
        let found = this.themesRef.value.find(t => t.name === initialName);
        if (!found) found = this.themesRef.value.find(t => t.name === config.defaultTheme);
        if (!found) found = this.themesRef.value[0];

        // 设置当前主题，响应式
        this.currentThemeRef.value = found;

        // 初始化暗黑模式设置
        this.initDarkMode(config.defaultDarkMode);

        // 应用主题
        this.applyTheme(found);

        if (this.debug)
            console.log('[ConfigProvider] initialized, theme=', found.name, 'darkMode=', this.darkModeRef.value);

        return this;
    }

    /**
     * 初始化暗黑模式设置
     * @param darkMode
     */
    initDarkMode(darkMode?: DarkMode) {
        // 尝试从 Storage 读取暗黑模式设置
        const savedDarkMode = this.readStorage<DarkMode>(DARK_MODE_STORAGE_KEY);
        this.darkModeRef.value = savedDarkMode || darkMode || config.defaultDarkMode;
    }

    /**
     * 初始化国际化数据
     * @param locales 可选的 locale 列表（对象数组，包含 name 字段）
     * @param defaultLocaleName 可选默认 locale 名称
     */
    initLocales(locales?: any[], defaultLocaleName?: string) {
        const normalized = this.normalizeLocales(locales);
        if (!normalized.length) {
            if (this.debug) console.warn('[ConfigProvider] initLocales called with empty locales');
            return;
        }

        this.localesRef.value = normalized.slice();

        // 尝试从 Storage 读取已保存 locale 名称
        const saved = this.readStorage<string>(LOCALE_STORAGE_KEY);

        // 根据传入的 defaultLocaleName 或 saved 或 config.defaultLocale 查找 locale
        const initialName = saved || defaultLocaleName || config.defaultLocale;
        let found = this.localesRef.value.find((l: any) => l.name === initialName);
        if (!found) found = this.localesRef.value.find(l => l.name === config.defaultLocale);
        if (!found) found = this.localesRef.value[0];

        this.currentLocaleRef.value = found;

        if (this.debug) console.log('[ConfigProvider] locales initialized, locale=', found?.name);

        return this;
    }

    /**
     * 归一化 locale 配置，保证始终至少有一个默认 locale
     */
    private normalizeLocales(locales?: any[]) {
        // 获取内置语言包（可能包含 zh-CN / en-US 等）
        let builtinList: any[] = [];
        try {
            builtinList = Object.values(localePack || {}).filter(v => v && typeof v === 'object');
        } catch (e) {
            if (this.debug) console.warn('[ConfigProvider] normalizeLocales read builtin failed', e);
        }

        // 如果没有传入自定义 locales，直接返回内置列表
        if (!Array.isArray(locales) || !locales.length) {
            return builtinList.slice();
        }

        // 将 builtin 按 name 映射，便于合并
        const map = new Map<string, any>();
        builtinList.forEach(item => {
            if (item && item.name) {
                map.set(item.name, { ...(item || {}) });
            }
        });

        // 合并用户传入的 locales：若 name 相同则对对象字段进行浅合并（嵌套对象尝试合并）
        locales.forEach(loc => {
            if (!loc || !loc.name) return;
            const existing = map.get(loc.name);
            if (!existing) {
                // 新增语言直接加入
                map.set(loc.name, { ...(loc || {}) });
                return;
            }
            // 合并：对每个 key，如果是对象且现有为对象，则进行浅合并，否则覆盖
            const merged: any = { ...existing };
            Object.keys(loc).forEach(k => {
                const v = (loc as any)[k];
                if (v != null && typeof v === 'object' && !Array.isArray(v) && typeof merged[k] === 'object') {
                    merged[k] = { ...(merged[k] || {}), ...(v || {}) };
                } else {
                    merged[k] = v;
                }
            });
            map.set(loc.name, merged);
        });

        return Array.from(map.values());
    }

    /**
     * 获取所有可用 locale
     */
    getLocales() {
        return this.localesRef.value.slice();
    }

    /**
     * 获取当前 locale 对象
     */
    getCurrentLocale() {
        return this.currentLocaleRef.value;
    }

    /**
     * 切换 locale 并持久化
     */
    setLocale(localeName: string) {
        if (!this.localesRef.value || this.localesRef.value.length === 0) {
            console.warn('[ConfigProvider] setLocale called but locales list empty');
            return;
        }
        const locale = this.localesRef.value.find(l => l.name === localeName);
        if (!locale) {
            console.warn('[ConfigProvider] locale not found:', localeName);
            return;
        }
        this.currentLocaleRef.value = locale;
        this.writeStorage(LOCALE_STORAGE_KEY, localeName);
        if (this.debug) console.log('[ConfigProvider] setLocale ->', localeName);
    }

    /**
     * 翻译函数
     * 支持 key 路径，例如 'calendar.placeholder'
     * replacements 支持数组或对象替换占位符 {0} 或 {name}
     */
    t(key: string, replacements?: any, localeName?: string): string {
        const localeObj =
            (localeName && this.localesRef.value.find(l => l.name === localeName)) || this.currentLocaleRef.value;
        if (!localeObj) return key;
        const parts = key.split('.');
        let cur: any = localeObj;
        for (let i = 0; i < parts.length; i++) {
            if (cur == null) break;
            cur = cur[parts[i]];
        }
        let text = typeof cur === 'string' ? cur : key;
        if (replacements != null) {
            if (Array.isArray(replacements)) {
                replacements.forEach((val, idx) => {
                    text = text.split(`{${idx}}`).join(String(val));
                });
            } else if (typeof replacements === 'object') {
                Object.keys(replacements).forEach(k => {
                    text = text.split(`{${k}}`).join(String(replacements[k]));
                });
            }
        }
        return text;
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
        this.writeStorage(THEME_STORAGE_KEY, themeName);

        if (this.debug) console.log('[ConfigProvider] setTheme ->', themeName);
    }

    /**
     * 运行时更新当前主题颜色并应用（不持久化）
     * @param colors 主题颜色键值，支持部分更新
     */
    public setThemeColor(colors: Partial<ThemeColor>) {
        if (!colors || Object.keys(colors).length === 0) return;
        if (!this.currentThemeRef.value) {
            console.warn('[ConfigProvider] setThemeColor called but no current theme');
            return;
        }

        const mode = this.getActiveMode();

        if (mode === 'dark') {
            const existing = this.currentThemeRef.value.darkColor || {};
            this.currentThemeRef.value.darkColor = {
                ...existing,
                ...colors
            };
        } else {
            const existing = this.currentThemeRef.value.color || {};
            this.currentThemeRef.value.color = {
                ...existing,
                ...colors
            };
        }

        // 重新应用当前主题以同步运行时 color、CSS 变量等
        this.applyTheme(this.currentThemeRef.value);

        if (this.debug) console.log('[ConfigProvider] setThemeColor ->', colors);
    }

    /**
     * 获取当前暗黑模式设置
     */
    getDarkMode(): DarkMode {
        return this.darkModeRef.value;
    }

    /**
     * 设置暗黑模式
     * @param mode 'auto' (跟随系统) | 'light' (强制亮色) | 'dark' (强制暗黑)
     */
    setDarkMode(mode: DarkMode) {
        this.darkModeRef.value = mode;
        // 持久化
        this.writeStorage(DARK_MODE_STORAGE_KEY, mode);

        // 重新应用主题
        this.applyTheme(this.currentThemeRef.value);

        if (this.debug) console.log('[ConfigProvider] setDarkMode ->', mode);
    }

    /**
     * 检查当前是否处于暗黑模式
     */
    isInDarkMode(): boolean {
        const mode = this.darkModeRef.value;
        if (mode === 'dark') return true;
        if (mode === 'light') return false;
        // auto 模式下检查系统设置
        return this.isSystemDarkMode();
    }

    /**
     * 归一化主题配置，保证始终至少有一个默认主题
     */
    private normalizeThemes(themes?: Theme[]): Theme[] {
        if (Array.isArray(themes) && themes.length) {
            return this.mergeThemes(defaultThemes, themes);
        }
        return defaultThemes.slice();
    }

    private mergeThemes(...lists: Array<Theme[] | undefined>): Theme[] {
        const map = new Map<string, Theme>();
        lists
            .filter((list): list is Theme[] => Array.isArray(list) && list.length > 0)
            .forEach(list => {
                list.forEach(theme => {
                    const normalized = this.ensureDarkVariant({
                        ...theme,
                        color: this.applyColorFallbacks(theme.color),
                        darkColor: theme.darkColor ? { ...theme.darkColor } : undefined,
                        css: theme.css ? { ...theme.css } : undefined,
                        darkCss: theme.darkCss ? { ...theme.darkCss } : undefined
                    });
                    map.set(normalized.name, normalized);
                });
            });
        return Array.from(map.values());
    }

    private ensureDarkVariant(theme: Theme): Theme {
        const finalDark = this.buildDarkPalette(theme);
        return {
            ...theme,
            darkColor: this.applyDarkFallbacks(finalDark)
        };
    }

    private buildDarkPalette(theme: Theme): Partial<ThemeColor> {
        const provided = theme.darkColor || {};
        const generated = this.generateDarkFromLight(theme.color || {}, provided);
        return {
            ...generated,
            ...provided
        };
    }

    /**
     * 应用亮色主题
     */
    private applyColorFallbacks(color?: Partial<ThemeColor>): Partial<ThemeColor> {
        return {
            ...(this.baseColorTokens || {}),
            ...(color || {})
        };
    }

    /**
     * 应用暗黑主题
     */
    private applyDarkFallbacks(color?: Partial<ThemeColor>): Partial<ThemeColor> {
        return {
            ...(this.baseDarkColorTokens || {}),
            ...(color || {})
        };
    }

    private filterNonStructuralTokens(palette: Partial<ThemeColor>): Partial<ThemeColor> {
        const result: Partial<ThemeColor> = {};
        Object.entries(palette || {}).forEach(([key, value]) => {
            if (!this.isStructuralToken(key)) {
                (result as any)[key] = value;
            }
        });
        return result;
    }

    private generateDarkFromLight(palette: Partial<ThemeColor>, provided: Partial<ThemeColor>): Partial<ThemeColor> {
        const result: Partial<ThemeColor> = {};
        const nonStructural = this.filterNonStructuralTokens(palette);
        Object.entries(nonStructural).forEach(([key, value]) => {
            if (typeof value !== 'string') return;
            if (provided && Object.prototype.hasOwnProperty.call(provided, key)) {
                return;
            }
            const fallback = (this.baseDarkColorTokens as any)?.[key];
            (result as any)[key] = this.createDarkVariantFromLight(value, fallback);
        });
        return result;
    }

    private createDarkVariantFromLight(color: string, fallback?: string): string {
        const normalized = this.normalizeHex(color);
        const fallbackHex = fallback ? this.normalizeHex(fallback) : null;
        if (normalized && fallbackHex) {
            return this.mixHex(normalized, fallbackHex, 0.6);
        }
        if (fallbackHex) return fallbackHex;
        return normalized || color;
    }

    private normalizeHex(color: string): string | null {
        if (!color) return null;
        const hex = color.trim();
        if (/^#([0-9a-fA-F]{6})$/.test(hex)) return hex.toLowerCase();
        return null;
    }

    private mixHex(fromHex: string, toHex: string, ratio: number): string {
        const from = this.hexToRgb(fromHex);
        const to = this.hexToRgb(toHex);
        if (!from || !to) return toHex;
        const clamp = (val: number) => Math.min(255, Math.max(0, Math.round(val)));
        const r = clamp(from.r * (1 - ratio) + to.r * ratio);
        const g = clamp(from.g * (1 - ratio) + to.g * ratio);
        const b = clamp(from.b * (1 - ratio) + to.b * ratio);
        return this.rgbToHex(r, g, b);
    }

    private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
        const match = /^#([0-9a-fA-F]{6})$/.exec(hex);
        if (!match) return null;
        return {
            r: parseInt(match[1].slice(0, 2), 16),
            g: parseInt(match[1].slice(2, 4), 16),
            b: parseInt(match[1].slice(4, 6), 16)
        };
    }

    private rgbToHex(r: number, g: number, b: number): string {
        const toHex = (val: number) => val.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    private isStructuralToken(token: string): boolean {
        return STRUCTURAL_TOKENS.has(token);
    }

    /**
     * 运行时同步主题颜色（$u.color）
     * 更新响应式 color 对象，确保所有使用 $u.color 的地方都能响应式更新
     */
    private syncRuntimeTheme(palette: Partial<ThemeColor>) {
        try {
            // 合并默认值，确保所有颜色都有值
            const defaultPalette = this.getActiveMode() === 'dark' ? this.baseDarkColorTokens : this.baseColorTokens;

            const mergedPalette = {
                ...defaultPalette,
                ...palette
            };

            // 更新响应式 color 对象
            Object.keys(mergedPalette).forEach(key => {
                const value = (mergedPalette as any)[key];
                if (value != null) {
                    (reactiveColor as any)[key] = value;
                }
            });

            // 同步到 uni.$u.color（如果存在）
            if (typeof uni !== 'undefined' && uni?.$u?.color) {
                uni.$u.color = reactiveColor;
            }
        } catch (e) {
            if (this.debug) console.warn('[ConfigProvider] sync runtime theme failed', e);
        }
    }

    /**
     * 获取当前激活的模式
     */
    private getActiveMode(): 'light' | 'dark' {
        return this.isInDarkMode() ? 'dark' : 'light';
    }

    /**
     * 获取当前主题的配色方案
     */
    private getPaletteForMode(theme: Theme, mode: 'light' | 'dark') {
        if (mode === 'dark') {
            return theme.darkColor && Object.keys(theme.darkColor).length ? theme.darkColor : theme.color || {};
        }
        return theme.color || {};
    }

    /**
     * 获取当前主题的CSS变量覆盖
     */
    private getCssOverrides(theme: Theme, mode: 'light' | 'dark') {
        if (mode === 'dark') {
            return (theme.darkCss && Object.keys(theme.darkCss).length ? theme.darkCss : theme.css) || {};
        }
        return theme.css || {};
    }

    /**
     * 读取Storage key
     */
    private readStorage<T>(key: string): T | null {
        try {
            if (typeof uni === 'undefined' || typeof uni.getStorageSync !== 'function') return null;
            const value = uni.getStorageSync(key);
            return (value ?? null) as T | null;
        } catch (e) {
            if (this.debug) console.warn('[ConfigProvider] failed to read storage', e);
            return null;
        }
    }

    /**
     * 写入Storage key value
     */
    private writeStorage(key: string, value: any) {
        try {
            if (typeof uni === 'undefined' || typeof uni.setStorageSync !== 'function') return;
            uni.setStorageSync(key, value);
        } catch (e) {
            if (this.debug) console.warn('[ConfigProvider] failed to write storage', e);
        }
    }

    /**
     * 更新文档主题模式 H5
     */
    private updateDocumentMode(mode: 'light' | 'dark') {
        if (typeof document === 'undefined' || !document.documentElement) return;
        const root = document.documentElement;
        root.dataset.uThemeMode = mode;
        root.classList.remove('u-theme-light', 'u-theme-dark');
        root.classList.add(`u-theme-${mode}`);
    }

    /**
     * 转换为 CSS 变量名称
     */
    private toCssVarName(key: string, prefix: string = '--u'): string {
        const types = config.type;
        if (types.some(type => key.startsWith(type))) {
            prefix += '-type';
        }
        const kebab = key
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
        return `${prefix}-${kebab}`;
    }

    /**
     * 添加 RGB 值
     */
    private attachRgbVar(target: Record<string, string>, varName: string, value: string) {
        if (typeof value !== 'string') return;
        const hex = value.startsWith('#') ? value.slice(1) : '';
        if (!/^[0-9a-fA-F]{6}$/.test(hex)) return;
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        target[`${varName}-rgb`] = `${r}, ${g}, ${b}`;
    }

    /**
     * 构建 CSS 变量映射表
     * 生成格式：
     */
    private buildCssVarMap(theme: Theme, mode: 'light' | 'dark'): Record<string, string> {
        const map: Record<string, string> = {
            '--u-theme-mode': mode
        };
        const palette = this.getPaletteForMode(theme, mode);
        const cssOverrides = this.getCssOverrides(theme, mode);

        const applyEntry = (key: string, value: string | number | undefined | null) => {
            if (value == null) return;
            const strValue = String(value);
            if (key.startsWith('--')) {
                map[key] = strValue;
                this.attachRgbVar(map, key, strValue);
                return;
            }
            const cssVarName = this.toCssVarName(key);
            // const typeVarName = this.toCssVarName(key, '--u-type');
            map[cssVarName] = strValue;
            // map[typeVarName] = strValue;
            this.attachRgbVar(map, cssVarName, strValue);
            // this.attachRgbVar(map, typeVarName, strValue);
        };

        Object.entries(palette || {}).forEach(([key, value]) => applyEntry(key, value as any));
        Object.entries(cssOverrides || {}).forEach(([key, value]) => applyEntry(key, value as any));

        return map;
    }

    /**
     * 刷新 CSS 变量 H5
     */
    private flushCssVars(vars: Record<string, string>) {
        if (typeof document === 'undefined' || !document.documentElement) return;
        const root = document.documentElement;
        this.lastAppliedCssKeys.forEach(key => {
            root.style.removeProperty(key);
        });
        Object.entries(vars).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        this.lastAppliedCssKeys = Object.keys(vars);
    }

    /**
     * 将主题应用到运行时：
     * - 1) 调用 uni.$u.setColor(theme.color) 如果存在
     * - 2) 在 H5 环境中，将 css map 注入到 document.documentElement 的 CSS 变量中
     * - 3) 支持暗黑模式：根据 darkColor 或 color 应用相应的颜色
     */
    private applyTheme(theme: Theme | null) {
        if (!theme) return;
        const mode = this.getActiveMode();
        const palette = this.getPaletteForMode(theme, mode);
        this.syncRuntimeTheme(palette);

        const cssVarMap = this.buildCssVarMap(theme, mode);
        this.cssVarsRef.value = cssVarMap;
        this.flushCssVars(cssVarMap);
        this.updateDocumentMode(mode);
    }
}

// 单例导出
export const configProvider = new ConfigProvider();
export default configProvider;
