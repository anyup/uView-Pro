<template>
    <view
        class="u-input"
        :class="[
            {
                'u-input--border': border,
                'u-input--error': validateState
            },
            customClass
        ]"
        :style="{
            padding: type === 'textarea' ? (border ? '20rpx' : '0') : `0 ${border ? 20 : 0}rpx`,
            borderColor: borderColor,
            textAlign: inputAlign
        }"
        @tap.stop="inputClick"
    >
        <textarea
            v-if="type == 'textarea'"
            class="u-input__input u-input__textarea"
            :style="getStyle"
            :value="inputValue"
            :placeholder="placeholder"
            :placeholderStyle="getPlaceholderStyle"
            :disabled="disabled"
            :maxlength="inputMaxlength"
            :fixed="fixed"
            :focus="focus"
            :autoHeight="autoHeight"
            :selection-end="Number(uSelectionEnd)"
            :selection-start="Number(uSelectionStart)"
            :cursor-spacing="getCursorSpacing"
            :show-confirm-bar="showConfirmbar"
            :adjust-position="adjustPosition"
            @input="handleInput"
            @blur="handleBlur"
            @focus="onFocus"
            @confirm="onConfirm"
        />
        <!-- prettier-ignore -->
        <input
            v-else
            class="u-input__input"
            :type="((type == 'password' ? 'text' : type) as any)"
            :style="getStyle"
            :value="inputValue"
            :password="type == 'password' && !showPassword"
            :placeholder="placeholder"
            :placeholderStyle="getPlaceholderStyle"
            :disabled="disabled || type === 'select'"
            :maxlength="inputMaxlength"
            :focus="focus"
            :confirmType="confirmType"
            :cursor-spacing="getCursorSpacing"
            :selection-end="Number(uSelectionEnd)"
            :selection-start="Number(uSelectionStart)"
            :show-confirm-bar="showConfirmbar"
            :adjust-position="adjustPosition"
            @focus="onFocus"
            @blur="handleBlur"
            @input="handleInput"
            @confirm="onConfirm"
        />
        <view class="u-input__select-overlay" v-if="type === 'select'" @tap.stop="inputClick"></view>
        <view class="u-input__right-icon u-flex">
            <view
                class="u-input__right-icon__clear u-input__right-icon__item"
                v-if="clearable && inputValue !== '' && !disabled"
                :style="{ marginLeft: $u.addUnit(iconSpacing) }"
                :class="{ 'u-hidden': !focused && type !== 'select' }"
                @click.stop="onClear"
            >
                <u-icon :size="currentIconSize" name="close-circle-fill" color="var(--u-light-color)" />
            </view>
            <view
                class="u-input__right-icon__clear u-input__right-icon__item"
                v-if="passwordIcon && type == 'password'"
                :style="{ marginLeft: $u.addUnit(iconSpacing) }"
            >
                <u-icon
                    :size="currentIconSize"
                    :name="!showPassword ? 'eye' : 'eye-fill'"
                    color="var(--u-light-color)"
                    @click="showPassword = !showPassword"
                />
            </view>
            <view
                class="u-input__right-icon--select u-input__right-icon__item"
                v-if="type == 'select'"
                :class="{
                    'u-input__right-icon--select--reverse': selectOpen
                }"
                :style="{ marginLeft: $u.addUnit(iconSpacing) }"
            >
                <u-icon name="arrow-down-fill" :size="selectIconSize" color="var(--u-light-color)"></u-icon>
            </view>
        </view>
        <text
            class="u-input__count"
            :style="{
                'background-color': props.disabled ? 'transparent' : 'var(--u-bg-white)'
            }"
            v-if="props.type === 'textarea' && props.count"
        >
            {{ inputValue.length }}/{{ props.maxlength }}
        </text>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-input',
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
import { ref, computed, watch } from 'vue';
import { $u, useChildren } from '../..';
import { InputProps } from './types';
import type { SizeType } from '../../types/global';

const props = defineProps(InputProps);
const emit = defineEmits(['update:modelValue', 'input', 'blur', 'focus', 'confirm', 'click']);

const { emitToParent } = useChildren('u-input', 'u-form-item');
const { parentExposed } = useChildren('u-input', 'u-form');

const validateState = ref(props.validateState); // 当前input的验证状态，用于错误时，边框是否改为红色
const focused = ref(false); // 当前是否处于获得焦点的状态
const showPassword = ref(false); // 是否预览密码
const lastValue = ref(''); // 用于头条小程序，判断@input中，前后的值是否发生了变化

// 根据 size 定义不同的配置
const sizeConfig = {
    small: {
        inputHeight: 56,
        textareaHeight: 70,
        fontSize: 24,
        iconSize: 28,
        iconSpacing: 6
    },
    default: {
        inputHeight: 70,
        textareaHeight: 100,
        fontSize: 28,
        iconSize: 32,
        iconSpacing: 10
    },
    large: {
        inputHeight: 84,
        textareaHeight: 130,
        fontSize: 32,
        iconSize: 36,
        iconSpacing: 14
    }
};

