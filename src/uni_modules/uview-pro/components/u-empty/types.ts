import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-empty 组件 Props 类型定义
 */
export const EmptyProps = {
    /** 图标路径 */
    src: { type: String, default: '' },
    /** 提示文字 */
    text: { type: String, default: '' },
    /** 文字颜色 */
    color: { type: String, default: '#c0c4cc' },
    /** 图标的颜色 */
    iconColor: { type: String, default: '#c0c4cc' },
    /** 图标的大小 */
    iconSize: { type: [String, Number] as PropType<string | number>, default: 120 },
    /** 文字大小，单位rpx */
    fontSize: { type: [String, Number] as PropType<string | number>, default: 26 },
    /** 选择预置的图标类型 */
    mode: { type: String, default: 'data' },
    /** 图标宽度，单位rpx */
    imgWidth: { type: [String, Number] as PropType<string | number>, default: 120 },
    /** 图标高度，单位rpx */
    imgHeight: { type: [String, Number] as PropType<string | number>, default: 'auto' },
    /** 是否显示组件 */
    show: { type: Boolean, default: true },
    /** 组件距离上一个元素之间的距离 */
    marginTop: { type: [String, Number] as PropType<string | number>, default: 0 },
    /** 图标自定义样式 */
    iconStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) }
};

/**
 * u-empty 组件 Props 类型
 */
export type EmptyProps = ExtractPropTypes<typeof EmptyProps>;
