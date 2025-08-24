import type { ExtractPropTypes, PropType } from 'vue';
import type { ThemeType } from '../../types/global';

/**
 * u-divider 分割线 Props
 * @description 区隔内容的分割线，一般用于页面底部"没有更多"的提示。
 */
export const DividerProps = {
    /** 单一边divider横线的宽度(数值)，单位rpx。或者百分比 */
    halfWidth: { type: [Number, String] as PropType<number | string>, default: 150 },
    /** divider横线的颜色，如设置 */
    borderColor: { type: String, default: '#dcdfe6' },
    /** 主题色，可以是primary|info|success|warning|error之一值 */
    type: { type: String as PropType<ThemeType>, default: 'primary' },
    /** 文字颜色 */
    color: { type: String, default: '#909399' },
    /** 文字大小，单位rpx */
    fontSize: { type: [Number, String] as PropType<number | string>, default: 26 },
    /** 整个divider的背景颜色 */
    bgColor: { type: String, default: '#ffffff' },
    /** 整个divider的高度单位rpx */
    height: { type: [Number, String] as PropType<number | string>, default: 'auto' },
    /** 上边距 */
    marginTop: { type: [String, Number] as PropType<string | number>, default: 0 },
    /** 下边距 */
    marginBottom: { type: [String, Number] as PropType<string | number>, default: 0 },
    /** 是否使用slot传入内容，如果不用slot传入内容，先的中间就不会有空隙 */
    useSlot: { type: Boolean, default: true }
};

export type DividerProps = ExtractPropTypes<typeof DividerProps>;
