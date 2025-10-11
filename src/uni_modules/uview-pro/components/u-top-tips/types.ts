import type { ExtractPropTypes, PropType } from 'vue';
import { baseProps } from '../common/props';

/**
 * TopTipsProps top-tips props 类型定义
 * @description 顶部提示组件，支持导航栏高度、z-index
 */
export const TopTipsProps = {
    ...baseProps,
    /** 导航栏高度，用于提示的初始化 */
    navbarHeight: { type: [Number, String] as PropType<number | string>, default: 0 },
    /** z-index值 */
    zIndex: { type: [Number, String] as PropType<number | string>, default: '' }
};

export type TopTipsProps = ExtractPropTypes<typeof TopTipsProps>;
