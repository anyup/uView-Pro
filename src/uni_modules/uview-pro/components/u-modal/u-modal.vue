<template>
    <view>
        <u-popup
            v-model="popupValue"
            mode="center"
            :zoom="effectiveConfig.zoom"
            :popup="false"
            :z-index="uZIndex"
            :length="effectiveConfig.width"
            :mask-close-able="effectiveConfig.maskCloseAble"
            :border-radius="effectiveConfig.borderRadius"
            :negative-top="effectiveConfig.negativeTop"
            :custom-class="effectiveConfig.customClass"
            @close="popupClose"
        >
            <view class="u-model" :style="$u.toStyle(effectiveConfig.customStyle)">
                <view
                    v-if="effectiveConfig.showTitle"
                    class="u-model__title u-line-1"
                    :style="$u.toStyle(effectiveConfig.titleStyle)"
                >
                    {{ effectiveConfig.title }}
                </view>
                <view class="u-model__content">
                    <view v-if="slots.default" :style="$u.toStyle(effectiveConfig.contentStyle)">
                        <slot />
                    </view>
                    <view v-else class="u-model__content__message" :style="$u.toStyle(effectiveConfig.contentStyle)">
                        {{ effectiveConfig.content }}
                    </view>
                </view>
                <view
                    v-if="effectiveConfig.showCancelButton || effectiveConfig.showConfirmButton"
                    class="u-model__footer u-border-top"
                >
                    <view
                        v-if="effectiveConfig.showCancelButton"
                        :hover-stay-time="100"
                        hover-class="u-model__btn--hover"
                        class="u-model__footer__button"
                        :style="$u.toStyle(cancelBtnStyle)"
                        @tap="cancel"
                    >
                        {{ effectiveConfig.cancelText }}
                    </view>
                    <view
                        v-if="effectiveConfig.showConfirmButton || slots['confirm-button']"
                        class="u-model__footer__button hairline-left"
                        :hover-stay-time="100"
                        :hover-class="effectiveConfig.asyncClose ? 'none' : 'u-model__btn--hover'"
                        :style="[confirmBtnStyle]"
                        @tap="confirm"
                    >
                        <slot v-if="slots['confirm-button']" name="confirm-button"></slot>
                        <template v-else>
                            <u-loading mode="circle" :color="effectiveConfig.confirmColor" v-if="loading"></u-loading>
                            <template v-else>
                                {{ effectiveConfig.confirmText }}
                            </template>
                        </template>
                    </view>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-modal',
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
import { ref, computed, watch, onMounted, onBeforeUnmount, useSlots } from 'vue';
import { $u } from '../..';
import { ModalProps } from './types';
import {
    U_MODAL_EVENT_CLEAR_LOADING,
    U_MODAL_EVENT_HIDE,
    U_MODAL_EVENT_SHOW,
    U_MODAL_GLOBAL_EVENT_CLEAR_LOADING,
    U_MODAL_GLOBAL_EVENT_HIDE,
    U_MODAL_GLOBAL_EVENT_SHOW,
    type ModalPayload
} from './service';

/**
 * modal 模态框
 * @description 弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作
 * @tutorial https://uviewpro.cn/zh/components/modal.html
 * @property {Boolean} value 是否显示模态框
 * @property {String | Number} z-index 层级
 * @property {String} title 模态框标题（默认"提示"）
 * @property {String | Number} width 模态框宽度（默认600）
 * @property {String} content 模态框内容（默认"内容"）
 * @property {Boolean} show-title 是否显示标题（默认true）
 * @property {Boolean} async-close 是否异步关闭，只对确定按钮有效（默认false）
 * @property {Boolean} show-confirm-button 是否显示确认按钮（默认true）
 * @property {String | Number} negative-top modal往上偏移的值
 * @property {Boolean} show-cancel-button 是否显示取消按钮（默认false）
 * @property {Boolean} mask-close-able 是否允许点击遮罩关闭modal（默认false）
 * @property {String} confirm-text 确认按钮的文字内容（默认"确认"）
 * @property {String} cancel-text 取消按钮的文字内容（默认"取消"）
 * @property {String} cancel-color 取消按钮的颜色（默认"var(--u-content-color)"）
 * @property {String} confirm-color 确认按钮的文字内容（默认主题色primary）
 * @property {String | Number} border-radius 模态框圆角值，单位rpx（默认16）
 * @property {Object} title-style 自定义标题样式，对象形式
 * @property {Object} content-style 自定义内容样式，对象形式
 * @property {Object} cancel-style 自定义取消按钮样式，对象形式
 * @property {Object} confirm-style 自定义确认按钮样式，对象形式
 * @property {Boolean} zoom 是否开启缩放模式（默认true）
 * @event {Function} confirm 确认按钮被点击
 * @event {Function} cancel 取消按钮被点击
 * @example <u-modal :src="title" :content="content"></u-modal>
 */

