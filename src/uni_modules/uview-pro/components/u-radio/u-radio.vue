<template>
    <view class="u-radio" :style="$u.toStyle(radioStyle, customStyle)" :class="customClass">
        <view class="u-radio__icon-wrap" @tap="toggle" :class="iconClass" :style="$u.toStyle(iconStyle)">
            <u-icon
                custom-class="u-radio__icon-wrap__icon"
                name="checkbox-mark"
                :size="elIconSize"
                :color="iconColor"
            />
        </view>
        <view
            class="u-radio__label"
            @tap="onClickLabel"
            :style="{
                fontSize: labelFontSize
            }"
        >
            <slot>
                {{ label }}
            </slot>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-radio',
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
import { $u, useChildren } from '../..';
import { RadioProps } from './types';
import type { SizeType } from '../../types/global';

/**
 * radio 单选框
 * @description 单选框用于有一个选择，用户只能选择其中一个的场景。搭配u-radio-group使用
 * @tutorial https://uviewpro.cn/zh/components/radio.html
 * @property {String|Number} icon-size 图标大小，单位rpx（默认24）
 * @property {String|Number} label-size label字体大小，单位rpx（默认28）
 * @property {String|Number} name radio组件的标示符
 * @property {String} shape 形状，见上方说明（默认circle）
 * @property {Boolean} disabled 是否禁用（默认false）
 * @property {Boolean} label-disabled 点击文本是否可以操作radio（默认true）
 * @property {String} active-color 选中时的颜色，如设置parent的active-color将失效
 * @event {Function} change 某个radio状态发生变化时触发(选中状态)
 * @example <u-radio :label-disabled="false">门掩黄昏，无计留春住</u-radio>
 */

const props = defineProps(RadioProps);

const emit = defineEmits(['change']);

// 使用组件关系 hooks 获取父组件
const { parentExposed } = useChildren('u-radio', 'u-radio-group');
const { parentExposed: formExposed } = useChildren('u-radio', 'u-form');

// radio 的value值，id
const radioValue = computed(() => {
    if (props.value !== '') return props.value;
    return props.name;
});

// 父组件的默认值（兼容没有父组件的场景）
const parentData = computed(() => {
    return (
        parentExposed?.value?.getData?.() || {
            iconSize: null,
            labelDisabled: null,
            disabled: null,
            shape: null,
            activeColor: null,
            size: null,
            width: null,
            height: null,
            value: null,
            wrap: null
        }
    );
});

// 根据 size 定义不同的配置
const sizeConfig = {
    small: {
        size: 28,
        fontSize: 24,
        iconSize: 16
    },
    default: {
        size: 34,
        fontSize: 28,
        iconSize: 20
    },
    large: {
        size: 40,
        fontSize: 32,
        iconSize: 24
    }
};

