<template>
    <view class="u-radio-group u-clearfix">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { ref, provide, watch, getCurrentInstance } from 'vue';
import { $u } from '../..';
import { RadioGroupProps } from './types';

defineOptions({
    name: 'u-radio-group'
});

/**
 * radioGroup 单选框父组件
 * @description 单选框用于有一个选择，用户只能选择其中一个的场景。搭配u-radio使用
 * @tutorial https://uviewpro.cn/zh/components/radio.html
 * @property {Boolean} disabled 是否禁用所有radio（默认false）
 * @property {String|Number} size 组件整体的大小，单位rpx（默认40）
 * @property {String} active-color 选中时的颜色，应用到所有子Radio组件（默认#2979ff）
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

// 当前所有子 radio 实例
const children = ref<any[]>([]);

/**
 * 父组件数据，供子组件 inject 使用
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
        $u.dispatch(getCurrentInstance(), 'u-form-item', 'on-form-change', val);
    }, 60);
}

// provide 父组件数据和方法，供子组件使用
provide('u-radio-group', {
    getData,
    setValue
});

// 监听 props 变化，通知子组件刷新
watch(
    () => [props.modelValue, props.disabled, props.activeColor, props.size, props.labelDisabled, props.shape, props.iconSize, props.width, props.wrap],
    () => {
        // 这里可通过事件或响应式通知子组件刷新
        // 兼容性处理，子组件可通过 inject 的 getData 获取最新值
        console.log('u-radio-group 监听到属性变化');
    }
);
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
