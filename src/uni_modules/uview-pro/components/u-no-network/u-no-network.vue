<template>
    <view class="u-no-network" v-if="!isConnected" :style="{ 'z-index': uZIndex }" @touchmove.stop.prevent="() => {}">
        <view class="u-inner">
            <image class="u-error-icon" :src="image" mode="widthFix"></image>
            <view class="u-tips">
                {{ tips }}
            </view>
            <!-- 只有APP平台，才能跳转设置页，因为需要调用plus环境 -->
            <!-- #ifdef APP-PLUS -->
            <view class="u-to-setting"> 请检查网络，或前往<text class="u-setting-btn" @tap="openSettings">设置</text> </view>
            <!-- #endif -->
            <view class="u-retry" :hover-stay-time="150" @tap="retry" hover-class="u-retry-hover"> 重试 </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { imageSrc } from './image';
import { $u } from '../..';
import { NoNetworkProps } from './types';

defineOptions({ name: 'u-no-network' });

/**
 * noNetwork 无网络提示
 * @description 该组件无需任何配置，引入即可，内部自动处理所有功能和事件。
 * @tutorial https://uviewpro.cn/zh/components/noNetwork.html
 * @property {String} tips 没有网络时的提示语（默认哎呀，网络信号丢失）
 * @property {String | Number} zIndex 组件的z-index值（默认1080）
 * @property {String} image 无网络的图片提示，可用的src地址或base64图片
 * @event {Function} retry 用户点击页面的"重试"按钮时触发
 * @example <u-no-network></u-no-network>
 */

const props = defineProps(NoNetworkProps);

const isConnected = ref(true); // 是否有网络连接
const networkType = ref<string>('none'); // 网络类型
const isIOS = ref(false); // 是否iOS平台

/**
 * 计算z-index，优先使用props，否则取$u.zIndex.noNetwork
 */
const uZIndex = computed(() => {
    return props.zIndex ? props.zIndex : $u.zIndex.noNetwork;
});

/**
 * 组件挂载时初始化网络监听
 * 保留所有说明注释
 */
onMounted(() => {
    isIOS.value = uni.getSystemInfoSync().platform === 'ios';
    uni.onNetworkStatusChange(res => {
        isConnected.value = res.isConnected;
        networkType.value = res.networkType;
    });
    uni.getNetworkType({
        success: res => {
            networkType.value = res.networkType;
            if (res.networkType == 'none') {
                isConnected.value = false;
            } else {
                isConnected.value = true;
            }
        }
    });
});

/**
 * 重新检查网络
 * @event retry 用户点击页面的"重试"按钮时触发
 */
function retry() {
    uni.getNetworkType({
        success: res => {
            networkType.value = res.networkType;
            if (res.networkType == 'none') {
                uni.showToast({
                    title: '无网络连接',
                    icon: 'none',
                    position: 'top'
                });
                isConnected.value = false;
            } else {
                uni.showToast({
                    title: '网络已连接',
                    icon: 'none',
                    position: 'top'
                });
                isConnected.value = true;
            }
        }
    });
    emit('retry');
}

/**
 * 打开系统设置页（仅APP平台）
 */
function openSettings() {
    if (networkType.value == 'none') {
        openSystemSettings();
        return;
    }
}

/**
 * 打开APP设置页（仅APP平台）
 */
function openAppSettings() {
    gotoAppSetting();
}

/**
 * 打开系统设置页（仅APP平台）
 */
function openSystemSettings() {
    // 以下方法来自5+范畴，如需深究，请自行查阅相关文档
    // https://ask.dcloud.net.cn/docs/
    if (isIOS.value) {
        gotoiOSSetting();
    } else {
        gotoAndroidSetting();
    }
}

/**
 * 获取蜂窝网络权限（仅APP平台）
 */
function network() {
    // 该方法仅供参考，实际使用请查阅5+文档
    let result: number | null = null;
    const cellularData = plus.ios.newObject('CTCellularData');
    const state = cellularData.plusGetAttribute('restrictedState');
    if (state == 0) {
        result = null;
    } else if (state == 2) {
        result = 1;
    } else if (state == 1) {
        result = 2;
    }
    plus.ios.deleteObject(cellularData);
    return result;
}

/**
 * 跳转到APP设置页（仅APP平台）
 */
function gotoAppSetting() {
    if (isIOS.value) {
        // @ts-ignore
        const UIApplication = plus.ios.import('UIApplication');
        // @ts-ignore
        const application2 = UIApplication.sharedApplication();
        // @ts-ignore
        const NSURL2 = plus.ios.import('NSURL');
        // @ts-ignore
        const setting2 = NSURL2.URLWithString('app-settings:');
        application2.openURL(setting2);
        // @ts-ignore
        plus.ios.deleteObject(setting2);
        // @ts-ignore
        plus.ios.deleteObject(NSURL2);
        // @ts-ignore
        plus.ios.deleteObject(application2);
    } else {
        // @ts-ignore
        const Intent = plus.android.importClass('android.content.Intent');
        // @ts-ignore
        const Settings = plus.android.importClass('android.provider.Settings');
        // @ts-ignore
        const Uri = plus.android.importClass('android.net.Uri');
        // @ts-ignore
        const mainActivity = plus.android.runtimeMainActivity();
        // @ts-ignore
        const intent = new Intent();
        // @ts-ignore
        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        // @ts-ignore
        const uri = Uri.fromParts('package', mainActivity.getPackageName(), null);
        intent.setData(uri);
        // @ts-ignore
        mainActivity.startActivity(intent);
    }
}

/**
 * 跳转到iOS设置页（仅APP平台）
 */
function gotoiOSSetting() {
    // @ts-ignore
    const UIApplication = plus.ios.import('UIApplication');
    // @ts-ignore
    const application2 = UIApplication.sharedApplication();
    // @ts-ignore
    const NSURL2 = plus.ios.import('NSURL');
    // @ts-ignore
    const setting2 = NSURL2.URLWithString('App-prefs:root=General');
    application2.openURL(setting2);
    // @ts-ignore
    plus.ios.deleteObject(setting2);
    // @ts-ignore
    plus.ios.deleteObject(NSURL2);
    // @ts-ignore
    plus.ios.deleteObject(application2);
}

/**
 * 跳转到Android设置页（仅APP平台）
 */
function gotoAndroidSetting() {
    // @ts-ignore
    const Intent = plus.android.importClass('android.content.Intent');
    // @ts-ignore
    const Settings = plus.android.importClass('android.provider.Settings');
    // @ts-ignore
    const mainActivity = plus.android.runtimeMainActivity();
    // @ts-ignore
    const intent = new Intent(Settings.ACTION_SETTINGS);
    // @ts-ignore
    mainActivity.startActivity(intent);
}

// 组合式API emit
const emit = defineEmits(['retry']);

defineExpose({
    retry,
    openSettings,
    openAppSettings
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-no-network {
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.u-inner {
    height: 100vh;
    @include vue-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: -15%;
}

.u-tips {
    color: $u-tips-color;
    font-size: 28rpx;
    padding: 30rpx 0;
}

.u-error-icon {
    width: 300rpx;
}

.u-to-setting {
    color: $u-light-color;
    font-size: 26rpx;
}

.u-setting-btn {
    font-size: 26rpx;
    color: $u-type-primary;
}

.u-retry {
    margin-top: 30rpx;
    border: 1px solid $u-tips-color;
    color: $u-tips-color;
    font-size: 28rpx;
    padding: 6rpx 30rpx;
    border-radius: 3px;
}

.u-retry-hover {
    color: #fff;
    background-color: $u-tips-color;
}
</style>
