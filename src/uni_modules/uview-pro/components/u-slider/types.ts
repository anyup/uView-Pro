import type { ExtractPropTypes, PropType } from 'vue';
import { baseProps } from '../common/props';
import { getColor } from '../../';

/**
 * SliderProps 滑块选择器 props 类型定义
 * @description 滑块选择器，支持自定义样式、步长、禁用等
 */
export const SliderProps = {
    ...baseProps,
    /** 当前进度百分比值，范围0-100 */
    modelValue: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 是否禁用滑块 */
    disabled: { type: Boolean, default: false },
    /** 滑块宽度，高等于宽，单位rpx */
    blockWidth: { type: [Number, String] as PropType<number | string>, default: 30 },
    /** 滑块总体范围起点值 */
    start: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 滑块总体范围终点值 */
    end: { type: [Number, String] as PropType<number | string>, default: 100 },
    /** 最小值 */
    min: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 最大值 */
    max: { type: [Number, String] as PropType<number | string>, default: 100 },
    /** 步进值 */
    step: { type: [Number, String] as PropType<number | string>, default: 1 },
    /** 滑块条高度，单位rpx */
    height: { type: [Number, String] as PropType<number | string>, default: 6 },
    /** 进度条的激活部分颜色 */
    activeColor: { type: String, default: () => getColor('primary') },
    /** 进度条的背景颜色 */
    inactiveColor: { type: String, default: () => getColor('lightColor') },
    /** 滑块的背景颜色 */
    blockColor: { type: String, default: 'var(--u-bg-white)' },
    /** 用户对滑块的自定义颜色 */
    blockStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 是否在滑块上方/下方显示当前数值 */
    showValue: { type: Boolean, default: false },
    /** 滑块数值显示位置，top-上方，bottom-下方 */
    valuePosition: { type: String as PropType<'top' | 'bottom'>, default: 'top' },
    /** 是否在起始和结束位置显示数值 */
    showEdgeValue: { type: Boolean, default: false },
    /** 起始和结束数值显示位置，top-上方，bottom-下方 */
    edgeValuePosition: { type: String as PropType<'top' | 'bottom'>, default: 'top' }
};

export type SliderProps = ExtractPropTypes<typeof SliderProps>;
