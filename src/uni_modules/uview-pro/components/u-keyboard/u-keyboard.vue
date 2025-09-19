<template>
    <u-popup
        :mask="mask"
        :maskCloseAble="maskCloseAble"
        mode="bottom"
        :popup="false"
        v-model="popupValue"
        length="auto"
        :safeAreaInsetBottom="safeAreaInsetBottom"
        @close="popupClose"
        :zIndex="uZIndex"
    >
        <slot />
        <view class="u-tooltip" v-if="tooltip">
            <view class="u-tooltip-item u-tooltip-cancel" hover-class="u-tooltip-cancel-hover" @tap="onCancel">
                {{ cancelBtn ? cancelText : '' }}
            </view>
            <view v-if="showTips" class="u-tooltip-item u-tooltip-tips">
                {{ tips ? tips : mode == 'number' ? '数字键盘' : mode == 'card' ? '身份证键盘' : '车牌号键盘' }}
            </view>
            <view v-if="confirmBtn" @tap="onConfirm" class="u-tooltip-item u-tooltips-submit" hover-class="u-tooltips-submit-hover">
                {{ confirmBtn ? confirmText : '' }}
            </view>
        </view>
        <block v-if="mode == 'number' || mode == 'card'">
            <u-number-keyboard :random="random" @backspace="backspace" @change="change" :mode="mode" :dotEnabled="dotEnabled"></u-number-keyboard>
        </block>
        <block v-else>
            <u-car-keyboard :random="random" @backspace="backspace" @change="change"></u-car-keyboard>
        </block>
    </u-popup>
</template>

<script setup lang="ts">
import { KeyboardProps } from './types';
import { computed } from 'vue';

defineOptions({
    name: 'u-keyboard'
});

/**
 * keyboard 键盘
 * @description 此为uViw自定义的键盘面板，内含了数字键盘，车牌号键，身份证号键盘3中模式，都有可以打乱按键顺序的选项。
 * @tutorial https://uviewpro.cn/zh/components/keyboard.html
 * @property {String} mode 键盘类型，见官网基本使用的说明（默认number）
 * @property {Boolean} dot-enabled 是否显示"."按键，只在mode=number时有效（默认true）
 * @property {Boolean} tooltip 是否显示键盘顶部工具条（默认true）
 * @property {String} tips 工具条中间的提示文字，见上方基本使用的说明，如不需要，请传""空字符
 * @property {Boolean} cancel-btn 是否显示工具条左边的"取消"按钮（默认true）
 * @property {Boolean} confirm-btn 是否显示工具条右边的"完成"按钮（默认true）
 * @property {Boolean} mask 是否显示遮罩（默认true）
 * @property {String} confirm-text 确认按钮的文字
 * @property {String} cancel-text 取消按钮的文字
 * @property {Number String} z-index 弹出键盘的z-index值（默认1075）
 * @property {Boolean} random 是否打乱键盘按键的顺序（默认false）
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配（默认false）
 * @property {Boolean} mask-close-able 是否允许点击遮罩收起键盘（默认true）
 * @event {Function} change 按键被点击(不包含退格键被点击)
 * @event {Function} cancel 键盘顶部工具条左边的"取消"按钮被点击
 * @event {Function} confirm 键盘顶部工具条右边的"完成"按钮被点击
 * @event {Function} backspace 键盘退格键被点击
 * @example <u-keyboard mode="number" v-model="show"></u-keyboard>
 */

const props = defineProps(KeyboardProps);
const emit = defineEmits(['change', 'update:modelValue', 'confirm', 'cancel', 'backspace']);

const uZIndex = computed(() => (props.zIndex ? props.zIndex : 1075));

const popupValue = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val)
});

/**
 * 按键被点击(不包含退格键被点击)
 */
function change(e: any) {
    emit('change', e);
}

/**
 * 键盘关闭
 */
function popupClose() {
    emit('update:modelValue', false);
}

/**
 * 输入完成
 */
function onConfirm() {
    popupClose();
    emit('confirm');
}

/**
 * 取消输入
 */
function onCancel() {
    popupClose();
    emit('cancel');
}

/**
 * 退格键
 */
function backspace() {
    emit('backspace');
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-keyboard {
    position: relative;
    z-index: 1003;
}

.u-tooltip {
    @include vue-flex;
    justify-content: space-between;
}

.u-tooltip-item {
    color: #333333;
    flex: 0 0 33.333333%;
    text-align: center;
    padding: 20rpx 10rpx;
    font-size: 28rpx;
}

.u-tooltips-submit {
    text-align: right;
    flex-grow: 1;
    flex-wrap: 0;
    padding-right: 40rpx;
    color: $u-type-primary;
}

.u-tooltip-cancel {
    text-align: left;
    flex-grow: 1;
    flex-wrap: 0;
    padding-left: 40rpx;
    color: #888888;
}

.u-tooltips-submit-hover {
    color: $u-type-success;
}

.u-tooltip-cancel-hover {
    color: #333333;
}
</style>
