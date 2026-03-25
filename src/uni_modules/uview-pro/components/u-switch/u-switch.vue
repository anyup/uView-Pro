<template>
    <view
        class="u-switch"
        :class="[isChecked ? 'u-switch--on' : '', disabled ? 'u-switch--disabled' : '', customClass]"
        @tap="onClick"
        :style="$u.toStyle(switchStyle, customStyle)"
    >
        <view
            class="u-switch__node node-class"
            :style="{
                width: currentSize,
                height: currentSize
            }"
        >
            <u-loading :show="loading" class="u-switch__loading" :size="loadingSize" :color="loadingColor" />
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-switch',
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
import { computed, nextTick } from 'vue';
import { $u, useChildren } from '../..';
import { SwitchProps } from './types';
import type { SizeType } from '../../types/global';

/**
 * switch 开关选择器
 * @description 选择开关一般用于只有两个选择，且只能选其一的场景。
 * @tutorial https://uviewpro.cn/zh/components/switch.html
 * @property {Boolean} loading 是否处于加载中（默认false）
 * @property {Boolean} disabled 是否禁用（默认false）
 * @property {String|Number} size 开关尺寸，单位rpx（默认50）
 * @property {String} active-color 打开时的背景色（默认主题色primary）
 * @property {String} inactive-color 关闭时的背景色（默认var(--u-bg-white)）
 * @property {Boolean|Number|String} active-value 打开选择器时通过change事件发出的值（默认true）
 * @property {Boolean|Number|String} inactive-value 关闭选择器时通过change事件发出的值（默认false）
 * @event {Function} change 在switch打开或关闭时触发
 * @example <u-switch v-model="checked" active-color="red" inactive-color="var(--u-divider-color)"></u-switch>
 */
const props = defineProps(SwitchProps);

const emit = defineEmits(['update:modelValue', 'change']);
const { parentExposed } = useChildren('u-switch', 'u-form');

// 根据 size 定义不同的配置
const sizeConfig = {
    small: {
        size: 40
    },
    default: {
        size: 50
    },
    large: {
        size: 60
    }
};

// 获取实际使用的 size 值（优先级：props.size > u-form.size）
const actualSize = computed(() => {
    // 优先使用 props 的 size 属性
    if (props.size !== '') {
        return String(props.size);
    }
    // 次优先：使用 u-form 的 size 属性
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

// 获取实际要使用的 size（如果是预设值使用配置值，否则作为自定义值处理）
const currentSize = computed(() => {
    if (isInSizeConfig.value) {
        return $u.addUnit(currentSizeConfig.value.size);
    }
    // 自定义size值，直接作为fontSize处理
    return $u.addUnit(actualSize.value);
});

// 加载动画尺寸，取当前size的60%
const loadingSize = computed(() => {
    const sizeNum = Number(currentSize.value.replace('rpx', ''));
    return sizeNum * 0.6;
});

/**
 * 计算属性：是否处于激活状态
 * 通过比较modelValue和activeValue来确定开关的真实状态
 */
const isChecked = computed(() => {
    return props.modelValue === props.activeValue;
});

/**
 * 计算开关样式
 */
const switchStyle = computed(() => {
    let style: Record<string, string> = {};
    style.fontSize = currentSize.value;
    style.backgroundColor = isChecked.value ? props.activeColor : props.inactiveColor;
    return style;
});
/**
 * 计算加载动画颜色
 */
const loadingColor = computed(() => {
    return isChecked.value ? props.activeColor : undefined;
});

/**
 * 点击开关
 */
function onClick() {
    if (!props.disabled && !props.loading) {
        // 使手机产生短促震动，微信小程序有效，APP(HX 2.6.8)和H5无效
        if (props.vibrateShort) uni.vibrateShort();

        // 根据当前状态切换到另一个值
        const newValue = isChecked.value ? props.inactiveValue : props.activeValue;
        emit('update:modelValue', newValue);
        // 放到下一个生命周期，因为双向绑定的value修改父组件状态需要时间，且是异步的
        nextTick(() => {
            emit('change', newValue);
        });
    }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-switch {
    position: relative;
    /* #ifndef APP-NVUE */
    display: inline-block;
    /* #endif */
    box-sizing: initial;
    width: 2em;
    height: 1em;
    background-color: var(--u-bg-white);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    transition: background-color 0.3s;
    font-size: 50rpx;
}

.u-switch__node {
    @include vue-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 100%;
    z-index: 1;
    background-color: var(--u-bg-white);
    box-shadow:
        0 3px 1px 0 rgba(0, 0, 0, 0.05),
        0 2px 2px 0 rgba(0, 0, 0, 0.1),
        0 3px 3px 0 rgba(0, 0, 0, 0.05);
    transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
    transition:
        transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05),
        -webkit-transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
    transition: transform cubic-bezier(0.3, 1.05, 0.4, 1.05);
    transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
}

.u-switch__loading {
    @include vue-flex;
    align-items: center;
    justify-content: center;
}

.u-switch--on {
    background-color: $u-type-primary;
}

.u-switch--on .u-switch__node {
    transform: translateX(100%);
}

.u-switch--disabled {
    opacity: 0.4;
}
</style>
