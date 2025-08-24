import { type ExtractPropTypes, type PropType } from 'vue';
import type { Shape } from '../../types/global';

/**
 * checkbox 复选框类型定义
 * @description 供 u-checkbox 组件 props 使用
 */
export type CheckboxValue = string | number | boolean;

export const CheckboxProps = {
    /** checkbox的名称 */
    name: { type: [String, Number], default: '' },
    /** 形状，square为方形，circle为原型 */
    shape: { type: String as PropType<Shape>, default: '' },
    /** 是否为选中状态 */
    modelValue: { type: Boolean, default: false },
    /** 是否禁用 */
    disabled: { type: [String, Boolean], default: '' },
    /** 是否禁止点击提示语选中复选框 */
    labelDisabled: { type: [String, Boolean], default: '' },
    /** 选中状态下的颜色，如设置此值，将会覆盖checkboxGroup的activeColor值 */
    activeColor: { type: String, default: '' },
    /** 图标的大小，单位rpx */
    iconSize: { type: [String, Number], default: '' },
    /** label的字体大小，rpx单位 */
    labelSize: { type: [String, Number], default: '' },
    /** 组件的整体大小 */
    size: { type: [String, Number], default: '' }
};

export type CheckboxProps = ExtractPropTypes<typeof CheckboxProps>;
