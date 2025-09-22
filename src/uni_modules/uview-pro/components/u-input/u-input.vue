<template>
    <view
        class="u-input"
        :class="{
            'u-input--border': border,
            'u-input--error': validateState
        }"
        :style="{
            padding: `0 ${border ? 20 : 0}rpx`,
            borderColor: borderColor,
            textAlign: inputAlign
        }"
        @tap.stop="inputClick"
    >
        <textarea
            v-if="type == 'textarea'"
            class="u-input__input u-input__textarea"
            :style="getStyle"
            :value="defaultValue"
            :placeholder="placeholder"
            :placeholderStyle="placeholderStyle"
            :disabled="disabled"
            :maxlength="inputMaxlength"
            :fixed="fixed"
            :focus="focus"
            :autoHeight="autoHeight"
            :selection-end="uSelectionEnd"
            :selection-start="uSelectionStart"
            :cursor-spacing="getCursorSpacing"
            :show-confirm-bar="showConfirmbar"
            :adjust-position="adjustPosition"
            @input="handleInput"
            @blur="handleBlur"
            @focus="onFocus"
            @confirm="onConfirm"
        />
        <input
            v-else
            class="u-input__input"
            :type="type == 'password' ? 'text' : type"
            :style="getStyle"
            :value="defaultValue"
            :password="type == 'password' && !showPassword"
            :placeholder="placeholder"
            :placeholderStyle="placeholderStyle"
            :disabled="disabled || type === 'select'"
            :maxlength="inputMaxlength"
            :focus="focus"
            :confirmType="confirmType"
            :cursor-spacing="getCursorSpacing"
            :selection-end="uSelectionEnd"
            :selection-start="uSelectionStart"
            :show-confirm-bar="showConfirmbar"
            :adjust-position="adjustPosition"
            @focus="onFocus"
            @blur="handleBlur"
            @input="handleInput"
            @confirm="onConfirm"
        />
        <view class="u-input__right-icon u-flex">
            <view class="u-input__right-icon__clear u-input__right-icon__item" v-if="clearable && modelValue != ''">
                <u-icon size="32" name="close-circle-fill" color="#c0c4cc" @click="onClear" />
            </view>
            <view class="u-input__right-icon__clear u-input__right-icon__item" v-if="passwordIcon && type == 'password'">
                <u-icon size="32" :name="!showPassword ? 'eye' : 'eye-fill'" color="#c0c4cc" @click="showPassword = !showPassword" />
            </view>
            <view
                class="u-input__right-icon--select u-input__right-icon__item"
                v-if="type == 'select'"
                :class="{
                    'u-input__right-icon--select--reverse': selectOpen
                }"
            >
                <u-icon name="arrow-down-fill" size="26" color="#c0c4cc"></u-icon>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-input',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
};
</script>

<script setup lang="ts">
import { ref, computed, watch, getCurrentInstance } from 'vue';
import { $u } from '../..';
import { dispatch } from '../../libs/util/emitter';
import { InputProps } from './types';

const props = defineProps(InputProps);
const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'confirm', 'click']);

const defaultValue = ref(props.modelValue);
const inputHeight = 70; // input的高度
const textareaHeight = 100; // textarea的高度
const validateState = ref(props.validateState); // 当前input的验证状态，用于错误时，边框是否改为红色
const focused = ref(false); // 当前是否处于获得焦点的状态
const showPassword = ref(false); // 是否预览密码
const lastValue = ref(''); // 用于头条小程序，判断@input中，前后的值是否发生了变化

// 监听 value 变化
watch(
    () => props.modelValue,
    (nVal, oVal) => {
        defaultValue.value = nVal;
        // 当值发生变化，且为select类型时(此时input被设置为disabled，不会触发@input事件)，模拟触发@input事件
        if (nVal != oVal && props.type == 'select') handleInput({ detail: { value: nVal } });
    }
);

