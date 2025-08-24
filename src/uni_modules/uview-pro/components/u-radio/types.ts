import type { ExtractPropTypes, PropType } from 'vue';
import type { Shape } from '../../types/global';

/**
 * RadioProps 单选框 props 类型定义
 * @description 单选框用于有一个选择，用户只能选择其中一个的场景。搭配u-radio-group使用
 */
export const RadioProps = {
    /** radio的名称 */
    name: { type: [String, Number] as PropType<string | number>, default: '' },
    /** 形状，square为方形，circle为圆形 */
    shape: { type: String as PropType<Shape>, default: '' },
    /** 是否禁用 */
    disabled: { type: [String, Boolean] as PropType<string | boolean>, default: '' },
    /** 是否禁止点击提示语选中复选框 */
    labelDisabled: { type: [String, Boolean] as PropType<string | boolean>, default: '' },
    /** 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值 */
    activeColor: { type: String, default: '' },
    /** 图标的大小，单位rpx */
    iconSize: { type: [String, Number] as PropType<number | string>, default: '' },
    /** label的字体大小，rpx单位 */
    labelSize: { type: [String, Number] as PropType<number | string>, default: '' }
};

export type RadioProps = ExtractPropTypes<typeof RadioProps>;
