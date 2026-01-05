import type { Theme, ThemeColor } from '../../types/global';
import config from './config';

export const lightPalette: ThemeColor = {
    primary: '#2979ff',
    primaryDark: '#2b85e4',
    primaryDisabled: '#a0cfff',
    primaryLight: '#ecf5ff',
    success: '#19be6b',
    successDark: '#18b566',
    successDisabled: '#71d5a1',
    successLight: '#dbf1e1',
    warning: '#ff9900',
    warningDark: '#f29100',
    warningDisabled: '#fcbd71',
    warningLight: '#fdf6ec',
    error: '#fa3534',
    errorDark: '#dd6161',
    errorDisabled: '#fab6b6',
    errorLight: '#fef0f0',
    info: '#909399',
    infoDark: '#82848a',
    infoDisabled: '#c8c9cc',
    infoLight: '#f4f4f5',
    whiteColor: '#ffffff',
    blackColor: '#000000',
    mainColor: '#303133',
    contentColor: '#606266',
    tipsColor: '#909399',
    lightColor: '#c0c4cc',
    borderColor: '#dcdfe6',
    dividerColor: '#e4e7ed',
    maskColor: 'rgba(0, 0, 0, 0.4)',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    bgColor: '#f3f4f6',
    bgWhite: '#ffffff',
    bgGrayLight: '#f1f1f1',
    bgGrayDark: '#2f343c',
    bgBlack: '#000000'
};

export const darkPalette: ThemeColor = {
    primary: '#8ab4ff',
    primaryDark: '#5f8dff',
    primaryDisabled: '#3d4f74',
    primaryLight: '#1d273f',
    success: '#4ade80',
    successDark: '#1f9d57',
    successDisabled: '#2f4d3d',
    successLight: '#10291f',
    warning: '#fbbf24',
    warningDark: '#c88f00',
    warningDisabled: '#4a3b17',
    warningLight: '#2b1f05',
    error: '#ff6b6b',
    errorDark: '#d83a3a',
    errorDisabled: '#4f2323',
    errorLight: '#2d1414',
    info: '#a0a7b8',
    infoDark: '#7c8394',
    infoDisabled: '#3b3f4c',
    infoLight: '#1d2029',
    whiteColor: '#f5f6f7',
    blackColor: '#f5f6f7',
    mainColor: '#f5f6f7',
    contentColor: '#cfd3dc',
    tipsColor: '#9aa1af',
    lightColor: '#6b7082',
    borderColor: '#3a4251',
    dividerColor: '#3a4251',
    maskColor: 'rgba(0, 0, 0, 0.6)',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    bgColor: '#111827',
    bgWhite: '#000000',
    bgGrayLight: '#1a1a1a',
    bgGrayDark: '#f5f7fa',
    bgBlack: '#ffffff'
};

const lightCss: Record<string, string> = {
    '--u-background': '#ffffff',
    '--u-surface': '#f7f8fa',
    '--u-text': '#303133'
};

const darkCss: Record<string, string> = {
    '--u-background': '#0f1115',
    '--u-surface': '#1c2233',
    '--u-text': '#f5f6f7'
};

export const defaultThemes: Theme[] = [
    {
        name: config.defaultTheme,
        label: '默认蓝',
        description: 'uView Pro 默认主题，支持亮色与暗黑模式',
        color: lightPalette,
        darkColor: darkPalette,
        css: lightCss,
        darkCss: darkCss
    }
];
