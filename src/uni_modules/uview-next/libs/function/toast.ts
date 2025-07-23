/**
 * 显示无图标的 Toast 提示
 * @param title 提示文本
 * @param duration 显示时长（毫秒），默认1500
 */
function toast(title: string, duration: number = 1500): void {
    uni.showToast({
        title: title,
        icon: 'none',
        duration: duration
    });
}

export default toast;
