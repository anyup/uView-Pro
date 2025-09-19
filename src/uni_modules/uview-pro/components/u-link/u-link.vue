<template>
    <text
        class="u-link"
        @tap.stop="openLink"
        :style="{
            color: color,
            fontSize: fontSize + 'rpx',
            borderBottom: underLine ? `1px solid ${lineColor ? lineColor : color}` : 'none',
            paddingBottom: underLine ? '0rpx' : '0'
        }"
    >
        <slot></slot>
    </text>
</template>

<script setup lang="ts">
import { $u } from '../..';
import { LinkProps } from './types';

defineOptions({
    name: 'u-link'
});

/**
 * link 超链接
 * @description 该组件为超链接组件，在不同平台有不同表现形式：在APP平台会通过plus环境打开内置浏览器，在小程序中把链接复制到粘贴板，同时提示信息，在H5中通过window.open打开链接。
 * @tutorial https://uviewpro.cn/zh/components/link.html
 * @property {String} color 文字颜色（默认#606266）
 * @property {String Number} font-size 字体大小，单位rpx（默认28）
 * @property {Boolean} under-line 是否显示下划线（默认false）
 * @property {String} href 跳转的链接，要带上http(s)
 * @property {String} line-color 下划线颜色，默认同color参数颜色
 * @property {String} mp-tips 各个小程序平台把链接复制到粘贴板后的提示语（默认“链接已复制，请在浏览器打开”）
 * @example <u-link href="https://uviewpro.cn">蜀道难，难于上青天</u-link>
 */
const props = defineProps(LinkProps);

/**
 * 打开链接方法
 * 不同平台有不同表现形式
 */
function openLink() {
    // #ifdef APP-PLUS
    if (typeof plus !== 'undefined' && plus.runtime) {
        plus.runtime.openURL(props.href);
    }
    // #endif
    // #ifdef H5
    if (typeof window !== 'undefined') {
        window.open(props.href);
    }
    // #endif
    // #ifdef MP
    if (typeof uni !== 'undefined' && uni.setClipboardData) {
        uni.setClipboardData({
            data: props.href,
            success: () => {
                uni.hideToast();
                if (typeof $u !== 'undefined' && $u.toast && props.mpTips) {
                    $u.toast(props.mpTips);
                }
            }
        });
    }
    // #endif
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-link {
    line-height: 1;
}
</style>