const props = defineProps(ModalProps);
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);
const slots = useSlots();

// 确认按钮是否正在加载中
const loading = ref(false);
const isGlobal = computed(() => props.global);
const isPage = computed(() => props.page);
const showEvent = computed(() => (isGlobal.value ? U_MODAL_GLOBAL_EVENT_SHOW : isPage.value ? U_MODAL_EVENT_SHOW : ''));
const hideEvent = computed(() => (isGlobal.value ? U_MODAL_GLOBAL_EVENT_HIDE : isPage.value ? U_MODAL_EVENT_HIDE : ''));
const clearLoadingEvent = computed(() =>
    isGlobal.value ? U_MODAL_GLOBAL_EVENT_CLEAR_LOADING : isPage.value ? U_MODAL_EVENT_CLEAR_LOADING : ''
);

// 存储用户传入的回调函数
let userOnConfirm: (() => void) | null = null;
let userOnCancel: (() => void) | null = null;

// 需要与 effectiveConfig 合并的 props 键名列表（用于函数式调用）
const MERGE_PROPS_KEYS = [
    'title',
    'content',
    'showTitle',
    'showConfirmButton',
    'showCancelButton',
    'confirmText',
    'cancelText',
    'confirmColor',
    'cancelColor',
    'confirmStyle',
    'cancelStyle',
    'titleStyle',
    'contentStyle',
    'asyncClose',
    'borderRadius',
    'width',
    'zoom',
    'maskCloseAble',
    'negativeTop',
    'zIndex',
    'customStyle',
    'customClass'
] as const;

// 函数式调用时的临时配置
const tempConfig = ref<Partial<ModalPayload>>({});

// 函数式调用时的内部显示状态（用于 global 模式）
const internalShow = ref(false);

// 有效的配置（函数式调用时合并 tempConfig 和 props，v-model 时使用 props）
const effectiveConfig = computed(() => {
    // 如果有临时配置（函数式调用），合并用户配置与 props 默认值
    if (Object.keys(tempConfig.value).length > 0) {
        const result: Record<string, any> = {};
        for (const key of MERGE_PROPS_KEYS) {
            // 用户配置优先，否则使用 props 默认值
            result[key] = (tempConfig.value as Record<string, any>)[key] ?? (props as Record<string, any>)[key];
        }
        result.zIndex = tempConfig.value.zIndex ?? props.zIndex ?? $u.zIndex.popup;
        return result;
    }
    // v-model 直接控制时使用 props
    return props;
});
// 取消按钮样式
const cancelBtnStyle = computed(() => {
    return Object.assign({ color: effectiveConfig.value.cancelColor }, effectiveConfig.value.cancelStyle);
});
// 确认按钮样式
const confirmBtnStyle = computed(() => {
    return Object.assign({ color: effectiveConfig.value.confirmColor }, effectiveConfig.value.confirmStyle);
});
// 弹窗的样式
const uZIndex = computed(() => effectiveConfig.value.zIndex ?? $u.zIndex.popup);
// 是否使用内部状态控制显示（global 模式）
const useInternalShow = computed(() => isGlobal.value || isPage.value);
// 最终显示状态
const finalShow = computed(() => {
    if (useInternalShow.value) {
        return internalShow.value;
    }
    return props.modelValue;
});
// u-popup 绑定的值
const popupValue = computed({
    get: () => finalShow.value,
    set: (val: boolean) => {
        if (useInternalShow.value) {
            internalShow.value = val;
        } else {
            emit('update:modelValue', val);
        }
    }
});

