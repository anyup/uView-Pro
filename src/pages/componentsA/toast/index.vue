<template>
    <view class="u-demo">
        <view class="u-demo-wrap">
            <view class="u-demo-title">演示效果</view>
            <view class="u-demo-area">
                <u-toast :type="type" ref="uToastRef"></u-toast>
                <text class="no-mode-here">弹出toast</text>
            </view>
        </view>
        <view class="u-config-wrap">
            <view class="u-config-title u-border-bottom"> 参数配置 </view>
            <view class="u-config-item">
                <view class="u-item-title">主题</view>
                <u-subsection :current="4" :list="['primary', 'success', 'error', 'warning', 'default']" @change="typeChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">结束后自动跳转</view>
                <u-subsection current="1" :list="['是', '否']" @change="urlChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">位置</view>
                <u-subsection current="1" :list="['顶部', '中部', '底部']" @change="positionChange"></u-subsection>
            </view>
            <view class="u-config-item">
                <view class="u-item-title">显示图标</view>
                <u-subsection :list="['是', '否']" @change="iconChange"></u-subsection>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/**
 * 演示 u-toast 组件的使用
 * 包含主题、跳转、位置、图标等参数演示
 */
// 主题类型
const type = ref<'primary' | 'success' | 'error' | 'warning' | 'default'>('success');
// 显示内容
const title = ref('桃花潭水深千尺');
// 是否显示图标
const icon = ref(true);
// 位置
const position = ref<'top' | 'center' | 'bottom'>('center');
// 跳转url
const url = ref('');

// toast 组件ref
const uToastRef = ref();

/**
 * 主题切换
 * @param index 主题下标
 */
function typeChange(index: number) {
    type.value = index == 0 ? 'primary' : index == 1 ? 'success' : index == 2 ? 'error' : index == 3 ? 'warning' : 'default';
    show();
}
/**
 * 位置切换
 * @param index 位置下标
 */
function positionChange(index: number) {
    position.value = index == 0 ? 'top' : index == 1 ? 'center' : 'bottom';
    show();
}
/**
 * 图标切换
 * @param index 图标下标
 */
function iconChange(index: number) {
    icon.value = index == 0 ? true : false;
    show();
}
/**
 * 跳转切换
 * @param index 跳转下标
 */
function urlChange(index: number) {
    url.value = index == 0 ? '/pages/components/button/index' : '';
    show();
}
/**
 * 显示toast
 */
function show() {
    uToastRef.value?.show?.({
        title: title.value,
        position: position.value,
        type: type.value,
        icon: icon.value,
        url: url.value
    });
}
/**
 * 隐藏toast
 */
function hide() {
    uToastRef.value?.hide?.();
}
</script>

<style lang="scss" scoped>
.no-mode-here {
    color: $u-tips-color;
    font-size: 28rpx;
}
</style>
