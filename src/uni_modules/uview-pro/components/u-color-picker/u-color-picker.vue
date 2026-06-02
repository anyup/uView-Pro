<template>
    <view class="u-color-picker" :class="[customClass]" :style="$u.toStyle(customStyle)">
        <!-- 触发器 (仅弹窗模式) -->
        <view
            v-if="props.mode === 'popup'"
            class="u-color-picker__trigger"
            :class="[
                `u-color-picker__trigger--${props.shape}`,
                { 'u-color-picker__trigger--disabled': props.disabled }
            ]"
            :style="{
                width: props.size,
                height: props.size
            }"
            @tap="open"
        >
            <view class="u-color-picker__trigger__color" :style="{ background: props.modelValue }">
                <u-icon name="arrow-down" color="#fff" size="12" v-if="!props.modelValue"></u-icon>
            </view>
            <view class="u-color-picker__trigger__icon">
                <u-icon name="arrow-down" size="14" :color="isLightColor(props.modelValue) ? '#000' : '#fff'"></u-icon>
            </view>
        </view>

        <!-- 弹窗模式 -->
        <u-popup
            v-if="props.mode === 'popup'"
            :show="props.show"
            :modelValue="props.show"
            @close="close"
            @update:modelValue="(val: boolean) => emit('update:show', val)"
            mode="bottom"
            :round="24"
            :z-index="props.zIndex"
            :safeAreaInsetBottom="true"
            :customStyle="{ backgroundColor: 'transparent' }"
        >
            <view class="u-color-picker__content">
                <view class="u-color-picker__header">
                    <text class="u-color-picker__header__title">{{ props.title }}</text>
                    <view class="u-color-picker__header__close" @tap="close">
                        <u-icon name="close" size="32" color="#909399"></u-icon>
                    </view>
                </view>

                <view class="u-color-picker__body">
                    <u-color-select-panel
                        ref="panelRef"
                        :modelValue="props.modelValue"
                        :colorMode="props.colorMode"
                        :showAlpha="props.showAlpha"
                        :showEyeDropper="props.showEyeDropper"
                        :showHistory="props.showHistory"
                        :showPresets="props.showPresets"
                        :presets="props.presets"
                        :disabled="props.disabled"
                        @update:modelValue="onPanelUpdate"
                        @change="onPanelChange"
                        @color-update="onColorUpdate"
                    ></u-color-select-panel>

                    <!-- Footer -->
                    <view class="u-color-picker__footer">
                        <u-button
                            type="primary"
                            shape="circle"
                            :customStyle="{ width: '100%', height: '88rpx', fontSize: '32rpx' }"
                            @click="confirm"
                            >{{ props.confirmText }}</u-button
                        >
                    </view>
                </view>
            </view>
        </u-popup>

        <!-- 内联模式 -->
        <view v-else class="u-color-picker__content u-color-picker__content--inline">
            <view class="u-color-picker__body">
                <u-color-select-panel
                    ref="panelRef"
                    :modelValue="props.modelValue"
                    :colorMode="props.colorMode"
                    :showAlpha="props.showAlpha"
                    :showEyeDropper="props.showEyeDropper"
                    :showHistory="props.showHistory"
                    :showPresets="props.showPresets"
                    :presets="props.presets"
                    :format="props.format"
                    :disabled="props.disabled"
                    @update:modelValue="onPanelUpdate"
                    @change="onPanelChange"
                    @color-update="onColorUpdate"
                ></u-color-select-panel>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-color-picker',
    options: {
        addGlobalClass: true,
        // #ifndef MP-TOUTIAO
        virtualHost: true,
        // #endif
        styleIsolation: 'shared'
    }
};
</script>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { $u } from '../../';
import { ColorPickerProps } from './types';
import UColorSelectPanel from '../u-color-select-panel/u-color-select-panel.vue';

