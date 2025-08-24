import type { ExtractPropTypes, PropType } from 'vue';
import type { LineBorderStyle, LineDirection } from '../../types/global';

/**
 * u-line 组件 props 类型定义
 * @description 此组件一般用于显示一根线条，用于分隔内容块，有横向和竖向两种模式，且能设置0.5px线条，使用也很简单
 */
export const LineProps = {
    /** 线条的颜色 */
    color: {
        type: String,
        default: '#e4e7ed'
    },
    /** 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带rpx单位的值等 */
    length: {
        type: String,
        default: '100%'
    },
    /** 线条方向，col-竖向，row-横向 */
    direction: {
        type: String as PropType<LineDirection>,
        default: 'row'
    },
    /** 是否显示细边框 */
    hairLine: {
        type: Boolean,
        default: true
    },
    /** 线条与上下左右元素的间距，字符串形式，如"30rpx"、"20rpx 30rpx" */
    margin: {
        type: String,
        default: '0'
    },
    /** 线条的类型，solid-实线，dashed-方形虚线，dotted-圆点虚线 */
    borderStyle: {
        type: String as PropType<LineBorderStyle>,
        default: 'solid'
    }
};

/**
 * u-line 组件 props 类型
 */
export type LineProps = ExtractPropTypes<typeof LineProps>;