// 获取实际使用的 size 值（优先级：props.size > u-form.size）
const actualSize = computed(() => {
    // 优先使用 props 的 size 属性
    if (props.size !== '') {
        return String(props.size);
    }
    // 次优先：使用 u-form 的 size 属性（u-form 的 size 只支持预设值）
    if (parentExposed.value?.props?.size) {
        return String(parentExposed.value.props.size);
    }
    // 默认值
    return 'default';
});

// 判断实际使用的 size 是否在预设配置中
const isInSizeConfig = computed(() => actualSize.value in sizeConfig);

// 获取预设 size（用于查找 sizeConfig 配置，如图标大小、高度等）
const presetSize = computed(() => {
    return (isInSizeConfig.value ? actualSize.value : 'default') as SizeType;
});

// 获取当前尺寸配置
const currentSizeConfig = computed(() => sizeConfig[presetSize.value]);

// 获取实际要使用的 font-size（如果是预设值使用配置值，否则作为自定义值处理）
const actualFontSize = computed(() => {
    if (isInSizeConfig.value) {
        return $u.addUnit(currentSizeConfig.value.fontSize);
    }
    // 自定义size值，直接作为fontSize处理
    return $u.addUnit(actualSize.value);
});

// 计算当前图标大小
const currentIconSize = computed(() => currentSizeConfig.value.iconSize);

// 计算 select 图标大小（比常规图标稍小）
const selectIconSize = computed(() => currentSizeConfig.value.iconSize - 4);

// 计算图标间距
const iconSpacing = computed(() => currentSizeConfig.value.iconSpacing);

const inputValue = computed<string>(() => {
    if (props.modelValue === undefined || props.modelValue === null) return '';
    return String(props.modelValue);
});

// 监听 value 变化
watch(
    () => inputValue.value,
    (nVal, oVal) => {
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
    style.minHeight = props.height
        ? $u.addUnit(props.height)
        : props.type === 'textarea'
          ? $u.addUnit(currentSizeConfig.value.textareaHeight)
          : $u.addUnit(currentSizeConfig.value.inputHeight);
    // 根据 size 属性设置字体大小
    style.fontSize = actualFontSize.value;
    return $u.toStyle(style, props.customStyle);
});

const getPlaceholderStyle = computed(() => {
    return $u.toStyle(
        {
            fontSize: actualFontSize.value
        },
        props.placeholderStyle
    );
});

// 计算光标与键盘的距离
const getCursorSpacing = computed(() => Number(props.cursorSpacing));
// 光标起始位置
const uSelectionStart = computed(() => String(props.selectionStart));
// 光标结束位置
const uSelectionEnd = computed(() => String(props.selectionEnd));

/**
 * change 事件
 * @param event
 */
function handleInput(event: any) {
    let value = event.detail.value;
    // 判断是否去除空格
    if (props.trim) value = $u.trim(value);
    emit('update:modelValue', value);
    emit('input', value);
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
        emitToParent('onFormChange', value);
    }, 40);
}

/**
 * blur 事件
 * @param event
 */
function handleBlur(event: any) {
    // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
    // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
    setTimeout(() => {
        focused.value = false;
    }, 100);
    setTimeout(() => {
        let value = inputValue.value;
        emit('blur', value);
        // 头条小程序由于自身bug，导致中文下，每按下一个键(尚未完成输入)，都会触发一次@input，导致错误，这里进行判断处理
        // #ifdef MP-TOUTIAO
        if ($u.trim(value) == lastValue.value) return;
        lastValue.value = value;
        // #endif
        emitToParent('onFormBlur', value);
    }, 40);
}

function onFormItemError(status: boolean) {
    validateState.value = status;
}

function onFocus(e: any) {
    focused.value = true;
    emit('focus', e.detail.value);
}

function onConfirm(e: any) {
    emit('confirm', e.detail.value);
}

function onClear(event: any) {
    try {
        event.stopPropagation();
    } catch (e) {
        console.log(e);
    }
    handleInput({ detail: { value: '' } });
}

function inputClick() {
    emit('click');
}

defineExpose({
    onFormItemError
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-input {
    position: relative;
    flex: 1;
    @include vue-flex;
    align-items: center;

    &__select-overlay {
        position: absolute;
        inset: 0;
        z-index: 1;
    }

    &__input {
        //height: 70rpx;
        font-size: 28rpx;
        color: $u-main-color;
        flex: 1;
        align-self: center;
        line-height: normal;
    }

    &__textarea {
        width: auto;
        font-size: 28rpx;
        color: $u-main-color;
        // padding: 10rpx 0;
        line-height: normal;
        flex: 1;
    }

    &__count {
        position: absolute;
        right: 1px;
        bottom: 0;
        font-size: 12px;
        color: $u-tips-color;
        background-color: var(--u-bg-white);
        padding: 1px 4px;
        border-radius: 10px;
        line-height: 16px;
        z-index: 2;
    }

    &--border {
        border-radius: 4px;
        border: 1px solid $u-border-color;
    }

    &--error {
        border-color: $u-type-error !important;
    }

    &__right-icon {
        position: relative;
        z-index: 2;

        &--select {
            transition: transform 0.4s;

            &--reverse {
                transform: rotate(-180deg);
            }
        }
    }
}
</style>
