// 此自定义uView Pro主题生成于2025-11-29 13:18
// 地址：https://uviewpro.cn/zh/guide/themeGenerate.html

import { BASE_THEME_NAME } from '@/uni_modules/uview-pro';

export default [
    // 基线主题：显式声明后才会出现在切换列表中（不写则等于移除默认主题）
    {
        name: BASE_THEME_NAME,
        label: '官方蓝',
        description: '内置主题，color 留空即继承基线色板',
        color: {},
        css: {
            '--app-banner-height': '96px',
            '--u-app-card-radius': '16px',
            '--u-brand-gradient': 'linear-gradient(135deg, #2979ff 0%, #5cadff 100%)',
            '--u-brand-accent': '#2979ff'
        },
        darkCss: {
            '--app-banner-height': '80px',
            '--u-app-card-radius': '10px'
        }
    },

    // 主题 1: 紫色
    {
        name: 'purple',
        label: '霞光紫',
        color: {
            primary: '#7c3aed',
            error: '#f43f5e',
            warning: '#f59e0b',
            success: '#10b981',
            info: '#6b7280',
            primaryLight: '#f3e8ff',
            errorLight: '#ffe4e6',
            warningLight: '#fef3c7',
            successLight: '#d1fae5',
            infoLight: '#f3f4f6',
            primaryDark: '#6d28d9',
            errorDark: '#e11d48',
            warningDark: '#d97706',
            successDark: '#059669',
            infoDark: '#4b5563',
            primaryDisabled: '#c4b5fd',
            errorDisabled: '#fbcfe8',
            warningDisabled: '#fde68a',
            successDisabled: '#a7f3d0',
            infoDisabled: '#d1d5db'
        },
        // 自定义全局变量：统一写 -- 开头的标准 CSS 变量名，与色板一起被注入
        // 页面用 var(--u-xxx) 或 useTheme().cssVars 读取
        css: {
            '--app-banner-height': '96px',
            '--u-app-card-radius': '16px',
            '--u-brand-gradient': 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            '--u-brand-accent': '#8b5cf6' // hex 值会额外生成 --u-brand-accent-rgb
        },
        // 暗黑模式下的覆盖值，未声明的键回退到 css
        darkCss: {
            '--app-banner-height': '80px',
            '--u-app-card-radius': '10px'
        }
    },

    // 主题 2: 绿色
    {
        name: 'green',
        label: '清翠绿',
        color: {
            primary: '#059669',
            error: '#dc2626',
            warning: '#eab308',
            success: '#16a34a',
            info: '#78716c',
            primaryLight: '#ecfdf5',
            errorLight: '#fee2e2',
            warningLight: '#fefce8',
            successLight: '#dcfce7',
            infoLight: '#fafaf9',
            primaryDark: '#047857',
            errorDark: '#b91c1c',
            warningDark: '#ca8a04',
            successDark: '#15803d',
            infoDark: '#57534e',
            primaryDisabled: '#6ee7b7',
            errorDisabled: '#fca5a5',
            warningDisabled: '#facc15',
            successDisabled: '#86efac',
            infoDisabled: '#e7e5e4'
        },
        css: {
            '--app-banner-height': '96px',
            '--u-app-card-radius': '16px',
            '--u-brand-gradient': 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
            '--u-brand-accent': '#10b981'
        },
        darkCss: {
            '--app-banner-height': '80px',
            '--u-app-card-radius': '10px'
        }
    },

    // 主题 3: 橙色
    {
        name: 'orange',
        label: '暖阳橙',
        color: {
            primary: '#ff6b35',
            error: '#dc2626',
            warning: '#f59e0b',
            success: '#059669',
            info: '#2563eb',
            primaryLight: '#fed7aa',
            errorLight: '#fee2e2',
            warningLight: '#fef3c7',
            successLight: '#dcfce7',
            infoLight: '#dbeafe',
            primaryDark: '#ea580c',
            errorDark: '#b91c1c',
            warningDark: '#d97706',
            successDark: '#047857',
            infoDark: '#1d4ed8',
            primaryDisabled: '#fed7aa',
            errorDisabled: '#fca5a5',
            warningDisabled: '#fcd34d',
            successDisabled: '#6ee7b7',
            infoDisabled: '#93c5fd'
        },
        css: {
            '--app-banner-height': '96px',
            '--u-app-card-radius': '16px',
            '--u-brand-gradient': 'linear-gradient(135deg, #ff6b35 0%, #fbbf24 100%)',
            '--u-brand-accent': '#fb923c'
        },
        darkCss: {
            '--app-banner-height': '80px',
            '--u-app-card-radius': '10px'
        }
    },

    // 主题 4: 深蓝色
    {
        name: 'dark',
        label: '深邃蓝',
        color: {
            primary: '#1e3a8a',
            error: '#dc2626',
            warning: '#d97706',
            success: '#059669',
            info: '#2563eb',
            primaryLight: '#dbeafe',
            errorLight: '#fee2e2',
            warningLight: '#fef3c7',
            successLight: '#dcfce7',
            infoLight: '#dbeafe',
            primaryDark: '#1e40af',
            errorDark: '#b91c1c',
            warningDark: '#b45309',
            successDark: '#047857',
            infoDark: '#1d4ed8',
            primaryDisabled: '#93c5fd',
            errorDisabled: '#fca5a5',
            warningDisabled: '#fcd34d',
            successDisabled: '#6ee7b7',
            infoDisabled: '#93c5fd'
        },
        css: {
            '--app-banner-height': '96px',
            '--u-app-card-radius': '16px',
            '--u-brand-gradient': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            '--u-brand-accent': '#60a5fa'
        },
        darkCss: {
            '--app-banner-height': '80px',
            '--u-app-card-radius': '10px'
        }
    }
];
