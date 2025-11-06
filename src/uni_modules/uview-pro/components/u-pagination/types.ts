import { baseProps } from '../common/props';
import type { PaginationChangePayload } from '../../types/global';

/**
 * pagination 分页类型定义
 * @description 供 u-pagination 组件 props 使用
 */

export const PaginationProps = {
    ...baseProps,
    /** 左侧按钮文字 */
    prevText: { type: String, default: '上一页' },
    /** 右侧按钮文字 */
    nextText: { type: String, default: '下一页' },
    /** 总条目数 */
    total: Number,
    /** 每页数据量 */
    pageSize: { type: Number, default: 10 },
    /** 是否以 icon 形式展示按钮 */
    showIcon: { type: Boolean, default: false },
    /** 左侧按钮图标，仅支持内置图标 */
    prevIcon: { type: String, default: 'arrow-left' },
    /** 右侧按钮图标，仅支持内置图标 */
    nextIcon: { type: String, default: 'arrow-right' }
};

export type PaginationEmits = {
    (e: 'change', payload: PaginationChangePayload): void;
};
