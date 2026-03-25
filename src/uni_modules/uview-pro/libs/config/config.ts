/**
 * 组件库配置项类型定义
 */
import { reactive } from 'vue';
import { version } from '../../package.json';
import type { DarkMode, DebugMode } from '../../types/global';

export type AppConfig = {
    /** 版本号 */
    v: string;
    /** 版本号（冗余字段） */
    version: string;
    /** 主题名称列表 */
    type: string[];
    /** 默认主题名称 */
    defaultTheme: string;
    /** 默认暗黑主题 */
    defaultDarkMode: DarkMode;
    /** 默认语言 */
    defaultLocale: string;
    /** 是否开启调试模式 */
    debugMode?: boolean | DebugMode | DebugMode[];
};

export const config = reactive<AppConfig>({
    v: version,
    version: version,
    // 主题名称
    type: ['primary', 'success', 'info', 'error', 'warning'],
    // 默认为官方主题名称
    defaultTheme: 'uviewpro',
    // 默认为亮色模式
    defaultDarkMode: 'light',
    // 默认为中文
    defaultLocale: 'zh-CN',
    // 默认不开启调试模式
    debugMode: false
});

export const isDebugMode = (debug: DebugMode = 'log'): boolean => {
    if (config.debugMode === false) return false;
    if (config.debugMode === true) return true;
    if (Array.isArray(config.debugMode)) return config.debugMode.includes(debug);
    return config.debugMode === debug;
};

export const setConfig = (options: Partial<AppConfig>) => {
    try {
        Object.keys(options).forEach(key => {
            if (key in config) {
                (config as any)[key] = options[key as keyof AppConfig];
            }
        });
    } catch (e) {
        if (isDebugMode('error')) console.error('Failed to set config:', e);
    }
};

export default config;
