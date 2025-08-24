import type { ExtractPropTypes, PropType } from 'vue';

/**
 * u-line-progress 组件 props 类型定义
 * @description 线型进度条，支持多种样式
 */
export const LineProgressProps = {
    /** 两端是否显示半圆形 */
    round: {
        type: Boolean,
        default: true
    },
    /** 主题颜色 */
    type: {
        type: String,
        default: ''
    },
    /** 激活部分的颜色 */
    activeColor: {
        type: String,
        default: '#19be6b'
    },
    /** 进度条的底色 */
    inactiveColor: {
        type: String,
        default: '#ececec'
    },
    /** 进度百分比，数值 */
    percent: {
        type: [Number, String] as PropType<number | string>,
        default: 0
    },
    /** 是否在进度条内部显示百分比的值 */
    showPercent: {
        type: Boolean,
        default: true
    },
    /** 进度条的高度，单位rpx */
    height: {
        type: [Number, String] as PropType<number | string>,
        default: 28
    },
    /** 是否显示条纹 */
    striped: {
        type: Boolean,
        default: false
    },
    /** 条纹是否显示活动状态 */
    stripedActive: {
        type: Boolean,
        default: false
    }
};

/**
 * u-line-progress 组件 props 类型
 */
export type LineProgressProps = ExtractPropTypes<typeof LineProgressProps>;
