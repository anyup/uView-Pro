import type { ExtractPropTypes, PropType } from 'vue';

/**
 * SkeletonProps 骨架屏 props 类型定义
 * @description 骨架屏用于页面数据加载时的占位
 */
export const SkeletonProps = {
    /** 骨架块状元素的背景颜色 */
    elColor: { type: String, default: '#e5e5e5' },
    /** 整个骨架屏页面的背景颜色 */
    bgColor: { type: String, default: '#ffffff' },
    /** 是否显示加载动画 */
    animation: { type: Boolean, default: false },
    /** 圆角值，只对类名为u-skeleton-fillet的元素生效 */
    borderRadius: { type: [String, Number] as PropType<string | number>, default: 10 },
    /** 是否显示骨架，true-显示，false-隐藏 */
    loading: { type: Boolean, default: true }
};

export type SkeletonProps = ExtractPropTypes<typeof SkeletonProps>;
