<template>
    <view class="u-radio" :style="[radioStyle]">
        <view class="u-radio__icon-wrap" @tap="toggle" :class="[iconClass]" :style="[iconStyle]">
            <u-icon class="u-radio__icon-wrap__icon" name="checkbox-mark" :size="elIconSize" :color="iconColor" />
        </view>
        <view
            class="u-radio__label"
            @tap="onClickLabel"
            :style="{
                fontSize: $u.addUnit(labelSize)
            }"
        >
            <slot />
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { $u } from '../..';
import { RadioProps } from './types';

defineOptions({
    name: 'u-radio'
});

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

// 获取父组件u-radio-group的provide数据
const parent = inject<any>('u-radio-group', null);

// 父组件的默认值
const parentData = computed(
    () =>
        parent?.getData?.() || {
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

/**
 * 是否禁用，如果父组件u-radio-group禁用的话，将会忽略子组件的配置
 */
const elDisabled = computed(() => (props.disabled !== '' ? props.disabled : parentData.value.disabled !== null ? parentData.value.disabled : false));

/**
 * 是否禁用label点击
 */
const elLabelDisabled = computed(() => (props.labelDisabled !== '' ? props.labelDisabled : parentData.value.labelDisabled !== null ? parentData.value.labelDisabled : false));

/**
 * 组件尺寸，对应size的值，默认值为34rpx
 * 兼容无size属性场景
 */
const elSize = computed(() => {
    // 若props无size，直接用默认值
    // 兼容老代码，parentData.value.size 可能不存在
    return (props as any).size ? (props as any).size : parentData.value.size ? parentData.value.size : 34;
});

/**
 * 组件的勾选图标的尺寸，默认20
 */
const elIconSize = computed(() => (props.iconSize ? props.iconSize : parentData.value.iconSize ? parentData.value.iconSize : 20));

/**
 * 组件选中激活时的颜色
 */
const elActiveColor = computed(() => (props.activeColor ? props.activeColor : parentData.value.activeColor ? parentData.value.activeColor : 'primary'));

/**
 * 组件的形状
 */
const elShape = computed(() => (props.shape ? props.shape : parentData.value.shape ? parentData.value.shape : 'circle'));

/**
 * 设置radio的状态，要求radio的name等于parent的value时才为选中状态
 */
const iconStyle = computed(() => {
    let style: Record<string, string> = {};
    if (elActiveColor.value && parentData.value.value == props.name && !elDisabled.value) {
        style.borderColor = elActiveColor.value;
        style.backgroundColor = elActiveColor.value;
    }
    style.width = $u.addUnit(elSize.value);
    style.height = $u.addUnit(elSize.value);
    return style;
});

const iconColor = computed(() => (props.name == parentData.value.value ? '#ffffff' : 'transparent'));

const iconClass = computed(() => {
    let classes: string[] = [];
    classes.push('u-radio__icon-wrap--' + elShape.value);
    if (props.name == parentData.value.value) classes.push('u-radio__icon-wrap--checked');
    if (elDisabled.value) classes.push('u-radio__icon-wrap--disabled');
    if (props.name == parentData.value.value && elDisabled.value) classes.push('u-radio__icon-wrap--disabled--checked');
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
    if (parentData.value.value != props.name) emit('change', props.name);
}
/**
 * 改变组件选中状态
 * 这里的改变的依据是，更改本组件的parentData.value值为本组件的name值，同时通过父组件遍历所有u-radio实例
 * 将本组件外的其他u-radio的parentData.value都设置为空(由computed计算后，都被取消选中状态)，因而只剩下一个为选中状态
 */
function setRadioCheckedStatus() {
    emitEvent();
    if (parent && parent.setValue) {
        parent.setValue(props.name);
        parentData.value.value = props.name;
    }
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
        border: 1px solid #c8c9cc;
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
            color: #fff;
            background-color: #2979ff;
            border-color: #2979ff;
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
