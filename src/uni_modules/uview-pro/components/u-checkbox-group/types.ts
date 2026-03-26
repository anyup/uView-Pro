import type { ExtractPropTypes, PropType } from 'vue';
import type { Shape } from '../../types/global';
import { getColor } from '../../';

/**
 * checkbox-group 复选框组类型定义
 * @description 供 u-checkbox-group 组件 props 使用
 */

export const CheckboxGroupProps = {
    /** 自定义根节点样式 */
    customStyle: {
        type: [String, Object] as PropType<string | Record<string, any>>,
        default: () => ({})
    },
    /** 自定义根节点样式类 */
    customClass: {
        type: String as unknown as PropType<string>,
        default: ''
    },
    /** 绑定值，选中的复选框name组成的数组 */
    modelValue: { type: Array as PropType<(string | number)[]>, default: undefined },
    /** 最多能选中多少个checkbox */
    max: { type: Number, default: 999 },
    /** 是否禁用所有复选框 */
    disabled: { type: Boolean, default: false },
    /** 在表单内提交时的标识符 */
    name: { type: [Boolean, String], default: '' },
    /** 是否禁止点击提示语选中复选框 */
    labelDisabled: { type: Boolean, default: false },
    /** 形状，square为方形，circle为原型 */
    shape: { type: String as PropType<Shape>, default: 'square' },
    /** 选中状态下的颜色 */
    activeColor: { type: String, default: () => getColor('primary') },
    /** 组件的整体大小，单位rpx，默认34rpx */
    size: { type: [String, Number], default: '' },
    /** 每个checkbox占u-checkbox-group的宽度 */
    width: { type: String, default: 'auto' },
    /** 是否每个checkbox都换行 */
    wrap: { type: Boolean, default: false },
    /** 图标的大小，单位rpx，默认20rpx */
    iconSize: { type: [String, Number], default: '' }
};

export type CheckboxGroupProps = ExtractPropTypes<typeof CheckboxGroupProps>;
