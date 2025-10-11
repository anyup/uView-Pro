import type { ExtractPropTypes, PropType } from 'vue';
import { baseProps } from '../common/props';

/**
 * u-grid-item 组件 Props 类型定义
 * @description 宫格项组件属性
 */
export const GridItemProps = {
    ...baseProps,
    /** 背景颜色 */
    bgColor: { type: String, default: '#ffffff' },
    /** 点击时返回的index */
    index: { type: [Number, String] as PropType<string | number>, default: '' }
};

export type GridItemProps = ExtractPropTypes<typeof GridItemProps>;