/**
 * color-picker 颜色选择器
 * @description 颜色选择器组件，支持弹窗模式和内联模式，可选择单色或渐变色，支持透明度、吸管、历史记录和预设颜色
 * @tutorial https://uviewpro.cn/zh/components/color-picker.html
 * @property {String} modelValue 绑定的颜色值（默认#000000）
 * @property {'popup' | 'inline'} mode 模式：popup-弹窗，inline-内联（默认popup）
 * @property {String} title 弹窗标题
 * @property {String} confirmText 确认按钮文字
 * @property {String} cancelText 取消按钮文字
 * @property {Number | String} zIndex 弹窗层级（默认10075）
 * @property {'square' | 'circle'} shape 触发器形状（默认square）
 * @property {String | Number} size 触发器大小（默认60rpx）
 * @property {Boolean} disabled 是否禁用
 * @event update:modelValue 颜色值变化时触发
 * @event update:show 弹窗显示状态变化时触发
 * @event confirm 点击确认按钮时触发
 * @event cancel 关闭弹窗时触发
 * @event change 颜色变化时触发
 * @event color-update 颜色更新时触发
 * @example <u-color-picker v-model="color" mode="popup" />
 */
const props = defineProps(ColorPickerProps);
const emit = defineEmits(['update:modelValue', 'update:show', 'confirm', 'cancel', 'change', 'color-update']);

const isLightColor = (color: string) => {
    if (!color) return true;

    // Simple check for light colors to adjust icon color
    let r = 0,
        g = 0,
        b = 0;

    // Hex
    if (color.startsWith('#')) {
        const hex = color.replace('#', '');
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length >= 6) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        }
    }
    // RGB/RGBA
    else if (color.startsWith('rgb')) {
        const parts = color.match(/\d+/g);
        if (parts && parts.length >= 3) {
            r = parseInt(parts[0]);
            g = parseInt(parts[1]);
            b = parseInt(parts[2]);
        }
    }

    // Calculate luminance
    // Y = 0.299R + 0.587G + 0.114B
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
};

const panelRef = ref<InstanceType<typeof UColorSelectPanel> | null>(null);
const tempColor = ref(props.modelValue || '#000000');

const open = () => {
    if (props.disabled) return;
    emit('update:show', true);
};

const onPanelUpdate = (val: string) => {
    tempColor.value = val;
    if (props.mode === 'inline') {
        emit('update:modelValue', val);
    }
};

const onPanelChange = (val: string) => {
    emit('change', val);
};

const onColorUpdate = (val: string) => {
    emit('color-update', val);
};

const close = () => {
    emit('update:show', false);
    emit('cancel');
};

const confirm = () => {
    if (panelRef.value) {
        panelRef.value.saveRecentColor(tempColor.value);
    }
    emit('update:modelValue', tempColor.value);
    emit('confirm', tempColor.value);
    emit('update:show', false);
};

watch(
    () => props.modelValue,
    val => {
        tempColor.value = val;
    }
);
</script>

<style lang="scss" scoped>
@import 'uview-pro/libs/css/style.components.scss';

.u-color-picker {
    &__trigger {
        border: 1px solid var(--u-border-color);
        background-color: var(--u-bg-color);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s;
        padding: 4rpx;
        position: relative;

        &--square {
            border-radius: 8rpx;
            .u-color-picker__trigger__color {
                border-radius: 6rpx;
            }
        }
        &--circle {
            border-radius: 50%;
            .u-color-picker__trigger__color {
                border-radius: 50%;
            }
        }
        &--disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        &__color {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        &__icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent;
            box-shadow: none;
            padding: 0;
            border-radius: 0;
        }
    }

    &__content {
        background-color: var(--u-bg-color);
        color: var(--u-text-color);
        border-top-left-radius: 24rpx;
        border-top-right-radius: 24rpx;
        overflow: hidden;

        &--inline {
            background-color: var(--u-bg-color);
            border-radius: 16rpx;
            overflow: hidden;
            border: 1px solid var(--u-border-color);
        }
    }

    &__header {
        position: relative;
        @include vue-flex;
        align-items: center;
        justify-content: center;
        height: 88rpx;
        padding: 0 24rpx;
        border-bottom: 1px solid var(--u-divider-color);
        background-color: var(--u-bg-color);

        &__title {
            font-size: 30rpx;
            font-weight: bold;
            color: var(--u-text-color);
        }

        &__close {
            position: absolute;
            right: 30rpx;
            padding: 10rpx;
        }
    }

    &__body {
        padding: 0; // Padding handled by panel
        background-color: var(--u-bg-color);
    }

    &__footer {
        padding: 24rpx;
        border-top: 1px solid var(--u-divider-color);
        background-color: var(--u-bg-color);
    }
}
</style>