// 监听 validateState 变化
watch(
    () => props.validateState,
    val => {
        validateState.value = val;
    }
);

// 计算属性
const inputMaxlength = computed(() => Number(props.maxlength));

const getStyle = computed(() => {
    let style: Record<string, any> = {};
    // 如果没有自定义高度，就根据type为input还是textarea来分配一个默认的高度
    style.minHeight = props.height ? props.height + 'rpx' : props.type == 'textarea' ? `${textareaHeight}rpx` : `${inputHeight}rpx`;
    style = Object.assign(style, props.customStyle);
    return style;
});
const getCursorSpacing = computed(() => Number(props.cursorSpacing));
// 光标起始位置
const uSelectionStart = computed(() => String(props.selectionStart));
// 光标结束位置
const uSelectionEnd = computed(() => String(props.selectionEnd));

const instance = getCurrentInstance();

// 监听u-form-item发出的错误事件，将输入框边框变红色，失效了
// uni.$on('on-form-item-error', onFormItemError);
/**
 * change 事件
 * @param event
 */
function handleInput(event: any) {
    let value = event.detail.value;
    // 判断是否去除空格
    if (props.trim) value = $u.trim(value);
    emit('update:modelValue', value);
    // 当前model 赋值
    defaultValue.value = value;
    // 过一个生命周期再发送事件给u-form-item，否则this.$emit('update:modelValue')更新了父组件的值，但是微信小程序上
    // 尚未更新到u-form-item，导致获取的值为空，从而校验混论
    // 这里不能延时时间太短，或者使用this.$nextTick，否则在头条上，会造成混乱
    setTimeout(() => {
        // 头条小程序由于自身bug，导致中文下，每按下一个键(尚未完成输入)，都会触发一次@input，导致错误，这里进行判断处理
        // #ifdef MP-TOUTIAO
        if ($u.trim(value) == lastValue.value) return;
        lastValue.value = value;
        // #endif
        // 通过 emitter 派发事件
        dispatch(instance, 'u-form-item', 'on-form-change', value);
    }, 40);
}

/**
 * blur 事件
 * @param event
 */
function handleBlur(event: any) {
    // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
    // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
    let value = event.detail.value;
    setTimeout(() => {
        focused.value = false;
    }, 100);
    emit('blur', value);
    setTimeout(() => {
        // 头条小程序由于自身bug，导致中文下，每按下一个键(尚未完成输入)，都会触发一次@input，导致错误，这里进行判断处理
        // #ifdef MP-TOUTIAO
        if ($u.trim(value) == lastValue.value) return;
        lastValue.value = value;
        // #endif
        dispatch(instance, 'u-form-item', 'on-form-blur', value);
    }, 40);
}

function onFormItemError(status: boolean) {
    console.log('onFormItemError', status);
    validateState.value = status;
}

function onFocus(event: any) {
    focused.value = true;
    emit('focus');
}

function onConfirm(e: any) {
    emit('confirm', e.detail.value);
}

function onClear(event: any) {
    emit('update:modelValue', '');
}

function inputClick() {
    emit('click');
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-input {
    position: relative;
    flex: 1;
    @include vue-flex;

    &__input {
        //height: $u-form-item-height;
        font-size: 28rpx;
        color: $u-main-color;
        flex: 1;
    }

    &__textarea {
        width: auto;
        font-size: 28rpx;
        color: $u-main-color;
        padding: 10rpx 0;
        line-height: normal;
        flex: 1;
    }

    &--border {
        border-radius: 6rpx;
        border-radius: 4px;
        border: 1px solid $u-form-item-border-color;
    }

    &--error {
        border-color: $u-type-error !important;
    }

    &__right-icon {
        &__item {
            margin-left: 10rpx;
        }

        &--select {
            transition: transform 0.4s;

            &--reverse {
                transform: rotate(-180deg);
            }
        }
    }
}
</style>
