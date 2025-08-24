import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-collapse 手风琴 Props
 * @description 通过折叠面板收纳内容区域
 * @property {Boolean} accordion 是否手风琴模式（默认true）
 * @property {Object} headStyle 标题自定义样式，对象形式
 * @property {Object} bodyStyle 主体自定义样式，对象形式
 * @property {Object} itemStyle 每一个item的样式，对象形式
 * @property {Boolean} arrow 是否显示标题右侧的箭头（默认true）
 * @property {String} arrowColor 标题右侧箭头的颜色（默认#909399）
 * @property {String} hoverClass 样式类名，按下时有效（默认u-hover-class）
 */
export const CollapseProps = {
    /** 是否手风琴模式 */
    accordion: { type: Boolean, default: true },
    /** 头部的样式 */
    headStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 主体的样式 */
    bodyStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 每一个item的样式 */
    itemStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 是否显示右侧的箭头 */
    arrow: { type: Boolean, default: true },
    /** 箭头的颜色 */
    arrowColor: { type: String, default: '#909399' },
    /** 标题部分按压时的样式类，"none"为无效果 */
    hoverClass: { type: String, default: 'u-hover-class' }
};

export type CollapseProps = ExtractPropTypes<typeof CollapseProps>;
