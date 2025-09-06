import type { ExtractPropTypes, PropType } from 'vue';
import type { TagShape, TagMode, TagSize, ThemeType } from '../../types/global';

/**
 * TagProps tag props 类型定义
 * @description 标签组件，支持多种类型、尺寸、形状、可关闭等
 */
export const TagProps = {
    /** 类型，primary、success、info、warning、error */
    type: { type: String as PropType<ThemeType>, default: 'primary' },
    /** 是否禁用 */
    disabled: { type: [Boolean, String] as PropType<boolean | string>, default: false },
    /** 尺寸，default/mini/medium */
    size: { type: String as PropType<TagSize>, default: 'default' },
    /** 形状，square为方形，circle为圆形 */
    shape: { type: String as PropType<TagShape>, default: 'square' },
    /** 显示的文本内容 */
    text: { type: [String, Number] as PropType<string | number>, default: '' },
    /** 文字颜色 */
    color: { type: String, default: '' },
    /** 背景颜色 */
    bgColor: { type: String, default: '' },
    /** 边框颜色 */
    borderColor: { type: String, default: '' },
    /** 关闭按钮颜色 */
    closeColor: { type: String, default: '' },
    /** 索引值 */
    index: { type: [String, Number] as PropType<string | number>, default: '' },
    /** 模式，light/dark/plain等 */
    mode: { type: String as PropType<TagMode>, default: 'light' },
    /** 是否可关闭 */
    closeable: { type: Boolean, default: false },
    /** 是否显示 */
    show: { type: Boolean, default: true }
};

export type TagProps = ExtractPropTypes<typeof TagProps>;
