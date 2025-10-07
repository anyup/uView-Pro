<template>
    <view class="u-checkbox" :style="[checkboxStyle]">
        <view class="u-checkbox__icon-wrap" @tap="toggle" :class="iconClass" :style="$u.toStyle(iconStyle)">
            <u-icon
                class="u-checkbox__icon-wrap__icon"
                name="checkbox-mark"
                :size="checkboxIconSize"
                :color="iconColor"
            />
        </view>
        <view
            class="u-checkbox__label"
            @tap="onClickLabel"
            :style="{
                fontSize: $u.addUnit(labelSize)
            }"
        >
            <slot />
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-checkbox',
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
import { computed } from 'vue';
import { $u, useChildren, useParentEvents } from '../..';
import { CheckboxProps } from './types';

/**
 * checkbox 复选框
 * @description 该组件需要搭配checkboxGroup组件使用，以便用户进行操作时，获得当前复选框组的选中情况。
 * @tutorial https://uviewpro.cn/zh/components/checkbox.html
 * @property {String Number} icon-size 图标大小，单位rpx（默认20）
 * @property {String Number} label-size label字体大小，单位rpx（默认28）
 * @property {String Number} name checkbox组件的标示符
 * @property {String} shape 形状，见官网说明（默认circle）
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} label-disabled 是否禁止点击文本操作checkbox
 * @property {String} active-color 选中时的颜色，如设置CheckboxGroup的active-color将失效
 * @event {Function} change 某个checkbox状态发生变化时触发，回调为一个对象
 * @example <u-checkbox v-model="checked" :disabled="false">天涯</u-checkbox>
 */

const props = defineProps(CheckboxProps);
const emit = defineEmits(['change', 'update:modelValue']);

// 使用子组件Hook
const { childId, parentExposed } = useChildren('u-checkbox', 'u-checkbox-group');

// 是否禁用，如果父组件u-checkbox-group禁用的话，将会忽略子组件的配置
const isDisabled = computed(() => {
    return props.disabled !== '' ? props.disabled : (parentExposed.value?.props?.disabled ?? false);
});

// 是否禁用label点击
const isLabelDisabled = computed(() => {
    return props.labelDisabled !== '' ? props.labelDisabled : (parentExposed.value?.props?.labelDisabled ?? false);
});

// 组件尺寸，对应size的值，默认值为34rpx
const checkboxSize = computed(() => {
    return props.size ? props.size : (parentExposed.value?.props?.size ?? 34);
});

// 组件的勾选图标的尺寸，默认20
const checkboxIconSize = computed(() => {
    return props.iconSize ? props.iconSize : (parentExposed.value?.props?.iconSize ?? 20);
});

// 组件选中激活时的颜色
const elActiveColor = computed(() => {
    return props.activeColor ? props.activeColor : (parentExposed.value?.props?.activeColor ?? 'primary');
});

// 组件的形状
const elShape = computed(() => {
    return props.shape ? props.shape : (parentExposed.value?.props?.shape ?? 'square');
});

// 图标样式
const iconStyle = computed(() => {
    let style: Record<string, string> = {};
    if (elActiveColor.value && props.modelValue && !isDisabled.value) {
        style.borderColor = elActiveColor.value;
        style.backgroundColor = elActiveColor.value;
    }
    style.width = $u.addUnit(checkboxSize.value);
    style.height = $u.addUnit(checkboxSize.value);
    return style;
});

// checkbox内部的勾选图标，如果选中状态，为白色，否则为透明色即可
const iconColor = computed(() => {
    return props.modelValue ? '#ffffff' : 'transparent';
});

const iconClass = computed(() => {
    let classes: string[] = [];
    classes.push('u-checkbox__icon-wrap--' + elShape.value);
    if (props.modelValue == true) classes.push('u-checkbox__icon-wrap--checked');
    if (isDisabled.value) classes.push('u-checkbox__icon-wrap--disabled');
    if (props.modelValue && isDisabled.value) classes.push('u-checkbox__icon-wrap--disabled--checked');
    return classes.join(' ');
});

const checkboxStyle = computed(() => {
    let style: Record<string, string> = {};
    if (parentExposed.value?.props?.width) {
        style.width = parentExposed.value.props.width;
        // #ifdef MP
        style.float = 'left';
        // #endif
        // #ifndef MP
        style.flex = `0 0 ${parentExposed.value.props.width}`;
        // #endif
    }
    if (parentExposed.value?.props?.wrap) {
        style.width = '100%';
        // #ifndef MP
        style.flex = '0 0 100%';
        // #endif
    }
    return style;
});

/**
 * 点击label
 */
function onClickLabel() {
    if (!isLabelDisabled.value && !isDisabled.value) {
        setValue();
    }
}

/**
 * 点击icon
 */
function toggle() {
    if (!isDisabled.value) {
        setValue();
    }
}

/**
 * 触发change事件
 */
function emitEvent() {
    const changeValue = {
        value: !props.modelValue,
        name: props.name
    };
    emit('change', changeValue);

    // 通知父组件状态变化
    setTimeout(() => {
        if (parentExposed.value?.emitEvent) {
            parentExposed.value.emitEvent();
        }
    }, 80);
}

/**
 * 设置通过v-model绑定的组件的值
 */
function setValue() {
    // 判断是否超过了可选的最大数量
    if (props.modelValue == true) {
        emitEvent();
        emit('update:modelValue', false);
    } else {
        if (!parentExposed.value?.validateSelection()) {
            return;
        }
        emitEvent();
        emit('update:modelValue', true);
    }
}

// 使用自动取消监听注册父组件事件
useParentEvents(childId, {
    setChecked: data => {
        if (!isDisabled.value) {
            emit('update:modelValue', data.checked);
            if (data.checked !== props.modelValue) {
                emitEvent();
            }
        }
    }
});

defineExpose({
    isChecked: computed(() => props.modelValue),
    name: props.name,
    setValue,
    emitEvent,
    props
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-checkbox {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    align-items: center;
    overflow: hidden;
    user-select: none;
    line-height: 1.8;

    &__icon-wrap {
        color: $u-content-color;
        flex: none;
        display: -webkit-flex;
        @include vue-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 42rpx;
        height: 42rpx;
        color: transparent;
        text-align: center;
        transition-property: color, border-color, background-color;
        font-size: 20px;
        border: 1px solid #c8c9cc;
        transition-duration: 0.2s;

        /* #ifdef MP-TOUTIAO */
        &__icon {
            line-height: 0;
        }
        /* #endif */

        &--circle {
            border-radius: 100%;
        }

        &--square {
            border-radius: 6rpx;
        }

        &--checked {
            color: #fff;
            background-color: $u-type-primary;
            border-color: $u-type-primary;
        }

        &--disabled {
            background-color: #ebedf0;
            border-color: #c8c9cc;
        }

        &--disabled--checked {
            color: #c8c9cc !important;
        }
    }

    &__label {
        word-wrap: break-word;
        margin-left: 10rpx;
        margin-right: 24rpx;
        color: $u-content-color;
        font-size: 30rpx;

        &--disabled {
            color: #c8c9cc;
        }
    }
}
</style>