// 获取实际使用的 size 值（优先级：props.size > u-radio-group.size > u-form.size）
const actualSize = computed(() => {
    // 优先使用 props 的 size 属性
    if (props.size !== '') {
        return String(props.size);
    }
    // 次优先：使用 u-radio-group 的 size 属性
    if (parentExposed.value?.props?.size) {
        return String(parentExposed.value.props.size);
    }
    // 最后：使用 u-form 的 size 属性（u-form 的 size 只支持预设值）
    if (formExposed.value?.props?.size) {
        return String(formExposed.value.props.size);
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

/**
 * 是否禁用，如果父组件u-radio-group禁用的话，将会忽略子组件的配置
 */
const elDisabled = computed(() =>
    props.disabled !== '' ? props.disabled : parentData.value.disabled !== null ? parentData.value.disabled : false
);

/**
 * 是否禁用label点击
 */
const elLabelDisabled = computed(() =>
    props.labelDisabled !== ''
        ? props.labelDisabled
        : parentData.value.labelDisabled !== null
          ? parentData.value.labelDisabled
          : false
);

/**
 * 组件尺寸，对应size的值，默认值为34rpx
 * 兼容无size属性场景
 */
const elSize = computed(() => currentSizeConfig.value.size);

/**
 * 组件的勾选图标的尺寸，默认20
 */
const elIconSize = computed(() => {
    if (props.iconSize) {
        return props.iconSize;
    }
    if (parentExposed.value?.props?.iconSize) {
        return parentExposed.value?.props?.iconSize;
    }
    if (isInSizeConfig.value) {
        return currentSizeConfig.value.iconSize;
    }
    return 20;
});

// label字体大小，默认28
const labelFontSize = computed(() => {
    if (isInSizeConfig.value) {
        return $u.addUnit(currentSizeConfig.value.fontSize);
    }
    return $u.addUnit(props.labelSize);
});

/**
 * 组件选中激活时的颜色
 */
const elActiveColor = computed(() =>
    props.activeColor ? props.activeColor : parentData.value.activeColor ? parentData.value.activeColor : 'primary'
);

/**
 * 组件的形状
 */
const elShape = computed(() =>
    props.shape ? props.shape : parentData.value.shape ? parentData.value.shape : 'circle'
);

/**
 * 设置radio的状态，要求radio的name等于parent的value时才为选中状态
 */
const iconStyle = computed(() => {
    let style: Record<string, string> = {};
    if (elActiveColor.value && parentData.value.value == radioValue.value && !elDisabled.value) {
        style.borderColor = elActiveColor.value;
        style.backgroundColor = elActiveColor.value;
    }
    style.width = $u.addUnit(elSize.value);
    style.height = $u.addUnit(elSize.value);
    return style;
});

const iconColor = computed(() => (radioValue.value == parentData.value.value ? 'var(--u-white-color)' : 'transparent'));

const iconClass = computed(() => {
    let classes: string[] = [];
    classes.push('u-radio__icon-wrap--' + elShape.value);
    if (radioValue.value == parentData.value.value) classes.push('u-radio__icon-wrap--checked');
    if (elDisabled.value) classes.push('u-radio__icon-wrap--disabled');
    if (radioValue.value == parentData.value.value && elDisabled.value)
        classes.push('u-radio__icon-wrap--disabled--checked');
    // 支付宝小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
    return classes.join(' ');
});

const radioStyle = computed(() => {
    let style: Record<string, string> = {};
    if (parentData.value.width) {
        style.width = $u.addUnit(parentData.value.width);
        // #ifdef MP
        // 各家小程序因为它们特殊的编译结构，使用float布局
        style.float = 'left';
        // #endif
        // #ifndef MP
        // H5和APP使用flex布局
        style.flex = `0 0 ${$u.addUnit(parentData.value.width)}`;
        // #endif
    }
    if (parentData.value.wrap) {
        style.width = '100%';
        // #ifndef MP
        // H5和APP使用flex布局，将宽度设置100%，即可自动换行
        style.flex = '0 0 100%';
        // #endif
    }
    return style;
});

/**
 * 点击label
 */
function onClickLabel() {
    if (!elLabelDisabled.value && !elDisabled.value) {
        setRadioCheckedStatus();
    }
}
/**
 * 点击icon
 */
function toggle() {
    if (!elDisabled.value) {
        setRadioCheckedStatus();
    }
}
/**
 * 发出事件
 */
function emitEvent() {
    // u-radio的name不等于父组件的v-model的值时(意味着未选中)，才发出事件，避免多次点击触发事件
    if (parentData.value.value != radioValue.value) emit('change', radioValue.value);
}
/**
 * 改变组件选中状态
 * 这里的改变的依据是，更改本组件的parentData.value值为本组件的name值，同时通过父组件遍历所有u-radio实例
 * 将本组件外的其他u-radio的parentData.value都设置为空(由computed计算后，都被取消选中状态)，因而只剩下一个为选中状态
 */
function setRadioCheckedStatus() {
    emitEvent();
    parentExposed?.value?.setValue(radioValue.value);
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-radio {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    align-items: center;
    overflow: hidden;
    user-select: none;
    line-height: 1.8;

    &__icon-wrap {
        color: $u-content-color;
        @include vue-flex;
        flex: none;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 42rpx;
        height: 42rpx;
        color: transparent;
        text-align: center;
        transition-property: color, border-color, background-color;
        font-size: 20px;
        border: 1px solid var(--u-border-color);
        transition-duration: 0.2s;

        /* #ifdef MP-TOUTIAO */
        // 头条小程序兼容性问题，需要设置行高为0，否则图标偏下
        &__icon {
            line-height: 0;
        }
        /* #endif */

        &--circle {
            border-radius: 100%;
        }

        &--square {
            border-radius: 3px;
        }

        &--checked {
            color: var(--u-white-color);
            background-color: $u-type-primary;
            border-color: $u-type-primary;
        }

        &--disabled {
            background-color: var(--u-bg-gray-light);
            border-color: var(--u-border-color);
        }

        &--disabled--checked {
            color: var(--u-bg-gray-light) !important;
        }
    }

    &__label {
        word-wrap: break-word;
        margin-left: 10rpx;
        margin-right: 24rpx;
        color: $u-content-color;
        font-size: 30rpx;

        &--disabled {
            color: var(--u-bg-gray-light);
        }
    }
}
</style>
