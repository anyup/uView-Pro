import type { ExtractPropTypes, PropType } from 'vue';
import type { LoadmoreIconType, LoadmoreStatus, LoadmoreText } from '../../types/global';

/**
 * u-loadmore 组件 props 类型定义
 * @description 加载更多，支持多种状态和自定义文字
 */

export const LoadmoreProps = {
    /** 组件背景色 */
    bgColor: {
        type: String,
        default: 'transparent'
    },
    /** 是否显示加载中的图标 */
    icon: {
        type: Boolean,
        default: true
    },
    /** 字体大小 */
    fontSize: {
        type: String,
        default: '28'
    },
    /** 字体颜色 */
    color: {
        type: String,
        default: '#606266'
    },
    /** 组件状态，loadmore-加载前，loading-加载中，nomore-没有更多 */
    status: {
        type: String as PropType<LoadmoreStatus>,
        default: 'loadmore'
    },
    /** 加载中状态的图标，flower-花朵状，circle-圆圈状 */
    iconType: {
        type: String as PropType<LoadmoreIconType>,
        default: 'circle'
    },
    /** 显示的文字 */
    loadText: {
        type: Object as PropType<LoadmoreText>,
        default: () => ({
            loadmore: '加载更多',
            loading: '正在加载...',
            nomore: '没有更多了'
        })
    },
    /** 在“没有更多”状态下，是否显示粗点 */
    isDot: {
        type: Boolean,
        default: false
    },
    /** 加载中显示圆圈动画时，动画的颜色 */
    iconColor: {
        type: String,
        default: '#b7b7b7'
    },
    /** 上边距 */
    marginTop: {
        type: [String, Number] as PropType<string | number>,
        default: 0
    },
    /** 下边距 */
    marginBottom: {
        type: [String, Number] as PropType<string | number>,
        default: 0
    },
    /** 高度，单位rpx */
    height: {
        type: [String, Number] as PropType<string | number>,
        default: 'auto'
    }
};

/**
 * u-loadmore 组件 props 类型
 */
export type LoadmoreProps = ExtractPropTypes<typeof LoadmoreProps>;
