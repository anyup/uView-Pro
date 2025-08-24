import { type ExtractPropTypes, type PropType } from 'vue';
import type { CellItemArrowDirection } from '../../types/global';

/**
 * cell-item 组件 props 类型定义
 * @description 供 u-cell-item 组件 props 使用
 */
export type CellItemIndex = string | number;
export type CellItemStyle = Record<string, any>;

export const CellItemProps = {
    /** 左侧图标名称(只能uView内置图标)，或者图标src */
    icon: { type: String, default: '' },
    /** 左侧标题 */
    title: { type: [String, Number], default: '' },
    /** 右侧内容 */
    value: { type: [String, Number], default: '' },
    /** 标题下方的描述信息 */
    label: { type: [String, Number], default: '' },
    /** 是否显示下边框 */
    borderBottom: { type: Boolean, default: true },
    /** 是否显示上边框 */
    borderTop: { type: Boolean, default: false },
    /** 是否开启点击反馈，即点击时cell背景为灰色，none为无效果 */
    hoverClass: { type: String, default: 'u-cell-hover' },
    /** 是否显示右侧箭头 */
    arrow: { type: Boolean, default: true },
    /** 内容是否垂直居中 */
    center: { type: Boolean, default: false },
    /** 是否显示左边表示必填的星号 */
    required: { type: Boolean, default: false },
    /** 标题的宽度，单位rpx */
    titleWidth: { type: [Number, String], default: '' },
    /** 右侧箭头方向，可选值：right|up|down，默认为right */
    arrowDirection: { type: String as PropType<CellItemArrowDirection>, default: 'right' },
    /** 控制标题的样式 */
    titleStyle: { type: Object as PropType<CellItemStyle>, default: () => ({}) },
    /** 右侧显示内容的样式 */
    valueStyle: { type: Object as PropType<CellItemStyle>, default: () => ({}) },
    /** 描述信息的样式 */
    labelStyle: { type: Object as PropType<CellItemStyle>, default: () => ({}) },
    /** 背景颜色 */
    bgColor: { type: String, default: 'transparent' },
    /** 用于识别被点击的是第几个cell */
    index: { type: [String, Number] as PropType<CellItemIndex>, default: '' },
    /** 是否使用label插槽 */
    useLabelSlot: { type: Boolean, default: false },
    /** 左边图标的大小，单位rpx，只对传入icon字段时有效 */
    iconSize: { type: [Number, String], default: 34 },
    /** 左边图标的样式，对象形式 */
    iconStyle: { type: Object as PropType<CellItemStyle>, default: () => ({}) }
};

export type CellItemProps = ExtractPropTypes<typeof CellItemProps>;
