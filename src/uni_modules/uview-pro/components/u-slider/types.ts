import type { ExtractPropTypes, PropType } from 'vue';

/**
 * SliderProps 滑块选择器 props 类型定义
 * @description 滑块选择器，支持自定义样式、步长、禁用等
 */
export const SliderProps = {
    /** 当前进度百分比值，范围0-100 */
    modelValue: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 是否禁用滑块 */
    disabled: { type: Boolean, default: false },
    /** 滑块宽度，高等于宽，单位rpx */
    blockWidth: { type: [Number, String] as PropType<number | string>, default: 30 },
    /** 最小值 */
    min: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** 最大值 */
    max: { type: [Number, String] as PropType<number | string>, default: 100 },
    /** 步进值 */
    step: { type: [Number, String] as PropType<number | string>, default: 1 },
    /** 滑块条高度，单位rpx */
    height: { type: [Number, String] as PropType<number | string>, default: 6 },
    /** 进度条的激活部分颜色 */
    activeColor: { type: String, default: '#2979ff' },
    /** 进度条的背景颜色 */
    inactiveColor: { type: String, default: '#c0c4cc' },
    /** 滑块的背景颜色 */
    blockColor: { type: String, default: '#ffffff' },
    /** 用户对滑块的自定义颜色 */
    blockStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) }
};

export type SliderProps = ExtractPropTypes<typeof SliderProps>;