// 如果是异步关闭时，外部修改v-model的值为false时，重置内部的loading状态，避免下次打开的时候，状态混乱
watch(
    () => popupValue.value,
    n => {
        if (n === true) loading.value = false;
    }
);

/**
 * 确认按钮点击事件
 */
function confirm() {
    // 先调用回调，再重置配置
    const onConfirm = userOnConfirm;
    // 异步关闭
    if (effectiveConfig.value.asyncClose) {
        loading.value = true;
    } else {
        popupValue.value = false;
        // 延迟重置配置，避免闪屏
        setTimeout(() => resetTempConfig(), 300);
    }
    emit('confirm');
    // 调用函数式调用时用户传入的回调
    onConfirm?.();
}

/**
 * 取消按钮点击事件
 */
function cancel() {
    // 先调用回调，再重置配置
    const onCancel = userOnCancel;
    // 延迟重置配置，避免闪屏
    setTimeout(() => resetTempConfig(), 300);
    emit('cancel');
    popupValue.value = false;
    // 调用函数式调用时用户传入的回调
    onCancel?.();
    // 目前popup弹窗关闭有一个延时操作，此处做一个延时
    // 避免确认按钮文字变成了"确定"字样，modal还没消失，造成视觉不好的效果
    setTimeout(() => {
        loading.value = false;
    }, 300);
}

/**
 * 点击遮罩关闭modal，设置v-model的值为false，否则无法第二次弹起modal
 */
function popupClose() {
    popupValue.value = false;
    resetTempConfig();
}

/**
 * 清除加载中的状态
 */
function clearLoading() {
    loading.value = false;
}

/**
 * 函数式调用显示 modal
 */
function onServiceShow(payload: ModalPayload) {
    // 保存回调函数
    userOnConfirm = payload.onConfirm ?? null;
    userOnCancel = payload.onCancel ?? null;

    // 只保存用户传入的配置（过滤掉回调）
    const { onConfirm, onCancel, ...rest } = payload;
    tempConfig.value = rest;

    // 使用内部状态控制显示
    internalShow.value = true;
}

/**
 * 函数式调用关闭 modal
 */
function onServiceHide() {
    internalShow.value = false;
    resetTempConfig();
}

/**
 * 重置临时配置
 */
function resetTempConfig() {
    tempConfig.value = {};
    userOnConfirm = null;
    userOnCancel = null;
}

onMounted(() => {
    if (showEvent.value) {
        uni?.$on && uni.$on(showEvent.value, onServiceShow);
    }
    if (hideEvent.value) {
        uni?.$on && uni.$on(hideEvent.value, onServiceHide);
    }
    if (clearLoadingEvent.value) {
        uni?.$on && uni.$on(clearLoadingEvent.value, clearLoading);
    }
});

onBeforeUnmount(() => {
    if (showEvent.value) {
        uni?.$off && uni.$off(showEvent.value, onServiceShow);
    }
    if (hideEvent.value) {
        uni?.$off && uni.$off(hideEvent.value, onServiceHide);
    }
    if (clearLoadingEvent.value) {
        uni?.$off && uni.$off(clearLoadingEvent.value, clearLoading);
    }
});

defineExpose({
    clearLoading
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-model {
    height: auto;
    overflow: hidden;
    font-size: 32rpx;
    background-color: var(--u-bg-white);

    &__btn--hover {
        background-color: rgb(230, 230, 230);
    }

    &__title {
        padding-top: 48rpx;
        font-weight: 500;
        text-align: center;
        color: $u-main-color;
    }

    &__content {
        &__message {
            padding: 48rpx;
            font-size: 30rpx;
            text-align: center;
            color: $u-content-color;
        }
    }

    &__footer {
        @include vue-flex;

        &__button {
            flex: 1;
            height: 100rpx;
            line-height: 100rpx;
            font-size: 32rpx;
            box-sizing: border-box;
            cursor: pointer;
            text-align: center;
            border-radius: 4rpx;
        }
    }
}
</style>
