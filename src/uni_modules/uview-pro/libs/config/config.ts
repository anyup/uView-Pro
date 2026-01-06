/**
 * 组件库配置项类型定义
 */
import { reactive } from 'vue';
import { version } from '../../package.json';
import type { DarkMode } from '../../types/global';

export interface AppConfig {
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
}

export const config = reactive<AppConfig>({
    v: version,
    version: version,
    // 主题名称
    type: ['primary', 'success', 'info', 'error', 'warning'],
    // 默认为官方主题名称
    defaultTheme: 'uviewpro',
    // 默认为亮色模式
    defaultDarkMode: 'light'
});

export default config;
