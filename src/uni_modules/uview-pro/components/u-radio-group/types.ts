import type { ExtractPropTypes, PropType } from 'vue';
import type { Shape } from '../../types/global';
import { getColor } from '../../';

/**
 * RadioGroupProps 单选框组 props 类型定义
 * @description 单选框用于有一个选择，用户只能选择其中一个的场景。搭配u-radio使用
 */
export const RadioGroupProps = {
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
    /** 是否禁用所有单选框 */
    disabled: { type: Boolean, default: false },
    /** 匹配某一个radio组件，如果某个radio的name值等于此值，那么这个radio就被会选中 */
    modelValue: { type: [String, Number] as PropType<string | number>, default: '' },
    /** 选中状态下的颜色 */
    activeColor: { type: String, default: () => getColor('primary') },
    /** 组件的整体大小 */
    size: { type: [String, Number] as PropType<number | string>, default: '' },
    /** 是否禁止点击提示语选中复选框 */
    labelDisabled: { type: Boolean, default: false },
    /** 形状，square为方形，circle为原型 */
    shape: { type: String as PropType<Shape>, default: 'circle' },
    /** 图标的大小，单位rpx */
    iconSize: { type: [String, Number] as PropType<number | string>, default: '' },
    /** 每个checkbox占u-checkbox-group的宽度 */
    width: { type: [String, Number] as PropType<number | string>, default: 'auto' },
    /** 是否每个checkbox都换行 */
    wrap: { type: Boolean, default: false }
};

export type RadioGroupProps = ExtractPropTypes<typeof RadioGroupProps>;
