import type { ExtractPropTypes, PropType } from 'vue';
import type { TextAlign } from '../../types/global';
import { baseProps } from '../common/props';

/**
 * TableProps 表格 props 类型定义
 * @description 表格组件，支持自定义边框、背景、对齐方式等
 */
export const TableProps = {
    ...baseProps,
    /** 表格边框的颜色 */
    borderColor: { type: String, default: 'var(--u-border-color)' },
    /** 单元格的内容对齐方式，作用类似css的text-align */
    align: { type: String as PropType<TextAlign>, default: 'center' },
    /** 单元格的内边距，同css的padding写法 */
    padding: { type: String, default: '10rpx 6rpx' },
    /** 单元格字体大小，单位rpx */
    fontSize: { type: [String, Number] as PropType<number | string>, default: 28 },
    /** 单元格字体颜色 */
    color: { type: String, default: 'var(--u-content-color)' },
    /** th单元格的样式，对象形式(将th所需参数放在table组件，是为了避免每一个th组件要写一遍） */
    thStyle: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 表格的背景颜色 */
    bgColor: { type: String, default: 'var(--u-white-color)' }
};

export type TableProps = ExtractPropTypes<typeof TableProps>;
