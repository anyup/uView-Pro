import type { ColorType, ThemeColor } from '../../types/global';

// 使用 reactive 包装颜色对象，使其在运行时可被响应式读取与更新
const color: ThemeColor = {
    primary: '#2979ff',
    primaryDark: '#2b85e4',
    primaryDisabled: '#a0cfff',
    primaryLight: '#ecf5ff',
    bgColor: '#f3f4f6',

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
    borderColor: '#e4e7ed'
};

export function getColor(name: ColorType) {
    // 延迟获取，确保在组件实例化时获取当前主题颜色
    if (typeof uni !== 'undefined' && uni.$u) {
        return uni.$u.color[name];
    }
    return color[name] || '';
}

export default color;
