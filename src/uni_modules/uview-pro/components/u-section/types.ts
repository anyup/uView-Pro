import { type ExtractPropTypes, type PropType } from 'vue';

/**
 * section 组件 props 类型定义
 * @description 供 u-section 组件 props 使用
 */
export type FontSize = string | number;

export const SectionProps = {
    /** 标题信息 */
    title: { type: String, default: '' },
    /** 右边副标题内容 */
    subTitle: { type: String, default: '更多' },
    /** 是否显示右边的内容 */
    right: { type: Boolean, default: true },
    /** 主标题的字体大小 */
    fontSize: { type: [Number, String] as PropType<FontSize>, default: 28 },
    /** 主标题是否加粗 */
    bold: { type: Boolean, default: true },
    /** 主标题的颜色 */
    color: { type: String, default: '#303133' },
    /** 右边副标题的颜色 */
    subColor: { type: String, default: '#909399' },
    /** 是否显示左边的竖条 */
    showLine: { type: Boolean, default: true },
    /** 左边竖线的颜色 */
    lineColor: { type: String, default: '' },
    /** 是否显示右边箭头 */
    arrow: { type: Boolean, default: true }
};

export type SectionProps = ExtractPropTypes<typeof SectionProps>;
