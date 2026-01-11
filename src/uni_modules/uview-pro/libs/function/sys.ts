/**
 * 获取当前操作系统平台
 * @returns 平台字符串，如 'ios'、'android'、'windows' 等
 */
export function os(): string {
    // #ifdef MP-WEIXIN
    return uni.getDeviceInfo().platform;
    // #endif
    // #ifndef MP-WEIXIN
    return uni.getSystemInfoSync().platform;
    // #endif
}

/**
 * 获取系统信息
 * @description 微信小程序已经弃用了 getSystemInfoSync 方法，建议在微信小程序中使用其它方法替代
 * @returns uniapp 系统信息对象
 */
export function sys(): UniApp.GetSystemInfoResult {
    return uni.getSystemInfoSync();
}

/**
 * 获取窗口信息
 * @returns 窗口信息对象
 */
export function getWindowInfo(): Omit<UniApp.GetWindowInfoResult, 'screenTop'> & { screenTop?: number } {
    // #ifdef MP-WEIXIN
    return uni.getWindowInfo();
    // #endif
    // #ifndef MP-WEIXIN
    const {
        pixelRatio,
        screenWidth,
        screenHeight,
        windowWidth,
        windowHeight,
        statusBarHeight,
        windowTop,
        windowBottom,
        safeArea,
        safeAreaInsets
    } = sys();
    return {
        pixelRatio,
        screenWidth,
        screenHeight,
        windowWidth,
        windowHeight,
        statusBarHeight,
        windowTop,
        windowBottom,
        safeArea,
        safeAreaInsets
    };
    // #endif
}

/**
 * 获取设备信息
 * @returns 设备信息对象
 */
export function getDeviceInfo(): UniApp.GetDeviceInfoResult {
    // #ifdef MP-WEIXIN
    return uni.getDeviceInfo();
    // #endif
    // #ifndef MP-WEIXIN
    const {
        deviceBrand,
        deviceModel,
        deviceId,
        deviceType,
        devicePixelRatio,
        deviceOrientation,
        brand,
        model,
        system,
        platform
    } = sys();
    return {
        deviceBrand,
        deviceModel,
        deviceId,
        deviceType,
        devicePixelRatio,
        deviceOrientation,
        brand,
        model,
        system,
        platform
    };
    // #endif
}
