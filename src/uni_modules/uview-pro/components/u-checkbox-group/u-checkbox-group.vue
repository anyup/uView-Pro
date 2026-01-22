<template>
    <view class="u-checkbox-group u-clearfix" :class="customClass" :style="$u.toStyle(customStyle)">
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
import { getCurrentInstance, computed, watch, nextTick, onMounted } from 'vue';
import { $u, useParent, useChildren, useDebounce } from '../..';
import { CheckboxGroupProps } from './types';

/**
 * checkboxGroup 开关选择器父组件Group
 * @description 复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便
 * @tutorial https://uviewpro.cn/zh/components/checkbox.html
 * @property {Array} modelValue 绑定值，选中的复选框name组成的数组（支持v-model双向绑定）
 * @property {String Number} max 最多能选中多少个checkbox（默认999）
 * @property {String Number} size 组件整体的大小，单位rpx（默认40）
 * @property {Boolean} disabled 是否禁用所有checkbox（默认false）
 * @property {String Number} icon-size 图标大小，单位rpx（默认20）
 * @property {Boolean} label-disabled 是否禁止点击文本操作checkbox(默认false)
 * @property {String} width 宽度，需带单位
 * @property {String} shape 外观形状，shape-方形，circle-圆形(默认circle)
 * @property {Boolean} wrap 是否每个checkbox都换行（默认false）
 * @property {String} active-color 选中时的颜色，应用到所有子Checkbox组件（默认主题色primary）
 * @event {Function} change 任一个checkbox状态发生变化时触发，回调为选中的name数组
 * @example <u-checkbox-group v-model="selectedValues">
 *              <u-checkbox name="apple">苹果</u-checkbox>
 *              <u-checkbox name="banana">香蕉</u-checkbox>
 *          </u-checkbox-group>
 */
const props = defineProps(CheckboxGroupProps);
const emit = defineEmits(['update:modelValue', 'change']);

// 使用父组件Hook
const { children, broadcast } = useParent('u-checkbox-group');
const { emitToParent } = useChildren('u-checkbox-group', 'u-form-item');
const { debounce } = useDebounce(1);

/**
 * 根据modelValue设置子组件状态
 */
function syncChildrenSelection() {
    if (!children || children.length === 0 || !props.modelValue) return;
    const modelValueSet = new Set(props.modelValue);
    children.forEach((child: any) => {
        const childValue = child.getExposed?.()?.value;
        const shouldBeChecked = modelValueSet.has(childValue);
        const isCurrentlyChecked = child.getExposed?.()?.isChecked.value;

        if (shouldBeChecked !== isCurrentlyChecked) {
            child.getExposed?.()?.setChecked({ checked: shouldBeChecked });
        }
    });
}

/**
 * 监听modelValue变化，同步子组件状态
 */
watch(
    () => props.modelValue,
    () => {
        syncChildrenSelection();
    }
);

/**
 * 派发 change 事件和表单校验
 */
function emitEvent() {
    debounce(() => {
        // 收集所有选中的 name
        let values: any[] = [];
        children.forEach((child: any) => {
            if (child.getExposed?.()?.isChecked.value) {
                values.push(child.getExposed?.()?.value);
            }
        });
        emit('change', values);
        emit('update:modelValue', values);
        setTimeout(() => {
            emitToParent('onFormChange', values);
        }, 60);
    });
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

onMounted(() => {
    nextTick(() => {
        syncChildrenSelection();
    });
});

// 使用defineExpose暴露给外部
defineExpose({
    // props
    props,

    // 方法
    emitEvent,
    setAllChecked,
    getSelectedValues,
    validateSelection,
    syncChildrenSelection,

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
