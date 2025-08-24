import type { ExtractPropTypes, PropType } from 'vue';

type LoadingMode = 'circle' | 'flower';

/**
 * u-loading 组件 props 类型定义
 * @description 加载动画，支持多种模式
 */
export const LoadingProps = {
    /** 动画的类型 */
    mode: {
        type: String as PropType<LoadingMode>,
        default: 'circle'
    },
    /** 动画的颜色 */
    color: {
        type: String,
        default: '#c7c7c7'
    },
    /** 加载图标的大小，单位rpx */
    size: {
        type: [String, Number] as PropType<string | number>,
        default: '34'
    },
    /** 是否显示动画 */
    show: {
        type: Boolean,
        default: true
    }
};

/**
 * u-loading 组件 props 类型
 */
export type LoadingProps = ExtractPropTypes<typeof LoadingProps>;
