<template>
    <view>
        <u-popup
            :zoom="zoom"
            mode="center"
            :popup="false"
            :z-index="uZIndex"
            v-model="popupValue"
            :length="width"
            :mask-close-able="maskCloseAble"
            :border-radius="borderRadius"
            @close="popupClose"
            :negative-top="negativeTop"
        >
            <view class="u-model">
                <view v-if="showTitle" class="u-model__title u-line-1" :style="[titleStyle]">{{ title }}</view>
                <view class="u-model__content">
                    <view :style="[contentStyle]" v-if="slots.default">
                        <slot />
                    </view>
                    <view v-else class="u-model__content__message" :style="[contentStyle]">{{ content }}</view>
                </view>
                <view class="u-model__footer u-border-top" v-if="showCancelButton || showConfirmButton">
                    <view v-if="showCancelButton" :hover-stay-time="100" hover-class="u-model__btn--hover" class="u-model__footer__button" :style="[cancelBtnStyle]" @tap="cancel">
                        {{ cancelText }}
                    </view>
                    <view
                        v-if="showConfirmButton || slots['confirm-button']"
                        :hover-stay-time="100"
                        :hover-class="asyncClose ? 'none' : 'u-model__btn--hover'"
                        class="u-model__footer__button hairline-left"
                        :style="[confirmBtnStyle]"
                        @tap="confirm"
                    >
                        <slot v-if="slots['confirm-button']" name="confirm-button"></slot>
                        <template v-else>
                            <u-loading mode="circle" :color="confirmColor" v-if="loading"></u-loading>
                            <template v-else>
                                {{ confirmText }}
                            </template>
                        </template>
                    </view>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, useSlots } from 'vue';
import { ModalProps } from './types';

defineOptions({
    name: 'u-modal'
});

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
 * @property {String} cancel-color 取消按钮的颜色（默认"#606266"）
 * @property {String} confirm-color 确认按钮的文字内容（默认"#2979ff"）
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

const cancelBtnStyle = computed(() => {
    return Object.assign({ color: props.cancelColor }, props.cancelStyle);
});
const confirmBtnStyle = computed(() => {
    return Object.assign({ color: props.confirmColor }, props.confirmStyle);
});
const uZIndex = computed(() => (props.zIndex ? props.zIndex : 10075));

const popupValue = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val)
});

// 如果是异步关闭时，外部修改v-model的值为false时，重置内部的loading状态，避免下次打开的时候，状态混乱
watch(
    () => props.modelValue,
    n => {
        if (n === true) loading.value = false;
    }
);

/**
 * 确认按钮点击事件
 */
function confirm() {
    // 异步关闭
    if (props.asyncClose) {
        loading.value = true;
    } else {
        emit('update:modelValue', false);
    }
    emit('confirm');
}

/**
 * 取消按钮点击事件
 */
function cancel() {
    emit('cancel');
    emit('update:modelValue', false);
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
    emit('update:modelValue', false);
}

/**
 * 清除加载中的状态
 */
function clearLoading() {
    loading.value = false;
}

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
    background-color: #fff;

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
