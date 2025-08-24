import type { ExtractPropTypes, PropType } from 'vue';
import type { SwipeActionOption } from '../../types/global';

/**
 * swipeAction 左滑单元格 props 类型定义
 * @description 该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作。
 */

export const SwipeActionProps = {
    /** index值，用于得知点击删除的是哪个按钮 */
    index: {
        type: [Number, String] as PropType<string | number>,
        default: ''
    },
    /** 滑动按钮的宽度，单位为rpx */
    btnWidth: {
        type: [String, Number] as PropType<string | number>,
        default: 180
    },
    /** 是否禁止某个action滑动 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 打开或者关闭组件 */
    show: {
        type: Boolean,
        default: false
    },
    /** 组件背景颜色 */
    bgColor: {
        type: String,
        default: '#ffffff'
    },
    /** 是否使手机发生短促震动，目前只在iOS的微信小程序有效(2020-05-06) */
    vibrateShort: {
        type: Boolean,
        default: false
    },
    /** 按钮操作参数 */
    options: {
        type: Array as PropType<SwipeActionOption[]>,
        default: () => []
    }
};

/**
 * swipeAction 组件 props 类型
 */
export type SwipeActionProps = ExtractPropTypes<typeof SwipeActionProps>;
