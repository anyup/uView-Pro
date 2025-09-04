/**
 * 显示无图标的 Toast 提示
 * @param title 提示文本
 * @param option 显示时长（毫秒）默认1500 /显示图标，默认为none，
 */
function toast(title: string, option: number | string | Record<string, any> = 1500): void {
    uni.showToast({
        title: title,
        icon: typeof option === 'string' ? option : typeof option === 'object' ? option.icon || 'none' : 'none',
        duration: typeof option === 'number' ? option : typeof option === 'object' ? option.duration || '1500' : 1500
    });
}

export default toast;
