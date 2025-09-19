<template>
    <u-popup
        mode="bottom"
        :border-radius="borderRadius"
        :popup="false"
        v-model="popupValue"
        :maskCloseAble="maskCloseAble"
        length="auto"
        :safeAreaInsetBottom="safeAreaInsetBottom"
        @close="popupClose"
        :z-index="uZIndex"
    >
        <view class="u-tips u-border-bottom" v-if="tips.text" :style="[tipsStyle]">
            {{ tips.text }}
        </view>
        <block v-for="(item, index) in list" :key="index">
            <view
                @touchmove.stop.prevent
                @tap="itemClick(index)"
                :style="[itemStyle(index)]"
                class="u-action-sheet-item u-line-1"
                :class="[index < list.length - 1 ? 'u-border-bottom' : '']"
                :hover-stay-time="150"
            >
                <text>{{ item.text }}</text>
                <text class="u-action-sheet-item__subtext u-line-1" v-if="item.subText">{{ item.subText }}</text>
            </view>
        </block>
        <view class="u-gab" v-if="cancelBtn"> </view>
        <view @touchmove.stop.prevent class="u-actionsheet-cancel u-action-sheet-item" hover-class="u-hover-class" :hover-stay-time="150" v-if="cancelBtn" @tap="close">{{
            cancelText
        }}</view>
    </u-popup>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { $u } from '../..';
import { ActionSheetProps } from './types';

defineOptions({
    name: 'u-action-sheet'
});

/**
 * actionSheet 操作菜单
 * @description 本组件用于从底部弹出一个操作菜单，供用户选择并返回结果。本组件功能类似于uni的uni.showActionSheetAPI，配置更加灵活，所有平台都表现一致。
 * @tutorial https://uviewpro.cn/zh/components/actionSheet.html
 * @property {Array<{ text: string; subText?: string; color?: string; fontSize?: string; disabled?: boolean }>} list 按钮的文字数组，见官方文档示例
 * @property {{text: string; color?: string; fontSize?: string}} tips 顶部的提示文字，见官方文档示例
 * @property {String} cancel-text 取消按钮的提示文字
 * @property {Boolean} cancel-btn 是否显示底部的取消按钮（默认true）
 * @property {Number String} border-radius 弹出部分顶部左右的圆角值，单位rpx（默认0）
 * @property {Boolean} mask-close-able 点击遮罩是否可以关闭（默认true）
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配（默认false）
 * @property {Number String} z-index z-index值（默认1075）
 * @property {String} cancel-text 取消按钮的提示文字
 * @event {Function} click 点击ActionSheet列表项时触发
 * @event {Function} close 点击取消按钮时触发
 * @example <u-action-sheet :list="list" @click="click" v-model="show"></u-action-sheet>
 */

const props = defineProps(ActionSheetProps);

const emit = defineEmits(['update:modelValue', 'click', 'close']);

const popupValue = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val)
});

// 顶部提示的样式
const tipsStyle = computed(() => {
    let style: Record<string, string> = {};
    if (props.tips.color) style.color = props.tips.color;
    if (props.tips.fontSize) style.fontSize = props.tips.fontSize + 'rpx';
    return style;
});

// 操作项目的样式
const itemStyle = (index: number) => {
    let style: Record<string, string> = {};
    if (props.list[index]?.color) style.color = props.list[index].color;
    if (props.list[index]?.fontSize) style.fontSize = props.list[index].fontSize + 'rpx';
    // 选项被禁用的样式
    if (props.list[index]?.disabled) style.color = '#c0c4cc';
    return style;
};

// 计算z-index
const uZIndex = computed(() => {
    // 如果用户有传递z-index值，优先使用
    return props.zIndex ? props.zIndex : $u.zIndex.popup;
});

/**
 * 点击取消按钮
 */
function close() {
    // 发送input事件，并不会作用于父组件，而是要设置组件内部通过props传递的value参数
    // 这是一个vue发送事件的特殊用法
    popupClose();
    emit('close');
}

/**
 * 弹窗关闭
 */
function popupClose() {
    emit('update:modelValue', false);
}

/**
 * 点击某一个item
 * @param index 选项索引
 */
function itemClick(index: number) {
    // disabled的项禁止点击
    if (props.list[index]?.disabled) return;
    emit('click', index);
    emit('update:modelValue', false);
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-tips {
    font-size: 26rpx;
    text-align: center;
    padding: 34rpx 0;
    line-height: 1;
    color: $u-tips-color;
}

.u-action-sheet-item {
    @include vue-flex;
    line-height: 1;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;
    padding: 34rpx 0;
    flex-direction: column;
}

.u-action-sheet-item__subtext {
    font-size: 24rpx;
    color: $u-tips-color;
    margin-top: 20rpx;
}

.u-gab {
    height: 12rpx;
    background-color: rgb(234, 234, 236);
}

.u-actionsheet-cancel {
    color: $u-main-color;
}
</style>
