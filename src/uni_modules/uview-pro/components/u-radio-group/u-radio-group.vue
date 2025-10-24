<template>
    <view class="u-radio-group u-clearfix" :style="$u.toStyle(customStyle)" :class="customClass">
        <slot></slot>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-radio-group',
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
import { $u, useParent, useChildren } from '../..';
import { RadioGroupProps } from './types';

/**
 * radioGroup 单选框父组件
 * @description 单选框用于有一个选择，用户只能选择其中一个的场景。搭配u-radio使用
 * @tutorial https://uviewpro.cn/zh/components/radio.html
 * @property {Boolean} disabled 是否禁用所有radio（默认false）
 * @property {String|Number} size 组件整体的大小，单位rpx（默认40）
 * @property {String} active-color 选中时的颜色，应用到所有子Radio组件（默认主题色primary）
 * @property {String|Number} icon-size 图标大小，单位rpx（默认20）
 * @property {String} shape 外观形状，shape-方形，circle-圆形(默认circle)
 * @property {Boolean} label-disabled 是否禁止点击文本操作checkbox(默认false)
 * @property {String|Number} width 宽度，需带单位
 * @property {Boolean} wrap 是否每个radio都换行（默认false）
 * @event {Function} change 任一个radio状态发生变化时触发
 * @example <u-radio-group v-model="value"></u-radio-group>
 */

const props = defineProps(RadioGroupProps);

const emit = defineEmits(['update:modelValue', 'change']);

const { emitToParent } = useChildren('u-radio-group', 'u-form-item');
useParent('u-radio-group');

/**
 * 父组件数据，供子组件使用
 */
function getData() {
    return {
        iconSize: props.iconSize,
        labelDisabled: props.labelDisabled,
        disabled: props.disabled,
        shape: props.shape,
        activeColor: props.activeColor,
        size: props.size,
        width: props.width,
        wrap: props.wrap,
        value: props.modelValue
    };
}

/**
 * 设置选中值
 * @param val 选中的 radio 的 name
 */
function setValue(val: string | number) {
    // 通过emit事件，设置父组件通过v-model双向绑定的值
    emit('update:modelValue', val);
    emit('change', val);
    // 等待下一个周期再执行，因为emit作用于父组件，再反馈到子组件内部，需要时间
    // 由于头条小程序执行迟钝，故需要用几十毫秒的延时
    setTimeout(() => {
        // 将当前的值发送到 u-form-item 进行校验
        emitToParent('onFormChange', val);
    }, 60);
}

defineExpose({
    props,
    getData,
    setValue
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-radio-group {
    /* #ifndef MP || APP-NVUE */
    display: inline-flex;
    flex-wrap: wrap;
    /* #endif */
}
</style>
