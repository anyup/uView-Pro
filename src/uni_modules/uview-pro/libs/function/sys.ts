/**
 * 获取当前操作系统平台
 * @returns 平台字符串，如 'ios'、'android'、'windows' 等
 */
export function os(): string {
    return uni.getSystemInfoSync().platform;
}

/**
 * 获取系统信息
 * @returns uniapp 系统信息对象
 */
export function sys(): UniApp.GetSystemInfoResult {
    return uni.getSystemInfoSync();
}
