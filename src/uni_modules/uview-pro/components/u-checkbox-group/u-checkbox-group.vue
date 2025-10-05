<template>
    <view class="u-checkbox-group u-clearfix">
        <slot></slot>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-checkbox-group',
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
import { getCurrentInstance, computed } from 'vue';
import { $u, useParent } from '../..';
import { CheckboxGroupProps } from './types';

/**
 * checkboxGroup 开关选择器父组件Group
 * @description 复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便
 * @tutorial https://uviewpro.cn/zh/components/checkbox.html
 * @property {String Number} max 最多能选中多少个checkbox（默认999）
 * @property {String Number} size 组件整体的大小，单位rpx（默认40）
 * @property {Boolean} disabled 是否禁用所有checkbox（默认false）
 * @property {String Number} icon-size 图标大小，单位rpx（默认20）
 * @property {Boolean} label-disabled 是否禁止点击文本操作checkbox(默认false)
 * @property {String} width 宽度，需带单位
 * @property {String} shape 外观形状，shape-方形，circle-圆形(默认circle)
 * @property {Boolean} wrap 是否每个checkbox都换行（默认false）
 * @property {String} active-color 选中时的颜色，应用到所有子Checkbox组件（默认#2979ff）
 * @event {Function} change 任一个checkbox状态发生变化时触发，回调为一个对象
 * @example <u-checkbox-group></u-checkbox-group>
 */
const instance = getCurrentInstance();
const props = defineProps(CheckboxGroupProps);
const emit = defineEmits(['update:modelValue', 'change']);

// 使用父组件Hook
const { children, broadcast } = useParent('u-checkbox-group');

/**
 * 派发 change 事件和表单校验
 */
function emitEvent() {
    // 收集所有选中的 name
    let values: any[] = [];
    children.forEach((child: any) => {
        if (child.getExposed?.()?.isChecked.value) {
            values.push(child.getExposed?.()?.name);
        }
    });
    emit('change', values);
    setTimeout(() => {
        $u.dispatch(instance, 'u-form-item', 'on-form-change', values);
    }, 60);
}

/**
 * 全选/全不选方法
 */
function setAllChecked(checked: boolean) {
    if (props.disabled) {
        console.warn('u-checkbox-group已禁用，无法操作');
        return;
    }
    broadcast('setChecked', { checked });
}

/**
 * 获取选中的值
 */
function getSelectedValues() {
    return children
        .filter(child => child.getExposed?.()?.isChecked.value)
        .map(child => child.getExposed?.()?.name)
        .filter(Boolean);
}

/**
 * 验证选择是否超过最大数量
 */
function validateSelection() {
    const selectedCount = children.filter(child => child.getExposed?.()?.isChecked.value).length;
    if (props.max && selectedCount >= props.max) {
        $u.toast(`超过最大选择数量: ${props.max}`);
        return false;
    }
    return true;
}

// 使用defineExpose暴露给外部
defineExpose({
    // props
    props,

    // 方法
    emitEvent,
    setAllChecked,
    getSelectedValues,
    validateSelection,

    // 计算属性
    selectedCount: computed(() => children.filter(child => child.getExposed?.()?.isChecked.value).length),
    isFull: computed(() => {
        const selectedCount = children.filter(child => child.getExposed?.()?.isChecked.value).length;
        return props.max && selectedCount >= props.max;
    }),
    isEmpty: computed(() => children.filter(child => child.getExposed?.()?.isChecked.value).length === 0),
    // 工具方法
    getChildrenCount: () => children.length
});
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-checkbox-group {
    /* #ifndef MP || APP-NVUE */
    display: inline-flex;
    flex-wrap: wrap;
    /* #endif */
}
</style>
