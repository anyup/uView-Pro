import { type ExtractPropTypes, type PropType } from 'vue';
import type { Shape } from '../../types/global';

// u-back-top 组件 props
export const BackTopProps = {
    /** 返回顶部的形状，circle-圆形，square-方形 */
    mode: { type: String as PropType<Shape>, default: 'circle' },
    /** 自定义图标 */
    icon: { type: String, default: 'arrow-upward' },
    /** 提示文字 */
    tips: { type: String, default: '' },
    /** 返回顶部滚动时间 */
    duration: { type: [Number, String], default: 100 },
    /** 滚动距离 */
    scrollTop: { type: [Number, String], default: 0 },
    /** 距离顶部多少距离显示，单位rpx */
    top: { type: [Number, String], default: 400 },
    /** 返回顶部按钮到底部的距离，单位rpx */
    bottom: { type: [Number, String], default: 200 },
    /** 返回顶部按钮到右边的距离，单位rpx */
    right: { type: [Number, String], default: 40 },
    /** 层级 */
    zIndex: { type: [Number, String], default: '9' },
    /** 图标的样式，对象形式 */
    iconStyle: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({
            color: '#909399',
            fontSize: '38rpx'
        })
    },
    /** 整个组件的样式 */
    customStyle: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    }
};

export type BackTopProps = ExtractPropTypes<typeof BackTopProps>;
